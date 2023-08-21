const db = require('../db/index')
const model = db.model('trips', {})
// 获取trips
exports.queryTrips = (_skip = 0, _limit = 10) => {
    return model.find({}).skip(_skip).limit(_limit)
}