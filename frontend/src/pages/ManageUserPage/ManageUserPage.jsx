import { SearchOutlined } from "@ant-design/icons";
import { render } from "@testing-library/react";
import { Table } from "antd";

import { useEffect, useState } from "react";

function ManageUserPage() {
  const [pageSize, setPageSize] = useState(10);
  const [searchText, setSearchText] = useState("");

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
      dataIndex: "id",
    },
    {
      title: "Mã số sinh viên",
      dataIndex: "mssv",
    },
    {
      title: "Họ và tên",
      dataIndex: "fullName",
    },
    {
      title: "Địa chỉ email",
      dataIndex: "email",
    },
    {
      title: "Hành động",
      dataIndex: "action",
      render: (text) => (
        <div
          className={
            text.toLowerCase() === "unban"
              ? "bg-[#BFFFD9] text-[#00760C] rounded-lg py-1 w-3/5 flex items-center justify-center font-medium"
              : "bg-[#FFBEBE] text-[#B90707] rounded-lg py-1 w-3/5 flex items-center justify-center font-medium"
          }
        >
          {text}
        </div>
      ),
    },
  ];
  const dataSource = Array.from({
    length: 17,
  }).map((_, i) => ({
    key: i,
    id: `#${i + 1}`,
    mssv: `2213001`,
    fullName: `Trần Thành Tài`,
    email: `tai.tranthanh@hcmut.edu.vn`,
    action: `${i % 2 === 0 ? "Ban" : "UnBan"}`,
  }));

  const [filteredData, setFilteredData] = useState(dataSource);

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchText(value);

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
