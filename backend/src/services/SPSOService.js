const { data } = require('autoprefixer');
const db = require('../config/db');
const { message } = require('antd');
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
  
    updateStatus = async (data, req) => {
        const { status, id } = data;
        return new Promise(async (resolve, reject) => {
            if (req.session.user) {
                const [nguoi_dung] = await db.query('SELECT * FROM user WHERE id = ?', [req.session.user.id]);
                const xac_minh = nguoi_dung[0];
                if (xac_minh.role == 'SPSO') {
                    const [result] = await db.query('UPDATE sinh_vien SET trang_thai =? WHERE id =?', [status, id]);
                    if (result.affectedRows > 0) {
                        resolve({ status: true, message: 'Cập nhật trạng thái thành công' });
                    } 
                    else reject({ status: false, message: 'Cập nhật trạng thái thất bại' });
                }
                else reject({ status: false, message: 'Không có quyền truy cập' });
            } 
            else reject({ status: false, message: 'Người dùng chưa đăng nhập' });
        });
    }

    student_manager = async (req) => {
        return new Promise(async (resolve, reject) => {
            if (req.session.user) {
                const [nguoi_dung] = await db.query('SELECT * FROM user WHERE id = ?', [req.session.user.id]);
                const xac_minh = nguoi_dung[0];
                if (xac_minh.role == 'SPSO') {
                    const [sinh_vien] = await db.query('SELECT * FROM user WHERE role = ?', ['SV']);
                    const result = await Promise.all(sinh_vien.map(async (sv, index) => {
                        const MSSV = sv.id;
                        const ten = sv.ten;
                        const mail = sv.email;
                        const [trang_thai] = await db.query('SELECT * FROM sinh_vien WHERE id = ?', [MSSV]);
                        const status = trang_thai[0].trang_thai;
                        return { STT: index + 1, MSSV, ten, mail, status };
                    })); 
                    resolve({ status: true, danh_sach: result });
                }
                else reject({ status: false, message: 'Không có quyền truy cập' });
            } 
            else reject({ status: false, message: 'Người dùng chưa đăng nhập' });
        });
    }

    
}

module.exports = new SPSOService;
