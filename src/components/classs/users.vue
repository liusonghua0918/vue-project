<template>
  <div>
    <el-form status-icon ref="form" label-width="100px">
      <el-form-item label="账号" v-if="type !='添加'">
        <el-input v-model="details._id"></el-input>
      </el-form-item>
      <el-form-item label="用户名">
        <el-input v-model="details.title"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="sure">确定</el-button>
        <el-button @click="none">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>

export default {
  data() {
    return {
      details: {
        title:"",
      }
    };
  },
  created() {
    if (this.detail) {
      this.$http.get("/api/cateinfo?id=" + this.detail).then(res => {
        this.details = res.data.data;
      });
    }
  },
  methods: {
    none() {
      //关闭弹框
      this.$emit("hide");
      this.$emit("getlist");
    },
    sure() {
      if (this.type == "编辑") {
        this.$http
          .post("/api/cateedit", {
            id: this.details._id,
            title: this.details.title,
          })

          .then(res => {
            console.log(res);
            if (res.data.status == 1) {
              this.$emit("hide");
              this.$emit("getlist");
            }
          });
      } else {
        this.$http
          .post("/api/cateadd", {
            title: this.details.title,
            status:1
          })
          .then(res => {
            console.log(res);
            if (res.data.status == 1) {
              //关闭弹框
              this.$emit("hide");
              this.$emit("getlist");
            }
          });
      }
    }
  },
  props: ["detail", "type"],
  watch: {
    type(newVal) {
      if (newVal == "添加") {
        this.details = {
            title:""
        };
      } else {
        this.$http.get("/api/cateinfo?id=" + this.detail).then(res => {
          console.log(res);
          this.details = res.data.data;
        });
      }
    }
  }
};
</script>

<style scoped>
</style>