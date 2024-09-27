import React, { useState } from 'react';
import { Breadcrumb } from 'antd';
import { Link } from 'react-router-dom';

const ServicePage = () => {
	const [file, setFile] = useState(null);
	const [printer, setPrinter] = useState('');
	const [size, setSize] = useState('A4');
	const [faces, setFaces] = useState('2 mặt');
	const [copies, setCopies] = useState('1');
	const [pageSelection, setPageSelection] = useState('Tất cả');
	const [customPages, setCustomPages] = useState('');
	const [isCustomDisabled, setIsCustomDisabled] = useState(true);
	const [isDragging, setIsDragging] = useState(false);
	
	const handleDragOver = (event) => {
		event.preventDefault();
		setIsDragging(true);
	}

	const handleDragLeave = (event) => {
		event.preventDefault();
		setIsDragging(false);
	}

	const handleDrop = (event) => {
		event.preventDefault();
		setIsDragging(false);

		if (event.dataTransfer.files && event.dataTransfer.files[0]){
			const droppedFile = event.dataTransfer.files[0];
			if (['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'].includes(droppedFile.type)) {
				setFile(droppedFile);
			} else {
				alert('Chỉ chấp nhận file .pdf, .doc, .docx');
			}
		}
	}

	const handleFileUpload = (event) => {
		if (event.target.files && event.target.files[0]) {
			setFile(event.target.files[0]);
		}
	};

	const handlePageSelectionChange = (event) => {
		const value = event.target.value;
		setPageSelection(value);
		setIsCustomDisabled(value === 'Tất cả');
	};

	const handleReset = () => {
		setPrinter('');
		setSize('');
		setFaces('2 mặt');
		setCopies('1');
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
		<div className='p-4 min-h-screen'>
			<Breadcrumb separator=">">
    			<Breadcrumb.Item>
					<Link to='/'>bkssps.vn</Link>
				</Breadcrumb.Item>
    			<Breadcrumb.Item>
					In tài liệu
				</Breadcrumb.Item>
  			</Breadcrumb>

			<div className='bg-white p-6 rounded-lg shadow-md mb-10 mt-5'>
				<h3 className='text-lg font-bold mb-4 text-gray-900'>Tải tài liệu lên</h3>
				<div 
					className={`border-dashed border-2 p-6 text-center ${isDragging ? 'border-blue-500' : 'border-gray-300'}`}
					onDragOver={handleDragOver}
					onDragLeave={handleDragLeave}
					onDrop={handleDrop}
				>
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
							min={1}
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
  						className={`px-4 py-2 rounded transition duration-300 ${!printer ? 'bg-gray-200 cursor-not-allowed text-gray-700' : 'bg-blue-500 text-white hover:bg-blue-600'}`}
  						onClick={handlePrint}
  						disabled={!printer} 
					>	
						Bắt đầu in
					</button>
				</div>
			</div>
		</div>
	);
};

export default ServicePage;
