const { message } = require('antd');
const UserService = require('../services/UserService')
const PuchaseOrderService = require('../services/PurchaseOrderService')
class UserController {
    UserInfo = async (req, res) => {
        try {
            if (!req.session.user) {
                return res.status(401).json({ message: 'Chưa xác thực thông tin người dùng' });
            }
            const id = req.session.user.id;
            if (!id) {
                return res.status(400).json({ message: 'Yêu cầu không hợp lệ' });
            }
            let result = await UserService.getUserById(id);
            delete result.password;
            res.json(result);
        } catch (err) {
            res.status(500).json({ message: 'Lỗi server' });
        }
    }
    getDocumentAndPrinterInfo = async (req, res) => {
        try {
            if (!req.session.user) {
                return res.status(401).json({ message: 'Chưa xác thực thông tin người dùng' });
            }
            const result = await UserService.fetchDocumentAndPrinterInfo();
            res.json(result);
        }
        catch (err) {
            res.status(500).json({ message: err.message });
        }
    }
    getPrintOrder = async(req, res) => {
        try{
            if (!req.session.user) {
                return res.status(401).json({ message: 'Chưa xác thực thông tin người dùng' });
            }          
            const id = req.session.user.id;
            const result = await UserService.getPrintOrder(id);
            res.json(result);
        }
        catch(err){
            res.status(500).json({ message: err.message });
        }
    }
    getNoPagesEachDay = async(req, res) => {
        try{
            if (!req.session.user) {
                return res.status(401).json({ message: 'Chưa xác thực thông tin người dùng' });
            }          
            const id = req.session.user.id;
            const result = await UserService.NoPagesEachDay(id);
            res.json(result);
        }
        catch(err){
            res.status(500).json({ message: err.message });
        }
    }
    Buy = async(req, res) => {
        try{
            if(!req.session.user) {
                return res.status(401).json({message: 'Chưa xác thực thông tin người dùng'});
            }
            const pagesNumber = req.body.pagesNumber;
            const id = req.session.user.id;
            if(!pagesNumber || !id) {
                return res.status(400).json({message: 'Yêu cầu không hợp lệ'});
            }
            await PuchaseOrderService.createPurchaseOrder(pagesNumber, id);
            await PuchaseOrderService.updateStudentPages(pagesNumber, id);
            res.json({message: 'Mua thành công!'});
        }
        catch(err){
            res.status(500).json({message: 'Lỗi server'});
        }
    }
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