<template>
  <div ref="radar" style="width: 600px;height: 400px"/>
</template>

<script >
import * as echarts from 'echarts/core';
import { RadarChart } from 'echarts/charts';
import { TitleComponent, TooltipComponent, GridComponent, LegendComponent } from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';
echarts.use([TitleComponent, TooltipComponent, GridComponent, RadarChart, CanvasRenderer, LegendComponent]);

export default {
  mounted() {
    this.myChart = echarts.init(this.$refs.radar)
    var option =  {
      title: {
        text: '图表'
      },
      legend: {
        data: ['张三', '李四']
      },
      radar: {
        // shape: 'circle',
        indicator: [
          { name: '健康', max: 6500 },
          { name: '家庭', max: 16000 },
          { name: '地位', max: 30000 },
          { name: '金钱', max: 38000 },
          { name: '共情', max: 52000 },
          { name: '技能', max: 25000 }
        ]
      },
      series: [
        {
          name: 'Budget vs spending',
          type: 'radar',
          data: [
            {
              value: [4200, 3000, 20000, 35000, 50000, 18000],
              name: '张三'
            },
            {
              value: [5000, 14000, 28000, 26000, 42000, 21000],
              name: '李四'
            }
          ]
        }
      ]
    };
    this.myChart.setOption(option)
  },
  data() {
    return {
      myChart: null
    }
  }
}
</script>

<style lang='scss' scoped>
</style>