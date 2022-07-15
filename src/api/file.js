import request from '@/utils/request'

export function listFiles(pageInfo, file) {
  return request({
    url: '/files',
    method: 'get',
    params: Object.assign(pageInfo, file)
  })
}
export function addFile(file) {
  return request({
    method: "post",
    url: `files`,
    headers: {
      'Content-Type': "multipart/form-data",
    },
    transformRequest: [function(file){
      return file;
    }],
    data: file,
  })
}
export function deleteFile(fileId) {
  return request({
    url: `files/${fileId}`,
    method: 'delete'
  })
}
