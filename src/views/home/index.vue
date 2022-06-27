<template>
  <div style="margin: 80px 40px">
    <el-row :gutter="20">
      <el-col :span="6">
        <el-card class="data-card" style="padding: 40px" :body-style="'padding: 0'">
          <svg-icon icon-class="share" :style="iconStyle" />
          <div>
            <p style="margin: 0">150100</p>
            <p style="margin: 0">分享</p>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card class="data-card" style="padding: 40px" :body-style="'padding: 0'">
          <svg-icon icon-class="letter" :style="iconStyle" />
          <div>
            <p style="margin: 0">582104</p>
            <p style="margin: 0">消息</p>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card class="data-card" style="padding: 40px" :body-style="'padding: 0'">
          <svg-icon icon-class="scan" :style="iconStyle" />
          <div>
            <p style="margin: 0">21480</p>
            <p style="margin: 0">扫码</p>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card class="data-card" style="padding: 40px" :body-style="'padding: 0'">
          <svg-icon icon-class="favour" :style="iconStyle" />
          <div>
            <p style="margin: 0">148123</p>
            <p style="margin: 0">点赞</p>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <div id="myEcharts" :style="{ height: '300px'}"></div>
      </el-col>
      <el-col :span="12">
        <div id="myCircle" :style="{height: '300px'}"></div>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import * as echarts from 'echarts';
import {onMounted, onUnmounted} from 'vue';
import SvgIcon from '@/components/SvgIcon';

const iconStyle = {fontSize: '60px', float: 'left'};
/// 声明定义一下echart
let echart = echarts;

onMounted(() => {
  initChart();
  initCicle();
});

onUnmounted(() => {
  echart.dispose;
});

function initCicle() {
  let circle = echart.init(document.getElementById('myCircle'));
  circle.setOption({
    series: [
      {
        type: 'pie',
        data: [
          {
            value: 335,
            name: '直接访问',
          },
          {
            value: 234,
            name: '联盟广告',
          },
          {
            value: 1548,
            name: '搜索引擎',
          },
        ],
      },
    ],
  });
}

// 基础配置一下Echarts
function initChart() {
  let chart = echart.init(document.getElementById('myEcharts'));
  // 把配置和数据放这里
  chart.setOption({
    xAxis: {
      type: 'category',
      data: [
        '一月',
        '二月',
        '三月',
        '四月',
        '五月',
        '六月',
        '七月',
        '八月',
        '九月',
        '十月',
        '十一月',
        '十二月',
      ],
    },
    tooltip: {
      trigger: 'axis',
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        data: [
          820,
          932,
          901,
          934,
          1290,
          1330,
          1320,
          801,
          102,
          230,
          4321,
          4129,
        ],
        type: 'line',
        smooth: true,
      },
    ],
  });
  window.onresize = function() {
    //自适应大小
    chart.resize();
  };
}


</script>
<style lang="scss" scoped>
.data-card {
  div {
    height: 60px;
    display: flex;
    flex-direction: column-reverse;
    padding-left: 20px
  }
}
</style>
