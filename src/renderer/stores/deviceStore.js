import { defineStore } from "pinia";
import { Buffer } from "buffer";
import { deviceList } from "../deviceList/index.js";

export const useDeviceStore = defineStore("device", {
  state: () => ({
    deviceTypes: deviceList,
    selectedDeviceType: undefined,
    slaveAddress: 1,
    baudRate: 9600,
    dataBits: 8,
    stopBits: 1,
    parity: "none",
    receivedData: [],
    checks: [],
    operates: [],
    portPath: "",
    sendInterval: null,
    isSendingConfig: false,
    isDiscovering: false,
    discoveredSlaveAddress: null,
    discoveryIndex: 1,
    currentResolveFn: null,
    slaveAddressStatus: false,
    configStatus: false,
    // 冲突控制状态
    isSendingManual: false, // 手动操作锁（配置/从机地址）
    commandQueue: [], // 手动指令队列
    manualCommandTimeout: 1000, // 手动指令超时时间（5秒）
  }),
  actions: {
    // 设备类型选择（保持不变）
    setSelectedDeviceType(index) {
      this.selectedDeviceType = index;
      const device = this.deviceTypes[index];
      this.slaveAddress = device.defaultSlaveAddress;
      this.checks = [...device.defaultChecks];
      this.operates = [...(device.defaultOperates || [])];
      this.baudRate = device.defaultBaudRate;
      this.dataBits = device.defaultDataBits;
      this.stopBits = device.defaultStopBits;
      this.parity = device.defaultParity;
    },
    setPort(path) {
      this.portPath = path;
    },
    async openSerialPort() {
      if (!this.portPath) return;
      try {
        await window.electronAPI.createSerialPort(this.portPath, {
          baudRate: this.baudRate,
          dataBits: this.dataBits,
          stopBits: this.stopBits,
          parity: this.parity,
        });
        window.electronAPI.onData(this.portPath, (data) =>
          this.handleReceivedData(data)
        );
      } catch (error) {
        console.error("打开串口失败:", error);
        throw error;
      }
    },
    stopOperation() {
      this.resetInterval(); // 清除发送间隔
      this.closeSerialPort(); // 关闭串口
      this.resolveFn = null;
    },
    async closeSerialPort() {
      if (!this.portPath) return;
      try {
        await window.electronAPI.closeSerialPort(this.portPath);
        console.log("端口关闭成功");
        // this.portPath = "";
      } catch (error) {
        console.error("端口关闭失败:", error);
      }
    },
    // 发送手动指令的通用处理（带原有resolveFn支持）
    async sendManualCommand(executeFn) {
      return new Promise((resolve, reject) => {
        this.commandQueue.push({ executeFn, resolve, reject });
        if (!this.isSendingManual && this.commandQueue.length === 1) {
          this.executeNextManualCommand();
        }
      });
    },

    // 执行队列中的手动指令（恢复原有resolveFn逻辑）
    async executeNextManualCommand() {
      const currentCmd = this.commandQueue[0];
      if (!currentCmd || this.isSendingManual) return;

      const { executeFn, resolve, reject } = currentCmd;
      const device = this.deviceTypes[this.selectedDeviceType];

      try {
        this.isSendingManual = true;
        this.resetInterval(); // 暂停自动读取

        // 获取指令配置（包含resolveFn）
        const { cmd, resolveFn, timeout } = executeFn();
        this.currentResolveFn = resolveFn;

        await window.electronAPI.sendData(
          this.portPath,
          Buffer.from(cmd, "hex")
        );

        // 设置超时（使用设备定义的超时或默认值）
        const timer = setTimeout(() => {
          this.currentResolveFn = null;
          this.isSendingManual = false;
          this.commandQueue.shift();
          reject(
            new Error(
              `Operation timed out (${timeout || this.manualCommandTimeout}ms)`
            )
          );
        }, timeout || this.manualCommandTimeout);

        // 等待数据处理（由handleReceivedData触发）
        const onDataHandler = (data) => {
          clearTimeout(timer);
          const result = this.currentResolveFn(this.binaryToHex(data));
          this.currentResolveFn = null;
          this.isSendingManual = false;
          this.commandQueue.shift();
          resolve(result);
          this.executeNextManualCommand(); // 处理下一个队列指令
        };

        window.electronAPI.onData(this.portPath, onDataHandler);
      } catch (error) {
        this.isSendingManual = false;
        this.commandQueue.shift();
        reject(error);
      }
    },

    // 发送从机地址指令（保持原有函数调用方式）
    async sendSlaveAddressCommand(newAddr) {
      if (!this.portPath) return;
      const device = this.deviceTypes[this.selectedDeviceType];
      return this.sendManualCommand(() =>
        device.slaveAddressFunction(this.slaveAddress, newAddr)
      );
    },

    // 发送配置指令（保持原有函数调用方式）
    async sendConfigCommand(operates) {
      if (!this.portPath) return;
      const device = this.deviceTypes[this.selectedDeviceType];
      return this.sendManualCommand(() => device.configFunction(operates));
    },

    // 自动读取（保持原有loop逻辑）
    async sendReadCommand() {
      this.loopSend();
      if (!this.sendInterval) {
        if (this.isSendingManual || !this.portPath) return;
        this.sendInterval = setInterval(() => this.loopSend(), 10000);
      }
    },
    // 自动读取循环（恢复原有resolveFn处理）
    async loopSend() {
      if (this.isSendingManual || !this.portPath) return;
      const device = this.deviceTypes[this.selectedDeviceType];
      const { cmd, resolveFn } = device.readFunction(this.slaveAddress);
      const commands = Array.isArray(cmd) ? cmd : cmd.split(",");

      for (const singleCmd of commands) {
        if (this.isSendingManual) break;
        this.currentResolveFn = resolveFn; // 设置自动读取的解析函数
        try {
          await window.electronAPI.sendData(
            this.portPath,
            Buffer.from(singleCmd, "hex")
          );
          await new Promise((resolve) => setTimeout(resolve, 500));
        } catch (error) {
          this.stopOperation();
          throw error;
        }
      }
    },

    // 数据接收处理（完整保留原有逻辑）
    handleReceivedData(data) {
      console.log("收到的数据:", this.binaryToHex(data));

      if (!this.currentResolveFn) return; // 无解析函数时直接忽略

      const result = this.currentResolveFn(this.binaryToHex(data));

      if (result?.type === "read") {
        // 处理自动读取结果
        if (result.data.checks) {
          this.checks = this.checks.map((check) => {
            const matched = result.data.checks.find(
              (c) => c.check === check.check
            );
            return matched ? { ...check, value: matched.value } : check;
          });
          this.receivedData.push(...result.data.checks);
        }
        if (result.data.operates) {
          console.log(this.operates[0].length);
          this.operates = this.operates.map((operates) => {
            return operates.map((operate) => {
              console.log(result.data.operates[operate.check], operate.check);
              const value =
                result.data.operates[operate.check] != undefined
                  ? result.data.operates[operate.check]
                  : operate.value;
              return { ...operate, value };
            });
          });
          console.log(this.operates);
        }
      } else if (result?.type === "slave") {
        // 处理从机地址修改响应
        this.slaveAddressStatus = result.data;
      } else if (result?.type === "config") {
        // 处理配置修改响应
        this.configStatus = result.data;
      }

      this.currentResolveFn = null; // 重置解析函数
    },
    resetInterval() {
      if (this.sendInterval) {
        clearInterval(this.sendInterval);
        this.sendInterval = null;
      }
    },
    async discoverDevices() {
      this.isDiscovering = true;
      this.discoveredSlaveAddress = null;
      this.discoveryIndex = 1; // 重置查找索引
      const device = this.deviceTypes[this.selectedDeviceType];

      try {
        // 打开串口
        await this.openSerialPort();

        for (let i = this.discoveryIndex; i <= 255; i++) {
          this.slaveAddress = i;
          console.log(`尝试从机地址: ${i}`);

          const { cmd, resolveFn, timeout } = device.readFunction(
            this.slaveAddress
          );
          const command = Array.isArray(cmd) ? cmd : cmd.split(",");
          console.log(command[0]);

          // 发送命令并设置超时（依赖preload的sendData超时）
          await window.electronAPI.sendData(
            this.portPath,
            Buffer.from(command[0], "hex")
          );
          // 等待响应（最多2秒，由preload的sendData控制）
          // 若超时，sendData会抛出错误，进入catch
          // 模拟短暂等待响应（实际由onData触发discoveredSlaveAddress）
          await new Promise((resolve) => setTimeout(resolve, 200));
          if (this.discoveredSlaveAddress) {
            return { success: true };
          }
        }
        return { success: false, error: "No valid slave address found" };
      } catch (error) {
        // 捕获超时或其他错误
        this.isDiscovering = false;
        console.error("Timeout or error in finding slave address:", error);
        // 停止操作并关闭串口
        await this.closeSerialPort();
        throw new Error(error.message); // 传递给前端
      } finally {
        this.isDiscovering = false;
      }
    },
    binaryToHex(binaryData) {
      return Buffer.from(binaryData).toString("hex").toUpperCase();
    },
    resetDiscovery() {
      this.discoveredSlaveAddress = null;
      this.discoveryIndex = 1; // 重置查找索引
      this.stopOperation();
    },
  },
});
