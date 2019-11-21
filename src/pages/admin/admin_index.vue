<template>
  <div>
    <el-container>

      <el-header>后台管理系统</el-header>

      <!-- 左侧边栏 -->
      <el-container>
        <el-aside width="200px">
            <el-menu default-active="2" class="el-menu-vertical-demo" router>
              <el-submenu index="1">
                <template slot="title">
                  <i class="el-icon-location"></i>
                  <span>用户管理</span>
                </template>
                <el-menu-item-group>
                  <el-menu-item index="/admin_index/user">管理员</el-menu-item>
                  <el-menu-item index="/admin_index/vip">会员</el-menu-item>
                </el-menu-item-group>
              </el-submenu>
              
              <el-submenu index="2">
                <template slot="title">
                  <i class="el-icon-location"></i>
                  <span>商品管理</span>
                </template>
                <el-menu-item-group>
                  <el-menu-item index="/admin_index/classs">分类管理</el-menu-item>
                  <el-menu-item index="/admin_index/shop">商品管理</el-menu-item>
                </el-menu-item-group>
              </el-submenu>

              <el-submenu index="3">
                <template slot="title">
                  <i class="el-icon-location"></i>
                  <span>图片管理</span>
                </template>
                <el-menu-item-group>
                  <el-menu-item index="/admin_index/banner">轮播图</el-menu-item>
                </el-menu-item-group>
              </el-submenu>
              
            </el-menu>
        </el-aside>

        <!--  右内容 -->
        <el-main>
            <router-view></router-view>
        </el-main>

      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {

};
</script>

<style scoped>
.el-header,
.el-footer {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
  line-height: 200px;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  /* line-height: 160px; */
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
</style>