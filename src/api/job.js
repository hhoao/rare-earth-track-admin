import request from '@/utils/request'
export function getJobNameByJobId(jobId) {
  switch (jobId) {
    case 1: return "超级管理员";
    case 2: return "产品管理员"
    case 3: return "工厂管理员";
    case 4: return "运营人员";
  }
}


export function listJobs(pageInfo, job) {
  return request({
    url: '/jobs',
    method: 'get',
    params: Object.assign(pageInfo, job)
  })
}
export function listJobAllMenus(jobName) {
  return request({
    url: `/jobs/${jobName}/menus`,
    method: 'get',
  })
}
export function listJobAllResources(jobName){
  return request({
    url: `/jobs/${jobName}/resources`,
    method: 'get'
  })
}
export function allocResources(jobName, resourceIds){
  return request({
    url: `/jobs/${jobName}/resources`,
    method: 'post',
    data: resourceIds
  })
}
export function addJobMenu(jobName, menuId) {
  return request({
    url: `/jobs/${jobName}/menus/${menuId}`,
    method: 'post',
  })
}
export function allocMenus(jobName, menuIds) {
  return request({
    url: `/jobs/${jobName}/menus`,
    method: 'post',
    data: menuIds
  })
}
export function updateJob(job) {
  return request({
    url: `/jobs/${job.name}`,
    method: 'patch',
    data: job
  })
}
export function addJob(job) {
  return request({
    url: `/jobs`,
    method: 'post',
    data: job
  })
}
export function deleteJob(jobName) {
  return request({
    url: `/jobs/${jobName}`,
    method: 'delete'
  })
}

