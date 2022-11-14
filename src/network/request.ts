import axios from 'axios'
import { ElNotification } from 'element-plus'
export default function http(url:string, params:string) {
    const instance = axios.create({
            baseURL: '/api',
            timeout: 30000,
            withCredentials: true,
        })
        // 请求拦截
    instance.interceptors.request.use((config) => {
        return config
    }, error => {
        return error
    })

    // 响应拦截
    instance.interceptors.response.use((config) => {
            return config.data
        }, error => {
            ElNotification({
                type: 'error',
                title: '响应错误!'
            })
            return error
        })
        // 请求
    if (params) {
        return instance.post(url, params)
    } else {
        return instance.get(url)
    }
}