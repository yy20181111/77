<template>
  <div>
    <el-card>
      <div class="nav">
        <!-- 新增按钮 -->
        <el-button-group>
          <el-button
            type="info"
            icon="el-icon-circle-plus-outline"
            @click="addDialogVisible=true "
          >新增</el-button>
          <el-button type="info">
            删除
            <i class="el-icon-delete"></i>
          </el-button>
        </el-button-group>
        <!-- 输入框(带搜索) -->
        <div class="input-with-select">
          <el-input placeholder="请输入内容" v-model="search" class="input-with-select" clearable>
            <el-button slot="append" icon="el-icon-search">搜索</el-button>
          </el-input>
        </div>
      </div>
      <!-- 用户列表数据 -->
      <el-table :data="managerList" border stripe>
        <el-table-column type="index"></el-table-column>
        <el-table-column prop label="角色名称"></el-table-column>
        <el-table-column prop label="姓名"></el-table-column>
        <el-table-column prop label="电话"></el-table-column>
        <el-table-column prop label="操作"></el-table-column>
      </el-table>
      <!-- 新增dialog -->
      <el-dialog title="新增人员" :visible.sync="addDialogVisible" width="30%">
        <!-- dialog表单 -->
        <!-- <el-form :model="addForm" label-width="70px">
          <el-form-item label="用户名" prop="username">
            <el-input v-model="addForm.username"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input type="password" v-model="addForm.password"></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="addForm.email"></el-input>
          </el-form-item>
          <el-form-item label="手机号" prop="mobile">
            <el-input v-model="addForm.mobile"></el-input>
          </el-form-item>
        </el-form> -->
        <!-- 操作 -->
        <span slot="footer" class="dialog-footer">
          <el-button @click="addDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="addDialogVisible = false">确 定</el-button>
        </span>
      </el-dialog>
    </el-card>
  </div>
</template>


<script>
import { handleManagerList } from "../../../api/request/request";
export default {
  data() {
    return {
      search: "",
      queryInfo: {
        pageSize: 10,
        pageIndex: 1,
        keywords: ""
      },
      total: null,
      addDialogVisible: false,
      // 人员列表数据
      managerList: [],
      // 新增人员
      // addForm: {
      //   user_name: "",
      //   password: "",
      //   true_name: "",
      //   mobile: Number,
      //   roleids: []
      // }
    };
  },
  created() {
    this.getManagerList();
  },
  methods: {
    // 获取人员列表
    async getManagerList() {
      const { pageSize, pageIndex, keywords } = this.queryInfo;
      const { data: res } = await handleManagerList(
        pageSize,
        pageIndex,
        keywords
      );
      if (res.status == 200) {
        this.managerList = res.data;
        this.total = res.totalCount;
      } else return this.$message.errpr("获取数据失败");
      // console.log(res);
    }
  }
};
</script>

<style lang="less" scoped>
.nav {
  display: flex;
  justify-content: space-between;
}
.el-table {
  margin-top: 10px;
}
</style>