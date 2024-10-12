INSERT INTO user (id, ten, ngay_dk, email, password, role) VALUES
('1', 'spso1', DATE_FORMAT(NOW(), '%H:%i:%s %d-%m-%Y'), 'spso1@hcmut.edu.vn', '$2a$10$MVH7lqOh6kCkHimpuIEyg.0ABo/QcHWO0eNQcVtamRNk7OpWcC22y', 'SPSO'), 
('2', 'spso2', DATE_FORMAT(NOW(), '%H:%i:%s %d-%m-%Y'), 'spso2@hcmut.edu.vn', '$2a$10$MVH7lqOh6kCkHimpuIEyg.0ABo/QcHWO0eNQcVtamRNk7OpWcC22y', 'SPSO'),
('3', 'spso3', DATE_FORMAT(NOW(), '%H:%i:%s %d-%m-%Y'), 'spso3@hcmut.edu.vn', '$2a$10$MVH7lqOh6kCkHimpuIEyg.0ABo/QcHWO0eNQcVtamRNk7OpWcC22y', 'SPSO'),
('4', 'spso4', DATE_FORMAT(NOW(), '%H:%i:%s %d-%m-%Y'), 'spso4@hcmut.edu.vn', '$2a$10$MVH7lqOh6kCkHimpuIEyg.0ABo/QcHWO0eNQcVtamRNk7OpWcC22y', 'SPSO'),
('5', 'st5', DATE_FORMAT(NOW(), '%H:%i:%s %d-%m-%Y'), 'st5@hcmut.edu.vn', '$2a$10$MVH7lqOh6kCkHimpuIEyg.0ABo/QcHWO0eNQcVtamRNk7OpWcC22y', 'SV'),
('6', 'st6', DATE_FORMAT(NOW(), '%H:%i:%s %d-%m-%Y'), 'st6@hcmut.edu.vn', '$2a$10$MVH7lqOh6kCkHimpuIEyg.0ABo/QcHWO0eNQcVtamRNk7OpWcC22y', 'SV'),
('7', 'st7', DATE_FORMAT(NOW(), '%H:%i:%s %d-%m-%Y'), 'st7@hcmut.edu.vn', '$2a$10$MVH7lqOh6kCkHimpuIEyg.0ABo/QcHWO0eNQcVtamRNk7OpWcC22y', 'SV'),
('8', 'st8', DATE_FORMAT(NOW(), '%H:%i:%s %d-%m-%Y'), 'st8@hcmut.edu.vn', '$2a$10$MVH7lqOh6kCkHimpuIEyg.0ABo/QcHWO0eNQcVtamRNk7OpWcC22y', 'SV'),
('9', 'st9', DATE_FORMAT(NOW(), '%H:%i:%s %d-%m-%Y'), 'st9@hcmut.edu.vn', '$2a$10$MVH7lqOh6kCkHimpuIEyg.0ABo/QcHWO0eNQcVtamRNk7OpWcC22y', 'SV'),
('10', 'st10', DATE_FORMAT(NOW(), '%H:%i:%s %d-%m-%Y'), 'st10@hcmut.edu.vn', '$2a$10$MVH7lqOh6kCkHimpuIEyg.0ABo/QcHWO0eNQcVtamRNk7OpWcC22y', 'SV'),
('11', 'st11', DATE_FORMAT(NOW(), '%H:%i:%s %d-%m-%Y'), 'st11@hcmut.edu.vn', '$2a$10$MVH7lqOh6kCkHimpuIEyg.0ABo/QcHWO0eNQcVtamRNk7OpWcC22y', 'SV'),
('12', 'st12', DATE_FORMAT(NOW(), '%H:%i:%s %d-%m-%Y'), 'st12@hcmut.edu.vn', '$2a$10$MVH7lqOh6kCkHimpuIEyg.0ABo/QcHWO0eNQcVtamRNk7OpWcC22y', 'SV'),
('13', 'st13', DATE_FORMAT(NOW(), '%H:%i:%s %d-%m-%Y'), 'st13@hcmut.edu.vn', '$2a$10$MVH7lqOh6kCkHimpuIEyg.0ABo/QcHWO0eNQcVtamRNk7OpWcC22y', 'SV'),
('14', 'st14', DATE_FORMAT(NOW(), '%H:%i:%s %d-%m-%Y'), 'st14@hcmut.edu.vn', '$2a$10$MVH7lqOh6kCkHimpuIEyg.0ABo/QcHWO0eNQcVtamRNk7OpWcC22y', 'SV');

