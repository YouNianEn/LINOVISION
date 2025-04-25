<template>
  <div id="app">
    <h1>Serial Communication App</h1>

    <el-form label-position="top">
      <el-form-item label="Select Port">
        <el-select
          v-model="selectedPort"
          @change="onPortChange"
          placeholder="Select Port"
          :disabled="isRunning || discoverLoading || startLoading"
        >
          <el-option
            v-for="port in ports"
            :key="port.path"
            :label="
              port.path + (port.friendlyName ? '#' + port.friendlyName : '')
            "
            :value="port.path"
          />
        </el-select>
      </el-form-item>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item label="Device">
            <el-select
              v-model="selectedDeviceTypeIndex"
              @change="onDeviceTypeChange"
              placeholder="Select Device"
              :disabled="isRunning || discoverLoading || startLoading"
            >
              <el-option
                v-for="(device, index) in deviceTypes"
                :key="index"
                :label="device.name"
                :value="index"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="Select Baud Rate">
            <el-select
              v-model="baudRate"
              placeholder="Select Baud Rate"
              :disabled="isRunning || discoverLoading || startLoading"
            >
              <el-option
                v-for="rate in availableBaudRates"
                :key="rate"
                :label="rate.toString()"
                :value="rate"
              />
            </el-select>
          </el-form-item>
        </el-col>

        <el-col
          :span="8"
          v-if="
            selectedDeviceTypeIndex !== undefined
              ? deviceTypes[selectedDeviceTypeIndex].needSlaveAddress
              : true
          "
        >
          <el-form-item label="Slave Address">
            <el-input
              v-model.number="slaveAddress"
              @input="onSlaveAddressChange"
              placeholder="Enter Slave Address"
              size="small"
              :disabled="isRunning || discoverLoading || startLoading"
              :style="{
                backgroundColor: isDiscoverFormValid ? 'white' : '#f5f5f5',
              }"
            >
              <template #append>
                <el-button
                  @click="discoverDevices"
                  type="success"
                  :disabled="!isDiscoverFormValid || isRunning"
                  :loading="discoverLoading"
                >
                  <span v-if="!discoverLoading">Discover Devices</span>
                  <span v-else>
                    <i class="el-icon-loading"></i> Discovering...
                  </span>
                </el-button>
              </template>
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>

    <el-button
      type="success"
      :disabled="!isFormValid || isRunning || discoverLoading || startLoading"
      :loading="startLoading"
      @click="startSending"
    >
      Start
    </el-button>
    <el-button
      type="warning"
      :disabled="!isRunning || discoverLoading || startLoading"
      @click="stopSending"
    >
      Stop
    </el-button>

    <el-button
      :disabled="!isRunning || discoverLoading || startLoading"
      @click="configWrite"
      v-if="
        selectedDeviceTypeIndex !== undefined
          ? deviceTypes[selectedDeviceTypeIndex].configFunction
          : false
      "
    >
      Config
    </el-button>

    <el-button
      v-if="
        selectedDeviceTypeIndex !== undefined
          ? deviceTypes[selectedDeviceTypeIndex].slaveAddressFunction
          : false
      "
      :disabled="!isRunning || discoverLoading || startLoading"
      @click="setSlaveAddress"
    >
      Set slaveAddress
    </el-button>

    <div>
      <el-tag :type="isRunning ? 'success' : 'warning'">{{
        isRunning ? "Running" : "Stopped"
      }}</el-tag>
    </div>
    <EditSlaveAddress ref="doEditSlaveAddress" />
    <Config ref="doConfig" />
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from "vue";
import EditSlaveAddress from "./editSlaveAddress.vue";
import Config from "./writeConfig.vue";
import { ElMessage } from "element-plus";

import { useDeviceStore } from "../stores/deviceStore.js";
const deviceStore = useDeviceStore();
const availableBaudRates = ref([9600, 115200]);
const selectedDeviceTypeIndex = ref(deviceStore.selectedDeviceType);
const slaveAddress = ref(deviceStore.slaveAddress);
const baudRate = ref(deviceStore.baudRate);
const deviceTypes = deviceStore.deviceTypes;

const isRunning = ref(false);

const isFormValid = computed(() => {
  const selectedDevice = deviceTypes[selectedDeviceTypeIndex.value];
  if (selectedDevice?.needSlaveAddress) {
    return (
      slaveAddress.value &&
      baudRate.value &&
      selectedDeviceTypeIndex.value !== undefined
    );
  }
  return baudRate.value && selectedDeviceTypeIndex.value !== undefined;
});

const isDiscoverFormValid = computed(() => {
  return (
    selectedPort.value &&
    slaveAddress.value &&
    baudRate.value &&
    selectedDeviceTypeIndex.value !== undefined
  );
});

const onDeviceTypeChange = () => {
  deviceStore.setSelectedDeviceType(selectedDeviceTypeIndex.value);
  slaveAddress.value = deviceStore.slaveAddress;
  baudRate.value = deviceStore.baudRate;
};

const onSlaveAddressChange = () => {
  deviceStore.setSlaveAddress(slaveAddress.value);
};
const discoverLoading = ref(false);
const discoverDevices = async () => {
  if (!isDiscoverFormValid.value) return;
  discoverLoading.value = true;

  try {
    await deviceStore.discoverDevices();
    if (deviceStore.discoveredSlaveAddress) {
      ElMessage.success(
        `Slave address found: ${deviceStore.discoveredSlaveAddress}`
      );
    } else {
      ElMessage.warning("No valid slave address found");
    }
  } catch (error) {
    // 处理超时或其他错误
    ElMessage.error(`Failed to find slave address：${error.message}`);
  } finally {
    discoverLoading.value = false;
    deviceStore.resetDiscovery(); // 重置查找索引
  }
};

const startLoading = ref(false);
const startSending = async () => {
  if (!isDiscoverFormValid.value) return;
  startLoading.value = true;

  try {
    await deviceStore.openSerialPort();
    await deviceStore.sendReadCommand(); // 等待命令发送（可能抛出超时）
    isRunning.value = true;
  } catch (error) {
    // 处理发送超时或串口错误
    isRunning.value = false;
    ElMessage.error(error.message);
  } finally {
    startLoading.value = false;
  }
};

const stopSending = () => {
  isRunning.value = false;
  deviceStore.stopOperation();
};

const ports = ref([]);
const selectedPort = ref("");

const fetchPorts = async () => {
  try {
    const availablePorts = await window.electronAPI.getSerialPorts();
    ports.value = availablePorts;
    console.log(availablePorts);
  } catch (error) {
    console.error("Error fetching serial ports:", error);
  }
};

const onPortChange = async (val) => {
  try {
    await deviceStore.setPort(val);
  } catch (error) {
    ElMessage.error(`Failed to open port: ${error.message}`);
    selectedPort.value = "";
  }
};
const doEditSlaveAddress = ref(null);
const setSlaveAddress = () => {
  doEditSlaveAddress.value.show(slaveAddress.value);
};

const doConfig = ref(null);
const configWrite = () => {
  doConfig.value.show();
};
// 同步数据
watch(
  () => deviceStore.slaveAddress,
  (newValue) => {
    slaveAddress.value = newValue;
  }
);
watch(
  () => deviceStore.baudRate,
  (newValue) => {
    baudRate.value = newValue;
  }
);
watch(
  () => deviceStore.selectedDeviceType,
  (newValue) => {
    selectedDeviceTypeIndex.value = newValue;
  }
);

onMounted(() => {
  fetchPorts();
});
</script>

<style scoped>
/* 可添加组件级样式 */
</style>
