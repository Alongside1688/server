const { queryCategory } = require('../../db_handle/category')
exports.getCategory = async (req, res) => {
    const results = await queryCategory()
    res.send({
        status: 0,
        data: results[0]
    })
}