<template>
  <div class="container">
    <div class="main">
        <router-view/>
    </div>
    <div class="footer">
      <van-tabbar v-model="active" route>
        <van-tabbar-item replace to="/index/home" icon="home-o">首页</van-tabbar-item>
        <van-tabbar-item replace to="/index/msg" icon="apps-o">分类</van-tabbar-item>
        <van-tabbar-item replace to="/index/cart" icon="shopping-cart-o">购物车</van-tabbar-item>
        <van-tabbar-item replace to="/index/my" icon="contact">我的</van-tabbar-item>
      </van-tabbar>
    </div>
  </div>
</template>

<script>
export default {
    data(){
        return{
            active:0
        }
    }
};
</script>

<style lang="less" scoped>
.container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  .main {
    flex: 1;
  }
  .footer {
    width: 100%;
    height: 50px;
  }
}
</style>