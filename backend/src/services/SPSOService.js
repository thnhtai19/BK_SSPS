const db = require('../config/db');
const support = require('./support');
class SPSOService {
    fetchAllPrinter = async () => {
        try {
            const [result, ] = await db.execute(`SELECT * FROM may_in`);
            return result;
        } catch (err) {
            throw err;
        }
    }
    updatePrinterStatus = async (ma_may_in, trang_thai) => {
        try {
            await db.execute(`UPDATE may_in SET trang_thai_may_in = ? WHERE ma_may_in = ?`, [trang_thai, ma_may_in]);
        } catch (err) {
            throw err;
        }
    }
    addPrinter = async (data) => {
        try {
                const ma_may_in = String(Date.now());
                const dataToInsert = [
                    data.hang,
                    data.trang_thai_may_in,
                    data.doi,
                    data.mo_ta,
                    data.ten_may,
                    data.co_so,
                    data.toa,
                    data.phong
                ];
            const [result, ] = await db.execute(`INSERT INTO may_in (ma_may_in, hang, trang_thai_may_in, doi, mo_ta, ten_may, co_so, toa, phong) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`, [ma_may_in, ...dataToInsert]);
            return result;
        }
        catch (err) {
            throw err;
        }
    }
    fetchAllPrintOrder = async () => {
        try {
            const [result, ] = await db.execute(`
                SELECT * 
                FROM don_in d left join don_in_gom_tep dt
                on d.ma_don_in = dt.ma_don_in
                left join in_tai_lieu itl
                on dt.ma_don_in = itl.ma_don_in`);
                const formattedResult = result.map(record => {
                    return {
                        ...record,
                        tg_bat_dau: support.formatDateTime(record.tg_bat_dau),
                        tg_ket_thuc: support.formatDateTime(record.tg_ket_thuc)
                    };
                });
            return formattedResult;
        }
        catch (err) {
            throw err;
        }
    }
    updatePrintOrderStatus = async (ma_don_in, trang_thai) => {
        try {
            await db.execute(`UPDATE don_in SET trang_thai_don_in = ? WHERE ma_don_in = ?`, [trang_thai, ma_don_in]);
        } catch (err) {
            throw err;
        }
    }
}
module.exports = new SPSOService;