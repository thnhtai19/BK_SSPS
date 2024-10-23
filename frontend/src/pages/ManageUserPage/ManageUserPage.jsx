import { SearchOutlined } from "@ant-design/icons";
import { Table, Breadcrumb } from "antd";
import axios from "axios";
import { useEffect, useState, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";

import { CloseOutlined } from "@ant-design/icons";

function PopUpToggleStatusBan({
  setShowPopUpChangeStatus,
  togglePopUpChangeStatus,
}) {
  const modelRef = useRef(null);

  function closeForgetPassword() {
    if (modelRef.current) {
      modelRef.current.classList.add("animate-zoomOut");
      modelRef.current.parentElement.classList.add("bg-transparent");
      modelRef.current.addEventListener("animationend", () => {
        setShowPopUpChangeStatus(false);
      });
    }
  }

  const handleChangeStatus = () => {
    togglePopUpChangeStatus(null, true);
  };

  return (
    <div className="bg-[rgba(128,128,128,0.5)] absolute top-0 right-0 left-0 bottom-0  flex items-center justify-center">
      <div
        ref={modelRef}
        className="animate animate-zoomIn  rounded-xl mx-3   text-center  flex flex-col  px-12 pt-3 pb-14 bg-white shadow-2xl sm:w-[600px]"
      >
        <CloseOutlined
          onClick={closeForgetPassword}
          className=" ml-auto text-xl hover:bg-[#D2ECF4] hover:cursor-pointer p-2"
        />
        <h1 className="text-2xl font-bold ">Xác nhận thay đổi trạng thái</h1>
        <p className="mt-4">
          Bạn có chắc chắn muốn thay đổi trạng thái của người dùng này không?
        </p>

        <div className="flex gap-6 mt-12">
          <button
            className="flex-1 bg-[#0688B4] hover:shadow-white font-bold shadow-inner text-white  py-3 rounded-xl"
            onClick={handleChangeStatus}
          >
            Đồng ý
          </button>

          <button
            className="flex-1 bg-[#627d98] hover:shadow-white font-bold shadow-inner text-white  py-3 rounded-xl"
            onClick={closeForgetPassword}
          >
            Hủy bỏ
          </button>
        </div>
      </div>
    </div>
  );
}

function ManageUserPage() {
  const [pageSize, setPageSize] = useState(10);
  const [dataSource, setDataSource] = useState([]);
  const [filteredData, setFilteredData] = useState(dataSource);
  const [showPopUpChangeStatus, setShowPopUpChangeStatus] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const apiUrl = process.env.REACT_APP_API_URL;
  const navigate = useNavigate();

  function handleToggleStatus(mssv) {
    if (!mssv) return;

    const mssvTypeNumber = parseInt(mssv);

    const status =
      dataSource.find((user) => user.MSSV === mssvTypeNumber).status === 1
        ? 0
        : 1;

    if (status !== null) {
      changeStatusUser(status, mssvTypeNumber);
      setShowPopUpChangeStatus(false);
    }
  }

  function togglePopUpChangeStatus(e, isConfirm) {
    if (!isConfirm) {
      const mssv = e.target.parentElement.parentElement.children[1].innerText;
      setSelectedUser(mssv);
      setShowPopUpChangeStatus(!showPopUpChangeStatus);
    } else {
      handleToggleStatus(selectedUser);
    }
  }

  const changeStatusUser = (status, id) => {
    axios
      .put(
        apiUrl + "spso/update_status",
        { status, id },
        { withCredentials: true }
      )
      .then((response) => {
        setDataSource((prev) =>
          prev.map((user) => (user.MSSV === id ? { ...user, status } : user))
        );
        setFilteredData((prev) =>
          prev.map((user) => (user.MSSV === id ? { ...user, status } : user))
        );
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
              navigate("/404");
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
    fetchApiListUser();
  }, [apiUrl, navigate]);

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
      title: "STT",
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
      title: "Trạng thái",
      dataIndex: "status",
      render: (text) => (
        <div
          className={
            text === 1
              ? "bg-[#BFFFD9] text-[#00760C] rounded-lg cursor-pointer  shadow-inner hover:shadow-[#00760C] select-none py-1 w-4/5 flex items-center justify-center font-medium"
              : "bg-[#FFBEBE] text-[#B90707] rounded-lg cursor-pointer shadow-inner hover:shadow-[#B90707] select-none py-1 w-4/5 flex items-center justify-center font-medium"
          }
          onClick={(e) => togglePopUpChangeStatus(e, false)}
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
      <Breadcrumb separator='>' className="pb-2">
          <Breadcrumb.Item>
            <Link to='/'>bkssps.vn</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <Link to='/admin/home'>Admin</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>Quản lý người dùng</Breadcrumb.Item>
        </Breadcrumb>
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
      {showPopUpChangeStatus && (
        <PopUpToggleStatusBan
          setShowPopUpChangeStatus={setShowPopUpChangeStatus}
          togglePopUpChangeStatus={togglePopUpChangeStatus}
        />
      )}
    </main>
  );
}

export default ManageUserPage;
