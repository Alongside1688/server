//  导入 express
const express = require('express')
//  创建服务器实例
const app = express()
//  导入并配置中间件
const cors = require('cors')
//  在路由之前导入解析 Token 的中间件
const expressJWT = require('express-jwt')
// 配置文件
const config = require('./config')
const Joi = require('joi')
// 路由中间件
const useRouter =  require('./router/index')


// 配置cors跨域中间件
app.use(cors())
//  配置解析表单数据的中间件 注意: 这个中间件，只能解析application/x-www-form-urlencoded 格式的表单数据
app.use(express.urlencoded({extended: false}))
//  响应数据的中间件
app.use((req, res, next)=>{
  //  status = 0, 请求成功
  //  status = 1, 请求失败
  res.cc = (err, status = 1) => {
    res.send({
      status,
      mssage: err instanceof Error ? err.message : err
    })
  }
  next()
})
// token验证
app.use(expressJWT({secret: config.jwtSecretKey}).unless({path:[/^\/api/]}))
//使用api用户路由模块
app.use('/api', useRouter)
//  定义错误级别的中间件
app.use((err, req, res, next) => {
  // 验证失败导致错误
  if(err instanceof Joi.ValidationError) return res.cc(err)
  //  身份认证失败后的错误
  if(err.name === 'UnauthorizedError') return res.cc('身份验证失败！')
  //  未知错误
  res.cc(err)
})

//  调用 app.listen 方法，指定端口号并启动web服务器
app.listen(3007, ()=>{
  'api server running at http://127.0.0.1:3007'
})