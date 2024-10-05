import check from '../../assets/check.png';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { message, Spin } from 'antd';

const BuySuccessPage = () => {
  const searchParams = new URLSearchParams(window.location.search);
  const orderId = searchParams.get('orderCode');
  const status = searchParams.get('status');
  const navigate = useNavigate();
  const pageAmount = localStorage.getItem('pageAmount');
  const [loading, setLoading] = useState(false);

  const apiUrl = process.env.REACT_APP_API_URL;

  useEffect(() => {
    console.log(orderId)
    if (status === 'CANCELLED') {
      const cancelOrder = async () => {
        window.location.href = '/buy/error'
        return
      };
      cancelOrder();
    } else if (status === 'PAID') {
      console.log('hehe')
      const checkorder = async () => {
        setLoading(true);
        try {
          //check xem đã pay chua
          const res = await axios.get(`${apiUrl}payment/get_payment/${orderId}`);
          if (res.data && res.data.status !== 'PAID') {
            window.location.href = '/buy/error'
            return
          }else if(res.data && res.data.status === 'PAID') {
            // cập nhật đơn mua
            try {
              const response = await axios.post(`${apiUrl}user/buy`, {
                pagesNumber: pageAmount,
              }, {
                headers: {
                  'Content-Type': 'application/json',
                },
                withCredentials: true,
              });
              if(response.data.message !== "Mua thành công!"){
                message.error("Đã xảy ra lỗi hãy liên hệ admin")
                window.location.href = '/buy/error'
                return
              }
            } catch (error) {
              message.error("Đã xảy ra lỗi hãy liên hệ admin")
              window.location.href = '/buy/error'
              return
            }
          }
          setLoading(false);
        } catch (error) {
          message.error("Đã xảy ra lỗi hãy liên hệ admin")
          window.location.href = '/buy/error'
          return
        }
      };
      checkorder();
    }
  }, [status, orderId, pageAmount, apiUrl]);


  return (
    <>
      {loading ? (
        <Spin
          size="large"
          style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}
        />
      ) : (

        <div className="mt-16 text-center">
          <div>
            <img className="h-16 w-16 mx-auto mb-4" src={check} alt="success" />
            <h2 className="text-2xl font-bold text-[#006688]">Thanh toán thành công!</h2>
            <p className="mt-6 mb-12 h-8 w-400 mx-auto">
              Cảm ơn bạn đã sử dụng dịch vụ của chúng tôi, bạn đã được cộng số trang in vào trong tài khoản!
            </p>
          </div>
          <div className="mt-6 space-x-4">
            <button onClick={() => navigate("/buy")} className="px-4 py-2 bg-white text-[#444444] font-semibold rounded-md hover:bg-[#cac9c9]">
              Mua thêm trang
            </button>
            <button className="px-4 py-2 bg-[#0688B4] text-white font-semibold rounded-md hover:bg-[#0b6986]">
              In tài liệu
            </button>
          </div>
        </div>
      )}
    </>
  )
}

export default BuySuccessPage