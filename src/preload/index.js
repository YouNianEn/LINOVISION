const { contextBridge } = require("electron");
const { SerialPort } = require("serialport");

// 存储打开的串口实例（路径 -> 实例）
const openPorts = new Map();
// 存储每个串口的数据缓冲区（路径 -> 缓冲区）
const dataBuffers = new Map();
// 存储每个串口的定时器（路径 -> 定时器 ID）
const timers = new Map();

contextBridge.exposeInMainWorld("electronAPI", {
  // 获取可用串口列表
  getSerialPorts: () => SerialPort.list(),

  // 创建串口（自动处理旧端口关闭）
  createSerialPort: (path, options) => {
    return new Promise((resolve, reject) => {
      // 关闭已存在的同路径端口
      if (openPorts.has(path)) {
        openPorts.get(path).close();
        openPorts.delete(path);
      }

      const port = new SerialPort({ path, ...options });
      port.on("open", () => {
        openPorts.set(path, port);
        // 初始化该串口的数据缓冲区
        dataBuffers.set(path, Buffer.alloc(0));
        console.log("串口打开:", path);
        resolve();
      });
      port.on("error", (error) => {
        openPorts.delete(path);
        dataBuffers.delete(path);
        timers.delete(path);
        console.error("串口创建失败:", error);
        reject(new Error("Open failed, the target serial port is occupied"));
      });
    });
  },

  // 发送数据
  sendData: (path, data) => {
    return new Promise((resolve, reject) => {
      const port = openPorts.get(path);
      if (!port || !port.isOpen) {
        reject(new Error("Serial port is not open or invalid"));
        return;
      }

      // 添加超时控制（2 秒）
      const timeout = setTimeout(() => {
        reject(new Error("Serial port unknown exception: Timeout"));
      }, 2000);

      port.write(data, (err) => {
        clearTimeout(timeout); // 成功/失败时清除超时定时器
        if (err) {
          console.error("Data sending failed:", err);
          reject(err);
        } else {
          resolve();
        }
      });
    });
  },

  // 获取缓冲区数据
  getDataBuffer: (path) => {
    return dataBuffers.get(path) || Buffer.alloc(0);
  },

  // 清空缓冲区数据
  clearDataBuffer: (path) => {
    dataBuffers.set(path, Buffer.alloc(0));
  },

  // 绑定数据接收事件
  onData: (path, callback) => {
    const port = openPorts.get(path);
    if (port && port.isOpen) {
      port.on("data", (chunk) => {
        const buffer = dataBuffers.get(path);
        const newBuffer = Buffer.concat([buffer, chunk]);
        dataBuffers.set(path, newBuffer);

        // 清除之前的定时器
        const prevTimer = timers.get(path);
        console.log(prevTimer);
        if (prevTimer) {
          clearTimeout(prevTimer);
        }

        // 计算一个字符传输时间（单位：毫秒）
        const baudRate = port.settings.baudRate;
        const dataBits = port.settings.dataBits;
        const stopBits = port.settings.stopBits;
        const hasParity = port.settings.parity !== "none";
        const charTime =
          (1 / baudRate) *
          1000 *
          (1 + dataBits + (hasParity ? 1 : 0) + stopBits);

        // 计算 3.5 个字符传输时间（单位：毫秒）
        const idleTime = 20 * charTime;
        // 开启新的定时器
        const newTimer = setTimeout(() => {
          const completeMessage = dataBuffers.get(path);
          callback(completeMessage);
          dataBuffers.set(path, Buffer.alloc(0));
        }, idleTime);

        timers.set(path, newTimer);
        console.log(timers.get(path));
      });
    } else {
      console.error("数据事件绑定失败：串口未打开", path);
    }
  },

  // 关闭串口
  closeSerialPort: (path) => {
    return new Promise((resolve, reject) => {
      const port = openPorts.get(path);
      if (!port) {
        resolve(); // 无实例直接 resolve
        return;
      }
      const timer = timers.get(path);
      if (timer) {
        clearTimeout(timer);
        timers.delete(path);
      }
      port.close((err) => {
        if (err) reject(err);
        else {
          openPorts.delete(path);
          dataBuffers.delete(path);
          resolve();
        }
      });
    });
  },
});
