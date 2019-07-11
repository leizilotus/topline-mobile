/**
 * 用户相关接口模块
 */

import request from '@/utils/request'

export const login = ({ mobile, code }) => {
  return request({
    method: 'POST',
    url: '/app/v1_0/authorizations',
    data: {
      mobile,
      code
    }
  })
}

// export const login = ({ mobile, code }) => request({
//   method: 'POST',
//   url: '/app/v1_0/authorizations',
//   data: {
//     mobile,
//     code
//   }
// })
