import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// Vant UI
import Vant from 'vant'
import 'vant/lib/index.css'

// 百度统计代码
var _hmt = _hmt || [];
(function() {
  var hm = document.createElement("script");
  hm.src = "https://hm.baidu.com/hm.js?a2e1dda791e37f17ddffc039aca159ec"; // 请替换为你的百度统计跟踪ID
  var s = document.getElementsByTagName("script")[0]; 
  s.parentNode.insertBefore(hm, s);
})();

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
