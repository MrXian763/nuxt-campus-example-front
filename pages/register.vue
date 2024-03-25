<!-- 注册页面 -->
<template>
  <div class="register">
    <el-form ref="registerForm" :model="registerForm" :rules="registerRules" class="register-form">
      <h3 class="title">高校学习交流网</h3>
      <!-- 账号输入表单 -->
      <el-form-item prop="username">
        <el-input v-model="registerForm.username" type="text" auto-complete="off" placeholder="账号">
          <!-- 图标 -->
          <svg-icon slot="prefix" icon-class="user" class="el-input__icon input-icon"/>
        </el-input>
      </el-form-item>
      <!-- 密码输入表单 -->
      <el-form-item prop="password">
        <el-input v-model="registerForm.password" type="password" auto-complete="off" placeholder="密码" @keyup.enter.native="handleRegister">
          <!-- 图标 -->
          <svg-icon slot="prefix" icon-class="password" class="el-input__icon input-icon"/>
        </el-input>
      </el-form-item>
      <!-- 确认密码输入表单 -->
      <el-form-item prop="confirmPassword">
        <el-input v-model="registerForm.confirmPassword" type="password" auto-complete="off" placeholder="确认密码" @keyup.enter.native="handleRegister">
          <!-- 图标 -->
          <svg-icon slot="prefix" icon-class="password" class="el-input__icon input-icon"/>
        </el-input>
      </el-form-item>
      <!--验证码输入框-->
      <el-form-item prop="code" v-if="captchaEnabled">
        <el-input v-model="registerForm.code" auto-complete="off" placeholder="验证码" style="width: 63%" @keyup.enter.native="handleRegister">
          <!-- 图标 -->
          <svg-icon slot="prefix" icon-class="validCode" class="el-input__icon input-icon"/>
        </el-input>
        <!-- 验证码 -->
        <div class="register-code">
          <img :src="codeUrl" @click="getCode" class="register-code-img" />
        </div>
      </el-form-item>

      <el-form-item style="width: 100%">
        <!-- 注册按钮 -->
        <el-button :loading="loading" size="medium" type="primary" style="width: 100%" @click.native.prevent="handleRegister">
          <span v-if="!loading">注 册</span>
          <span v-else>注 册 中...</span>
        </el-button>
        <!-- 跳转到登录页面 -->
        <div style="float: right">
          <router-link class="link-type" :to="'/userlogin'">登录</router-link>
        </div>
      </el-form-item>
    </el-form>
    <!-- 底部信息 -->
    <div class="el-register-footer">
      <span>版权所有 © 2024 gdlgxy.edu 保留所有权利</span>
    </div>
  </div>
</template>
<script>
import { getCodeImg, register, checkUserNameUnique } from "@/api/login";

export default {
  name: "Register",
  data() {
    // 校验两次输入的密码是否一致
    const equalToPassword = (rule, value, callback) => {
      if (this.registerForm.password !== value) {
        callback(new Error("两次输入的密码不一致")); // 验证失败
      } else {
        callback(); // 验证通过
      }
    };
    //判断用户名是否存在
    const checkUserName = (rule, value, callback) => {
      // 向后端发送请求，校验数据
      checkUserNameUnique(value)
        .then((response) => {
          // 返回 true 说明用户名唯一
          if (response.data !== true) {
            callback(new Error("用户名已经存在")); // 验证失败
            return;
          } else {
            callback(); // 验证通过
          }
      });
    };

    return {
      codeUrl: "",
      // 表单信息
      registerForm: {
        username: "", // 用户名
        password: "", // 密码
        confirmPassword: "", // 校验密码
        code: "", // 验证码
        uuid: "",
      },
      // 表单校验规则
      registerRules: {
        username: [
          { required: true, trigger: "blur", message: "账号不能为空" },
          {
            min: 2,
            max: 20,
            message: "用户账号长度范围在 2 和 20 之间",
            trigger: "blur",
          },
          // 校验用户名重复
          { required: true, validator: checkUserName, trigger: "blur" },
        ],
        password: [
          { required: true, trigger: "blur", message: "密码不能为空" },
          {
            min: 5,
            max: 20,
            message: "用户密码长度范围在 5 和 20 之间",
            trigger: "blur",
          },
        ],
        confirmPassword: [
          { required: true, trigger: "blur", message: "确认密码不能为空" },
          // 校验两次输入的密码是否一致
          { required: true, validator: equalToPassword, trigger: "blur" },
        ],
        code: [{ required: true, trigger: "change", message: "验证码必填!" }],
      },
      loading: false,
      captchaEnabled: true,
    };
  },
  created() {
    this.getCode();
  },
  methods: {
    // 获取验证码
    getCode() {
      getCodeImg().then((res) => {
        this.captchaEnabled = res.captchaEnabled === undefined ? true : res.captchaEnabled;
        if (this.captchaEnabled) {
          this.codeUrl = "data:image/gif;base64," + res.img;
          this.registerForm.uuid = res.uuid;
        }
      });
    },
    // 点击注册按钮调用
    handleRegister() {
      this.$refs.registerForm.validate((valid) => {
        if (valid) {
          this.loading = true; // 显示加载中图标
          register(this.registerForm) // 调用注册方法，向后端发送请求（返回 Promise 对象）
            .then((res) => {
              const username = this.registerForm.username; // 账号
              // 注册成功弹窗提示
              this.$alert(
                "<font color='red'>账号 " + username + " 注册成功！请妥善保管</font>",
                "提示",
                {
                  dangerouslyUseHTMLString: true,
                  type: "success",
                }
              )
                // 路由跳转，跳转到登录页面
                .then(() => {
                  this.$router.push("/userlogin");
                })
                .catch(() => {});
            })
            // 捕获异常
            .catch(() => {
              this.loading = false;
              if (this.captchaEnabled) {
                this.getCode();
              }
            });
        }
      });
    },
  },
};
</script>

<style>
.register {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}
.title {
  margin: 0px auto 30px auto;
  text-align: center;
  color: #707070;
}

.register-form {
  border-radius: 6px;
  background: #ffffff;
  width: 400px;
  padding: 25px 25px 5px 25px;
}
.el-input {
  height: 38px;
}
.el-input input {
  height: 38px;
}

.register-code {
  width: 33%;
  height: 38px;
  float: right;
}
.register-code img {
  cursor: pointer;
  vertical-align: middle;
}
.el-register-footer {
  height: 40px;
  line-height: 40px;
  position: fixed;
  bottom: 0;
  width: 100%;
  text-align: center;
  color: #5f5e5e;
  font-family: Arial;
  font-size: 12px;
  letter-spacing: 1px;
}
.register-code-img {
  height: 38px;
}
</style>
