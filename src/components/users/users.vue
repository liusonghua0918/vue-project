<template>
  <div>
    <el-form status-icon ref="form" label-width="100px">
      <el-form-item label="账号" v-if="type !='添加'">
        <el-input v-model="details._id"></el-input>
      </el-form-item>
      <el-form-item label="用户名">
        <el-input v-model="details.username"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="details.password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="sure">确定</el-button>
        <el-button @click="none">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
// import users from "../users/users";
export default {
  data() {
    return {
      details:{
        username:"",
        password:""
      }
    };
  },
  created() {
    if(this.detail){
      this.$http.get('/api/userinfo?id=' +this.detail).then(res=>{
        this.details=res.data.data
      })
    }
  },
  methods: {
    none(){
      //关闭弹框
      this.$emit('hide')
      this.$emit('getlist')
    },
    sure(){
      if(this.type=="编辑"){
        this.$http.post('/api/useredit',{
          id:this.details._id,
          username:this.details.username,
          password:this.details.password
        }).then(res=>{
          console.log(res)
          if(res.data.status==1){
            this.$emit('hide')
            this.$emit('getlist')
          }
        });
      }else{
        this.$http.post('/api/useradd',{
          username:this.details.username,
          password:this.details.password
        }).then(res=>{
          console.log(res)
          if(res.data.status==1){
            //关闭弹框
            this.$emit('hide')
            this.$emit('getlist')
          }
        });
      }
    }
  },
  props:['detail','type'],
  watch: {
    type(newVal){
      if(newVal=='添加'){
        this.details={
          username:"",
          password:""
        };
      }else{
        this.$http.get('/api/userinfo?id='+this.detail).then(res=>{
          console.log(res)
          this.details=res.data.data
        })
      }
    }
  },
  
};
</script>

<style scoped>
</style>