import React, { useState } from 'react';

const ServicePage = () => {
	const [file, setFile] = useState(null);
	const [printer, setPrinter] = useState('');
	const [size, setSize] = useState('');
	const [faces, setFaces] = useState('');
	const [copies, setCopies] = useState('');
	const [pageSelection, setPageSelection] = useState('Tất cả');
	const [customPages, setCustomPages] = useState('');
	const [isCustomDisabled, setIsCustomDisabled] = useState(true);

	const handleFileUpload = (event) => {
		setFile(event.target.files[0]);
	};

	const handlePageSelectionChange = (event) => {
		const value = event.target.value;
		setPageSelection(value);
		setIsCustomDisabled(value === 'Tất cả');
	};

	const handleReset = () => {
		setFile(null);
		setPrinter('');
		setSize('');
		setFaces('');
		setCopies('');
		setPageSelection('Tất cả');
		setCustomPages('');
		setIsCustomDisabled(true);
	};

	const handlePrint = () => {
		if (!file) {
			alert('Please upload a file first!');
			return;
		}
		alert('Printing...');
	};

	return (
		<div className='p-4 bg-gray-100 min-h-screen'>
			<div className='text-sm mb-5'>
				<a href='/' className='text-black no-underline transition-colors duration-300 hover:text-gray-500'>
					bkssps.vn
				</a>{' '}
				&gt;
				<a href='/service' className='text-black no-underline transition-colors duration-300 hover:text-gray-500'>
					{' '}
					Dịch vụ in ấn
				</a>
			</div>

			<div className='bg-white p-6 rounded-lg shadow-md mb-10'>
				<h3 className='text-lg font-bold mb-4 text-gray-900'>Tải tài liệu lên</h3>
				<div className='border-dashed border-2 border-gray-300 p-6 text-center'>
					<input type='file' accept='.doc,.docx,.pdf' onChange={handleFileUpload} className='hidden' id='file-upload' />
					<label htmlFor='file-upload' className='cursor-pointer text-blue-500 hover:underline'>
						<img src={require('../../assets/upload.png')} alt='Upload' className='mx-auto w-12 h-12 mb-4' />
						Kéo thả tài liệu cần in vào đây hoặc click để chọn tài liệu
					</label>
					<p className='text-gray-500 text-sm mt-2'>(chỉ chấp nhận các định dạng .pdf, .doc, .docx)</p>
					{file && <p className='text-green-600 mt-4'>File đã chọn: {file.name}</p>}
				</div>
			</div>

			<div className='bg-white p-6 rounded-lg shadow-md'>
				<h3 className='text-lg font-bold mb-4 text-gray-900'>Bảng điều khiển</h3>
				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
					<div>
						<label className='block mb-2 font-bold text-gray-700'>Chọn máy in</label>
						<select
							value={printer}
							onChange={(e) => setPrinter(e.target.value)}
							className='block w-full p-2 border border-gray-300 rounded'
						>
							<option value=''>Chọn máy in</option>
							<option value='Máy in 1'>Máy in 1</option>
							<option value='Máy in 2'>Máy in 2</option>
						</select>
					</div>

					<div>
						<label className='block mb-2 font-bold text-gray-700'>Chọn kích thước</label>
						<select
							value={size}
							onChange={(e) => setSize(e.target.value)}
							className='block w-full p-2 border border-gray-300 rounded'
						>
							<option value=''>Chọn kích thước</option>
							<option value='A4'>A4</option>
							<option value='A3'>A3</option>
						</select>
					</div>

					<div>
						<label className='block mb-2 font-bold text-gray-700'>Số mặt mỗi tờ</label>
						<select
							value={faces}
							onChange={(e) => setFaces(e.target.value)}
							className='block w-full p-2 border border-gray-300 rounded'
						>
							<option value=''>Chọn số mặt mỗi tờ</option>
							<option value='1 mặt'>1 mặt</option>
							<option value='2 mặt'>2 mặt</option>
						</select>
					</div>

					<div>
						<label className='block mb-2 font-bold text-gray-700'>Số bản sao</label>
						<input
							type='number'
							value={copies}
							onChange={(e) => setCopies(e.target.value)}
							placeholder='Nhập số bản sao'
							className='block w-full p-2 border border-gray-300 rounded'
						/>
					</div>
				</div>

				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4'>
					<div>
						<label className='block mb-2 font-bold text-gray-700'>Chọn trang in</label>
						<select
							value={pageSelection}
							onChange={handlePageSelectionChange}
							className='block w-full p-2 border border-gray-300 rounded'
						>
							<option value='Tất cả'>Tất cả</option>
							<option value='Tùy chỉnh'>Tùy chỉnh</option>
						</select>
					</div>

					<div>
						<label className='block mb-2 font-bold text-gray-700'>Trang tùy chỉnh</label>
						<input
							type='text'
							value={customPages}
							onChange={(e) => setCustomPages(e.target.value)}
							placeholder='ex: 1-5, 8, 11-16'
							className='block w-full p-2 border border-gray-300 rounded'
							disabled={isCustomDisabled}
						/>
					</div>
				</div>

				<div className='flex justify-between mt-6'>
					<button
						className='bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-300'
						onClick={handleReset}
					>
						Xóa cài đặt
					</button>

					<button
						className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300'
						onClick={handlePrint}
					>
						Bắt đầu in
					</button>
				</div>
			</div>
		</div>
	);
};

export default ServicePage;
