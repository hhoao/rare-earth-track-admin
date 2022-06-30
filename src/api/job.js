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

export function listJobAllPermissions(jobName){
  return request({
    url: `/jobs/${jobName}/permissions`,
    method: 'get'
  })
}
export function allocPermissions(jobId, permissionIds){
  return request({
    url: `/jobs/${jobId}/permissions`,
    method: 'post',
    data: permissionIds
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

