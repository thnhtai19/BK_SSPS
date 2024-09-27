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

import Paper from "../../assets/paper.png";
import DolarIcon from "../../assets/16842271.png";
import UserIcon from "../../assets/userIcon.png";

function AdminHome() {
  const chartData = [
    { date: "10-09-2024", user: 190, order: 100 },
    { date: "11-09-2024", user: 160, order: 80 },
    { date: "12-09-2024", user: 80, order: 40 },
    { date: "13-09-2024", user: 160, order: 50 },
    { date: "14-09-2024", user: 50, order: 20 },
    { date: "15-09-2024", user: 130, order: 50 },
    { date: "16-09-2024", user: 120, order: 50 },
  ];

  return (
    <main className="p-8">
      <header className="flex gap-10 flex-wrap">
        <div className="flex flex-1 min-w-fit justify-between items-center p-4 bg-white rounded-xl  font-semibold   shadow">
          <div>
            <p>Tổng số người dùng</p>
            <p className="text-lg">1000</p>
          </div>
          <div className="w-14 object-cover">
            <img src={UserIcon} alt="" />
          </div>
        </div>
        <div className="flex flex-1 min-w-fit justify-between items-center p-4 bg-white rounded-xl  font-semibold  shadow">
          <div>
            <p>Tổng doanh thu</p>
            <p className="text-lg">10.000.000 VNĐ</p>
          </div>
          <div className="w-14 object-cover">
            <img src={DolarIcon} alt="" />
          </div>
        </div>
        <div className="flex flex-1 min-w-fit justify-between items-center p-4 bg-white rounded-xl  font-semibold  shadow">
          <div>
            <p>Tổng số tài liệu đã in</p>
            <p className="text-lg">999</p>
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
              dataKey="user"
              stroke="#FF7F7F"
              fillOpacity={1}
              fill="url(#colorUser)"
            />
            <Area
              type="monotone"
              dataKey="order"
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
