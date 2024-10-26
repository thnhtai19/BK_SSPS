const db = require('../config/db');
const path = require('path');
const UserService = require('./UserService');
const support = require('./support');

class PrintService {
    AcceptFile = async (data) => {
        try {
            const result1 = await UserService.fetchDocumentAndPrinterInfo();
            const acceptedDocument = result1.acceptedDocuments;
            const ma_tep = data.ma_tep;
            const [result2] = await db.execute('SELECT loai_tep FROM tep WHERE ma_tep = ?', [ma_tep]);
            //console.log(result2);
            const fileType = result2[0].loai_tep;
            return acceptedDocument.some(doc => doc.loai_tep === fileType);
        }
        catch(err){
            throw err;
        }
    }

    createPrintOrder = async (data, id) => {
        try {
            const ma_tep = data.ma_tep;
            // const result0 = await db.execute('SELECT so_trang FROM tep WHERE ma_tep = ?', [ma_tep]);
            // const so_trang = result0[0][0].so_trang;
            const so_trang = data.so_trang;
            const ma_may_in = data.ma_may_in;
            const so_ban_in = data.so_ban_in;
            const so_mat = data.so_mat;
            const kich_thuoc = data.kich_thuoc;
            let so_trang_in;
            if(data.dinh_dang_trang_in === "Chỉ trang lẻ"){
                so_trang_in = so_ban_in * Math.ceil(Math.ceil(so_trang / 2) / so_mat);
            }
            else if(data.dinh_dang_trang_in === "Chỉ trang chẵn"){
                so_trang_in = so_ban_in * Math.ceil(Math.floor(so_trang / 2) / so_mat);
            }
            else if(data.dinh_dang_trang_in === "Tất cả"){
                so_trang_in = so_ban_in * Math.ceil(so_trang / so_mat);
            }
            else if (data.gioi_han_tren && data.gioi_han_duoi) {
                let so_trang_gioi_han = data.gioi_han_tren - data.gioi_han_duoi + 1;
                so_trang_in = so_ban_in * Math.ceil(so_trang_gioi_han / so_mat);
            }
            else {
                so_trang_in = 0;
            }
            const result = await db.execute('SELECT so_giay_con FROM sinh_vien WHERE id = ?', [id]);
            if(result[0][0].so_giay_con < so_trang_in){
                throw new Error('Số trang in vượt quá số giấy còn lại');
            }
            const now = support.getCurrentFormattedDateTime();
            await db.execute(`INSERT INTO don_in () VALUES ()`);
            const [result1] = await db.execute('SELECT LAST_INSERT_ID() AS id');
            const ma_don_in = result1[0].id;
            await db.execute(`  INSERT INTO don_in_gom_tep (ma_don_in, ma_tep, so_ban_in, so_mat, kich_thuoc, so_trang_in) 
                                VALUES (?, ?, ?, ?, ?, ?)`, 
                                [ma_don_in, ma_tep, so_ban_in, so_mat, kich_thuoc, so_trang_in]);
            await db.execute(`  INSERT INTO in_tai_lieu (id, ma_don_in, ma_may_in) VALUES (?, ?, ?)`, 
                                [id, ma_don_in, ma_may_in]);   
            await db.execute(`  INSERT INTO nhat_ky (uid, noi_dung, thoi_gian) VALUES (?, ?, ?)`, 
                                [id, `Đã tạo đơn in mã ${ma_don_in}`, now]);
            await db.execute(`  UPDATE sinh_vien SET so_giay_con = so_giay_con - ? WHERE id = ?`, 
                                [so_trang_in, id]);
            await db.execute('INSERT INTO thong_bao (uid, thoi_gian, noi_dung) VALUES (?, ?, ?)', [id, support.startTime(new Date().getMonth() + 1), `Đơn ${ma_don_in} đang chờ in`]);
        } catch (err) {
            throw err;
        }
    }
    
    saveFile = async (file, id) => {
        try {
            //console.log(file);
            const duong_dan = file.path;
            // console.log('_' + id + '/' + file.path)
            const ten_tep = file.originalname;
            const loai_tep = path.extname(file.originalname).slice(1);
            const so_trang = 50;
            // const ma_tep = String(Date.now());
            // await db.execute('INSERT INTO tep (ma_tep, ten_tep, loai_tep, duong_dan, so_trang) VALUES (?, ?, ?, ?, ?)', [ma_tep, ten_tep, loai_tep, duong_dan, so_trang]);
            // await db.execute('INSERT INTO so_huu (id, ma_tep) VALUES (?, ?)', [id, ma_tep]);
            await db.execute('INSERT INTO tep (ten_tep, loai_tep, duong_dan, so_trang) VALUES (?, ?, ?, ?)', [ten_tep, loai_tep, duong_dan, so_trang]);
            const [result] = await db.execute('SELECT ma_tep FROM tep WHERE duong_dan = ?', [duong_dan]);
            const ma_tep = result[0].ma_tep;
            await db.execute('INSERT INTO so_huu (id, ma_tep) VALUES (?, ?)', [id, ma_tep]);
            return ma_tep;
        }
        catch(err){
            throw err;
        }
    }
}

module.exports = new PrintService;