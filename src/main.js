import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import router from "@/router";
import axios from 'axios'
import ECharts from 'vue-echarts'
import 'echarts'

import * as ElementPlusIconsVue from '@element-plus/icons-vue'

// 引入mock.js
import './mock/mock.js'

const app = createApp(App)

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.component('ECharts',ECharts) 

app
.use(router)
.use(ElementPlus)
.mount('#app')

//全局挂载axios
app.config.globalProperties.$axios = axios
