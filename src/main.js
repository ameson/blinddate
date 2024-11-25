import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// Vant UI
import Vant from 'vant'
import 'vant/lib/index.css'



// 创建应用实例
const app = createApp(App)

// 使用插件
app.use(store)
app.use(router)
app.use(Vant)

// 挂载应用
app.mount('#app')

// 路由切换时进行百度统计
router.afterEach((to) => {
  if (typeof _hmt !== 'undefined') {
    _hmt.push(['_trackPageview', to.fullPath]);
  }
})
