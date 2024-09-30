import { RightOutlined } from '@ant-design/icons';
import { Select } from "antd";
import React from "react";
import { Button, ConfigProvider } from "antd";
import FormInput from "../../components/FormInputComponent/FormInput";

const { Option } = Select;
const AdminSystemSettingPage = () => {

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

					<FormInput 
						ID={"page-number"}
						Type={"text"}
						Value={"100"}
						Text={"Số trang mặc định"}
					/>
					<FormInput 
						ID={"date"}
						Type={"number"}
						Value={"1"}
						Text={"Ngày reset số trang"}
					/>
					<FormInput 
						ID={"format"}
						Type={"text"}
						Value={".pdf, .doc"}
						Text={"Chấp nhận định dạng"}
					/>
					<FormInput 
						ID={"price"}
						Type={"text"}
						Value={"500 vnđ"}
						Text={"Giá mỗi trang in mua thêm"}
					/>
          
					<div className="flex flex-col">
            <label htmlFor="referrer" className="text-gray-700 mb-1 font-medium">Bảo trì hệ thống</label>		
						<ConfigProvider 
							theme={{
								token: {
									colorBgContainer: '#f3f4f6',
									colorText: '#444444',
								},
							}}
						>
							<Select
								id="referrer"
								defaultValue=""
								onChange={handleChange}
								placeholder="(chọn trạng thái)"
								dropdownStyle={{ maxHeight: 200, overflow: 'auto' }}
								className="w-full h-10 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
							>
								<Option value="">(chọn trạng thái)</Option>
								<Option value="1">Đang tắt</Option>
								<Option value="2">Đang bật</Option>
							</Select>
						</ConfigProvider>
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

					<FormInput 
						ID={"term"}
						Type={"text"}
						Value={"HK241"}
						Text={"Học kỳ hiện tại"}
					/>

					<FormInput 
						ID={"newTerm"}
						Type={"text"}
						Value={""}
						Text={"Thêm học kỳ mới"}
						Placeholder="Nhập tên học kỳ"
					/>

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


