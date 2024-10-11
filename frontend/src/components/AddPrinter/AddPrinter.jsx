import { useState } from "react";
import FormInput from "../../components/FormInputComponent/FormInput";
import { CloseOutlined } from "@ant-design/icons";

const AddPrinter = ({ onClose }) => {
	const [printerName, setPrinterName] = useState('');
  const [brand, setBrand] = useState('');
  const [printerVersion, setPrinterVersion] = useState('');
  const [description, setDescription] = useState('');
  const [co_so, setCo_so] = useState('');
  const [toa, setToa] = useState('');
  const [room, setRoom] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

	const handleSubmit = async (e) => {
    if (e && e.preventDefault) {
			e.preventDefault();
		}
	
		// Reset form input states here if needed
		setBrand('');
		setPrinterName('');
		setPrinterVersion('');
		setDescription('');
		setCo_so('');
		setToa('');
		setRoom('');

    // Prepare data for API call
    const newPrinter = {
      hang: brand,
      trang_thai_may_in: true,
      doi: printerVersion,
      mo_ta: description,
      ten_may: printerName,
      co_so: co_so, 
      toa: toa,     
      phong: room,  
    };
		console.log(newPrinter);

    try {
      const response = await fetch('http://localhost:3001/spso/addPrinter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newPrinter),
        credentials: 'include',
      });

      const data = await response.json();

      if (response.ok) {
        alert(data.message);
        onClose(); // Close the modal after successful addition
				window.location.reload();
      } else {
        // Handle error response
        setErrorMessage(data.message);
      }
    } catch (error) {
      console.error('Error adding printer:', error);
      setErrorMessage('Đã xảy ra lỗi khi thêm máy in.');
    }
  };

	return (
		<>
			<div className="fixed top-0 left-0 h-screen w-screen  bg-black bg-opacity-30 z-50 flex items-center justify-center">
				<div className="bg-white rounded-lg py-4 px-6 mx-4 pb-10 shadow-lg">
					<div className="flex justify-between">
						<h3 className="font-semibold text-lg ">Thêm máy in</h3>
						<button
							onClick={onClose}
							className="bg-[#0688B4] hover:shadow-white shadow-inner hover:cursor-pointer text-white font-semibold px-3 py-1 rounded-lg ml-auto block "
						>
							<CloseOutlined />
						</button>
					</div>
					{errorMessage && <p className="text-red-500">{errorMessage}</p>}
					<form className="flex sm:gap-10 gap-0 flex-wrap" onSubmit={handleSubmit}>
						<div className="flex-col flex-1">
							<FormInput 
								ID={"printer-name"}
								Type={"text"}
								Text={"Tên máy in"}
								initialValue={printerName}
								onChange={(e) => setPrinterName(e)}
							/>
							<FormInput 
								ID={"brand"}
								Type={"text"}
								Text={"Thương hiệu"}
								initialValue={brand}
								onChange={(e) => setBrand(e)}
							/>
							<FormInput 
								ID={"printer-type"}
								Type={"text"}
								Text={"Đời máy in"}
								initialValue={printerVersion}
								onChange={(e) => setPrinterVersion(e)}
							/>
							<FormInput 
								ID={"description"}
								Type={"text"}
								Text={"Mô tả"}
								initialValue={description}
								onChange={(e) => setDescription(e)}
							/>
						</div>

						<div className="flex-col flex-1">
							<legend className="text-center">Vị trí</legend>
							<fieldset>
								<FormInput 
									ID={"co-so"}
									Type={"text"}
									Text={"Cơ sở"}
									initialValue={co_so}
									onChange={(e) => setCo_so(e)}
								/>
								<FormInput 
									ID={"toa"}
									Type={"text"}
									Text={"Tòa"}
									initialValue={toa}
									onChange={(e) => setToa(e)}
								/>
								<FormInput 
									ID={"phong"}
									Type={"text"}
									Text={"Phòng"}
									initialValue={room}
									onChange={(e) => setRoom(e)}
								/>
							</fieldset>
							<div className="flex justify-end  mt-4">
								<button type="submit" className="bg-[#0688B4] mx-auto   text-white font-medium  py-1 w-3/5 shadow-inner  hover:shadow-[white] rounded-lg">
									Thêm
								</button>
							</div>
						</div>
					</form>
				</div>
			</div>
		</>
	)
	
};
export default AddPrinter;