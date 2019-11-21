<template>
  <div>
    <div class="one">
      <div>
        <el-button type="success" @click="add">添加</el-button>
      </div>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column type="index" width="50" label="账号"></el-table-column>
        <el-table-column prop="cate" label="分类" width="120"></el-table-column>
        <el-table-column prop="title" label="名称" width="120"></el-table-column>
        <el-table-column prop="imgurl" label="图片" width="120">
          <template slot-scope="scope">
            <el-image :src="'http://localhost:3000' +scope.row.imgurl" alt></el-image>
          </template>
        </el-table-column>
        <el-table-column prop="price" label="价格" width="120"></el-table-column>
        <el-table-column prop="desc" label="描述" width="120"></el-table-column>
        <el-table-column prop="button" label="操作">
          <template slot-scope="scope">
            <el-button type="success" size="small" @click="edit(scope.row)">编辑</el-button>
            <el-button type="danger" size="small" @click="del(scope.row, scope)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: []
    };
  },

  created() {
    // this.getlist();
    this.$http.get("/api/goodslist").then(res => {
      console.log(res);
      if (res.data.status == 1) {
        this.tableData = res.data.data;
      }
    });
  },

  methods: {
    add() {
      this.type = "添加";
      this.$router.push("/admin_index/shopadd");
    },
    edit(row) {
      // row代表一条商品
      this.$router.push("/admin_index/shopadd?id=" + row._id);
    },
    del(row, scope) {
      this.$confirm("此操作将永久删除该数据 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$http
            .post("/api/goodsdel", {
              id: row._id
            })
            .then(res => {
              if (res.data.status == 1) {
                this.tableData.splice(scope.$index, 1);
              }
              this.$message({
                type: "success",
                message: "删除成功!"
              });
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    }
    // getlist() {

    // },
  }
};
</script>

<style scoped>
</style>