import React, { useState, useEffect } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { WrapContainer } from './style';
import TableComponent from '../../components/TableComponent/TableComponent';
import { FilterOutlined } from '@ant-design/icons';
import { DatePicker, Modal, Select, message, Spin } from 'antd';
import { useNavigate } from 'react-router-dom';

const { Option } = Select;

const AdminHistoryPage = () => {
  const [selectedDateStart, setSelectedDateStart] = useState(null);
  const [selectedDateEnd, setSelectedDateEnd] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [dataSource, setHis] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false); // State for modal visibility
  const [selectedStatus, setSelectedStatus] = useState(''); // State for selected status
  const [selectedRecord, setSelectedRecord] = useState(null); // State for selected record

  const apiUrl = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const gethis = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${apiUrl}spso/getAllPrintOrder`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        });


        const data = await response.json();
        console.log(data.message)
        if(data.message === 'Không có quyền truy cập!'){
          navigate('/404');
          return;
        }

        if (response.ok) {
          setHis(data);
        } else {
          message.error('Vui lòng đăng nhập!');
          navigate('/auth/login');
        }
        setLoading(false);
      } catch (error) {
        console.error('Lỗi:', error);
      }
    };
    gethis();
  }, [apiUrl, navigate]);

  const handleChangeStart = (date, dateString) => {
    setSelectedDateStart(date);
  };

  const handleChangeEnd = (date, dateString) => {
    setSelectedDateEnd(date);
  };

  const handleEdit = (record) => {
    setSelectedRecord(record);
    setSelectedStatus(record.trang_thai_don_in);
    setIsModalVisible(true); // Show the modal
  };

  const handleUpdateStatus = () => {
    // Logic to update the status of the selected record
    // You can make an API call here to update the record's status in the backend
    console.log('Updated status:', selectedStatus);
    message.success('Cập nhật trạng thái thành công!');
    setIsModalVisible(false); // Close the modal
  };

  const handleStatusChange = (value) => {
    setSelectedStatus(value);
  };

  const columns = [
    {
      title: 'ID',
      dataIndex: 'ma_don_in',
      key: 'ma_don_in',
    },
    {
      title: 'MSSV',
      dataIndex: 'MSSV',
      key: 'MSSV',
    },
    {
      title: 'Tên máy in',
      dataIndex: 'ten_may',
      key: 'ten_may',
    },
    {
      title: 'Tên tài liệu',
      dataIndex: 'ten_tep',
      key: 'ten_tep',
    },
    {
      title: 'Thời gian bắt đầu',
      dataIndex: 'tg_bat_dau',
      key: 'tg_bat_dau',
    },
    {
      title: 'Thời gian kết thúc',
      dataIndex: 'tg_ket_thuc',
      key: 'tg_ket_thuc',
    },
    {
      title: 'Cỡ giấy',
      dataIndex: 'kich_thuoc',
      key: 'kich_thuoc',
    },
    {
      title: 'Số trang',
      dataIndex: 'so_trang_in',
      key: 'so_trang_in',
    },
    {
      title: 'Trạng thái',
      dataIndex: 'trang_thai_don_in',
      key: 'trang_thai_don_in',
      render: (text) => {
        let style = {};

        if (text === 2) {
          style = {
            backgroundColor: '#BFFFD9',
            color: '#00760C',
            borderRadius: '10px',
            padding: '6px 8px',
          };
        } else if (text === 1) {
          style = {
            backgroundColor: '#FFF3CD',
            color: '#856404',
            borderRadius: '10px',
            padding: '6px 8px',
          };
        } else if (text === 0) {
          style = {
            backgroundColor: '#F8D7DA',
            color: '#721C24',
            borderRadius: '10px',
            padding: '6px 8px',
          };
        } else {
          style = {
            backgroundColor: 'transparent',
            color: 'black',
            borderRadius: '10px',
            padding: '6px 8px',
          };
        }

        const renderText = (text) => {
          switch (text) {
            case 0:
              return 'Chờ in'; 
            case 1:
              return 'Đang in';
            case 2:
              return 'Đã in'; 
            default:
              return 'Không xác định';  
          }
        };
        
        return <span style={style}>{renderText(text)}</span>;
      },
    },
    {
      title: 'Hành động',
      key: 'action',
      render: (text, record) => (
        <span>
          <button
            onClick={() => handleEdit(record)} // Call handleEdit when clicked
            style={{
              border: '1px solid #0688B4',
              backgroundColor: 'transparent',
              color: '#0688B4',
              padding: '4px 8px',
              borderRadius: '10px',
              cursor: 'pointer',
            }}
          >
            Cập nhật
          </button>
        </span>
      ),
    },
  ];

  return (
    <HelmetProvider>
      <Helmet>
        <title>Lịch sử in - BK SSPS Admin</title>
      </Helmet>
      <WrapContainer>
        <div className='wrap-text'>bkssps.vn &gt; Admin &gt; Lịch sử in</div>
        {loading ? (
          <Spin
            size='large'
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              minHeight: '100vh',
            }}
          />
        ) : (
          <div>
            <div className='wrap-filler'>
              <FilterOutlined className='wrap-ttt' />
              <div className='wrap-ttt'>Lọc từ ngày</div>
              <DatePicker
                onChange={handleChangeStart}
                value={selectedDateStart}
                format='DD/MM/YYYY'
                placeholder='Chọn ngày'
              />
              <div className='wrap-ttt'>đến ngày</div>
              <DatePicker
                onChange={handleChangeEnd}
                value={selectedDateEnd}
                format='DD/MM/YYYY'
                placeholder='Chọn ngày'
              />
            </div>

            <div
              style={{
                backgroundColor: '#FFF',
                padding: '20px 20px',
                borderRadius: '15px',
                border: '1px solid #EFF1F3',
              }}
            >
              <div
                style={{
                  fontSize: '20px',
                  fontWeight: 'bold',
                  paddingBottom: '10px',
                  paddingLeft: '5px',
                }}
              >
                Lịch sử in
              </div>
              <div className='inner-box'>
                <TableComponent dataSource={dataSource} columns={columns} />
              </div>
            </div>
          </div>
        )}
      </WrapContainer>

      <Modal
        title='Cập nhật trạng thái'
        visible={isModalVisible}
        onOk={handleUpdateStatus}
        onCancel={() => setIsModalVisible(false)}
        okText='Cập nhật'
        cancelText='Hủy'
        style={{ width: '300px' }}
      >
        <Select value={selectedStatus} onChange={handleStatusChange} style={{ width: '100%' }}>
          <Option value='Chờ in'>Chờ in</Option>
          <Option value='Đang in'>Đang in</Option>
          <Option value='Đã in'>Đã in</Option>
        </Select>
      </Modal>
    </HelmetProvider>
  );
};

export default AdminHistoryPage;
