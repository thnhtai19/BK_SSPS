const db = require('../config/db');
const support = require('./support');

class SPSOService {
    fetchAllPrinter = async () => {
        try {
            const [result, ] = await db.execute(`SELECT * FROM may_in ORDER BY ma_may_in DESC`);
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
            const [res] = await db.execute(`INSERT INTO may_in (hang, trang_thai_may_in, doi, mo_ta, ten_may, co_so, toa, phong) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`, [...dataToInsert]);
            return res.insertId;
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
                on dt.ma_tep = t.ma_tep
                ORDER BY d.ma_don_in DESC`);
                const formattedResult = result.map(record => {
                    return record;
                });
            return formattedResult;
        }
        catch (err) {
            throw err;
        }
    }

    updatePrintOrderStatus = async (id, ma_don_in, trang_thai) => {
        try {
            const [nguoi_dung] = await db.query('SELECT id FROM in_tai_lieu WHERE ma_don_in = ?', [ma_don_in]);
            const uid = nguoi_dung[0];
            await db.execute(`UPDATE don_in SET trang_thai_don_in = ? WHERE ma_don_in = ?`, [trang_thai, ma_don_in]);
            const now = support.getCurrentFormattedDateTime();
            if (trang_thai == 'Đang in') {
                await db.execute(`
                    UPDATE in_tai_lieu 
                    SET tg_bat_dau = ?
                    WHERE ma_don_in = ?`, [now, ma_don_in]);
                await db.execute('INSERT INTO thong_bao (uid, thoi_gian, noi_dung) VALUES (?, ?, ?)', [uid, support.startTime(new Date().getMonth() + 1), `Đơn ${ma_don_in} đang được in`]);
            }
            else if (trang_thai == 'Đã in') {
                await db.execute(`
                    UPDATE in_tai_lieu 
                    SET tg_ket_thuc = ?
                    WHERE ma_don_in = ?`, [now, ma_don_in]);
                await db.execute('INSERT INTO thong_bao (uid, thoi_gian, noi_dung) VALUES (?, ?, ?)', [uid, support.startTime(new Date().getMonth() + 1), `Đơn ${ma_don_in} đã in xong`]);
            }
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
                    const [sinh_vien] = await db.query('SELECT * FROM user WHERE role = ? ORDER BY id DESC', ['SV']);
                    const result = await Promise.all(sinh_vien.map(async (sv, index) => {
                        const MSSV = sv.id;
                        const ten = sv.ten;
                        const mail = sv.email;
                        const thoi_gian_tham_gia = sv.ngay_dk;
                        const [trang_thai] = await db.query('SELECT * FROM sinh_vien WHERE id = ?', [MSSV]);
                        const status = trang_thai[0].trang_thai;
                        const page = trang_thai[0].so_giay_con;
                        return { STT: index + 1, MSSV, ten, mail, thoi_gian_tham_gia, status, page };
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
                        const [time, date] = row.thoi_gian.split(" ");
                        result.push({
                            id: row.id,
                            semester: row.hoc_ky,
                            createdTime: date + " " + time,
                            month: `${support.getmonth(row.thoi_gian)}/2024`,
                            content: `Báo cáo sử dụng hệ thống tháng ${support.getmonth(row.thoi_gian)}/${support.getyear(row.thoi_gian)}`
                        })
                    })
                    resolve(result);
                }
                else reject({ status: false, message: 'Không có quyền truy cập' });
            } 
            else reject({ status: false, message: 'Người dùng chưa đăng nhập' });
        });
    }

    createReportList = async(req) => { //Chưa sort id
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


    reportDetail = async(req, data) => { //Chưa sort id
        return new Promise(async (resolve, reject) => {
            if (req.session.user) {
                const [nguoi_dung] = await db.query('SELECT * FROM user WHERE id = ?', [req.session.user.id]);
                const xac_minh = nguoi_dung[0];
                // console.log(data)
                if (xac_minh.role == 'SPSO') {
                    // Xử lí tiền dữ liệu
                    const rac = await db.query('SELECT * FROM in_tai_lieu');
                    var rac1 = rac[0].filter((rac2) => {
                        return support.getmonth(rac2.tg_ket_thuc) == parseInt(data);
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
                            printerId: temp.ma_may_in,
                            printerName: may_in[0][0].ten_may,
                            orders: don_hang,
                            pagesA3: A3,
                            pagesA4: A4
                        };
                    }))
                    resolve(result);
                }
                else reject({status: false, message: 'Không có quyền truy cập'});
            } 
            else reject({status: false, message: 'Người dùng chưa đăng nhập'});
        });
    }


    reportUsing = async(req, data) => { //Chưa sort id
        return new Promise(async (resolve, reject) => {
            if (req.session.user) {
                const [nguoi_dung] = await db.query('SELECT * FROM user WHERE id = ?', [req.session.user.id]);
                const xac_minh = nguoi_dung[0];
                if (xac_minh.role == 'SPSO') {
                    const rac = await db.query('SELECT * FROM don_mua');
                    var rac1 = rac[0].filter((rac2) => {
                        return support.getmonth(rac2.thoi_gian) == parseInt(data);
                    })
                    var revenue = 0;
                    var uniqueIds = new Set(rac1.map((item) => {
                        revenue += item.tong_tien;
                        return item.id;
                    }));
                    resolve([
                        { name: 'Đơn hàng', value: rac1.length },
                        { name: 'Người dùng', value: uniqueIds.size },
                        { name: 'Doanh thu', value: revenue / 1e5 }
                    ])
                }
                else reject({status: false, message: 'Không có quyền truy cập'});
            } 
            else reject({status: false, message: 'Người dùng chưa đăng nhập'});
        });
    }

    adminHomePage = async() => {
        try {
            const [data1] = await db.execute(`SELECT COUNT(*) AS tong_nguoi_dung FROM user WHERE user.role = 'SV';`);
            const [data2] = await db.execute(`SELECT SUM(don_mua.tong_tien) AS tong_doanh_thu FROM don_mua;`)
            const [data3] = await db.execute(`SELECT COUNT(*) AS so_luong_don_in FROM don_in;`);
                             
            const [data4] = await db.execute(`
                SELECT 
                    COUNT(itl.id) AS so_nguoi_su_dung,
                    COUNT(itl.ma_don_in) AS so_don_in,
                    DATE_FORMAT(STR_TO_DATE(itl.tg_bat_dau, '%H:%i:%s %d-%m-%Y'), '%d-%m-%Y')    AS date
                FROM 
                    in_tai_lieu itl
                GROUP BY 
                    DATE_FORMAT(STR_TO_DATE(itl.tg_bat_dau, '%H:%i:%s %d-%m-%Y'), '%d-%m-%Y')
                ORDER BY 
                    DATE_FORMAT(STR_TO_DATE(itl.tg_bat_dau, '%H:%i:%s %d-%m-%Y'), '%d-%m-%Y') DESC 
                LIMIT 7;
                `);
            
            const result = {
                thong_ke_1: {
                    ...data1[0],
                    ...data2[0],
                    ...data3[0]
                },
                thong_ke_2: data4
                }
            return result;
        } catch (err) {
            throw err;
        }
    }
    fetchSystemInfo = async () => {
        try{
            const [systemInfo, ] = await db.query(`SELECT ht.so_giay_mac_dinh, ht.ma_hoc_ki, ht.gia, ht.ngay_reset,
                                                      ht.trang_thai_bao_tri, GROUP_CONCAT(lt.loai_tep SEPARATOR ', ') as loai_tep_chap_nhan 
                                               FROM he_thong ht left join loai_tep_chap_nhan lt
                                               on ht.ma_hoc_ki = lt.ma_hoc_ki
                                               group by ht.ma_hoc_ki
                                               ORDER BY CAST(ht.ma_hoc_ki as UNSIGNED) DESC
                                               LIMIT 1;`);
            return systemInfo;
        }
        catch(err){
            throw err;
        }
    }
    addNewSemester = async (data, SPSOId) => {
        try{
            const ma_hoc_ki = data.ma_hoc_ki;
            const result = await db.query('SELECT * FROM he_thong ORDER BY CAST(ma_hoc_ki as UNSIGNED) DESC LIMIT 1');
            const so_giay_mac_dinh = result[0][0].so_giay_mac_dinh;
            const gia = result[0][0].gia;
            const trang_thai_bao_tri = result[0][0].trang_thai_bao_tri;
            const result1 = await db.query(`SELECT loai_tep FROM loai_tep_chap_nhan
                                            WHERE ma_hoc_ki = (
                                                SELECT ma_hoc_ki FROM he_thong
                                                ORDER BY CAST(ma_hoc_ki as UNSIGNED) DESC
                                                LIMIT 1
                                            );`);
            console.log(result1);
            const ngay_reset = data.ngay_reset;
            const ghi_chu = "Thêm học kỳ mới";
            await db.execute('INSERT INTO he_thong (ma_hoc_ki, so_giay_mac_dinh, gia, trang_thai_bao_tri, ngay_reset) VALUES (?, ?, ?, ?, ?)', [ma_hoc_ki, so_giay_mac_dinh, gia, trang_thai_bao_tri, ngay_reset]);
            await db.execute('INSERT INTO cau_hinh (uid, ma_hoc_ki, ghi_chu) VALUES (?, ?, ?)', [SPSOId, ma_hoc_ki, ghi_chu]);
            for (const row of result1[0]) {
                const loai_tep = row.loai_tep;
                await db.execute('INSERT IGNORE INTO loai_tep_chap_nhan (ma_hoc_ki, loai_tep) VALUES (?, ?)', [ma_hoc_ki, loai_tep]);
            }
        }
        catch(err){
            if (err.code === 'ER_DUP_ENTRY') {
                throw new Error('Mã học kì đã tồn tại');
            }
            throw err;
        }
    }
    updateSystem = async (data, SPSOId) => {
        try{
            const ma_hoc_ki = data.ma_hoc_ki;
            const so_giay_mac_dinh = data.so_giay_mac_dinh;
            const gia = data.gia;
            const trang_thai_bao_tri = data.trang_thai_bao_tri;
            const loai_tep_chap_nhan = data.loai_tep_chap_nhan;
            const ghi_chu = "Cập nhật cấu hình hệ thống";
            await db.execute('UPDATE he_thong SET so_giay_mac_dinh = ?, gia = ?, trang_thai_bao_tri = ? WHERE ma_hoc_ki = ?', [so_giay_mac_dinh, gia, trang_thai_bao_tri, ma_hoc_ki]);
            await db.execute('INSERT INTO cau_hinh (uid, ma_hoc_ki, ghi_chu) VALUES (?, ?, ?)', [SPSOId, ma_hoc_ki, ghi_chu]);
            await db.execute('DELETE FROM loai_tep_chap_nhan WHERE ma_hoc_ki = ?', [ma_hoc_ki]);
            await db.execute('INSERT IGNORE INTO loai_tep_chap_nhan (ma_hoc_ki, loai_tep) VALUES (?, ?)', [ma_hoc_ki, loai_tep_chap_nhan]);
        }
        catch(err){
            throw err;
        }
    }
}

module.exports = new SPSOService;
