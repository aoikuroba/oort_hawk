<template>
  <div ref="chart" id="chart"></div>
</template>

<script setup>
import { ref, onMounted, inject, watch, defineProps, computed } from 'vue';
import apiParam from '@/api/param'
import { filterDate } from '@/utils/date'
import { EleResize } from '@/utils/esresize'// 图表自适应



// 从根组件获取组件
const echarts = inject('$echarts')
// 获取图表dom组件
const chart = ref(null)
// 待初始化的日历对象
let myChart = null

const emitter = inject("$emitter")



// 从父组件获取时间信息
const props = defineProps(['startDate', 'endDate', 'chartData'])

const startDate = computed(() => props.startDate)
const endDate = computed(() => props.endDate)
const chartData = computed(() => props.chartData)

// 图表配置信息-初始化
const chartConfigInit = {
  tooltip: {
    trigger: 'item',
    position: function (pt) {
      return [pt[0], '20%'];
    },
    formatter: (param) => {
      return `日期：　　${param.value[0]}<br>工作时间：${param.value[1]}小时`
    }
  },
  xAxis: {
    type: 'time',
    name: '日期',
    boundaryGap: false,
    fotmatter: '{yyyy}-{MM}-{dd}'
  },
  yAxis: {
    type: 'value',
    name: '工作时间/h'
  },
  series: [
    {
      type: 'bar',
    }
  ],
  // toolbox: {
  //   feature: {
  //     dataZoom: {
  //       yAxisIndex: 'none'
  //     },
  //     restore: {},
  //     saveAsImage: {}
  //   }
  // },
  // dataZoom: [
  //   {
  //     type: 'inside',
  //     start: 0,
  //     end: 100
  //   },
  //   {
  //     start: 0,
  //     end: 100
  //   }
  // ],
}

// let chartData = ref([["2022-07-02",10],["2022-07-10",10],["2022-07-01",10]])


let chartConfig = {
  series: [
    {
    }
  ]
}

watch([startDate, endDate, chartData], (newVal) => {
  if (!newVal[0] && !newVal[1]) {
    chartConfig.series = [{ data: props.chartData }];
    myChart.setOption(chartConfig)
    return;
  }
  chartConfig.series = [{ data: filterDate(newVal[0], newVal[1], props.chartData) }];
  myChart.setOption(chartConfig)
})

// 初始化操作
onMounted(() => {
  chart.value.focus()
  myChart = echarts.init(chart.value, null, { locale: 'ZH', renderer: 'svg' })
  myChart.setOption(
    chartConfigInit
  )

  chartConfig.series = [{ data: props.chartData }];
  myChart.setOption(chartConfig)


  // api.getDataBySingle({ id: '0', key: 'p1' }).then((res) => {
  //   console.log(res);
  // })

  // fetchDataStatistics().then((data) => {
  //   chartData.value = data.data.array

  //   myChart.setOption({
  //     series: [
  //       {
  //         data: data.data.array
  //       }
  //     ]
  //   })
  // })

  var listener = function () {
    myChart.resize()
  }
  EleResize.on(chart.value, listener)

  // 注册总线事件
  emitter.on("getNewStatistics", () => {
    myChart.showLoading("default", { text: "加载数据中..." });
  })
  emitter.on("finishNewStatistics", () => myChart.hideLoading())
})

</script>

<style scoped>
#chart {
  width: 100%;
  height: 100%;
  margin: 5px auto;
}
</style>