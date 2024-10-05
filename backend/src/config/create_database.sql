drop database if exists hcmut_ssps;
create database hcmut_ssps;
use hcmut_ssps;

create table user (
	id 			varchar(50) not null,
    ten 		varchar(50) not null,
    ngay_dk 	varchar(50) not null,
    email 		varchar(50) not null,
    password 	varchar(128) not null,
    role		varchar(50) not null default 'SV',
    primary 	key (id)
);

create table nhat_ky (
	id			int not null auto_increment,
	uid			varchar(50) not null,
    thoi_gian	varchar(50) not null,
    noi_dung	varchar(255) not null,
    primary key(id),
    foreign key(uid) references user(id)
);

create table sspo (
	id			varchar(50),
    primary key(id)
);

create table sinh_vien (
	id 			varchar(20) not null,		/*MSSV*/
    trang_thai	boolean not null default true,
    so_giay_con int not null default 0,
    primary key(id),
    foreign key(id) references user(id)
);

create table don_mua (
	ma_don_mua 	varchar(50) not null,
    so_trang 	int not null,
    thoi_gian	date not null,
    id			varchar(50) not null,
    primary key(id, ma_don_mua),
    foreign key(id) references sinh_vien(id)    
);

create table may_in (
	ma_may_in	varchar(50) not null,
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
	ma_don_in	varchar(50) not null,
    trang_thai_don_in	boolean not null default false,
    primary key(ma_don_in)
);

create table in_tai_lieu (
	id		varchar(50) not null,
    ma_may_in	varchar(50) not null,
    ma_don_in	varchar(50) not null,
    tg_bat_dau 	datetime not null,
    tg_ket_thuc datetime not null,
    primary key(id, ma_may_in, ma_don_in),
    foreign key(id) references sinh_vien(id),
    foreign key(ma_may_in) references may_in(ma_may_in),
    foreign key(ma_don_in) references don_in(ma_don_in)
);

create table he_thong (
	ma_hoc_ki	varchar(50) not null,
	gia 		int not null default 500,
    so_giay_mac_dinh	int not null default 50,
    ngay_cap_nhat		date not null,
    primary key(ma_hoc_ki)
);

create table loai_tep_chap_nhan (
	ma_hoc_ki 	varchar(50) not null,
    loai_tep	varchar(50) not null,
    primary key(ma_hoc_ki, loai_tep),
    foreign key(ma_hoc_ki) references he_thong(ma_hoc_ki)
);

create table tep (
	ma_tep		varchar(50) not null,
    ten_tep		varchar(50) not null,
    loai_tep	varchar(50) not null,
    duong_dan   varchar(255) not null,
    so_trang    int not null,
	primary key(ma_tep)
);

create table so_huu ( 		/* SV so huu tep */
	id		varchar(50) not null,
    ma_tep	varchar(50) not null,
    primary key(id, ma_tep),
    foreign key(id) references sinh_vien(id),
    foreign key(ma_tep) references tep(ma_tep)
);

create table xac_nhan (		/* SSPO xac nhan Don in*/
	id		varchar(50) not null,
    ma_don_in	varchar(50) not null,
    primary key(id, ma_don_in),
    foreign key(id) references sspo(id),
    foreign key(ma_don_in) references don_in(ma_don_in)
);

create table don_in_gom_tep (
	ma_don_in	varchar(50) not null,
	ma_tep		varchar(50) not null,
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
	id			varchar(50) not null,
    ma_hoc_ki	varchar(50) not null,
    ghi_chu		varchar(500) not null default 'Cau hinh he thong',
    primary key(id, ma_hoc_ki),
    foreign key(id) references sspo(id),
    foreign key(ma_hoc_ki) references he_thong(ma_hoc_ki)
);