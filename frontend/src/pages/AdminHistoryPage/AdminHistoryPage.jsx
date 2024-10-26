import React, { useState, useEffect, useCallback } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { WrapContainer } from './style';
import TableComponent from '../../components/TableComponent/TableComponent';
import { FilterOutlined } from '@ant-design/icons';
import { DatePicker, Modal, Select, message, Spin, Breadcrumb } from 'antd';
import { useNavigate, Link } from 'react-router-dom';

const { Option } = Select;

const AdminHistoryPage = () => {
  const [selectedDateStart, setSelectedDateStart] = useState(null);
  const [selectedDateEnd, setSelectedDateEnd] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [dataSource, setHis] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState('');
  const [selectedId, setSelectedRecordID] = useState(null);

  const apiUrl = process.env.REACT_APP_API_URL;

  const gethis = useCallback(async () => {
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
      if (data.message === 'Không có quyền truy cập!') {
        navigate('/404');
        return;
      }

      if (response.ok) {
        const filteredData = filterDataByDate(data, selectedDateStart, selectedDateEnd);
        setHis(filteredData);
      } else {
        message.error('Vui lòng đăng nhập!');
        navigate('/auth/login');
      }
    } catch (error) {
      console.error('Lỗi:', error);
      message.error('Đã xảy ra lỗi trong quá trình lấy dữ liệu!');
    } finally {
      setLoading(false);
    }
  }, [apiUrl, selectedDateStart, selectedDateEnd, navigate]);


  useEffect(() => {
    gethis();
  }, [selectedDateStart, selectedDateEnd, gethis]);


  const handleChangeStart = (date, dateString) => {
    setSelectedDateStart(date);
  };

  const handleChangeEnd = (date, dateString) => {
    setSelectedDateEnd(date);
  };

  const handleEdit = (record) => {
    setSelectedRecordID(record.ma_don_in);
    setSelectedStatus(record.trang_thai_don_in);
    setIsModalVisible(true);
  };

  const handleUpdateStatus = async () => {
    const load = {
      ma_don_in: selectedId,
      trang_thai: selectedStatus,
    };
  
    try {
      const res = await fetch(`${apiUrl}spso/updatePrintOrderStatus`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(load),
        credentials: 'include',
      });
  
      const data = await res.json();
  
      if (data && data.message === "Cập nhật trạng thái thành công!") {
        setHis((prevData) => {
          const updatedData = [...prevData];
          const index = updatedData.findIndex(item => item.ma_don_in === selectedId);
          if (index !== -1) {
            updatedData[index].trang_thai_don_in = selectedStatus; 
          }
          return updatedData; 
        });
  
        message.success('Cập nhật trạng thái thành công!');
      } else {
        message.error('Cập nhật trạng thái thất bại!');
      }
    } catch (error) {
      message.error('Cập nhật trạng thái thất bại!');
    }
  
    setIsModalVisible(false);
  };
  


  const filterDataByDate = (data, startDate, endDate) => {
    if (!startDate && !endDate) return data;

    return data.filter(item => {
      const dateParts = item.tg_bat_dau.split(' ');
      const [time, date] = dateParts;
      const [day, month, year] = date.split('-');
      const formattedDate = new Date(`${year}-${month}-${day}T${time}`);

      const startDateCondition = startDate ? formattedDate >= startDate.toDate() : true;

      const endDateCondition = endDate ? formattedDate <= endDate.toDate() : true;

      return startDateCondition && endDateCondition;
    });
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

        if (text === "Đã in") {
          style = {
            backgroundColor: '#BFFFD9',
            color: '#00760C',
            borderRadius: '10px',
            padding: '6px 8px',
          };
        } else if (text === "Đang in") {
          style = {
            backgroundColor: '#FFF3CD',
            color: '#856404',
            borderRadius: '10px',
            padding: '6px 8px',
          };
        } else if (text === "Chờ in") {
          style = {
            backgroundColor: '#F8D7DA',
            color: '#721C24',
            borderRadius: '10px',
            padding: '6px 8px',
          };
        }

        return <span style={style}>{text}</span>;
      },
    },
    {
      title: 'Hành động',
      key: 'action',
      render: (text, record) => (
        <span>
          <button
            onClick={() => handleEdit(record)}
            style={{
              border: '1px solid #0688B4',
              backgroundColor: 'transparent',
              color: '#0688B4',
              padding: '4px 8px',
              borderRadius: '10px',
              cursor: 'pointer',
            }}
            onMouseEnter={(e) => e.target.style.backgroundColor = '#a0e1f7'}
            onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
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
        <Breadcrumb separator='>'>
          <Breadcrumb.Item>
            <Link to='/'>bkssps.vn</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <Link to='/admin/home'>Admin</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>Lịch sử in</Breadcrumb.Item>
        </Breadcrumb>
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
        width={400}
      >
        <Select value={selectedStatus} onChange={handleStatusChange} style={{ width: '100%' }}>
          <Option value='Chờ in' disabled={selectedStatus === 'Chờ in' || selectedStatus === 'Đã in' || selectedStatus === 'Đang in'}>
            Chờ in
          </Option>
          <Option value='Đang in' disabled={selectedStatus === 'Đã in' || selectedStatus === 'Đang in'}>
            Đang in
          </Option>
          <Option value='Đã in' disabled={selectedStatus === 'Đã in'}>
            Đã in
          </Option>
        </Select>
      </Modal>
    </HelmetProvider>
  );
};

export default AdminHistoryPage;
