import { UnlockOutlined } from "@ant-design/icons";
import e from "cors";
import { useRef, useEffect } from "react";

function MyAccount() {
  const inforRef = useRef(null);
  const changePwRef = useRef(null);

  function showInfor() {
    if (inforRef.current.classList.contains("hidden")) {
      inforRef.current.classList.remove("hidden");
    } else {
      inforRef.current.classList.add("hidden");
    }
  }

  function showChangePw() {
    if (changePwRef.current.classList.contains("hidden")) {
      changePwRef.current.classList.remove("hidden");
      changePwRef.current.classList.add("flex");
    } else {
      changePwRef.current.classList.add("hidden");
      changePwRef.current.classList.remove("flex");
    }
  }

  return (
    <div className="sm:p-8 p-3 pt-0 text-[#444444]">
      {/* responsive */}
      <button
        onClick={showInfor}
        className="bg-[#0688B4] sm:hidden w-2/4  font-bold text-white px-3 py-1 mb-3 rounded-xl block "
      >
        Thông tin tài khoản
      </button>
      <button
        onClick={showChangePw}
        className="bg-[#0688B4] sm:hidden w-2/4  font-bold text-white px-3 py-1 mb-3 rounded-xl block "
      >
        Đổi mật khẩu
      </button>
      {/* row top */}
      <div className="sm:flex block gap-12">
        {/* account's infor */}
        <div
          ref={inforRef}
          className="hidden sm:block flex-1  bg-white border-[2px] border-[#EFF1F3] p-6 mb-4 sm:mb-0 rounded-xl"
        >
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
        <div
          ref={changePwRef}
          className="hidden sm:flex  flex-1 flex-col  bg-white border-[2px] border-[#EFF1F3] p-6 rounded-xl"
        >
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
        <table className=" ">
          <thead>
            <tr className="hidden sm:table-row">
              <th className="py-1  border border-slate-300">ID</th>
              <th className="py-1  border border-slate-300">Thời gian</th>
              <th className="py-1  border border-slate-300">Nội dung</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-y-2 border-slate-300">
              <td className="px-4  py-1 sm:border border-slate-300">2124848</td>
              <td className="px-4  py-1 sm:border border-slate-300">
                12-09-2024 00:00:00
              </td>
              <td className="px-4  py-1 sm:border border-slate-300">
                Đã đăng nhập tài khoản IP: 115.79.219.34
              </td>
            </tr>
            <tr className="border-y-2 border-slate-300">
              <td className="px-4  py-1 sm:border border-slate-300">2124848</td>
              <td className="px-4  py-1 sm:border border-slate-300">
                12-09-2024 00:00:00
              </td>
              <td className="px-4  py-1 sm:border border-slate-300">
                Đã đăng nhập tài khoản IP: 115.79.219.34
              </td>
            </tr>
            <tr className="border-y-2 border-slate-300">
              <td className="px-4  py-1 sm:border border-slate-300">2124848</td>
              <td className="px-4  py-1 sm:border border-slate-300">
                12-09-2024 00:00:00
              </td>
              <td className="px-4  py-1 sm:border border-slate-300">
                Đã đăng nhập tài khoản IP: 115.79.219.34
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default MyAccount;
