// 获取电流设置值
function getDL(value) {
  value = ((parseInt(value) - 150) / 50).toString(16);
  while (value.length < 2) {
    value = "0" + value;
  }
  return value;
}
function customChecksum(hexString) {
  let sum = 0;
  for (let i = 0; i < hexString.length; i += 2) {
    const byte = parseInt(hexString.substr(i, 2), 16);
    sum += byte;
  }
  // 取累加和的最后一个字节
  const checksum = sum & 0xff;
  return checksum.toString(16).padStart(2, "0");
}
function setHex(value) {
  value = parseInt(value).toString(16);
  while (value.length < 2) {
    value = "0" + value;
  }
  return value;
}
export default {
  name: "Solar-CMP10A",
  defaultSlaveAddress: 1,
  defaultBaudRate: 9600,
  defaultDataBits: 8,
  defaultStopBits: 1,
  defaultParity: "none",
  needSlaveAddress: false,
  defaultChecks: [
    {
      name: " Battery capacity %",
      type: "line",
      valueType: "number",
      check: "bc",
      value: null,
      company: "%",
      interval: null,
    },
    {
      name: "Charge controller temperature",
      type: "line",
      valueType: "number",
      check: "cct",
      value: null,
      company: "℃",
      interval: null,
    },

    {
      name: "Solar panel voltage",
      type: "line",
      valueType: "number",
      check: "spv",
      value: null,
      company: "V",
      interval: null,
    },
    {
      name: "Solar panel current",
      type: "line",
      valueType: "number",
      check: "spc",
      value: null,
      company: "A",
      interval: null,
    },
    {
      name: "Battery voltage",
      type: "line",
      valueType: "number",
      check: "batv",
      value: null,
      company: "V",
      interval: null,
    },
    {
      name: "Output current",
      type: "line",
      valueType: "number",
      check: "outc",
      value: null,
      company: "A",
      interval: null,
    },
  ],
  defaultOperates: [
    [
      {
        name: "Load Control Mode",
        check: "15",
        value: null,
        show: true,
        interval: [
          { label: "Manual Mode", value: 1 },
          { label: "Automatic Mode", value: 2 },
        ],
      },
      {
        name: "Intelligent control",
        check: "13",
        value: null,
        show: true,
        interval: [
          { label: "Closed", value: 0 },
          { label: "Mode 1", value: 1 },
          { label: "Mode 2", value: 2 },
        ],
      },
      {
        name: "Duration of the First Time Period",
        check: "timeA",
        value: null,
        show: true,
        interval: [
          { label: "0:00", value: 0 },
          { label: "00:10", value: 1 },
          { label: "00:20", value: 2 },
          { label: "00:30", value: 3 },
          { label: "00:40", value: 4 },
          { label: "00:50", value: 5 },
          { label: "01:00", value: 16 },
          { label: "01:10", value: 17 },
          { label: "01:20", value: 18 },
          { label: "01:30", value: 19 },
          { label: "01:40", value: 20 },
          { label: "01:50", value: 21 },
          { label: "02:00", value: 32 },
          { label: "02:10", value: 33 },
          { label: "02:20", value: 34 },
          { label: "02:30", value: 35 },
          { label: "02:40", value: 36 },
          { label: "02:50", value: 37 },
          { label: "03:00", value: 48 },
          { label: "03:10", value: 49 },
          { label: "03:20", value: 50 },
          { label: "03:30", value: 51 },
          { label: "03:40", value: 52 },
          { label: "03:50", value: 53 },
          { label: "04:00", value: 64 },
          { label: "04:10", value: 65 },
          { label: "04:20", value: 66 },
          { label: "04:30", value: 67 },
          { label: "04:40", value: 68 },
          { label: "04:50", value: 69 },
          { label: "05:00", value: 80 },
          { label: "05:10", value: 81 },
          { label: "05:20", value: 82 },
          { label: "05:30", value: 83 },
          { label: "05:40", value: 84 },
          { label: "05:50", value: 85 },
          { label: "06:00", value: 96 },
          { label: "06:10", value: 97 },
          { label: "06:20", value: 98 },
          { label: "06:30", value: 99 },
          { label: "06:40", value: 100 },
          { label: "06:50", value: 101 },
          { label: "07:00", value: 112 },
          { label: "07:10", value: 113 },
          { label: "07:20", value: 114 },
          { label: "07:30", value: 115 },
          { label: "07:40", value: 116 },
          { label: "07:50", value: 117 },
          { label: "08:00", value: 128 },
          { label: "08:10", value: 129 },
          { label: "08:20", value: 130 },
          { label: "08:30", value: 131 },
          { label: "08:40", value: 132 },
          { label: "08:50", value: 133 },
          { label: "09:00", value: 144 },
        ],
      },
      {
        name: "Duration of the Second Time Period",
        check: "timeB",
        value: null,
        show: true,
        interval: [
          { label: "0:00", value: 0 },
          { label: "00:10", value: 1 },
          { label: "00:20", value: 2 },
          { label: "00:30", value: 3 },
          { label: "00:40", value: 4 },
          { label: "00:50", value: 5 },
          { label: "01:00", value: 16 },
          { label: "01:10", value: 17 },
          { label: "01:20", value: 18 },
          { label: "01:30", value: 19 },
          { label: "01:40", value: 20 },
          { label: "01:50", value: 21 },
          { label: "02:00", value: 32 },
          { label: "02:10", value: 33 },
          { label: "02:20", value: 34 },
          { label: "02:30", value: 35 },
          { label: "02:40", value: 36 },
          { label: "02:50", value: 37 },
          { label: "03:00", value: 48 },
          { label: "03:10", value: 49 },
          { label: "03:20", value: 50 },
          { label: "03:30", value: 51 },
          { label: "03:40", value: 52 },
          { label: "03:50", value: 53 },
          { label: "04:00", value: 64 },
          { label: "04:10", value: 65 },
          { label: "04:20", value: 66 },
          { label: "04:30", value: 67 },
          { label: "04:40", value: 68 },
          { label: "04:50", value: 69 },
          { label: "05:00", value: 80 },
          { label: "05:10", value: 81 },
          { label: "05:20", value: 82 },
          { label: "05:30", value: 83 },
          { label: "05:40", value: 84 },
          { label: "05:50", value: 85 },
          { label: "06:00", value: 96 },
          { label: "06:10", value: 97 },
          { label: "06:20", value: 98 },
          { label: "06:30", value: 99 },
          { label: "06:40", value: 100 },
          { label: "06:50", value: 101 },
          { label: "07:00", value: 112 },
          { label: "07:10", value: 113 },
          { label: "07:20", value: 114 },
          { label: "07:30", value: 115 },
          { label: "07:40", value: 116 },
          { label: "07:50", value: 117 },
          { label: "08:00", value: 128 },
          { label: "08:10", value: 129 },
          { label: "08:20", value: 130 },
          { label: "08:30", value: 131 },
          { label: "08:40", value: 132 },
          { label: "08:50", value: 133 },
          { label: "09:00", value: 144 },
        ],
      },
      {
        name: "Duration of the Third Time Period",
        check: "timeC",
        value: null,
        show: true,
        interval: [
          { label: "0:00", value: 0 },
          { label: "00:10", value: 1 },
          { label: "00:20", value: 2 },
          { label: "00:30", value: 3 },
          { label: "00:40", value: 4 },
          { label: "00:50", value: 5 },
          { label: "01:00", value: 16 },
          { label: "01:10", value: 17 },
          { label: "01:20", value: 18 },
          { label: "01:30", value: 19 },
          { label: "01:40", value: 20 },
          { label: "01:50", value: 21 },
          { label: "02:00", value: 32 },
          { label: "02:10", value: 33 },
          { label: "02:20", value: 34 },
          { label: "02:30", value: 35 },
          { label: "02:40", value: 36 },
          { label: "02:50", value: 37 },
          { label: "03:00", value: 48 },
          { label: "03:10", value: 49 },
          { label: "03:20", value: 50 },
          { label: "03:30", value: 51 },
          { label: "03:40", value: 52 },
          { label: "03:50", value: 53 },
          { label: "04:00", value: 64 },
          { label: "04:10", value: 65 },
          { label: "04:20", value: 66 },
          { label: "04:30", value: 67 },
          { label: "04:40", value: 68 },
          { label: "04:50", value: 69 },
          { label: "05:00", value: 80 },
          { label: "05:10", value: 81 },
          { label: "05:20", value: 82 },
          { label: "05:30", value: 83 },
          { label: "05:40", value: 84 },
          { label: "05:50", value: 85 },
          { label: "06:00", value: 96 },
          { label: "06:10", value: 97 },
          { label: "06:20", value: 98 },
          { label: "06:30", value: 99 },
          { label: "06:40", value: 100 },
          { label: "06:50", value: 101 },
          { label: "07:00", value: 112 },
          { label: "07:10", value: 113 },
          { label: "07:20", value: 114 },
          { label: "07:30", value: 115 },
          { label: "07:40", value: 116 },
          { label: "07:50", value: 117 },
          { label: "08:00", value: 128 },
          { label: "08:10", value: 129 },
          { label: "08:20", value: 130 },
          { label: "08:30", value: 131 },
          { label: "08:40", value: 132 },
          { label: "08:50", value: 133 },
          { label: "09:00", value: 144 },
        ],
      },
      {
        name: "Duration of the Fourth Time Period",
        check: "timeD",
        value: null,
        show: true,
        interval: [
          { label: "0:00", value: 0 },
          { label: "00:10", value: 1 },
          { label: "00:20", value: 2 },
          { label: "00:30", value: 3 },
          { label: "00:40", value: 4 },
          { label: "00:50", value: 5 },
          { label: "01:00", value: 16 },
          { label: "01:10", value: 17 },
          { label: "01:20", value: 18 },
          { label: "01:30", value: 19 },
          { label: "01:40", value: 20 },
          { label: "01:50", value: 21 },
          { label: "02:00", value: 32 },
          { label: "02:10", value: 33 },
          { label: "02:20", value: 34 },
          { label: "02:30", value: 35 },
          { label: "02:40", value: 36 },
          { label: "02:50", value: 37 },
          { label: "03:00", value: 48 },
          { label: "03:10", value: 49 },
          { label: "03:20", value: 50 },
          { label: "03:30", value: 51 },
          { label: "03:40", value: 52 },
          { label: "03:50", value: 53 },
          { label: "04:00", value: 64 },
          { label: "04:10", value: 65 },
          { label: "04:20", value: 66 },
          { label: "04:30", value: 67 },
          { label: "04:40", value: 68 },
          { label: "04:50", value: 69 },
          { label: "05:00", value: 80 },
          { label: "05:10", value: 81 },
          { label: "05:20", value: 82 },
          { label: "05:30", value: 83 },
          { label: "05:40", value: 84 },
          { label: "05:50", value: 85 },
          { label: "06:00", value: 96 },
          { label: "06:10", value: 97 },
          { label: "06:20", value: 98 },
          { label: "06:30", value: 99 },
          { label: "06:40", value: 100 },
          { label: "06:50", value: 101 },
          { label: "07:00", value: 112 },
          { label: "07:10", value: 113 },
          { label: "07:20", value: 114 },
          { label: "07:30", value: 115 },
          { label: "07:40", value: 116 },
          { label: "07:50", value: 117 },
          { label: "08:00", value: 128 },
          { label: "08:10", value: 129 },
          { label: "08:20", value: 130 },
          { label: "08:30", value: 131 },
          { label: "08:40", value: 132 },
          { label: "08:50", value: 133 },
          { label: "09:00", value: 144 },
        ],
      },
      {
        name: "Duration of the Fifth Time Period",
        check: "timeE",
        value: null,
        show: true,
        interval: [
          { label: "0:00", value: 0 },
          { label: "00:10", value: 1 },
          { label: "00:20", value: 2 },
          { label: "00:30", value: 3 },
          { label: "00:40", value: 4 },
          { label: "00:50", value: 5 },
          { label: "01:00", value: 16 },
          { label: "01:10", value: 17 },
          { label: "01:20", value: 18 },
          { label: "01:30", value: 19 },
          { label: "01:40", value: 20 },
          { label: "01:50", value: 21 },
          { label: "02:00", value: 32 },
          { label: "02:10", value: 33 },
          { label: "02:20", value: 34 },
          { label: "02:30", value: 35 },
          { label: "02:40", value: 36 },
          { label: "02:50", value: 37 },
          { label: "03:00", value: 48 },
          { label: "03:10", value: 49 },
          { label: "03:20", value: 50 },
          { label: "03:30", value: 51 },
          { label: "03:40", value: 52 },
          { label: "03:50", value: 53 },
          { label: "04:00", value: 64 },
          { label: "04:10", value: 65 },
          { label: "04:20", value: 66 },
          { label: "04:30", value: 67 },
          { label: "04:40", value: 68 },
          { label: "04:50", value: 69 },
          { label: "05:00", value: 80 },
          { label: "05:10", value: 81 },
          { label: "05:20", value: 82 },
          { label: "05:30", value: 83 },
          { label: "05:40", value: 84 },
          { label: "05:50", value: 85 },
          { label: "06:00", value: 96 },
          { label: "06:10", value: 97 },
          { label: "06:20", value: 98 },
          { label: "06:30", value: 99 },
          { label: "06:40", value: 100 },
          { label: "06:50", value: 101 },
          { label: "07:00", value: 112 },
          { label: "07:10", value: 113 },
          { label: "07:20", value: 114 },
          { label: "07:30", value: 115 },
          { label: "07:40", value: 116 },
          { label: "07:50", value: 117 },
          { label: "08:00", value: 128 },
          { label: "08:10", value: 129 },
          { label: "08:20", value: 130 },
          { label: "08:30", value: 131 },
          { label: "08:40", value: 132 },
          { label: "08:50", value: 133 },
          { label: "09:00", value: 144 },
        ],
      },
      {
        name: "Duration of the Sixth Time Period",
        check: "timeF",
        value: null,
        show: true,
        interval: [
          { label: "0:00", value: 0 },
          { label: "00:10", value: 1 },
          { label: "00:20", value: 2 },
          { label: "00:30", value: 3 },
          { label: "00:40", value: 4 },
          { label: "00:50", value: 5 },
          { label: "01:00", value: 16 },
          { label: "01:10", value: 17 },
          { label: "01:20", value: 18 },
          { label: "01:30", value: 19 },
          { label: "01:40", value: 20 },
          { label: "01:50", value: 21 },
          { label: "02:00", value: 32 },
          { label: "02:10", value: 33 },
          { label: "02:20", value: 34 },
          { label: "02:30", value: 35 },
          { label: "02:40", value: 36 },
          { label: "02:50", value: 37 },
          { label: "03:00", value: 48 },
          { label: "03:10", value: 49 },
          { label: "03:20", value: 50 },
          { label: "03:30", value: 51 },
          { label: "03:40", value: 52 },
          { label: "03:50", value: 53 },
          { label: "04:00", value: 64 },
          { label: "04:10", value: 65 },
          { label: "04:20", value: 66 },
          { label: "04:30", value: 67 },
          { label: "04:40", value: 68 },
          { label: "04:50", value: 69 },
          { label: "05:00", value: 80 },
          { label: "05:10", value: 81 },
          { label: "05:20", value: 82 },
          { label: "05:30", value: 83 },
          { label: "05:40", value: 84 },
          { label: "05:50", value: 85 },
          { label: "06:00", value: 96 },
          { label: "06:10", value: 97 },
          { label: "06:20", value: 98 },
          { label: "06:30", value: 99 },
          { label: "06:40", value: 100 },
          { label: "06:50", value: 101 },
          { label: "07:00", value: 112 },
          { label: "07:10", value: 113 },
          { label: "07:20", value: 114 },
          { label: "07:30", value: 115 },
          { label: "07:40", value: 116 },
          { label: "07:50", value: 117 },
          { label: "08:00", value: 128 },
          { label: "08:10", value: 129 },
          { label: "08:20", value: 130 },
          { label: "08:30", value: 131 },
          { label: "08:40", value: 132 },
          { label: "08:50", value: 133 },
          { label: "09:00", value: 144 },
        ],
      },
      {
        name: "Battery Type",
        check: "18",
        value: null,
        show: true,
        interval: [
          { label: "Gel", value: 1 },
          { label: "Lead Acid", value: 2 },
          { label: "Custom", value: 3 },
          { label: "Lithium-ion", value: 4 },
        ],
      },
      {
        name: "Charging Voltage",
        check: "32",
        value: null,
        show: true,
        interval: [
          { label: "8.0V", value: 8 },
          { label: "8.1V", value: 8.1 },
          { label: "8.2V", value: 8.2 },
          { label: "8.3V", value: 8.3 },
          { label: "8.4V", value: 8.4 },
          { label: "8.5V", value: 8.5 },
          { label: "8.6V", value: 8.6 },
          { label: "8.7V", value: 8.7 },
          { label: "8.8V", value: 8.8 },
          { label: "8.9V", value: 8.9 },
          { label: "9.0V", value: 9 },
          { label: "9.1V", value: 9.1 },
          { label: "9.2V", value: 9.2 },
          { label: "9.3V", value: 9.3 },
          { label: "9.4V", value: 9.4 },
          { label: "9.5V", value: 9.5 },
          { label: "9.6V", value: 9.6 },
          { label: "9.7V", value: 9.7 },
          { label: "9.8V", value: 9.8 },
          { label: "9.9V", value: 9.9 },
          { label: "10.0V", value: 10 },
          { label: "10.1V", value: 10.1 },
          { label: "10.2V", value: 10.2 },
          { label: "10.3V", value: 10.3 },
          { label: "10.4V", value: 10.4 },
          { label: "10.5V", value: 10.5 },
          { label: "10.6V", value: 10.6 },
          { label: "10.7V", value: 10.7 },
          { label: "10.8V", value: 10.8 },
          { label: "10.9V", value: 10.9 },
          { label: "11.0V", value: 11 },
          { label: "11.1V", value: 11.1 },
          { label: "11.2V", value: 11.2 },
          { label: "11.3V", value: 11.3 },
          { label: "11.4V", value: 11.4 },
          { label: "11.5V", value: 11.5 },
          { label: "11.6V", value: 11.6 },
          { label: "11.7V", value: 11.7 },
          { label: "11.8V", value: 11.8 },
          { label: "11.9V", value: 11.9 },
          { label: "12.0V", value: 12 },
          { label: "12.1V", value: 12.1 },
          { label: "12.2V", value: 12.2 },
          { label: "12.3V", value: 12.3 },
          { label: "12.4V", value: 12.4 },
          { label: "12.5V", value: 12.5 },
          { label: "12.6V", value: 12.6 },
          { label: "12.7V", value: 12.7 },
          { label: "12.8V", value: 12.8 },
          { label: "12.9V", value: 12.9 },
          { label: "13.0V", value: 13 },
          { label: "13.1V", value: 13.1 },
          { label: "13.2V", value: 13.2 },
          { label: "13.3V", value: 13.3 },
          { label: "13.4V", value: 13.4 },
          { label: "13.5V", value: 13.5 },
          { label: "13.6V", value: 13.6 },
          { label: "13.7V", value: 13.7 },
          { label: "13.8V", value: 13.8 },
          { label: "13.9V", value: 13.9 },
          { label: "14.0V", value: 14 },
          { label: "14.1V", value: 14.1 },
          { label: "14.2V", value: 14.2 },
          { label: "14.3V", value: 14.3 },
          { label: "14.4V", value: 14.4 },
          { label: "14.5V", value: 14.5 },
          { label: "14.6V", value: 14.6 },
          { label: "14.7V", value: 14.7 },
          { label: "14.8V", value: 14.8 },
          { label: "14.9V", value: 14.9 },
          { label: "15.0V", value: 15 },
          { label: "15.1V", value: 15.1 },
          { label: "15.2V", value: 15.2 },
          { label: "15.3V", value: 15.3 },
          { label: "15.4V", value: 15.4 },
          { label: "15.5V", value: 15.5 },
          { label: "15.6V", value: 15.6 },
          { label: "15.7V", value: 15.7 },
          { label: "15.8V", value: 15.8 },
          { label: "15.9V", value: 15.9 },
          { label: "16.0V", value: 16 },
          { label: "16.1V", value: 16.1 },
          { label: "16.2V", value: 16.2 },
          { label: "16.3V", value: 16.3 },
          { label: "16.4V", value: 16.4 },
          { label: "16.5V", value: 16.5 },
          { label: "16.6V", value: 16.6 },
          { label: "16.7V", value: 16.7 },
          { label: "16.8V", value: 16.8 },
          { label: "16.9V", value: 16.9 },
          { label: "17.0V", value: 17 },
          { label: "17.1V", value: 17.1 },
          { label: "17.2V", value: 17.2 },
          { label: "17.3V", value: 17.3 },
          { label: "17.4V", value: 17.4 },
          { label: "17.5V", value: 17.5 },
          { label: "17.6V", value: 17.6 },
          { label: "17.7V", value: 17.7 },
          { label: "17.8V", value: 17.8 },
          { label: "17.9V", value: 17.9 },
          { label: "18.0V", value: 18 },
        ],
      },
      {
        name: "Charging Current",
        check: "33",
        value: null,
        show: true,
        interval: [
          {
            label: "0.1A",
            value: 0.1,
          },
          {
            label: "0.2A",
            value: 0.2,
          },
          {
            label: "0.3A",
            value: 0.3,
          },
          {
            label: "0.4A",
            value: 0.4,
          },
          {
            label: "0.5A",
            value: 0.5,
          },
          {
            label: "0.6A",
            value: 0.6,
          },
          {
            label: "0.7A",
            value: 0.7,
          },
          {
            label: "0.8A",
            value: 0.8,
          },
          {
            label: "0.9A",
            value: 0.9,
          },
          {
            label: "1.0A",
            value: 1,
          },
          {
            label: "1.1A",
            value: 1.1,
          },
          {
            label: "1.2A",
            value: 1.2,
          },
          {
            label: "1.3A",
            value: 1.3,
          },
          {
            label: "1.4A",
            value: 1.4,
          },
          {
            label: "1.5A",
            value: 1.5,
          },
          {
            label: "1.6A",
            value: 1.6,
          },
          {
            label: "1.7A",
            value: 1.7,
          },
          {
            label: "1.8A",
            value: 1.8,
          },
          {
            label: "1.9A",
            value: 1.9,
          },
          {
            label: "2.0A",
            value: 2,
          },
          {
            label: "2.1A",
            value: 2.1,
          },
          {
            label: "2.2A",
            value: 2.2,
          },
          {
            label: "2.3A",
            value: 2.3,
          },
          {
            label: "2.4A",
            value: 2.4,
          },
          {
            label: "2.5A",
            value: 2.5,
          },
          {
            label: "2.6A",
            value: 2.6,
          },
          {
            label: "2.7A",
            value: 2.7,
          },
          {
            label: "2.8A",
            value: 2.8,
          },
          {
            label: "2.9A",
            value: 2.9,
          },
          {
            label: "3.0A",
            value: 3,
          },
          {
            label: "3.1A",
            value: 3.1,
          },
          {
            label: "3.2A",
            value: 3.2,
          },
          {
            label: "3.3A",
            value: 3.3,
          },
          {
            label: "3.4A",
            value: 3.4,
          },
          {
            label: "3.5A",
            value: 3.5,
          },
          {
            label: "3.6A",
            value: 3.6,
          },
          {
            label: "3.7A",
            value: 3.7,
          },
          {
            label: "3.8A",
            value: 3.8,
          },
          {
            label: "3.9A",
            value: 3.9,
          },
          {
            label: "4.0A",
            value: 4,
          },
          {
            label: "4.1A",
            value: 4.1,
          },
          {
            label: "4.2A",
            value: 4.2,
          },
          {
            label: "4.3A",
            value: 4.3,
          },
          {
            label: "4.4A",
            value: 4.4,
          },
          {
            label: "4.5A",
            value: 4.5,
          },
          {
            label: "4.6A",
            value: 4.6,
          },
          {
            label: "4.7A",
            value: 4.7,
          },
          {
            label: "4.8A",
            value: 4.8,
          },
          {
            label: "4.9A",
            value: 4.9,
          },
          {
            label: "5.0A",
            value: 5,
          },
          {
            label: "5.1A",
            value: 5.1,
          },
          {
            label: "5.2A",
            value: 5.2,
          },
          {
            label: "5.3A",
            value: 5.3,
          },
          {
            label: "5.4A",
            value: 5.4,
          },
          {
            label: "5.5A",
            value: 5.5,
          },
          {
            label: "5.6A",
            value: 5.6,
          },
          {
            label: "5.7A",
            value: 5.7,
          },
          {
            label: "5.8A",
            value: 5.8,
          },
          {
            label: "5.9A",
            value: 5.9,
          },
          {
            label: "6.0A",
            value: 6,
          },
          {
            label: "6.1A",
            value: 6.1,
          },
          {
            label: "6.2A",
            value: 6.2,
          },
          {
            label: "6.3A",
            value: 6.3,
          },
          {
            label: "6.4A",
            value: 6.4,
          },
          {
            label: "6.5A",
            value: 6.5,
          },
          {
            label: "6.6A",
            value: 6.6,
          },
          {
            label: "6.7A",
            value: 6.7,
          },
          {
            label: "6.8A",
            value: 6.8,
          },
          {
            label: "6.9A",
            value: 6.9,
          },
          {
            label: "7.0A",
            value: 7,
          },
          {
            label: "7.1A",
            value: 7.1,
          },
          {
            label: "7.2A",
            value: 7.2,
          },
          {
            label: "7.3A",
            value: 7.3,
          },
          {
            label: "7.4A",
            value: 7.4,
          },
          {
            label: "7.5A",
            value: 7.5,
          },
          {
            label: "7.6A",
            value: 7.6,
          },
          {
            label: "7.7A",
            value: 7.7,
          },
          {
            label: "7.8A",
            value: 7.8,
          },
          {
            label: "7.9A",
            value: 7.9,
          },
          {
            label: "8.0A",
            value: 8,
          },
          {
            label: "8.1A",
            value: 8.1,
          },
          {
            label: "8.2A",
            value: 8.2,
          },
          {
            label: "8.3A",
            value: 8.3,
          },
          {
            label: "8.4A",
            value: 8.4,
          },
          {
            label: "8.5A",
            value: 8.5,
          },
          {
            label: "8.6A",
            value: 8.6,
          },
          {
            label: "8.7A",
            value: 8.7,
          },
          {
            label: "8.8A",
            value: 8.8,
          },
          {
            label: "8.9A",
            value: 8.9,
          },
          {
            label: "9.0A",
            value: 9,
          },
          {
            label: "9.1A",
            value: 9.1,
          },
          {
            label: "9.2A",
            value: 9.2,
          },
          {
            label: "9.3A",
            value: 9.3,
          },
          {
            label: "9.4A",
            value: 9.4,
          },
          {
            label: "9.5A",
            value: 9.5,
          },
          {
            label: "9.6A",
            value: 9.6,
          },
          {
            label: "9.7A",
            value: 9.7,
          },
          {
            label: "9.8A",
            value: 9.8,
          },
          {
            label: "9.9A",
            value: 9.9,
          },
          {
            label: "10.0A",
            value: 10,
          },
          {
            label: "10.1A",
            value: 10.1,
          },
          {
            label: "10.2A",
            value: 10.2,
          },
          {
            label: "10.3A",
            value: 10.3,
          },
          {
            label: "10.4A",
            value: 10.4,
          },
          {
            label: "10.5A",
            value: 10.5,
          },
          {
            label: "10.6A",
            value: 10.6,
          },
          {
            label: "10.7A",
            value: 10.7,
          },
          {
            label: "10.8A",
            value: 10.8,
          },
          {
            label: "10.9A",
            value: 10.9,
          },
          {
            label: "11.0A",
            value: 11,
          },
          {
            label: "11.1A",
            value: 11.1,
          },
          {
            label: "11.2A",
            value: 11.2,
          },
          {
            label: "11.3A",
            value: 11.3,
          },
          {
            label: "11.4A",
            value: 11.4,
          },
          {
            label: "11.5A",
            value: 11.5,
          },
          {
            label: "11.6A",
            value: 11.6,
          },
          {
            label: "11.7A",
            value: 11.7,
          },
          {
            label: "11.8A",
            value: 11.8,
          },
          {
            label: "11.9A",
            value: 11.9,
          },
          {
            label: "12.0A",
            value: 12,
          },
          {
            label: "12.1A",
            value: 12.1,
          },
          {
            label: "12.2A",
            value: 12.2,
          },
          {
            label: "12.3A",
            value: 12.3,
          },
          {
            label: "12.4A",
            value: 12.4,
          },
          {
            label: "12.5A",
            value: 12.5,
          },
          {
            label: "12.6A",
            value: 12.6,
          },
          {
            label: "12.7A",
            value: 12.7,
          },
          {
            label: "12.8A",
            value: 12.8,
          },
          {
            label: "12.9A",
            value: 12.9,
          },
          {
            label: "13.0A",
            value: 13,
          },
          {
            label: "13.1A",
            value: 13.1,
          },
          {
            label: "13.2A",
            value: 13.2,
          },
          {
            label: "13.3A",
            value: 13.3,
          },
          {
            label: "13.4A",
            value: 13.4,
          },
          {
            label: "13.5A",
            value: 13.5,
          },
          {
            label: "13.6A",
            value: 13.6,
          },
          {
            label: "13.7A",
            value: 13.7,
          },
          {
            label: "13.8A",
            value: 13.8,
          },
          {
            label: "13.9A",
            value: 13.9,
          },
          {
            label: "14.0A",
            value: 14,
          },
          {
            label: "14.1A",
            value: 14.1,
          },
          {
            label: "14.2A",
            value: 14.2,
          },
          {
            label: "14.3A",
            value: 14.3,
          },
          {
            label: "14.4A",
            value: 14.4,
          },
          {
            label: "14.5A",
            value: 14.5,
          },
          {
            label: "14.6A",
            value: 14.6,
          },
          {
            label: "14.7A",
            value: 14.7,
          },
          {
            label: "14.8A",
            value: 14.8,
          },
          {
            label: "14.9A",
            value: 14.9,
          },
          {
            label: "15.0A",
            value: 15,
          },
          {
            label: "15.1A",
            value: 15.1,
          },
          {
            label: "15.2A",
            value: 15.2,
          },
          {
            label: "15.3A",
            value: 15.3,
          },
          {
            label: "15.4A",
            value: 15.4,
          },
          {
            label: "15.5A",
            value: 15.5,
          },
          {
            label: "15.6A",
            value: 15.6,
          },
          {
            label: "15.7A",
            value: 15.7,
          },
          {
            label: "15.8A",
            value: 15.8,
          },
          {
            label: "15.9A",
            value: 15.9,
          },
          {
            label: "16.0A",
            value: 16,
          },
          {
            label: "16.1A",
            value: 16.1,
          },
          {
            label: "16.2A",
            value: 16.2,
          },
          {
            label: "16.3A",
            value: 16.3,
          },
          {
            label: "16.4A",
            value: 16.4,
          },
          {
            label: "16.5A",
            value: 16.5,
          },
          {
            label: "16.6A",
            value: 16.6,
          },
          {
            label: "16.7A",
            value: 16.7,
          },
          {
            label: "16.8A",
            value: 16.8,
          },
          {
            label: "16.9A",
            value: 16.9,
          },
          {
            label: "17.0A",
            value: 17,
          },
          {
            label: "17.1A",
            value: 17.1,
          },
          {
            label: "17.2A",
            value: 17.2,
          },
          {
            label: "17.3A",
            value: 17.3,
          },
          {
            label: "17.4A",
            value: 17.4,
          },
          {
            label: "17.5A",
            value: 17.5,
          },
          {
            label: "17.6A",
            value: 17.6,
          },
          {
            label: "17.7A",
            value: 17.7,
          },
          {
            label: "17.8A",
            value: 17.8,
          },
          {
            label: "17.9A",
            value: 17.9,
          },
          {
            label: "18.0A",
            value: 18,
          },
          {
            label: "18.1A",
            value: 18.1,
          },
          {
            label: "18.2A",
            value: 18.2,
          },
          {
            label: "18.3A",
            value: 18.3,
          },
          {
            label: "18.4A",
            value: 18.4,
          },
          {
            label: "18.5A",
            value: 18.5,
          },
          {
            label: "18.6A",
            value: 18.6,
          },
          {
            label: "18.7A",
            value: 18.7,
          },
          {
            label: "18.8A",
            value: 18.8,
          },
          {
            label: "18.9A",
            value: 18.9,
          },
          {
            label: "19.0A",
            value: 19,
          },
          {
            label: "19.1A",
            value: 19.1,
          },
          {
            label: "19.2A",
            value: 19.2,
          },
          {
            label: "19.3A",
            value: 19.3,
          },
          {
            label: "19.4A",
            value: 19.4,
          },
          {
            label: "19.5A",
            value: 19.5,
          },
          {
            label: "19.6A",
            value: 19.6,
          },
          {
            label: "19.7A",
            value: 19.7,
          },
          {
            label: "19.8A",
            value: 19.8,
          },
          {
            label: "19.9A",
            value: 19.9,
          },
          {
            label: "20.0A",
            value: 20,
          },
          {
            label: "20.1A",
            value: 20.1,
          },
          {
            label: "20.2A",
            value: 20.2,
          },
          {
            label: "20.3A",
            value: 20.3,
          },
          {
            label: "20.4A",
            value: 20.4,
          },
          {
            label: "20.5A",
            value: 20.5,
          },
          {
            label: "20.6A",
            value: 20.6,
          },
          {
            label: "20.7A",
            value: 20.7,
          },
          {
            label: "20.8A",
            value: 20.8,
          },
          {
            label: "20.9A",
            value: 20.9,
          },
          {
            label: "21.0A",
            value: 21,
          },
          {
            label: "21.1A",
            value: 21.1,
          },
          {
            label: "21.2A",
            value: 21.2,
          },
          {
            label: "21.3A",
            value: 21.3,
          },
          {
            label: "21.4A",
            value: 21.4,
          },
          {
            label: "21.5A",
            value: 21.5,
          },
          {
            label: "21.6A",
            value: 21.6,
          },
          {
            label: "21.7A",
            value: 21.7,
          },
          {
            label: "21.8A",
            value: 21.8,
          },
          {
            label: "21.9A",
            value: 21.9,
          },
          {
            label: "22.0A",
            value: 22,
          },
          {
            label: "22.1A",
            value: 22.1,
          },
          {
            label: "22.2A",
            value: 22.2,
          },
          {
            label: "22.3A",
            value: 22.3,
          },
          {
            label: "22.4A",
            value: 22.4,
          },
          {
            label: "22.5A",
            value: 22.5,
          },
          {
            label: "22.6A",
            value: 22.6,
          },
          {
            label: "22.7A",
            value: 22.7,
          },
          {
            label: "22.8A",
            value: 22.8,
          },
          {
            label: "22.9A",
            value: 22.9,
          },
          {
            label: "23.0A",
            value: 23,
          },
          {
            label: "23.1A",
            value: 23.1,
          },
          {
            label: "23.2A",
            value: 23.2,
          },
          {
            label: "23.3A",
            value: 23.3,
          },
          {
            label: "23.4A",
            value: 23.4,
          },
          {
            label: "23.5A",
            value: 23.5,
          },
          {
            label: "23.6A",
            value: 23.6,
          },
          {
            label: "23.7A",
            value: 23.7,
          },
          {
            label: "23.8A",
            value: 23.8,
          },
          {
            label: "23.9A",
            value: 23.9,
          },
          {
            label: "24.0A",
            value: 24,
          },
          {
            label: "24.1A",
            value: 24.1,
          },
          {
            label: "24.2A",
            value: 24.2,
          },
          {
            label: "24.3A",
            value: 24.3,
          },
          {
            label: "24.4A",
            value: 24.4,
          },
          {
            label: "24.5A",
            value: 24.5,
          },
          {
            label: "24.6A",
            value: 24.6,
          },
          {
            label: "24.7A",
            value: 24.7,
          },
          {
            label: "24.8A",
            value: 24.8,
          },
          {
            label: "24.9A",
            value: 24.9,
          },
          {
            label: "25.0A",
            value: 25,
          },
          {
            label: "25.1A",
            value: 25.1,
          },
          {
            label: "25.2A",
            value: 25.2,
          },
          {
            label: "25.3A",
            value: 25.3,
          },
          {
            label: "25.4A",
            value: 25.4,
          },
          {
            label: "25.5A",
            value: 25.5,
          },
          {
            label: "25.6A",
            value: 25.6,
          },
          {
            label: "25.7A",
            value: 25.7,
          },
          {
            label: "25.8A",
            value: 25.8,
          },
          {
            label: "25.9A",
            value: 25.9,
          },
          {
            label: "26.0A",
            value: 26,
          },
          {
            label: "26.1A",
            value: 26.1,
          },
          {
            label: "26.2A",
            value: 26.2,
          },
          {
            label: "26.3A",
            value: 26.3,
          },
          {
            label: "26.4A",
            value: 26.4,
          },
          {
            label: "26.5A",
            value: 26.5,
          },
          {
            label: "26.6A",
            value: 26.6,
          },
          {
            label: "26.7A",
            value: 26.7,
          },
          {
            label: "26.8A",
            value: 26.8,
          },
          {
            label: "26.9A",
            value: 26.9,
          },
          {
            label: "27.0A",
            value: 27,
          },
          {
            label: "27.1A",
            value: 27.1,
          },
          {
            label: "27.2A",
            value: 27.2,
          },
          {
            label: "27.3A",
            value: 27.3,
          },
          {
            label: "27.4A",
            value: 27.4,
          },
          {
            label: "27.5A",
            value: 27.5,
          },
          {
            label: "27.6A",
            value: 27.6,
          },
          {
            label: "27.7A",
            value: 27.7,
          },
          {
            label: "27.8A",
            value: 27.8,
          },
          {
            label: "27.9A",
            value: 27.9,
          },
          {
            label: "28.0A",
            value: 28,
          },
          {
            label: "28.1A",
            value: 28.1,
          },
          {
            label: "28.2A",
            value: 28.2,
          },
          {
            label: "28.3A",
            value: 28.3,
          },
          {
            label: "28.4A",
            value: 28.4,
          },
          {
            label: "28.5A",
            value: 28.5,
          },
          {
            label: "28.6A",
            value: 28.6,
          },
          {
            label: "28.7A",
            value: 28.7,
          },
          {
            label: "28.8A",
            value: 28.8,
          },
          {
            label: "28.9A",
            value: 28.9,
          },
          {
            label: "29.0A",
            value: 29,
          },
          {
            label: "29.1A",
            value: 29.1,
          },
          {
            label: "29.2A",
            value: 29.2,
          },
          {
            label: "29.3A",
            value: 29.3,
          },
          {
            label: "29.4A",
            value: 29.4,
          },
          {
            label: "29.5A",
            value: 29.5,
          },
          {
            label: "29.6A",
            value: 29.6,
          },
          {
            label: "29.7A",
            value: 29.7,
          },
          {
            label: "29.8A",
            value: 29.8,
          },
          {
            label: "29.9A",
            value: 29.9,
          },
          {
            label: "30.0A",
            value: 30,
          },
          {
            label: "30.1A",
            value: 30.1,
          },
          {
            label: "30.2A",
            value: 30.2,
          },
          {
            label: "30.3A",
            value: 30.3,
          },
          {
            label: "30.4A",
            value: 30.4,
          },
          {
            label: "30.5A",
            value: 30.5,
          },
          {
            label: "30.6A",
            value: 30.6,
          },
          {
            label: "30.7A",
            value: 30.7,
          },
          {
            label: "30.8A",
            value: 30.8,
          },
          {
            label: "30.9A",
            value: 30.9,
          },
          {
            label: "31.0A",
            value: 31,
          },
          {
            label: "31.1A",
            value: 31.1,
          },
          {
            label: "31.2A",
            value: 31.2,
          },
          {
            label: "31.3A",
            value: 31.3,
          },
          {
            label: "31.4A",
            value: 31.4,
          },
          {
            label: "31.5A",
            value: 31.5,
          },
          {
            label: "31.6A",
            value: 31.6,
          },
          {
            label: "31.7A",
            value: 31.7,
          },
          {
            label: "31.8A",
            value: 31.8,
          },
          {
            label: "31.9A",
            value: 31.9,
          },
          {
            label: "32.0A",
            value: 32,
          },
          {
            label: "32.1A",
            value: 32.1,
          },
          {
            label: "32.2A",
            value: 32.2,
          },
          {
            label: "32.3A",
            value: 32.3,
          },
          {
            label: "32.4A",
            value: 32.4,
          },
          {
            label: "32.5A",
            value: 32.5,
          },
          {
            label: "32.6A",
            value: 32.6,
          },
          {
            label: "32.7A",
            value: 32.7,
          },
          {
            label: "32.8A",
            value: 32.8,
          },
          {
            label: "32.9A",
            value: 32.9,
          },
          {
            label: "33.0A",
            value: 33,
          },
          {
            label: "33.1A",
            value: 33.1,
          },
          {
            label: "33.2A",
            value: 33.2,
          },
          {
            label: "33.3A",
            value: 33.3,
          },
          {
            label: "33.4A",
            value: 33.4,
          },
          {
            label: "33.5A",
            value: 33.5,
          },
          {
            label: "33.6A",
            value: 33.6,
          },
          {
            label: "33.7A",
            value: 33.7,
          },
          {
            label: "33.8A",
            value: 33.8,
          },
          {
            label: "33.9A",
            value: 33.9,
          },
          {
            label: "34.0A",
            value: 34,
          },
          {
            label: "34.1A",
            value: 34.1,
          },
          {
            label: "34.2A",
            value: 34.2,
          },
          {
            label: "34.3A",
            value: 34.3,
          },
          {
            label: "34.4A",
            value: 34.4,
          },
          {
            label: "34.5A",
            value: 34.5,
          },
          {
            label: "34.6A",
            value: 34.6,
          },
          {
            label: "34.7A",
            value: 34.7,
          },
          {
            label: "34.8A",
            value: 34.8,
          },
          {
            label: "34.9A",
            value: 34.9,
          },
          {
            label: "35.0A",
            value: 35,
          },
          {
            label: "35.1A",
            value: 35.1,
          },
          {
            label: "35.2A",
            value: 35.2,
          },
          {
            label: "35.3A",
            value: 35.3,
          },
          {
            label: "35.4A",
            value: 35.4,
          },
          {
            label: "35.5A",
            value: 35.5,
          },
          {
            label: "35.6A",
            value: 35.6,
          },
          {
            label: "35.7A",
            value: 35.7,
          },
          {
            label: "35.8A",
            value: 35.8,
          },
          {
            label: "35.9A",
            value: 35.9,
          },
          {
            label: "36.0A",
            value: 36,
          },
          {
            label: "36.1A",
            value: 36.1,
          },
          {
            label: "36.2A",
            value: 36.2,
          },
          {
            label: "36.3A",
            value: 36.3,
          },
          {
            label: "36.4A",
            value: 36.4,
          },
          {
            label: "36.5A",
            value: 36.5,
          },
          {
            label: "36.6A",
            value: 36.6,
          },
          {
            label: "36.7A",
            value: 36.7,
          },
          {
            label: "36.8A",
            value: 36.8,
          },
          {
            label: "36.9A",
            value: 36.9,
          },
          {
            label: "37.0A",
            value: 37,
          },
          {
            label: "37.1A",
            value: 37.1,
          },
          {
            label: "37.2A",
            value: 37.2,
          },
          {
            label: "37.3A",
            value: 37.3,
          },
          {
            label: "37.4A",
            value: 37.4,
          },
          {
            label: "37.5A",
            value: 37.5,
          },
          {
            label: "37.6A",
            value: 37.6,
          },
          {
            label: "37.7A",
            value: 37.7,
          },
          {
            label: "37.8A",
            value: 37.8,
          },
          {
            label: "37.9A",
            value: 37.9,
          },
          {
            label: "38.0A",
            value: 38,
          },
          {
            label: "38.1A",
            value: 38.1,
          },
          {
            label: "38.2A",
            value: 38.2,
          },
          {
            label: "38.3A",
            value: 38.3,
          },
          {
            label: "38.4A",
            value: 38.4,
          },
          {
            label: "38.5A",
            value: 38.5,
          },
          {
            label: "38.6A",
            value: 38.6,
          },
          {
            label: "38.7A",
            value: 38.7,
          },
          {
            label: "38.8A",
            value: 38.8,
          },
          {
            label: "38.9A",
            value: 38.9,
          },
          {
            label: "39.0A",
            value: 39,
          },
          {
            label: "39.1A",
            value: 39.1,
          },
          {
            label: "39.2A",
            value: 39.2,
          },
          {
            label: "39.3A",
            value: 39.3,
          },
          {
            label: "39.4A",
            value: 39.4,
          },
          {
            label: "39.5A",
            value: 39.5,
          },
          {
            label: "39.6A",
            value: 39.6,
          },
          {
            label: "39.7A",
            value: 39.7,
          },
          {
            label: "39.8A",
            value: 39.8,
          },
          {
            label: "39.9A",
            value: 39.9,
          },
          {
            label: "40.0A",
            value: 40,
          },
          {
            label: "40.1A",
            value: 40.1,
          },
          {
            label: "40.2A",
            value: 40.2,
          },
          {
            label: "40.3A",
            value: 40.3,
          },
          {
            label: "40.4A",
            value: 40.4,
          },
          {
            label: "40.5A",
            value: 40.5,
          },
          {
            label: "40.6A",
            value: 40.6,
          },
          {
            label: "40.7A",
            value: 40.7,
          },
          {
            label: "40.8A",
            value: 40.8,
          },
          {
            label: "40.9A",
            value: 40.9,
          },
          {
            label: "41.0A",
            value: 41,
          },
          {
            label: "41.1A",
            value: 41.1,
          },
          {
            label: "41.2A",
            value: 41.2,
          },
          {
            label: "41.3A",
            value: 41.3,
          },
          {
            label: "41.4A",
            value: 41.4,
          },
          {
            label: "41.5A",
            value: 41.5,
          },
          {
            label: "41.6A",
            value: 41.6,
          },
          {
            label: "41.7A",
            value: 41.7,
          },
          {
            label: "41.8A",
            value: 41.8,
          },
          {
            label: "41.9A",
            value: 41.9,
          },
          {
            label: "42.0A",
            value: 42,
          },
          {
            label: "42.1A",
            value: 42.1,
          },
          {
            label: "42.2A",
            value: 42.2,
          },
          {
            label: "42.3A",
            value: 42.3,
          },
          {
            label: "42.4A",
            value: 42.4,
          },
          {
            label: "42.5A",
            value: 42.5,
          },
          {
            label: "42.6A",
            value: 42.6,
          },
          {
            label: "42.7A",
            value: 42.7,
          },
          {
            label: "42.8A",
            value: 42.8,
          },
          {
            label: "42.9A",
            value: 42.9,
          },
          {
            label: "43.0A",
            value: 43,
          },
          {
            label: "43.1A",
            value: 43.1,
          },
          {
            label: "43.2A",
            value: 43.2,
          },
          {
            label: "43.3A",
            value: 43.3,
          },
          {
            label: "43.4A",
            value: 43.4,
          },
          {
            label: "43.5A",
            value: 43.5,
          },
          {
            label: "43.6A",
            value: 43.6,
          },
          {
            label: "43.7A",
            value: 43.7,
          },
          {
            label: "43.8A",
            value: 43.8,
          },
          {
            label: "43.9A",
            value: 43.9,
          },
          {
            label: "44.0A",
            value: 44,
          },
          {
            label: "44.1A",
            value: 44.1,
          },
          {
            label: "44.2A",
            value: 44.2,
          },
          {
            label: "44.3A",
            value: 44.3,
          },
          {
            label: "44.4A",
            value: 44.4,
          },
          {
            label: "44.5A",
            value: 44.5,
          },
          {
            label: "44.6A",
            value: 44.6,
          },
          {
            label: "44.7A",
            value: 44.7,
          },
          {
            label: "44.8A",
            value: 44.8,
          },
          {
            label: "44.9A",
            value: 44.9,
          },
          {
            label: "45.0A",
            value: 45,
          },
          {
            label: "45.1A",
            value: 45.1,
          },
          {
            label: "45.2A",
            value: 45.2,
          },
          {
            label: "45.3A",
            value: 45.3,
          },
          {
            label: "45.4A",
            value: 45.4,
          },
          {
            label: "45.5A",
            value: 45.5,
          },
          {
            label: "45.6A",
            value: 45.6,
          },
          {
            label: "45.7A",
            value: 45.7,
          },
          {
            label: "45.8A",
            value: 45.8,
          },
          {
            label: "45.9A",
            value: 45.9,
          },
          {
            label: "46.0A",
            value: 46,
          },
          {
            label: "46.1A",
            value: 46.1,
          },
          {
            label: "46.2A",
            value: 46.2,
          },
          {
            label: "46.3A",
            value: 46.3,
          },
          {
            label: "46.4A",
            value: 46.4,
          },
          {
            label: "46.5A",
            value: 46.5,
          },
          {
            label: "46.6A",
            value: 46.6,
          },
          {
            label: "46.7A",
            value: 46.7,
          },
          {
            label: "46.8A",
            value: 46.8,
          },
          {
            label: "46.9A",
            value: 46.9,
          },
          {
            label: "47.0A",
            value: 47,
          },
          {
            label: "47.1A",
            value: 47.1,
          },
          {
            label: "47.2A",
            value: 47.2,
          },
          {
            label: "47.3A",
            value: 47.3,
          },
          {
            label: "47.4A",
            value: 47.4,
          },
          {
            label: "47.5A",
            value: 47.5,
          },
          {
            label: "47.6A",
            value: 47.6,
          },
          {
            label: "47.7A",
            value: 47.7,
          },
          {
            label: "47.8A",
            value: 47.8,
          },
          {
            label: "47.9A",
            value: 47.9,
          },
          {
            label: "48.0A",
            value: 48,
          },
          {
            label: "48.1A",
            value: 48.1,
          },
          {
            label: "48.2A",
            value: 48.2,
          },
          {
            label: "48.3A",
            value: 48.3,
          },
          {
            label: "48.4A",
            value: 48.4,
          },
          {
            label: "48.5A",
            value: 48.5,
          },
          {
            label: "48.6A",
            value: 48.6,
          },
          {
            label: "48.7A",
            value: 48.7,
          },
          {
            label: "48.8A",
            value: 48.8,
          },
          {
            label: "48.9A",
            value: 48.9,
          },
          {
            label: "49.0A",
            value: 49,
          },
          {
            label: "49.1A",
            value: 49.1,
          },
          {
            label: "49.2A",
            value: 49.2,
          },
          {
            label: "49.3A",
            value: 49.3,
          },
          {
            label: "49.4A",
            value: 49.4,
          },
          {
            label: "49.5A",
            value: 49.5,
          },
          {
            label: "49.6A",
            value: 49.6,
          },
          {
            label: "49.7A",
            value: 49.7,
          },
          {
            label: "49.8A",
            value: 49.8,
          },
          {
            label: "49.9A",
            value: 49.9,
          },
          {
            label: "50.0A",
            value: 50,
          },
        ],
      },
      {
        name: "Charging End Current",
        check: "34",
        value: null,
        show: true,
        interval: [
          {
            label: "0.1A",
            value: 0.1,
          },
          {
            label: "0.2A",
            value: 0.2,
          },
          {
            label: "0.3A",
            value: 0.3,
          },
          {
            label: "0.4A",
            value: 0.4,
          },
          {
            label: "0.5A",
            value: 0.5,
          },
          {
            label: "0.6A",
            value: 0.6,
          },
          {
            label: "0.7A",
            value: 0.7,
          },
          {
            label: "0.8A",
            value: 0.8,
          },
          {
            label: "0.9A",
            value: 0.9,
          },
          {
            label: "1.0A",
            value: 1,
          },
          {
            label: "1.1A",
            value: 1.1,
          },
          {
            label: "1.2A",
            value: 1.2,
          },
          {
            label: "1.3A",
            value: 1.3,
          },
          {
            label: "1.4A",
            value: 1.4,
          },
          {
            label: "1.5A",
            value: 1.5,
          },
          {
            label: "1.6A",
            value: 1.6,
          },
          {
            label: "1.7A",
            value: 1.7,
          },
          {
            label: "1.8A",
            value: 1.8,
          },
          {
            label: "1.9A",
            value: 1.9,
          },
          {
            label: "2.0A",
            value: 2,
          },
          {
            label: "2.1A",
            value: 2.1,
          },
          {
            label: "2.2A",
            value: 2.2,
          },
          {
            label: "2.3A",
            value: 2.3,
          },
          {
            label: "2.4A",
            value: 2.4,
          },
          {
            label: "2.5A",
            value: 2.5,
          },
          {
            label: "2.6A",
            value: 2.6,
          },
          {
            label: "2.7A",
            value: 2.7,
          },
          {
            label: "2.8A",
            value: 2.8,
          },
          {
            label: "2.9A",
            value: 2.9,
          },
          {
            label: "3.0A",
            value: 3,
          },
          {
            label: "3.1A",
            value: 3.1,
          },
          {
            label: "3.2A",
            value: 3.2,
          },
          {
            label: "3.3A",
            value: 3.3,
          },
          {
            label: "3.4A",
            value: 3.4,
          },
          {
            label: "3.5A",
            value: 3.5,
          },
          {
            label: "3.6A",
            value: 3.6,
          },
          {
            label: "3.7A",
            value: 3.7,
          },
          {
            label: "3.8A",
            value: 3.8,
          },
          {
            label: "3.9A",
            value: 3.9,
          },
          {
            label: "4.0A",
            value: 4,
          },
          {
            label: "4.1A",
            value: 4.1,
          },
          {
            label: "4.2A",
            value: 4.2,
          },
          {
            label: "4.3A",
            value: 4.3,
          },
          {
            label: "4.4A",
            value: 4.4,
          },
          {
            label: "4.5A",
            value: 4.5,
          },
          {
            label: "4.6A",
            value: 4.6,
          },
          {
            label: "4.7A",
            value: 4.7,
          },
          {
            label: "4.8A",
            value: 4.8,
          },
          {
            label: "4.9A",
            value: 4.9,
          },
          {
            label: "5.0A",
            value: 5,
          },
          {
            label: "5.1A",
            value: 5.1,
          },
          {
            label: "5.2A",
            value: 5.2,
          },
          {
            label: "5.3A",
            value: 5.3,
          },
          {
            label: "5.4A",
            value: 5.4,
          },
          {
            label: "5.5A",
            value: 5.5,
          },
          {
            label: "5.6A",
            value: 5.6,
          },
          {
            label: "5.7A",
            value: 5.7,
          },
          {
            label: "5.8A",
            value: 5.8,
          },
          {
            label: "5.9A",
            value: 5.9,
          },
          {
            label: "6.0A",
            value: 6,
          },
          {
            label: "6.1A",
            value: 6.1,
          },
          {
            label: "6.2A",
            value: 6.2,
          },
          {
            label: "6.3A",
            value: 6.3,
          },
          {
            label: "6.4A",
            value: 6.4,
          },
          {
            label: "6.5A",
            value: 6.5,
          },
          {
            label: "6.6A",
            value: 6.6,
          },
          {
            label: "6.7A",
            value: 6.7,
          },
          {
            label: "6.8A",
            value: 6.8,
          },
          {
            label: "6.9A",
            value: 6.9,
          },
          {
            label: "7.0A",
            value: 7,
          },
          {
            label: "7.1A",
            value: 7.1,
          },
          {
            label: "7.2A",
            value: 7.2,
          },
          {
            label: "7.3A",
            value: 7.3,
          },
          {
            label: "7.4A",
            value: 7.4,
          },
          {
            label: "7.5A",
            value: 7.5,
          },
          {
            label: "7.6A",
            value: 7.6,
          },
          {
            label: "7.7A",
            value: 7.7,
          },
          {
            label: "7.8A",
            value: 7.8,
          },
          {
            label: "7.9A",
            value: 7.9,
          },
          {
            label: "8.0A",
            value: 8,
          },
          {
            label: "8.1A",
            value: 8.1,
          },
          {
            label: "8.2A",
            value: 8.2,
          },
          {
            label: "8.3A",
            value: 8.3,
          },
          {
            label: "8.4A",
            value: 8.4,
          },
          {
            label: "8.5A",
            value: 8.5,
          },
          {
            label: "8.6A",
            value: 8.6,
          },
          {
            label: "8.7A",
            value: 8.7,
          },
          {
            label: "8.8A",
            value: 8.8,
          },
          {
            label: "8.9A",
            value: 8.9,
          },
          {
            label: "9.0A",
            value: 9,
          },
          {
            label: "9.1A",
            value: 9.1,
          },
          {
            label: "9.2A",
            value: 9.2,
          },
          {
            label: "9.3A",
            value: 9.3,
          },
          {
            label: "9.4A",
            value: 9.4,
          },
          {
            label: "9.5A",
            value: 9.5,
          },
          {
            label: "9.6A",
            value: 9.6,
          },
          {
            label: "9.7A",
            value: 9.7,
          },
          {
            label: "9.8A",
            value: 9.8,
          },
          {
            label: "9.9A",
            value: 9.9,
          },
          {
            label: "10.0A",
            value: 10,
          },
          {
            label: "10.1A",
            value: 10.1,
          },
          {
            label: "10.2A",
            value: 10.2,
          },
          {
            label: "10.3A",
            value: 10.3,
          },
          {
            label: "10.4A",
            value: 10.4,
          },
          {
            label: "10.5A",
            value: 10.5,
          },
          {
            label: "10.6A",
            value: 10.6,
          },
          {
            label: "10.7A",
            value: 10.7,
          },
          {
            label: "10.8A",
            value: 10.8,
          },
          {
            label: "10.9A",
            value: 10.9,
          },
          {
            label: "11.0A",
            value: 11,
          },
          {
            label: "11.1A",
            value: 11.1,
          },
          {
            label: "11.2A",
            value: 11.2,
          },
          {
            label: "11.3A",
            value: 11.3,
          },
          {
            label: "11.4A",
            value: 11.4,
          },
          {
            label: "11.5A",
            value: 11.5,
          },
          {
            label: "11.6A",
            value: 11.6,
          },
          {
            label: "11.7A",
            value: 11.7,
          },
          {
            label: "11.8A",
            value: 11.8,
          },
          {
            label: "11.9A",
            value: 11.9,
          },
          {
            label: "12.0A",
            value: 12,
          },
          {
            label: "12.1A",
            value: 12.1,
          },
          {
            label: "12.2A",
            value: 12.2,
          },
          {
            label: "12.3A",
            value: 12.3,
          },
          {
            label: "12.4A",
            value: 12.4,
          },
          {
            label: "12.5A",
            value: 12.5,
          },
          {
            label: "12.6A",
            value: 12.6,
          },
          {
            label: "12.7A",
            value: 12.7,
          },
          {
            label: "12.8A",
            value: 12.8,
          },
          {
            label: "12.9A",
            value: 12.9,
          },
          {
            label: "13.0A",
            value: 13,
          },
          {
            label: "13.1A",
            value: 13.1,
          },
          {
            label: "13.2A",
            value: 13.2,
          },
          {
            label: "13.3A",
            value: 13.3,
          },
          {
            label: "13.4A",
            value: 13.4,
          },
          {
            label: "13.5A",
            value: 13.5,
          },
          {
            label: "13.6A",
            value: 13.6,
          },
          {
            label: "13.7A",
            value: 13.7,
          },
          {
            label: "13.8A",
            value: 13.8,
          },
          {
            label: "13.9A",
            value: 13.9,
          },
          {
            label: "14.0A",
            value: 14,
          },
          {
            label: "14.1A",
            value: 14.1,
          },
          {
            label: "14.2A",
            value: 14.2,
          },
          {
            label: "14.3A",
            value: 14.3,
          },
          {
            label: "14.4A",
            value: 14.4,
          },
          {
            label: "14.5A",
            value: 14.5,
          },
          {
            label: "14.6A",
            value: 14.6,
          },
          {
            label: "14.7A",
            value: 14.7,
          },
          {
            label: "14.8A",
            value: 14.8,
          },
          {
            label: "14.9A",
            value: 14.9,
          },
          {
            label: "15.0A",
            value: 15,
          },
          {
            label: "15.1A",
            value: 15.1,
          },
          {
            label: "15.2A",
            value: 15.2,
          },
          {
            label: "15.3A",
            value: 15.3,
          },
          {
            label: "15.4A",
            value: 15.4,
          },
          {
            label: "15.5A",
            value: 15.5,
          },
          {
            label: "15.6A",
            value: 15.6,
          },
          {
            label: "15.7A",
            value: 15.7,
          },
          {
            label: "15.8A",
            value: 15.8,
          },
          {
            label: "15.9A",
            value: 15.9,
          },
          {
            label: "16.0A",
            value: 16,
          },
          {
            label: "16.1A",
            value: 16.1,
          },
          {
            label: "16.2A",
            value: 16.2,
          },
          {
            label: "16.3A",
            value: 16.3,
          },
          {
            label: "16.4A",
            value: 16.4,
          },
          {
            label: "16.5A",
            value: 16.5,
          },
          {
            label: "16.6A",
            value: 16.6,
          },
          {
            label: "16.7A",
            value: 16.7,
          },
          {
            label: "16.8A",
            value: 16.8,
          },
          {
            label: "16.9A",
            value: 16.9,
          },
          {
            label: "17.0A",
            value: 17,
          },
          {
            label: "17.1A",
            value: 17.1,
          },
          {
            label: "17.2A",
            value: 17.2,
          },
          {
            label: "17.3A",
            value: 17.3,
          },
          {
            label: "17.4A",
            value: 17.4,
          },
          {
            label: "17.5A",
            value: 17.5,
          },
          {
            label: "17.6A",
            value: 17.6,
          },
          {
            label: "17.7A",
            value: 17.7,
          },
          {
            label: "17.8A",
            value: 17.8,
          },
          {
            label: "17.9A",
            value: 17.9,
          },
          {
            label: "18.0A",
            value: 18,
          },
          {
            label: "18.1A",
            value: 18.1,
          },
          {
            label: "18.2A",
            value: 18.2,
          },
          {
            label: "18.3A",
            value: 18.3,
          },
          {
            label: "18.4A",
            value: 18.4,
          },
          {
            label: "18.5A",
            value: 18.5,
          },
          {
            label: "18.6A",
            value: 18.6,
          },
          {
            label: "18.7A",
            value: 18.7,
          },
          {
            label: "18.8A",
            value: 18.8,
          },
          {
            label: "18.9A",
            value: 18.9,
          },
          {
            label: "19.0A",
            value: 19,
          },
          {
            label: "19.1A",
            value: 19.1,
          },
          {
            label: "19.2A",
            value: 19.2,
          },
          {
            label: "19.3A",
            value: 19.3,
          },
          {
            label: "19.4A",
            value: 19.4,
          },
          {
            label: "19.5A",
            value: 19.5,
          },
          {
            label: "19.6A",
            value: 19.6,
          },
          {
            label: "19.7A",
            value: 19.7,
          },
          {
            label: "19.8A",
            value: 19.8,
          },
          {
            label: "19.9A",
            value: 19.9,
          },
          {
            label: "20.0A",
            value: 20,
          },
          {
            label: "20.1A",
            value: 20.1,
          },
          {
            label: "20.2A",
            value: 20.2,
          },
          {
            label: "20.3A",
            value: 20.3,
          },
          {
            label: "20.4A",
            value: 20.4,
          },
          {
            label: "20.5A",
            value: 20.5,
          },
          {
            label: "20.6A",
            value: 20.6,
          },
          {
            label: "20.7A",
            value: 20.7,
          },
          {
            label: "20.8A",
            value: 20.8,
          },
          {
            label: "20.9A",
            value: 20.9,
          },
          {
            label: "21.0A",
            value: 21,
          },
          {
            label: "21.1A",
            value: 21.1,
          },
          {
            label: "21.2A",
            value: 21.2,
          },
          {
            label: "21.3A",
            value: 21.3,
          },
          {
            label: "21.4A",
            value: 21.4,
          },
          {
            label: "21.5A",
            value: 21.5,
          },
          {
            label: "21.6A",
            value: 21.6,
          },
          {
            label: "21.7A",
            value: 21.7,
          },
          {
            label: "21.8A",
            value: 21.8,
          },
          {
            label: "21.9A",
            value: 21.9,
          },
          {
            label: "22.0A",
            value: 22,
          },
          {
            label: "22.1A",
            value: 22.1,
          },
          {
            label: "22.2A",
            value: 22.2,
          },
          {
            label: "22.3A",
            value: 22.3,
          },
          {
            label: "22.4A",
            value: 22.4,
          },
          {
            label: "22.5A",
            value: 22.5,
          },
          {
            label: "22.6A",
            value: 22.6,
          },
          {
            label: "22.7A",
            value: 22.7,
          },
          {
            label: "22.8A",
            value: 22.8,
          },
          {
            label: "22.9A",
            value: 22.9,
          },
          {
            label: "23.0A",
            value: 23,
          },
          {
            label: "23.1A",
            value: 23.1,
          },
          {
            label: "23.2A",
            value: 23.2,
          },
          {
            label: "23.3A",
            value: 23.3,
          },
          {
            label: "23.4A",
            value: 23.4,
          },
          {
            label: "23.5A",
            value: 23.5,
          },
          {
            label: "23.6A",
            value: 23.6,
          },
          {
            label: "23.7A",
            value: 23.7,
          },
          {
            label: "23.8A",
            value: 23.8,
          },
          {
            label: "23.9A",
            value: 23.9,
          },
          {
            label: "24.0A",
            value: 24,
          },
          {
            label: "24.1A",
            value: 24.1,
          },
          {
            label: "24.2A",
            value: 24.2,
          },
          {
            label: "24.3A",
            value: 24.3,
          },
          {
            label: "24.4A",
            value: 24.4,
          },
          {
            label: "24.5A",
            value: 24.5,
          },
          {
            label: "24.6A",
            value: 24.6,
          },
          {
            label: "24.7A",
            value: 24.7,
          },
          {
            label: "24.8A",
            value: 24.8,
          },
          {
            label: "24.9A",
            value: 24.9,
          },
          {
            label: "25.0A",
            value: 25,
          },
          {
            label: "25.1A",
            value: 25.1,
          },
          {
            label: "25.2A",
            value: 25.2,
          },
          {
            label: "25.3A",
            value: 25.3,
          },
          {
            label: "25.4A",
            value: 25.4,
          },
          {
            label: "25.5A",
            value: 25.5,
          },
          {
            label: "25.6A",
            value: 25.6,
          },
          {
            label: "25.7A",
            value: 25.7,
          },
          {
            label: "25.8A",
            value: 25.8,
          },
          {
            label: "25.9A",
            value: 25.9,
          },
          {
            label: "26.0A",
            value: 26,
          },
          {
            label: "26.1A",
            value: 26.1,
          },
          {
            label: "26.2A",
            value: 26.2,
          },
          {
            label: "26.3A",
            value: 26.3,
          },
          {
            label: "26.4A",
            value: 26.4,
          },
          {
            label: "26.5A",
            value: 26.5,
          },
          {
            label: "26.6A",
            value: 26.6,
          },
          {
            label: "26.7A",
            value: 26.7,
          },
          {
            label: "26.8A",
            value: 26.8,
          },
          {
            label: "26.9A",
            value: 26.9,
          },
          {
            label: "27.0A",
            value: 27,
          },
          {
            label: "27.1A",
            value: 27.1,
          },
          {
            label: "27.2A",
            value: 27.2,
          },
          {
            label: "27.3A",
            value: 27.3,
          },
          {
            label: "27.4A",
            value: 27.4,
          },
          {
            label: "27.5A",
            value: 27.5,
          },
          {
            label: "27.6A",
            value: 27.6,
          },
          {
            label: "27.7A",
            value: 27.7,
          },
          {
            label: "27.8A",
            value: 27.8,
          },
          {
            label: "27.9A",
            value: 27.9,
          },
          {
            label: "28.0A",
            value: 28,
          },
          {
            label: "28.1A",
            value: 28.1,
          },
          {
            label: "28.2A",
            value: 28.2,
          },
          {
            label: "28.3A",
            value: 28.3,
          },
          {
            label: "28.4A",
            value: 28.4,
          },
          {
            label: "28.5A",
            value: 28.5,
          },
          {
            label: "28.6A",
            value: 28.6,
          },
          {
            label: "28.7A",
            value: 28.7,
          },
          {
            label: "28.8A",
            value: 28.8,
          },
          {
            label: "28.9A",
            value: 28.9,
          },
          {
            label: "29.0A",
            value: 29,
          },
          {
            label: "29.1A",
            value: 29.1,
          },
          {
            label: "29.2A",
            value: 29.2,
          },
          {
            label: "29.3A",
            value: 29.3,
          },
          {
            label: "29.4A",
            value: 29.4,
          },
          {
            label: "29.5A",
            value: 29.5,
          },
          {
            label: "29.6A",
            value: 29.6,
          },
          {
            label: "29.7A",
            value: 29.7,
          },
          {
            label: "29.8A",
            value: 29.8,
          },
          {
            label: "29.9A",
            value: 29.9,
          },
          {
            label: "30.0A",
            value: 30,
          },
          {
            label: "30.1A",
            value: 30.1,
          },
          {
            label: "30.2A",
            value: 30.2,
          },
          {
            label: "30.3A",
            value: 30.3,
          },
          {
            label: "30.4A",
            value: 30.4,
          },
          {
            label: "30.5A",
            value: 30.5,
          },
          {
            label: "30.6A",
            value: 30.6,
          },
          {
            label: "30.7A",
            value: 30.7,
          },
          {
            label: "30.8A",
            value: 30.8,
          },
          {
            label: "30.9A",
            value: 30.9,
          },
          {
            label: "31.0A",
            value: 31,
          },
          {
            label: "31.1A",
            value: 31.1,
          },
          {
            label: "31.2A",
            value: 31.2,
          },
          {
            label: "31.3A",
            value: 31.3,
          },
          {
            label: "31.4A",
            value: 31.4,
          },
          {
            label: "31.5A",
            value: 31.5,
          },
          {
            label: "31.6A",
            value: 31.6,
          },
          {
            label: "31.7A",
            value: 31.7,
          },
          {
            label: "31.8A",
            value: 31.8,
          },
          {
            label: "31.9A",
            value: 31.9,
          },
          {
            label: "32.0A",
            value: 32,
          },
          {
            label: "32.1A",
            value: 32.1,
          },
          {
            label: "32.2A",
            value: 32.2,
          },
          {
            label: "32.3A",
            value: 32.3,
          },
          {
            label: "32.4A",
            value: 32.4,
          },
          {
            label: "32.5A",
            value: 32.5,
          },
          {
            label: "32.6A",
            value: 32.6,
          },
          {
            label: "32.7A",
            value: 32.7,
          },
          {
            label: "32.8A",
            value: 32.8,
          },
          {
            label: "32.9A",
            value: 32.9,
          },
          {
            label: "33.0A",
            value: 33,
          },
          {
            label: "33.1A",
            value: 33.1,
          },
          {
            label: "33.2A",
            value: 33.2,
          },
          {
            label: "33.3A",
            value: 33.3,
          },
          {
            label: "33.4A",
            value: 33.4,
          },
          {
            label: "33.5A",
            value: 33.5,
          },
          {
            label: "33.6A",
            value: 33.6,
          },
          {
            label: "33.7A",
            value: 33.7,
          },
          {
            label: "33.8A",
            value: 33.8,
          },
          {
            label: "33.9A",
            value: 33.9,
          },
          {
            label: "34.0A",
            value: 34,
          },
          {
            label: "34.1A",
            value: 34.1,
          },
          {
            label: "34.2A",
            value: 34.2,
          },
          {
            label: "34.3A",
            value: 34.3,
          },
          {
            label: "34.4A",
            value: 34.4,
          },
          {
            label: "34.5A",
            value: 34.5,
          },
          {
            label: "34.6A",
            value: 34.6,
          },
          {
            label: "34.7A",
            value: 34.7,
          },
          {
            label: "34.8A",
            value: 34.8,
          },
          {
            label: "34.9A",
            value: 34.9,
          },
          {
            label: "35.0A",
            value: 35,
          },
          {
            label: "35.1A",
            value: 35.1,
          },
          {
            label: "35.2A",
            value: 35.2,
          },
          {
            label: "35.3A",
            value: 35.3,
          },
          {
            label: "35.4A",
            value: 35.4,
          },
          {
            label: "35.5A",
            value: 35.5,
          },
          {
            label: "35.6A",
            value: 35.6,
          },
          {
            label: "35.7A",
            value: 35.7,
          },
          {
            label: "35.8A",
            value: 35.8,
          },
          {
            label: "35.9A",
            value: 35.9,
          },
          {
            label: "36.0A",
            value: 36,
          },
          {
            label: "36.1A",
            value: 36.1,
          },
          {
            label: "36.2A",
            value: 36.2,
          },
          {
            label: "36.3A",
            value: 36.3,
          },
          {
            label: "36.4A",
            value: 36.4,
          },
          {
            label: "36.5A",
            value: 36.5,
          },
          {
            label: "36.6A",
            value: 36.6,
          },
          {
            label: "36.7A",
            value: 36.7,
          },
          {
            label: "36.8A",
            value: 36.8,
          },
          {
            label: "36.9A",
            value: 36.9,
          },
          {
            label: "37.0A",
            value: 37,
          },
          {
            label: "37.1A",
            value: 37.1,
          },
          {
            label: "37.2A",
            value: 37.2,
          },
          {
            label: "37.3A",
            value: 37.3,
          },
          {
            label: "37.4A",
            value: 37.4,
          },
          {
            label: "37.5A",
            value: 37.5,
          },
          {
            label: "37.6A",
            value: 37.6,
          },
          {
            label: "37.7A",
            value: 37.7,
          },
          {
            label: "37.8A",
            value: 37.8,
          },
          {
            label: "37.9A",
            value: 37.9,
          },
          {
            label: "38.0A",
            value: 38,
          },
          {
            label: "38.1A",
            value: 38.1,
          },
          {
            label: "38.2A",
            value: 38.2,
          },
          {
            label: "38.3A",
            value: 38.3,
          },
          {
            label: "38.4A",
            value: 38.4,
          },
          {
            label: "38.5A",
            value: 38.5,
          },
          {
            label: "38.6A",
            value: 38.6,
          },
          {
            label: "38.7A",
            value: 38.7,
          },
          {
            label: "38.8A",
            value: 38.8,
          },
          {
            label: "38.9A",
            value: 38.9,
          },
          {
            label: "39.0A",
            value: 39,
          },
          {
            label: "39.1A",
            value: 39.1,
          },
          {
            label: "39.2A",
            value: 39.2,
          },
          {
            label: "39.3A",
            value: 39.3,
          },
          {
            label: "39.4A",
            value: 39.4,
          },
          {
            label: "39.5A",
            value: 39.5,
          },
          {
            label: "39.6A",
            value: 39.6,
          },
          {
            label: "39.7A",
            value: 39.7,
          },
          {
            label: "39.8A",
            value: 39.8,
          },
          {
            label: "39.9A",
            value: 39.9,
          },
          {
            label: "40.0A",
            value: 40,
          },
          {
            label: "40.1A",
            value: 40.1,
          },
          {
            label: "40.2A",
            value: 40.2,
          },
          {
            label: "40.3A",
            value: 40.3,
          },
          {
            label: "40.4A",
            value: 40.4,
          },
          {
            label: "40.5A",
            value: 40.5,
          },
          {
            label: "40.6A",
            value: 40.6,
          },
          {
            label: "40.7A",
            value: 40.7,
          },
          {
            label: "40.8A",
            value: 40.8,
          },
          {
            label: "40.9A",
            value: 40.9,
          },
          {
            label: "41.0A",
            value: 41,
          },
          {
            label: "41.1A",
            value: 41.1,
          },
          {
            label: "41.2A",
            value: 41.2,
          },
          {
            label: "41.3A",
            value: 41.3,
          },
          {
            label: "41.4A",
            value: 41.4,
          },
          {
            label: "41.5A",
            value: 41.5,
          },
          {
            label: "41.6A",
            value: 41.6,
          },
          {
            label: "41.7A",
            value: 41.7,
          },
          {
            label: "41.8A",
            value: 41.8,
          },
          {
            label: "41.9A",
            value: 41.9,
          },
          {
            label: "42.0A",
            value: 42,
          },
          {
            label: "42.1A",
            value: 42.1,
          },
          {
            label: "42.2A",
            value: 42.2,
          },
          {
            label: "42.3A",
            value: 42.3,
          },
          {
            label: "42.4A",
            value: 42.4,
          },
          {
            label: "42.5A",
            value: 42.5,
          },
          {
            label: "42.6A",
            value: 42.6,
          },
          {
            label: "42.7A",
            value: 42.7,
          },
          {
            label: "42.8A",
            value: 42.8,
          },
          {
            label: "42.9A",
            value: 42.9,
          },
          {
            label: "43.0A",
            value: 43,
          },
          {
            label: "43.1A",
            value: 43.1,
          },
          {
            label: "43.2A",
            value: 43.2,
          },
          {
            label: "43.3A",
            value: 43.3,
          },
          {
            label: "43.4A",
            value: 43.4,
          },
          {
            label: "43.5A",
            value: 43.5,
          },
          {
            label: "43.6A",
            value: 43.6,
          },
          {
            label: "43.7A",
            value: 43.7,
          },
          {
            label: "43.8A",
            value: 43.8,
          },
          {
            label: "43.9A",
            value: 43.9,
          },
          {
            label: "44.0A",
            value: 44,
          },
          {
            label: "44.1A",
            value: 44.1,
          },
          {
            label: "44.2A",
            value: 44.2,
          },
          {
            label: "44.3A",
            value: 44.3,
          },
          {
            label: "44.4A",
            value: 44.4,
          },
          {
            label: "44.5A",
            value: 44.5,
          },
          {
            label: "44.6A",
            value: 44.6,
          },
          {
            label: "44.7A",
            value: 44.7,
          },
          {
            label: "44.8A",
            value: 44.8,
          },
          {
            label: "44.9A",
            value: 44.9,
          },
          {
            label: "45.0A",
            value: 45,
          },
          {
            label: "45.1A",
            value: 45.1,
          },
          {
            label: "45.2A",
            value: 45.2,
          },
          {
            label: "45.3A",
            value: 45.3,
          },
          {
            label: "45.4A",
            value: 45.4,
          },
          {
            label: "45.5A",
            value: 45.5,
          },
          {
            label: "45.6A",
            value: 45.6,
          },
          {
            label: "45.7A",
            value: 45.7,
          },
          {
            label: "45.8A",
            value: 45.8,
          },
          {
            label: "45.9A",
            value: 45.9,
          },
          {
            label: "46.0A",
            value: 46,
          },
          {
            label: "46.1A",
            value: 46.1,
          },
          {
            label: "46.2A",
            value: 46.2,
          },
          {
            label: "46.3A",
            value: 46.3,
          },
          {
            label: "46.4A",
            value: 46.4,
          },
          {
            label: "46.5A",
            value: 46.5,
          },
          {
            label: "46.6A",
            value: 46.6,
          },
          {
            label: "46.7A",
            value: 46.7,
          },
          {
            label: "46.8A",
            value: 46.8,
          },
          {
            label: "46.9A",
            value: 46.9,
          },
          {
            label: "47.0A",
            value: 47,
          },
          {
            label: "47.1A",
            value: 47.1,
          },
          {
            label: "47.2A",
            value: 47.2,
          },
          {
            label: "47.3A",
            value: 47.3,
          },
          {
            label: "47.4A",
            value: 47.4,
          },
          {
            label: "47.5A",
            value: 47.5,
          },
          {
            label: "47.6A",
            value: 47.6,
          },
          {
            label: "47.7A",
            value: 47.7,
          },
          {
            label: "47.8A",
            value: 47.8,
          },
          {
            label: "47.9A",
            value: 47.9,
          },
          {
            label: "48.0A",
            value: 48,
          },
          {
            label: "48.1A",
            value: 48.1,
          },
          {
            label: "48.2A",
            value: 48.2,
          },
          {
            label: "48.3A",
            value: 48.3,
          },
          {
            label: "48.4A",
            value: 48.4,
          },
          {
            label: "48.5A",
            value: 48.5,
          },
          {
            label: "48.6A",
            value: 48.6,
          },
          {
            label: "48.7A",
            value: 48.7,
          },
          {
            label: "48.8A",
            value: 48.8,
          },
          {
            label: "48.9A",
            value: 48.9,
          },
          {
            label: "49.0A",
            value: 49,
          },
          {
            label: "49.1A",
            value: 49.1,
          },
          {
            label: "49.2A",
            value: 49.2,
          },
          {
            label: "49.3A",
            value: 49.3,
          },
          {
            label: "49.4A",
            value: 49.4,
          },
          {
            label: "49.5A",
            value: 49.5,
          },
          {
            label: "49.6A",
            value: 49.6,
          },
          {
            label: "49.7A",
            value: 49.7,
          },
          {
            label: "49.8A",
            value: 49.8,
          },
          {
            label: "49.9A",
            value: 49.9,
          },
          {
            label: "50.0A",
            value: 50,
          },
        ],
      },

      {
        name: "Over-Discharge Voltage",
        check: "20",
        value: null,
        show: true,
        interval: [
          {
            label: "8.0V",
            value: 8,
          },
          {
            label: "8.1V",
            value: 8.1,
          },
          {
            label: "8.2V",
            value: 8.2,
          },
          {
            label: "8.3V",
            value: 8.3,
          },
          {
            label: "8.4V",
            value: 8.4,
          },
          {
            label: "8.5V",
            value: 8.5,
          },
          {
            label: "8.6V",
            value: 8.6,
          },
          {
            label: "8.7V",
            value: 8.7,
          },
          {
            label: "8.8V",
            value: 8.8,
          },
          {
            label: "8.9V",
            value: 8.9,
          },
          {
            label: "9.0V",
            value: 9,
          },
          {
            label: "9.1V",
            value: 9.1,
          },
          {
            label: "9.2V",
            value: 9.2,
          },
          {
            label: "9.3V",
            value: 9.3,
          },
          {
            label: "9.4V",
            value: 9.4,
          },
          {
            label: "9.5V",
            value: 9.5,
          },
          {
            label: "9.6V",
            value: 9.6,
          },
          {
            label: "9.7V",
            value: 9.7,
          },
          {
            label: "9.8V",
            value: 9.8,
          },
          {
            label: "9.9V",
            value: 9.9,
          },
          {
            label: "10.0V",
            value: 10,
          },
          {
            label: "10.1V",
            value: 10.1,
          },
          {
            label: "10.2V",
            value: 10.2,
          },
          {
            label: "10.3V",
            value: 10.3,
          },
          {
            label: "10.4V",
            value: 10.4,
          },
          {
            label: "10.5V",
            value: 10.5,
          },
          {
            label: "10.6V",
            value: 10.6,
          },
          {
            label: "10.7V",
            value: 10.7,
          },
          {
            label: "10.8V",
            value: 10.8,
          },
          {
            label: "10.9V",
            value: 10.9,
          },
          {
            label: "11.0V",
            value: 11,
          },
          {
            label: "11.1V",
            value: 11.1,
          },
          {
            label: "11.2V",
            value: 11.2,
          },
          {
            label: "11.3V",
            value: 11.3,
          },
          {
            label: "11.4V",
            value: 11.4,
          },
          {
            label: "11.5V",
            value: 11.5,
          },
          {
            label: "11.6V",
            value: 11.6,
          },
          {
            label: "11.7V",
            value: 11.7,
          },
          {
            label: "11.8V",
            value: 11.8,
          },
          {
            label: "11.9V",
            value: 11.9,
          },
          {
            label: "12.0V",
            value: 12,
          },
          {
            label: "12.1V",
            value: 12.1,
          },
          {
            label: "12.2V",
            value: 12.2,
          },
          {
            label: "12.3V",
            value: 12.3,
          },
          {
            label: "12.4V",
            value: 12.4,
          },
          {
            label: "12.5V",
            value: 12.5,
          },
          {
            label: "12.6V",
            value: 12.6,
          },
          {
            label: "12.7V",
            value: 12.7,
          },
          {
            label: "12.8V",
            value: 12.8,
          },
          {
            label: "12.9V",
            value: 12.9,
          },
          {
            label: "13.0V",
            value: 13,
          },
          {
            label: "13.1V",
            value: 13.1,
          },
          {
            label: "13.2V",
            value: 13.2,
          },
          {
            label: "13.3V",
            value: 13.3,
          },
          {
            label: "13.4V",
            value: 13.4,
          },
          {
            label: "13.5V",
            value: 13.5,
          },
          {
            label: "13.6V",
            value: 13.6,
          },
          {
            label: "13.7V",
            value: 13.7,
          },
          {
            label: "13.8V",
            value: 13.8,
          },
          {
            label: "13.9V",
            value: 13.9,
          },
          {
            label: "14.0V",
            value: 14,
          },
          {
            label: "14.1V",
            value: 14.1,
          },
          {
            label: "14.2V",
            value: 14.2,
          },
          {
            label: "14.3V",
            value: 14.3,
          },
          {
            label: "14.4V",
            value: 14.4,
          },
          {
            label: "14.5V",
            value: 14.5,
          },
          {
            label: "14.6V",
            value: 14.6,
          },
          {
            label: "14.7V",
            value: 14.7,
          },
          {
            label: "14.8V",
            value: 14.8,
          },
          {
            label: "14.9V",
            value: 14.9,
          },
          {
            label: "15.0V",
            value: 15,
          },
          {
            label: "15.1V",
            value: 15.1,
          },
          {
            label: "15.2V",
            value: 15.2,
          },
          {
            label: "15.3V",
            value: 15.3,
          },
          {
            label: "15.4V",
            value: 15.4,
          },
          {
            label: "15.5V",
            value: 15.5,
          },
          {
            label: "15.6V",
            value: 15.6,
          },
          {
            label: "15.7V",
            value: 15.7,
          },
          {
            label: "15.8V",
            value: 15.8,
          },
          {
            label: "15.9V",
            value: 15.9,
          },
          {
            label: "16.0V",
            value: 16,
          },
        ],
      },
      {
        name: "Over-Discharge Recovery Voltage",
        check: "21",
        value: null,
        show: true,
        interval: [
          {
            label: "8.0V",
            value: 8,
          },
          {
            label: "8.1V",
            value: 8.1,
          },
          {
            label: "8.2V",
            value: 8.2,
          },
          {
            label: "8.3V",
            value: 8.3,
          },
          {
            label: "8.4V",
            value: 8.4,
          },
          {
            label: "8.5V",
            value: 8.5,
          },
          {
            label: "8.6V",
            value: 8.6,
          },
          {
            label: "8.7V",
            value: 8.7,
          },
          {
            label: "8.8V",
            value: 8.8,
          },
          {
            label: "8.9V",
            value: 8.9,
          },
          {
            label: "9.0V",
            value: 9,
          },
          {
            label: "9.1V",
            value: 9.1,
          },
          {
            label: "9.2V",
            value: 9.2,
          },
          {
            label: "9.3V",
            value: 9.3,
          },
          {
            label: "9.4V",
            value: 9.4,
          },
          {
            label: "9.5V",
            value: 9.5,
          },
          {
            label: "9.6V",
            value: 9.6,
          },
          {
            label: "9.7V",
            value: 9.7,
          },
          {
            label: "9.8V",
            value: 9.8,
          },
          {
            label: "9.9V",
            value: 9.9,
          },
          {
            label: "10.0V",
            value: 10,
          },
          {
            label: "10.1V",
            value: 10.1,
          },
          {
            label: "10.2V",
            value: 10.2,
          },
          {
            label: "10.3V",
            value: 10.3,
          },
          {
            label: "10.4V",
            value: 10.4,
          },
          {
            label: "10.5V",
            value: 10.5,
          },
          {
            label: "10.6V",
            value: 10.6,
          },
          {
            label: "10.7V",
            value: 10.7,
          },
          {
            label: "10.8V",
            value: 10.8,
          },
          {
            label: "10.9V",
            value: 10.9,
          },
          {
            label: "11.0V",
            value: 11,
          },
          {
            label: "11.1V",
            value: 11.1,
          },
          {
            label: "11.2V",
            value: 11.2,
          },
          {
            label: "11.3V",
            value: 11.3,
          },
          {
            label: "11.4V",
            value: 11.4,
          },
          {
            label: "11.5V",
            value: 11.5,
          },
          {
            label: "11.6V",
            value: 11.6,
          },
          {
            label: "11.7V",
            value: 11.7,
          },
          {
            label: "11.8V",
            value: 11.8,
          },
          {
            label: "11.9V",
            value: 11.9,
          },
          {
            label: "12.0V",
            value: 12,
          },
          {
            label: "12.1V",
            value: 12.1,
          },
          {
            label: "12.2V",
            value: 12.2,
          },
          {
            label: "12.3V",
            value: 12.3,
          },
          {
            label: "12.4V",
            value: 12.4,
          },
          {
            label: "12.5V",
            value: 12.5,
          },
          {
            label: "12.6V",
            value: 12.6,
          },
          {
            label: "12.7V",
            value: 12.7,
          },
          {
            label: "12.8V",
            value: 12.8,
          },
          {
            label: "12.9V",
            value: 12.9,
          },
          {
            label: "13.0V",
            value: 13,
          },
          {
            label: "13.1V",
            value: 13.1,
          },
          {
            label: "13.2V",
            value: 13.2,
          },
          {
            label: "13.3V",
            value: 13.3,
          },
          {
            label: "13.4V",
            value: 13.4,
          },
          {
            label: "13.5V",
            value: 13.5,
          },
          {
            label: "13.6V",
            value: 13.6,
          },
          {
            label: "13.7V",
            value: 13.7,
          },
          {
            label: "13.8V",
            value: 13.8,
          },
          {
            label: "13.9V",
            value: 13.9,
          },
          {
            label: "14.0V",
            value: 14,
          },
          {
            label: "14.1V",
            value: 14.1,
          },
          {
            label: "14.2V",
            value: 14.2,
          },
          {
            label: "14.3V",
            value: 14.3,
          },
          {
            label: "14.4V",
            value: 14.4,
          },
          {
            label: "14.5V",
            value: 14.5,
          },
          {
            label: "14.6V",
            value: 14.6,
          },
          {
            label: "14.7V",
            value: 14.7,
          },
          {
            label: "14.8V",
            value: 14.8,
          },
          {
            label: "14.9V",
            value: 14.9,
          },
          {
            label: "15.0V",
            value: 15,
          },
          {
            label: "15.1V",
            value: 15.1,
          },
          {
            label: "15.2V",
            value: 15.2,
          },
          {
            label: "15.3V",
            value: 15.3,
          },
          {
            label: "15.4V",
            value: 15.4,
          },
          {
            label: "15.5V",
            value: 15.5,
          },
          {
            label: "15.6V",
            value: 15.6,
          },
          {
            label: "15.7V",
            value: 15.7,
          },
          {
            label: "15.8V",
            value: 15.8,
          },
          {
            label: "15.9V",
            value: 15.9,
          },
          {
            label: "16.0V",
            value: 16,
          },
        ],
      },
      {
        name: "Over-Voltage Voltage",
        check: "19",
        value: null,
        show: true,
        interval: [
          { label: "12.0V", value: 12 },
          { label: "12.1V", value: 12.1 },
          { label: "12.2V", value: 12.2 },
          { label: "12.3V", value: 12.3 },
          { label: "12.4V", value: 12.4 },
          { label: "12.5V", value: 12.5 },
          { label: "12.6V", value: 12.6 },
          { label: "12.7V", value: 12.7 },
          { label: "12.8V", value: 12.8 },
          { label: "12.9V", value: 12.9 },
          { label: "13.0V", value: 13 },
          { label: "13.1V", value: 13.1 },
          { label: "13.2V", value: 13.2 },
          { label: "13.3V", value: 13.3 },
          { label: "13.4V", value: 13.4 },
          { label: "13.5V", value: 13.5 },
          { label: "13.6V", value: 13.6 },
          { label: "13.7V", value: 13.7 },
          { label: "13.8V", value: 13.8 },
          { label: "13.9V", value: 13.9 },
          { label: "14.0V", value: 14 },
          { label: "14.1V", value: 14.1 },
          { label: "14.2V", value: 14.2 },
          { label: "14.3V", value: 14.3 },
          { label: "14.4V", value: 14.4 },
          { label: "14.5V", value: 14.5 },
          { label: "14.6V", value: 14.6 },
          { label: "14.7V", value: 14.7 },
          { label: "14.8V", value: 14.8 },
          { label: "14.9V", value: 14.9 },
          { label: "15.0V", value: 15 },
          { label: "15.1V", value: 15.1 },
          { label: "15.2V", value: 15.2 },
          { label: "15.3V", value: 15.3 },
          { label: "15.4V", value: 15.4 },
          { label: "15.5V", value: 15.5 },
          { label: "15.6V", value: 15.6 },
          { label: "15.7V", value: 15.7 },
          { label: "15.8V", value: 15.8 },
          { label: "15.9V", value: 15.9 },
          { label: "16.0V", value: 16 },
          { label: "16.1V", value: 16.1 },
          { label: "16.2V", value: 16.2 },
          { label: "16.3V", value: 16.3 },
          { label: "16.4V", value: 16.4 },
          { label: "16.5V", value: 16.5 },
          { label: "16.6V", value: 16.6 },
          { label: "16.7V", value: 16.7 },
          { label: "16.8V", value: 16.8 },
          { label: "16.9V", value: 16.9 },
          { label: "17.0V", value: 17 },
          { label: "17.1V", value: 17.1 },
          { label: "17.2V", value: 17.2 },
          { label: "17.3V", value: 17.3 },
          { label: "17.4V", value: 17.4 },
          { label: "17.5V", value: 17.5 },
          { label: "17.6V", value: 17.6 },
          { label: "17.7V", value: 17.7 },
          { label: "17.8V", value: 17.8 },
          { label: "17.9V", value: 17.9 },
          { label: "18.0V", value: 18 },
          { label: "18.1V", value: 18.1 },
          { label: "18.2V", value: 18.2 },
          { label: "18.3V", value: 18.3 },
          { label: "18.4V", value: 18.4 },
          { label: "18.5V", value: 18.5 },
          { label: "18.6V", value: 18.6 },
          { label: "18.7V", value: 18.7 },
          { label: "18.8V", value: 18.8 },
          { label: "18.9V", value: 18.9 },
          { label: "19.0V", value: 19 },
          { label: "19.1V", value: 19.1 },
          { label: "19.2V", value: 19.2 },
          { label: "19.3V", value: 19.3 },
          { label: "19.4V", value: 19.4 },
          { label: "19.5V", value: 19.5 },
          { label: "19.6V", value: 19.6 },
          { label: "19.7V", value: 19.7 },
          { label: "19.8V", value: 19.8 },
          { label: "19.9V", value: 19.9 },
          { label: "20.0V", value: 20 },
        ],
      },
      {
        name: "Float Charge Voltage",
        check: "23",
        value: null,
        show: true,
        interval: [
          { label: "8.0V", value: 8 },
          { label: "8.1V", value: 8.1 },
          { label: "8.2V", value: 8.2 },
          { label: "8.3V", value: 8.3 },
          { label: "8.4V", value: 8.4 },
          { label: "8.5V", value: 8.5 },
          { label: "8.6V", value: 8.6 },
          { label: "8.7V", value: 8.7 },
          { label: "8.8V", value: 8.8 },
          { label: "8.9V", value: 8.9 },
          { label: "9.0V", value: 9 },
          { label: "9.1V", value: 9.1 },
          { label: "9.2V", value: 9.2 },
          { label: "9.3V", value: 9.3 },
          { label: "9.4V", value: 9.4 },
          { label: "9.5V", value: 9.5 },
          { label: "9.6V", value: 9.6 },
          { label: "9.7V", value: 9.7 },
          { label: "9.8V", value: 9.8 },
          { label: "9.9V", value: 9.9 },
          { label: "10.0V", value: 10 },
          { label: "10.1V", value: 10.1 },
          { label: "10.2V", value: 10.2 },
          { label: "10.3V", value: 10.3 },
          { label: "10.4V", value: 10.4 },
          { label: "10.5V", value: 10.5 },
          { label: "10.6V", value: 10.6 },
          { label: "10.7V", value: 10.7 },
          { label: "10.8V", value: 10.8 },
          { label: "10.9V", value: 10.9 },
          { label: "11.0V", value: 11 },
          { label: "11.1V", value: 11.1 },
          { label: "11.2V", value: 11.2 },
          { label: "11.3V", value: 11.3 },
          { label: "11.4V", value: 11.4 },
          { label: "11.5V", value: 11.5 },
          { label: "11.6V", value: 11.6 },
          { label: "11.7V", value: 11.7 },
          { label: "11.8V", value: 11.8 },
          { label: "11.9V", value: 11.9 },
          { label: "12.0V", value: 12 },
          { label: "12.1V", value: 12.1 },
          { label: "12.2V", value: 12.2 },
          { label: "12.3V", value: 12.3 },
          { label: "12.4V", value: 12.4 },
          { label: "12.5V", value: 12.5 },
          { label: "12.6V", value: 12.6 },
          { label: "12.7V", value: 12.7 },
          { label: "12.8V", value: 12.8 },
          { label: "12.9V", value: 12.9 },
          { label: "13.0V", value: 13 },
          { label: "13.1V", value: 13.1 },
          { label: "13.2V", value: 13.2 },
          { label: "13.3V", value: 13.3 },
          { label: "13.4V", value: 13.4 },
          { label: "13.5V", value: 13.5 },
          { label: "13.6V", value: 13.6 },
          { label: "13.7V", value: 13.7 },
          { label: "13.8V", value: 13.8 },
          { label: "13.9V", value: 13.9 },
          { label: "14.0V", value: 14 },
          { label: "14.1V", value: 14.1 },
          { label: "14.2V", value: 14.2 },
          { label: "14.3V", value: 14.3 },
          { label: "14.4V", value: 14.4 },
          { label: "14.5V", value: 14.5 },
          { label: "14.6V", value: 14.6 },
          { label: "14.7V", value: 14.7 },
          { label: "14.8V", value: 14.8 },
          { label: "14.9V", value: 14.9 },
          { label: "15.0V", value: 15 },
          { label: "15.1V", value: 15.1 },
          { label: "15.2V", value: 15.2 },
          { label: "15.3V", value: 15.3 },
          { label: "15.4V", value: 15.4 },
          { label: "15.5V", value: 15.5 },
          { label: "15.6V", value: 15.6 },
          { label: "15.7V", value: 15.7 },
          { label: "15.8V", value: 15.8 },
          { label: "15.9V", value: 15.9 },
          { label: "16.0V", value: 16 },
          { label: "16.1V", value: 16.1 },
          { label: "16.2V", value: 16.2 },
          { label: "16.3V", value: 16.3 },
          { label: "16.4V", value: 16.4 },
          { label: "16.5V", value: 16.5 },
          { label: "16.6V", value: 16.6 },
          { label: "16.7V", value: 16.7 },
          { label: "16.8V", value: 16.8 },
          { label: "16.9V", value: 16.9 },
          { label: "17.0V", value: 17 },
          { label: "17.1V", value: 17.1 },
          { label: "17.2V", value: 17.2 },
          { label: "17.3V", value: 17.3 },
          { label: "17.4V", value: 17.4 },
          { label: "17.5V", value: 17.5 },
          { label: "17.6V", value: 17.6 },
          { label: "17.7V", value: 17.7 },
          { label: "17.8V", value: 17.8 },
          { label: "17.9V", value: 17.9 },
          { label: "18.0V", value: 18 },
        ],
      },
      {
        name: "Boost Charge Voltage",
        check: "22",
        value: null,
        show: true,
        interval: [
          { label: "8.0V", value: 8 },
          { label: "8.1V", value: 8.1 },
          { label: "8.2V", value: 8.2 },
          { label: "8.3V", value: 8.3 },
          { label: "8.4V", value: 8.4 },
          { label: "8.5V", value: 8.5 },
          { label: "8.6V", value: 8.6 },
          { label: "8.7V", value: 8.7 },
          { label: "8.8V", value: 8.8 },
          { label: "8.9V", value: 8.9 },
          { label: "9.0V", value: 9 },
          { label: "9.1V", value: 9.1 },
          { label: "9.2V", value: 9.2 },
          { label: "9.3V", value: 9.3 },
          { label: "9.4V", value: 9.4 },
          { label: "9.5V", value: 9.5 },
          { label: "9.6V", value: 9.6 },
          { label: "9.7V", value: 9.7 },
          { label: "9.8V", value: 9.8 },
          { label: "9.9V", value: 9.9 },
          { label: "10.0V", value: 10 },
          { label: "10.1V", value: 10.1 },
          { label: "10.2V", value: 10.2 },
          { label: "10.3V", value: 10.3 },
          { label: "10.4V", value: 10.4 },
          { label: "10.5V", value: 10.5 },
          { label: "10.6V", value: 10.6 },
          { label: "10.7V", value: 10.7 },
          { label: "10.8V", value: 10.8 },
          { label: "10.9V", value: 10.9 },
          { label: "11.0V", value: 11 },
          { label: "11.1V", value: 11.1 },
          { label: "11.2V", value: 11.2 },
          { label: "11.3V", value: 11.3 },
          { label: "11.4V", value: 11.4 },
          { label: "11.5V", value: 11.5 },
          { label: "11.6V", value: 11.6 },
          { label: "11.7V", value: 11.7 },
          { label: "11.8V", value: 11.8 },
          { label: "11.9V", value: 11.9 },
          { label: "12.0V", value: 12 },
          { label: "12.1V", value: 12.1 },
          { label: "12.2V", value: 12.2 },
          { label: "12.3V", value: 12.3 },
          { label: "12.4V", value: 12.4 },
          { label: "12.5V", value: 12.5 },
          { label: "12.6V", value: 12.6 },
          { label: "12.7V", value: 12.7 },
          { label: "12.8V", value: 12.8 },
          { label: "12.9V", value: 12.9 },
          { label: "13.0V", value: 13 },
          { label: "13.1V", value: 13.1 },
          { label: "13.2V", value: 13.2 },
          { label: "13.3V", value: 13.3 },
          { label: "13.4V", value: 13.4 },
          { label: "13.5V", value: 13.5 },
          { label: "13.6V", value: 13.6 },
          { label: "13.7V", value: 13.7 },
          { label: "13.8V", value: 13.8 },
          { label: "13.9V", value: 13.9 },
          { label: "14.0V", value: 14 },
          { label: "14.1V", value: 14.1 },
          { label: "14.2V", value: 14.2 },
          { label: "14.3V", value: 14.3 },
          { label: "14.4V", value: 14.4 },
          { label: "14.5V", value: 14.5 },
          { label: "14.6V", value: 14.6 },
          { label: "14.7V", value: 14.7 },
          { label: "14.8V", value: 14.8 },
          { label: "14.9V", value: 14.9 },
          { label: "15.0V", value: 15 },
          { label: "15.1V", value: 15.1 },
          { label: "15.2V", value: 15.2 },
          { label: "15.3V", value: 15.3 },
          { label: "15.4V", value: 15.4 },
          { label: "15.5V", value: 15.5 },
          { label: "15.6V", value: 15.6 },
          { label: "15.7V", value: 15.7 },
          { label: "15.8V", value: 15.8 },
          { label: "15.9V", value: 15.9 },
          { label: "16.0V", value: 16 },
          { label: "16.1V", value: 16.1 },
          { label: "16.2V", value: 16.2 },
          { label: "16.3V", value: 16.3 },
          { label: "16.4V", value: 16.4 },
          { label: "16.5V", value: 16.5 },
          { label: "16.6V", value: 16.6 },
          { label: "16.7V", value: 16.7 },
          { label: "16.8V", value: 16.8 },
          { label: "16.9V", value: 16.9 },
          { label: "17.0V", value: 17 },
          { label: "17.1V", value: 17.1 },
          { label: "17.2V", value: 17.2 },
          { label: "17.3V", value: 17.3 },
          { label: "17.4V", value: 17.4 },
          { label: "17.5V", value: 17.5 },
          { label: "17.6V", value: 17.6 },
          { label: "17.7V", value: 17.7 },
          { label: "17.8V", value: 17.8 },
          { label: "17.9V", value: 17.9 },
          { label: "18.0V", value: 18 },
        ],
      },
      {
        name: "Low-Temperature Discharge Protection",
        check: "3b",
        value: null,
        show: true,
        interval: [
          { label: "-40­­℃", value: -40 },
          { label: "-39­℃", value: -39 },
          { label: "-38­℃", value: -38 },
          { label: "-37­­℃", value: -37 },
          { label: "-36­℃", value: -36 },
          { label: "-35­℃", value: -35 },
          { label: "-34­℃", value: -34 },
          { label: "-33­­℃", value: -33 },
          { label: "-32­℃", value: -32 },
          { label: "-31­℃", value: -31 },
          { label: "-30­℃", value: -30 },
          { label: "-29­℃", value: -29 },
          { label: "-28­℃", value: -28 },
          { label: "-27­­℃", value: -27 },
          { label: "-26­℃", value: -26 },
          { label: "-25­℃", value: -25 },
          { label: "-24­℃", value: -24 },
          { label: "-23­­℃", value: -23 },
          { label: "-22­℃", value: -22 },
          { label: "-21­℃", value: -21 },
          { label: "-20­℃", value: -20 },
          { label: "-19­℃", value: -19 },
          { label: "-18­℃", value: -18 },
          { label: "-17­­℃", value: -17 },
          { label: "-16­℃", value: -16 },
          { label: "-15­℃", value: -15 },
          { label: "-14­℃", value: -14 },
          { label: "-13­­℃", value: -13 },
          { label: "-12­℃", value: -12 },
          { label: "-11­℃", value: -11 },
          { label: "-10­℃", value: -10 },
          { label: "-9­℃", value: -9 },
          { label: "-8­℃", value: -8 },
          { label: "-7­­℃", value: -7 },
          { label: "-6­℃", value: -6 },
          { label: "-5­℃", value: -5 },
          { label: "-4­℃", value: -4 },
          { label: "-3­­℃", value: -3 },
          { label: "-2­℃", value: -2 },
          { label: "-1­℃", value: -1 },
          { label: "0­℃", value: 0 },
          { label: "1­℃", value: 1 },
          { label: "2­℃", value: 2 },
          { label: "3­℃", value: 3 },
          { label: "4­℃", value: 4 },
          { label: "5­℃", value: 5 },
          { label: "6­℃", value: 6 },
          { label: "7­℃", value: 7 },
          { label: "8­℃", value: 8 },
          { label: "9­℃", value: 9 },
          { label: "10­℃", value: 10 },
          { label: "11­℃", value: 11 },
          { label: "12­℃", value: 12 },
          { label: "13­℃", value: 13 },
          { label: "14­℃", value: 14 },
          { label: "15­℃", value: 15 },
          { label: "16­℃", value: 16 },
          { label: "17­℃", value: 17 },
          { label: "18­℃", value: 18 },
          { label: "19­℃", value: 19 },
          { label: "20­℃", value: 20 },
          { label: "21­℃", value: 21 },
          { label: "22­℃", value: 22 },
          { label: "23­℃", value: 23 },
          { label: "24­℃", value: 24 },
          { label: "25­℃", value: 25 },
          { label: "26­℃", value: 26 },
          { label: "27­℃", value: 27 },
          { label: "28­℃", value: 28 },
          { label: "29­℃", value: 29 },
          { label: "30­℃", value: 30 },
          { label: "31­℃", value: 31 },
          { label: "32­℃", value: 32 },
          { label: "33­℃", value: 33 },
          { label: "34­℃", value: 34 },
          { label: "35­℃", value: 35 },
          { label: "36­℃", value: 36 },
          { label: "37­℃", value: 37 },
          { label: "38­℃", value: 38 },
          { label: "39­℃", value: 39 },
          { label: "40­℃", value: 40 },
          { label: "41­℃", value: 41 },
          { label: "42­℃", value: 42 },
          { label: "43­℃", value: 43 },
          { label: "44­℃", value: 44 },
          { label: "45­℃", value: 45 },
          { label: "46­℃", value: 46 },
          { label: "47­℃", value: 47 },
          { label: "48­℃", value: 48 },
          { label: "49­℃", value: 49 },
          { label: "50­℃", value: 50 },
          { label: "51­℃", value: 51 },
          { label: "52­℃", value: 52 },
          { label: "53­℃", value: 53 },
          { label: "54­℃", value: 54 },
          { label: "55­℃", value: 55 },
          { label: "56­℃", value: 56 },
          { label: "57­℃", value: 57 },
          { label: "58­℃", value: 58 },
          { label: "59­℃", value: 59 },
          { label: "60­℃", value: 60 },
          { label: "61­℃", value: 61 },
          { label: "62­℃", value: 62 },
          { label: "63­℃", value: 63 },
          { label: "64­℃", value: 64 },
          { label: "65­℃", value: 65 },
          { label: "66­℃", value: 66 },
          { label: "67­℃", value: 67 },
          { label: "68­℃", value: 68 },
          { label: "69­℃", value: 69 },
          { label: "70­℃", value: 70 },
          { label: "71­℃", value: 71 },
          { label: "72­℃", value: 72 },
          { label: "73­℃", value: 73 },
          { label: "74­℃", value: 74 },
          { label: "75­℃", value: 75 },
          { label: "76­℃", value: 76 },
          { label: "77­℃", value: 77 },
          { label: "78­℃", value: 78 },
          { label: "79­℃", value: 79 },
          { label: "80­℃", value: 80 },
          { label: "81­℃", value: 81 },
          { label: "82­℃", value: 82 },
          { label: "83­℃", value: 83 },
          { label: "84­℃", value: 84 },
          { label: "85­℃", value: 85 },
          { label: "86­℃", value: 86 },
          { label: "87­℃", value: 87 },
          { label: "88­℃", value: 88 },
          { label: "89­℃", value: 89 },
          { label: "90­℃", value: 90 },
          { label: "91­℃", value: 91 },
          { label: "92­℃", value: 92 },
          { label: "93­℃", value: 93 },
          { label: "94­℃", value: 94 },
          { label: "95­℃", value: 95 },
          { label: "96­℃", value: 96 },
          { label: "97­℃", value: 97 },
          { label: "98­℃", value: 98 },
          { label: "99­℃", value: 99 },
        ],
      },
      {
        name: "High-Temperature Discharge Protection",
        check: "3a",
        value: null,
        show: true,
        interval: [
          { label: "-40­­℃", value: -40 },
          { label: "-39­℃", value: -39 },
          { label: "-38­℃", value: -38 },
          { label: "-37­­℃", value: -37 },
          { label: "-36­℃", value: -36 },
          { label: "-35­℃", value: -35 },
          { label: "-34­℃", value: -34 },
          { label: "-33­­℃", value: -33 },
          { label: "-32­℃", value: -32 },
          { label: "-31­℃", value: -31 },
          { label: "-30­℃", value: -30 },
          { label: "-29­℃", value: -29 },
          { label: "-28­℃", value: -28 },
          { label: "-27­­℃", value: -27 },
          { label: "-26­℃", value: -26 },
          { label: "-25­℃", value: -25 },
          { label: "-24­℃", value: -24 },
          { label: "-23­­℃", value: -23 },
          { label: "-22­℃", value: -22 },
          { label: "-21­℃", value: -21 },
          { label: "-20­℃", value: -20 },
          { label: "-19­℃", value: -19 },
          { label: "-18­℃", value: -18 },
          { label: "-17­­℃", value: -17 },
          { label: "-16­℃", value: -16 },
          { label: "-15­℃", value: -15 },
          { label: "-14­℃", value: -14 },
          { label: "-13­­℃", value: -13 },
          { label: "-12­℃", value: -12 },
          { label: "-11­℃", value: -11 },
          { label: "-10­℃", value: -10 },
          { label: "-9­℃", value: -9 },
          { label: "-8­℃", value: -8 },
          { label: "-7­­℃", value: -7 },
          { label: "-6­℃", value: -6 },
          { label: "-5­℃", value: -5 },
          { label: "-4­℃", value: -4 },
          { label: "-3­­℃", value: -3 },
          { label: "-2­℃", value: -2 },
          { label: "-1­℃", value: -1 },
          { label: "0­℃", value: 0 },
          { label: "1­℃", value: 1 },
          { label: "2­℃", value: 2 },
          { label: "3­℃", value: 3 },
          { label: "4­℃", value: 4 },
          { label: "5­℃", value: 5 },
          { label: "6­℃", value: 6 },
          { label: "7­℃", value: 7 },
          { label: "8­℃", value: 8 },
          { label: "9­℃", value: 9 },
          { label: "10­℃", value: 10 },
          { label: "11­℃", value: 11 },
          { label: "12­℃", value: 12 },
          { label: "13­℃", value: 13 },
          { label: "14­℃", value: 14 },
          { label: "15­℃", value: 15 },
          { label: "16­℃", value: 16 },
          { label: "17­℃", value: 17 },
          { label: "18­℃", value: 18 },
          { label: "19­℃", value: 19 },
          { label: "20­℃", value: 20 },
          { label: "21­℃", value: 21 },
          { label: "22­℃", value: 22 },
          { label: "23­℃", value: 23 },
          { label: "24­℃", value: 24 },
          { label: "25­℃", value: 25 },
          { label: "26­℃", value: 26 },
          { label: "27­℃", value: 27 },
          { label: "28­℃", value: 28 },
          { label: "29­℃", value: 29 },
          { label: "30­℃", value: 30 },
          { label: "31­℃", value: 31 },
          { label: "32­℃", value: 32 },
          { label: "33­℃", value: 33 },
          { label: "34­℃", value: 34 },
          { label: "35­℃", value: 35 },
          { label: "36­℃", value: 36 },
          { label: "37­℃", value: 37 },
          { label: "38­℃", value: 38 },
          { label: "39­℃", value: 39 },
          { label: "40­℃", value: 40 },
          { label: "41­℃", value: 41 },
          { label: "42­℃", value: 42 },
          { label: "43­℃", value: 43 },
          { label: "44­℃", value: 44 },
          { label: "45­℃", value: 45 },
          { label: "46­℃", value: 46 },
          { label: "47­℃", value: 47 },
          { label: "48­℃", value: 48 },
          { label: "49­℃", value: 49 },
          { label: "50­℃", value: 50 },
          { label: "51­℃", value: 51 },
          { label: "52­℃", value: 52 },
          { label: "53­℃", value: 53 },
          { label: "54­℃", value: 54 },
          { label: "55­℃", value: 55 },
          { label: "56­℃", value: 56 },
          { label: "57­℃", value: 57 },
          { label: "58­℃", value: 58 },
          { label: "59­℃", value: 59 },
          { label: "60­℃", value: 60 },
          { label: "61­℃", value: 61 },
          { label: "62­℃", value: 62 },
          { label: "63­℃", value: 63 },
          { label: "64­℃", value: 64 },
          { label: "65­℃", value: 65 },
          { label: "66­℃", value: 66 },
          { label: "67­℃", value: 67 },
          { label: "68­℃", value: 68 },
          { label: "69­℃", value: 69 },
          { label: "70­℃", value: 70 },
          { label: "71­℃", value: 71 },
          { label: "72­℃", value: 72 },
          { label: "73­℃", value: 73 },
          { label: "74­℃", value: 74 },
          { label: "75­℃", value: 75 },
          { label: "76­℃", value: 76 },
          { label: "77­℃", value: 77 },
          { label: "78­℃", value: 78 },
          { label: "79­℃", value: 79 },
          { label: "80­℃", value: 80 },
          { label: "81­℃", value: 81 },
          { label: "82­℃", value: 82 },
          { label: "83­℃", value: 83 },
          { label: "84­℃", value: 84 },
          { label: "85­℃", value: 85 },
          { label: "86­℃", value: 86 },
          { label: "87­℃", value: 87 },
          { label: "88­℃", value: 88 },
          { label: "89­℃", value: 89 },
          { label: "90­℃", value: 90 },
          { label: "91­℃", value: 91 },
          { label: "92­℃", value: 92 },
          { label: "93­℃", value: 93 },
          { label: "94­℃", value: 94 },
          { label: "95­℃", value: 95 },
          { label: "96­℃", value: 96 },
          { label: "97­℃", value: 97 },
          { label: "98­℃", value: 98 },
          { label: "99­℃", value: 99 },
        ],
      },
      {
        name: "Low-Temperature Charging Protection",
        check: "39",
        value: null,
        show: true,
        interval: [
          { label: "-40­­℃", value: -40 },
          { label: "-39­℃", value: -39 },
          { label: "-38­℃", value: -38 },
          { label: "-37­­℃", value: -37 },
          { label: "-36­℃", value: -36 },
          { label: "-35­℃", value: -35 },
          { label: "-34­℃", value: -34 },
          { label: "-33­­℃", value: -33 },
          { label: "-32­℃", value: -32 },
          { label: "-31­℃", value: -31 },
          { label: "-30­℃", value: -30 },
          { label: "-29­℃", value: -29 },
          { label: "-28­℃", value: -28 },
          { label: "-27­­℃", value: -27 },
          { label: "-26­℃", value: -26 },
          { label: "-25­℃", value: -25 },
          { label: "-24­℃", value: -24 },
          { label: "-23­­℃", value: -23 },
          { label: "-22­℃", value: -22 },
          { label: "-21­℃", value: -21 },
          { label: "-20­℃", value: -20 },
          { label: "-19­℃", value: -19 },
          { label: "-18­℃", value: -18 },
          { label: "-17­­℃", value: -17 },
          { label: "-16­℃", value: -16 },
          { label: "-15­℃", value: -15 },
          { label: "-14­℃", value: -14 },
          { label: "-13­­℃", value: -13 },
          { label: "-12­℃", value: -12 },
          { label: "-11­℃", value: -11 },
          { label: "-10­℃", value: -10 },
          { label: "-9­℃", value: -9 },
          { label: "-8­℃", value: -8 },
          { label: "-7­­℃", value: -7 },
          { label: "-6­℃", value: -6 },
          { label: "-5­℃", value: -5 },
          { label: "-4­℃", value: -4 },
          { label: "-3­­℃", value: -3 },
          { label: "-2­℃", value: -2 },
          { label: "-1­℃", value: -1 },
          { label: "0­℃", value: 0 },
          { label: "1­℃", value: 1 },
          { label: "2­℃", value: 2 },
          { label: "3­℃", value: 3 },
          { label: "4­℃", value: 4 },
          { label: "5­℃", value: 5 },
          { label: "6­℃", value: 6 },
          { label: "7­℃", value: 7 },
          { label: "8­℃", value: 8 },
          { label: "9­℃", value: 9 },
          { label: "10­℃", value: 10 },
          { label: "11­℃", value: 11 },
          { label: "12­℃", value: 12 },
          { label: "13­℃", value: 13 },
          { label: "14­℃", value: 14 },
          { label: "15­℃", value: 15 },
          { label: "16­℃", value: 16 },
          { label: "17­℃", value: 17 },
          { label: "18­℃", value: 18 },
          { label: "19­℃", value: 19 },
          { label: "20­℃", value: 20 },
          { label: "21­℃", value: 21 },
          { label: "22­℃", value: 22 },
          { label: "23­℃", value: 23 },
          { label: "24­℃", value: 24 },
          { label: "25­℃", value: 25 },
          { label: "26­℃", value: 26 },
          { label: "27­℃", value: 27 },
          { label: "28­℃", value: 28 },
          { label: "29­℃", value: 29 },
          { label: "30­℃", value: 30 },
          { label: "31­℃", value: 31 },
          { label: "32­℃", value: 32 },
          { label: "33­℃", value: 33 },
          { label: "34­℃", value: 34 },
          { label: "35­℃", value: 35 },
          { label: "36­℃", value: 36 },
          { label: "37­℃", value: 37 },
          { label: "38­℃", value: 38 },
          { label: "39­℃", value: 39 },
          { label: "40­℃", value: 40 },
          { label: "41­℃", value: 41 },
          { label: "42­℃", value: 42 },
          { label: "43­℃", value: 43 },
          { label: "44­℃", value: 44 },
          { label: "45­℃", value: 45 },
          { label: "46­℃", value: 46 },
          { label: "47­℃", value: 47 },
          { label: "48­℃", value: 48 },
          { label: "49­℃", value: 49 },
          { label: "50­℃", value: 50 },
          { label: "51­℃", value: 51 },
          { label: "52­℃", value: 52 },
          { label: "53­℃", value: 53 },
          { label: "54­℃", value: 54 },
          { label: "55­℃", value: 55 },
          { label: "56­℃", value: 56 },
          { label: "57­℃", value: 57 },
          { label: "58­℃", value: 58 },
          { label: "59­℃", value: 59 },
          { label: "60­℃", value: 60 },
          { label: "61­℃", value: 61 },
          { label: "62­℃", value: 62 },
          { label: "63­℃", value: 63 },
          { label: "64­℃", value: 64 },
          { label: "65­℃", value: 65 },
          { label: "66­℃", value: 66 },
          { label: "67­℃", value: 67 },
          { label: "68­℃", value: 68 },
          { label: "69­℃", value: 69 },
          { label: "70­℃", value: 70 },
          { label: "71­℃", value: 71 },
          { label: "72­℃", value: 72 },
          { label: "73­℃", value: 73 },
          { label: "74­℃", value: 74 },
          { label: "75­℃", value: 75 },
          { label: "76­℃", value: 76 },
          { label: "77­℃", value: 77 },
          { label: "78­℃", value: 78 },
          { label: "79­℃", value: 79 },
          { label: "80­℃", value: 80 },
          { label: "81­℃", value: 81 },
          { label: "82­℃", value: 82 },
          { label: "83­℃", value: 83 },
          { label: "84­℃", value: 84 },
          { label: "85­℃", value: 85 },
          { label: "86­℃", value: 86 },
          { label: "87­℃", value: 87 },
          { label: "88­℃", value: 88 },
          { label: "89­℃", value: 89 },
          { label: "90­℃", value: 90 },
          { label: "91­℃", value: 91 },
          { label: "92­℃", value: 92 },
          { label: "93­℃", value: 93 },
          { label: "94­℃", value: 94 },
          { label: "95­℃", value: 95 },
          { label: "96­℃", value: 96 },
          { label: "97­℃", value: 97 },
          { label: "98­℃", value: 98 },
          { label: "99­℃", value: 99 },
        ],
      },
      {
        name: "High-Temperature Charging Protection",
        check: "38",
        value: null,
        show: true,
        interval: [
          { label: "-40­­℃", value: -40 },
          { label: "-39­℃", value: -39 },
          { label: "-38­℃", value: -38 },
          { label: "-37­­℃", value: -37 },
          { label: "-36­℃", value: -36 },
          { label: "-35­℃", value: -35 },
          { label: "-34­℃", value: -34 },
          { label: "-33­­℃", value: -33 },
          { label: "-32­℃", value: -32 },
          { label: "-31­℃", value: -31 },
          { label: "-30­℃", value: -30 },
          { label: "-29­℃", value: -29 },
          { label: "-28­℃", value: -28 },
          { label: "-27­­℃", value: -27 },
          { label: "-26­℃", value: -26 },
          { label: "-25­℃", value: -25 },
          { label: "-24­℃", value: -24 },
          { label: "-23­­℃", value: -23 },
          { label: "-22­℃", value: -22 },
          { label: "-21­℃", value: -21 },
          { label: "-20­℃", value: -20 },
          { label: "-19­℃", value: -19 },
          { label: "-18­℃", value: -18 },
          { label: "-17­­℃", value: -17 },
          { label: "-16­℃", value: -16 },
          { label: "-15­℃", value: -15 },
          { label: "-14­℃", value: -14 },
          { label: "-13­­℃", value: -13 },
          { label: "-12­℃", value: -12 },
          { label: "-11­℃", value: -11 },
          { label: "-10­℃", value: -10 },
          { label: "-9­℃", value: -9 },
          { label: "-8­℃", value: -8 },
          { label: "-7­­℃", value: -7 },
          { label: "-6­℃", value: -6 },
          { label: "-5­℃", value: -5 },
          { label: "-4­℃", value: -4 },
          { label: "-3­­℃", value: -3 },
          { label: "-2­℃", value: -2 },
          { label: "-1­℃", value: -1 },
          { label: "0­℃", value: 0 },
          { label: "1­℃", value: 1 },
          { label: "2­℃", value: 2 },
          { label: "3­℃", value: 3 },
          { label: "4­℃", value: 4 },
          { label: "5­℃", value: 5 },
          { label: "6­℃", value: 6 },
          { label: "7­℃", value: 7 },
          { label: "8­℃", value: 8 },
          { label: "9­℃", value: 9 },
          { label: "10­℃", value: 10 },
          { label: "11­℃", value: 11 },
          { label: "12­℃", value: 12 },
          { label: "13­℃", value: 13 },
          { label: "14­℃", value: 14 },
          { label: "15­℃", value: 15 },
          { label: "16­℃", value: 16 },
          { label: "17­℃", value: 17 },
          { label: "18­℃", value: 18 },
          { label: "19­℃", value: 19 },
          { label: "20­℃", value: 20 },
          { label: "21­℃", value: 21 },
          { label: "22­℃", value: 22 },
          { label: "23­℃", value: 23 },
          { label: "24­℃", value: 24 },
          { label: "25­℃", value: 25 },
          { label: "26­℃", value: 26 },
          { label: "27­℃", value: 27 },
          { label: "28­℃", value: 28 },
          { label: "29­℃", value: 29 },
          { label: "30­℃", value: 30 },
          { label: "31­℃", value: 31 },
          { label: "32­℃", value: 32 },
          { label: "33­℃", value: 33 },
          { label: "34­℃", value: 34 },
          { label: "35­℃", value: 35 },
          { label: "36­℃", value: 36 },
          { label: "37­℃", value: 37 },
          { label: "38­℃", value: 38 },
          { label: "39­℃", value: 39 },
          { label: "40­℃", value: 40 },
          { label: "41­℃", value: 41 },
          { label: "42­℃", value: 42 },
          { label: "43­℃", value: 43 },
          { label: "44­℃", value: 44 },
          { label: "45­℃", value: 45 },
          { label: "46­℃", value: 46 },
          { label: "47­℃", value: 47 },
          { label: "48­℃", value: 48 },
          { label: "49­℃", value: 49 },
          { label: "50­℃", value: 50 },
          { label: "51­℃", value: 51 },
          { label: "52­℃", value: 52 },
          { label: "53­℃", value: 53 },
          { label: "54­℃", value: 54 },
          { label: "55­℃", value: 55 },
          { label: "56­℃", value: 56 },
          { label: "57­℃", value: 57 },
          { label: "58­℃", value: 58 },
          { label: "59­℃", value: 59 },
          { label: "60­℃", value: 60 },
          { label: "61­℃", value: 61 },
          { label: "62­℃", value: 62 },
          { label: "63­℃", value: 63 },
          { label: "64­℃", value: 64 },
          { label: "65­℃", value: 65 },
          { label: "66­℃", value: 66 },
          { label: "67­℃", value: 67 },
          { label: "68­℃", value: 68 },
          { label: "69­℃", value: 69 },
          { label: "70­℃", value: 70 },
          { label: "71­℃", value: 71 },
          { label: "72­℃", value: 72 },
          { label: "73­℃", value: 73 },
          { label: "74­℃", value: 74 },
          { label: "75­℃", value: 75 },
          { label: "76­℃", value: 76 },
          { label: "77­℃", value: 77 },
          { label: "78­℃", value: 78 },
          { label: "79­℃", value: 79 },
          { label: "80­℃", value: 80 },
          { label: "81­℃", value: 81 },
          { label: "82­℃", value: 82 },
          { label: "83­℃", value: 83 },
          { label: "84­℃", value: 84 },
          { label: "85­℃", value: 85 },
          { label: "86­℃", value: 86 },
          { label: "87­℃", value: 87 },
          { label: "88­℃", value: 88 },
          { label: "89­℃", value: 89 },
          { label: "90­℃", value: 90 },
          { label: "91­℃", value: 91 },
          { label: "92­℃", value: 92 },
          { label: "93­℃", value: 93 },
          { label: "94­℃", value: 94 },
          { label: "95­℃", value: 95 },
          { label: "96­℃", value: 96 },
          { label: "97­℃", value: 97 },
          { label: "98­℃", value: 98 },
          { label: "99­℃", value: 99 },
        ],
      },
      {
        name: "System Voltage Class",
        check: "31",
        value: null,
        show: true,
        interval: [
          { label: "12V", value: 1 },
          { label: "24V", value: 2 },
        ],
      },
      {
        name: "Product model",
        check: "11",
        value: null,
        show: false,
        interval: null,
      },
      {
        name: "Maximum output power",
        check: "12",
        value: null,
        show: false,
        interval: null,
      },
      {
        name: "Current for the First Time Period",
        check: "IA",
        value: null,
        show: false,
        interval: null,
      },
      {
        name: "Current for the Second Time Period",
        check: "IB",
        value: null,
        show: false,
        interval: null,
      },
      {
        name: "Current for the Third Time Period",
        check: "IC",
        value: null,
        show: false,
        interval: null,
      },
      {
        name: "Current for the Fourth Time Period",
        check: "ID",
        value: null,
        show: false,
        interval: null,
      },
      {
        name: "Current for the Fifth Time Period",
        check: "IE",
        value: null,
        show: false,
        interval: null,
      },
      {
        name: "Current for the Sixth Time Period",
        check: "IF",
        value: null,
        show: false,
        interval: null,
      },
      {
        name: "Advanced Settings",
        check: "14",
        value: null,
        show: false,
        interval: null,
      },
      {
        name: "Light control delay time",
        check: "16",
        value: null,
        show: false,
        interval: null,
      },
      {
        name: "Light control voltage",
        check: "17",
        value: null,
        show: false,
        interval: null,
      },
      {
        name: "Light control voltage",
        check: "31",
        value: null,
        show: false,
        interval: null,
      },
      {
        name: "Sensor delay-on time",
        check: "3c",
        value: null,
        show: false,
        interval: null,
      },
      {
        name: "Sensor trigger delay-off time",
        check: "3d",
        value: null,
        show: false,
        interval: null,
      },
      {
        name: "Protocol version number",
        check: "37",
        value: null,
        show: false,
        interval: null,
      },
    ],
  ],
  readFunction: (addr) => {
    const command = "20010021,20240044";
    return {
      cmd: command,
      timeout: 1000,
      resolveFn: function (result) {
        console.log(result, "太阳能的16进制数据");
        const allOperates = {};
        if (result.substr(0, 2) == "40" && result.substr(2, 2) == "01") {
          allOperates["11"] = parseInt(result.substr(6, 2), 16); // 产品型号
          allOperates["12"] = parseInt(result.substr(8, 2), 16); // 最大输出功率
          allOperates["time"] = parseInt(result.substr(10, 2), 16); // 工作时间
          allOperates["num"] = parseInt(result.substr(12, 2), 16); // 过放次数
          allOperates["timeA"] = parseInt(result.substr(14, 2), 16); // 第一时段时间
          allOperates["IA"] = parseInt(result.substr(16, 2), 16) * 50 + 150; // 第一时段电流
          // allOperates['IA'] = (150 + allOperates['IA'] * 50) + 'mA'
          allOperates["timeB"] = parseInt(result.substr(18, 2), 16); // 第二时段时间
          allOperates["IB"] = parseInt(result.substr(20, 2), 16) * 50 + 150; // 第二时段电流
          // allOperates['IB'] = (150 + allOperates['IB'] * 50) + 'mA'
          allOperates["timeC"] = parseInt(result.substr(22, 2), 16); // 第三时段时间
          allOperates["IC"] = parseInt(result.substr(24, 2), 16) * 50 + 150; // 第三时段电流
          // allOperates['IC'] = (150 + allOperates['IC'] * 50) + 'mA'
          allOperates["13"] = parseInt(result.substr(26, 2), 16); // 智能控制
          allOperates["14"] = parseInt(result.substr(28, 2), 16); // 高级设置
          allOperates["15"] = parseInt(result.substr(30, 2), 16); // 负载控制模式
          allOperates["16"] = parseInt(result.substr(32, 2), 16); // 光控延迟时间
          allOperates["17"] = parseInt(result.substr(34, 2), 16) / 10; // 光控电压
          allOperates["18"] = parseInt(result.substr(36, 2), 16); // 蓄电池类型
          allOperates["19"] = parseInt(result.substr(38, 2), 16) / 10; // 超压电压
          allOperates["20"] = parseInt(result.substr(40, 2), 16) / 10; // 过放电压
          allOperates["21"] = parseInt(result.substr(42, 2), 16) / 10; // 过放返回电压
          allOperates["22"] = parseInt(result.substr(44, 2), 16) / 10; // 提升充电压
          allOperates["23"] = parseInt(result.substr(46, 2), 16) / 10; // 浮充电压
          allOperates["24"] = parseInt(result.substr(48, 2), 16); // 供电优先级别
          allOperates["timeD"] = parseInt(result.substr(50, 2), 16); // 第四时段时间
          allOperates["ID"] = parseInt(result.substr(52, 2), 16) * 50 + 150; // 第四时段电流
          allOperates["timeE"] = parseInt(result.substr(54, 2), 16); // 第五时段时间
          allOperates["IE"] = parseInt(result.substr(56, 2), 16) * 50 + 150; // 第五时段电流
          allOperates["timeF"] = parseInt(result.substr(58, 2), 16); // 第六时段时间
          allOperates["IF"] = parseInt(result.substr(60, 2), 16) * 50 + 150; // 第六时段电流
          allOperates["31"] = parseInt(result.substr(62, 2), 16); // 系统电压等级
          allOperates["32"] = parseInt(result.substr(64, 2), 16) / 10; // 充电电压
          allOperates["33"] = parseInt(result.substr(66, 2), 16) / 10; // 充电电流
          allOperates["34"] = parseInt(result.substr(68, 2), 16) / 10; // 充电结束电流
          allOperates["35"] = parseInt(result.substr(70, 2), 16); // 厂家设置
          // allOperates['36'] = parseInt(result.substr(72, 2)//客户设置
          allOperates["37"] = parseInt(result.substr(74, 2), 16); // 协议版本编号
          allOperates["38"] = parseInt(result.substr(72, 2), 16) - 40; // 充电高温保护
          allOperates["39"] = parseInt(result.substr(74, 2), 16) - 40; // 充电低温保护
          allOperates["3a"] = parseInt(result.substr(76, 2), 16) - 40; // 放电高温保护
          allOperates["3b"] = parseInt(result.substr(78, 2), 16) - 40; // 放电低温保护
          allOperates["3c"] = parseInt(result.substr(84, 2), 16); // 传感器延时启动时间
          allOperates["3d"] = parseInt(result.substr(86, 2), 16); // 传感器触发延时关闭时间+
          return {
            type: "read",
            data: {
              operates: allOperates,
            },
          };
        }
        if (result.substr(0, 2) == "40" && result.substr(2, 2) == "24") {
          const batv = result.substr(6, 4); // 蓄电池电压
          const outc = result.substr(12, 4); // 负载电流4
          const spv = result.substr(22, 4); // 光电池电流4
          const spc = result.substr(26, 4); // 光电池电压4
          const cct = result.substr(34, 2); // 内部温度2
          const bc = result.substr(70, 2); // 蓄电池余量,为255时为充电模式，需计算，计算公式为（当前电压-过放电压）/(充电电压-过放电压)*100%
          return {
            type: "read",
            data: {
              checks: [
                {
                  check: "batv",
                  value: parseInt(batv, 16) / 10,
                  time: new Date(),
                },
                {
                  check: "outc",
                  value: parseInt(outc, 16) / 100,
                  time: new Date(),
                },
                {
                  check: "cct",
                  value: parseInt(cct, 16) - 40,
                  time: new Date(),
                },
                {
                  check: "spv",
                  value: parseInt(spv, 16) / 10,
                  time: new Date(),
                },
                {
                  check: "spc",
                  value: parseInt(spc, 16) / 10,
                  time: new Date(),
                },
                {
                  check: "bc",
                  value: parseInt(bc, 16),
                  time: new Date(),
                },
              ],
            },
          };
        }
      },
    };
  },
  configFunction(operates) {
    const operateMap = operates;
    let command;
    if (!operateMap.some((item) => item.value == undefined)) {
      var comm = "200227";
      // 使用对象来存储这些变量
      var variableStore = {
        o_11: null,
        o_12: null,
        IA: null,
        IB: null,
        IC: null,
        ID: null,
        IE: null,
        IF: null,
        timeA: null,
        timeB: null,
        timeC: null,
        timeD: null,
        timeE: null,
        timeF: null,
        o_13: null,
        o_15: null,
        o_16: null,
        o_17: null,
        o_18: null,
        o_19: null,
        o_20: null,
        o_21: null,
        o_22: null,
        o_23: null,
        o_31: null,
        o_32: null,
        o_33: null,
        o_34: null,
        o_37: null,
        o_38: null,
        o_39: null,
        o_3a: null,
        o_3b: null,
      };

      operateMap.forEach((item) => {
        switch (item.check) {
          case "11":
            variableStore.o_11 = setHex(item.value);
            break;
          case "12":
            variableStore.o_12 = setHex(item.value);
            break;
          case "IA":
            variableStore.IA = getDL(item.value);
            break;
          case "IB":
            variableStore.IB = getDL(item.value);
            break;
          case "IC":
            variableStore.IC = getDL(item.value);
            break;
          case "ID":
            variableStore.ID = getDL(item.value);
            break;
          case "IE":
            variableStore.IE = getDL(item.value);
            break;
          case "IF":
            variableStore.IF = getDL(item.value);
            break;
          case "timeA":
            variableStore.timeA = setHex(item.value);
            break;
          case "timeB":
            variableStore.timeB = setHex(item.value);
            break;
          case "timeC":
            variableStore.timeC = setHex(item.value);
            break;
          case "timeD":
            variableStore.timeD = setHex(item.value);
            break;
          case "timeE":
            variableStore.timeE = setHex(item.value);
            break;
          case "timeF":
            variableStore.timeF = setHex(item.value);
            break;
          // 补全其他变量的逻辑，假设后续也是类似的判断
          case "13":
            variableStore.o_13 = setHex(item.value);
            break;
          case "15":
            variableStore.o_15 = setHex(item.value);
            break;
          case "16":
            variableStore.o_16 = setHex(item.value);
            break;
          case "17":
            variableStore.o_17 = setHex(item.value * 10);
            break;
          case "18":
            variableStore.o_18 = setHex(item.value);
            break;
          case "19":
            variableStore.o_19 = setHex(item.value * 10);
            break;
          case "20":
            variableStore.o_20 = setHex(item.value * 10);
            break;
          case "21":
            variableStore.o_21 = setHex(item.value * 10);
            break;
          case "22":
            variableStore.o_22 = setHex(item.value * 10);
            break;
          case "23":
            variableStore.o_23 = setHex(item.value * 10);
            break;
          case "31":
            variableStore.o_31 = setHex(item.value);
            break;
          case "32":
            variableStore.o_32 = setHex(item.value * 10);
            break;
          case "33":
            variableStore.o_33 = setHex(item.value * 10);
            break;
          case "34":
            variableStore.o_34 = setHex(item.value * 10);
            break;
          case "37":
            variableStore.o_37 = setHex(item.value);
            break;
          case "38":
            variableStore.o_38 = setHex(item.value + 40);
            break;
          case "39":
            variableStore.o_39 = setHex(item.value + 40);
            break;
          case "3a":
            variableStore.o_3a = setHex(item.value + 40);
            break;
          case "3b":
            variableStore.o_3b = setHex(item.value + 40);
            break;
          default:
            break;
        }
      });
      comm = comm + "0000";
      comm = comm + variableStore.timeA + variableStore.IA;
      comm = comm + variableStore.timeB + variableStore.IB;
      comm = comm + variableStore.timeC + variableStore.IC;
      comm = comm + variableStore.o_13 + "01";
      comm = comm + variableStore.o_15 + variableStore.o_16; // 负载控制模式 光控延迟时间
      comm = comm + variableStore.o_17 + variableStore.o_18; // 光控电压 蓄电池类型
      comm = comm + variableStore.o_19 + variableStore.o_20; // 超压电压 过放电压
      comm = comm + variableStore.o_21 + variableStore.o_22; // 过放返回电压 提升充电压
      comm = comm + variableStore.o_23 + "00"; // 浮充电压 供电优先级别
      comm = comm + variableStore.timeD + variableStore.ID;
      comm = comm + variableStore.timeE + variableStore.IE;
      comm = comm + variableStore.timeF + "0000" + variableStore.IF;
      comm =
        comm +
        variableStore.o_31 +
        variableStore.o_32 +
        variableStore.o_33 +
        variableStore.o_34 +
        "0000" +
        variableStore.o_37 +
        variableStore.o_38 +
        variableStore.o_39 +
        variableStore.o_3a +
        variableStore.o_3b;

      command = comm + customChecksum(comm);
    }
    return {
      cmd: command,
      timeout: 2000,
      resolve: function (result) {
        if (result.length < 10) {
          return {
            type: "config",
            data: false,
          };
        }
        // var item = result.substr(0, result.length - 2);
        // var validatedata = customChecksum(item);
        // if (validatedata !== result.substr(result.length - 2, 2)) {
        //   return {
        //     type: "config",
        //     data: false,
        //   };
        // }
        var addrback = result.substr(0, 2);
        if (addrback !== "40") {
          return {
            type: "config",
            data: false,
          };
        }
        var func = result.substr(2, 2);
        if (func !== "05" && func !== "02") {
          return {
            type: "config",
            data: false,
          };
        }
        var data = result.substr(6, 2);
        if (data === "01") {
          return {
            type: "config",
            data: true,
          };
        }
        return {
          type: "config",
          data: false,
        };
      },
    };
  },
};
