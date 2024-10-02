const { data } = require('autoprefixer');
const db = require('../config/db');
const { message } = require('antd');
const supportFunction = require('./support');

class UserService {
    diary = async (req) => {
        return new Promise(async (resolve, reject) => {
            if (req.session.user) {
                const result = [];
                const [nhat_ky] = await db.query('SELECT * FROM nhat_ky WHERE uid = ?', [req.session.user.id]);
                if (nhat_ky.length > 0) {
                    var i = 0;
                    nhat_ky.forEach(turn => {
                        result.push({
                            id: i,
                            thoi_gian: turn.thoi_gian,
                            noi_dung: turn.noi_dung
                        });
                        i++;
                    })
                }
                resolve({ status: true, message: result });
            } 
            else reject({ status: false, message: 'Người dùng chưa đăng nhập' });
        });
    }

    history_buying = async (req) => {
        return new Promise(async (resolve, reject) => {
            if (req.session.user) {
                const result = [];
                const [don_mua] = await db.query('SELECT * FROM don_mua WHERE id = ?', [req.session.user.id]);
                if (don_mua.length > 0) {
                    don_mua.forEach(don => {
                        result.push({
                            ID: don.ma_don_mua,
                            thoi_gian: don.thoi_gian,
                            so_trang: don.so_trang,
                            trang_thai: don.trang_thai
                        });
                    })
                }
                resolve({ status: true, message: result });
            } 
            else reject({ status: false, message: 'Người dùng chưa đăng nhập' });
        });
    }
}

module.exports = new UserService