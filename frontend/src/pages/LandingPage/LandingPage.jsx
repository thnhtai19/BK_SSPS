import React, { useState } from 'react';
import {
  WrapperFooter,
  WrapperHeader,
  WrapperMain,
  WrapperLogo,
  WrapperButton,
  WrapperMainHeader,
  WrapperRightHeader,
  HamburgerIcon,
  MobileMenu,
  WrapperMainRight,
  WrapperMainLeft,
  WrapperMainIntro,
  WrapperMain2,
  WrapperMain3,
  WrapperButtonText
} from './style';
import logo from '../../assets/logocnpm.png';
import printer from '../../assets/printer.png';
import work from '../../assets/work.png'
import upload from '../../assets/upload.png'
import edit from '../../assets/pen.png'
import verified from '../../assets/verified.png'
import bg01 from '../../assets/01.png'
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { Link } from "react-router-dom";

const LandingPage = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  return (
    <HelmetProvider>
      <Helmet>
        <title>Dịch vụ in ấn thông minh - BK SSPS</title>
      </Helmet>
      <WrapperHeader>
        <div className='container'>
          <Link to={'/home'} style={{ textDecoration: "none" }}>
            <WrapperLogo>
              <img src={logo} alt='logo' width="45px" />
              <div style={{ fontSize: '23px', fontWeight: 'bold', color: '#0688B4' }}>
                BK SSPS
              </div>
            </WrapperLogo>
          </Link>
          <WrapperMainHeader className={isMenuOpen ? 'open' : ''}>
            <Link to={'/home'}>
              <WrapperButtonText>Trang Chủ</WrapperButtonText>
            </Link>
            <Link to={'/#'}>
              <WrapperButtonText>Giới Thiệu</WrapperButtonText>
            </Link>
            <WrapperButtonText>Dịch Vụ</WrapperButtonText>
            <WrapperButtonText>Liên Hệ</WrapperButtonText>
          </WrapperMainHeader>
          <WrapperRightHeader>
            <Link to={'/auth/login'} style={{ textDecoration: "none" }}>
              <WrapperButtonText>
                Đăng Nhập
              </WrapperButtonText>
            </Link>
            <Link to={'/auth/register'} style={{ textDecoration: "none" }}>
              <WrapperButton>
                Đăng Ký
              </WrapperButton>
            </Link>
          </WrapperRightHeader>
          <HamburgerIcon onClick={toggleMenu}>
            <div></div>
            <div></div>
            <div></div>
          </HamburgerIcon>
          {isMenuOpen && (
            <MobileMenu>
              <Link to={'/home'}>
                <WrapperButtonText>Trang Chủ</WrapperButtonText>
              </Link>
              <WrapperButtonText>Giới Thiệu</WrapperButtonText>
              <WrapperButtonText>Dịch Vụ</WrapperButtonText>
              <WrapperButtonText>Liên Hệ</WrapperButtonText>
              <WrapperButtonText>Đăng Ký</WrapperButtonText>
              <WrapperButtonText>Đăng Nhập</WrapperButtonText>
            </MobileMenu>
          )}
        </div>
      </WrapperHeader>
      <WrapperMain>
        <div className='container'>
          <WrapperMainIntro>
            <WrapperMainLeft>
              <div className='main-text'>
                DỊCH VỤ IN ẤN THÔNG MINH DÀNH CHO SINH VIÊN ĐẠI HỌC <span style={{ color: '#0688B4' }}>BÁCH KHOA</span>
              </div>
              <div className='title-text'>
                #1 TRONG LĨNH VỰC IN ĐƯỢC SINH VIÊN TIN DÙNG
              </div>
              <div className='small-text'>
                Hệ thống được phát triển dựa trên nhu cầu sử dụng của sinh viên toàn trường. Chúng tôi luôn mang lại trải nghiệm tốt nhất cho sinh viên.
              </div>
              <div className='button-text'>
                <Link to={'/home'} style={{ textDecoration: "none" }}>
                  <WrapperButton style={{ fontSize: '15px', padding: '15px 25px' }}>
                    Bắt Đầu Ngay
                  </WrapperButton>
                </Link>
              </div>
            </WrapperMainLeft>
            <WrapperMainRight>
              <div className='img-print'>
                <img src={work} alt='printer' />
              </div>
            </WrapperMainRight>
          </WrapperMainIntro>
        </div>
      </WrapperMain>
      <WrapperMain2>
        <div className='container'>
          <div>
            <div className='extend-title'>
              QUY TRÌNH HOẠT ĐỘNG
            </div>
            <div className='extend-card-container'>
              <div className='extend-card'>
                <img src={printer} alt='printer' width="50px" />
                <div className='title'>
                  Chọn máy in
                </div>
                <div className='content'>
                  Hệ thống máy in của chúng tôi có khắp nơi trên khuôn viên trường.
                </div>
              </div>
              <div className='extend-card'>
                <img src={upload} alt='printer' width="50px" />
                <div className='title'>
                  Tải tệp lên
                </div>
                <div className='content'>
                  Tải lên các tài liệu của bạn với một số định dạng chúng tôi cho phép.
                </div>
              </div>
              <div className='extend-card'>
                <img src={edit} alt='printer' width="50px" />
                <div className='title'>
                  Chỉnh sửa
                </div>
                <div className='content'>
                  Chỉnh sửa các thuộc tính như kích thước, số trang,...
                </div>
              </div>
              <div className='extend-card'>
                <img src={verified} alt='printer' width="50px" />
                <div className='title'>
                  Nhận bản in
                </div>
                <div className='content'>
                  Quá trình in được tiến hành và bạn sẽ nhận được bản in ngay lập tức.
                </div>
              </div>
            </div>
          </div>
        </div>
      </WrapperMain2>
      <WrapperMain3>
        <div className='maincontainer'>
          <div className='container'>
            <div className='left'>
              <div className='title'>Bạn còn chờ đợi gì nữa?</div>
              <div className='small-text'>Hãy sử dụng thử dịch vụ của chúng tôi nhé.</div>
              <div className='button-area'>
                <Link to={'/auth/login'} style={{ textDecoration: "none" }}>
                  <WrapperButton style={{ padding: '15px 25px' }}>
                    Đăng Nhập
                  </WrapperButton>
                </Link>
                <Link to={'/auth/register'} style={{ textDecoration: "none" }}>
                  <WrapperButton style={{ padding: '15px 25px' }}>
                    Đăng Ký
                  </WrapperButton>
                </Link>
              </div>
            </div>
            <div className='right'>
              <img src={bg01} alt='bg01' width="60%" />
            </div>
          </div>
        </div>
      </WrapperMain3>
      <WrapperFooter>
        <div>
          © 2024 bkssps.vn - All Rights Reserved.
        </div>
      </WrapperFooter>
    </HelmetProvider>
  )
}

export default LandingPage;
