const db = require('../config/db');
const UserService = require('./UserService');
class PrintService {
    AcceptFile = async (data) => {
        try {
            const acceptedDocument = await UserService.fetchAcceptedDocument();
            const fileType = data.loai_tep;
            return acceptedDocument.some(doc => doc.loai_tep === fileType);
        }
        catch(err){
            throw err;
        }
    }
    createPrintOrder = async (data, id) => {
        try {
            const ma_don_in = String(Date.now());
            const ma_may_in = data.ma_may_in;
            const ma_tep = data.ma_tep;
            const so_ban_in = data.so_ban_in;
            const so_mat = data.so_mat;
            const kich_thuoc = data.kich_thuoc;
            const day = new Date();
            const tg_bat_dau = day.getFullYear() + '-' + (day.getMonth() + 1) + '-' + day.getDate() + ' ' + day.getHours() + ':' + day.getMinutes() + ':' + day.getSeconds();
            const tg_ket_thuc_date = new Date(day.getTime() + 30 * 60 * 1000);  // Thêm 30 phút
            const tg_ket_thuc = tg_ket_thuc_date.getFullYear() + '-' + (tg_ket_thuc_date.getMonth() + 1) + '-' + tg_ket_thuc_date.getDate() + ' ' + tg_ket_thuc_date.getHours() + ':' + tg_ket_thuc_date.getMinutes() + ':' + tg_ket_thuc_date.getSeconds();
            await db.execute('INSERT INTO don_in (ma_don_in) VALUES (?)', [ma_don_in]);
            await db.execute('INSERT INTO don_in_gom_tep (ma_don_in, ma_tep, so_ban_in, so_mat, kich_thuoc) VALUES (?, ?, ?, ?, ?)', [ma_don_in, ma_tep, so_ban_in, so_mat, kich_thuoc]);
            await db.execute('INSERT INTO in_tai_lieu (id, ma_don_in, ma_may_in, tg_bat_dau, tg_ket_thuc) VALUES (?, ?, ?, ?, ?)', [id, ma_don_in, ma_may_in, tg_bat_dau, tg_ket_thuc]);   
            await db.execute('INSERT INTO nhat_ky (uid, noi_dung, thoi_gian) VALUES (?, ?, ?)', [id, `Đã tạo đơn in mã ${ma_don_in}`, tg_bat_dau]);
        } catch (err) {
            throw err;
        }
    }
}

module.exports = new PrintService;