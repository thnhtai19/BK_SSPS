import { SearchOutlined } from "@ant-design/icons";
import { Table } from "antd";
import axios from "axios";
import { useEffect, useState, Fragment } from "react";
import { useNavigate } from "react-router-dom";

function ManageUserPage() {
  const [pageSize, setPageSize] = useState(10);
  const [dataSource, setDataSource] = useState([]);
  const [filteredData, setFilteredData] = useState(dataSource);
  const [reLoad, setReLoad] = useState(false);

  const apiUrl = process.env.REACT_APP_API_URL;
  const navigate = useNavigate();

  function handleToggleStatusBan(e) {
    if (e.target.innerText === "Bị chặn") {
      const mssv = e.target.parentElement.parentElement.children[1].innerText;
      changeStatusUser(1, mssv);
    } else {
      const mssv = e.target.parentElement.parentElement.children[1].innerText;
      changeStatusUser(0, mssv);
    }
  }

  const fetchApiListUser = () => {
    axios
      .get(apiUrl + "spso/student", { withCredentials: true })
      .then((response) => {
        setDataSource(response.data.danh_sach);
        setFilteredData(response.data.danh_sach);
      })
      .catch((error) => {
        if (error.response) {
          // Server trả về lỗi không phải 2xx
          if (error.response.status === 401) {
            console.error("Chưa xác thực, yêu cầu đăng nhập");
            navigate("/auth/login");
          } else {
            console.error("Lỗi server:", error.response.data.message);
          }
        } else if (error.request) {
          console.error("Không thể kết nối tới server");
        } else {
          // Lỗi khác
          console.error("Lỗi:", error.message);
        }
      });
  };

  const fetchApiRoleUser = () => {
    axios
      .get(apiUrl + "user/profile", { withCredentials: true })
      .then((response) => {
        if (response.data.role === "SV") {
          navigate("/404");
        }
      })
      .catch((error) => {
        if (error.response) {
          // Server trả về lỗi không phải 2xx
          if (error.response.status === 401) {
            console.error("Chưa xác thực, yêu cầu đăng nhập");
            navigate("/auth/login");
          } else {
            console.error("Lỗi server:", error.response.data.message);
          }
        } else if (error.request) {
          console.error("Không thể kết nối tới server");
        } else {
          // Lỗi khác
          console.error("Lỗi:", error.message);
        }
      });
  };

  const changeStatusUser = (status, id) => {
    axios
      .put(
        apiUrl + "spso/update_status",
        { status, id },
        { withCredentials: true }
      )
      .then((response) => {
        setReLoad(!reLoad);
      })
      .catch((error) => {
        if (error.response) {
          // Server trả về lỗi không phải 2xx
          if (error.response.status === 401) {
            console.error("Chưa xác thực, yêu cầu đăng nhập");
            navigate("/auth/login");
          } else {
            console.error("Lỗi server:", error.response.data.message);
          }
        } else if (error.request) {
          console.error("Không thể kết nối tới server");
        } else {
          // Lỗi khác
          console.error("Lỗi:", error.message);
        }
      });
  };

  useEffect(() => {
    fetchApiRoleUser();
    fetchApiListUser();
  }, [reLoad]);

  const handlePageSizeChange = (value) => {
    setPageSize(value);
  };

  const paginationOptions = {
    pageSize,
    showSizeChanger: true,
    pageSizeOptions: ["5", "10", "20"],
    onShowSizeChange: (current, size) => handlePageSizeChange(size),
  };
  const columns = [
    {
      title: "ID",
      dataIndex: "STT",
    },
    {
      title: "Mã số sinh viên",
      dataIndex: "MSSV",
    },
    {
      title: "Họ và tên",
      dataIndex: "ten",
    },
    {
      title: "Địa chỉ email",
      dataIndex: "mail",
    },
    {
      title: "Hành động",
      dataIndex: "status",
      render: (text) => (
        <div
          className={
            text === 1
              ? "bg-[#BFFFD9] text-[#00760C] rounded-lg cursor-pointer  shadow-inner hover:shadow-[#00760C] select-none py-1 w-4/5 flex items-center justify-center font-medium"
              : "bg-[#FFBEBE] text-[#B90707] rounded-lg cursor-pointer shadow-inner hover:shadow-[#B90707] select-none py-1 w-4/5 flex items-center justify-center font-medium"
          }
          onClick={handleToggleStatusBan}
        >
          {text === 1 ? "Hoạt động" : "Bị chặn"}
        </div>
      ),
    },
  ];

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();

    const filtered = dataSource.filter((item) =>
      Object.keys(item).some((key) =>
        String(item[key]).toLowerCase().includes(value)
      )
    );
    setFilteredData(filtered);
  };
  return (
    <main className="sm:p-4 p-0 mt-4 sm:mt-0 border-[#EFF1F3] border-[1px]">
      <div className="bg-white rounded-lg p-4 shadow sm:w-full w-dvw">
        <h3 className="font-semibold text-lg">Danh sách người dùng</h3>
        <div className=" my-6 rounded-lg flex items-center border-[1px] border-gray-400 px-3  w-fit">
          <input
            type="text"
            placeholder="Tìm kiếm"
            onChange={handleSearch}
            className="outline-none"
          />
          <SearchOutlined className="hover:cursor-pointer text-xl hover:scale-105   py-1" />
        </div>
        <Table
          columns={columns}
          dataSource={filteredData}
          pagination={paginationOptions}
          scroll={{
            x: 900,
          }}
          className="shadow rounded-lg border-[#EFF1F3] border-[1px]"
        />
      </div>
    </main>
  );
}

export default ManageUserPage;
