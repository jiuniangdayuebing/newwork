<template>
  <div>
    <Card></Card>
    <div
        style="
            text-align: center;
            padding: 20px 0 0 0;
            margin: 50px;
        "
    >
        
        <h3>当前登录信息</h3>
        <el-descriptions
            title=""
            :column="1"
            border
            style="padding: 20px 0 20px 0"
        >
        <el-descriptions-item>
            <template #label>
                <el-icon><UserFilled /></el-icon>
                            账号
            </template>
            <el-tag type="info">{{ user }}</el-tag>
         </el-descriptions-item>
         <el-descriptions-item>
            <template #label>
                <el-icon><User /></el-icon>
                姓名
            </template>
            <el-tag type="info">{{ user }}</el-tag>
         </el-descriptions-item>
         <el-descriptions-item>
            <template #label>
                <el-icon><Iphone /></el-icon>
                电话
            </template>
            <el-tag type="info">1888888888</el-tag>
         </el-descriptions-item>
         <el-descriptions-item>
            <template #label>
                <el-icon><Location /></el-icon>
                性别
            </template>
            <el-tag
                    disable-transitions
                    ><i
                        :class="'el-icon-male'"
                    ></i>男</el-tag>
         </el-descriptions-item>
         <el-descriptions-item>
            <template #label>
                <el-icon><Tickets /></el-icon>
                角色
            </template>
            <el-tag type="success" disable-transitions>管理员</el-tag>
         </el-descriptions-item>
        </el-descriptions>
        <hr />
        <el-row style="padding: 10px 50px;">
            <el-button
                type="danger"
                @click="logout"
                style=" font-size: 16px;"
                >
                <i class="element-icons el-icon-a-022"></i>
                退出登录
                
                </el-button
            >
        </el-row>
    </div>
  </div>
 
</template>

<script setup>
import { useLogout,useUserRef } from "./hooks/useLog" 
import Card from "./Card.vue"
const user = useUserRef()
const logout = useLogout
</script>

<style scoped>
.el-descriptions {
    width: 90%;

    margin: 0 auto;
    text-align: center;
}
</style>