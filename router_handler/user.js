// 数据库
const db = require('../db/index')
//  bcryptjs 密码加密 
const bcrypt = require('bcryptjs')
//  jsonwebtoken 生成Token
const jwt = require('jsonwebtoken')
//  config置文件
const config = require('../config')

//  注册新用户的处理函数
exports.regUser = (req, res) =>{
  //  接收表单数据
const userinfo = req.body

  // 判断数据是否合法
// if (!userinfo.username || !userinfo.password) {
//   return res.send({ status: 1, message: '用户名或密码不能为空！' })
// }

//  定义查询语句，查询用户名是否被占用
const sql = `select * from ev_users where username=?`
db.query(sql, userinfo.username, function (err, results) {
  // 执行 SQL 语句失败
  if (err) {
   // return res.send({ status: 1, message: err.message })
   return res.cc(err)
  }
  // 用户名被占用
  if (results.length > 0) {
    // return res.send({ status: 1, message: '用户名被占用，请更换其他用户名！' })
    return res.cc('用户名被占用，请更换其他用户名！')
  }  
  //  调用 bcrypt.hashSync() 对密码进行加密
  userinfo.password = bcrypt.hashSync(userinfo.password, 10)

  //  定义插入新用户的 SQL 语句
  const sqlIns =  'insert into ev_users set ?'
  //  调用 db.query() 执行 SQL 语句
  db.query(sqlIns, userinfo, (err, results) => {
    //  判断 SQL 语句是否执行成功
    // if(err) return res.send({status: 1, message:err.message})
    if(err) return res.cc(err)
    //  判读影响行数是否为 1
    // if(results.affectedRows !== 1) return res.send({status: 1, message: '注册用户失败，请稍后再试'})
    if(results.affectedRows !== 1) return res.cc('注册用户失败，请稍后再试')
    //  注册用户成功
    // res.send({status:0, message: '注册成功'})
    res.cc('注册成功', 0)
  })
})
}




//  登录的处理函数
exports.login = (req, res) =>{
  //  接收表单数据
  const userinfo = req.body
  // 定义 SQL 语句， 根据用户查询用户的信息
  const sql = `select * from ev_users where username=?`
  //  执行查询语句， 根据用户查询用户的信息
  db.query(sql, userinfo.username, (err, results) => {
    //  执行 SQL 语句失败
    if(err) return res.cc(err)
    if(results.length !== 1) return res.cc('账号错误！')
    //  判断密码是否正确
    const compareResult = bcrypt.compareSync(userinfo.password, results[0].password)
    if(!compareResult) return res.cc('密码错误！')
    const user = {...results[0], password:'', user_pic:''}
    console.log(user);
    //  对用户的信息进行加密，生成 Token 字符串
    const tokenStr = jwt.sign(user, config.jwtSecretKey, { expiresIn:config.expiresIn})
    console.log(tokenStr);
    //  调用 res.send() 将 Token 响应给客户端
    res.send({
      status: 0,
      message: '登录成功！',
      token:'Bearer ' + tokenStr
    })
  })
}
