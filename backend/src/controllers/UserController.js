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
            const purchaseID = req.body.purchaseID;
            console.log(pagesNumber, purchaseID);
            const id = req.session.user.id;
            if(!pagesNumber || !id) {
                return res.status(400).json({message: 'Yêu cầu không hợp lệ'});
            }
            await PuchaseOrderService.createPurchaseOrder(pagesNumber, id, purchaseID);
            await PuchaseOrderService.updateStudentPages(pagesNumber, id);
            res.json({message: 'Mua thành công!'});
        }
        catch(err){
            if(err.message === 'Mã đơn mua đã tồn tại') {
                return res.status(400).json({message: err.message});
            }
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
    
    studentHomepage = async (req, res) => {
        try{
            if(!req.session.user) {
                return res.status(401).json({message: 'Chưa xác thực thông tin người dùng'});
            }
            const id = req.session.user.id;
            try {
                const result = await UserService.studentHomepage(id);
                return res.status(200).send(result);
            } catch(err) {
                // return res.status(200).json({status: false, error: err});
                return res.status(200).json({status: false, error: 'Lỗi cơ sở dữ liệu'});
            }
        }
        catch(err){
            res.status(500).json({message: 'Lỗi server'});
        }
    }

    history_buying = async (req, res) => {
        try {
            const result = await UserService.history_buying(req);
            return res.status(200).send(result);
        } catch(err) {
            return res.status(200).json({status: false, error: err});
        }
    }
}

module.exports = new UserController