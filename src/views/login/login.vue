<template>
  <div class="loginContainer">
    <!-- 闪烁星星部分 -->
    <div class="night">
      <div class="shooting_star"></div>
      <div class="shooting_star"></div>
      <div class="shooting_star"></div>
      <div class="shooting_star"></div>
      <div class="shooting_star"></div>
      <div class="shooting_star"></div>
      <div class="shooting_star"></div>
      <div class="shooting_star"></div>
      <div class="shooting_star"></div>
      <div class="shooting_star"></div>
      <div class="shooting_star"></div>
      <div class="shooting_star"></div>
      <div class="shooting_star"></div>
      <div class="shooting_star"></div>
      <div class="shooting_star"></div>
      <div class="shooting_star"></div>
      <div class="shooting_star"></div>
      <div class="shooting_star"></div>
      <div class="shooting_star"></div>
      <div class="shooting_star"></div>
    </div>
    <!-- 背景闪烁 -->
    <div class="aa">
      <div class="scene">
        <div class="wrap">
          <div class="wall wall-right"></div>
          <div class="wall wall-left"></div>
          <div class="wall wall-top"></div>
          <div class="wall wall-bottom"></div>
          <div class="wall wall-back"></div>
        </div>
        <div class="wrap">
          <div class="wall wall-right"></div>
          <div class="wall wall-left"></div>
          <div class="wall wall-top"></div>
          <div class="wall wall-bottom"></div>
          <div class="wall wall-back"></div>
        </div>
      </div>
    </div>
    <!-- 登录盒子区 -->
    <div class="border">
      <div class="loginBox">
        <!-- 表单 -->
        <div class="ciyi">which BigClever ?</div>

        <div v-if="isShow" class="user">
          <div class="pleaseLogin">请在下方输入用户密码验证登录!</div>
          <el-form ref="loginFormRef" class="loginForm" :model="userInfo" :rules="loginRules">
            <!-- 用户名 -->
            <el-form-item prop="username">
              <el-input prefix-icon="iconfont icon-yonghuming" v-model="userInfo.username"></el-input>
            </el-form-item>
            <!-- 密码 -->
            <el-form-item prop="password">
              <el-input
                prefix-icon="iconfont icon-mima"
                v-model="userInfo.password"
                type="password"
              ></el-input>
            </el-form-item>
            <!-- 登录按钮 -->
            <div class="loginBtn">
              <el-button type="info" @click="login">登录</el-button>
            </div>
          </el-form>
        </div>

        <!-- 二维码区域 -->
        <div class="QRContainer" v-else>
          <div class="QRTick">微信扫描二维码自动登录!</div>
          <div class="QR">
            <img src="../../assets/images/vx.jpg" alt />
          </div>
        </div>

        <!-- 登录方式按钮 -->
        <div class="btn user iconfont icon-yonghuming" @click="isShow = true"></div>
        <div class="btn vx iconfont icon-xingzhuangjiehe" @click="isShow = false"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { handleLogin } from "@/api/request/request";
import { setToken } from "../../utils/cookie/index";
export default {
  data() {
    return {
      //控制二维码显示隐藏
      isShow: true,
      //登录表单验证规则
      loginRules: {
        username: [
          { required: true, message: "3-5个字", trigger: "blur" },
          { min: 3, max: 11, message: "长度在 3 到 11 个字符", trigger: "blur" }
        ],
        password: [
          { required: true, message: "3-8个字", trigger: "blur" },
          { min: 3, max: 11, message: "长度在 3 到 11 个字符", trigger: "blur" }
        ]
      },
      //用户信息
      userInfo: {
        username: "BigClever",
        password: "xx1008611"
      }
    };
  },
  methods: {
    //点击微信登录出现二维码
    showQR() {
      this.isShow = true;
    },
    //登录请求
    async login() {
      const res = await handleLogin(
        this.userInfo.username,
        this.userInfo.password
      );
      // console.log(res.data.token);
      if (res.data.status !== 200) return this.$message.error("登录失败");
      this.$notify.success("登陆成功!");

      //保存该用户token
      setToken( 'Bearer ' + res.data.token);
      //  跳转首页
      this.$router.push("/home");
    }
  }
};
</script>

