//  路由处理函数模块
const db = require('../db/index')
const { regUser } = require('./user')

exports.getArtCate = (req, res) => {
  
  //  定义查询语句，查询用户名是否被占用
  const sql = `select * from ev_article_cate where is_delete=0 order by id asc`
  db.query(sql, function (err, results) {
    // 执行 SQL 语句失败
    if (err) return res.cc(err)
    res.send({
      status:0,
      message:'获取文章分类数据成功',
      data:results
    })
  })
}

// 新增文章分类的处理函数
exports.addArticleCates = (req, res) => {
  // 定义查重的 SQL 语句
  const sql = 'select * from ev_article_cate where name=? or alias=?'
  //  执行查重的 SQL 语句失败
  db.query(sql, [req.body.name, req.body.alias], (err, results)=>{
    // 判断是否 SQL 语句执行失败
    if(err) return res.cc(err)
    // 判断数据的 length
    if(results.length === 2) return res.cc('分类名称与分类别名已经被占用，请重新修改再提交')
    if(results.length === 1 && results[0].name === req.body.name && results[0].alias === req.body.alias)
    return res.cc('分类名称与分类别名被占用，请更换后重试')
    if(results.length === 1 && results[0].name === req.body.name) return res.cc('分类名称被占用， 请修改后重试')
    if(results.length ===1 && results[0].alias === req.body.alias) return res.cc('分类别名被占用， 请修改后重试')
    
    //  定义插入文章分类的 SQL 语句
    const sql = 'insert into ev_article_cate set ?'
    //  执行插入文章的 SQL 语句
    db.query(sql, req.body, (err, results) => {
      if(err) return res.cc(err)
      if(results.affectedRows !== 1) return res.cc('新增的文章分类失败！')
      res.cc('新增文章分类成功', 0 )
    })
  })
}

//  删除文章分类的处理函数
exports.deleteCateById = (req, res) => {
  //  定义标记删除的 SQL 语句
  const sql = 'update ev_article_cate set is_delete=1 where id=?'
  db.query(sql, req.params.id, (err, results) => {
    if(err) return res.cc(err)
    if(results.affectedRows !== 1) return res.cc('删除文章分类失败！')
    res.cc('删除文章分类成功！', 0)
  } )
}

//  根据 Id 获取文章分类的处理函数
exports.getArtCateById = (req, res) => {
  //  根据 Id 获取文章分类数据的 SQL 语句
  const sql = 'select * from ev_article_cate where id=?'
  db.query(sql, req.params.id, (err, results) => {
    if(err) return res.cc(err)
    if(results.length !==1 ) return res.cc('获取文章分类数据失败！')
    res.send({
      status: 0,
      message: '获取文章分类数据成功！',
      data: results
    })
  })
 }

 // 根据 Id 更新文章分类的处理函数
 exports.updateCateById = (req, res) => {
    // 定义查询 分类名称 与 分类别名 是否被占用的 SQL 语句
    const sql = `select * from ev_article_cate where Id<>? and (name=? or alias=?)`

    db.query(sql, [req.body.Id, req.body.name, req.body.alias], (err, results) => {
      if(err) return res.cc(err)
      if(results.length === 2 ) return res.cc('分类名称与别名被占用， 请更换后重试')
      if(results.length === 1 && results[0].name === req.body.name && results[0].alias === req.body.alias)
      return res.cc('分类名称与别名被占用，请更换后重试')
      if(results.length === 1 && results[0].name === req.body.name) return res.cc('分类名称被占用，请更换后重试')
      if(results.length === 1 && regUser[0].alias === req.body.alias) return res.cc('分类别名被占用，请更换后重试')
      
      // 定义更新文章分类的 SQL 语句
      const sql = `update ev_article_cate set ? where Id=?`
      db.query(sql, [req.body, req.body.Id], (err, results) => {
        // 执行 SQL 语句失败
        if (err) return res.cc(err)
      
        // SQL 语句执行成功，但是影响行数不等于 1
        if (results.affectedRows !== 1) return res.cc('更新文章分类失败！')
      
        // 更新文章分类成功
        res.cc('更新文章分类成功！', 0)
      })
       
    })
 }