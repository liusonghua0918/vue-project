<template>
  <div class="inner">
    <div class="left">
      <ul>
        <!-- <li>手机</li>
        <li>家电</li>
        <li>电脑</li>-->
        <li
          v-for="(item,index) in msglist"
          :key="item._id"
          :class="{'active':index==ind}"
          @click="change(index)"
        >
          <!-- msglist对应created中this.msglist -->
          {{item.title}}
        </li>
      </ul>
    </div>
    <div class="right">
      <ul>
        <li v-for="(item) in list" :key="item._id">
          <img :src="'http://localhost:3000'+item.imgurl" @click="go(item._id)"/>
          <!-- <a href="/index/detail.vue">11</a> -->
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      msglist: [],
      list: [],
      data: null,
      ind: 0,
    };
  },
  created() {
    //从接口获取列表名称   (商品分类列表)
    this.$http.get("/api/catelist").then(res => {
      console.log(res);
      //在打印的res下data->data中 再传到上面的.right->ul->li中
      this.msglist = res.data.data;
    });
    //(商品分类及商品获取)
    this.$http.get("/api/categoods").then(res => {
      console.log(res);
      //这个list值对应.right的v-for中List    默认展示下边第一个的商品
      this.list = res.data.data[0].children;//res->data->data->children
      //res->data->data
      this.data = res.data.data;
    });
  },
  methods: {
    change(i) {
      //点击左侧列表时，显示当前左侧商品信息被点击的颜色
      this.ind = i;
      //点击左侧时，显示右侧对应的商品信息
      this.list = this.data[i].children;
    },
    go(id){
        this.$router.push({
            path:'/detail?id=' + id
        })
    }
  }
};
</script>

<style lang="less" scoped>
.inner {
  width: 100%;
  height: 100%;
  display: flex;
  .left {
    width: 30%;
    height: 100%;
    background: lightblue;
    // display: flex;
    // flex-direction: column;
    li {
      width: 100%;
      height: 60px;
      text-align: center;
      line-height: 60px;
      font-size: 20px;
      border: 1px solid black;
      &.active {
        color: purple;
      }
    }
    li:nth-child(1) {
      border-bottom: none;
    }
    li:nth-child(2) {
      border-bottom: none;
    }
  }
  .right {
    flex: 1;
    padding-left: 20px;
    ul {
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      li {
        width: 45%;
        img {
          width: 100%;
        }
      }
    }
  }
}
</style>