import React, {useState} from 'react'
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { WrapContainer } from './style'
import TableComponent from '../../components/TableComponent/TableComponent';
import { FilterOutlined } from '@ant-design/icons';
import { DatePicker } from "antd";

const AdminHistoryPage = () => {
    const [selectedDateStart, setSelectedDateStart] = useState(null);
    const [selectedDateEnd, setSelectedDateEnd] = useState(null);

    const handleChangeStart = (date, dateString) => {
      setSelectedDateStart(date);
    };

    const handleChangeEnd = (date, dateString) => {
      setSelectedDateEnd(date);
    };

    const  handleEdit = (id) => {
      
    };

    const dataSource = [
      {
        id: 2212484,
        studentId: '123456',
        printerName: 'Máy in A',
        documentName: 'Bài giảng Toán',
        startTime: '12-09-2024 09:00:00',
        endTime: '12-09-2024 09:15:00',
        paperSize: 'A4',
        numberOfPages: 10,
        status: 'Đã in',
      },
      {
        id: 2212485,
        studentId: '123457',
        printerName: 'Máy in B',
        documentName: 'Bài giảng Lý',
        startTime: '12-09-2024 09:30:00',
        endTime: '12-09-2024 09:45:00',
        paperSize: 'A3',
        numberOfPages: 15,
        status: 'Đang in',
      },
      {
        id: 2212486,
        studentId: '123458',
        printerName: 'Máy in C',
        documentName: 'Bài giảng Hoá',
        startTime: '12-09-2024 10:00:00',
        endTime: '12-09-2024 10:10:00',
        paperSize: 'A5',
        numberOfPages: 5,
        status: 'Chờ in',
      },
    ];
    

    const columns = [
      {
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
      },
      {
        title: 'MSSV',
        dataIndex: 'studentId',
        key: 'studentId',
      },
      {
        title: 'Tên máy in',
        dataIndex: 'printerName',
        key: 'printerName',
      },
      {
        title: 'Tên tài liệu',
        dataIndex: 'documentName',
        key: 'documentName',
      },
      {
        title: 'Thời gian bắt đầu',
        dataIndex: 'startTime',
        key: 'startTime',
      },
      {
        title: 'Thời gian kết thúc',
        dataIndex: 'endTime',
        key: 'endTime',
      },
      {
        title: 'Cỡ giấy',
        dataIndex: 'paperSize',
        key: 'paperSize',
      },
      {
        title: 'Số trang',
        dataIndex: 'numberOfPages',
        key: 'numberOfPages',
      },
      {
        title: 'Trạng thái',
        dataIndex: 'status',
        key: 'status',
        render: (text) => {
          let style = {};
    
          if (text === 'Đã in') {
            style = {
              backgroundColor: '#BFFFD9',
              color: '#00760C',
              borderRadius: '10px',
              padding: '6px 8px',
            };
          } else if (text === 'Đang in') {
            style = {
              backgroundColor: '#FFF3CD',
              color: '#856404',
              borderRadius: '10px',
              padding: '6px 8px',
            };
          } else if (text === 'Chờ in') {
            style = {
              backgroundColor: '#F8D7DA',
              color: '#721C24',
              borderRadius: '10px',
              padding: '6px 8px',
            };
          } else {
            style = {
              backgroundColor: 'transparent',
              color: 'black',
              borderRadius: '10px',
              padding: '6px 8px',
            };
          }
    
          return <span style={style}>{text}</span>;
        },
      },
      {
        title: 'Hành động',
        key: 'action',
        render: (text, record) => (
          <span>
            <button
              onClick={() => handleEdit(record.id)}
              style={{ 
                border: '1px solid #0688B4', 
                backgroundColor: 'transparent', 
                color: '#0688B4', 
                padding: '4px 8px', 
                borderRadius: '10px', 
                cursor: 'pointer' 
              }}
            >
              Cập nhật
            </button>
          </span>
        ),
      },      
    ]
    

      

    return (
        <HelmetProvider>
            <Helmet>
                <title>Lịch sử in - BK SSPS Admin</title>
            </Helmet>
            <WrapContainer>
              <div className='wrap-text'>
                bkssps.vn &gt; Admin &gt; Lịch sử in
              </div>
              <div className='wrap-filler'>
                <FilterOutlined className='wrap-ttt' />
                <div className='wrap-ttt'>Lọc từ ngày</div>
                <DatePicker 
                  onChange={handleChangeStart} 
                  value={selectedDateStart} 
                  format="DD/MM/YYYY"
                  placeholder="Chọn ngày" 
                />
                <div className='wrap-ttt'>đến ngày</div>
                <DatePicker
                  onChange={handleChangeEnd} 
                  value={selectedDateEnd} 
                  format="DD/MM/YYYY"
                  placeholder="Chọn ngày" 
                />
              </div>

              <div style={{backgroundColor: "#FFF", padding: '20px 20px', borderRadius: '15px', border: '1px solid #EFF1F3'}}>
                  <div style={{fontSize: '20px', fontWeight: 'bold', paddingBottom: '10px', paddingLeft: '5px'}}>
                    Lịch sử in
                  </div>
                  <div class="inner-box">
                    <TableComponent dataSource={dataSource} columns={columns} />
                  </div>
                </div>
            </WrapContainer>
        </HelmetProvider>
    )
}

export default AdminHistoryPage