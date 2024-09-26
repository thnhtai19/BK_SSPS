const { data } = require('autoprefixer');
const db = require('../config/db');
const { message } = require('antd');
const supportFunction = require('./support');

class UerService {
    diary = async (req) => {
        return new Promise(async (resolve, reject) => {
            if (req.session.user) {
                var buy = [];
                var print = {};
                var login = [];
                var Id = req.session.user.id;
                // Xác thực người dùng
                const [rows] = await db.query('SELECT * FROM sinh_vien WHERE id = ?', [Id]);
                if (rows.length === 0) {
                    resolve({ status: false, message: "Tài khoản không tồn tại" });
                    return;
                }
                // Hoạt động đăng nhập
                const [nhat_kys] = await db.query('SELECT * FROM nhat_ky WHERE MSSV = ?', [Id]);
                if (nhat_kys.length === 0) {
                    resolve({ status: false, message: "Người dùng chưa đăng nhập" });
                    return;
                }
                nhat_kys.forEach(nhat_ky => {
                    var IP = nhat_ky.IP;
                    var login_time = nhat_ky.thoi_gian;
                    login.push({ IP, login_time });
                })
                // // Hoạt động in tài liệu
                // const user = rows[0];
                // var page = user.so_giay_con;
                // const [users] = await db.query('SELECT * FROM in_tai_lieu WHERE id =?', [Id]);
                // if (users.length === 0) {
                //     resolve({ status: false, message: "Người dùng chưa in bao giờ"});
                //     return;
                // }
                // const [ma_don_in] = users.map(user => {
                //     return user.ma_don_in;
                // });
                // var total = 0;
                // ma_don_in.forEach(async so_ban_in => { 
                //     const [rows_print] = await db.query('SELECT * FROM don_in_gom_tep WHERE ma_don_in =?', [so_ban_in]);
                //     rows_print.forEach(row => { 
                //         total += row.so_ban_in;
                //     })
                // });
                // print = {
                //     so_trang_tai_lieu_da_in: total,
                //     so_trang_con_lai: page
                // }
                // // Hoạt động mua trang in
                // const [rows_buy] = await db.query('SELECT * FROM don_mua WHERE id =?', [Id]);
                // rows_buy.forEach(row => { 
                //     buy.push({
                //         status: row.trang_thai,
                //         ID: row.ma_don_mua,
                //         date: row.thoi_gian
                //     })
                // })
                resolve({status: true, message: {
                    Id,
                    nhat_ky_hoat_dong: login,
                    hoat_dong_mua_trang_in: buy,
                    hoat_dong_in_tai_lieu: print
                }})
            } 
            else resolve({ status: false, message: 'Chưa đăng nhập' });
        });
    }
}

module.exports = new UerService