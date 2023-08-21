const { queryUsers } = require('../../db_handle/user')
exports.getUsers = async (req, res) => {
    const results = await queryUsers()
    res.send({
        status: 0,
        data: results
    })
}