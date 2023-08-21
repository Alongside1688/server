const db = require('../db/index')
const model = db.model('routes', {})
// 获取行程消息
exports.queryRoutes = (_skip = 0, _limit = 20) => {
    return model.find({}).sort({ 'sequence': -1 }).skip(_skip).limit(_limit)
}
// 写入行程
exports.postRoutes = (data) => {
    const route = model(data)
    return route.save()
}
// 修改行程
exports.updateRoutes = (query, route) => {
    model.updateOne(query, route)
}
// 删除行程
exports.deleteRoute = (query) => {
    model.deleteOne(query)
}