<style lang="less" scoped>
@import "../../assets/css/login.css";
.loginContainer {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
  background-size: cover;
  background-image: linear-gradient(#1c1c1c, #cbcbcb);
  //背景图效果
  .aa {
    position: absolute;
    left: 50%;
    top: 50%;
    opacity: 0.5;
  }
  /* 边框四个角 */
  .border {
    .loginBox {
      width: 350px;
      height: 350px;
      background-image: linear-gradient(rgb(142, 145, 146), #1c1c1c);
      opacity: 0.6;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      border-radius: 130px 65px 130px 65px;
      .ciyi {
        width: 300px;
        height: 50px;
        margin: 40px auto 0 auto;
        text-align: center;
        font-size: 30px;
        font-weight: 700;
      }
      .user {
        margin-top: 20px;
      }
      .pleaseLogin {
        width: 300px;
        height: 24px;
        text-align: center;
        margin: 0 auto;
        font-size: 12px;
        cursor: pointer;
        margin-bottom: 5px;
        &:hover {
          text-decoration: underline;
          color: #000;
        }
      }
      .loginForm {
        width: 100%;
        padding: 0 50px;
        .btns {
          display: flex;
          justify-content: center;
          margin-top: 30px;
        }
      }
      // 二维码区域
      .QRContainer {
        width: 200px;
        height: 185px;
        background-color: #eee;
        border-radius: 5px;
        margin: 10px auto;
        .QRTick {
          width: 100%;
          height: 30px;
          line-height: 40px;
          text-align: center;
          font-size: 12px;
          margin-top: 10px;
          &:hover {
            cursor: pointer;
            color: #000;
          }
        }
        .QR {
          width: 120px;
          height: 120px;
          background-color: #fff;
          margin: 0 auto;
          margin-top: 10px;
          img {
            width: 120px;
            height: 120px;
          }
        }
      }
      // loginBtn
      .loginBtn {
        width: 70px;
        height: 40px;
        margin: 0 auto;
        margin-top: 20px;
      }
      .btn {
        position: absolute;
        opacity: 0.99;
        font-size: 20px;
        font-weight: 700;
        width: 50px;
        height: 50px;
        background-image: linear-gradient(#cbcbcb, #1c1c1c);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        &:hover {
          background-image: linear-gradient(#eee, #1c1c1c);
        }
      }
      .user {
        left: 315px;
        bottom: 30px;
      }
      .vx {
        left: 330px;
        bottom: 80px;
      }
    }
  }

  /* 流星雨部分 */
  .night {
    position: relative;
    width: 100%;
    height: 100%;
    transform: rotateZ(45deg);
    .shooting_star {
      position: absolute;
      left: 0;
      top: 0;
      height: 2px;
      background: linear-gradient(-45deg, #afafaf, rgba(0, 0, 255, 0));
      border-radius: 999px;
      filter: drop-shadow(0 0 20px #bfa7d1);
      -webkit-animation: tail 3000ms ease-in-out infinite,
        shooting 3000ms ease-in-out infinite;
      animation: tail 3000ms ease-in-out infinite,
        shooting 3000ms ease-in-out infinite;
    }
    .shooting_star::before {
      content: "";
      position: absolute;
      top: calc(50% - 1px);
      right: 0;
      height: 2px;
      background: linear-gradient(
        -45deg,
        rgba(0, 0, 255, 0),
        #fff,
        rgba(0, 0, 255, 0)
      );
      transform: translateX(50%) rotateZ(45deg);
      border-radius: 100%;
      -webkit-animation: shining 3000ms ease-in-out infinite;
      animation: shining 3000ms ease-in-out infinite;
    }
    .shooting_star::after {
      content: "";
      position: absolute;
      top: calc(50% - 1px);
      right: 0;
      height: 2px;
      background: linear-gradient(
        -45deg,
        rgba(0, 0, 255, 0),
        #b7cee3,
        rgba(0, 0, 255, 0)
      );
      transform: translateX(50%) rotateZ(45deg);
      border-radius: 100%;
      -webkit-animation: shining 3000ms ease-in-out infinite;
      animation: shining 3000ms ease-in-out infinite;
      transform: translateX(50%) rotateZ(-45deg);
    }
    .shooting_star:nth-child(1) {
      top: calc(50% - -27px);
      left: calc(50% - 236px);
      -webkit-animation-delay: 8752ms;
      animation-delay: 8752ms;
    }
    .shooting_star:nth-child(1)::before,
    .shooting_star:nth-child(1)::after {
      -webkit-animation-delay: 8752ms;
      animation-delay: 8752ms;
    }
    .shooting_star:nth-child(2) {
      top: calc(50% - -110px);
      left: calc(50% - 125px);
      -webkit-animation-delay: 6721ms;
      animation-delay: 6721ms;
    }
    .shooting_star:nth-child(2)::before,
    .shooting_star:nth-child(2)::after {
      -webkit-animation-delay: 6721ms;
      animation-delay: 6721ms;
    }
    .shooting_star:nth-child(3) {
      top: calc(50% - -10px);
      left: calc(50% - 283px);
      -webkit-animation-delay: 8915ms;
      animation-delay: 8915ms;
    }
    .shooting_star:nth-child(3)::before,
    .shooting_star:nth-child(3)::after {
      -webkit-animation-delay: 8915ms;
      animation-delay: 8915ms;
    }
    .shooting_star:nth-child(4) {
      top: calc(50% - -150px);
      left: calc(50% - 63px);
      -webkit-animation-delay: 4859ms;
      animation-delay: 4859ms;
    }
    .shooting_star:nth-child(4)::before,
    .shooting_star:nth-child(4)::after {
      -webkit-animation-delay: 4859ms;
      animation-delay: 4859ms;
    }
    .shooting_star:nth-child(5) {
      top: calc(50% - 21px);
      left: calc(50% - 154px);
      -webkit-animation-delay: 8735ms;
      animation-delay: 8735ms;
    }
    .shooting_star:nth-child(5)::before,
    .shooting_star:nth-child(5)::after {
      -webkit-animation-delay: 8735ms;
      animation-delay: 8735ms;
    }
    .shooting_star:nth-child(6) {
      top: calc(50% - -106px);
      left: calc(50% - 130px);
      -webkit-animation-delay: 2949ms;
      animation-delay: 2949ms;
    }
    .shooting_star:nth-child(6)::before,
    .shooting_star:nth-child(6)::after {
      -webkit-animation-delay: 2949ms;
      animation-delay: 2949ms;
    }
    .shooting_star:nth-child(7) {
      top: calc(50% - -90px);
      left: calc(50% - 95px);
      -webkit-animation-delay: 7816ms;
      animation-delay: 7816ms;
    }
    .shooting_star:nth-child(7)::before,
    .shooting_star:nth-child(7)::after {
      -webkit-animation-delay: 7816ms;
      animation-delay: 7816ms;
    }
    .shooting_star:nth-child(8) {
      top: calc(50% - 50px);
      left: calc(50% - 117px);
      -webkit-animation-delay: 3768ms;
      animation-delay: 3768ms;
    }
    .shooting_star:nth-child(8)::before,
    .shooting_star:nth-child(8)::after {
      -webkit-animation-delay: 3768ms;
      animation-delay: 3768ms;
    }
    .shooting_star:nth-child(9) {
      top: calc(50% - 190px);
      left: calc(50% - 158px);
      -webkit-animation-delay: 2620ms;
      animation-delay: 2620ms;
    }
    .shooting_star:nth-child(9)::before,
    .shooting_star:nth-child(9)::after {
      -webkit-animation-delay: 2620ms;
      animation-delay: 2620ms;
    }
    .shooting_star:nth-child(10) {
      top: calc(50% - 6px);
      left: calc(50% - 96px);
      -webkit-animation-delay: 1842ms;
      animation-delay: 1842ms;
    }
    .shooting_star:nth-child(10)::before,
    .shooting_star:nth-child(10)::after {
      -webkit-animation-delay: 1842ms;
      animation-delay: 1842ms;
    }
    .shooting_star:nth-child(11) {
      top: calc(50% - 129px);
      left: calc(50% - 133px);
      -webkit-animation-delay: 41ms;
      animation-delay: 41ms;
    }
    .shooting_star:nth-child(11)::before,
    .shooting_star:nth-child(11)::after {
      -webkit-animation-delay: 41ms;
      animation-delay: 41ms;
    }
    .shooting_star:nth-child(12) {
      top: calc(50% - 22px);
      left: calc(50% - 275px);
      -webkit-animation-delay: 4525ms;
      animation-delay: 4525ms;
    }
    .shooting_star:nth-child(12)::before,
    .shooting_star:nth-child(12)::after {
      -webkit-animation-delay: 4525ms;
      animation-delay: 4525ms;
    }
    .shooting_star:nth-child(13) {
      top: calc(50% - 143px);
      left: calc(50% - 219px);
      -webkit-animation-delay: 3600ms;
      animation-delay: 3600ms;
    }
    .shooting_star:nth-child(13)::before,
    .shooting_star:nth-child(13)::after {
      -webkit-animation-delay: 3600ms;
      animation-delay: 3600ms;
    }
    .shooting_star:nth-child(14) {
      top: calc(50% - -156px);
      left: calc(50% - 142px);
      -webkit-animation-delay: 6309ms;
      animation-delay: 6309ms;
    }
    .shooting_star:nth-child(14)::before,
    .shooting_star:nth-child(14)::after {
      -webkit-animation-delay: 6309ms;
      animation-delay: 6309ms;
    }
    .shooting_star:nth-child(15) {
      top: calc(50% - 100px);
      left: calc(50% - 145px);
      -webkit-animation-delay: 7858ms;
      animation-delay: 7858ms;
    }
    .shooting_star:nth-child(15)::before,
    .shooting_star:nth-child(15)::after {
      -webkit-animation-delay: 7858ms;
      animation-delay: 7858ms;
    }
    .shooting_star:nth-child(16) {
      top: calc(50% - 137px);
      left: calc(50% - 40px);
      -webkit-animation-delay: 2250ms;
      animation-delay: 2250ms;
    }
    .shooting_star:nth-child(16)::before,
    .shooting_star:nth-child(16)::after {
      -webkit-animation-delay: 2250ms;
      animation-delay: 2250ms;
    }
    .shooting_star:nth-child(17) {
      top: calc(50% - 75px);
      left: calc(50% - 107px);
      -webkit-animation-delay: 1351ms;
      animation-delay: 1351ms;
    }
    .shooting_star:nth-child(17)::before,
    .shooting_star:nth-child(17)::after {
      -webkit-animation-delay: 1351ms;
      animation-delay: 1351ms;
    }
    .shooting_star:nth-child(18) {
      top: calc(50% - -108px);
      left: calc(50% - 42px);
      -webkit-animation-delay: 482ms;
      animation-delay: 482ms;
    }
    .shooting_star:nth-child(18)::before,
    .shooting_star:nth-child(18)::after {
      -webkit-animation-delay: 482ms;
      animation-delay: 482ms;
    }
    .shooting_star:nth-child(19) {
      top: calc(50% - 156px);
      left: calc(50% - 159px);
      -webkit-animation-delay: 2341ms;
      animation-delay: 2341ms;
    }
    .shooting_star:nth-child(19)::before,
    .shooting_star:nth-child(19)::after {
      -webkit-animation-delay: 2341ms;
      animation-delay: 2341ms;
    }
    .shooting_star:nth-child(20) {
      top: calc(50% - 152px);
      left: calc(50% - 120px);
      -webkit-animation-delay: 4565ms;
      animation-delay: 4565ms;
    }
    .shooting_star:nth-child(20)::before,
    .shooting_star:nth-child(20)::after {
      -webkit-animation-delay: 4565ms;
      animation-delay: 4565ms;
    }

    @-webkit-keyframes tail {
      0% {
        width: 0;
      }
      30% {
        width: 100px;
      }
      100% {
        width: 0;
      }
    }

    @keyframes tail {
      0% {
        width: 0;
      }
      30% {
        width: 100px;
      }
      100% {
        width: 0;
      }
    }
    @-webkit-keyframes shining {
      0% {
        width: 0;
      }
      50% {
        width: 30px;
      }
      100% {
        width: 0;
      }
    }
    @keyframes shining {
      0% {
        width: 0;
      }
      50% {
        width: 30px;
      }
      100% {
        width: 0;
      }
    }
    @-webkit-keyframes shooting {
      0% {
        transform: translateX(0);
      }
      100% {
        transform: translateX(300px);
      }
    }
    @keyframes shooting {
      0% {
        transform: translateX(0);
      }
      100% {
        transform: translateX(300px);
      }
    }
    @-webkit-keyframes sky {
      0% {
        transform: rotate(45deg);
      }
      100% {
        transform: rotate(405deg);
      }
    }
    @keyframes sky {
      0% {
        transform: rotate(45deg);
      }
      100% {
        transform: rotate(405deg);
      }
    }
  }

  /* element-ui */
  .el-form-item {
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>