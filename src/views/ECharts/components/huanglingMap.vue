<template>
  <div id="hlChartRef" class="container"></div>
</template>

<script>
  import * as echarts from 'echarts'
  import huangling from './json/huangling.json'
  import xianyang from './json/xianyang.json'

  export default {
    name: 'huanglingMap',
    components: {},
    props: {},
    data() {
      return {
        hlChart: null,
        hlOption: {}
      }
    },
    mounted() {
      this.initData()
    },
    methods: {
      initData() {
        this.hlChart = echarts.init(document.getElementById('hlChartRef'))
        echarts.registerMap('xianyang', { geoJSON: xianyang })
        this.hlOption = {
          tooltip: {
            show: true,
            trigger: 'item'
          },
          legend: {
            show: false
          },
          series: [
            {
              tooltip: {
                trigger: 'item',
                formatter: function(item) {
                  let tipHtml = ''
                  tipHtml =
                    '<div style="width:180px;height:112px;background:#fff;border-radius:4px;font-size:16px;font-weight:500;padding:0px;">' +
                    '<div style="font-size:14px;font-weight:700;line-height:20px;color:#39498E;text-align:left;margin-bottom:4px;">' +
                    item.name +
                    '</div>' +
                    '<div style="display:flex;justify-content: space-between;color:#494949;margin-bottom:4px">' +
                    '<span style="font-size:12px;color:#666;font-weight:400;">' +
                    '项目总数' +
                    ' ' +
                    '</span>' +
                    '<span style="font-size:12px;color:#666;font-weight:400;">' +
                    '976' +
                    ' 个' +
                    '</span>' +
                    '</div>' +
                    '<div style="display:flex;justify-content: space-between;color:#494949;margin-bottom:4px">' +
                    '<span style="font-size:12px;color:#666;font-weight:400;">' +
                    '风险数量' +
                    ' ' +
                    '</span>' +
                    '<span style="font-size:12px;color:#666;font-weight:400;">' +
                    '976' +
                    ' 个' +
                    '</span>' +
                    '</div>' +
                    '<div style="display:flex;justify-content: space-between;color:#494949;margin-bottom:4px">' +
                    '<span style="font-size:12px;color:#666;font-weight:400;">' +
                    '涉及风险金额' +
                    ' ' +
                    '</span>' +
                    '<span style="font-size:12px;color:#666;font-weight:400;">' +
                    '976' +
                    ' 亿元' +
                    '</span>' +
                    '</div>' +
                    '<div style="display:flex;justify-content: space-between;color:#494949;margin-bottom:4px">' +
                    '<span style="font-size:12px;color:#666;font-weight:400;">' +
                    '风险率' +
                    ' ' +
                    '</span>' +
                    '<span style="font-size:12px;color:#666;font-weight:400;">' +
                    '76' +
                    ' %' +
                    '</span>' +
                    '</div>' +
                    '</div>'
                  return tipHtml
                }
              },
              name: '广东省数据',
              type: 'map',
              map: 'xianyang', // 自定义扩展图表类型
              aspectScale: 1, // 视角倾斜度
              zoom: 0.65, // 缩放
              showLegendSymbol: false,
              label: {
                // 默认的字体样式
                show: true,
                color: '#fff',
                fontSize: 12
              },
              itemStyle: {
                // 默认的区域块颜色和样式
                areaColor: '#0E95F1',
                borderColor: '#68daf8',
                borderWidth: 2,
                shadowColor: '#0E95F1',
                shadowBlur: 10
              },
              emphasis: {
                label: {
                  // 悬浮高亮时的字体样式
                  show: true,
                  color: '#fff',
                  fontSize: 12,
                  fontWeight: 700
                },
                itemStyle: {
                  // 悬浮高亮时的地图背景色和边框颜色
                  areaColor: '#119aff',
                  borderColor: '#fff',
                  borderWidth: 2
                }
              },
              layoutCenter: ['50%', '50%'],
              layoutSize: '160%',
              markPoint: {
                symbol: 'none'
              },
              data: []
            }
          ]
        }
        this.hlChart.setOption(this.hlOption)
      }
    },
    watch: {}
  }
</script>

<style lang="scss" scoped>
  .container {
    background: #eee;
    width: 500px;
    height: 400px;
  }
</style>
