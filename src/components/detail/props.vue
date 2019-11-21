<template>
  <div class="inner">
    <van-popup
      @close="close"
      v-model="myshow"
      closeable
      position="bottom"
      :style="{ height: '60%' }"
    >
      <div class="head">
        <img :src="'//localhost:3000' +detail.imgurl" />
        <div class="count">
          <P>￥{{detail.price}}</P>
          <P>库存199件</P>
        </div>
      </div>
      <div class="main">
        <h2>购买数量</h2>
        <div class="choose">
          <button @click="sub">-</button>
          <span>{{count}}</span>
          <button @click="add">+</button>
        </div>
      </div>
      <div class="color">
        <h3>颜色</h3>
        <ul>
          <li
            v-for="(item,index) in colortitle"
            :key="index"
            @click="changeColor(item)"
            :class="{'active' :item == color}"
          >{{item}}</li>
        </ul>
      </div>
      <div class="size">
        <h3>内存</h3>
        <ul>
          <li
            v-for="(item,index) in sizetitle"
            :key="index"
            @click="changeSize(item)"
            :class="{'active' :item == size}"
          >{{item}}</li>
        </ul>
      </div>
      <div class="foot">
        <van-goods-action>
          <van-goods-action-icon icon="chat-o" text="客服" />
          <van-goods-action-icon icon="shop-o" text="店铺" />
          <van-goods-action-icon :text="'￥'+count * detail.price" />
          <van-goods-action-button color="#be99ff" type="warning" text="加入购物车" @click="addcart" />
          <van-goods-action-button color="#7232dd" type="danger" text="立即购买" />
        </van-goods-action>
      </div>
    </van-popup>
  </div>
</template>

<script>
import Vue from "vue";
import { Toast } from "vant";
Vue.use(Toast);

export default {
  data() {
    return {
      myshow: this.show,
      count: 1,
      colortitle: ["黑色", "白色", "金色", "紫色"],
      sizetitle: ["32G", "64G"],
      color: "",
      size: ""
    };
  },
  props: ["show", "detail"],
  watch: {
    show(newVal, oldVal) {
      console.log("show变");
      console.log(newVal);
      this.myshow = newVal;
    }
  },
  methods: {
    close() {
      this.$emit("hide", false);
    },
    add() {
      this.count++;
    },
    sub() {
      this.count--;
    },
    changeColor(color) {
      this.color = color;
    },
    changeSize(size) {
      this.size = size;
    },
    addcart() {
      if (!this.color || !this.size) {
        // alert("请选择产品规格")
        Toast("请选择产品规格");
        return;
      }
      let userid = localStorage.getItem("id");
      if (!userid) {
        alert("请登录");
        this.$router.push("/login");
      }
      let goodsid = this.detail._id;
      let goodsnum = this.count;
      console.log(this.detail);
      this.$http
        .post("/api/cartadd", {
          userid: userid,
          goodsid: goodsid,
          goodsnum: goodsnum
        })
        .then(res => {
          console.log(res);
          if (res.data.status == 1) {
            this.$router.push("/index/cart");
          }
        });
    }
  }
};
</script>

<style lang="less" scoped>
.van-popup {
  width: 100%;
  height: 100%;
  padding: 20px;
}
.head {
  display: flex;
  img {
    width: 30%;
  }
  .count {
    margin-top: 40px;
    margin-left: 40px;
  }
}
.main {
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
  .choose {
    margin-right: 40px;
    button {
      width: 30px;
      height: 30px;
    }
  }
}
.color {
  display: flex;
  flex-direction: column;
  margin-top: 10px;
  margin-bottom: 10px;
  ul {
    display: flex;
    justify-content: space-between;
    li {
      width: 60px;
      height: 40px;
      margin-top: 10px;
      background: gray;
      color: white;
      line-height: 40px;
      text-align: center;
      &.active {
        color: red;
      }
    }
  }
}
.size {
  display: flex;
  flex-direction: column;
  margin-top: 10px;
  margin-bottom: 10px;
  ul {
    display: flex;
    // justify-content: space-around;
    li {
      width: 60px;
      height: 40px;
      margin-top: 10px;
      background: gray;
      color: white;
      line-height: 40px;
      text-align: center;
      &.active {
        color: red;
      }
    }
    li:nth-child(2) {
      margin-left: 45px;
    }
  }
}
</style>