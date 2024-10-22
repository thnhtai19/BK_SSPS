import { SearchOutlined } from "@ant-design/icons";
import { useEffect, useState, useRef } from "react";
import { useNavigate } from 'react-router-dom';
import AddPrinter from "../../components/AddPrinter/AddPrinter";
import { Table, Modal, message } from 'antd';


function ManageUserPage() {
  const [pageSize, setPageSize] = useState(10);
  const [printerInfo, setPrinterInfo] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedPrinter, setSelectedPrinter] = useState(null);

  const addPrinterRef = useRef(null);
  const apiUrl = process.env.REACT_APP_API_URL;
  const navigate = useNavigate();
  
  const handlePageSizeChange = (value) => {
    setPageSize(value);
  };
  
  const paginationOptions = {
    pageSize,
    showSizeChanger: true,
    pageSizeOptions: ["5", "10", "20"],
    onShowSizeChange: (current, size) => handlePageSizeChange(size),
  };
  
  //Cấu trúc của bảng danh sách máy in
  const columns = [
    {
      title: "ID",
      dataIndex: "ma_may_in",
      key: "ma_may_in"
    },
    {
      title: "Tên máy in",
      dataIndex: "ten_may",
      key: "ten_may"
    },
    {
      title: "Thương hiệu",
      dataIndex: "hang",
      key: "hang"
    },
    {
      title: "Đời máy in",
      dataIndex: "doi",
      key: "doi"
    },
    {
      title: "Mô tả",
      dataIndex: "mo_ta",
      key: "mo_ta"
    },
    {
      title: "Vị trí",
      dataIndex: "location",
      key: "location"
    },
    {
      title: "Trạng thái",
      dataIndex: "trang_thai_may_in",
      key: "trang_thai_may_in",
      render: (text) => (
        <div
          className={
            text === "1"
              ? "bg-[#BFFFD9] text-[#00760C] rounded-lg py-1  flex items-center justify-center font-medium"
              : "bg-[#FFBEBE] text-[#B90707] rounded-lg py-1  flex items-center justify-center font-medium"
          }
        >
          {text === "1" ? "Đang bật" : "Đang tắt"}
        </div>
      ),
    },
    {
      title: "Hành động",
      dataIndex: "trang_thai_may_in",
      key: "trang_thai_may_in",
      render: (text, record) => (
        <button
          onClick={() => showModal(record)}
          className="bg-[#0688B4] text-white font-medium  py-1 w-3/5 shadow-inner  hover:shadow-[white] rounded-lg"
          >
          {text === "1" ? "Tắt" : "Bật"}
        </button>
      ),
    },

  ];

  //lấy dữ liệu máy in
  useEffect(() => {
    const fetchPrinterInfo = async () => {
      try {
        const response = await fetch(`${apiUrl}spso/getAllPrinter`, {
          method: 'GET',
          headers: {
              'Content-Type': 'application/json'
          },
          credentials: 'include',
        });

        const printerData = await response.json();
        
        if (response.ok) {
          const updatedData = printerData.map(printer => {
            return {
              ...printer,
              location: `Tầng ${printer.co_so}, ${printer.toa}, ${printer.phong}` // Gộp các dữ liệu liên quan lại thành location
            };
          });
          setPrinterInfo(updatedData);
          setFilteredData(updatedData);
        } else {
          setErrorMessage(printerData.message);
          if(printerData.message === "Không có quyền truy cập!"){
            message.error("Không có quyền truy cập!")
            navigate("/404");
          }
          if (printerData.message === "Chưa xác thực thông tin người dùng!"){
            message.error("Vui lòng đăng nhập!")
            navigate("/auth/login");
          }
        }
      } catch (error) {
        setErrorMessage('Lỗi kết nối đến server');
        console.error('Lỗi:', error);
      }
    };

    fetchPrinterInfo();
  }, [apiUrl,navigate]);
  
  //Handel đổi trạng thái máy in
  async function handleToggleStatus(ma_may_in, currentStatus) {
    try {
      const newStatus = currentStatus === "1" ? false : true;
  
      // Gọi API cập nhật trạng thái máy in
      const response = await fetch(`${apiUrl}spso/updatePrinterStatus`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ma_may_in: ma_may_in,
          trang_thai: newStatus
        }),
        credentials: 'include',
      });
  
      const printerData = await response.json();
  
      if (response.ok) {
        const updatedPrinters = printerInfo.map(printer => 
          printer.ma_may_in === ma_may_in ? { ...printer, trang_thai_may_in: newStatus ? "1" : "0" } : printer
        );
  
        setPrinterInfo(updatedPrinters);
        setFilteredData(updatedPrinters);
  
        message.success(printerData.message); 
      } else {
        message.error(printerData.message);
      }
    } catch (error) {
      console.error("Có lỗi xảy ra:", error);
      message.error("Đã xảy ra lỗi khi cập nhật trạng thái máy in.");
    }
  }
  
  const showModal = (printer) => {
    setSelectedPrinter(printer); 
    setIsModalVisible(true);      
  };
  
  const handleCancel = () => {
    setIsModalVisible(false);   
  }; 
  
  const handleConfirmToggle = async () => {
    setIsModalVisible(false);  
    await handleToggleStatus(selectedPrinter.ma_may_in, selectedPrinter.trang_thai_may_in);
  };

  const [filteredData, setFilteredData] = useState(printerInfo);
  
  function handleSearch(e) {
    const value = e.target.value.toLowerCase();

    if (!value) {
      setFilteredData(printerInfo); // Reset về dữ liệu gốc
      return;
    }

    const filtered = printerInfo.filter((item) =>
      Object.keys(item).some((key) =>
        String(item[key]).toLowerCase().includes(value)
      )
    );

    setFilteredData(filtered);
  }

  function handlePopupPrinter(e) {
    if (e && e.preventDefault) {
      e.preventDefault();
    }
    addPrinterRef.current.classList.toggle("hidden");
  }

  const handleAddPrinterSuccess = (newPrinter) => {
    const editNewPrinter = {
      ...newPrinter, 
      location: `Tầng ${newPrinter.co_so}, ${newPrinter.toa}, ${newPrinter.phong}`
    };
  
    setPrinterInfo((prevPrinterInfo) => [...prevPrinterInfo, editNewPrinter]);
    setFilteredData((prevFilteredData) => [...prevFilteredData, editNewPrinter]);
  };
  

  return (
    <main className="sm:p-4 p-0 mt-6 sm:mt-0">
      {/* main content */}
      <section className="bg-white rounded-lg p-4 pb-10 sm:w-full w-dvw  shadow overflow-auto">

        <h3 className="font-semibold text-lg">Quản lý máy in</h3>
        <div className="flex justify-between items-center my-6">
          <div className="  rounded-lg flex items-center border-[1px] border-gray-400 px-3  w-fit">
            <input
              type="text"
              placeholder="Tìm kiếm"
              className="outline-none"
              onChange={handleSearch}
            />
            <SearchOutlined className="hover:cursor-pointer text-xl hover:scale-105   py-1" />
          </div>

          <button
            onClick={handlePopupPrinter}
            className="bg-[#0688B4] font-semibold text-white h-fit hover:shadow-white border-[#EFF1F3] border-[1px] shadow-inner px-3 py-1 rounded-lg"
          >
            + Thêm máy in
          </button>
        </div>

        <Table
          columns={columns}
          dataSource={filteredData}
          pagination={paginationOptions}
          scroll={{
            x: 900,
          }}
          className="shadow rounded-lg border-[#EFF1F3] border-[1px] "
        />
        {errorMessage && <p className="text-red-500">{errorMessage}</p>}

      </section>

      {/* popUp thêm máy in */}
      <div className="hidden" ref={addPrinterRef}>
        <AddPrinter
          onClose={handlePopupPrinter}
          onAddPrinterSuccess={handleAddPrinterSuccess}
        />
      </div>

      {/* popUp xác nhận thay đổi trạng thái máy in */}
      <Modal
        title="Xác nhận thay đổi trạng thái"
        visible={isModalVisible}
        onOk={handleConfirmToggle}
        onCancel={handleCancel}
        okText="Xác nhận"
        cancelText="Hủy"
      >
        <p>Bạn có chắc chắn muốn {selectedPrinter?.trang_thai_may_in === "1" ? "tắt" : "bật"} máy in này không?</p>
      </Modal>

    </main>
  );
}

export default ManageUserPage;
