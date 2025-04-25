<template>
  <div id="app">
    <!-- 设备配置模块（原内容） -->
    <device-config></device-config>

    <!-- 新增：展示模块 -->
    <checks-display></checks-display>
  </div>
</template>

<script setup>
import DeviceConfig from "./components/deviceConfig.vue"; // 假设设备配置模块已拆分
import ChecksDisplay from "./components/checkDisplay.vue";
</script>
