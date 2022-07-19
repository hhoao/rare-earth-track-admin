import request from '@/utils/request'

export function listFeedbacks(pageInfo, feedback) {
  return request({
    url: '/feedbacks',
    method: 'get',
    params: Object.assign(pageInfo, feedback)
  })
}

export function addFeedback(feedback) {
  return request({
    url: `/feedbacks`,
    method: 'post',
    data: feedback
  })
}
export function updateFeedback(feedback) {
  return request({
    url: `/feedbacks/${feedback.title}`,
    method: 'patch',
    data: feedback
  })
}
export function deleteFeedback(feedbackName) {
  return request({
    url: `/feedbacks/${feedbackName}`,
    method: 'delete'
  })
}
