const db = require('../db/index')
const model = db.model('user', {})
// 获取用户列表
exports.queryUsers = (_skip, _limit) => {
    return model.find({}).skip(_skip).limit(_limit)
}