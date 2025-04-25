function calculateModbusCRC16(data) {
    let crc = 0xFFFF;
    for (let i = 0; i < data.length; i++) {
        crc ^= data[i];
        for (let j = 0; j < 8; j++) {
            if ((crc & 0x0001) !== 0) {
                crc = (crc >> 1) ^ 0xA001;
            } else {
                crc >>= 1;
            }
        }
    }
    return crc;
}

export function appendCRC16ToHexString(hexString) {
    // 将十六进制字符串转换为字节数组
    const bytes = [];
    for (let i = 0; i < hexString.length; i += 2) {
        bytes.push(parseInt(hexString.substr(i, 2), 16));
    }

    // 计算 CRC16 值
    const crc = calculateModbusCRC16(bytes);

    // 将 CRC16 值拆分为两个字节
    const crcBytes = [(crc & 0xFF), (crc >> 8)];

    // 将 CRC16 字节转换为十六进制字符串
    const crcHex = crcBytes.map(byte => byte.toString(16).padStart(2, '0')).join('').toUpperCase();

    // 将 CRC16 追加到原始十六进制字符串后面
    return hexString + crcHex;
}