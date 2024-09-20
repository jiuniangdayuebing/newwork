<template>
  <div class="view-demo">
      <el-card class="card-border-radius ma-1">
          <!-- 上方新增学生区域 -->
          <el-button
          type="primary"
          class="addbtn"
          @click="newRoleVisible=true" >
              <template #icon>
                  <Plus />
              </template>
              <template #default>新增学生</template>
          </el-button>
          <!-- 上方查询学生区域 -->
          <div class="inputArea">
              <el-input v-model="keyWords.k" placeholder="请输入学生姓名" clearable :style="{ width: '200px'}"  @clear="clearFn"/>
              <el-button
              type="primary"
              @click="searchStudent" >
                  <el-icon><Search /></el-icon>
                  搜索</el-button>
          </div>
      </el-card>
      <el-card class="card-border-radius">
          <el-table
          :style="{ margin: '20px 0px' }"
          :columns="columns"
          :data="tableData"
          :scrollbar="true"
          table-layout-fixed
          size="small"
          max-height="80%"
          :pagination="{pageSize:10}">
              <el-table-column
                  label="姓名"
                      prop="roleName"
                      align="center">
                  </el-table-column>
                  <el-table-column
                  label="角色"
                  prop="roleLevel"
                      align="center">
              </el-table-column>
                  <el-table-column
                  label="学号"
                  prop="roleNum"
                      align="center">
                  </el-table-column>
                  <el-table-column
                  label="电话号码"
                  prop="rolePhone"
                      align="center">
              </el-table-column>
              <el-table-column
                  label="创建时间"
                  prop="createTime"
                      align="center">
              </el-table-column>
              <el-table-column
                  label="操作"
                  align="center"
                  >
                  <template #default="scope">
                      <el-button
                      size="small"
                      type="primary"
                      @click="updateStudent(scope.row)"
                      >
                      <template #icon><el-icon><Edit /></el-icon></template>
                      编辑
                  </el-button>
                  <el-button
                      size="small"
                      type="danger"
                      @click="delRole(scope.row)"
                      :disabled="scope.row.id=='0'"
                      >
                      <template #icon><el-icon><DeleteFilled /></el-icon></template>
                      删除
                  </el-button>
                  </template>
              </el-table-column>
          </el-table>
      </el-card>
      <!-- 新增学生信息弹框 -->
      <el-dialog
              v-model="newRoleVisible"
              title="新增学生信息"
              :style="{width:'450px'}"
              align-center
              @close="clearForm">
      <el-form :model="form" class="form">
          <el-form-item label="学生姓名" :label-width="formLabelWidth">
              <el-input
              v-model="form.roleName"
              :style="{ width: '300px'}"
              placeholder="请输入学生姓名"
              ></el-input>
          </el-form-item>
          <el-form-item label="学生学号" :label-width="formLabelWidth">
              <el-input
              v-model.number="form.roleNum"
              :style="{ width: '300px'}"
              placeholder="学号不超过11位"
              ></el-input>
          </el-form-item>
          <el-form-item label="学生电话" :label-width="formLabelWidth">
              <el-input
              v-model.number="form.rolePhone"
              :style="{ width: '300px'}"
              placeholder="请输入学生电话号码"
              ></el-input>
          </el-form-item>
          <el-form-item label="密码" :label-width="formLabelWidth">
              <el-input
              v-model.number="form.rolePassword"
              :style="{ width: '300px'}"
              placeholder="请输入账号密码"
              ></el-input>
          </el-form-item>
          <el-form-item label="角色" :label-width="formLabelWidth">
              <el-input
              v-model.number="form.roleLevel"
              :style="{ width: '300px'}"
              placeholder="请输入账号角色"
              ></el-input>
          </el-form-item>
      </el-form>
      <template #footer>
          <span class="dialog-footer">
              <el-button type="primary" @click="addRole">提交</el-button>
              <el-button @click="newRoleVisible = false">取消</el-button>
          </span>
      </template>
      </el-dialog>
      <!-- 修改学生信息弹框 -->
      <el-dialog
              v-model="updateRoleVisible"
              title="修改学生信息"
              :style="{width:'450px'}"
              align-center
              @close="clearForm1">
      <el-form :model="updateform" class="form">
          <el-form-item label="学生姓名" :label-width="formLabelWidth">
              <el-input
              v-model="updateform.roleName"
              :style="{ width: '300px'}"
              placeholder="请输入学生姓名"
              ></el-input>
          </el-form-item>
          <el-form-item label="学生学号" :label-width="formLabelWidth">
              <el-input
              v-model.number="updateform.roleNum"
              :style="{ width: '300px'}"
              placeholder="学号不超过11位"
              ></el-input>
          </el-form-item>
          <el-form-item label="学生电话" :label-width="formLabelWidth">
              <el-input
              v-model.number="updateform.rolePhone"
              :style="{ width: '300px'}"
              placeholder="请输入学生电话号码"
              ></el-input>
          </el-form-item>
          <el-form-item label="密码" :label-width="formLabelWidth">
              <el-input
              v-model.number="updateform.rolePassword"
              :style="{ width: '300px'}"
              placeholder="请输入账号密码"
              ></el-input>
          </el-form-item>
          <el-form-item label="角色" :label-width="formLabelWidth">
              <el-input
              v-model.number="updateform.roleLevel"
              :style="{ width: '300px'}"
              placeholder="请输入账号角色"
              ></el-input>
          </el-form-item>
      </el-form>
      <template #footer>
          <span class="dialog-footer">
              <el-button type="primary" @click="updateRole">提交</el-button>
              <el-button @click="updateRoleVisible = false">取消</el-button>
          </span>
      </template>
      </el-dialog>
  </div>
