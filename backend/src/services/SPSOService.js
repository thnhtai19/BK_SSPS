const { data } = require('autoprefixer');
const db = require('../config/db');
const { message } = require('antd');
const support = require('./support');

class SPSOService {
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

module.exports = new SPSOService