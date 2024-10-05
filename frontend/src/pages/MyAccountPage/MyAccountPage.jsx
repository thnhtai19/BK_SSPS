import { useState, useEffect } from "react";

import ChangePassword from "../../components/ChangePassword/ChangePassword";
import UserInfo from "../../components/UserInfo/UserInfo";
import DiaryTable from "../../components/DiaryTable/DiaryTable";

function MyAccount() {
  const [userInfo, setUserInfo] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [diaryEntries, setDiaryEntries] = useState([]);
  const [diaryError, setDiaryError] = useState('');
  const [loadingUser, setLoadingUser] = useState(true);
  const [loadingDiary, setLoadingDiary] = useState(true);

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
                setErrorMessage(data.message || 'Failed to fetch user profile');
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
  }, [apiUrl]);

  return (
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
        <ChangePassword userInfo={userInfo}/>
        
      </div>

      {/* Diary */}
      {loadingDiary ? ( 
            <p>Loading...</p>
        ) : diaryError ? (
            <p>{diaryError}</p>
        ) : (
          <DiaryTable diaryEntries={diaryEntries}/>
      )}
    </div>
  );
}

export default MyAccount;
