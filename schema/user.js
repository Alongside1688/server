//  导入验证规则的包
const joi = require('joi')

/**
 * string() 表示值必须是字符串
 * alphanum 表示值只能包含 a-zA-Z0-9字符串
 * min(length) 表示最小长度
 * max(length) 表示最大长度
 * required() 表示必填项，不能为 underfind
 * pattern(正则表达式) 表示值必须符合正则表达式规则
 */
//  定义用户名和密码的验证规则
const username = joi.string().alphanum().min(1).max(10).required()
const password = joi.string().pattern(/^[\S]{6,12}$/).required()
// 定义 id, nickname, email 的验证规则
const id = joi.number().integer().min(1).required()
const nickname = joi.any()
const email = joi.string().email()
const user_pic = joi.any()
//  定义验证 avatar 头像的验证规则
const avatar = joi.string().dataUri.require

//  定义验证注册和登录表单数据的规则对象
exports.reg_login_schema = {
  body: {
    username,
    password,
    nickname,
    email,
    user_pic
  }
}
//  验证规则对象-更新用户基本信息
exports.update_userinfo_schema = {
  body: {
    id,
    nickname,
    email
  }
}
//  验证规则对象-更新密码
exports.update_password_schema = {
  body: {
    oldPwd: password,
    newPwd: joi.not(joi.ref('oldPwd')).concat(password)
  }
}
//  验证规则对象-更新头像
exports.update_avatar_schema = {
  body: {
    avatar
  }
}