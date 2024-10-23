const db = require('../config/db');
const support = require('./support');

class UserService {
    getFile = async (ten_tep, id) => {
        try{
            const [result, ] = await db.execute(`SELECT duong_dan 
                                                FROM tep t join so_huu sh
                                                on t.ma_tep = sh.ma_tep 
                                                WHERE t.ten_tep = ? and sh.id = ?`, [ten_tep, id]); 
            return result[0];
        }
        catch(err){
            throw err;
        }
    }
    diary = async (req) => {
        return new Promise(async (resolve, reject) => {
            if (req.session.user) {
                const result = [];
                const [nhat_ky] = await db.query('SELECT * FROM nhat_ky WHERE uid = ?', [req.session.user.id]);
                if (nhat_ky.length > 0) {
                    var i = 0;
                    nhat_ky.forEach(turn => {
                        result.unshift({ //sort
                            id: i,
                            thoi_gian: turn.thoi_gian,
                            noi_dung: turn.noi_dung
                        });
                        i++;
                    })
                }
                resolve({ status: true, message: result });
            } 
            else reject({ message: 'Người dùng chưa đăng nhập' });
        });
    }

    history_buying = async (req) => {
        return new Promise(async (resolve, reject) => {
            if (req.session.user) {
                const result = [];
                const [don_mua] = await db.query('SELECT * FROM don_mua WHERE id = ?', [req.session.user.id]);
                if (don_mua.length > 0) {
                    don_mua.forEach(don => {
                        result.unshift({ //sort
                            ID: don.ma_don_mua,
                            thoi_gian: don.thoi_gian,
                            so_trang: don.so_trang,
                            tong_tien: don.tong_tien
                        });
                    })
                }
                resolve({ status: true, message: result });
            } 
            else reject({ message: 'Người dùng chưa đăng nhập' });
        });
    }

    getUserById = async(Id) => {
        try{
            const [result, ] = await db.execute(`SELECT user.id, 
                                                        user.ten, 
                                                        ngay_dk,
                                                        user.email,
                                                        user.role,
                                                        ifnull(so_giay_con, 0) as so_giay_con                                                                     
                FROM user left join sinh_vien 
                on user.id = sinh_vien.id and user.role = 'SV'
                WHERE user.id = ?`, [Id]); 
            return result[0];
        }
        catch(err){
            throw err;
        }
    }

    fetchDocumentAndPrinterInfo = async () => {
        try {
            const [acceptedDocuments, activePrinters] = await Promise.all([
                db.execute(`
                    SELECT loai_tep
                    FROM he_thong h 
                    LEFT JOIN loai_tep_chap_nhan l 
                    ON h.ma_hoc_ki = l.ma_hoc_ki
                    WHERE h.ma_hoc_ki = (
                        SELECT h.ma_hoc_ki
                        FROM he_thong h
                        ORDER BY CAST(h.ma_hoc_ki as UNSIGNED) DESC
                        LIMIT 1
                    );`),
                db.execute(`
                    SELECT ma_may_in, ten_may 
                    FROM may_in 
                    WHERE trang_thai_may_in = true
                    ORDER BY ma_may_in DESC;
                `)
            ]);
    
            return {
                acceptedDocuments: acceptedDocuments[0], 
                activePrinters: activePrinters[0]        
            };
        } catch (err) {
            throw err;
        }
    }

