const { queryTrips } = require('../../db_handle/trip')
exports.getTrips = async (req, res) => {
    const results = await queryTrips()
    res.send({
        status: 0,
        data: results
    })
}