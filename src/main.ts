import { createApp } from 'vue'
import App from './App.vue'
import './samples/node-api'
import router from "./router"
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import registerComponents from './utils/globalRegister'
const app = createApp(App)
registerComponents(app)
  app.use(ElementPlus)
  app.use(router)
  app.mount('#app').$nextTick(() => {
    postMessage({ payload: 'removeLoading' }, '*')
  })
