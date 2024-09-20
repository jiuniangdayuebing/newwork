<template>
  <div class="loginBody">
    <div
      style="
          width: 98%;
          text-align: center;
          color: white;
          padding: 8vh 100px 0 0;
          -webkit-text-stroke:1px black;
          font-size: 3vh;
      "
      >
        <h1>欢迎访问用户管理系统</h1>
    </div>
    <div class="loginDiv">
      <div class="login-content">
        <h1 class="login-title">登录系统</h1>
        <el-form :model="form" ref="loginForm" :rules="rules" style="padding: 30px;">
          <el-form-item label="账号" required prop="no">
            <el-input v-model="form.no" />
          </el-form-item>
          <el-form-item label="密码" required prop="password" >
            <el-input v-model="form.password" type="password" show-password/>
          </el-form-item>
          <el-form-item>
            <div style="display: flex;justify-content: space-evenly;width: 100%;">
              <el-button type="primary" @click="submitForm(loginForm)">
                登录
              </el-button>
              <el-button @click="resetForm(loginForm)">重置</el-button>
            </div>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { reactive,ref } from 'vue'
  import { ElMessage } from 'element-plus'
  import router from "@/router";

const form = reactive({
  no: '',
  password: '',
})

// 获取loginForm的实例
const loginForm = ref()

// 定义校验函数
const submitForm = async (formEl)=>{
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      if(form.no==="admin"&&form.password==="123456"){
        console.log('submit!')
        sessionStorage.setItem(
          "CurUser",
          JSON.stringify(form.no)
        );
        ElMessage({
          showClose: true,
          message: "登陆成功",
          type: 'success'
        })
        router.replace("/Index");
      }else{
        ElMessage({
          showClose: true,
          message: "账号密码错误",
          type: 'error'
        })
      }
    } else {
      console.log('error submit!', fields)
    }
  })
}
// 表单校验规则(只要指定prop和添加required即可校验 但要自定义校验需要rules)
const rules = reactive({
  no: [
      { required: true, message: "请输入账号", trigger: "blur" },
  ],
  password: [
      { required: true, message: "请输密码", trigger: "blur" },
  ],
})

// 重置表单
const resetForm = (formEl) => {
  if (!formEl) return
  formEl.resetFields()
}

</script>

<style scoped>
html,
body {
    overflow-x: hidden;
}

.loginBody {
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: #B3C0D1;
    background-size: 100% 100%;

    overflow-x: hidden;
}
.loginDiv {
    position: absolute;
    top: 50%;
    left: 50%;
    margin-top: -200px;
    margin-left: -250px;
    width: 450px;
    height: 330px;
    background: #fff;
    border-radius: 5%;
    opacity: 0.9;
}
.login-title {
    margin: 20px 0;
    text-align: center;
}
.login-content {
    width: 400px;
    height: 250px;
    position: absolute;
    top: 25px;
    left: 25px;
}
</style>