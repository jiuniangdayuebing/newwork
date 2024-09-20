<template>
  <el-menu
    background-color="#6495ED"
    text-color="white"
    active-text-color="lightgrey"
    style="height: 100%;"
    default-active="/Home"
    :collapse="isCollapse"
    :collapse-transition="false"
    router
  >
    <el-menu-item >
        <span slot="title" style="font-size: 22px;"><b>用户管理系统</b></span>
    </el-menu-item>
    <el-menu-item index="/Home" style="font-size: 19px;">
        <span slot="title"><b>首页</b></span>
    </el-menu-item>
    <el-menu-item index="/Table" style="font-size: 19px;">
        <span slot="title"><b>用户管理</b></span>
    </el-menu-item>
    <el-menu-item index="/Chart" style="font-size: 19px;">
        <span slot="title"><b>数据管理</b></span>
    </el-menu-item>
    <!--动态获取菜单-->

  </el-menu>
</template>

<script setup>


let props = defineProps({
  //导航栏菜单伸缩
  isCollapse: {
    type: Boolean,
    default: false
  }
})
console.log("props.isCollapse",props.isCollapse)


</script>

<style scoped>

</style>