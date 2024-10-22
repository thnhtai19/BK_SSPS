import { Link, useNavigate } from "react-router-dom";
import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";
import { useRef, useState, useEffect } from "react";
import Logocnpm from "../../assets/logocnpm.png";
import imgLogin from "../../assets/image.png";

function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [iconShowPassword, setIconShowPassword] = useState(true);
  const passwordRef = useRef(null);
  const apiUrl = process.env.REACT_APP_API_URL;
  const [name, setName] = useState('');
  const [uid, setUid] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const cheklogin = async () => {
      try {
        const response = await fetch(`${apiUrl}auth/check`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          },
          credentials: 'include',
        });
  
        const data = await response.json();
        console.log(data);
  
        if (response.ok && data.status === false) {
          navigate("/home");
        } 
      } catch (error) {
      }
    };
    cheklogin();

    const passwordInput = passwordRef.current;
    passwordInput.type = showPassword ? "text" : "password";
  }, [showPassword,apiUrl,navigate]);

  function toggleShowPassword() {
    setShowPassword(!showPassword);
    setIconShowPassword(!iconShowPassword);
  }

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!name || !uid || !email || !password) {
      setMessage('Vui lòng nhập đầy đủ thông tin.');
      return;
    }

    try {
      const response = await fetch(`${apiUrl}auth/sign_up`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, name, uid }),
      });

      const data = await response.json();

      if (data.status) {
        setMessage('Đăng ký thành công!');
        navigate('/auth/login');
      } else {
        setMessage(data.message);
      }
    } catch (error) {
      setMessage('Không thể kết nối đến máy chủ.');
    }
  };

  return (
    <div className="flex sm:p-10 p-4 justify-center sm:bg-transparent ms:items-center h-dvh">
      {/* column left */}
      <div className="sm:flex-1 sm:p-10 p-5 my-auto h-fit text-[#6F6F6F] bg-white rounded-xl sm:rounded-none">
        {/* logo in mobile */}
        <div className="sm:hidden mb-6 flex items-center gap-3 justify-center">
          <img src={Logocnpm} alt="logo" className="w-10" />
          <span className="text-[#0688B4] font-bold text-3xl">BK SSPS</span>
        </div>
        <h1 className="sm:text-3xl text-lg text-black font-bold text-center">
          DỊCH VỤ XÁC THỰC HCMUT_SSO
        </h1>
        <p className="text-center mt-6">
          Xin mời bạn nhập đầy đủ thông tin đăng ký. Sau đó bạn sẽ có quyền truy cập và sử dụng các dịch vụ của chúng tôi.
        </p>
        <form className="flex flex-col sm:w-[450px] m-auto mt-8" onSubmit={handleRegister}>
          <label>Họ và tên</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Vui lòng nhập họ và tên"
            className="border-[1px] mt-2 mb-4 focus:outline-none border-black sm:w-[450px] px-6 py-2 rounded-xl"
          />
          <label>Mã số sinh viên</label>
          <input
            type="text"
            value={uid}
            onChange={(e) => setUid(e.target.value)}
            placeholder="Vui lòng nhập mã số sinh viên"
            className="border-[1px] mt-2 mb-4 focus:outline-none border-black sm:w-[450px] px-6 py-2 rounded-xl"
          />
          <label>Địa chỉ email</label>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Vui lòng nhập địa chỉ email"
            className="border-[1px] mt-2 mb-4 focus:outline-none border-black sm:w-[450px] px-6 py-2 rounded-xl"
          />
          <label>Mật khẩu</label>
          <div className="border-[1px] border-black rounded-xl mt-2 mb-2 flex justify-between w-auto">
            <input
              ref={passwordRef}
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Vui lòng nhập mật khẩu"
              className="flex-1 block mr-auto focus:outline-none px-6 rounded-xl"
            />
            {iconShowPassword ? (
              <EyeInvisibleOutlined
                onClick={toggleShowPassword}
                className="hover:cursor-pointer hover:text-black hover:scale-110 p-[10px] text-xl"
              />
            ) : (
              <EyeOutlined
                onClick={toggleShowPassword}
                className="hover:cursor-pointer hover:text-black hover:scale-110 p-[10px] text-xl"
              />
            )}
          </div>

          <button type="submit" className="bg-[#0688B4] py-2 text-white font-bold rounded-xl mt-6 hover:shadow hover:shadow-[#0688B4]">
            Đăng ký
          </button>
        </form>
        {message && <p className="text-red-500 mt-4 text-center">{message}</p>}
        <div className="text-center mt-6">
          Bạn đã có tài khoản?{" "}
          <Link to="/auth/login" className="text-[#0688B4] ml-2 hover:underline">
            Đăng nhập ngay
          </Link>
        </div>
      </div>
      {/* column right */}
      <div className="hidden sm:flex flex-col flex-1 bg-[#D2ECF4] rounded-xl h-[90vh] items-center justify-center gap-6 pt-4">
        <div className="flex items-center justify-center gap-3">
          <img src={Logocnpm} alt="logo" className="w-14" />
          <h2 className="text-[#0688B4] font-bold text-3xl">BK SSPS</h2>
        </div>
        <img src={imgLogin} alt="login" className="object-cover" />
      </div>
    </div>
  );
}

export default Register;