    NoPagesEachDay = async (id) => { //Chưa sort
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

    getPrintOrder = async (id) => {
        try {
            const [result] = await db.execute(`
                SELECT d.ma_don_in,d.trang_thai_don_in, mi.ten_may, t.ten_tep, t.duong_dan, 
                       itl.tg_bat_dau, itl.tg_ket_thuc, dt.kich_thuoc, dt.so_trang_in
                FROM don_in d 
                left join don_in_gom_tep dt on d.ma_don_in = dt.ma_don_in
                left join in_tai_lieu itl on d.ma_don_in = itl.ma_don_in
                left join may_in mi on itl.ma_may_in = mi.ma_may_in
                left join tep t on dt.ma_tep = t.ma_tep
                WHERE id = ?
                ORDER BY ma_don_in DESC`, [id]);
            const formattedResult = result.map(record => {
                return record;
            });
        
            return formattedResult;
        } catch (err) {
            throw err;
        }
    }

    studentHomepage = async (id) => {
        try {
            const [data1] = await db.execute(`
                SELECT 
                    SUM(dm.tong_tien) AS tong_tien_da_dung, 
                    sv.so_giay_con AS so_giay_in_con_lai
                FROM don_mua AS dm 
                LEFT JOIN sinh_vien AS sv ON dm.id = sv.id
                WHERE dm.id = ?
                GROUP BY sv.so_giay_con;`, [id]);
            const [data2] = await db.execute(`
                SELECT count(*) AS tong_tai_lieu_da_in
                FROM don_in_gom_tep digt
                WHERE digt.ma_don_in
                IN 
                (SELECT ma_don_in FROM in_tai_lieu WHERE id = ?);`, [id])
            const [data3] = await db.execute(`
                SELECT 
                    DATE_FORMAT(STR_TO_DATE(itl.tg_bat_dau, '%H:%i:%s %d-%m-%Y'), '%d-%m-%Y') AS date,
                --     COUNT(DISTINCT di.ma_don_in) AS so_don_in_trong_ngay,
                    COUNT(digt.ma_tep) AS so_tai_lieu_in_trong_ngay,
                    SUM(digt.so_trang_in) AS so_trang_da_dung_trong_ngay
                FROM 
                    in_tai_lieu itl
                JOIN 
                    don_in_gom_tep digt ON itl.ma_don_in = digt.ma_don_in
                JOIN 
                    don_in di ON digt.ma_don_in = di.ma_don_in
                WHERE 
                    itl.id = ?
                GROUP BY 
                    DATE_FORMAT(STR_TO_DATE(itl.tg_bat_dau, '%H:%i:%s %d-%m-%Y'), '%d-%m-%Y')
                ORDER BY 
                    STR_TO_DATE(date, '%d-%m-%Y') ASC
                LIMIT 7;`, [id]);
            
            const result1 = data1.length > 0 ? data1[0] : { tong_tien_da_dung: 0, so_giay_in_con_lai: 0 };
            const result = {
                ...result1,
                ...data2[0],
                thong_ke: data3}
            return result;
        } catch (err) {
            throw err;
        }
    }

    readNotice = async (req) => {
        return new Promise(async (resolve, reject) => {
            if (req.session.user) {
                const [thong_baos] = await db.query('SELECT * FROM thong_bao WHERE uid = ? ORDER BY id DESC', [req.session.user.id]);
                const result = await Promise.all(thong_baos.map((thong_bao) => {
                    return { 
                        ID: thong_bao.id,
                        noi_dung: thong_bao.noi_dung,
                        trang_thai: thong_bao.trang_thai,
                        ma_don: support.getOrderId(thong_bao.noi_dung)
                    }
                }));
                resolve({status: true, message: result})
            }
            else reject({message: 'Người dùng chưa đăng nhập'});
        });
    }

    updateStatus = async (req, data) => {
        return new Promise(async (resolve, reject) => {
            if (req.session.user) {
                const { id } = data;
                const [result] = await db.query('UPDATE thong_bao SET trang_thai =? WHERE uid =? AND id =?', [true, req.session.user.id, id]);
                if (result.affectedRows <= 0) {
                    reject({message: 'Cập nhật trạng thái thất bại'});
                    return;
                }
                resolve({status: true, message: 'Cập nhật trạng thái thành công'});
            }
            else reject({message: 'Người dùng chưa đăng nhập'});
        });
    }
}

module.exports = new UserService
