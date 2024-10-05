import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Table } from "antd";
import { RightOutlined } from '@ant-design/icons';
import FormInput from "../../components/FormInputComponent/FormInput";
import { message, Spin } from 'antd';
import axios from 'axios';

const columns = [
  {
    title: 'ID',
    dataIndex: 'ID',
    key: 'ID',
  },
  {
    title: 'Thời gian',
    dataIndex: 'thoi_gian',
    key: 'thoi_gian',
  },
  {
    title: 'Số trang',
    dataIndex: 'so_trang',
    key: 'so_trang',
  },
];

const BuyPage = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [dataSource, setUserHis] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [totalAmount, setTotalAmount] = useState(0);
  const apiUrl = process.env.REACT_APP_API_URL;
  const apiUrl2 = process.env.REACT_APP_API_URL_FE;

  useEffect(() => {
    const fetchUserProfile = async () => {
      setLoading(true)
      try {
        const response = await fetch(`${apiUrl}user/profile`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          },
          credentials: 'include',
        });
  
        const data = await response.json();
        console.log(data);
  
        if (response.ok) {
          setUserInfo(data);
        } else {
          //setErrorMessage(data.message || 'Failed to fetch user profile');
          message.error("Vui lòng đăng nhập!")
          navigate("/auth/login");
        }
      } catch (error) {
        //setErrorMessage('Lỗi kết nối đến server');
        console.error('Lỗi:', error);
      } finally {
        setLoading(false);
      }
    };
    const gethis = async () => {
      setLoading(true)
      try {
        const response = await fetch(`${apiUrl}user/ls_mua`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          },
          credentials: 'include',
        });
  
        const data = await response.json();
  
        if (response.ok) {
          setUserHis(data.message);
          console.log(data.message)
        } else {
          //setErrorMessage(data.message || 'Failed to fetch user profile');
          //message.error("Vui lòng đăng nhập!")
        }
      } catch (error) {
        //setErrorMessage('Lỗi kết nối đến server');
        console.error('Lỗi:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchUserProfile();
    gethis();
  }, [apiUrl,navigate]);


  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsProcessing(true);
    localStorage.setItem("pageAmount", totalAmount);
    const orderId = Math.floor(Date.now() / 1000); 
    const load = {
        orderCode: orderId,
        amount: totalAmount,
        description: "Thanh toán BKSSPS",
        buyerName:  userInfo.ten,
        buyerEmail: userInfo.email,
        cancelUrl: `${apiUrl2}buy/error`,
        returnUrl: `${apiUrl2}buy/success`,
    };
  
    try {
        const res = await axios.post(`${apiUrl}payment/create_payment`, load);
        setIsProcessing(false)
        if (res.data && res.data.checkoutUrl) {
            window.location.href = res.data.checkoutUrl;
        } else {
            message.error("Thanh toán hiện không khả dụng, vui lòng thanh toán sau!");
        }
    } catch (error) {
        message.error("Thanh toán hiện không khả dụng, vui lòng thanh toán sau!");
    }
  };

  return (
    <div>
      <p className="px-5">bkssps.vn <RightOutlined /> Mua thêm trang</p>
      {loading ? (
        <Spin
          size="large"
          style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}
        />
      ) : (
        <div>
          <div className="flex flex-wrap justify-evenly">
            {/* Thông tin thanh toán cho việc mua thêm trang */}
            <section className="h-auto w-full md:w-[45%]  my-12 mx-5 p-8 border border-solid rounded-2xl bg-white shadow-lg shadow-[#e4d8d8]">
              <form onSubmit={handleSubmit}>
                <legend className="font-bold text-xl mb-2">Mua thêm trang</legend>
                <fieldset className="space-y-6"> {/* Khoảng cách giữa các label */}
                  <FormInput
                    ID={"mssv"}
                    Type={"text"}
                    Text={"Mã số sinh viên"}
                    Placeholder={userInfo ? userInfo.id : ""}
                    disabled={true}
                  />
                  <FormInput
                    ID={"full-name"}
                    Type={"text"}
                    Text={"Họ và tên"}
                    Placeholder={userInfo ? userInfo.ten : ""}
                    disabled={true}
                  />
                  <FormInput
                    ID={"amount-to-buy"}
                    Type={"number"}
                    Text={"Số trang mua"}
                    Placeholder={"Nhập số trang cần mua"}
                    onChange={(value) => setTotalAmount(Number(value))}
                  />
                </fieldset>

                <button
                  type="submit"
                  className="w-full mt-6 px-4 py-2 shadow-lg shadow-cyan-500/50 bg-[#0688B4] text-white font-semibold rounded-2xl hover:bg-[#046e92] focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
                >
                  {isProcessing ? "Đang xử lý..." : "Thanh toán"}
                </button>
              </form>
            </section>

            {/* Lịch sử giao dịch */}
            <section className="h-auto w-full md:w-[45%] my-12 mx-5 p-8 border border-solid rounded-2xl bg-white shadow-lg shadow-[#e4d8d8]">
              <p className="font-bold text-xl mb-2">Lịch sử mua trang</p>
              <Table
                dataSource={dataSource}
                columns={columns}
                pagination={{ pageSize: 5 }}
              />

            </section>

          </div>
        </div>
      )}
    </div>
  );
}

export default BuyPage;