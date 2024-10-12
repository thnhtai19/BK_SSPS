import { SearchOutlined } from "@ant-design/icons";
import { useEffect, useState, useRef } from "react";
import { useNavigate } from 'react-router-dom';
import AddPrinter from "../../components/AddPrinter/AddPrinter";
import { Table } from "antd";
import { message} from 'antd';

function ManageUserPage() {
  const [pageSize, setPageSize] = useState(10);
  const [printerInfo, setPrinterInfo] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
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
          onClick={(e) => handleToggleStatus(e, record.ma_may_in, record.trang_thai_may_in)}
          className="bg-[#0688B4] text-white font-medium  py-1 w-3/5 shadow-inner  hover:shadow-[white] rounded-lg"
          >
          {text === "1" ? "Tắt" : "Bật"}
        </button>
      ),
    },

  ];

  useEffect(() => {
    //Kiểm tra trạng thái đăng nhập và role của người dùng
    const fetchUserProfile = async () => {
      try {
        const response = await fetch(`${apiUrl}user/profile`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
        });

        const data = await response.json();
        console.log(data);
        
        if (response.ok) {
          // Điều hướng đến trang 404 nếu người dùng là sinh viên
          if(data.role !== 'SSPO'){
            message.error("Không có quyền truy cập!")
            navigate("/404");
          }
        } else {
          message.error("Vui lòng đăng nhập!")
          navigate("/auth/login");
        }
      } catch (error) {
        setErrorMessage('Lỗi kết nối đến server');
        console.error('Lỗi:', error);
      }
    };

    //lấy dữ liệu máy in
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
          setErrorMessage(printerData.message)
        }
      } catch (error) {
          setErrorMessage('Lỗi kết nối đến server');
          console.error('Lỗi:', error);
      }
    };
    fetchUserProfile();
    fetchPrinterInfo();
  }, [apiUrl,navigate]);

  //Hàm sử lí hành động đổi trạng thái máy in
  async function handleToggleStatus(e, ma_may_in, currentStatus) {
    e.preventDefault();
    const newStatus = currentStatus === "1" ? false : true;
  
    try {
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
        e.target.textContent = newStatus === true ? "Tắt" : "Bật";
  
        const statusElement = e.target.parentElement.parentElement.children[6].children[0];
  
        // Thay đổi màu sắc và text dựa trên trạng thái mới
        if (newStatus === true) {
          // Máy in chuyển sang "Bật"
          statusElement.classList.remove("bg-[#FFBEBE]", "text-[#B90707]");
          statusElement.classList.add("bg-[#BFFFD9]", "text-[#00760C]");
          statusElement.textContent = "Đang bật";
        } else {
          // Máy in chuyển sang "Tắt"
          statusElement.classList.remove("bg-[#BFFFD9]", "text-[#00760C]");
          statusElement.classList.add("bg-[#FFBEBE]", "text-[#B90707]");
          statusElement.textContent = "Đang tắt";
        }

        const updatedPrinters = printerInfo.map(printer => 
          printer.ma_may_in === ma_may_in ? { ...printer, trang_thai_may_in: newStatus } : printer
        );

        setPrinterInfo(updatedPrinters);
        setFilteredData(updatedPrinters);

        alert(printerData.message); 
      } else {
        alert(printerData.message);
      }
    } catch (error) {
      console.error("Có lỗi xảy ra:", error);
      alert("Đã xảy ra lỗi khi cập nhật trạng thái máy in.");
    }
  }
  
  const [filteredData, setFilteredData] = useState(printerInfo);
  
  function handleSearch(e) {
    const value = e.target.value.toLowerCase();

    if (!value) {
      setFilteredData(printerInfo); // Reset to original data
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
      {/* popUp add new printer */}
      <div className="hidden" ref={addPrinterRef}>
        <AddPrinter
          onClose={handlePopupPrinter}
        />
      </div>
    </main>
  );
}

export default ManageUserPage;
