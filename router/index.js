const express = require('express')
//  导入验证数据的中间件
const expressJoi = require('@escook/express-joi')
//  导入验证数据的中间件
const { reg_login_schema } = require('../schema/user')
//  导入用户路由处理函数对应的模块
const { regUser, login } = require('../router_handler/user')
const { getRoutes, addRoute } = require('../router_handler/home/route')
const { getCategory } = require('../router_handler/login/category')
const { getTrips } = require('../router_handler/find/trips')
const { getUsers } = require('../router_handler/other/users')

//  创建路由对象
const router = express.Router()
router.get('/category', getCategory)
router.get('/route', getRoutes)
router.post('/route', addRoute)
router.get('/trip', getTrips)
router.get('/user', getUsers)
//  注册用户
router.post('/reguser', expressJoi(reg_login_schema), regUser)
//  登录
router.post('/login', expressJoi(reg_login_schema), login)
//  将路由对象共享出
module.exports = router
// 获取行程
