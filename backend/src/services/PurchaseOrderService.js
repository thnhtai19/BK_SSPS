const db = require('../config/db');
const support = require('../services/support');

class PurchaseService {
    createPurchaseOrder = async (pages, id, purchaseID) => {
        try {
            const day = new Date();
            const CurrentTime = support.startTime(new Date().getMonth() + 1);
            const formattedDate = day.toISOString().split('T')[0];
            await db.execute('INSERT INTO don_mua (ma_don_mua, thoi_gian, so_trang, id) VALUES (?, ?, ?, ?)', [purchaseID, formattedDate, pages, id]);
            await db.execute('INSERT INTO nhat_ky (uid, noi_dung, thoi_gian) VALUES (?, ?, ?)', [id, `Đã tạo đơn mua giấy`, CurrentTime]);
            await db.execute('INSERT INTO thong_bao (uid, thoi_gian, noi_dung) VALUES (?, ?, ?)', [id, CurrentTime, `Đơn ${purchaseID} đã mua thành công`]);
        } catch (err) {
            if (err.code === 'ER_DUP_ENTRY') {
                throw new Error('Mã đơn mua đã tồn tại');
            }
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