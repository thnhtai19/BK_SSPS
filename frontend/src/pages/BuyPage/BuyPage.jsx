import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Table } from "antd";
import { RightOutlined } from '@ant-design/icons';
import FormInput from "../../components/FormInputComponent/FormInput";

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
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsProcessing(true);

    // Giả lập kết quả giao dịch
    setTimeout(() => {
      const isSuccess = Math.random() > 0.5;

      if (isSuccess) {
        navigate("/buy/success");
      } else {
        navigate("/buy/error");
      }
    }, 1000);
  };

  return (
    <>
      <p className="px-5">bkssps.vn <RightOutlined /> Mua thêm trang</p>
        <div className="flex flex-wrap justify-evenly">
          {/* Thông tin thanh toán cho việc mua thêm trang */}
            <section className="h-auto w-full md:w-[40%]  my-12 mx-5 p-8 border border-solid rounded-2xl bg-white shadow-lg shadow-[#e4d8d8]">
                <form onSubmit={handleSubmit}>
                  <legend className="font-bold text-xl mb-2">Mua thêm trang</legend>
                  <fieldset className="space-y-6"> {/* Khoảng cách giữa các label */}
                    <FormInput 
                      ID={"mssv"}
                      Type={"text"}
                      Text={"Mã số sinh viên"}
                      Placeholder={"Nhập MSSV"}
                    />
                    <FormInput 
                      ID={"full-name"}
                      Type={"text"}
                      Text={"Họ và tên"}
                      Placeholder={"Nhập tên sinh viên"}
                    />
                    <FormInput 
                      ID={"amount-to-buy"}
                      Type={"password"}
                      Text={"Số trang mua"}
                      Placeholder={"Nhập số trang cần mua"}
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
            <section className="h-auto w-full md:w-[40%] my-12 mx-5 p-8 border border-solid rounded-2xl bg-white shadow-lg shadow-[#e4d8d8]">
              <p className="font-bold text-xl mb-2">Lịch sử mua trang</p>
              <Table 
                dataSource={dataSource} 
                columns={columns}
                pagination={{ pageSize: 5 }} 
              />;

            </section>

        </div>
    </>
  );
}

export default BuyPage;