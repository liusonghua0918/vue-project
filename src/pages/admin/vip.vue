<template>
  <div>
    <div class="one">
      <!-- <div>
        <el-button type="success" @click="add">添加</el-button>
      </div> -->
      <el-table ref="singleTable" :data="tableData" style="width: 100%">
        <el-table-column type="index" width="50" label="账号"></el-table-column>
        <el-table-column property="username" label="用户名" width="120"></el-table-column>
        <el-table-column property="button" label="操作">
          <!-- <el-button type="primary" plain @click="edit(scope.row)">编辑</el-button>
          <el-button type="danger" plain @click="del(scope.row,scope)">删除</el-button>-->
          <template slot-scope="scope">
            <el-button type="primary" size="small" @click="edit(scope.row)">编辑</el-button>
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
import users from "../../components/vip/users";
export default {
  data() {
    return {
      tableData: [],
      dialogVisible: false,
      detail: "",
      type: ""
    };
  },
  created() {
    //调用methods方法中的getlist方法
    this.getlist();
 
  },

  methods: {
    // add(){
    //   this.type="添加"
    //   this.dialogVisible=true
    // },
    getlist() {
      this.$http.get("/api/memberlist").then(res => {
        console.log(res);
        this.tableData = res.data.data;
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
  },
  components: {
    users: users
  }
};
</script>

<style scoped>
</style>