import React, { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Table, DatePicker, Breadcrumb, Input, Row, Col } from 'antd';
import { FilterOutlined } from '@ant-design/icons';
import { XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Area, AreaChart } from 'recharts';
import axios from 'axios';

const { Search } = Input;

const HistoryPage = () => {
	const [pageSize, setPageSize] = useState(10);
	const [startDate, setStartDate] = useState(null);
	const [endDate, setEndDate] = useState(null);
	const [filteredChartData, setFilteredChartData] = useState([]);
	const [searchValue, setSearchValue] = useState('');
	const [data, setdata] = useState([]);
	const [chartData, setChartData] = useState([]);


	const apiUrl = process.env.REACT_APP_API_URL;

  const navigate = useNavigate();
  
	const fetchApiHistoryPrintOrder = () => {
		axios.get(apiUrl + 'user/printOrder',{withCredentials: true})
			.then(response => {
				setdata(response.data);
				getChartData(response.data);
			})
			.catch(error => {
        if (error.response) {
            // Server trả về lỗi không phải 2xx
            if (error.response.status === 401) {
                console.error('Chưa xác thực, yêu cầu đăng nhập');
                navigate('/auth/login');
            } else {
                console.error('Lỗi server:', error.response.data.message);
            }
        } else if (error.request) {
            console.error('Không thể kết nối tới server');
        } else {
            // Lỗi khác
            console.error('Lỗi:', error.message);
        }
    });
	}
	const getChartData = (data) => {
		const tempData = [];
		data.forEach((item) => {
			const date = item.tg_bat_dau.split(" ")[1]; // Lấy phần ngày từ thời gian bắt đầu

      // Tìm đối tượng có cùng ngày trong kết quả
      let found = tempData.find((el) => el.date === date);

      if (!found) {
        // Nếu chưa tồn tại, tạo một đối tượng mới
        found = { date, A3: 0, A4: 0 };
        tempData.push(found);
      }

      // Cập nhật số lượng trang in theo kích thước
      if (item.kich_thuoc === "A3") {
        found.A3 += item.so_trang_in;
      } else if (item.kich_thuoc === "A4") {
        found.A4 += item.so_trang_in;
      }
    });

    setChartData(tempData);
  };

  useEffect(() => {
    fetchApiHistoryPrintOrder();
  }, []);

  const handlePageSizeChange = (value) => {
    setPageSize(value);
  };

  const paginationOptions = {
    pageSize,
    showSizeChanger: true,
    pageSizeOptions: ["5", "10", "20"],
    onShowSizeChange: (current, size) => handlePageSizeChange(size),
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "ma_don_in",
    },
    {
      title: "Máy in",
      dataIndex: "ten_may",
    },
    {
      title: "Tài liệu",
      dataIndex: "ten_tep",
    },
    {
      title: "Thời gian bắt đầu",
      dataIndex: "tg_bat_dau",
    },
    {
      title: "Thời gian kết thúc",
      dataIndex: "tg_ket_thuc",
      render: (endTime, record) => {
        if (record.status === "Đang chờ in") {
          return "---";
        }
        return endTime;
      },
    },
    {
      title: "Kích thước",
      dataIndex: "kich_thuoc",
    },
    {
      title: "Số trang",
      dataIndex: "so_trang_in",
    },
    {
      title: "Trạng thái",
      dataIndex: "trang_thai_don_in",
      render: (status) => (
        <button
          style={{
            backgroundColor:
              status === 0 ? "#bfffd8" : status === 1 ? "#f7f9fb" : "#ffd4d4",
            color:
              status === 0 ? "#00750c" : status === 1 ? "#444444" : "#c40000", // Màu chữ đỏ đậm cho "Đã hủy"
            borderRadius: "5px",
            padding: "5px 10px",
            border: "none",
          }}
        >
          {status === 0 ? "Hoàn tất" : status === 1 ? "Đang chờ in" : "Đã hủy"}
        </button>
      ),
    },
  ];

  const handleDateChange = (date, type) => {
    if (type === 0) {
      setStartDate(date);
    } else {
      setEndDate(date);
    }
  };

  useEffect(() => {
    if (startDate && endDate) {
      const startTimestamp = new Date(startDate).getTime();
      const endOfDay = new Date(endDate).setHours(23, 59, 59, 999);
      const endTimestamp = new Date(endOfDay).getTime();

      const filteredData = chartData.filter((entry) => {
        const entryTimestamp = new Date(
          entry.date.split("-").reverse().join("-")
        ).getTime();
        return (
          entryTimestamp >= startTimestamp && entryTimestamp <= endTimestamp
        );
      });
      setFilteredChartData(filteredData);
    } else {
      setFilteredChartData(chartData);
    }
  }, [chartData, startDate, endDate]);

  const handleSearch = (value) => {
    setSearchValue(value);
  };

  const filteredData = data.filter((item) =>
    item.ten_tep.toLowerCase().includes(searchValue.toLowerCase())
  );

  return (
    <div className="p-2 min-h-screen ml-2">
      <Breadcrumb separator=">">
        <Breadcrumb.Item>
          <Link to="/">bkssps.vn</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>Lịch sử in</Breadcrumb.Item>
      </Breadcrumb>

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

      <div className="flex items-center justify-center">
        <div className="flex flex-col bg-white p-6 rounded-lg shadow-lg w-[95%] md:w-[95%]">
          <h3 className="text-xl font-semibold text-gray-800 mb-6 border-b pb-2">
            Thống kê số trang
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={filteredChartData}>
              <defs>
                <linearGradient id="colorA3" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#FF7F7F" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#FF7F7F" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorA4" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="date" />
              <YAxis />
              <CartesianGrid strokeDasharray="3 3" />
              <Tooltip />
              <Legend />
              <Area
                type="monotone"
                dataKey="A3"
                stroke="#FF7F7F"
                fillOpacity={1}
                fill="url(#colorA3)"
              />
              <Area
                type="monotone"
                dataKey="A4"
                stroke="#8884d8"
                fillOpacity={1}
                fill="url(#colorA4)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="flex items-center justify-center mt-7">
        <div className="flex flex-col bg-white p-6 rounded-lg shadow-lg w-[95%] md:w-[95%]">
          <h3 className="text-xl font-semibold text-gray-800 mb-6 border-b pb-2">
            Nhật ký hoạt động
          </h3>
          <Search
            placeholder="Tìm kiếm tài liệu"
            onSearch={handleSearch}
            style={{ width: 200, marginLeft: 16, marginBottom: 16 }}
          />
          <Table
            columns={columns}
            dataSource={filteredData}
            pagination={paginationOptions}
            bordered
          />
        </div>
      </div>
    </div>
  );
};

export default HistoryPage;