insert into nhat_ky (id, uid, thoi_gian, noi_dung) values
('1', '5', '11:14:25 01-10-2024', 'Đã đăng nhập tài khoản IP: 127.0.0.1'),
('2', '5', '11:14:25 02-10-2024', 'Đã đăng nhập tài khoản IP: 127.0.0.1'),
('3', '5', '11:14:25 02-10-2024', 'Đã đăng nhập tài khoản IP: 127.0.0.1'),
('4', '5', '11:14:25 02-10-2024', 'Đã đăng nhập tài khoản IP: 127.0.0.1'),
('5', '5', '11:14:25 03-10-2024', 'Đã đăng nhập tài khoản IP: 127.0.0.1'),
('6', '5', '11:14:25 04-10-2024', 'Đã đăng nhập tài khoản IP: 127.0.0.1'),
('7', '5', '11:14:25 04-10-2024', 'Đã đăng nhập tài khoản IP: 127.0.0.1'),
('8', '5', '11:14:25 04-10-2024', 'Đã đăng nhập tài khoản IP: 127.0.0.1'),
('9', '5', '11:14:25 05-10-2024', 'Đã đăng nhập tài khoản IP: 127.0.0.1');

insert into SPSO (id) values
('1'), ('2'), ('3'), ('4');

insert into sinh_vien (id, trang_thai, so_giay_con) values 
('4', true, 0),
('5', true, 0),
('6', true, 0),
('7', true, 0),
('8', true, 0),
('9', true, 0),
('10', true, 0),
('11', true, 0),
('12', true, 0),
('13', true, 0),
('14', true, 0);

insert into don_mua (ma_don_mua, so_trang, tong_tien, thoi_gian, id) values 
('1', 20, 40000, DATE_FORMAT(NOW(), '%H:%i:%s %d-%m-%Y'), '5'),
('2', 20, 40000, DATE_FORMAT(NOW(), '%H:%i:%s %d-%m-%Y'), '5'),     -- st5: 20 tờ - 80k
('3', 20, 40000, DATE_FORMAT(NOW(), '%H:%i:%s %d-%m-%Y'), '6'),
('4', 20, 40000, DATE_FORMAT(NOW(), '%H:%i:%s %d-%m-%Y'), '6'),     -- st6: 20 tờ - 40k
('5', 20, 40000, DATE_FORMAT(NOW(), '%H:%i:%s %d-%m-%Y'), '7'),
('6', 20, 40000, DATE_FORMAT(NOW(), '%H:%i:%s %d-%m-%Y'), '7'),
('7', 20, 40000, DATE_FORMAT(NOW(), '%H:%i:%s %d-%m-%Y'), '7'),
('8', 20, 40000, DATE_FORMAT(NOW(), '%H:%i:%s %d-%m-%Y'), '7'),     -- st7: 80 tờ - 160k
('9', 20, 40000, DATE_FORMAT(NOW(), '%H:%i:%s %d-%m-%Y'), '8'),     -- st8: 20 tờ - 40k
('10', 20, 40000, DATE_FORMAT(NOW(), '%H:%i:%s %d-%m-%Y'), '9'),    -- st9: 20 tờ - 40k
('11', 20, 40000, DATE_FORMAT(NOW(), '%H:%i:%s %d-%m-%Y'), '10'),   -- st10: 20 tờ - 40k
('12', 20, 40000, DATE_FORMAT(NOW(), '%H:%i:%s %d-%m-%Y'), '11'),   -- st11: 20 tờ - 40k
('13', 20, 40000, DATE_FORMAT(NOW(), '%H:%i:%s %d-%m-%Y'), '12');   -- st12: 20 tờ - 40k

