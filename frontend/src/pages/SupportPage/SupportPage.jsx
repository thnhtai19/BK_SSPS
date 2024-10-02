import React from 'react'
import { Helmet, HelmetProvider } from 'react-helmet-async';
import {
    WrapperContainer
} from './style'
import phone from '../../assets/telephone.png';
import email from '../../assets/mail.png';

const SupportPage = () => {
    return (
        <HelmetProvider>
            <Helmet>
                <title>Hỗ trợ - BK SSPS</title>
            </Helmet>
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
        </HelmetProvider>
    )
}

export default SupportPage