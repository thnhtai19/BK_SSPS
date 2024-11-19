import { useState, useEffect, } from "react";
import { useNavigate, Link } from 'react-router-dom';
import ChangePassword from "../../components/ChangePassword/ChangePassword";
import UserInfo from "../../components/UserInfo/UserInfo";
import DiaryTable from "../../components/DiaryTable/DiaryTable";
import { message, Breadcrumb } from 'antd';

function MyAccount() {
  const [userInfo, setUserInfo] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [diaryEntries, setDiaryEntries] = useState([]);
  const [diaryError, setDiaryError] = useState('');
  const [loadingUser, setLoadingUser] = useState(true);
  const [loadingDiary, setLoadingDiary] = useState(true);

  const navigate = useNavigate();
  const apiUrl = process.env.REACT_APP_API_URL;

  useEffect(() => {
    //lấy dữ liệu người dùng
    const fetchUserProfile = async () => {
      try {
        const response = await fetch(`${apiUrl}user/profile`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          },
          credentials: 'include',
        });

        const data = await response.json();
        console.log(data);

        if (response.ok) {
          setUserInfo(data);
        } else {
          message.error("Vui lòng đăng nhập!")
          navigate("/auth/login");
        }
      } catch (error) {
        setErrorMessage('Lỗi kết nối đến server');
        console.error('Lỗi:', error);
      } finally {
        setLoadingUser(false);
      }
    };

    //lấy nhật ký người dùng
    const fetchUserDiary = async () => {
      try {
        const response = await fetch(`${apiUrl}user/diary`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        });

        const diaryData = await response.json();

        if (response.ok && diaryData.status) {
          setDiaryEntries(diaryData.message); // Lưu mảng "message" vào state
        } else {
          setErrorMessage(diaryData.message || 'Failed to fetch user diary');
        }
      } catch (error) {
        setDiaryError('Lỗi kết nối đến server');
        console.error('Lỗi:', error);
      } finally {
        setLoadingDiary(false);
      }
    };

    fetchUserProfile();
    fetchUserDiary();
  }, [apiUrl, navigate]);

  return (
    <div>
      <Breadcrumb separator=">" className="pl-4">
        <Breadcrumb.Item>
          <Link to="/">bkssps.vn</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>Tài khoản của tôi</Breadcrumb.Item>
      </Breadcrumb>
      <div className="sm:p-8 p-3 pt-0 text-[#444444]">
        <div className="sm:flex block gap-12">
          {/* account's infor */}

          {loadingUser ? (
            <p>Loading...</p>
          ) : errorMessage ? (
            <p>{errorMessage}</p>
          ) : (
            <UserInfo userInfo={userInfo} />
          )}

          {/* change password */}
          <ChangePassword userInfo={userInfo} />

        </div>

        {/* Diary */}
        {loadingDiary ? (
          <p>Loading...</p>
        ) : diaryError ? (
          <p>{diaryError}</p>
        ) : (
          <DiaryTable diaryEntries={diaryEntries} />
        )}
      </div>
    </div>
  );
}

export default MyAccount;
