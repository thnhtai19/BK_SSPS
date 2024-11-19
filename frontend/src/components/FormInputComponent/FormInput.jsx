import { useState, useEffect } from 'react';

const FormInput = ({ ID, Type, Text, Placeholder, initialValue, disabled, onChange }) => {
	const [inputValue, setInputValue] = useState(initialValue || "");

	const handleInputChange = (e) => {
		const value = e.target.value;
		setInputValue(value);
		if (onChange) {
			onChange(value);
		}
	};

	useEffect(() => {
		setInputValue(initialValue || "");
	}, [initialValue]);

	return (
		<div className="flex flex-col">
			<label htmlFor={ID} className="text-gray-700 mb-1 font-medium">{Text}</label>
			<input 
				id={ID}
				type={Type}
				{...(Type === 'number' ? { min: "1", step: "1" } : {})}  
				value={inputValue}
				placeholder={Placeholder}
				onChange={handleInputChange}
				disabled={disabled}
				className={`w-full h-10 px-3 ${disabled ? 'bg-gray-100 text-gray-500' : 'bg-white text-gray-700'} text-gray-700 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-400`}
			/>
		</div>
	);
}

export default FormInput;
