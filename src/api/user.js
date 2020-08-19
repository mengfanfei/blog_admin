import request from '@/utils/request'

/**
 * 登录
 * @param {Object} data 登录信息
 */
export function login(data) {
  return request({
    url: '/users/login',
    method: 'post',
    data
  })
}

/**
 * 获取用户信息
 */
export function getInfo() {
  return request({
    url: '/users/getInfo',
    method: 'get'
  })
}

// export function logout() {
//   return request({
//     url: '/vue-admin-template/user/logout',
//     method: 'post'
//   })
// }
