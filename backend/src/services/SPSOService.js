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
                SELECT d.ma_don_in, itl.id as MSSV, mi.ten_may, t.ten_tep, t.duong_dan, 
                        itl.tg_bat_dau, itl.tg_ket_thuc, d.trang_thai_don_in, dt.kich_thuoc, dt.so_trang_in
                FROM don_in d left join don_in_gom_tep dt
                on d.ma_don_in = dt.ma_don_in
                left join in_tai_lieu itl
                on dt.ma_don_in = itl.ma_don_in
                left join may_in mi
                on itl.ma_may_in = mi.ma_may_in
                left join tep t
                on dt.ma_tep = t.ma_tep`);
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

    reportList = async (req) => {
        return new Promise(async (resolve, reject) => {
            if (req.session.user) {
                const [nguoi_dung] = await db.query('SELECT * FROM user WHERE id = ?', [req.session.user.id]);
                const xac_minh = nguoi_dung[0];
                if (xac_minh.role == 'SPSO') {
                    const result = [];
                    const [report] = await db.query('SELECT * FROM bao_cao');
                    report.forEach((row) => {
                        result.push({
                            ID: row.id,
                            hoc_ky: row.hoc_ky,
                            thoi_gian: row.thoi_gian,
                            thang: `0${support.getmonth(row.thoi_gian)}/2024`,
                            noi_dung: `Báo cáo sử dụng hệ thống tháng 0${support.getmonth(row.thoi_gian)}/2024`
                        })
                    })
                    resolve({ status: true, reportList: result });
                }
                else reject({ status: false, message: 'Không có quyền truy cập' });
            } 
            else reject({ status: false, message: 'Người dùng chưa đăng nhập' });
        });
    }

    createReportList = async(req) => {
        return new Promise(async (resolve, reject) => {
            if (req.session.user) {
                const now = new Date();
                const month = now.getMonth() + 1;
                const rac = await db.query('SELECT * FROM bao_cao');
                var time = support.getmonth(rac[0][rac[0].length - 1].thoi_gian);
                for (time++; time < month; time++) {
                    const thoi_gian = support.startTime(time);
                    const hoc_ky = support.getSemester(time, new Date().getFullYear());
                    const [rac] = await db.query(
                        'INSERT INTO bao_cao (hoc_ky, thoi_gian) VALUES (?, ?)',  [hoc_ky, thoi_gian]
                    );
                    if (rac.affectedRows != 1) {
                        reject({status: false});
                        return;
                    } 
                }
                if (support.checkLastDayOfCurrentMonth()) {
                    const thoi_gian = support.startTime(new Date().getMonth() + 1);
                    const hoc_ky = support.getSemester(new Date().getMonth() + 1, new Date().getFullYear());
                    const [rac] = await db.query(
                        'INSERT INTO bao_cao (hoc_ky, thoi_gian) VALUES (?, ?)',  [hoc_ky, thoi_gian]
                    );
                    if (rac.affectedRows != 1) {
                        reject({status: false});
                        return;
                    } 
                }
                resolve({status: true, message: time});
            } 
            else reject({ status: false, message: 'Người dùng chưa đăng nhập' });
        });
    }

    reportDetail = async(req, data) => {
        const { thang } = data;
        return new Promise(async (resolve, reject) => {
            if (req.session.user) {
                const [nguoi_dung] = await db.query('SELECT * FROM user WHERE id = ?', [req.session.user.id]);
                const xac_minh = nguoi_dung[0];
                if (xac_minh.role == 'SPSO') {
                    // Xử lí tiền dữ liệu
                    const rac = await db.query('SELECT * FROM in_tai_lieu');
                    var rac1 = rac[0].filter((rac2) => {
                        return support.getmonth(rac2.tg_ket_thuc) == parseInt(thang);
                    })
                    var rac3 = {}
                    rac1.forEach(function(rac4) {
                        var ma_may_in = rac4.ma_may_in;
                        var ma_don_in = rac4.ma_don_in;
                        if (!rac3[ma_may_in]) {
                            rac3[ma_may_in] = {
                                ma_may_in: ma_may_in,
                                ma_don_in: []
                            };
                        }
                        rac3[ma_may_in].ma_don_in.push(ma_don_in);
                    });
                    var rac5 = Object.values(rac3);
                    // Giải quyết bài toán
                    const result = await Promise.all(rac5.map(async (temp) => {
                        var A3 = 0, A4 = 0, don_hang = 0;
                        const row = await Promise.all(temp.ma_don_in.map(async (ma_don_in) => {
                            const [don_ins] = await db.query('SELECT * FROM don_in_gom_tep WHERE ma_don_in = ?', [ma_don_in]);
                            const don_in = don_ins[0];
                            if (don_in != null) {
                                if (don_in.kich_thuoc == 'A3') A3++;
                                else A4++;
                                don_hang++;
                            }
                        }));
                        const may_in = await db.query('SELECT * FROM may_in WHERE ma_may_in = ?', [temp.ma_may_in]);
                        return {
                            ID_may_in: temp.ma_may_in,
                            ten_may_in: may_in[0][0].ten_may,
                            so_don_hang: don_hang,
                            A3,
                            A4
                        };
                    }))
                    resolve(result);
                }
                else reject({status: false, message: 'Không có quyền truy cập'});
            } 
            else reject({status: false, message: 'Người dùng chưa đăng nhập'});
        });
    }

    reportUsing = async(req, data) => {
        const { thang } = data;
        return new Promise(async (resolve, reject) => {
            if (req.session.user) {
                const [nguoi_dung] = await db.query('SELECT * FROM user WHERE id = ?', [req.session.user.id]);
                const xac_minh = nguoi_dung[0];
                if (xac_minh.role == 'SPSO') {
                    const rac = await db.query('SELECT * FROM don_mua');
                    var rac1 = rac[0].filter((rac2) => {
                        return support.getmonth(rac2.thoi_gian) == parseInt(thang);
                    })
                    var revenue = 0;
                    var uniqueIds = new Set(rac1.map((item) => {
                        revenue += item.tong_tien;
                        return item.id;
                    }));
                    resolve({
                        don_hang: rac1.length,
                        nguoi_dung: uniqueIds.size,
                        doanh_thu: revenue
                    });
                }
                else reject({status: false, message: 'Không có quyền truy cập'});
            } 
            else reject({status: false, message: 'Người dùng chưa đăng nhập'});
        });
    }
}

module.exports = new SPSOService;
