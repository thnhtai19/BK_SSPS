import { Table } from "antd";

const DiaryTable = ({diaryEntries}) => {
	const columns = [
		{
			title: "ID",
			dataIndex: "id",
			key: "id",
		},
    {
      title: 'Thời gian',
      dataIndex: 'thoi_gian',
      key: 'thoi_gian',
    },
    {
      title: 'Nội dung',
      dataIndex: 'noi_dung',
      key: 'noi_dung',
    },
  ];

	return (
		<>
			<div className="flex-1 flex flex-col mt-6 w- bg-white border-[2px] border-[#EFF1F3] p-6  rounded-xl">
        <h3 className="text-lg font-medium mb-4">Nhật ký hoạt động</h3>
        <div className="w-full overflow-x-scroll">
          <Table columns={columns} dataSource={diaryEntries}  />
        </div>
      </div>
		</>
	)
};

export default DiaryTable;