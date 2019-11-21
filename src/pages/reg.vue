<template>
  <div>
    <div class="head">
      <van-nav-bar title="注册" left-text="返回" left-arrow @click-left="back" />
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
          @click-right-icon="$toast('请输入自定义用户名')"
        />

        <van-field
          v-model="password"
          required
          clearable
          type="password"
          label="密码"
          placeholder="请输入密码"
          right-icon="question-o"
          @click-right-icon="$toast('请输入自定义密码')"
        />

        <van-button color="linear-gradient(to right, #4bb0ff, #6149f6)" @click="reg">注册</van-button>
        <span @click="jump" style="margin-left:20px">已有账号?去登录</span>
      </van-cell-group>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import { Notify } from "vant";
Vue.use(Notify);

export default {
  data() {
    return {
      username: "",
      password: ""
    };
  },
  methods: {
    back() {
      this.$router.back();
    },
    jump(){
      this.$router.push('/login')
    },
    reg() {
      if (!this.username || !this.password) {
        Notify({ type: "warning", message: "请输入用户名或密码" });
        return false;
      }
      this.$http
        .post("api/memberadd", {
          username: this.username,
          password: this.password
        })
        .then(res => {
          console.log(res);
          if (res.data.status == 1) {
            this.$router.push("/login");
          }
        });
    }
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