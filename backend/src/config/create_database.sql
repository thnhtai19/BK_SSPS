drop database if exists hcmut_ssps;
create database hcmut_ssps;
use hcmut_ssps;

create table user (
	id 			int not null auto_increment,
    ten 		varchar(50) not null,
    ngay_dk 	varchar(50) not null,
    email 		varchar(50) not null,
    password 	varchar(128) not null,
    role		varchar(50) not null default 'SV',
    primary 	key (id)
);

create table bao_cao (
	id 			int not null auto_increment,
    thoi_gian   varchar(50) not null,
    hoc_ky   	varchar(50) not null,
    primary 	key (id)
);

create table nhat_ky (
	id			int not null auto_increment,
	uid			int not null,
    thoi_gian	varchar(50) not null,
    noi_dung	varchar(255) not null,
    primary key(id),
    foreign key(uid) references user(id)
);

create table spso (
	id			int,
    primary key(id)
);

create table sinh_vien (
	id 			int not null,		/*MSSV*/
    trang_thai	boolean not null default true,
    so_giay_con int not null default 0,
    primary key(id),
    foreign key(id) references user(id)
);

create table don_mua (
	ma_don_mua 	varchar(50) not null unique,
    so_trang 	int not null,
    tong_tien   int not null default 0,
    thoi_gian	varchar(50) not null,
    id			int not null,
    primary key(id, ma_don_mua),
    foreign key(id) references sinh_vien(id)    
);

create table may_in (
	  ma_may_in	int not null auto_increment,
    hang 		varchar(50) not null default 'Canon',
    trang_thai_may_in	varchar(50) not null default true,
    doi			varchar(50) not null,
    mo_ta 		varchar(500) not null default 'May in xin xo',
    ten_may		varchar(50) not null,
    co_so		varchar(50) not null default 'Di An',
    toa 		varchar(50) not null default 'H6',
    phong		varchar(50) not null default '101',
    primary key(ma_may_in)
);

create table don_in (
	  ma_don_in	int not null auto_increment,
    trang_thai_don_in	varchar(50) not null check(trang_thai_don_in in ('Đã in', 'Chờ in', 'Đang in')) default 'Chờ in', 
    primary key(ma_don_in)
);

create table in_tai_lieu (
	id		int not null,
    ma_may_in	int not null,
    ma_don_in	int not null,
    -- tg_bat_dau 	varchar(50) not null,
    -- tg_ket_thuc varchar(50) not null,
    tg_bat_dau 	varchar(50),
    tg_ket_thuc varchar(50),
    primary key(id, ma_may_in, ma_don_in),
    foreign key(id) references sinh_vien(id),
    foreign key(ma_may_in) references may_in(ma_may_in),
    foreign key(ma_don_in) references don_in(ma_don_in)
);

create table he_thong (
	ma_hoc_ki	varchar(50) not null,
	gia 		int not null default 500,
    so_giay_mac_dinh	int not null default 50,
    ngay_cap_nhat		varchar(50) not null,
    primary key(ma_hoc_ki)
);

create table loai_tep_chap_nhan (
	ma_hoc_ki 	varchar(50) not null,
    loai_tep	varchar(50) not null,
    primary key(ma_hoc_ki, loai_tep),
    foreign key(ma_hoc_ki) references he_thong(ma_hoc_ki)
);

create table tep (
	ma_tep		int not null auto_increment,
    ten_tep		varchar(50) not null,
    loai_tep	varchar(50) not null,
    duong_dan   varchar(255) not null,
    so_trang    int not null,
	primary key(ma_tep)
);

create table so_huu ( 		/* SV so huu tep */
	id		int not null,
    ma_tep	int not null,
    primary key(id, ma_tep),
    foreign key(id) references sinh_vien(id),
    foreign key(ma_tep) references tep(ma_tep)
);

create table xac_nhan (		/* SSPO xac nhan Don in*/
	id		int not null,
    ma_don_in	int not null,
    primary key(id, ma_don_in),
    foreign key(id) references spso(id),
    foreign key(ma_don_in) references don_in(ma_don_in)
);

create table don_in_gom_tep (
	ma_don_in	int not null,
	ma_tep		int not null,
	so_ban_in	int not null default 1,
	so_mat		int not null check (so_mat in (1, 2)),
  so_trang_in int not null,
	kich_thuoc	enum('A3', 'A4'),   
-- 	trang_bat_dau	int not null default 1,
-- 	trang_ket_thuc 	int not null,
    primary key(ma_don_in, ma_tep),
	foreign key(ma_don_in) references don_in(ma_don_in),
    foreign key(ma_tep) references tep(ma_tep)
);

create table cau_hinh (
    id          int not null auto_increment,
	uid			int null,
    ma_hoc_ki	varchar(50) not null,
    ghi_chu		varchar(500) not null default 'Cau hinh he thong',
    primary key(id),
    foreign key(uid) references spso(id),
    foreign key(ma_hoc_ki) references he_thong(ma_hoc_ki)
);

DELIMITER //

CREATE TRIGGER calculate_tong_tien
BEFORE INSERT ON don_mua
FOR EACH ROW
BEGIN
    DECLARE current_gia INT;
    
    IF NEW.tong_tien = 0 OR NEW.tong_tien = NULL THEN
        SET current_gia = (
            SELECT gia 
            FROM he_thong 
            WHERE ma_hoc_ki = (SELECT MAX(ma_hoc_ki) FROM he_thong)
            LIMIT 1
        );
        
        SET NEW.tong_tien = NEW.so_trang * current_gia;
    END IF;
END//

DELIMITER ;
