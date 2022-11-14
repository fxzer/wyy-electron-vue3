import { createApp } from 'vue'
import App from './App.vue'
import './samples/node-api'
import router from "./router"
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
// import http from './network/request'
const app = createApp(App)
// app.config.globalProperties.http = http
  app.use(ElementPlus)
  app.use(router)
  app.mount('#app').$nextTick(() => {
    postMessage({ payload: 'removeLoading' }, '*')
  })
