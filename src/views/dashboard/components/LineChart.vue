<template>
  <div :class="className" :style="{height:height,width:width}" />
</template>

<script>
/* eslint-disable */
import echarts from "echarts"
require("echarts/theme/macarons") // echarts theme
import resize from "../mixins/resize"

export default {
  mixins: [resize],
  props: {
    className: {
      type: String,
      default: "chart"
    },
    width: {
      type: String,
      default: "100%"
    },
    height: {
      type: String,
      default: "350px"
    },
    autoResize: {
      type: Boolean,
      default: true
    },
    chartData: {
      type: Object,
      required: true
    },
  },
  data() {
    return {
      chart: null,
    };
  },
  watch: {
    chartData: {
      deep: true,
      handler(val) {
        this.setOptions(val);
      },
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.initChart();
    });
  },
  beforeDestroy() {
    if (!this.chart) {
      return;
    }
    this.chart.dispose();
    this.chart = null;
  },
  methods: {
    initChart() {
      this.chart = echarts.init(this.$el, "macarons");
      this.setOptions(this.chartData);
    },
    setOptions({ id, like_number, view_number } = {}) {
      this.chart.setOption({
        title: {
          text: "文章阅读点赞次数",
        },
        tooltip: {
          trigger: "axis",
        },
        legend: {
          data: ['点赞', '阅读'],
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        toolbox: {
          feature: {
            saveAsImage: {},
          },
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: id,
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            name: "点赞",
            type: "line",
            stack: "总量",
            data: like_number,
          },
          {
            name: "阅读",
            type: "line",
            stack: "总量",
            data: view_number,
          }
        ],
      });
    },
  },
};
</script>
