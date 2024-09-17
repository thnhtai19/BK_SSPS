import { useState } from "react";

import { UnlockOutlined } from "@ant-design/icons";
import { Table } from "antd";

function MyAccount() {
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Age",
      dataIndex: "age",
    },
    {
      title: "Sex",
      dataIndex: "sex",
    },
    {
      title: "Address",
      dataIndex: "address",
    },
    {
      title: "Address",
      dataIndex: "address",
    },
  ];
  const dataSource = Array.from({
    length: 17,
  }).map((_, i) => ({
    key: i,
    name: `Edward King ${i}`,
    age: 32,
    sex: `Male ${i}`,
    address: `London, Park Lane no. ${i}`,
    address: `London, Park Lane no. ${i}`,
  }));

  return (
    <div className="sm:p-8 p-3 pt-0 text-[#444444]">
      {/* row top */}
      <div className="sm:flex block gap-12">
        {/* account's infor */}
        <div className="hidden sm:block flex-1  bg-white border-[2px] border-[#EFF1F3] p-6 mb-4 sm:mb-0 rounded-xl">
          <h3 className="text-lg font-medium mb-4">Thông tin tài khoản</h3>
          <div className="sm:flex block gap-4">
            {/* left column */}
            <div className="flex-1">
              <label>Họ và tên</label>
              <div className="mt-2 mb-4 bg-[#EFF1F3] border-[2px] px-4 py-1 rounded-xl">
                Trần Thành Tài
              </div>
              <label>Địa chỉ email</label>
              <div className="mt-2 mb-4 bg-[#EFF1F3] border-[2px] px-4 py-1 rounded-xl">
                tai.tranthanh@hcmut.edu.vn
              </div>
              <label>Số trang còn lại </label>
              <div className="mt-2 mb-4 bg-[#EFF1F3] border-[2px] px-4 py-1 rounded-xl">
                2210
              </div>
            </div>
            {/* right column */}
            <div className="flex-1">
              <label>Mã số sinh viên</label>
              <div className="mt-2 mb-4 bg-[#EFF1F3] border-[2px] px-4 py-1 rounded-xl">
                2213001
              </div>
              <label>Cấp bậc</label>
              <div className="mt-2 mb-4 bg-[#EFF1F3] border-[2px] px-4 py-1 rounded-xl">
                Người dùng
              </div>
              <label>Thời gian tham gia</label>
              <div className="mt-2 mb-4 bg-[#EFF1F3] border-[2px] px-4 py-1 rounded-xl">
                13-09-2024 00:00:00
              </div>
            </div>
          </div>
        </div>
        {/* change password */}
        <div className="hidden sm:flex  flex-1 flex-col  bg-white border-[2px] border-[#EFF1F3] p-6 rounded-xl">
          <h3 className="text-lg font-medium mb-4">Đổi mật khẩu</h3>
          <label>Mật khẩu cũ</label>
          <input
            type="text"
            placeholder="Nhập mật khẩu cũ"
            className="mt-2 mb-4 border-[2px] border-[#EFF1F3] py-1 px-4 rounded-xl"
          />
          <label>Mật khẩu mới</label>
          <input
            type="password"
            placeholder="Nhập mật khẩu mới"
            className="mt-2 mb-4 border-[2px] border-[#EFF1F3] py-1 px-4 rounded-xl"
          />
          <label>Xác nhận mật khẩu mới</label>
          <input
            type="password"
            placeholder="Nhập lại mật khẩu mới"
            className="mt-2 mb-4 border-[2px] border-[#EFF1F3] py-1 px-4 rounded-xl"
          />
          <button className="bg-[#0688B4] hover:shadow  hover:shadow-[#0688B4] rounded-xl text-white font-bold mt-3 py-2">
            <UnlockOutlined className="text-xl mr-2" />
            Thay đổi mật khẩu
          </button>
        </div>
      </div>
      {/* row bottom */}
      <div className="flex-1 flex flex-col mt-6  bg-white border-[2px] border-[#EFF1F3] p-6  rounded-xl">
        <h3 className="text-lg font-medium mb-4">Nhật ký hoạt động</h3>
        <div className="overflow-hidden  ">
          <Table columns={columns} dataSource={dataSource} />
        </div>
      </div>
    </div>
  );
}

export default MyAccount;
