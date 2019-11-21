<template>
  <div>
    <el-form>
      <el-form-item label="编号">
        <el-input v-model="formData._id"></el-input>
      </el-form-item>
      <el-form-item label="名称">
        <el-input v-model="formData.title"></el-input>
      </el-form-item>
      <el-form-item label="图片">
        <input type="file" ref="file" />
      </el-form-item>

      <el-form-item>
        <el-button type="warning" plain @click="sure">确定</el-button>
        <el-button type="danger" plain @click="none">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formData: {
        id: "",
        title: ""
      }
    };
  },
  created() {
    if (this.$route.query.id) {
      //轮播图获取-一条
      this.$http
        .get("/api/bannerinfo", {
          params: {
            id: this.$route.query.id
          }
        })
        .then(res => {
          console.log(res);
          if (res.data.status == 1) {
            this.formData = res.data.data;
            console.log(this.formData);
          }
        });
    }
  },
  methods: {
    //重置输入的内容
    none() {
      this.formData = "";
    },
    //确定编辑内容
    // sure() {},
    sure() {
      let form = new FormData();
      // FormData 构造函数  append
      for (var key in this.formData) {
        form.append(key, this.formData[key]);
      }
      form.append("status", 1);
      form.append("img", this.$refs.file.files[0]);
      if (this.$route.query.id) {
        form.append("id", this.$route.query.id);
        this.$http.post("/api/banneredit", form).then(res => {
          console.log(res);
          if (res.data.status == 1) {
            this.$router.push("/admin_index/banner");
          }
        });
      } else {
        this.$http.post("/api/banneradd", form).then(res => {
          console.log(res);
          if (res.data.status == 1) {
            // 跳回轮播图
            this.$router.push("/admin_index/banner");
          }
        });
      }
    }
  }
};
</script>

<style scoped>
</style>