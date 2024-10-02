import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Table, DatePicker, Breadcrumb, Input, Row, Col } from 'antd';
import { FilterOutlined } from '@ant-design/icons';
import { XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Area, AreaChart } from 'recharts';

const { Search } = Input;

const HistoryPage = () => {
	const [pageSize, setPageSize] = useState(10);
	const [startDate, setStartDate] = useState(null);
	const [endDate, setEndDate] = useState(null);
	const [filteredChartData, setFilteredChartData] = useState([]);
	const [searchValue, setSearchValue] = useState('');

	const handlePageSizeChange = (value) => {
		setPageSize(value);
	};

	const paginationOptions = {
		pageSize,
		showSizeChanger: true,
		pageSizeOptions: ['5', '10', '20'],
		onShowSizeChange: (current, size) => handlePageSizeChange(size),
	};

	const columns = [
		{
			title: 'ID',
			dataIndex: 'id',
		},
		{
			title: 'ID máy in',
			dataIndex: 'printerId',
		},
		{
			title: 'Tài liệu',
			dataIndex: 'document',
		},
		{
			title: 'Thời gian bắt đầu',
			dataIndex: 'startTime',
		},
		{
			title: 'Thời gian kết thúc',
			dataIndex: 'endTime',
			render: (endTime, record) => {
				if (record.status === 'Đang chờ in') {
					return '---';
				}
				return endTime;
			},
		},
		{
			title: 'Kích thước',
			dataIndex: 'size',
		},
		{
			title: 'Số trang',
			dataIndex: 'pages',
		},
		{
			title: 'Trạng thái',
			dataIndex: 'status',
			render: (status) => (
				<button
					style={{
						backgroundColor: status === 'Hoàn tất' ? '#bfffd8' : status === 'Đang chờ in' ? '#f7f9fb' : '#ffd4d4',
						color: status === 'Hoàn tất' ? '#00750c' : status === 'Đang chờ in' ? '#444444' : '#c40000', // Màu chữ đỏ đậm cho "Đã hủy"
						borderRadius: '5px',
						padding: '5px 10px',
						border: 'none',
					}}
				>
					{status === 'Hoàn tất' ? 'Hoàn tất in' : status === 'Đang chờ in' ? 'Đang chờ in' : 'Đã hủy'}
				</button>
			),
		},
	];

	const data = Array.from({ length: 10 }).map((_, i) => ({
		key: i,
		id: `212484${i}`,
		printerId: `908${i}`,
		document: `Document_${i}.pdf`,
		startTime: `1${i}-09-2024 09:${i}:00`,
		endTime: `1${i}-09-2024 09:${i + 1}:42`,
		size: i % 2 === 0 ? 'A4' : 'A3',
		pages: i * 5 + 10,
		status: i % 3 === 0 ? 'Hoàn tất' : i % 3 === 1 ? 'Đang chờ in' : 'Đã hủy',
	}));

	const chartData = [
		{ date: '10-07-2024', A3: 180, A4: 100 },
		{ date: '11-07-2024', A3: 160, A4: 80 },
		{ date: '12-08-2024', A3: 140, A4: 60 },
		{ date: '13-08-2024', A3: 170, A4: 90 },
		{ date: '14-09-2024', A3: 150, A4: 70 },
		{ date: '15-09-2024', A3: 130, A4: 50 },
		{ date: '16-09-2024', A3: 190, A4: 100 },
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
				const entryTimestamp = new Date(entry.date.split('-').reverse().join('-')).getTime();
				return entryTimestamp >= startTimestamp && entryTimestamp <= endTimestamp;
			});
			setFilteredChartData(filteredData);
		} else {
			setFilteredChartData(chartData);
		}
	}, [startDate, endDate]);

	const handleSearch = (value) => {
		setSearchValue(value);
	};

	const filteredData = data.filter((item) => item.document.toLowerCase().includes(searchValue.toLowerCase()));

	return (
		<div className='p-2 min-h-screen ml-2'>
			<Breadcrumb separator='>'>
				<Breadcrumb.Item>
					<Link to='/'>bkssps.vn</Link>
				</Breadcrumb.Item>
				<Breadcrumb.Item>Lịch sử in</Breadcrumb.Item>
			</Breadcrumb>

			<div className='p-[20px]'>
				<Row gutter={16} align='middle'>
					<Col>
						<span className='flex items-center'>
							<FilterOutlined style={{ marginRight: 8 }} />
							Lọc từ ngày:
						</span>
					</Col>
					<Col>
						<DatePicker placeholder='Từ ngày' onChange={(date) => handleDateChange(date, 0)} />
					</Col>
					<Col>
						<DatePicker placeholder='Đến ngày' onChange={(date) => handleDateChange(date, 1)} />
					</Col>
				</Row>
			</div>

			<div className='flex items-center justify-center'>
				<div className='flex flex-col bg-white p-6 rounded-lg shadow-lg w-[95%] md:w-[95%]'>
					<h3 className='text-xl font-semibold text-gray-800 mb-6 border-b pb-2'>Thống kê số trang</h3>
					<ResponsiveContainer width='100%' height={300}>
						<AreaChart data={filteredChartData}>
							<defs>
								<linearGradient id='colorA3' x1='0' y1='0' x2='0' y2='1'>
									<stop offset='5%' stopColor='#FF7F7F' stopOpacity={0.8} />
									<stop offset='95%' stopColor='#FF7F7F' stopOpacity={0} />
								</linearGradient>
								<linearGradient id='colorA4' x1='0' y1='0' x2='0' y2='1'>
									<stop offset='5%' stopColor='#8884d8' stopOpacity={0.8} />
									<stop offset='95%' stopColor='#8884d8' stopOpacity={0} />
								</linearGradient>
							</defs>
							<XAxis dataKey='date' />
							<YAxis />
							<CartesianGrid strokeDasharray='3 3' />
							<Tooltip />
							<Legend />
							<Area type='monotone' dataKey='A3' stroke='#FF7F7F' fillOpacity={1} fill='url(#colorA3)' />
							<Area type='monotone' dataKey='A4' stroke='#8884d8' fillOpacity={1} fill='url(#colorA4)' />
						</AreaChart>
					</ResponsiveContainer>
				</div>
			</div>

			<div className='flex items-center justify-center mt-7'>
				<div className='flex flex-col bg-white p-6 rounded-lg shadow-lg w-[95%] md:w-[95%]'>
					<h3 className='text-xl font-semibold text-gray-800 mb-6 border-b pb-2'>Nhật ký hoạt động</h3>
					<Search
						placeholder='Tìm kiếm tài liệu'
						onSearch={handleSearch}
						style={{ width: 200, marginLeft: 16, marginBottom: 16 }}
					/>
					<Table columns={columns} dataSource={filteredData} pagination={paginationOptions} bordered />
				</div>
			</div>
		</div>
	);
};

export default HistoryPage;
