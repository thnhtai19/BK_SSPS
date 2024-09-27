import { UnlockOutlined } from "@ant-design/icons";
import React, { useState } from 'react';

const ChangePassword = () => {
	const [currentPassword, setCurrentPassword] = useState('');
	const [newPassword, setNewPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [message, setMessage] = useState('');

	const handleSubmit = async (e) => {
		e.preventDefault();
	
		if (!currentPassword || !newPassword || !confirmPassword) {
			setMessage('Vui lòng điền đầy đủ thông tin.');
			return;
		}

		if (newPassword !== confirmPassword) {
		  setMessage('Mật khẩu xác nhận không khớp.');
		  return;
		}

		try {
		  const response = await fetch('http://localhost:3001/auth/change_password', {
			method: 'POST',
			headers: {
			  'Content-Type': 'application/json',
			},
			body: JSON.stringify({
			  email: 'student03@hcmut.edu.vn',
			  currentPassword: currentPassword,
			  newPassword: newPassword,
			}),
		  });
	
		  const data = await response.json();
	
		  if (data.status) {
            if (data.newAccount.password) {
                setMessage('Đổi mật khẩu thành công!');
            } else if (data.newAccount.status === false) {
                setMessage(data.newAccount.message);
            }
        } else {
            setMessage('Đã xảy ra lỗi không xác định.');
        }
		} catch (error) {
		  setMessage('Không thể kết nối đến máy chủ.');
		}
	  };
	return (
		<>
          <h3 className="text-lg font-medium mb-4">Đổi mật khẩu</h3>
		  <form onSubmit={handleSubmit} className="hidden sm:flex  flex-1 flex-col  bg-white border-[2px] border-[#EFF1F3] p-6 rounded-xl">
			<label>Mật khẩu cũ</label>
			<input
				type="text"
				placeholder="Nhập mật khẩu cũ"
				value={currentPassword}
				onChange={(e) => setCurrentPassword(e.target.value)}
				className="mt-2 mb-4 border-[2px] border-[#EFF1F3] py-1 px-4 rounded-xl"
			/>
			<label>Mật khẩu mới</label>
			<input
				type="password"
				placeholder="Nhập mật khẩu mới"
				value={newPassword}
				onChange={(e) => setNewPassword(e.target.value)}
				className="mt-2 mb-4 border-[2px] border-[#EFF1F3] py-1 px-4 rounded-xl"
			/>
			<label>Xác nhận mật khẩu mới</label>
			<input
				type="password"
				placeholder="Nhập lại mật khẩu mới"
				value={confirmPassword}
				onChange={(e) => setConfirmPassword(e.target.value)}
				className="mt-2 mb-4 border-[2px] border-[#EFF1F3] py-1 px-4 rounded-xl"
			/>
			<button 
				className="bg-[#0688B4] hover:shadow  hover:shadow-[#0688B4] rounded-xl text-white font-bold mt-3 py-2"
				type="submit"
			>
				<UnlockOutlined className="text-xl mr-2" />
				Thay đổi mật khẩu
			</button>
			</form>

			{message && <p className="text-red-500 mt-4 m-auto">{message}</p>}
		</>
	)
}

export default ChangePassword;