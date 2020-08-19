import request from '@/utils/request'

/**
 * 创建博客
 * @param {Object} data 创建博客的data
 */
export function createBlog(data) {
  return request({
    url: '/blogs/createBlog',
    method: 'post',
    data
  })
}

/**
 * 获取博客列表
 * @param {number} pageIndex 第几页
 * @param {number} pageSize 多少条
 */
export function getBlogsList({ pageIndex = 1, pageSize = 20 }) {
  return request({
    url: '/blogs/getBlogsList',
    method: 'post',
    data: { pageIndex, pageSize }
  })
}

export function changeRelease({ release, blogId }) {
  return request({
    url: '/blogs/setRelease',
    method: 'patch',
    data: { release, blogId }
  })
}

/**
 * 获取博客详情
 * @param {number} blogId 博客ID
 */
export function getBlogDetail(blogId) {
  return request({
    url: '/blogs/getBlogDetail',
    method: 'post',
    data: { blogId }
  })
}

export function getBlogEdit(blogId) {
  return request({
    url: '/blogs/getBlogEdit',
    method: 'post',
    data: { blogId }
  })
}

export function updateBlog(data) {
  return request({
    url: '/blogs/updateBlog',
    method: 'patch',
    data
  })
}

export function getList(params) {
  console.log('www')
}
