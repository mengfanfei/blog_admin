<template>
  <div class="dashboard-container">
    <!-- <div class="dashboard-text">name: {{ name }}</div> -->
    <el-row class="line-charts">
      <line-chart :chart-data="lineChartData" />
    </el-row>
    <el-row :gutter="32">
      <el-col :xs="24" :sm="24" :lg="12">
        <div class="chart-wrapper">
          <pie-chart :chart-data="piechartData" />
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="12">
        <div class="chart-wrapper">
          <colum-chart :chart-data="columchartData" />
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getCount, getBlogsList } from '../../api/blog'
import LineChart from './components/LineChart'
import PieChart from './components/PieChart'
import ColumChart from './components/ColumChart'
export default {
  name: 'Dashboard',
  components: {
    LineChart,
    PieChart,
    ColumChart
  },
  data() {
    return {
      lineChartData: {},
      piechartData: [],
      columchartData: {}
    }
  },
  computed: {
    ...mapGetters([
      'name'
    ])
  },
  created() {
    this.getCount()
    this.getList()
  },
  methods: {
    async getCount() {
      try {
        const result = await getCount()
        const columchartData = {
          type: [],
          count: []
        }
        result.data.map(item => {
          columchartData.type.push(item.type)
          columchartData.count.push(item.count)
          item.name = item.type
          item.value = item.count
          delete item.type
          delete item.count
          return item
        })
        this.columchartData = columchartData
        this.piechartData = result.data
      } catch (error) {
        console.log(error)
      }
    },
    async getList() {
      try {
        const result = await getBlogsList({ pageIndex: 1, pageSize: 1000, release: true, charts: true })
        const lineChartData = {
          id: [],
          like_number: [],
          view_number: []
        }
        result.data.forEach(item => {
          lineChartData.id.push(item.title)
          lineChartData.like_number.push(item.like_number)
          lineChartData.view_number.push(item.view_number)
        })
        this.lineChartData = lineChartData
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    min-height: 100vh;
    padding: 32px;
    background-color: #f0f2f5;
    position: relative;
    .line-charts {
      background: rgb(255, 255, 255);
      padding: 16px 16px 0px;
      margin-bottom: 32px;
    }
    .chart-wrapper {
      background: rgb(255, 255, 255);
      padding: 16px 16px 0px;
    }
  }
}
</style>
