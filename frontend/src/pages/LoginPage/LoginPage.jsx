import { Link } from "react-router-dom";
import { EyeInvisibleOutlined } from "@ant-design/icons";

import imgLogin from "../../assets/image.png";

function Login() {
  return (
    <div className="flex p-11 justify-center items-center h-dvh">
      {/* column left */}
      <div className="flex-1 p-10 text-[#6F6F6F]   ">
        <h1 className="text-3xl text-black font-bold text-center">
          DỊCH VỤ XÁC THỰC HCMUT_SSO
        </h1>
        <p className="text-balance text-center mt-6">
          Xin mời bạn nhập đầy đủ thông tin đăng nhập. Sau đó bạn sẽ có quyền
          truy cập và sử dụng các dịch vụ của chúng tôi.
        </p>
        <form className="flex flex-col w-[450px] m-auto  mt-8">
          <label>Tên đăng nhập</label>
          <input
            type="text"
            placeholder="Vui lòng nhập tên đăng nhập"
            className="border-[1px] mt-2 mb-4 focus:outline-none border-black w-[450px] px-6 py-2 rounded-xl"
          />
          <label className="">Mật khẩu</label>
          <div className="border-[1px] border-black rounded-xl mt-2 mb-2 flex justify-between  w-auto   ">
            <input
              type="text"
              placeholder="Vui lòng nhập mật khẩu"
              className="flex-1 block mr-auto focus:outline-none px-6 rounded-xl"
            />
            <EyeInvisibleOutlined className="hover:cursor-pointer hover:text-black hover:scale-110 p-[10px]  text-xl" />
          </div>

          <button className="text-end">Quên mật khẩu ?</button>
          <button className="bg-[#0688B4] py-2 text-white font-bold rounded-xl mt-6 hover:shadow hover:shadow-[#0688B4]">
            Đăng nhập
          </button>
        </form>
        <div className="text-center mt-20">
          Bạn chưa có tài khoản?{" "}
          <Link to="/register" className="text-[#0688B4] ml-2 hover:underline">
            Đăng ký ngay
          </Link>
        </div>
      </div>
      {/* column right */}
      <div className="flex-1 bg-[#D2ECF4] rounded-xl h-[90vh] items-center justify-center flex">
        <img src={imgLogin} alt="login" className="object-cover " />
      </div>
    </div>
  );
}

export default Login;
