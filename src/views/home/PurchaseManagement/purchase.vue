<template>
  <div>
    <!-- 采购列表卡片区 -->
    <el-card class="box-card">
      <!-- 导航选项区 -->
      <div class="nav">
        <!-- 新增按钮 -->
        <el-button
          type="info"
          icon="el-icon-circle-plus-outline"
          size="small"
          @click="addDialogVisible = true"
        >新增采购单</el-button>
        <!-- 日期选择 -->
        <div class="dateChoose">
          <span>起始时间:</span>
          <el-date-picker
            unlink-panels
            v-model="date1"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          ></el-date-picker>
        </div>
        <!-- 下拉菜单 -->
        <el-select v-model="value" placeholder="请选择">
          <el-option
            v-for="item in goodsStatusOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
        <!-- 输入框(带搜索) -->
        <div class="input-with-select">
          <el-input placeholder="请输入内容" v-model="search" class="input-with-select" clearable>
            <el-button slot="append" icon="el-icon-search">搜索</el-button>
          </el-input>
        </div>
      </div>
      <!-- 内容区 -->
      <!-- 表格 -->
      <el-table border :data="tableData" stripe style="width: 100%">
        <el-table-column prop="date" label="日期" width="180"></el-table-column>
        <el-table-column prop="name" label="姓名" width="180"></el-table-column>
        <el-table-column prop="address" label="地址"></el-table-column>
        <!-- 操作 -->
        <el-table-column prop="address" label="操作"></el-table-column>
      </el-table>

      <el-dialog title="新增采购单" :visible.sync="addDialogVisible" width="30%">
        <span slot="footer" class="dialog-footer">
          <el-button @click="addDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="addDialogVisible = false">确 定</el-button>
        </span>
      </el-dialog>
      <!-- 分页 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pagenum"
        :page-sizes="[1, 2, 5, 10]"
        :page-size="queryInfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </el-card>
  </div>
</template>


<script>
export default {
  data() {
    return {
      //已选择日期
      date1: "",
      //下拉
      goodsStatusOptions: [
        {
          value: "1",
          label: "无"
        },
        {
          value: "2",
          label: "待发货"
        },
        {
          value: "3",
          label: "部分发货"
        },
        {
          value: "4",
          label: "已发货"
        }
      ],
      value: "1",
      search:'',
      //表格数据
      tableData: [],
      // 新增采购单dialog
      addDialogVisible: false,
      //分页条件
      queryInfo: {
        type: 1,
        pagenum: 1,
        pagesize: 10
      },
      total: 1
    };
  },
  methods: {
    // 分页(pagesize改变)
    handleSizeChange(newSize) {
      this.queryInfo.pagesize = newSize;
     
    },
    // 分页2(页码改变)
    handleCurrentChange(newPage) {
      this.queryInfo.pagenum = newPage;
     
    },

  }
};
</script>

<style lang="less" scoped>
.nav {
  display: flex;
  margin-bottom: 10px;

  .dateChoose {
    margin-left: 100px;
    margin-right: 50px;
    span {
      margin-right: 20px;
    }
  }

  .input-with-select {
    margin-left: 20px;
  }
}

// element-ui框架
/deep/ .el-range-separator {
  width: 13%;
}
/deep/ .el-input--suffix .el-input__inner {
  padding-right: 0;
}
</style>