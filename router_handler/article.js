const db = require('../db/index')
//  文章的处理模块
exports.getArticles = (req, res) => {
  const sql = "select * from ev_articles"
  db.query(sql, (err, results) => {
    // 执行失败
    if (err) return res.cc(err)
    for (let i = 0; i < results.length; i++) {
      results[i].cover = JSON.parse(results[i].cover)

    }
    res.send({
      status: 0,
      message: '获取文章列表成功！',
      data: results
    })
  })
}
exports.addArticle = (req, res) => {
  res.send('akdkks')
}