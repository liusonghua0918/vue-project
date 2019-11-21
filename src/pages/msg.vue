<template>
  <div class="all">
    <div class="head">
      <van-cell-group>
        <van-field v-model="value" placeholder="" class="a"/>
      </van-cell-group>
    </div>
    <div class="main">
        <list></list>
       <!-- <router-link to="/detail">详情页</router-link> -->
    </div>
  </div>
</template>

<script>
import list from '../components/msg/list.vue'
import detail from '../pages/detail'
export default {
    data() {
        return {
            value:""
        }
    },
    components:{
        list:list,
        detail:detail
    }
};
</script>

<style lang="less" scoped>
.head{
    width: 100%;
    height: 60px;
  .a{
    //   background-color: red;
    border: 1px solid black;
      height: 60px;
  }
}
</style>