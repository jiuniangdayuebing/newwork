import {createRouter,createWebHistory} from 'vue-router'
import Login from '../components/Login.vue'
const routes=[
  {
    path: '/',
    component:Login
  },
  {
    path:'/Index',
    name:'index',
    redirect: { name: 'home' },
    component:()=>import('@/components/Index.vue'),
    children:[
      {
        path:'/Home',
        name:'home',
        meta:{
            title:'首页'
        },
        component:()=>import('@/components/Home.vue')
      },
      {
        path:'/Table',
        name:'table',
        meta:{
            title:'用户管理'
        },
        component:()=>import('@/components/UserTable.vue')
      },
      {
        path:'/Chart',
        name:'chart',
        meta:{
            title:'数据管理'
        },
        component:()=>import('@/components/UserEchart.vue')
      },
    ]
}
]
const router = createRouter({
  routes,
  history: createWebHistory()
})
export default router
