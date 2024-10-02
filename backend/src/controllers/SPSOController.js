const { message } = require('antd');
const SPSOService = require('../services/SPSOService')

class SPSOController {
    updateStatus = async (req, res) => {
        try {
            const result = await SPSOService.updateStatus(req.body, req);
            return res.status(200).send(result);
        } catch(err) {
            return res.status(200).json({status: false, error: err});
        }
    }

    student_manager = async (req, res) => {
        try {
            const result = await SPSOService.student_manager(req);
            return res.status(200).send(result);
        } catch(err) {
            return res.status(200).json({status: false, error: err});
        }
    }
}

module.exports = new SPSOController