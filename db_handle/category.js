const db = require('../db/index')

const model = db.model('categories', {})
// 获取category
exports.queryCategory = () => {
    return model.find({})
}
