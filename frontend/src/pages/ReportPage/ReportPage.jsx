import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Table, DatePicker, Breadcrumb, Input, Button, Row, Col, Modal,  message, Spin  } from 'antd';
import { FilterOutlined } from '@ant-design/icons';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useNavigate } from 'react-router-dom';

const { Search } = Input;

const ReportPage = () => {
	const [pageSize, setPageSize] = useState(10);
	const [dataSource, setdataSource] = useState();

	const [filteredData, setFilteredData] = useState(dataSource);
	const [selectedDates, setSelectedDates] = useState([null, null]);

	const [isModalVisible, setIsModalVisible] = useState(false);
	const [selectedReport, setSelectedReport] = useState(null);
	const [loading, setLoading] = useState(true);
	const navigate = useNavigate();

	const apiUrl = process.env.REACT_APP_API_URL;
	

	useEffect(() => {
		const gethis = async () => {
			setLoading(true);
			try {
			const response = await fetch(`${apiUrl}spso/report`, {
				method: 'GET',
				headers: {
				'Content-Type': 'application/json',
				},
				credentials: 'include',
			});
		
			const data = await response.json();
			if (data.message === 'Không có quyền truy cập') {
				navigate('/404');
				return;
			} 

			if (data.message === 'Người dùng chưa đăng nhập') {
				navigate('/auth/login');
				return;
			} 
		
			if (response.ok) {
				setdataSource(data)
				setFilteredData(data);
			}
			
			} catch (error) {
			console.error('Lỗi:', error);
			message.error('Đã xảy ra lỗi trong quá trình lấy dữ liệu!');
			} finally {
			setLoading(false);
			}
		}
		gethis();
	}, [navigate,apiUrl]);
  

	const paginationOptions = {
		pageSize,
		showSizeChanger: true,
		pageSizeOptions: ['5', '10', '20'],
		onShowSizeChange: (current, size) => setPageSize(size),
	};

	const columns = [
		{
			title: 'ID',
			dataIndex: 'id',
		},
		{
			title: 'Học kỳ',
			dataIndex: 'semester',
		},
		{
			title: 'Tháng',
			dataIndex: 'month',
		},
		{
			title: 'Nội dung',
			dataIndex: 'content',
		},
		{
			title: 'Thời gian tạo báo cáo',
			dataIndex: 'createdTime',
		},
		{
			title: 'Hành động',
			dataIndex: 'action',
			render: (_, record) => (
				<Button type='primary' onClick={() => showModal(record)}>
					Xem
				</Button>
			),
		},
	];

	const parseDateTime = (dateTimeStr) => {
		const [datePart, timePart] = dateTimeStr.split(' ');
		const [day, month, year] = datePart.split('-');
		return new Date(`${year}-${month}-${day}T${timePart}`);
	};

	const filterData = (searchValue, selectedRange) => {
		let filtered = dataSource;

		if (searchValue) {
			filtered = filtered.filter((item) => item.content.toLowerCase().includes(searchValue.toLowerCase()));
		}

		if (selectedRange && selectedRange[0] && selectedRange[1]) {
			const [start, end] = selectedRange;
			const endOfDay = new Date(end);
			endOfDay.setHours(23, 59, 59, 999);

			filtered = filtered.filter((item) => {
				const reportDate = parseDateTime(item.createdTime);
				return reportDate >= start && reportDate <= endOfDay;
			});
		}

		setFilteredData(filtered);
	};

	const handleDateChange = (dates, index) => {
		const updatedDates = [...selectedDates];
		updatedDates[index] = dates;
		setSelectedDates(updatedDates);
		filterData(null, updatedDates);
	};

	const handleSearch = (value) => {
		filterData(value, selectedDates);
	};

	const showModal = (record) => {
		setSelectedReport(record);
		setIsModalVisible(true);
	};

	const handleCancel = () => {
		setIsModalVisible(false);
		setSelectedReport(null);
	};

	return (
		<div className='p-2 min-h-screen ml-2'>
			<Breadcrumb separator='>'>
				<Breadcrumb.Item>
					<Link to='/'>bkssps.vn</Link>
				</Breadcrumb.Item>
				<Breadcrumb.Item>
					<Link to='/admin/home'>Admin</Link>
				</Breadcrumb.Item>
				<Breadcrumb.Item>Báo cáo sử dụng</Breadcrumb.Item>
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
				<div className='flex items-center justify-center mt-7'>
					<div className='flex flex-col bg-white p-6 rounded-lg shadow-lg w-[95%] md:w-[95%]'>
						<h3 className='text-xl font-semibold text-gray-800 mb-6 border-b pb-2'>Báo cáo sử dụng</h3>

						<div className='mb-4'>
							<Search placeholder='Tìm kiếm nội dung' onSearch={handleSearch} style={{ width: 200 }} />
						</div>

						<Table columns={columns} dataSource={filteredData} pagination={paginationOptions} bordered />
					</div>
				</div>
			)}

			<Modal title = {selectedReport ? selectedReport.content : "Báo cáo chi tiết"} visible={isModalVisible} onCancel={handleCancel} footer={null} width={800}>
				{selectedReport && (
					<div>
						<p className='mb-4'>Thời gian tạo: {selectedReport.createdTime}</p>
						<h3 className='text-base font-semibold pb-2' style={{color: "#0888B3"}}>Báo cáo sử dụng máy in</h3>
						<Table
							dataSource={selectedReport.printers}
							columns={[
								{ title: 'ID máy in', dataIndex: 'printerId', key: 'printerId' },
								{ title: 'Tên máy in', dataIndex: 'printerName', key: 'printerName' },
								{ title: 'Số đơn hàng', dataIndex: 'orders', key: 'orders' },
								{ title: 'Số trang A3 đã dùng', dataIndex: 'pagesA3', key: 'pagesA3' },
								{ title: 'Số trang A4 đã dùng', dataIndex: 'pagesA4', key: 'pagesA4' },
							]}
							pagination={false}
							className='mb-6'
						/>
						<h3 className='text-base font-semibold pb-2' style={{color: "#0888B3"}}>Báo cáo mua trang in</h3>
						<ResponsiveContainer width='100%' height={300}>
							<BarChart data={selectedReport.chartData} layout='vertical' barSize={20}>
								<CartesianGrid strokeDasharray='3 3' />
								<XAxis type='number' />
								<YAxis dataKey='name' type='category' />
								<Tooltip />
								<Legend />
								<Bar dataKey='value' fill='#8884d8' />
							</BarChart>
						</ResponsiveContainer>
					</div>
				)}
			</Modal>
		</div>
	);
};

export default ReportPage;
