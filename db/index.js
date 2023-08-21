//  导入 mysql 模块
// const mysql = require('mysql')
//  创建数据库连接对象
// const db = mysql.createPool({
//   host:'127.0.0.1',
//   user:'root',
//   password: '123456',
//   database: 'alongside'
// })

// MongoDB 非关系型数据库
const mongoose = require('mongoose');
const db = mongoose.createConnection('mongodb://127.0.0.1:27017/alongside')
module.exports = db
