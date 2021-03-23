import {request} from "@/network/request";

// 首页home的网络请求
export function getHomeMultidata() {
  return request({
    url: '/home/multidata'
  })
}
