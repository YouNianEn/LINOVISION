<template>
  <div class="checks-display">
    <el-row style="width: 100%" :gutter="20">
      <el-col :span="8" v-for="(checkItem, index) in checks" :key="index">
        <div class="check-item">
          <div class="check-info">
            <h6 class="check-name">{{ checkItem.name }}</h6>
            <div class="current-value">
              Current Value：{{ checkItem.value }}
              <span v-if="checkItem.company">({{ checkItem.company }})</span>
            </div>
          </div>
          <div
            :ref="
              (el) => {
                if (el) {
                  chartRefs[checkItem.check] = el;
                }
              }
            "
            class="chart-container"
            style="width: 100%; height: 200px"
            v-if="
              chartDataMap[checkItem.check]
                ? chartDataMap[checkItem.check].length >= 0
                : 0
            "
          ></div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import { computed, onMounted, watch, ref, toRefs, nextTick } from "vue";
import * as echarts from "echarts";
import { useDeviceStore } from "../stores/deviceStore.js";
import moment from "moment-timezone";
const deviceStore = useDeviceStore();
const { checks, receivedData } = toRefs(deviceStore);

const chartInstances = ref({});
const chartDataMap = ref({});
const chartRefs = ref({});

// 生成 xAxis 的 axisLabel 配置
const getAxisLabelConfig = (check) => {
  return {
    interval: function (index, value) {
      const data = chartDataMap.value[check];
      if (data.length <= 5) {
        return true;
      }
      const step = Math.floor(data.length / 5);
      return index % step === 0;
    },
  };
};

// 生成图表的 option 配置
const getChartOption = (check, checkDetail) => {
  console.log(chartDataMap.value[check]);
  return {
    tooltip: {
      trigger: "item",
      axisPointer: {
        type: "shadow",
      },
      formatter: (params) => {
        const data = params.data;
        const time = moment(data[2]).format("YYYY-MM-DD HH:mm:ss");
        return `${time}<br/>Value: ${data[1].toFixed(2)} ${
          checkDetail.company || ""
        }`;
      },
      // 添加样式配置
      backgroundColor: "rgba(0, 0, 0, 0.7)",
      textStyle: {
        color: "#fff",
      },
      extraCssText: "box-shadow: 0 0 3px rgba(0, 0, 0, 0.3);",
    },
    calculable: true,
    xAxis: [
      {
        type: "category",
        splitLine: {
          show: false,
        },
        axisTick: {
          show: false,
        },
        axisLabel: getAxisLabelConfig(check),
        textStyle: {
          fontSize: "12",
        },
      },
    ],
    yAxis: {
      type: "value",
      splitLine: {
        show: false,
      },
      axisLine: {
        show: true,
      },
    },
    series: [
      {
        name: checkDetail.name,
        type: checkDetail.type,
        data: chartDataMap.value[check].map((item) => [
          moment(item.x).format("HH:mm:ss"),
          item.y,
          item.x,
        ]),
        itemStyle: { color: "#409EFF" },
        // 设置触发范围
        triggerLineEvent: true,
        lineStyle: {
          width: 2,
        },
      },
    ],
  };
};

// 初始化图表的函数
const initCharts = () => {
  checks.value.forEach((check) => {
    chartDataMap.value[check.check] = [];
    const chartDom = chartRefs.value[check.check];
    if (!chartDom) {
      console.error(`图表容器未找到: ${check.check}`);
      return;
    }
    chartInstances.value[check.check] = echarts.init(chartDom);
    const checkDetail = queryCheck(check.check);
    chartInstances.value[check.check].setOption(
      getChartOption(check.check, checkDetail)
    );

    // 监听图表的鼠标事件，确保提示框能正常显示
    // chartInstances.value[check.check].on("mouseover", function (params) {
    //   console.log("鼠标移入事件触发", params);
    // });
  });
};

// 在 onMounted 中尝试初始化，如果 checks 有数据
onMounted(() => {
  console.log("onMounted 时 checks 数据:", checks.value);
  if (checks.value.length > 0) {
    nextTick(() => {
      console.log("nextTick 时 chartRefs 数据:", chartRefs.value);
      initCharts();
    });
  }
});

// 监听 checks 变化，当有数据时初始化图表
// watch(
//   checks,
//   (newChecks) => {
//     if (newChecks.length > 0) {
//       nextTick(() => {
//         initCharts();
//       });
//     }
//   },
//   { immediate: true }
// );

function queryCheck(checkKey) {
  if (!chartDataMap.value || !chartDataMap.value[checkKey]) {
    return {};
  }
  const checkValues = checks.value.find((item) => checkKey === item.check);
  return checkValues;
}
watch(
  receivedData,
  async (newData) => {
    console.log("接收到新数据:", newData);
    if (!newData.length) return;

    // 清空所有图表的数据
    checks.value.forEach((check) => {
      chartDataMap.value[check.check] = [];
    });

    // 存储需要更新的图表的 key
    const chartsToUpdate = new Set();

    // 处理新数据，将数据添加到对应的图表数据中
    newData.forEach((dataPoint) => {
      const checkKey = dataPoint.check;
      if (!chartDataMap.value[checkKey]) return;

      if (!dataPoint.time || dataPoint.value === undefined) return;
      const pushData = {
        x: dataPoint.time.getTime(),
        y: dataPoint.value,
      };
      chartDataMap.value[checkKey].push(pushData);
      // 标记该图表需要更新
      chartsToUpdate.add(checkKey);
    });

    chartsToUpdate.forEach((checkKey) => {
      chartDataMap.value[checkKey].sort((a, b) => a.x - b.x);
    });

    // 新增：处理未初始化的图表
    await nextTick(); // 等待DOM更新完成
    chartsToUpdate.forEach(async (checkKey) => {
      const checkDetail = queryCheck(checkKey);
      if (!chartInstances.value[checkKey]) {
        // 图表未初始化
        const chartDom = chartRefs.value[checkKey];
        if (!chartDom) {
          console.error(`图表容器未找到: ${checkKey}`);
          return;
        }
        // 初始化ECharts实例
        chartInstances.value[checkKey] = echarts.init(chartDom);
        // 设置初始选项
        chartInstances.value[checkKey].setOption(
          getChartOption(checkKey, checkDetail)
        );
      } else {
        // 已初始化的图表更新数据
        chartInstances.value[checkKey].setOption(
          getChartOption(checkKey, checkDetail)
        );
      }
    });
  },
  { deep: true }
);
</script>

<style scoped>
.checks-display {
  padding: 20px;
}

.check-item {
  margin-bottom: 10px;
}

.check-info {
  width: 300px;
}

.check-name {
  margin-bottom: 5px;
  font-size: 1em;
  color: #333;
}

.current-value {
  font-size: 0.725em;
  color: #666;
}

.chart-container {
  border: 1px solid #e5e7eb;
  border-radius: 8px;
}
</style>
