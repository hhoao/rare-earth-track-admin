export const checkEmail = (rule, value, callback) => {
  if (!value || value === '') {
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
  if (!value || value === '') {
    callback(new Error('请输入手机号'))
  } else {
    const regMobile = /^(0|86|17951)?(13\d|15[0-3,5-9]|17[678]|18\d)\d{8}$/
    if (regMobile.test(value)) {
      callback()
    }
    callback(new Error('请输入合法的手机号'))
  }
}

export const checkUsername = (rule, value, callback) => {
  if (!value || value === '') {
    callback(new Error('请输入用户名'))
  } else if (value.length < 3) {
    callback(new Error('用户名长度必须大于4'))
  }else {
    callback()
  }
}
export const checkEmptyOption= (rule, value, callback) => {
  if (!value || value === '') {
    callback(new Error('请选择一项选项'))
  } else{
    callback()
  }
}
export const checkNotEmpty = (rule, value, callback) => {
  if (!value || value === '') {
    callback(new Error('请选择一项选项'))
  } else{
    callback()
  }
}
export const checkPassword = (rule, value, callback) => {
  if (!value || value === '') {
    callback(new Error('请输入密码'))
  } else if (value.length < 6 || value.length > 15) {
    callback(new Error('密码长度在 3 到 15 个字符'))
  }else{
    callback()
  }
}

