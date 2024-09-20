import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Table } from 'antd';
import { XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Area, AreaChart } from 'recharts';

const HistoryPage = () => {
	const [pageSize, setPageSize] = useState(10);
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
		},
		{
			title: 'Kích thước',
			dataIndex: 'size',
		},
		{
			title: 'Số trang',
			dataIndex: 'pages',
		},
	];
	const data = Array.from({ length: 20 }).map((_, i) => ({
		key: i,
		id: `212484${i}`,
		printerId: `908${i}`,
		document: `Document_${i}.pdf`,
		startTime: `12-09-2024 09:${i}:00`,
		endTime: `12-09-2024 09:${i + 1}:42`,
		size: i % 2 === 0 ? 'A4' : 'A3',
		pages: i * 5 + 10,
	}));

	const [selectedMonth, setSelectedMonth] = useState('');

	useEffect(() => {
		const today = new Date();
		const currentMonth = today.toISOString().slice(0, 7);
		setSelectedMonth(currentMonth);
	}, []);

	const handleMonthChange = (event) => {
		setSelectedMonth(event.target.value);
	};

	const chartData = [
		{ date: '10-09-2024', A3: 180, A4: 100 },
		{ date: '11-09-2024', A3: 160, A4: 80 },
		{ date: '12-09-2024', A3: 140, A4: 60 },
		{ date: '13-09-2024', A3: 170, A4: 90 },
		{ date: '14-09-2024', A3: 150, A4: 70 },
		{ date: '15-09-2024', A3: 130, A4: 50 },
		{ date: '16-09-2024', A3: 190, A4: 100 },
	];

	return (
		<div className='p-2 bg-gray-100 min-h-screen ml-2'>
			<div className='text-sm mb-5'>
				<Link to='/' className='text-black no-underline transition-colors duration-300 hover:text-gray-500'>
					bkssps.vn
				</Link>
				{' > '}
				<Link to='/history' className='text-black no-underline transition-colors duration-300 hover:text-gray-500'>
					Lịch sử in
				</Link>
			</div>

			<div className='flex justify-center items-center p-[20px]'>
				<input
					type='month'
					id='month-picker'
					value={selectedMonth}
					onChange={handleMonthChange}
					className='text-sm bg-white text-black p-2 rounded-lg border border-gray-200 hover:cursor-pointer shadow-md'
				/>
			</div>

			<div className='flex justify-center items-center bg-white p-6 rounded-lg shadow-lg w-[95%] md:w-[95%] lg:w-[90%] mb-10 mx-auto'>
				<h3 className='text-xl font-semibold text-gray-800 mb-6 border-b pb-2 text-center'>Thống kê số trang</h3>
				<ResponsiveContainer width='100%' height={300}>
					<AreaChart data={chartData}>
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

			<div className='flex items-center justify-center min-h-screen bg-gray-100'>
				<div className='flex flex-col bg-white p-6 rounded-lg shadow-lg w-[95%] md:w-[95%] lg:w-[90%]'>
					<h3 className='text-xl font-semibold text-gray-800 mb-6 border-b pb-2'>Nhật ký hoạt động</h3>
					<Table
						columns={columns}
						dataSource={data}
						pagination={paginationOptions}
						bordered
						rowClassName={(record, index) => (index % 2 === 0 ? 'bg-gray-50' : '')}
					/>
				</div>
			</div>
		</div>
	);
};

export default HistoryPage;