insert into may_in (ma_may_in, hang, trang_thai_may_in, doi, mo_ta, ten_may, co_so, toa, phong) values
('1', 'Canon', true, '2020', 'May in xin xo', 'Canon-Express', '1', 'A5', '101'),
('2', 'Canon', true, '2020', 'May in xin xo', 'Canon-Express', '1', 'A5', '102'),
('3', 'Canon', true, '2020', 'May in xin xo', 'Canon-Express', '1', 'A5', '103'),
('4', 'Canon', true, '2020', 'May in xin xo', 'Canon-Express', '1', 'A5', '103'),
('5', 'Canon', true, '2020', 'May in xin xo', 'Canon-Express', '1', 'A5', '103'),
('6', 'Canon', true, '2020', 'May in xin xo', 'Canon-Express', '2', 'A5', '103'),
('7', 'Canon', true, '2020', 'May in xin xo', 'Canon-Express', '2', 'B4', '101'),
('8', 'Canon', true, '2020', 'May in xin xo', 'Canon-Express', '2', 'B4', '103'),
('9', 'Canon', true, '2020', 'May in xin xo', 'Canon-Express', '2', 'B4', '104'),
('10', 'Canon', true, '2020', 'May in xin xo', 'Canon-Express', '2', 'B4', '105'),
('11', 'Canon', true, '2020', 'May in xin xo', 'Canon-Express', '2', 'B4', '201');

insert into don_in (ma_don_in, trang_thai_don_in) values
('1', 'Đã in'),
('2', 'Đã in'),
('3', 'Đã in'),
('4', 'Đã in'),
('5', 'Đã in'),
('6', 'Đã in'),
('7', 'Đang in'),
('8', 'Đang in'),
('9', 'Đang in'),
('10', 'Đang in'),
('11', 'Đang in'),
('12', 'Đang in'),
('13', 'Đang in'),
('14', 'Chờ in'),
('15', 'Chờ in'),
('16', 'Chờ in'),
('17', 'Chờ in');

INSERT INTO in_tai_lieu (id, ma_may_in, ma_don_in, tg_bat_dau, tg_ket_thuc) VALUES 
('5', '1', '1', '11:14:25 01-10-2024', '10:14:25 10-10-2024'),
('5', '1', '2', '11:14:25 02-10-2024', '10:14:25 10-10-2024'), 
('5', '1', '3', '11:14:25 03-10-2024', '10:14:25 10-10-2024'),
('5', '1', '4', '11:14:25 04-10-2024', '10:14:25 10-10-2024'),
('5', '2', '5', '11:14:25 05-10-2024', '10:14:25 10-10-2024'),
('5', '2', '6', '11:14:25 05-10-2024', '10:14:25 10-10-2024'),
('5', '2', '7', '11:14:25 06-10-2024', '10:14:25 10-10-2024'),
('5', '3', '8', '11:14:25 06-10-2024', '10:14:25 10-10-2024'),
('5', '4', '9', '11:14:25 06-10-2024', '10:14:25 10-10-2024'),
('6', '5', '10', '11:14:25 07-10-2024', '10:14:25 10-10-2024'),
('6', '6', '11', '11:14:25 07-10-2024', '10:14:25 10-10-2024'),
('6', '6', '12', '11:14:25 07-10-2024', '10:14:25 10-10-2024'),
('6', '6', '13', '11:14:25 08-10-2024', '10:14:25 10-10-2024'),
('6', '6', '14', '11:14:25 07-10-2024', '10:14:25 10-10-2024'),
('6', '6', '15', '11:14:25 07-10-2024', '10:14:25 10-10-2024'),
('6', '6', '16', '11:14:25 07-10-2024', '10:14:25 10-10-2024'),
('6', '6', '17', '11:14:25 07-10-2024', '10:14:25 10-10-2024');


