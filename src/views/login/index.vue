<template>
  <div class="container_box">
    <div class="container">
      <div class="title_box">
        <span>用户登录</span>
      </div>
      <el-form
        ref="loginForm"
        :model="loginForm"
        :rules="loginFormRules"
        class="login_form"
      >
        <el-form-item prop="username">
          <el-input
            v-model="loginForm.username"
            placeholder="请输入用户名"
          >
            <template #prefix>
              <svg-icon icon-class="user" />
            </template>

          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="loginForm.password"
            type="password"
            placeholder="请输入登录密码"
          >
            <template #prefix>
              <svg-icon icon-class="ums" />
            </template>
          </el-input>
        </el-form-item>
        <el-form-item class="loginButton">
          <el-button type="primary" @click="login" :loading="loading" style="width: 100%">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>

import {setCookie} from '@/utils/support';

export default {
  data() {
    return {
      loading: false,
      //这是登录表单的数据绑定对象
      loginForm: {
        username: this.$route.query.username,
        password: "",
      },
      //这是表单的验证规则对象
      loginFormRules: {
        //验证用户名是否合法
        username: [
          {required: true, message: '请输入用户名', trigger: 'change'},
          {min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'change'}
        ],
        //验证密码是否合法
        password: [
          {required: true, message: '请输入登录密码', trigger: 'change'},
          {min: 3, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur'}
        ],
      }
    }
  },
  //对表单进行预校验
  methods: {
    login() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true;
          this.$store.dispatch('Login', this.loginForm).then(() => {
            this.loading = false;
            setCookie("username", this.loginForm.username, 15);
            setCookie("password", this.loginForm.password, 15);
            this.$router.push({path: '/'})
          }).catch(() => {
            this.loading = false
          })
        } else {
          return false
        }
      })
    },
  }
}
</script>

<style lang="less" scoped>
/* 全局样式表 */
html,
body,
.el-container,
#app{
  height: 100%;
  margin: 0;
  padding: 0;
  min-width: 1519px;
}

/* 登录、注册、修改密码组件的外部容器样式 */
.container_box{
  width: 100%;
  background-color: #d9caac;
  height: 100%;
  min-width: 1000px;
  min-height: 650px;
  position: relative;
}
/* 登录、注册、修改密码组件的内部容器样式 */
.container {
  border-radius: 8px;   /*圆角度数*/
  background: #fff;      /*  背景色  */
  /* 居中设置 */
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}

.el-input__inner{
  border-color: #9f9f9f;
}

.el-badge__content {
  font-size: 7px;
  padding: 0 3px;
  height: 12px;
  line-height: 12px;
}



//-------------
.login_con {
  width: 100%;
  background-color: #d9caac;
  height: 100%;
  min-width: 1000px;
  min-height: 670px;
}

// 头部样式开始
.login_header {
  width: 1000px;
  height: 100px;
  margin: 0 auto;
  background-color: #f5f7fa;
  position: relative;
}

.left_header {
  float: left;
  margin-left: 40px;

  img {
    width: 70px;
    height: 70px;
    position: absolute;
    border-radius: 50%;
    top: 50%;
    transform: translateY(-50%);
    cursor: pointer;
  }

  .title {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    margin-left: 90px;
    font-size: 26px;
    color: #606266;
  }
}

.right_header {
  position: absolute;
  top: 50%;
  right: 0;
  transform: translateY(-50%);
  margin-right: 40px;

  a, span {
    font-size: 14px;
    color: #606266;
  }

  .help {
    color: #ee6868;
  }

  span {
    margin: auto 8px;
  }
}

// 设置a标签样式
.main:hover, .help:hover {
  cursor: pointer;
  color: #409eff;
}

// 登入框+标题样式
.container {
  width: 450px;
  height: 320px;
  box-shadow: -2px 2px 5px #8f8585; /* 设置阴影 */

  .title_box {
    position: absolute;
    left: 50%;
    padding: 20px 0 0 0;
    transform: translateX(-50%);

    span {
      font-size: 24px;
    }
  }
}

// 登录表单区域样式
.login_form {
  width: 65%;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  padding: 70px 0 0 0;
  box-sizing: border-box;
}

//  记住密码  忘记密码
.pwdStyle {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;

  .el-link:hover {
    color: #ee6868;
  }
}
</style>
