const { data } = require('autoprefixer');
const db = require('../config/db');
const { message } = require('antd');
const supportFunction = require('./support');

class UerService {
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
            else resolve({ status: false, message: 'Người dùng chưa đăng nhập' });
        });
    }
}

module.exports = new UerService