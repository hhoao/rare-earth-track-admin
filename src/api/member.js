import request from '@/utils/request'

export function addMember(newMember) {
  return request({
    url: `/members`,
    method: 'post',
    data: newMember
  })
}

export function updateMember(member) {
  return request({
    url: '/members',
    method: 'patch',
    data: member
  })
}

export function deleteMember(memberId) {
  return request({
    url: `/members/${memberId}`,
    method: 'delete'
  })
}

export function listMember(pageInfo, queryMember) {
  return request({
    url: '/members',
    method: 'get',
    params: Object.assign(pageInfo, queryMember)
  })
}
