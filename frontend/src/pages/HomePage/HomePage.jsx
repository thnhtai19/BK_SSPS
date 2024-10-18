import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Breadcrumb, DatePicker, Row, Col } from 'antd';
import { FilterOutlined } from '@ant-design/icons';
import { XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';
import axios from 'axios';

const HomePage = () => {
  const [data, setData] = useState({
    tongTienDaDung: '0',
    soGiayInConLai: 0,
    tongTaiLieuDaIn: 0,
    thongKe: []
  });
  const [error, setError] = useState('');
  const [maxYAxis, setMaxYAxis] = useState();
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [filteredChartData, setFilteredChartData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/user/StudentHomepage', {
          withCredentials: true
        });
        const { tong_tien_da_dung, so_giay_in_con_lai, tong_tai_lieu_da_in, thong_ke } = response.data;

        const maxPrintedDocs = Math.max(...thong_ke.map(item => item.so_tai_lieu_in_trong_ngay));
        const maxUsedPages = Math.max(...thong_ke.map(item => item.so_trang_da_dung_trong_ngay));
        const maxY = Math.max(maxPrintedDocs, maxUsedPages);

        setData({
          tongTienDaDung: tong_tien_da_dung,
          soGiayInConLai: so_giay_in_con_lai,
          tongTaiLieuDaIn: tong_tai_lieu_da_in,
          thongKe: thong_ke.map(item => ({
            date: item.date,
            printedDocs: item.so_tai_lieu_in_trong_ngay,
            usedPages: item.so_trang_da_dung_trong_ngay
          }))
        });

        setMaxYAxis(maxY);
        setFilteredChartData(thong_ke); 
      } catch (err) {
        if (err.response) {
          if (err.response.data.message) {
            setError(err.response.data.message);
          } else if (err.response.data.error) {
            setError(err.response.data.error);
          }
        } else {
          setError('Lỗi kết nối đến server.');
        }
      }
    };

    fetchData();
  }, []);

  const handleDateChange = (date, type) => {
    if (type === 0) {
      setStartDate(date);
    } else {
      setEndDate(date);
    }
  };
  
const convertDateStringToTimestamp = (dateString) => {
  const [day, month, year] = dateString.split('-');
  return new Date(`${year}-${month}-${day}`).getTime(); 
};

useEffect(() => {
  if (startDate && endDate) {
    const startTimestamp = new Date(startDate).setHours(0, 0, 0, 0); 
    const endTimestamp = new Date(endDate).setHours(23, 59, 59, 999); 

    const filteredData = data.thongKe.filter((entry) => {
      if (!entry.date) return false;

      const entryTimestamp = convertDateStringToTimestamp(entry.date);

      return entryTimestamp >= startTimestamp && entryTimestamp <= endTimestamp;
    });

    setFilteredChartData(filteredData);
  } else {
    setFilteredChartData(data.thongKe);
  }
}, [data.thongKe, startDate, endDate]);


  return (
    <div className='p-4 min-h-screen'>
      {error ? (
        <div className="text-red-500">{error}</div>
      ) : (
        <>
          <div className='text-sm mb-5'>
            <Breadcrumb separator='>'>
              <Breadcrumb.Item>
                <Link to='/'>bkssps.vn</Link>
              </Breadcrumb.Item>
              <Breadcrumb.Item>Trang chủ</Breadcrumb.Item>
            </Breadcrumb>
          </div>

          <div className='flex flex-wrap justify-between gap-8 mb-10'>
            <div className='bg-white p-6 rounded-lg shadow-md flex justify-between items-center w-full md:w-[30%]'>
              <div>
                <div className='text-lg font-bold text-gray-900'>Tổng tiền đã dùng</div>
                <div className='text-xl font-bold text-gray-900 mt-2'>{data.tongTienDaDung} VNĐ</div>
              </div>
              <div className='ml-4'>
                <img src={require('../../assets/16842271.png')} alt='Money' className='w-16 h-16' />
              </div>
            </div>

            <div className='bg-white p-6 rounded-lg shadow-md flex justify-between items-center w-full md:w-[30%]'>
              <div>
                <div className='text-lg font-bold text-gray-900'>Tổng tài liệu đã in</div>
                <div className='text-xl font-bold text-gray-900 mt-2'>{data.tongTaiLieuDaIn}</div>
              </div>
              <div className='ml-4'>
                <img src={require('../../assets/file.png')} alt='File' className='w-16 h-16' />
              </div>
            </div>

            <div className='bg-white p-6 rounded-lg shadow-md flex justify-between items-center w-full md:w-[30%]'>
              <div>
                <div className='text-lg font-bold text-gray-900'>Số trang còn lại</div>
                <div className='text-xl font-bold text-gray-900 mt-2'>{data.soGiayInConLai}</div>
              </div>
              <div className='ml-4'>
                <img src={require('../../assets/paper.png')} alt='Paper' className='w-16 h-16' />
              </div>
            </div>
          </div>

          <div className="p-[20px]">
            <Row gutter={16} align="middle">
              <Col>
                <span className="flex items-center">
                  <FilterOutlined style={{ marginRight: 8 }} />
                  Lọc từ ngày:
                </span>
              </Col>
              <Col>
                <DatePicker
                  placeholder="Từ ngày"
                  onChange={(date) => handleDateChange(date, 0)} 
                />
              </Col>
              <Col>
                <DatePicker
                  placeholder="Đến ngày"
                  onChange={(date) => handleDateChange(date, 1)}
                />
              </Col>
            </Row>
          </div>

          <div className='bg-white p-6 rounded-lg shadow-md items-center'>
            <h3 className='text-lg font-bold mb-4 text-gray-900'>Thống kê</h3>
            <div className='w-full h-96'>
              <ResponsiveContainer width='100%' height={300}>
                <LineChart data={filteredChartData}>
                  <XAxis dataKey='date' />
                  <YAxis domain={[0, maxYAxis]} />
                  <CartesianGrid strokeDasharray='3 3' />
                  <Tooltip />
                  <Legend />
                  <Line type='monotone' dataKey='printedDocs' stroke='#FF7F7F' strokeWidth={2} name='Tài liệu đã in' />
                  <Line type='monotone' dataKey='usedPages' stroke='#8884d8' strokeWidth={2} name='Số trang đã dùng' />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default HomePage;
