import {request} from "@/network/request";

//根据iid请求详情页数据
export function getDetail(iid) {
  return request({
    url: '/detail',
    params: {
      iid
    }
  })
}
