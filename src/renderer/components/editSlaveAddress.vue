<template>
  <el-dialog v-model="dialogShow" title="Set slaveAddress" width="50%">
    <el-form
      label-position="top"
      :rules="rules"
      :model="form"
      ref="formRef"
      @submit.prevent
    >
      <el-form-item label="Slave Address" prop="slaveAddress">
        <el-input
          v-model="form.slaveAddress"
          @keydown.enter="submitForm"
        ></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogShow = false">Cancel</el-button>
        <el-button type="primary" @click="submitForm"> Confirm </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { useDeviceStore } from "../stores/deviceStore.js";
import { ElMessage } from "element-plus";
const deviceStore = useDeviceStore();
const rules = {
  slaveAddress: [
    { required: true, message: "This field is required", trigger: "blur" },
    {
      validator: (rule, value, callback) => {
        if (isNaN(Number(value)) || !Number.isInteger(Number(value))) {
          callback(new Error("Please enter an integer"));
        } else if (Number(value) < 1 || Number(value) > 255) {
          callback(new Error("The number must be between 1 and 255"));
        } else {
          callback();
        }
      },
      trigger: "blur",
    },
  ],
};
const form = ref({});
const formRef = ref(null);
const dialogShow = ref(false);

const submitForm = () => {
  formRef.value?.validate(async (valid) => {
    if (valid) {
      try {
        await deviceStore.sendSlaveAddressCommand(form.value.slaveAddress);
        if (deviceStore.slaveAddressStatus) {
          deviceStore.slaveAddress = form.value.slaveAddress;
          dialogShow.value = false;
          ElMessage.success(
            `The slave address has been changed to: ${deviceStore.slaveAddress}`
          );
        } else {
          ElMessage.error("Modification failed");
        }
      } catch (error) {
        // 处理超时或其他错误
        ElMessage.error(error.message);
      }
    }
  });
};

const show = (address) => {
  dialogShow.value = true;
  form.value.slaveAddress = address;
};
defineExpose({
  show,
});
</script>
<style scoped></style>
