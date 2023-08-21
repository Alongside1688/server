const { queryRoutes, postRoutes, deleteRoute, updateRoutes } = require('../../db_handle/route')
exports.getRoutes = async (req, res) => {
    const results = await queryRoutes()
    res.send({
        status: 0,
        data: results
    })
}

exports.addRoute = async (req, res) => {
    let data = req.body
    const results = await postRoutes(data)
    res.send({
        status: 0,
        message: results
    })
}

