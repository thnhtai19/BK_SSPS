const db = require('../config/db');
const support = require('../services/support');
class PurchaseService {
    createPurchaseOrder = async (pages, id) => {
        try {
            const day = new Date();
            const CurrentTime = support.startTime();
            const formattedDate = day.toISOString().split('T')[0];
            const ma_don_mua = String(Date.now());
            await db.execute('INSERT INTO don_mua (ma_don_mua, thoi_gian, so_trang, id) VALUES (?, ?, ?, ?)', [ma_don_mua, formattedDate, pages, id]);
            await db.execute('INSERT INTO nhat_ky (uid, noi_dung, thoi_gian) VALUES (?, ?, ?)', [id, `Đã tạo đơn mua giấy`, CurrentTime]);
        } catch (err) {
            throw err;
        }
    }

    updateStudentPages = async (pagesNumber, id) => {
        try {
            const [result] = await db.execute('UPDATE sinh_vien SET so_giay_con = so_giay_con + ? WHERE id = ?', [pagesNumber, id]);
            return result;
        } catch (err) {
            throw err;
        }
    }
}

module.exports = new PurchaseService;