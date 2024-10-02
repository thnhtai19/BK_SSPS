const { message } = require('antd');
const SPSOService = require('../services/SPSOService')

class SPSOController {
    getAllPrinter = async (req, res) => {
        try {
            if(!req.session.user) {
                return res.status(401).json({message: 'Chưa xác thực thông tin người dùng!'});
            }
            const result = await SPSOService.fetchAllPrinter();
            res.json(result);
        }
        catch (err) {
            res.status(400).json(err);
        }
    }
    UpdatePrinterStatus = async (req, res) => {
        try {
            if(!req.session.user) {
                return res.status(401).json({message: 'Chưa xác thực thông tin người dùng'});
            }
            const { ma_may_in, trang_thai } = req.body;
            await SPSOService.updatePrinterStatus(ma_may_in, trang_thai);
            res.json({ message: 'Cập nhật trạng thái thành công!'});
        }
        catch (err) {
            res.status(400).json(err);
        }
    }
    AddPrinter = async (req, res) => {
        try {
            if(!req.session.user) {
                return res.status(401).json({message: 'Chưa xác thực thông tin người dùng!'});
            }
            const data = req.body;
            await SPSOService.addPrinter(data);
            res.json({ message: 'Thêm máy in thành công!'});
        }
        catch (err) {
            res.status(400).json(err);
        }
    }
    getAllPrintOrder = async (req, res) => {
        try {
            if(!req.session.user) {
                return res.status(401).json({message: 'Chưa xác thực thông tin người dùng!'});
            }
            const result = await SPSOService.fetchAllPrintOrder();
            res.json(result);
        }
        catch (err) {
            res.status(400).json(err);
        }
    }
    UpdatePrintOrderStatus = async (req, res) => {
        try {
            if(!req.session.user) {
                return res.status(401).json({message: 'Chưa xác thực thông tin người dùng!'});
            }
            const { ma_don_in, trang_thai } = req.body;
            await SPSOService.updatePrintOrderStatus(ma_don_in, trang_thai);
            res.json({ message: 'Cập nhật trạng thái thành công!'});
        }
        catch (err) {
            res.status(400).json(err);
        }
    }
  
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
module.exports = new SPSOController;