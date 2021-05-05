<template>
  <div>
    <el-card>
       <el-button
          type="info"
          icon="el-icon-circle-plus-outline"
          size="small" class="addBtn"
          @click="addDialogVisible = true" 
        >新增菜单</el-button>
      <!-- 表格 -->
      <tree-table :data="menuList" max-height="500" :columns="columns" :selection-type="false" :expand-type="false" :show-index="true" index-text="#" border :show-row-hover="false" >
        <!-- 操作 -->
        <template slot="operate" slot-scope="scope">
          <!-- <el-button type="success" size="mini" icon="el-icon-circle-plus-outline" 
          @click="addDialogVisible = true" >添加</el-button> -->
          <el-button type="primary" size="mini" icon="el-icon-edit"
          @click="showEditDialogVisible(scope.row.id)" >编辑</el-button>
          <el-button type="danger" size="mini" icon="el-icon-delete" 
          @click="deleteMenu(scope.row.id)" >删除</el-button>
        </template>
      </tree-table>

      <!-- 编辑dialog -->
      <el-dialog title="编辑菜单信息" :visible.sync="editDialogVisible" width="30%">
        <el-form label-width="70px" :model="editForm">
          <el-form-item label="调用别名">
            <el-input v-model="editForm.name"></el-input>
          </el-form-item>
          <el-form-item label="导航标题">
            <el-input v-model="editForm.title"></el-input>
          </el-form-item>
          <el-form-item label="副标题">
            <el-input v-model="editForm.sub_title"></el-input>
          </el-form-item>

          <el-form-item label="链接地址">
            <el-input v-model="editForm.link_url"></el-input>
          </el-form-item>
          <el-form-item label="排序数字">
            <el-input v-model="editForm.sort_id"></el-input>
          </el-form-item>

          <el-form-item label="备注">
            <el-input v-model="editForm.remark" disabled></el-input>
          </el-form-item>

          <el-form-item label="主键id">
            <el-input v-model="editForm.id" disabled></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="noEdit">取 消</el-button>
          <el-button type="primary" @click="editUserInfo">确 定</el-button>
        </span>
      </el-dialog>

      <!-- 添加用户dialog -->
      <el-dialog title="添加用户" :visible.sync="addDialogVisible" width="50%">
        <el-form label-width="120px" :model="addForm">
          <el-form-item label="调用别名">
            <el-input v-model="addForm.name"></el-input>
          </el-form-item>

          <el-form-item label="导航标题">
            <el-input v-model="addForm.title"></el-input>
          </el-form-item>
          <el-form-item label="副标题">
            <el-input v-model="addForm.sub_title"></el-input>
          </el-form-item>

          <el-form-item label="链接地址">
            <el-input v-model="addForm.link_url"></el-input>
          </el-form-item>
          <el-form-item label="父级分类(必填)">
            <el-cascader
              ref="cascader"
              :options="parentList"
              :props="props"
              v-model="cheakedList"
              @change="changeCascader(cheakedList)"
            ></el-cascader>
          </el-form-item>

          <el-form-item label="备注">
            <el-input v-model="addForm.remark" disabled></el-input>
          </el-form-item>
        </el-form>

        <span slot="footer" class="dialog-footer">
          <el-button @click="addDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="addMenu">确 定</el-button>
        </span>
      </el-dialog>
    </el-card>
  </div>
</template>


<script>
import {
  handleMenu,
  handleMenuInfo,
  handleEditMenuInfo,
  handleAddMenu,
  delMenu
} from "@/api/request/request";

import { eventBus } from '@/utils/event'
export default {
  data() {
    return {
      // 菜单信息
      menuList: [],
      //table列定义
      columns: [
        {
          label: "菜单名称",
          prop: "title",
          width: "500"
        },
        {
          label: "操作",
          type: "template", //当前列定义为模板列
          template: "operate" //当前列模板名称
        }
      ],
      //编辑dialog
      editDialogVisible: false,
      addDialogVisible: false,
      //修改信息保存
      editForm: {
        name: "",
        title: "",
        sub_title: "",
        icon_url: "",
        link_url: "",
        sort_id: "",
        is_lock: "",
        remark: "",
        parent_id: "",
        action_type: "",
        nav_type: "",
        is_sys: "",
        id: null
      },
      //添加菜单信息保存
      //父级列表数据
      parentList: [],
      // 已选择的分类
      cheakedList: [],
      //级联选择器的配置对象
      props: {
        expandTrigger: 'hover',
        checkStrictly: true,
        value: "id",
        label: "title",
        children: "children"
      },
      addForm: {
        name: "",
        title: "",
        sub_title: "",
        icon_url: "",
        link_url: "",
        sort_id: 99,
        is_lock: 0,
        remark: "",
        parent_id: '0',
        action_type: "Show,View,Add,Edit",
        nav_type: "System",
        is_sys: 1
      }
    };
  },
  created() {
    this.getMenuList();
  },
  methods: {
    //获取菜单列表
    async getMenuList() {
      const res = await handleMenu();
      if (res.status == 200) {
        this.menuList = res.data.data;
        this.parentList = res.data.data;
        // console.log(this.menuList);
      }
      
    },

    //编辑菜单dialog
    //获取当前id对应菜单信息
    async showEditDialogVisible(id) {
      console.log(id);
      this.editDialogVisible = true;
      const { data: res } = await handleMenuInfo(id);
      // console.log(res);
      if (res.status !== 200) return this.$message.error("获取菜单信息失败");
      this.editForm = res.data;
    },

    //发起修改请求
    async editUserInfo(id) {
      this.editDialogVisible = false;
      const res = await handleEditMenuInfo(this.editForm);
      console.log(res);
      console.log(id);
      console.log(this.editForm);
      if (res.status !== 200) return this.$message.error("error");
      this.getMenuList();

      this.$message.success("修改成功");
    },
    //取消修改
    noEdit() {
      (this.editDialogVisible = false), this.$message.warning("已取消修改");
    },
    //父级分类的id
    // parentChanged() {
    //   // console.log(this.cheakedList);
    //   if (this.cheakedList.length > 0) {
    //     this.addForm.parent_id = this.cheakedList[this.cheakedList.length - 1];
    //     return;
    //   } else {
    //     this.addForm.parent_id = 0;
    //   }
    // },

    changeCascader (){
      this.addForm.parent_id = this.cheakedList.length > 0 ? this.cheakedList[this.cheakedList.length - 1] : 0 
    },


    //添加菜单信息
    async addMenu() {
      const res = await handleAddMenu(this.addForm);
      if(res.data.status === 200 ) {
        this.getMenuList();
        eventBus.$emit("refresh")
      }
      this.addDialogVisible = false;
      // 
    },
      //删除菜单
    async deleteMenu(id) {
      //弹框询问确定是否删除
      const res = await this.$confirm(
        "此操作将永久删除该菜单, 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      ).catch(err => err);
      //确认返回confirm  取消返回cancel
      if (res !== "confirm") {
        return this.$message.info("已取消");
      }
      // console.log("已删除");
      const { data: res1 } = await delMenu(id);
      if(res1.status!==200) return this.$message.error(res1.errmsg)
      this.$message.success('已删除');
      eventBus.$emit("refresh")
      this.getMenuList();
    }
  }
};
</script>

<style lang="less" scoped>
.addBtn{
  margin-bottom: 10px;
}
// .el-card {
//   width: 50%;
// }
</style>