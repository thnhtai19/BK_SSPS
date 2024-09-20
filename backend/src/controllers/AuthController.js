const { message } = require('antd');
const AuthService = require('../services/AuthService')

class AuthController {
    createUser = async (req, res) => {
        try {
            const result = await AuthService.createUser(req.body);
            // console.log(result);
            return res.status(200).send(result);
        } catch(err) {
            return res.status(200).json({status: false, error: err});
        }
    }

    logout = async (req, res) => {
        try {
            const result = await AuthService.logout(req);
            return res.status(200).send(result);
        } catch(err) {
            return res.status(200).json({status: false, error: err});
        };
    }

    login = async (req, res) => {
        try {
            const userinfo = await AuthService.login(req.body, req);
            return res.status(200).send(userinfo);
        } catch(err) {
            return res.status(200).json({status: false, error: err});
        };
    }

    forgotPassword = async (req, res) => {
        try {
            const result = await AuthService.forgotPassword(req.body);
            return res.status(200).send(result);
        }
        catch(err) {
            return res.status(200).json({status: false, error: err});
        }
    }

    changePassword = async (req, res) => {
        try {
            const newUser = await AuthService.changePassword(req.body);
            return res.status(200).send({status: true, newAccount: newUser});
        }
        catch(err) {
            return res.status(200).json({status: false, message: err});
        }
    }
}

module.exports = new AuthController