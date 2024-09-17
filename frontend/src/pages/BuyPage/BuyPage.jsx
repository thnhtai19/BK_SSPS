import React, { useState } from 'react';
import BuySuccessPage from '../BuySuccessPage/BuySuccessPage';
import BuyFailPage from '../BuyFailPage/BuyFailPage';
import { Table } from "antd";
import { RightOutlined } from '@ant-design/icons';

const dataSource = [
  
];

while (dataSource.length < 5) {
  dataSource.push({ key: `empty-${dataSource.length + 1}`, id: '', time: '', pageAmount: '' });
}

const columns = [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: 'Thời gian',
    dataIndex: 'time',
    key: 'time',
  },
  {
    title: 'Số trang',
    dataIndex: 'pageAmount',
    key: 'pageAmount',
  },
];

const BuyPage = () =>{
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(null); // null = chưa có kết quả, true = thành công, false = thất bại

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsPopupOpen(true); // Mở popup khi nhấn "Thanh toán"
  };

  const handleConfirm = () => {
    // Giả sử thực hiện giao dịch thành công hoặc thất bại ngẫu nhiên (sẽ thêm điều kiện cụ thể sau)
    const success = Math.random() > 0.5;
    setIsSuccess(success);
    setIsPopupOpen(false); // Đóng popup sau khi xác nhận
  };

  const handleRetry = () => {
    setIsSuccess(null); // Reset về trạng thái ban đầu
  };

  return (
    <>
      <p className="px-5">bkssps.vn <RightOutlined /> Mua thêm trang</p>
        {isSuccess === null && (
          <div className="flex flex-wrap justify-evenly	">
            {/* Thông tin thanh toán cho việc mua thêm trang */}
              <section className="flex-none h-auto w-480 my-12 mx-5 p-8 border border-solid rounded-2xl bg-white shadow-lg shadow-[#e4d8d8]">
                  <form onSubmit={handleSubmit}>
                    <fieldset className="space-y-6"> {/* Khoảng cách giữa các label */}
                      <legend className="font-bold text-xl mb-2">Mua thêm trang</legend>
                      
                      <label className="block">
                        <span className="block text-sm font-medium text-gray-700 mb-2">Mã số sinh viên</span>
                        <input
                          type="text"
                          placeholder="Nhập MSSV"
                          className="w-full h-10 px-3 bg-[#f2efef] rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                      </label>

                      <label className="block">
                        <span className="block text-sm font-medium text-gray-700 mb-2">Họ và tên</span>
                        <input
                          type="text"
                          placeholder="Nhập tên sinh viên"
                          className="w-full h-10 px-3 bg-[#f2efef] rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                      </label>

                      <label className="block">
                        <span className="block text-sm font-medium text-gray-700 mb-2">Số trang mua</span>
                        <input
                          type="text"
                          placeholder="Nhập số trang cần mua"
                          className="w-full h-10 px-3 bg-[#f2efef] rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                      </label>
                    </fieldset>

                    <button
                      type="submit"
                      className="w-full mt-6 px-4 py-2 shadow-lg shadow-cyan-500/50 bg-[#0688B4] text-white font-semibold rounded-2xl hover:bg-[#046e92] focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
                    >
                      Thanh toán
                    </button>
                  </form>
              </section>

              {/* Lịch sử giao dịch */}
              <section className="flex-none h-auto w-480 my-12 mx-5 p-8 border border-solid rounded-2xl bg-white shadow-lg shadow-[#e4d8d8]">
                <p className="font-bold text-xl mb-2">Lịch sử mua trang</p>
                <Table 
                  dataSource={dataSource} 
                  columns={columns}
                  pagination={{ pageSize: 5 }} 
                />;

              </section>

          </div>
        )}

        {/* Popup xác nhận thanh toán */}
        {isPopupOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
              <h3 className="text-lg font-bold mb-4">Xác nhận thanh toán</h3>
              <p>Bạn có chắc chắn muốn thanh toán với các thông tin này?</p>
              <div className="mt-6 flex justify-end space-x-4">
                <button onClick={handleConfirm} className="px-4 py-2 bg-green-500 text-white font-semibold rounded-md hover:bg-green-600">
                  Xác nhận
                </button>
                <button onClick={() => setIsPopupOpen(false)} className="px-4 py-2 bg-red-500 text-white font-semibold rounded-md hover:bg-red-600">
                  Hủy
                </button>
              </div>
            </div>
          </div>               
        )}  
          
        {/* Kết quả giao dịch */}
        {isSuccess !== null && (
          <div className="mt-16 text-center">
            {isSuccess ? (
              <BuySuccessPage isSuccess={isSuccess} onRetry={handleRetry} />
            ) : (
              <BuyFailPage isSuccess={isSuccess} onRetry={handleRetry} />
            )}
          </div>
        )}        
    </>
  );
}

export default BuyPage;