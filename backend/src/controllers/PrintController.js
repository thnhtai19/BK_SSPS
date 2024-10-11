const PrintService = require('../services/PrintService');
class PrintController {
    printConfirm = async(req, res) => {
        try{
            if(!req.session.user){
                return res.status(401).json({message: 'Chưa xác thực thông tin người dùng'});
            }
            const data = req.body;
            const Accept = await PrintService.AcceptFile(data);
            if(!Accept){
                return res.json({message: 'File không hợp lệ!'});
            }
            const id = req.session.user.id;
            await PrintService.createPrintOrder(data, id);
            res.json({message: 'Tạo đơn in thành công!'});
        }
        catch(err){
            res.status(500).json({ message: err.message });
        }
    }
    uploadFile = async(req, res) => {
        try{
            if(!req.session.user){
                return res.status(401).json({message: 'Chưa xác thực thông tin người dùng'});
            }
            if(!req.file){
                return res.json({message: 'Không có file nào được tải lên!'});
            }
            const file = req.file;
            const id = req.session.user.id;
            await PrintService.saveFile(file, id);
            res.json({message: 'Tải file thành công!'});
        }
        catch(err){
            res.status(500).json({ message: err.message });
        }
    }
}

module.exports = new PrintController