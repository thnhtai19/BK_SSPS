import { useState } from 'react';

const FormInput = ({ID, Type, Text, Placeholder, initialValue}) =>{
	const [inputValue, setInputValue] = useState(initialValue || "");

	const handleInputChange = (e) => {
		setInputValue(e.target.value); 
	};

	return (
		<>
			<div className="flex flex-col">
				<label htmlFor={ID} className="text-gray-700 mb-1 font-medium">{Text}</label>
				<input 
					id={ID}
					type={Type}
					{...(Type === 'number' ? { min: "1", step: "1" } : {})}  
					value={inputValue}
					placeholder={Placeholder}
					onChange={handleInputChange}
					className="w-full h-10 px-3 bg-gray-100 text-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
				/>
			</div>
		</>
	)
}
export default FormInput;