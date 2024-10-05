const UserInfo = ({ userInfo }) => {
	return (
		<>
			<div className="hidden sm:block flex-1  bg-white border-[2px] border-[#EFF1F3] p-6 mb-4 sm:mb-0 rounded-xl">
				<h3 className="text-lg font-medium mb-4">Thông tin tài khoản</h3>
				<div className="sm:flex block gap-4">
					{/* left column */}
					<div className="flex-1">
						<label>Họ và tên</label>
						<div className="mt-2 mb-4 bg-[#EFF1F3] border-[2px] px-4 py-1 rounded-xl">
							{userInfo.ten}
						</div>
						<label>Địa chỉ email</label>
						<div className="mt-2 mb-4 bg-[#EFF1F3] border-[2px] px-4 py-1 rounded-xl">
							{userInfo.email}
						</div>
						<label>Số trang còn lại </label>
						<div className="mt-2 mb-4 bg-[#EFF1F3] border-[2px] px-4 py-1 rounded-xl">
							{userInfo.so_giay_con}
						</div>
					</div>
					{/* right column */}
					<div className="flex-1">
						<label>Mã số sinh viên</label>
						<div className="mt-2 mb-4 bg-[#EFF1F3] border-[2px] px-4 py-1 rounded-xl">
							{userInfo.id}
						</div>
						<label>Cấp bậc</label>
						<div className="mt-2 mb-4 bg-[#EFF1F3] border-[2px] px-4 py-1 rounded-xl">
							{userInfo.role}
						</div>
						<label>Thời gian tham gia</label>
						<div className="mt-2 mb-4 bg-[#EFF1F3] border-[2px] px-4 py-1 rounded-xl">
							{userInfo.ngay_dk}
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

export default UserInfo;