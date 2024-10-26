import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Area,
  AreaChart,
} from "recharts";
import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import {Breadcrumb} from "antd";
import Paper from "../../assets/paper.png";
import DolarIcon from "../../assets/16842271.png";
import UserIcon from "../../assets/userIcon.png";

function AdminHome() {
  const [chartData, setChartData] = useState([]);
  const [genralData, setGenralData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const apiUrl = process.env.REACT_APP_API_URL;

    function fetchData() {
      axios
        .get(apiUrl + "spso/adminHomePage", { withCredentials: true })
        .then((res) => {
          setChartData(res.data.thong_ke_2);
          setGenralData(res.data.thong_ke_1);
        })
        .catch((error) => {
          if (error.response) {
            // Server trả về lỗi không phải 2xx
            if (error.response.status === 401) {
              console.error("Chưa xác thực, yêu cầu đăng nhập");
              navigate("/auth/login");
            } else {
              navigate("/404")
              console.error("Lỗi server:", error.response.data.message);              
            }
          } else if (error.request) {
            console.error("Không thể kết nối tới server");
          } else {
            // Lỗi khác
            console.error("Lỗi:", error.message);
          }
        });
    }

    fetchData();
  }, [navigate]);  

  return (
    <main className="p-8">
      <Breadcrumb separator='>' className="pb-2">
          <Breadcrumb.Item>
            <Link to='/'>bkssps.vn</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <Link to='/admin/home'>Admin</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>Quản lý người dùng</Breadcrumb.Item>
        </Breadcrumb>
      <header className="flex gap-10 flex-wrap">
        <div className="flex flex-1 min-w-fit justify-between items-center p-4 bg-white rounded-xl  font-semibold   shadow">
          <div>
            <p>Tổng số người dùng</p>
            <p className="text-lg">{genralData.tong_nguoi_dung}</p>
          </div>
          <div className="w-14 object-cover">
            <img src={UserIcon} alt="" />
          </div>
        </div>
        <div className="flex flex-1 min-w-fit justify-between items-center p-4 bg-white rounded-xl  font-semibold  shadow">
          <div>
            <p>Tổng doanh thu</p>
            <p className="text-lg">{genralData.tong_doanh_thu} VNĐ</p>
          </div>
          <div className="w-14 object-cover">
            <img src={DolarIcon} alt="" />
          </div>
        </div>
        <div className="flex flex-1 min-w-fit justify-between items-center p-4 bg-white rounded-xl  font-semibold  shadow">
          <div>
            <p>Tổng số tài liệu đã in</p>
            <p className="text-lg">{genralData.so_luong_don_in}</p>
          </div>
          <div className="w-14 object-cover">
            <img src={Paper} alt="" />
          </div>
        </div>
      </header>
      <section className="mt-6">
        <h3 className="font-semibold mb-4 text-lg">Thống kê</h3>
        <ResponsiveContainer height={300} width={"100%"}>
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id="colorUser" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#FF928A" stopOpacity={0.7} />
                <stop offset="100%" stopColor="#FF928A" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorOrder" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                <stop offset="100%" stopColor="#8884d8" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="date" />
            <YAxis tickCount={6} tickFormatter={(value) => value.toFixed(0)} />
            <CartesianGrid strokeDasharray="2 2 " />
            <Tooltip />
            <Legend />
            <Area
              type="monotone"
              dataKey="so_nguoi_su_dung"
              name="Số người sử dụng"
              stroke="#FF7F7F"
              fillOpacity={1}
              fill="url(#colorUser)"
            />
            <Area
              type="monotone"
              dataKey="so_don_in"
              name="Số đơn in"
              stroke="#8884d8"
              fillOpacity={1}
              fill="url(#colorOrder)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </section>
    </main>
  );
}

export default AdminHome;
