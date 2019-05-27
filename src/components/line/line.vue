<!-- 折线图 -->
<style lang="stylus" scoped>
.line
  height 1000px
  background url('../../assets/white.jpg') no-repeat
  background-size 100% 100%
  .main
    width 100%
    height calc(100% - 100px)
    margin-top -15px
.title
  background-color white
  color black
.kv
  margin-left 109px
  display block
  tr td
      width 200px
      height 44px

</style>

<template>
<div class="line">
  <v-header :name="name" :legendArr="legendArr" :myChart="myChart"></v-header>
  <v-filter :myChart="myChart" v-if="myChart._dom"></v-filter>
  <div class="main"></div>
  <table class="kv">
    <tr>
      <td>TxHash:</td>
      <td>xxx</td>
    </tr>
    <tr>
      <td>中继时长:</td>
      <td>xxx</td>
    </tr>
    <tr>
      <td>中继流量:</td>
      <td>xxx</td>
    </tr>
    <tr>
      <td>Amount:</td>
      <td>xxx</td>
    </tr>
    <tr>
      <td>Block Height:</td>
      <td>xxx</td>
    </tr>
    <tr>
      <td>From:</td>
      <td>xxx</td>
    </tr>
    <tr>
      <td>To:</td>
      <td>xxx</td>
    </tr>
    <tr>
      <td>Timestamp:</td>
      <td>xxx</td>
    </tr>
    <tr>
      <td>Gas Price:</td>
      <td>xxx</td>
    </tr>
  </table>
</div>
</template>

<script>
import echarts from 'echarts'
import header from 'components/header/header'
import filter from 'components/filter/filter'

export default {
  data() {
    return {
      legendArr: [],
      color: this.$store.state.color,
      myChart: {},
      name: '中继详情'
    }
  },
  methods: {
    _init() {
      this.legendArr = this.myChart.getOption().series
      this.legendArr.forEach((data) => {
        data.selected = true;
      })
      this.$root.charts.push(this.myChart)
      window.addEventListener('resize', function() {
        this.myChart.resize()
      }.bind(this))
    }
  },
  components: {
    'v-header': header,
    'v-filter': filter
  },
  mounted() {
    // 基于准备好的dom，初始化echarts实例
    this.myChart = echarts.init(document.querySelector('.line .main'));
    this.myChart.setOption({
      title: {
        show: false
      },
      tooltip: {
        trigger: 'axis'
      },
      legend: {
        show: false
      },
      toolbox: {
        show: false,
        feature: {
          dataZoom: {
            yAxisIndex: 'none'
          },
          restore: {},
          saveAsImage: {}
        }
      },
      color: this.color,
      calculable: true,
      xAxis: [{
        name: '时间',
        type: 'category',
        axisLine: {
          show: false
        },
        axisTick: {
          show: false
        },
        nameTextStyle: {
          color: 'rgba(0, 0, 0, 1)'
        },
        axisLabel: {
          textStyle: {
            color: 'black'
          }
        },
        data: ['0:00', '1:00', '3:00', '4:00', '5:00', '6:00', '7:00', '8:00', '9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00']
      }],
      yAxis: [{
        axisLine: {
          show: true,
          length: 1000
        },
        nameLocation: 'end',
        nameGap: 20,
        nameRotate: 0,
        axisTick: {
          show: true
        },
        splitLine: {
          lineStyle: {
            color: ['rgba(0, 0, 0, 1)']
          }
        },
        axisLabel: {
          textStyle: {
            color: 'black',
            fontSize: 14
          }
        },
        name: '带宽(Mb/s)',
        type: 'value',
        nameTextStyle: {
          color: 'rgba(0, 0, 0, 1)'
        }
      }],
      series: [{
        name: '比特币',
        type: 'line',
        smooth: true,
        sampling: 'average',
        itemStyle: {
          color: 'rgb(255, 70, 131)'
        },
        areaStyle: {
          normal: {color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{offset: 0, color: 'red'}, {offset: 0.5, color: 'pink'}, {offset: 1, color: '#f40'}])}},
        data: [300, 200, 100, 150, 400, 200, 500, 600, 200, 100, 150, 400, 200, 500, 600, 200, 100, 150, 400, 200, 500, 600, 700]
      }, {
        name: '比特币现金',
        type: 'line',
        smooth: true,
        data: [300, 200, 100, 150, 400, 200, 500, 600, 200, 100, 150, 400, 200, 500, 600, 200, 100, 150, 400, 200, 500, 600, 700],
        color: 'rgb(66, 133, 244)'
      }, {
        name: '以太坊',
        type: 'line',
        smooth: true,
        data: [300, 200, 100, 150, 400, 200, 500, 600, 200, 100, 150, 400, 200, 500, 600, 200, 100, 150, 400, 200, 500, 600, 700],
        color: 'rgb(234, 67, 53)'
      }, {
        name: '莱特币',
        type: 'line',
        smooth: true,
        data: [300, 200, 100, 150, 400, 200, 500, 600, 200, 100, 150, 400, 200, 500, 600, 200, 100, 150, 400, 200, 500, 600, 700],
        background: 'rgb(251, 185, 5)'
      }, {
        name: '元宝币',
        type: 'line',
        smooth: true,
        data: [300, 200, 100, 150, 400, 200, 500, 600, 200, 100, 150, 400, 200, 500, 600, 200, 100, 150, 400, 200, 500, 600, 700],
        color: 'rgb(52, 168, 83)'
      }]
    });
    this._init()
  }
}

</script>
