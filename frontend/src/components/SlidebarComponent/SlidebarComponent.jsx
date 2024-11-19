import React from 'react';
import { WrapperContainer } from './style';
import logocnpm from '../../assets/logocnpm.png';
import user from '../../assets/user.png';
import home from '../../assets/dashboard.svg';
import myacc from '../../assets/personal-information.svg';
import print from '../../assets/proxy.svg';
import history from '../../assets/history-book.svg';
import buymore from '../../assets/store.png';
import contact from '../../assets/chat.png';
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
                    <div className='wrap-logo-container' onClick={() => handleRedirect("home")}>
                        <img src={logocnpm} alt='logo' width="40px" />
                        <div className='brand-name'>BK SSPS</div>
                    </div>
                </div>
                <div className='wrap-item-container'>
                    <div className={`wrap-item ${curentpage === 1 ? 'select-item' : ''}`} onClick={() => handleRedirect("home")}>
                        <img src={home} alt='home' width="20px" />
                        <div>Trang chủ</div>
                    </div>
                    <div className={`wrap-item ${curentpage === 2 ? 'select-item' : ''}`} onClick={() => handleRedirect("myaccount")}>
                        <img src={myacc} alt='my-account' width="20px" />
                        <div>Tài khoản của tôi</div>
                    </div>
                    <div className={`wrap-item ${curentpage === 3 ? 'select-item' : ''}`} onClick={() => handleRedirect("service")}>
                        <img src={print} alt='print' width="20px" />
                        <div>In tài liệu</div>
                    </div>
                    <div className={`wrap-item ${curentpage === 4 ? 'select-item' : ''}`} onClick={() => handleRedirect("history")}>
                        <img src={history} alt='history' width="20px" />
                        <div>Lịch sử in</div>
                    </div>
                    <div className={`wrap-item ${curentpage === 5 ? 'select-item' : ''}`} onClick={() => handleRedirect("buy")}>
                        <img src={buymore} alt='buy-more' width="20px" />
                        <div>Mua thêm trang</div>
                    </div>
                    <div className={`wrap-item ${curentpage === 6 ? 'select-item' : ''}`} onClick={() => handleRedirect("support")}>
                        <img src={contact} alt='contact' width="20px" />
                        <div>Hỗ trợ</div>
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
