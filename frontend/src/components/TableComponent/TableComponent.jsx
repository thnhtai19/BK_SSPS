import React, { useState } from "react";
import { Table, Input } from "antd";

const TableComponent = ({ dataSource, columns }) => {
  const [searchText, setSearchText] = useState("");
  const [filteredData, setFilteredData] = useState(dataSource);
  const [pageSize, setPageSize] = useState(5);

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

  const handlePageSizeChange = (current, size) => {
    setPageSize(size);
  };

  const centeredColumns = columns.map((col) => ({
    ...col,
    align: 'center',
  }));

  return (
    <div>
      <Input
        placeholder="Tìm kiếm..."
        value={searchText}
        onChange={handleSearch}
        style={{ marginBottom: 16, width: 300 }}
      />
      <div style={{ minHeight: '400px' }}>
      <Table
        columns={centeredColumns}
        dataSource={filteredData}
        pagination={{
          pageSize: pageSize, 
          showSizeChanger: true,
          pageSizeOptions: ['5', '10', '20', '50'],
          onShowSizeChange: handlePageSizeChange,
        }}
        scroll={{ x: 'max-content' }}
      />
      </div>
    </div>
  );
};

export default TableComponent;