</template>

<script setup>
import axios from "axios";
import dayjs from 'dayjs'
import { onBeforeMount, onMounted, reactive, ref,unref } from "vue";

 
const columns = [
  {
      title: "姓名",
      dataIndex: "roleName",
  },
  {
      title: "学号",
      dataIndex: "roleNum",
  },
  {
      title: "电话号码",
      dataIndex: "rolePhone",
  },
  {
      title: "角色",
      dataIndex: "roleLevel",
  },
  {
      title: "注册时间",
      dataIndex: "createTime",
  }
]
//学生信息数据
const tableData = ref([]);
const tableDataSearchBefore = ref([]);
// 空的中间变量数组
// const itemData = ref([]);
//新增学生信息弹框
var newRoleVisible = ref(false)
// 修改学生信息弹框
var updateRoleVisible = ref(false)
// 修改学生的id
var stuid = 0
//label最大长度,作用是对齐
const formLabelWidth = '100px'
//新增学生信息弹框里的表单
const form = reactive({
  id:6,
  roleName: "",
  roleNum: "",
  rolePhone: "",
  roleLevel: ""
})
// 修改学生信息弹框里的表单
const updateform = reactive({
  id:0,
  roleName: "",
  roleNum: "",
  rolePhone: "",
  roleLevel: ""
})
// 搜索的关键词
const keyWords = reactive({
  k:""
})
//获取学生信息--发送axios请求
const getData = () => {
  axios.get('/data/index').then((res) => {
      tableData.value = [{
        "id":0,
        "roleName":"admin",
        "roleNum":"0000000001",
        "rolePhone":"188888888",
        "roleLevel":"管理员"
      },...res.data.data]
      tableDataSearchBefore.value = tableData
  })
}
// 新增学生信息
const addRole = () => {
  // id自增
  form.id++
  form.createTime = dayjs(new Date()).format('YYYY-MM-DD HH:mm:ss')
  // 一个对象
  const item = JSON.parse(JSON.stringify(form))
  const res = axios.post('/add',{data: item})
  tableData.value.push(item)
  // 关闭弹框
  newRoleVisible.value = false
}
// 删除学生信息
const delRole = (row) => {
  // 获取改行的ids
  const id = row.id
  // 在本地存储的数据进行删除
  tableData.value = tableData.value.filter((item) => {
      return item.id != id
  })
}
// 搜索学生信息
const searchStudent = () => {
    if(!keyWords.k){
         return
    }
    // 
    // tableDataSearchBefore.value为tableData 注意这里有两个value.value
  let itemData = tableDataSearchBefore.value.value.filter((p) => {
          return p.roleName.indexOf(keyWords.k) !== -1
      })
      tableDataSearchBefore.value = tableData.value
      // 深拷贝，将搜索的来的东西转为数组itemData
      tableData.value = itemData
      
}
const clearFn = ()=>{
    tableData.value = tableDataSearchBefore.value
    tableDataSearchBefore.value = tableData

}
// 修改学生信息弹框出现
const updateStudent = (row) => {
  // 弹框出现
  updateRoleVisible.value = true
  // 将该学生的id记住
  stuid = row.id
}
//修改学生信息
const updateRole = () =>{
  // 将该学生的id给新的表单id
  updateform.id = stuid
  updateform.createTime = dayjs(new Date()).format('YYYY-MM-DD HH:mm:ss')
  // 将输入的更新学生的信息转化为对象
  const item1 =  JSON.parse(JSON.stringify(updateform))
  // 找到该学生的下标
  var index = tableData.value.findIndex((item) => {
      return item.id === item1.id
  })
  // 删除，再插入
  tableData.value.splice(index,1,item1)
  // 清空输入的内容
  clearForm1()
  // 关闭修改信息的弹框
  updateRoleVisible.value = false
}
// 关闭新增学生弹框时清空form信息
const clearForm = () => {
  form.roleName = ''
  form.roleNum = ''
  form.rolePhone = ''
}
// 关闭修改学生弹框时清空form信息
const clearForm1 = () => {
  updateform.roleName = ''
  updateform.roleNum = ''
  updateform.rolePhone = ''
}
// 页面挂载之前获取学生信息
onBeforeMount(() => {
  getData();
})



</script>

<style scoped>
.addbtn{
display: flex;
flex-direction: row;
float: left;
display: inline-block;
justify-content: space-around;
}
.inputArea{
  display: flex;
  display: inline-block;
  float: right;
  width: 300px;
  margin-bottom: 18px;
}

.ma-1{
  margin: 10px 0;
  border-radius: 10px;
}
.form{
  margin: auto;
  margin: 0 auto;
}
/* 所有卡片的配置 */
.card-border-radius {
border-radius: var(--border-radius-large) !important;
}
.card-border-radius:hover{
box-shadow: 0px 0px 10px #ddd;
}
</style>