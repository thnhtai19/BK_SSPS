const PrintService = require('../services/PrintService');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        if (!req.session.user){
            // return res.status(401).json({message: 'Chưa xác thực thông tin người dùng'});
            return cb(new Error('Chưa xác thực thông tin người dùng'), null);

        }
        const id = req.session.user.id;
        const uploadDir = path.join(__dirname, `uploads/_${id}`);
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage: storage });

class PrintController {
    printConfirm = async(req, res) => {
        try{
            if (!req.session.user) {
                return res.status(401).json({message: 'Chưa xác thực thông tin người dùng'});
            }
            const data = req.body;
            const Accept = await PrintService.AcceptFile(data);
            if (!Accept) {
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
    
    uploadFile = (req, res) => {
        upload.single('file')(req, res, async (err) => {
            if (err) {
                return res.json({ message: 'Tải file thành công!' });
            }
            if (!req.file) {
                return res.json({ message: 'Không có file nào được tải lên!' });
            }

            try {
                if (!req.session.user) {
                    return res.status(401).json({message: 'Chưa xác thực thông tin người dùng'});
                }
                if (req.session.user.role != 'SV') {
                    return res.status(403).json({message: 'Không có quyền truy cập!'});
                }
                const file = req.file;
                const id = req.session.user.id;
                const result = await PrintService.saveFile(file, id);
                res.json({ ma_tep: result, message: 'Tải file thành công!' });
            } catch (err) {
                res.status(500).json({ message: err.message });
            }
        });
    }
    
}

module.exports = new PrintController;