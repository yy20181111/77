<template>
  <div>
    <el-card>
      <el-button type="info" @click="dialogVisible =true">添加角色</el-button>
      <!-- 角色列表表格 -->
      <el-table :data="roleList" border style="width: 100%">
        <el-table-column type="selection"></el-table-column>
        <el-table-column prop="role_name" label="角色名称"></el-table-column>
        <el-table-column prop="id" label="主键id"></el-table-column>
      </el-table>
      <!-- 添加dialog -->
      <el-dialog title="添加角色" :visible.sync="dialogVisible" width="20%">
        <el-form label-width="120px" :model="addForm">
          <el-form-item label="名称">
            <el-input v-model="addForm.role_name"></el-input>
          </el-form-item>
        </el-form>

        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="addRole">确 定</el-button>
        </span>
      </el-dialog>
    </el-card>
  </div>
</template>


<script>
import { handleRoleList, handleAddRole } from "@/api/request/request";
export default {
  data() {
    return {
      roleList: [],
      //添加dialog
      dialogVisible: false,
      //添加数据
      addForm: {
        role_name: "",
        role_type: 1,
        role_range: 1,
        dt_role_values: [
          {
            menu_id: 1,
            action_type: "Show"
          },
          {
            menu_id: 1,
            action_type: "View"
          },
          {
            menu_id: 2,
            action_type: "Show"
          },
          {
            nav_name: 2,
            action_type: "View"
          }
        ]
      }
    };
  },
  created() {
    this.getRoleList();
  },
  methods: {
    //获取角色列表
    async getRoleList() {
      const res = await handleRoleList();
      // console.log(res);
      if (res.status !== 200) return this.$message.error(res.data.errmsg);
      this.roleList = res.data.data;
      // console.log(this.roleList);
    },
    //添加角色
    async addRole() {
      const res = await handleAddRole(this.addForm);
      console.log(res.data);
      if (res.status !== 200) return this.$message.error("添加失败");
      console.log(this.roleList);
      this.dialogVisible=false
    }
  }
};
</script>

<style lang="less" scoped>
.el-button {
  margin-bottom: 10px;
}
</style>