insert into he_thong (ma_hoc_ki, gia, so_giay_mac_dinh, ngay_cap_nhat, trang_thai_bao_tri) values
('223', 200, 50, '12-10-2024', 'Đã tạm ngưng'),
('231', 200, 50, '12-10-2024', 'Đã tạm ngưng'),
('232', 200, 50, '12-10-2024', 'Đã tạm ngưng'),
('233', 200, 50, '12-10-2024', 'Đã tạm ngưng'),
('241', 200, 50, '12-10-2024', 'Đang Hoạt động');

insert into loai_tep_chap_nhan (ma_hoc_ki, loai_tep) values 
('241', '.doc'),
('241', '.docx'),
('241', '.pdf'),
('241', '.csv'),
('241', '.txt'),
('241', '.ppt');

insert into tep (ma_tep, ten_tep, loai_tep, duong_dan, so_trang) values -- Chưa sửa đường dẫn, khi nào code API sẽ sửa sau
('1', 'sample1.txt', '.txt', '\_5\sample_1.txt', 1),
('2', 'sample2.txt', '.txt', '\_5\sample_2.txt', 1),
('3', 'sample3.txt', '.txt', '\_5\sample_3.txt', 1),
('4', 'sample4.txt', '.txt', '\_5\sample_4.txt', 1),
('5', 'sample1.txt', '.txt', '\_6\sample_1.txt', 1),
('6', 'sample2.txt', '.txt', '\_6\sample_2.txt', 1),
('7', 'sample3.txt', '.txt', '\_6\sample_3.txt', 1),
('8', 'sample1.txt', '.txt', '\_7\sample_1.txt', 1);

insert into so_huu (id, ma_tep) values
('5', '1'),
('5', '2'),
('5', '3'),
('5', '4'),
('6', '5'),
('6', '6'),
('6', '7'),
('7', '8');

insert into xac_nhan (id, ma_don_in) values 
('1', '1'),
('1', '2'),
('1', '3'),
('1', '4'),
('1', '5'),
('1', '6'),
('1', '7'),
('1', '8'),
('1', '9'),
('1', '10'),
('1', '11'),
('1', '12'),
('1', '13'),
('1', '14'),
('1', '15'),
('1', '16'),
('1', '17');

insert into don_in_gom_tep (ma_don_in, ma_tep, so_ban_in, so_mat, so_trang_in, kich_thuoc) values
('1', '1', 2, 1, 5, 'A3'),
('2', '2', 2, 1, 5, 'A4'),
('3', '3', 3, 1, 5, 'A4'),
('4', '4', 3, 2, 5, 'A4'),
('5', '5', 4, 2, 5, 'A4'),
('6', '6', 4, 2, 5, 'A4'),
('7', '7', 4, 2, 5, 'A4'),
('8', '8', 4, 2, 5, 'A4'),
('9', '4', 4, 2, 5, 'A4'),
('10', '4', 4, 2, 5, 'A4'),
('11', '4', 4, 2, 5, 'A4'),
('12', '4', 4, 2, 5, 'A4'),
('13', '4', 4, 2, 5, 'A4'),
('14', '4', 4, 2, 5, 'A4'),
('15', '4', 4, 2, 5, 'A4'),
('16', '4', 4, 2, 5, 'A4'),
('17', '4', 4, 2, 5, 'A4');

insert into cau_hinh (id, uid, ma_hoc_ki, ghi_chu) values
('1', '1', '233', 'Test API'),
('2', '1', '233', 'Test API'),
('3', '1', '241', 'Test API'),
('4', '2', '241', 'Test API');

insert into bao_cao (id, thoi_gian, hoc_ky) values
('1', '00:55:44 13-07-2024', '241'),
('2', '17:38:41 10-08-2024', '241'),
('3', '17:38:41 10-09-2024', '241');