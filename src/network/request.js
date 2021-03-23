import axios from "axios"

export function request(config) {
  //1.创建axios实例
  const instance = axios.create({
    baseURL: 'http://152.136.185.210:7878/api/m5',
    timeout: 5000
  })

  //2.axios拦截器
  //2.1 请求拦截的作用
  instance.interceptors.request.use(config => {
    // console.log(config);
    //一、比如config中的一些信息不符合服务器要求
    //二、比如每次发送网络请求时，都希望在界面中显示一个请求的图标
    //三、某些网络请求（比如登录token），必须携带一些特殊的信息
    return config //拦截后要把信息返回，不然后面接收不到
  }, err => {
    // console.log(err);
  })

  //2.2 响应拦截
  instance.interceptors.response.use(res => {
    // console.log(res);
    return res.data
  }, err => {
    console.log(err);
  })

  //3.发送真正的请求
  return instance(config)
}
