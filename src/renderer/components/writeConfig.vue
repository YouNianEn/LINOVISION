<template>
  <el-dialog
    v-model="dialogShow"
    title="Set slaveAddress"
    width="80%"
    top="5vh"
  >
    <el-card v-for="item in deviceWrite">
      <el-row :gutter="20">
        <el-col :span="12" v-for="item1 in item" v-show="item1.show">
          <div
            style="
              display: flex;
              margin-bottom: 20px;
              align-items: center;
              gap: 15px;
            "
          >
            <span
              style="white-space: nowrap; min-width: 270px; text-align: right"
              >{{ item1.name }}:</span
            >
            <el-select v-if="item1.interval" v-model="item1.value">
              <el-option
                v-for="item2 in item1.interval"
                :label="item2.label"
                :value="item2.value"
              >
              </el-option>
            </el-select>
            <el-input v-model="item1.value" v-else></el-input>
          </div>
        </el-col>
      </el-row>
      <div style="display: flex; justify-content: center">
        <el-button
          type="success"
          @click="writeConfig(item)"
          style="margin: auto"
        >
          Write
        </el-button>
      </div>
    </el-card>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogShow = false">Cancel</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import { ref } from "vue";
import { useDeviceStore } from "../stores/deviceStore.js";
import { ElMessage } from "element-plus";
const deviceStore = useDeviceStore();
const deviceWrite = ref([]);
const form = ref({});
const dialogShow = ref(false);
const writeConfig = async (detail) => {
  try {
    console.log(detail);
    await deviceStore.sendConfigCommand(detail);
    if (deviceStore.configStatus) {
      deviceStore.slaveAddress = form.value.slaveAddress;
      dialogShow.value = false;
      ElMessage.success(`Configuration written successfully`);
    } else {
      ElMessage.error("Configuration write failed");
    }
  } catch (error) {
    // 处理超时或其他错误
    ElMessage.error(error.message);
  }
};

const show = () => {
  dialogShow.value = true;
  deviceWrite.value = deviceStore.operates;
};
defineExpose({
  show,
});
</script>
<style scoped></style>
