export const checkEmail = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('请输入邮箱'))
  } else {
    const regEmail = /^([a-zA-Z\d_-])+@([a-zA-Z\d])+(\.[a-zA-Z\d_-])+/
    if (regEmail.test(value)) {
      callback()
    }
    callback(new Error('请输入合法的邮箱'))
  }
}
export const checkMobile = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('请输入手机号'))
  } else {
    const regMobile = /^(0|86|17951)?(13\d|15[0-3,5-9]|17[678]|18\d)\d{8}$/
    if (regMobile.test(value)) {
      callback()
    }
    callback(new Error('请输入合法的手机号'))
  }
}

