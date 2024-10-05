const db = require('../config/db');
const UserService = require('./UserService');
class PrintService {
    AcceptFile = async (data) => {
        try {
            const result1 = await UserService.fetchDocumentAndPrinterInfo();
            const acceptedDocument = result1.acceptedDocuments;
            const fileType = data.loai_tep;
            return acceptedDocument.some(doc => doc.loai_tep === fileType);
        }
        catch(err){
            throw err;
        }
    }
    createPrintOrder = async (data, id) => {
        try {
            const ten_tep = data.ten_tep;
            const loai_tep = data.loai_tep;
            const duong_dan = data.duong_dan;
            const so_trang = data.so_trang;
            const ma_tep = String(Date.now());
            await db.execute('INSERT INTO tep (ma_tep, ten_tep, loai_tep, duong_dan, so_trang) VALUES (?, ?, ?, ?, ?)', [ma_tep, ten_tep, loai_tep, duong_dan, so_trang]);
            await db.execute('INSERT INTO so_huu (id, ma_tep) VALUES (?, ?)', [id, ma_tep]);

            const ma_don_in = String(Date.now());
            const ma_may_in = data.ma_may_in;
            const so_ban_in = data.so_ban_in;
            const so_mat = data.so_mat;
            const kich_thuoc = data.kich_thuoc;
            let so_trang_in;
            if(data.dinh_dang_trang_in === "Chỉ trang lẻ"){
                so_trang_in = so_ban_in * Math.ceil(Math.floor(so_trang / 2) / so_mat);
            }
            else if(data.dinh_dang_trang_in === "Chỉ trang chẵn"){
                so_trang_in = so_ban_in * Math.ceil(Math.ceil(so_trang / 2) / so_mat);
            }
            else if(data.dinh_dang_trang_in === "Tất cả"){
                so_trang_in = so_ban_in * Math.ceil(so_trang / so_mat);
            }
            else {
                so_trang_in = so_ban_in * Math.ceil((data.gioi_han_tren - data.gioi_han_duoi) / so_mat);
            }
            console.log(so_trang_in);
            const result = await db.execute('SELECT so_giay_con FROM sinh_vien WHERE id = ?', [id]);
            console.log(result);
            if(result[0][0].so_giay_con < so_trang_in){
                throw new Error('Số trang in vượt quá số giấy còn lại');
            }
            const day = new Date();
            const tg_bat_dau = day.getFullYear() + '-' + (day.getMonth() + 1) + '-' + day.getDate() + ' ' + day.getHours() + ':' + day.getMinutes() + ':' + day.getSeconds();
            const tg_ket_thuc_date = new Date(day.getTime() + 30 * 60 * 1000);  // Thêm 30 phút
            const tg_ket_thuc = tg_ket_thuc_date.getFullYear() + '-' + (tg_ket_thuc_date.getMonth() + 1) + '-' + tg_ket_thuc_date.getDate() + ' ' + tg_ket_thuc_date.getHours() + ':' + tg_ket_thuc_date.getMinutes() + ':' + tg_ket_thuc_date.getSeconds();
            await db.execute('INSERT INTO don_in (ma_don_in) VALUES (?)', [ma_don_in]);
            await db.execute('INSERT INTO don_in_gom_tep (ma_don_in, ma_tep, so_ban_in, so_mat, kich_thuoc, so_trang_in) VALUES (?, ?, ?, ?, ?, ?)', [ma_don_in, ma_tep, so_ban_in, so_mat, kich_thuoc, so_trang_in]);
            await db.execute('INSERT INTO in_tai_lieu (id, ma_don_in, ma_may_in, tg_bat_dau, tg_ket_thuc) VALUES (?, ?, ?, ?, ?)', [id, ma_don_in, ma_may_in, tg_bat_dau, tg_ket_thuc]);   
            await db.execute('INSERT INTO nhat_ky (uid, noi_dung, thoi_gian) VALUES (?, ?, ?)', [id, `Đã tạo đơn in mã ${ma_don_in}`, tg_bat_dau]);
            await db.execute('UPDATE sinh_vien SET so_giay_con = so_giay_con - ? WHERE id = ?', [so_trang_in, id]);
        } catch (err) {
            throw err;
        }
    }
}

module.exports = new PrintService;