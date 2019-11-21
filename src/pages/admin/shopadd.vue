<template>
  <div>
    <el-form>
      <el-form-item label="分类">
        <el-select v-model="formData.cate" placeholder="请选择分类">
          <el-option
            v-for="(item,index) in shoparr"
            :key="index"
            :label="item.title"
            :value="item.title"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="名称">
        <el-input v-model="formData.title"></el-input>
      </el-form-item>
      <el-form-item label="图片">
        <input type="file" ref="file" />
      </el-form-item>
      <el-form-item label="价格">
        <el-input v-model="formData.price"></el-input>
      </el-form-item>
      <el-form-item label="描述">
        <el-input v-model="formData.desc"></el-input>
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
        cate: "",
        title: "",
        price: "",
        desc: ""
      },
      shoparr: []
    };
  },
  created() {
    //点击添加时,在分类选择框中先获取:商品分类列表接口,再渲染到选择框中
    this.$http.get("/api/catelist").then(res => {
      if (res.data.status == 1) {
        this.shoparr = res.data.data;
      }
    });
    if (this.$route.query.id) {
      //获取商品获取-一条
      this.$http
        .get("/api/goodsinfo", {
          params: {
            id: this.$route.query.id
          }
        })
        .then(res => {
          console.log(res); //res:商品列表的信息  cate,desc,imgurl,price,title,status
          if (res.data.status == 1) {
            this.formData = res.data.data;
            console.log(this.formData);
            //删除formData中的status和imgurl
            delete this.formData.status;
            delete this.formData.imgurl;
          }
        });
    }
  },
  methods: {
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
      // console.log(document.querySelector('.file'))
      if (this.$route.query.id) {
        form.append("id", this.$route.query.id);
        this.$http.post("/api/goodsedit", form).then(res => {
          console.log(res);
          if (res.data.status == 1) {
            this.$router.push("/admin_index/shop");
          }
        });
      } else {
        this.$http.post("/api/goodsadd", form).then(res => {
          console.log(res);
          if (res.data.status == 1) {
            // 跳回商品管理
            this.$router.push("/admin_index/shop");
          }
        });
      }
    },
    //重置输入的内容
    none() {
      this.formData = "";
    }
  }
};
</script>

<style scoped>
</style>