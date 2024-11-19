import React from 'react';
import { WrapperContainer } from './style';
import logocnpm from '../../assets/logocnpm.png';
import user from '../../assets/user.png';
import home from '../../assets/dashboard.svg';
import myacc from '../../assets/personal-information.svg';
import print from '../../assets/proxy.svg';
import history from '../../assets/history-book.svg';
import report from '../../assets/documents.png'
import config from '../../assets/process.png'
import { useNavigate } from 'react-router-dom';

const SlidebarComponent = ({ curentpage }) => {
    const navigate = useNavigate();

    const handleRedirect = (path) => {
        navigate(path);
    }

    return (
        <WrapperContainer>
            <div>
                <div className='wrap-logo'>
                    <div className='wrap-logo-container' onClick={() => handleRedirect("admin/home")}>
                        <img src={logocnpm} alt='logo' width="40px" />
                        <div className='brand-name'>BK SSPS_Admin</div>
                    </div>
                </div>
                <div className='wrap-item-container'>
                    <div className={`wrap-item ${curentpage === 1 ? 'select-item' : ''}`} onClick={() => handleRedirect("admin/home")}>
                        <img src={home} alt='home' width="20px" />
                        <div>Trang chủ</div>
                    </div>
                    <div className={`wrap-item ${curentpage === 2 ? 'select-item' : ''}`} onClick={() => handleRedirect("admin/user-management")}>
                        <img src={myacc} alt='my-account' width="20px" />
                        <div>Quản lý người dùng</div>
                    </div>
                    <div className={`wrap-item ${curentpage === 3 ? 'select-item' : ''}`} onClick={() => handleRedirect("admin/printer-management")}>
                        <img src={print} alt='print' width="20px" />
                        <div>Quản lý máy in</div>
                    </div>
                    <div className={`wrap-item ${curentpage === 4 ? 'select-item' : ''}`} onClick={() => handleRedirect("admin/print-history")}>
                        <img src={history} alt='history' width="20px" />
                        <div>Lịch sử in</div>
                    </div>
                    <div className={`wrap-item ${curentpage === 5 ? 'select-item' : ''}`} onClick={() => handleRedirect("admin/usage-reports")}>
                        <img src={report} alt='buy-more' width="20px" />
                        <div>Báo cáo sử dụng</div>
                    </div>
                    <div className={`wrap-item ${curentpage === 6 ? 'select-item' : ''}`} onClick={() => handleRedirect("admin/system-settings")}>
                        <img src={config} alt='buy-more' width="20px" />
                        <div>Cấu hình hệ thống</div>
                    </div>
                </div>
            </div>
            <div className='wrap-user'>
                <div className='wrap-user-container'>
                    <img src={user} alt='user' width="40px" />
                    <div className='wrap-name'>
                        <div className='text-base font-bold'>{localStorage.getItem("name")}</div>
                        <div style={{ fontSize: '11px' }}>{localStorage.getItem("email")}</div>
                    </div>
                </div>
            </div>
        </WrapperContainer>
    );
};

export default SlidebarComponent;
