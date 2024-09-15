import React from 'react'
import {
  WrapperContainer
} from './style'
import { BellOutlined, SearchOutlined, AlignLeftOutlined } from '@ant-design/icons';
import { Input } from 'antd';
import user from '../../assets/user.png';

const { Search } = Input;

const HeaderComponent = ({isOpen, setIsOpen}) => {

  return (
    <WrapperContainer>
      <div className='wrap-outline'>
        <AlignLeftOutlined style={{cursor: 'pointer'}} onClick={() => setIsOpen(!isOpen)} />
        <SearchOutlined style={{cursor: 'pointer', paddingLeft: '20px'}} />
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
        <BellOutlined style={{ fontSize: '25px', color: '#444' }} />
        <img src={user} alt='user' width="40px" />
      </div>
    </WrapperContainer>
  )
}

export default HeaderComponent