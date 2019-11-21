<template>
  <div>
    <van-nav-bar title="详情页" left-text="返回" left-arrow @click-left="back" />
    <div class="img">
      <img :src="'http://localhost:3000'+detail.imgurl" />
    </div>
    <div class="details">
      <p>{{detail.title}}</p>
      <p>￥{{detail.price}}</p>
    </div>
    <div class="other">
      <van-tabs v-model="activeName">
        <van-tab title="商品详情" name="a">
          <p>{{detail.cate}}:{{detail.title}}</p>
          <p>价格:￥{{detail.price}}</p>
        </van-tab>
        <van-tab title="买家口碑" name="b">内容 2</van-tab>
      </van-tabs>
    </div>
    <div class="foot">
      <van-goods-action>
        <van-goods-action-icon icon="chat-o" text="客服" />
        <van-goods-action-icon icon="shop-o" text="店铺" />
        <van-goods-action-icon :text="'总价￥:'+ detail.price" />
        <van-goods-action-button color="#be99ff" type="warning" text="加入购物车" @click="showprops" />
        <van-goods-action-button color="#7232dd" type="danger" text="立即购买" />
      </van-goods-action>
    </div>
    <props :show="show" @hide="hide" :detail="detail"></props>
  </div>
</template>

<script>
import props from "../components/detail/props.vue";
export default {
  data() {
    return {
      activeName: "a",
      detail: "",
      show: false
    };
  },
  components: {
    props: props
  },
  methods: {
    back() {
      this.$router.back();
    },
    showprops() {
      this.show = true;
    },
    hide(bol) {
      this.show = bol;
    }
  },
  created() {
    console.log(this);
    let id = this.$route.query.id;
    this.$http.get("/api/goodsinfo?id=" + id).then(res => {
      console.log(res);
      console.log(res.data);
      this.detail = res.data.data;
    });
  }
};
</script>

<style lang="less" scoped>
.other {
  p:nth-child(1) {
    font-size: 20px;
    color: red;
  }
  p:nth-child(2) {
    color: purple;
    font-size: 20px;
  }
}
</style>