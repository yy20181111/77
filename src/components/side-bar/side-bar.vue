<template>
  <div>
    <template v-for="item in menuList">
      <el-menu-item
        v-if="item.children.length === 0"
        :index="'/home/'+ item.link_url +''"
        :key="item.id" class="title"
        @click="changeRouter(item.title, '/'+ item.link_url +'')" >
        <i class="iconfont icon-yonghuguanli
"></i>
        <span class="title">{{item.title}}</span>
      </el-menu-item>

      <el-submenu v-else :index="item.id + ''" :key="item.id">
        <template slot="title">
          <i class="iconfont icon-yonghu"></i>
          <span class="title">{{item.title}}</span>
        </template>


        <SideBar :menuList="item.children" @changeRouter="changeRouter" />
    
      </el-submenu>
    </template>
  </div>
</template>

<script>
export default {
  name: "SideBar",
  props: {
    menuList: Array
  },
  methods: {
    //点击侧边栏添加到右边tag新增
    changeRouter(title, path) {
      this.$emit("changeRouter", title, path);
    }
  }
};
</script>

<style lang="less" scoped>
.title{
  margin-left: 10px;
}
</style>