//import { useState } from 'react';

const FormInput = ({ID, Type, Value, Text, Placeholder}) =>{
	return (
		<>
			<div className="flex flex-col">
				<label htmlFor={ID} className="text-gray-700 mb-1 font-medium">{Text}</label>
				<input 
					id={ID}
					type={Type} 
					value={Value}
					placeholder={Placeholder}
					className="w-full h-10 px-3 bg-gray-100 text-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
				/>
			</div>
		</>
	)
}
export default FormInput;