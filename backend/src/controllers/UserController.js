const { message } = require('antd');
const UserService = require('../services/UserService')

class UserController {
    diary = async (req, res) => {
        try {
            const result = await UserService.diary(req);
            return res.status(200).send(result);
        } catch(err) {
            return res.status(200).json({status: false, error: err});
        }
    }
}

module.exports = new UserController