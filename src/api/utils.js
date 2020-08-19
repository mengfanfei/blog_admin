import request from '@/utils/request'

// 上传图片
export function uploadImg(formdata) {
  return request({
    url: '/utils/uploadImg',
    method: 'post',
    data: formdata,
    headers: { 'Content-Type': 'multipart/form-data' }
  })
}
