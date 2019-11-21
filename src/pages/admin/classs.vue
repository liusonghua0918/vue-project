<template>
  <div>
    <div class="one">
      <div>
        <el-button type="success" @click="add">添加</el-button>
      </div>
      <el-table ref="singleTable" :data="tableData" style="width: 100%">
        <el-table-column type="index" width="50" label="账号"></el-table-column>
        <el-table-column property="title" label="名称" width="120"></el-table-column>
        <el-table-column property="button" label="操作">
          <template slot-scope="scope">
            <el-button type="success" size="small" @click="edit(scope.row)">编辑</el-button>
            <el-button type="danger" size="small" @click="del(scope.row, scope)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog title="提示" :visible.sync="dialogVisible" width="30%">
      <users :detail="detail._id" @hide="hide" :type="type" @getlist="getlist"></users>
    </el-dialog>
  </div>
</template>

<script>
import users from "../../components/classs/users";
export default {
  data() {
    return {
      tableData: [],
      dialogVisible: false,
      detail: "",
      type: "",
      title: ""
    };
  },

  created() {
    this.getlist();
  },

  methods: {
    add() {
      this.type = "添加";
      this.dialogVisible = true;
    },
    getlist() {
      this.$http.get("/api/catelist").then(res => {
        console.log(res);
        this.tableData = res.data.data;
        console.log(this.tableData);

        this.title = res.data.data.title;
        console.log(this.title);
      });
    },
    edit(row) {
      this.type = "编辑";
      this.detail = row;
      //显示弹框
      this.dialogVisible = true;
    },
    hide() {
      this.dialogVisible = false;
    },
    del(row, scope) {
      this.$confirm("此操作将永久删除该数据 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$http
            .post("/api/catedel", {
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
  },
  components: {
    users: users
  }
};
</script>

<style scoped>
</style>