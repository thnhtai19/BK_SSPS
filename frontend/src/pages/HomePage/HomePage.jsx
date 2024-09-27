import React from 'react';
import { Link } from 'react-router-dom';
import { Breadcrumb } from 'antd';
import { XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';

const HomePage = () => {
	const chartData = [
		{ date: '09-09-2024', printedDocs: 10, usedPages: 20 },
		{ date: '10-09-2024', printedDocs: 50, usedPages: 60 },
		{ date: '11-09-2024', printedDocs: 80, usedPages: 70 },
		{ date: '12-09-2024', printedDocs: 40, usedPages: 50 },
		{ date: '13-09-2024', printedDocs: 30, usedPages: 40 },
		{ date: '14-09-2024', printedDocs: 90, usedPages: 80 },
	];

	return (
		<div className='p-4 min-h-screen'>
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
						<div className='text-xl font-bold text-gray-900 mt-2'>999.999.999 VNĐ</div>
					</div>
					<div className='ml-4'>
						<img src={require('../../assets/16842271.png')} alt='Money' className='w-16 h-16' />
					</div>
				</div>

				<div className='bg-white p-6 rounded-lg shadow-md flex justify-between items-center w-full md:w-[30%]'>
					<div>
						<div className='text-lg font-bold text-gray-900'>Tổng tài liệu đã in</div>
						<div className='text-xl font-bold text-gray-900 mt-2'>10</div>
					</div>
					<div className='ml-4'>
						<img src={require('../../assets/file.png')} alt='File' className='w-16 h-16' />
					</div>
				</div>

				<div className='bg-white p-6 rounded-lg shadow-md flex justify-between items-center w-full md:w-[30%]'>
					<div>
						<div className='text-lg font-bold text-gray-900'>Số trang còn lại</div>
						<div className='text-xl font-bold text-gray-900 mt-2'>2210</div>
					</div>
					<div className='ml-4'>
						<img src={require('../../assets/paper.png')} alt='Paper' className='w-16 h-16' />
					</div>
				</div>
			</div>

			<div className='bg-white p-6 rounded-lg shadow-md items-center'>
				<h3 className='text-lg font-bold mb-4 text-gray-900'>Thống kê</h3>
				<div className='w-full h-96'>
					<ResponsiveContainer width='100%' height={300}>
						<LineChart data={chartData}>
							<XAxis dataKey='date' />
							<YAxis />
							<CartesianGrid strokeDasharray='3 3' />
							<Tooltip />
							<Legend />
							<Line type='monotone' dataKey='printedDocs' stroke='#FF7F7F' strokeWidth={2} name='Tài liệu đã in' />
							<Line type='monotone' dataKey='usedPages' stroke='#8884d8' strokeWidth={2} name='Số trang đã dùng' />
						</LineChart>
					</ResponsiveContainer>
				</div>
			</div>
		</div>
	);
};

export default HomePage;
