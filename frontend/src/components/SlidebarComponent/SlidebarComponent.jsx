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

const SlidebarComponent = ({ curentpage }) => {
    return (
        <WrapperContainer>
            <div>
                <div className='wrap-logo'>
                    <div className='wrap-logo-container'>
                        <img src={logocnpm} alt='logo' width="40px" />
                        <div className='brand-name'>BK SSPS</div>
                    </div>
                </div>
                <div className='wrap-item-container'>
                    <div className={`wrap-item ${curentpage === '1' ? 'select-item' : ''}`}>
                        <img src={home} alt='home' width="20px" />
                        <div>Trang chủ</div>
                    </div>
                    <div className={`wrap-item ${curentpage === '2' ? 'select-item' : ''}`}>
                        <img src={myacc} alt='my-account' width="20px" />
                        <div>Tài khoản của tôi</div>
                    </div>
                    <div className={`wrap-item ${curentpage === '3' ? 'select-item' : ''}`}>
                        <img src={print} alt='print' width="20px" />
                        <div>In tài liệu</div>
                    </div>
                    <div className={`wrap-item ${curentpage === '4' ? 'select-item' : ''}`}>
                        <img src={history} alt='history' width="20px" />
                        <div>Lịch sử in</div>
                    </div>
                    <div className={`wrap-item ${curentpage === '5' ? 'select-item' : ''}`}>
                        <img src={buymore} alt='buy-more' width="20px" />
                        <div>Mua thêm giấy</div>
                    </div>
                    <div className={`wrap-item ${curentpage === '6' ? 'select-item' : ''}`}>
                        <img src={contact} alt='contact' width="20px" />
                        <div>Hỗ trợ</div>
                    </div>
                </div>
            </div>
            <div className='wrap-user'>
                <div className='wrap-user-container'>
                    <img src={user} alt='user' width="40px" />
                    <div className='wrap-name'>
                        <div className='text-base font-bold'>Trần Thành Tài</div>
                        <div style={{ fontSize: '11px' }}>tai.tranthanh@hcmut.edu.vn</div>
                    </div>
                </div>
            </div>
        </WrapperContainer>
    );
};

export default SlidebarComponent;
