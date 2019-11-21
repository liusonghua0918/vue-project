<template>
  <div>
    <div id="myecharts" ref="echart"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: [],
      arr: []
    };
  },
  created() {
    this.$http.get("/api/goodslist").then(res => {
      console.log(res)
      this.list = res.data.data;
      let arr = [];
      this.list.forEach(item => {
        arr.push(item.price);
      });
      this.arr = arr;
      this.$nextTick(() => {
        var myechart = this.$echarts.init(this.$refs.echart);
        var option = {
          title: {
            text: "vue中的echart"
          },
          tooltip: {},
          legend: {
            data: ["价格"]
          },
          series: [
            {
              name: "价格",
              type: "bar",
              data: this.arr
            }
          ],
          xAxis: {
            data: [0, 1, 2]
          },
          yAxis: {}
        };
        myechart.setOption(option);
      });
    });
  }
};
</script>

<style scoped>
#myecharts{
  width: 500px;
  height: 500px;
}
</style>