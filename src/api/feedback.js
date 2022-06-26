import request from '@/utils/request'

export function listFeedbacks(pageInfo, feedback) {
  return request({
    url: '/feedbacks',
    method: 'get',
    params: Object.assign(pageInfo, feedback)
  })
}

export function updateFeedback(feedback) {
  return request({
    url: '/feedbacks',
    method: 'patch',
    data: feedback
  })
}
export function deleteFeedback(feedbackName) {
  return request({
    url: `users/${feedbackName}`,
    method: 'delete'
  })
}
