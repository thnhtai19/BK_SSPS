import React, { useEffect, useState } from 'react'
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { message, Spin } from 'antd';
import {
    WrapperContainer
} from './style'
import phone from '../../assets/telephone.png';
import email from '../../assets/mail.png';

const SupportPage = () => {
    const apiUrl = process.env.REACT_APP_API_URL;
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const gethis = async () => {
            setLoading(true);
            try {
                const response = await fetch(`${apiUrl}auth/check`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    credentials: 'include',
                });

                const data = await response.json();
                if (data.message === 'Người dùng chưa đăng nhập') {
                    navigate('/auth/login');
                    return;
                }
            } catch (error) {
                console.error('Lỗi:', error);
                message.error('Đã xảy ra lỗi trong quá trình lấy dữ liệu!');
            } finally {
                setLoading(false);
            }
        };
        gethis();
    }, [apiUrl, navigate]);

    return (
        <HelmetProvider>
            <Helmet>
                <title>Hỗ trợ - BK SSPS</title>
            </Helmet>
            {loading ? (
                <Spin
                    size='large'
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        minHeight: '100vh',
                    }}
                />
            ) : (
                <WrapperContainer>
                    <div className='wrap-text'>bkssps.vn &gt; Hỗ trợ</div>
                    <div className='wrap-card-area'>
                        <div className='wrap-card-container'>
                            <div className='wrap-left-card'>
                                <img src={phone} alt='printer' width="70px" />
                            </div>
                            <div className='wrap-right-card'>
                                <div className='wrap-text-bold'>
                                    Hỗ trợ kỹ thuật
                                </div>
                                <div className='wrap-text-bold'>
                                    1900.0009
                                </div>
                            </div>
                        </div>
                        <div className='wrap-card-container'>
                            <div className='wrap-left-card'>
                                <img src={email} alt='printer' width="70px" />
                            </div>
                            <div className='wrap-right-card'>
                                <div className='wrap-text-bold'>
                                    Email
                                </div>
                                <div className='wrap-text-bold'>
                                    support@bkssps.vn
                                </div>
                            </div>
                        </div>
                    </div>
                </WrapperContainer>
            )}
        </HelmetProvider>
    )
}

export default SupportPage