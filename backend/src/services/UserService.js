const { data } = require('autoprefixer');
const db = require('../config/db');
const { message } = require('antd');
const supportFunction = require('./support');
const support = require('../services/support');

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
            else resolve({ status: false, message: 'Người dùng chưa đăng nhập' });
        });
    }
    getUserById = async(Id) => {
        try{
            const [result, ] = await db.execute(`SELECT id, 
                                                        ten, 
                                                        DATE_FORMAT(ngay_dk, '%d-%m-%Y') as ngay_dk,
                                                        email,
                                                        role
                                                        FROM user WHERE id = ?`, [Id]);
            return result[0];
        }
        catch(err){
            throw err;
        }
    }
    fetchAcceptedDocument = async () => {
        try {
            const [result, ] = await db.execute(`
                SELECT loai_tep
                FROM he_thong h 
                LEFT JOIN loai_tep_chap_nhan l 
                ON h.ma_hoc_ki = l.ma_hoc_ki
                WHERE h.ngay_cap_nhat = (
                    SELECT h.ngay_cap_nhat
                    FROM he_thong h
                    ORDER BY ABS(TIMESTAMPDIFF(SECOND, h.ngay_cap_nhat, NOW())) ASC
                    LIMIT 1
                );`);
            return result;
        } catch (err) {
            throw err;
        }
    }
    fetchActivePrinter = async () => {
        try {
            const [result, ] = await db.execute(`
                SELECT ma_may_in, ten_may 
                FROM may_in 
                WHERE trang_thai_may_in = 'true';`);
            return result;
        } catch (err) {
            throw err;
        }
    }
    NoPagesEachDay = async (id) => {
        const [result1] = await db.execute(`
            SELECT DATE(thoi_gian) as create_day 
            FROM nhat_ky
            WHERE uid = ? AND noi_dung = 'Tạo tài khoản'`, [id]);

        const create_day = result1[0].create_day;

        const [result2] = await db.execute(`
            SELECT * 
            FROM in_tai_lieu itl JOIN don_in_gom_tep dt 
            ON itl.ma_don_in = dt.ma_don_in
            WHERE id = ?`, [id]);
        const formatDate = (date) => {
            const day = ('0' + date.getDate()).slice(-2); // Đảm bảo 2 chữ số
            const month = ('0' + (date.getMonth() + 1)).slice(-2); // Tháng bắt đầu từ 0 nên cần +1
            const year = date.getFullYear();
            return `${day}-${month}-${year}`;
        };        

        const jsondata = [];
        for (let i = new Date(create_day); i < new Date(); i.setDate(i.getDate() + 1)) {
            let A3 = 0;
            let A4 = 0;

            result2.forEach(record => {
                if (new Date(record.tg_bat_dau).toDateString() === i.toDateString()) {
                    if (record.kich_thuoc === 'A3') {
                        A3 += record.so_ban_in;
                    } else {
                        A4 += record.so_ban_in;
                    }
                }
            });

            const json = {
                date: formatDate(new Date(i)),
                A3Pages: A3,
                A4Pages: A4
            };
            jsondata.push(json);
        }

        return jsondata;
    }

    getAllPrintOrder = async () => {
        try {
            const [result] = await db.execute(`
                SELECT * 
                FROM don_in_gom_tep dt 
                JOIN in_tai_lieu ON dt.ma_don_in = in_tai_lieu.ma_don_in`);
            const formattedResult = result.map(record => {
                return {
                    ...record,
                    tg_bat_dau: support.formatDateTime(record.tg_bat_dau),
                    tg_ket_thuc: support.formatDateTime(record.tg_ket_thuc)
                };
            });
            
            return formattedResult;
        } catch (err) {
            throw err;
        }
    }

    getPrintOrderByStudent = async (id) => {
        try {
            const [result] = await db.execute(`
                SELECT * 
                FROM don_in_gom_tep dt 
                JOIN in_tai_lieu ON dt.ma_don_in = in_tai_lieu.ma_don_in
                WHERE id = ?`, [id]);
            const formattedResult = result.map(record => {
                return {
                    ...record,
                    tg_bat_dau: support.formatDateTime(record.tg_bat_dau),
                    tg_ket_thuc: support.formatDateTime(record.tg_ket_thuc)
                };
            });
        
            return formattedResult;
        } catch (err) {
            throw err;
        }
    }
    uploadFile = async (data, id) => {
        try {
            const ten_tep = data.ten_tep;
            const loai_tep = data.loai_tep;
            const ma_tep = String(Date.now());
            await db.execute('INSERT INTO tep (ma_tep, ten_tep, loai_tep) VALUES (?, ?, ?)', [ma_tep, ten_tep, loai_tep]);
            await db.execute('INSERT INTO so_huu (id, ma_tep) VALUES (?, ?)', [id, ma_tep]);
        } catch (err) {
            throw err;
        }
    }
}
module.exports = new UserService
