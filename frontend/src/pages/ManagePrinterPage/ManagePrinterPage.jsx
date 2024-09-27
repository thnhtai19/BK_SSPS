import { SearchOutlined } from "@ant-design/icons";
import { Table } from "antd";
import { CloseOutlined } from "@ant-design/icons";

import { useEffect, useState, useRef } from "react";

function ManageUserPage() {
  const [pageSize, setPageSize] = useState(10);
  const [searchText, setSearchText] = useState("");
  const addPrinterRef = useRef(null);

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
      title: "Tên máy in",
      dataIndex: "printerName",
    },
    {
      title: "Thương hiệu",
      dataIndex: "brand",
    },
    {
      title: "Kiểu máy in",
      dataIndex: "printerType",
    },
    {
      title: "Mô tả",
      dataIndex: "description",
    },
    {
      title: "Vị trí",
      dataIndex: "location",
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      render: (text) => (
        <div
          className={
            text.toLowerCase() === "đang bật"
              ? "bg-[#BFFFD9] text-[#00760C] rounded-lg py-1  flex items-center justify-center font-medium"
              : "bg-[#FFBEBE] text-[#B90707] rounded-lg py-1  flex items-center justify-center font-medium"
          }
        >
          {text}
        </div>
      ),
    },
    {
      title: "Hành động",
      dataIndex: "action",
      render: (text) => (
        <button
          onClick={handleToggleStatus}
          className="bg-[#0688B4] text-white font-medium  py-1 w-3/5 shadow-inner  hover:shadow-[white] rounded-lg"
        >
          {text}
        </button>
      ),
    },
  ];
  const dataSource = Array.from({
    length: 17,
  }).map((_, i) => ({
    key: i,
    id: `#${i + 1}`,
    printerName: `Máy in 1`,
    brand: `MSI`,
    printerType: `In màu`,
    description: `Máy in mượt nhất trường`,
    location: `Tầng 1, H1, CS2`,
    status: `${i % 2 === 0 ? "Đang bật" : "Đang tắt"}`,
    action: `${i % 2 === 0 ? "Tắt" : "Bật"}`,
  }));

  const [filteredData, setFilteredData] = useState(dataSource);

  function handleSearch(e) {
    const value = e.target.value.toLowerCase();
    setSearchText(value);

    const filtered = dataSource.filter((item) =>
      Object.keys(item).some((key) =>
        String(item[key]).toLowerCase().includes(value)
      )
    );
    setFilteredData(filtered);
  }

  function handlePopupPrinter(e) {
    e.preventDefault();
    addPrinterRef.current.classList.toggle("hidden");
  }

  function handleToggleStatus(e) {
    e.preventDefault();
    e.target.textContent = e.target.textContent === "Bật" ? "Tắt" : "Bật";
    // change color status column
    if (e.target.textContent.toLowerCase() === "bật") {
      e.target.parentElement.parentElement.children[6].children[0].classList.remove(
        "bg-[#BFFFD9]",
        "text-[#00760C]"
      );
      e.target.parentElement.parentElement.children[6].children[0].classList.add(
        "bg-[#FFBEBE]",
        "text-[#B90707]"
      );
    } else {
      e.target.parentElement.parentElement.children[6].children[0].classList.remove(
        "bg-[#FFBEBE]",
        "text-[#B90707]"
      );
      e.target.parentElement.parentElement.children[6].children[0].classList.add(
        "bg-[#BFFFD9]",
        "text-[#00760C]"
      );
    }

    // change status column (on/off)
    e.target.parentElement.parentElement.children[6].children[0].textContent =
      e.target.textContent.toLowerCase() === "bật" ? "Đang tắt" : "Đang bật";
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
      </section>
      {/* popUp add new printer */}
      <div className="hidden" ref={addPrinterRef}>
        <div className="fixed top-0 left-0 h-screen w-screen  bg-black bg-opacity-30 z-50 flex items-center justify-center">
          <div className="bg-white rounded-lg py-4 px-6 mx-4 pb-10 shadow-lg">
            <div className="flex justify-between">
              <h3 className="font-semibold text-lg ">Thêm máy in</h3>
              <button
                onClick={handlePopupPrinter}
                className="bg-[#0688B4] hover:shadow-white shadow-inner hover:cursor-pointer text-white font-semibold px-3 py-1 rounded-lg ml-auto block "
              >
                <CloseOutlined />
              </button>
            </div>
            <form className="flex sm:gap-10 gap-0 flex-wrap">
              <div className="flex flex-1 flex-col">
                <label className="my-2">Tên máy in</label>
                <input
                  type="text"
                  className="border-[1px] border-gray-400 rounded-lg outline-none px-2 py-1"
                />
                <label className="my-2">Thương hiệu</label>
                <input
                  type="text"
                  className="border-[1px] border-gray-400 rounded-lg outline-none px-2 py-1"
                />
                <label className="my-2">Kiểu máy in</label>
                <input
                  type="text"
                  className="border-[1px] border-gray-400 rounded-lg outline-none px-2 py-1"
                />
              </div>
              <div className="flex flex-1 flex-col">
                <label className="my-2">Mô tả</label>
                <input
                  type="text"
                  className="border-[1px] border-gray-400 rounded-lg outline-none px-2 py-1"
                />
                <label className="my-2">Vị trí</label>
                <input
                  type="text"
                  className="border-[1px] border-gray-400 rounded-lg outline-none px-2 py-1"
                />
                <div className="flex justify-end sm:mt-auto mt-6">
                  <button className="bg-[#0688B4] mx-auto   text-white font-medium  py-1 w-3/5 shadow-inner  hover:shadow-[white] rounded-lg">
                    Thêm
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}

export default ManageUserPage;
