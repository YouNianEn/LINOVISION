import { appendCRC16ToHexString } from "../utils/crc16.js";
export default {
  name: "IOT-S300AQ",
  defaultSlaveAddress: 1,
  defaultBaudRate: 9600,
  defaultDataBits: 8,
  defaultStopBits: 1,
  defaultParity: "none",
  needSlaveAddress: true,
  defaultChecks: [
    {
      name: "PM2.5",
      type: "line",
      valueType: "number",
      check: "pm25",
      value: null,
      company: "μg/m³",
      interval: null,
    },
    {
      name: "PM10",
      type: "line",
      valueType: "number",
      check: "pm10",
      value: null,
      company: "μg/m³",
      interval: null,
    },
  ],
  readFunction: (addr) => {
    addr = parseInt(addr).toString(16);
    while (addr.length < 2) {
      addr = "0" + addr;
    }
    const command = appendCRC16ToHexString(addr + "0300000002");
    return {
      cmd: command,
      timeout: 1000,
      resolveFn: function (result) {
        console.log(result, "收到的数据16进制");
        while (addr.length < 2) {
          addr = "0" + addr;
        }
        if (
          result.substr(0, 2) !== addr ||
          appendCRC16ToHexString(
            result.substr(0, result.length - 4)
          ).toUpperCase() !== result.toUpperCase()
        )
          return null;

        const pm25 = result.slice(6, 10);
        const pm10 = result.slice(10, 14);

        return {
          type: "read",
          data: {
            checks: [
              {
                check: "pm25",
                value: parseInt(pm25, 16),
                time: new Date(),
              },
              {
                check: "pm10",
                value: parseInt(pm10, 16),
                time: new Date(),
              },
            ],
          },
        };
      },
    };
  },
  slaveAddressFunction: (addr, newAddr) => {
    addr = parseInt(addr).toString(16);
    newAddr = parseInt(newAddr).toString(16);
    while (addr.length < 2) {
      addr = "0" + addr;
    }
    while (newAddr.length < 2) {
      newAddr = "0" + newAddr;
    }
    const command = appendCRC16ToHexString(addr + "06001700" + newAddr);
    return {
      cmd: command,
      timeout: 1000,
      resolveFn: function (result) {
        console.log(result, command);
        if (result == command) {
          return {
            type: "slave",
            data: true,
          };
        }
        return {
          type: "slave",
          data: false,
        };
      },
    };
  },
};
