import { appendCRC16ToHexString } from "../utils/crc16.js";
export default {
  name: "IOT-S300WS8",
  defaultSlaveAddress: 46,
  defaultBaudRate: 9600,
  defaultDataBits: 8,
  defaultStopBits: 1,
  defaultParity: "even",
  needSlaveAddress: true,
  defaultChecks: [
    {
      name: "Air Temperature",
      type: "line",
      valueType: "number",
      check: "temp",
      value: null,
      company: "℃",
      interval: null,
    },
    {
      name: "Air Humidity",
      type: "line",
      valueType: "number",
      check: "hum",
      value: null,
      company: "%RH",
      interval: null,
    },
    {
      name: "Air Pressure",
      type: "line",
      valueType: "number",
      check: "airPre",
      value: null,
      company: "Pa",
      interval: null,
    },
    {
      name: "PM2.5",
      type: "line",
      valueType: "number",
      check: "pm25",
      value: null,
      company: "µg/m3",
      interval: null,
    },
    {
      name: "PM10",
      type: "line",
      valueType: "number",
      check: "pm10",
      value: null,
      company: "µg/m3",
      interval: null,
    },
    {
      name: "Noise",
      type: "line",
      valueType: "number",
      check: "noise",
      value: null,
      company: "db",
      interval: [
        { label: "Normal", value: 0 },
        { label: "Tilted", value: 1 },
      ],
    },
    {
      name: "Light Intensity",
      type: "ill",
      valueType: "number",
      check: "LightIn",
      value: null,
      company: "Lux",
      interval: null,
    },
    {
      name: "Min Wind Direction",
      type: "line",
      valueType: "number",
      check: "minW",
      value: null,
      company: "°",
      interval: null,
    },
    {
      name: "Max Wind Direction",
      type: "line",
      valueType: "number",
      check: "maxW",
      value: null,
      company: "°",
      interval: null,
    },
    {
      name: "Avg Wind Direction",
      type: "line",
      valueType: "number",
      check: "avW",
      value: null,
      company: "°",
      interval: null,
    },
    {
      name: "Min Wind Speed",
      type: "line",
      valueType: "number",
      check: "minSp",
      value: null,
      company: "m/s",
      interval: null,
    },
    {
      name: "Max Wind Speed",
      type: "line",
      valueType: "number",
      check: "maxSp",
      value: null,
      company: "m/s",
      interval: null,
    },
    {
      name: "Avg Wind Speed",
      type: "line",
      valueType: "number",
      check: "avSp",
      value: null,
      company: "m/s",
      interval: null,
    },
    {
      name: "Rain Accumulation",
      type: "line",
      valueType: "number",
      check: "cuRa",
      value: null,
      company: "mm",
      interval: null,
    },
    {
      name: "Rain Duration",
      type: "line",
      valueType: "number",
      check: "cuRaT",
      value: null,
      company: "s",
      interval: null,
    },
    {
      name: "Rain Intensity",
      type: "line",
      valueType: "number",
      check: "raIn",
      value: null,
      company: "mm/min",
      interval: null,
    },
    {
      name: "Rain Peak Intensity",
      type: "line",
      valueType: "number",
      check: "maxRaIn",
      value: null,
      company: "mm/min",
      interval: null,
    },
    {
      name: "Heating Temperature",
      type: "line",
      valueType: "number",
      check: "heTem",
      value: null,
      company: "℃",
      interval: null,
    },
    {
      name: "Tilt Status",
      type: "line",
      valueType: "number",
      check: "dumSt",
      value: null,
      company: "℃",
      interval: [
        { label: "Normal", value: 0 },
        { label: "Tilted", value: 1 },
      ],
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

        const temp = parseInt(result.slice(6, 14), 16) / 1000;
        const hum = parseInt(result.slice(14, 22), 16) / 1000;
        const pressure = parseInt(result.slice(22, 30), 16) / 1000;
        const ill = parseInt(result.slice(30, 38), 16) / 1000;
        const minW = parseInt(result.slice(38, 46), 16) / 1000;
        const maxW = parseInt(result.slice(46, 54), 16) / 1000;
        const avW = parseInt(result.slice(54, 62), 16) / 1000;
        const minSp = parseInt(result.slice(62, 70), 16) / 1000;
        const maxSp = parseInt(result.slice(70, 78), 16) / 1000;
        const avSp = parseInt(result.slice(78, 86), 16) / 1000;
        const cuRa = parseInt(result.slice(86, 94), 16) / 1000;
        const cuRaT = parseInt(result.slice(94, 102), 16) / 1000;
        const raIn = parseInt(result.slice(102, 110), 16) / 1000;
        const maxRaIn = parseInt(result.slice(110, 118), 16) / 1000;
        const heTem = parseInt(result.slice(118, 126), 16) / 1000;
        const dumSt = parseInt(result.slice(126, 134), 16) / 1000;
        const pm25 = parseInt(result.slice(198, 206), 16) / 1000;
        const pm10 = parseInt(result.slice(206, 214), 16) / 1000;
        const noise = parseInt(result.slice(294, 302), 16) / 1000;
        return {
          type: "read",
          data: {
            checks: [
              {
                check: "temp",
                value: temp,
                time: new Date(),
              },
              {
                check: "hum",
                value: hum,
                time: new Date(),
              },
              {
                check: "pressure",
                value: pressure,
                time: new Date(),
              },
              {
                check: "pm25",
                value: pm25,
                time: new Date(),
              },
              {
                check: "pm10",
                value: pm10,
                time: new Date(),
              },
              {
                check: "noise",
                value: noise,
                time: new Date(),
              },
              {
                check: "ill",
                value: ill,
                time: new Date(),
              },
              {
                check: "minW",
                value: minW,
                time: new Date(),
              },
              {
                check: "maxW",
                value: maxW,
                time: new Date(),
              },
              {
                check: "avW",
                value: avW,
                time: new Date(),
              },
              {
                check: "minSp",
                value: minSp,
                time: new Date(),
              },
              {
                check: "maxSp",
                value: maxSp,
                time: new Date(),
              },
              {
                check: "avSp",
                value: avSp,
                time: new Date(),
              },
              {
                check: "cuRa",
                value: cuRa,
                time: new Date(),
              },
              {
                check: "cuRaT",
                value: cuRaT,
                time: new Date(),
              },
              {
                check: "raIn",
                value: raIn,
                time: new Date(),
              },
              {
                check: "maxRaIn",
                value: maxRaIn,
                time: new Date(),
              },
              {
                check: "heTem",
                value: heTem,
                time: new Date(),
              },
              {
                check: "dumSt",
                value: dumSt,
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
    const command = appendCRC16ToHexString(addr + "06100000" + newAddr);
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
