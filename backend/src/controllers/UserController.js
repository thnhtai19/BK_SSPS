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
    getAcceptedDocument = async(req, res) => {
        try{
            if (!req.session.user) {
                return res.status(401).json({ message: 'Chưa xác thực thông tin người dùng' });
            }
            const result = await UserService.fetchAcceptedDocument();
            res.json(result);
        }
        catch(err){
            res.status(500).json({ message: err.message });
        }
    }
    getActivePrinter = async(req, res) => {
        try{
            if (!req.session.user) {
                return res.status(401).json({ message: 'Chưa xác thực thông tin người dùng' });
            }
            const result = await UserService.fetchActivePrinter();
            if(result.length === 0){
                return res.json({message: 'Không có máy in nào hoạt động'});
            }
            res.json(result);
        }
        catch(err){
            res.status(500).json({ message: err.message });
        }
    }
    getPrintOrder = async(req, res) => {
        try{
            if (!req.session.user) {
                return res.status(401).json({ message: 'Chưa xác thực thông tin người dùng' });
            }          
            const id = req.session.user.id;
            const role = req.session.user.role;
            if(role === 'SPSO'){
                const result = await UserService.getAllPrintOrder();
                res.json(result);
            }
            else{
                const result = await UserService.getPrintOrderByStudent(id);
                res.json(result);
            }
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
    uploadDocument = async(req, res) => {
        try{
            if (!req.session.user) {
                return res.status(401).json({ message: 'Chưa xác thực thông tin người dùng' });
            }
            const data = req.body;
            const id = req.session.user.id;
            await UserService.uploadFile(data, id);
            res.json({message: 'Tải lên file thành công!'});
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
}

module.exports = new UserController