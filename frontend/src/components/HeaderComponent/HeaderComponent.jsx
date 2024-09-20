import React, {useState} from 'react'
import {
  WrapperContainer
} from './style'
import { 
  BellOutlined,
  SearchOutlined,
  AlignLeftOutlined, 
  LogoutOutlined, 
  UserOutlined, 
  SafetyCertificateOutlined, 
  ShopOutlined,
  ShoppingOutlined,
  InboxOutlined,

} from '@ant-design/icons';
import { Input, Dropdown, Menu, Badge } from 'antd';
import user from '../../assets/user.png';
import { Link } from "react-router-dom";

const { Search } = Input;

const HeaderComponent = ({ isOpen, setIsOpen }) => {
  const [notifications, setNotifications] = useState([]);
  const [notificationStatus, setNotificationStatus] = useState(false);

  const truncateText = (text, maxLength) => {
      if (text.length > maxLength) {
          return text.substring(0, maxLength) + '...';
      }
      return text;
  };

  const notice = (
    <Menu style={{ width: '300px', maxHeight: '300px', overflow: 'auto', position: 'relative', padding: 0, margin: 0 }}>
      <div style={{
        position: 'sticky',
        top: 0,
        background: '#fff',
        zIndex: 1,
        padding: '10px 15px',
      }}>
        <div style={{ margin: 0, fontWeight: 'bold', fontSize: '18px' }}>Thông báo</div>
      </div>
      {notificationStatus === false ? (
        <div style={{ display: 'flex', justifyContent: 'center', alignContent: 'center', flexDirection: 'column', alignItems: 'center', padding: '20px' }}>
          <InboxOutlined style={{ fontSize: '25px', color: '#6f6f6f' }} />
          <div style={{ color: '#6f6f6f', paddingTop: '10px' }}>Bạn chưa có thông báo nào!</div>
        </div>
      ) : (
        Object.entries(notifications).map(([key, item]) => (
          <Menu.Item key={key} style={{ position: 'relative', display: 'flex', alignItems: 'center', padding: '10px 15px' }}>
            <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexGrow: 1 }}>
              <div style={{
                backgroundColor: item.status === false ? '#00d67f' : '#6f6f6f',
                width: '50px',
                height: '50px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}>
                <ShoppingOutlined style={{ fontSize: '20px', color: '#fff' }} />
              </div>
              <div
                style={{ color: '#444', textAlign: 'left', wordWrap: 'break-word', whiteSpace: 'normal' }}
              >
                {truncateText(item.notice, 73)}
              </div>
            </div>
          </Menu.Item>
        ))
      )}
    </Menu>
  );

  const menu = (
    <Menu style={{ width: '250px', maxHeight: '300px' }}>
      <div style={{ marginLeft: '15px', padding: '10px 0' }}>
        <div style={{ fontSize: '18px', fontWeight: 'bold' }}>
          Trần Thành Tài
        </div>
        <div style={{ fontSize: '11px', color: '#444' }}>tai.tranthanh@hcmut.edu.vn</div>
      </div>

      <Menu.Item key="0">
        <Link to="/user" style={{ color: '#444' }} >
          <div style={{ display: 'flex', gap: '10px' }}>
            <UserOutlined />
            <div style={{ fontSize: '14px' }}>Trang cá nhân</div>
          </div>
        </Link>
      </Menu.Item>
      <Menu.Item key="1">
        <Link to="/user/order" style={{ color: '#444' }} >
          <div style={{ display: 'flex', gap: '10px' }}>
            <ShopOutlined />
            <div style={{ fontSize: '14px' }}>Lịch sử in tài liệu</div>
          </div>
        </Link>
      </Menu.Item>
      <Menu.Item key="2">
        <Link to="/admin" style={{ color: '#444' }} >
          <div style={{ display: 'flex', gap: '10px' }}>
            <SafetyCertificateOutlined />
            <div style={{ fontSize: '14px' }}>Quản trị hệ thống</div>
          </div>
        </Link>
      </Menu.Item>
      <div style={{ width: '250px', borderBottom: '1.5px solid #F5F5F5', margin: '5px 0' }} />
      <Menu.Item key="3">
        <div style={{ display: 'flex', gap: '10px' }}>
          <LogoutOutlined />
          <Link to="/user" style={{ color: '#444' }}>Đăng xuất</Link>
        </div>
      </Menu.Item>
    </Menu>
  );

  return (
    <WrapperContainer>
      <div className='wrap-outline'>
        <AlignLeftOutlined style={{ cursor: 'pointer' }} onClick={() => setIsOpen(!isOpen)} />
        <SearchOutlined style={{ cursor: 'pointer', paddingLeft: '20px' }} />
      </div>
      <div className='left-container'>
        <Search placeholder="Tìm kiếm bất cứ thứ gì..." className='wrap-search' size='large' />
      </div>
      <div className='right-container'>
        <div className='wrap-button-con'>
          <div className='wrap-button'>
            99 credits
          </div>
        </div>
        <Dropdown overlay={notice} trigger={['click']} overlayStyle={{ paddingTop: '20px' }}>
        <Badge count={1}> 
          <BellOutlined style={{ fontSize: '25px', color: '#444' }} />
        </Badge>
        </Dropdown>
        <Dropdown overlay={menu} trigger={['click']} overlayStyle={{ paddingTop: '10px' }} >
          <img src={user} alt='user' width="40px" />
        </Dropdown>
      </div>
    </WrapperContainer>
  )
}

export default HeaderComponent