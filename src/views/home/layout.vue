<template>
  <el-container>
    <!-- 侧边栏 -->
    <el-aside :width="isCollapse ? '45px' : '250px'">
      <div class="toClose" @click="close">✘✘✘</div>
      <el-menu
        unique-opened
        :collapse-transition="false"
        router
        background-color="#333743"
        text-color="#fff"
        active-text-color="#03CEF5"
        :collapse="isCollapse"
        :default-active="$route.path"
      >
        <template >
          
          <SideBar :menuList="menuList" @changeRouter="changeRouter" />
          <!-- <el-menu-item v-if="item.children.length === 0" :index="'/home/'+ item.link_url +''">
            <i :class="item.icon_url"></i>
            <span>{{item.title}}</span>
          </el-menu-item>
          <el-submenu v-else :index="item.id + ''">
            <template slot="title">
              <i :class="item.icon_url"></i>
              <span>{{item.title}}</span>
            </template>
            <el-menu-item
              :index="'/home/'+ subitem.link_url +''"
              v-for="subitem in item.children"
              :key="subitem.id"
              @click="changeRouter(subitem.title, '/'+ subitem.link_url +'')"
            >
              <span slot="title">{{subitem.title}}</span>
            </el-menu-item>
          </el-submenu> -->
        </template>
      </el-menu>
    </el-aside>
    <!-- 右边主体 -->
    <el-main>
      <el-card>
        <!-- 头部 -->
        <div class="header">
          <div>
            <!-- 首页固定显示 -->
            <router-link to="/home">
              <el-tag>首页</el-tag>
            </router-link>
            <!-- 动态显示tag标签 -->
          
              <router-link
                :to="'/home' + tag.path"
                v-for="tag in headerMenu"
                active-class="current-path"
                :key="tag.path"      
              >
                <el-tag closable @close.stop="delTag(tag.path)">{{tag.title}}</el-tag>
              </router-link>
           
          </div>
          <!-- 退出按钮 -->
          <el-button type="info" @click="logout">点击退出</el-button>
        </div>
      </el-card>

      <router-view></router-view>
    </el-main>
  </el-container>
</template>

<script>
import { handleMenu } from "@/api/request/request";
import SideBar from '@/components/side-bar/side-bar'
import { eventBus } from '@/utils/event'
export default {
  data() {
    return {
      menuList: [],
      headerMenu: [],
      isCollapse: false
    };
  },
  components: {
    SideBar
  },
  created() {
    this.getMenus();
  },
  mounted (){
    eventBus.$on('refresh', () => {
      this.getMenus()
    })
  },
  methods: {
    //请求侧边栏数据
    async getMenus() {
      const res = await handleMenu();
      // console.log(res.data);
      if (res.status != 200) return this.$message.error("获取数据失败");
      this.menuList = res.data.data;
    },
    // 点击收起
    close() {
      this.isCollapse = !this.isCollapse;
    },
    //点击返回登录页
    logout() {
      this.$confirm("确定退出登录???????????", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          window.sessionStorage.clear();
          this.$router.push("/login");
        })
        .catch(err => err);
    },
    //点击侧边栏添加到右边tag新增
    changeRouter(title, path) {
      let obj = {};
      obj.title = title;
      obj.path = path;
      //判断当前path是否被点击过,未点击加入数组,点击过返回当前数组对应index
      let temp = this.headerMenu.findIndex(item => item.path === obj.path);
      // console.log(temp)
      //截取数组
      if (temp === -1) {
        this.headerMenu.push(obj);
        if(this.headerMenu.length>10){
          this.headerMenu.splice(0,1)
        }
      }

      // console.log(this.headerMenu.length);

      // console.log(title, path)
    },
    //点击删除tag
    delTag(tag) {
      //返回一个新的(除去当前点击 != index 的item)数组,即删除
      let arr = this.headerMenu.filter(item => {
        return tag != item.path;
      });
      console.log(arr);
      this.headerMenu = arr;
    }
  }
};
</script>

<style lang="less" scoped>
.el-container {
  width: 100%;
  height: 100%;
  .el-aside {
    .el-menu {
      border: 0;
    }
    background-color: #333743;
    .iconfont {
      font-size: 20px;
      margin-right: 10px;
      color: #eee;
    }
    .toClose {
      color: #eee;
      font-size: 12px;
      height: 30px;
      line-height: 30px;
      text-align: center;
      letter-spacing: 0.2em;
      cursor: pointer;
    }
  }
  .el-main {
    background-color: #eaebef;
  }
  //当前激活菜单背景色
  .el-menu-item.is-active {
    background-color: rgba(000, 000, 000, 0.2) !important;
    color: #fff;
  }
  //去掉鼠标移入背景色
  //  .el-menu-item:hover {
  //   background-color: rgba(0,0,0,.03) !important;

  // }
  //按钮颜色
  .el-button {
    background-color: #333743;
  }
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .el-tag {
      margin: 0 15px;
      cursor: pointer;
      height: 37px;
      line-height: 37px;
      font-size: 14px;
      padding: 0 15px;
      border: none;
      box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.2);
      background-color: #fff;
      color: #959595;
      /deep/.el-tag__close {
        color: #999;
        &:hover {
          background: #ccc;
          color: #666;
        }
      }
    }
    .current-path {
      .el-tag {
        background: #ff5777;
        color: #fff;
        box-shadow: 0 0 4px #ff5777;
        /deep/ .el-tag__close{
          color: #fff;
          &:hover {
            opacity: .6;
            background: transparent;
          }
        }
      }
    }
  }

  .el-card {
    height: 62px;
    overflow: hidden;
  }
  .el-main{
    padding: 0 20px;
  }
}
</style>