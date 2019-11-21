<template>
  <div>
    <div class="head">
      <van-nav-bar title="登录" left-text="返回" left-arrow @click-left="back" />
    </div>
    <div class="inner">
      <van-cell-group>
        <van-field
          v-model="username"
          required
          clearable
          label="用户名"
          right-icon="question-o"
          placeholder="请输入用户名"
          @click-right-icon="$toast('请输入6-12位用户名')"
        />

        <van-field
          v-model="password"
          required
          clearable
          type="password"
          label="密码"
          placeholder="请输入密码"
          right-icon="question-o"
          @click-right-icon="$toast('请输入6-12位密码')"
        />

        <van-button @click="login" color="linear-gradient(to right, #4bb0ff, #6149f6)">登录</van-button><span @click="jump" style="margin-left:10px">还没有账号?去注册</span>
        <!-- <van-button @click="reg" color="linear-gradient(to right, #4bb0ff, #6149f6)">注册</van-button> -->
      </van-cell-group>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import { Toast } from "vant";
Vue.use(Toast);
import { Notify } from "vant";
Vue.use(Notify);

export default {
  data() {
    return {
      username: "",
      password: "",
      url: "",
    };
  },
  methods: {
    back() {
      this.$router.back();
    },
    jump(){
      this.$router.push('/reg')
    },
    login() {
      if (!this.username || !this.password) {
        Notify({ type: "warning", message: "请输入用户名或密码" });
        return false;
      }
      this.$http
        .post("/api/memberlogin", {
          username: this.username,
          password: this.password
        })
        .then(res => {
          console.log(res);
          localStorage.setItem("id", res.data.data._id);
          // this.$router.push(localStorage.getItem("url"));
          this.$router.push('/index/home');
          if(res.data.status==1){
          Toast.success("登录成功");
          }else{
            Toast.fail("用户名或密码错误");
          }
          // if(res.data.status==-1){
          // Toast.fail("用户名不存在");
          // }
        });
    },
    reg(){
        this.$router.push('/reg')
    }
  },
  beforeRouteEnter(to, from, next) {
    console.log(from);
    localStorage.setItem("url", from.fullPath);
    next();
  }
};
</script>

<style lang="less" scoped>
.inner {
  margin-top: 40px;
  .van-cell {
    height: 60px;
    line-height: 60px;
    font-size: 20px;
  }
  button {
    width: 100px;
    height: 40px;
    margin-left: 40%;
    font-size: 18px;
    margin-top: 40px;
  }
  // span{
  // }
}
</style>