import { RightOutlined } from '@ant-design/icons';
import { Select } from "antd";
import React from "react";
import { Button } from "antd";

const AdminSystemSettingPage = () => {
	const { Option } = Select;

	const handleChange = (value) => {
		console.log(`Selected: ${value}`);
	};

	return (
		<>
		<p className="px-5">bkssps.vn <RightOutlined /> Admin <RightOutlined /> Cấu hình hệ thống</p>
    <div className="w-11/12 h-auto mx-auto mt-12 py-3 px-5 border border-solid rounded-2xl bg-white">
      <form className="grid grid-cols-1 sm:grid-cols-4 gap-6 mb-6">
			 	<legend className="font-bold text-xl">Cấu hình hệ thống</legend>
        <fieldset className="grid grid-cols-1 sm:grid-cols-4 gap-4 col-span-4">
          <div className="flex flex-col">
            <label htmlFor="page-number" className="text-gray-700 mb-1 font-medium">Số trang mặc định</label>
            <input 
              id="page-number" 
              type="text" 
              value="100" 
              className="w-full h-10 px-3 bg-gray-100 text-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="date" className="text-gray-700 mb-1 font-medium">Ngày reset số trang</label>
            <input 
              id="date" 
              type="number" 
              value="1" 
              className="w-full h-10 px-3 bg-gray-100 text-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="format" className="text-gray-700 mb-1 font-medium">Chấp nhận định dạng</label>
            <input 
              id="format" 
              type="text" 
              value=".pdf, .doc" 
              className="w-full h-10 px-3 bg-gray-100 text-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="price" className="text-gray-700 mb-1 font-medium">Giá mỗi trang in mua thêm</label>
            <input 
              id="price" 
              type="text" 
              value="500 vnđ" 
              className="w-full h-10 px-3 bg-gray-100 text-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          
					<div className="flex flex-col">
            <label htmlFor="referrer" className="text-gray-700 mb-1 font-medium">Bảo trì hệ thống</label>
            <Select
							id = "referrer"
							defaultValue=""
							style={{ backgroundColor: "#EFF1F3" }}
							onChange={handleChange}
							placeholder="(chọn trạng thái)"
							dropdownStyle={{ maxHeight: 200, overflow: 'auto' }}
							>
							<Option value="">(chọn trạng thái)</Option>
							<Option value="1">Đang tắt</Option>
							<Option value="2">Đang bật</Option>
						</Select>
						
          </div>
        </fieldset>

      </form>
			<div className="col-span-4 flex justify-end">
				<Button
					type="submit"
					className="w-32 bg-cyan-500 text-white font-semibold rounded-lg hover:bg-cyan-600 shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
				>
					Lưu
				</Button>
			</div>

			<form className="grid grid-cols-1 sm:grid-cols-4 gap-6 mb-6">
				<legend className="font-bold text-xl mb-2">Quản lí học kỳ</legend>
				<fieldset className="grid grid-cols-1 sm:grid-cols-4 gap-4 col-span-4">
          <div className="flex flex-col">
            <label htmlFor="term" className="text-gray-700 mb-1 font-medium">Học kỳ hiện tại</label>
            <input 
              id="term" 
							type="text"
							value="HK241"
							className="w-full h-10 px-3 bg-gray-100 text-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
						/>
          </div>
          
					<div className="flex flex-col">
            <label htmlFor="newTerm" className="text-gray-700 mb-1 font-medium">Thêm học kỳ mới</label>
            <input 
              id="newTerm" 
							type="text"
							value=""
							placeholder="Nhập tên học kỳ"
              className="w-full h-10 px-3 bg-gray-100 text-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
						/>
          </div>

				</fieldset>
			</form>
			<div className="col-span-4 flex justify-end">
				<Button
					type="submit"
					className="w-32 bg-cyan-500 text-white font-semibold rounded-lg hover:bg-cyan-600 shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
				>
					Lưu
				</Button>
			</div>
    </div>
		</>
  );
};

export default AdminSystemSettingPage;


