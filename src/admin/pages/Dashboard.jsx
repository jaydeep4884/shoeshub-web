import React, { useContext, useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  ShoppingCartOutlined,
  DollarOutlined,
  MessageOutlined,
  UserOutlined,
} from "@ant-design/icons";
import {
  PieChart,
  Pie,
  Cell,
  Legend,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  AreaChart,
  Area,
  ResponsiveContainer,
} from "recharts";
import axios from "axios";
import dayjs from "dayjs";
import ProductionQuantityLimitsIcon from "@mui/icons-material/ProductionQuantityLimits";
import { token } from "../../assets/contexts";

const Dashboard = () => {
  const Token = useContext(token);
  const [counts, setCounts] = useState({
    orders: 0,
    products: 0,
    feedbacks: 0,
    user: 0,
  });
  const [monthlyData, setMonthlyData] = useState([]);
  const [totalRevenue, setTotalRevenue] = useState(0);

  const fetchOrders = async () => {
    const res = await axios.get(
      "https://generateapi.onrender.com/api/Payment-Details",
      {
        headers: { Authorization: Token },
      }
    );

    const orders = res.data?.Data || [];
    let revenue = 0;
    const ordersByDate = {};

    orders.forEach((order) => {
      const date = dayjs(order.createdAt).format("YYYY-MM-DD"); // group by exact date
      const amount = order.cart_product?.new_price || 0;
      revenue += amount;

      if (!ordersByDate[date]) {
        ordersByDate[date] = { date, orders: 0, revenue: 0 };
      }

      ordersByDate[date].orders += 1;
      ordersByDate[date].revenue += amount;
    });

    // Convert object to sorted array by date
    const sortedData = Object.values(ordersByDate).sort(
      (a, b) => new Date(a.date) - new Date(b.date)
    );

    setMonthlyData(sortedData); // reused variable, now it's daily data
    setTotalRevenue(revenue);
    setCounts((prev) => ({ ...prev, orders: orders.length }));
  };

  const fetchProducts = async () => {
    const res = await axios.get(
      "https://generateapi.onrender.com/api/Product-Detail",
      {
        headers: { Authorization: Token },
      }
    );
    const products = res.data?.Data || [];
    setCounts((prev) => ({ ...prev, products: products.length }));
  };

  const fetchFeedbacks = async () => {
    const res = await axios.get(
      "https://generateapi.onrender.com/api/contact",
      {
        headers: { Authorization: Token },
      }
    );
    const feedbacks = res.data?.Data || [];
    setCounts((prev) => ({ ...prev, feedbacks: feedbacks.length }));
  };

  const fetchUsers = async () => {
    const res = await axios.get(
      "https://generateapi.onrender.com/auth/authUser",
      {
        headers: { Authorization: Token },
      }
    );
    const myUsers = res.data?.Data || [];
    setCounts((prev) => ({ ...prev, user: myUsers.length }));
  };

  useEffect(() => {
    fetchOrders();
    fetchProducts();
    fetchFeedbacks();
    fetchUsers();
    // eslint-disable-next-line
  }, []);

  const stats = [
    {
      icon: <ShoppingCartOutlined />,
      label: "Total Orders",
      value: counts.orders,
    },

    {
      icon: <ProductionQuantityLimitsIcon />,
      label: "Total Products",
      value: counts.products,
    },
    {
      icon: <MessageOutlined />,
      label: "Feedbacks",
      value: counts.feedbacks,
    },
    {
      icon: <UserOutlined />,
      label: "Total Users",
      value: counts.user,
    },
    {
      icon: <DollarOutlined />,
      label: "Total Revenue",
      value: `$${totalRevenue.toLocaleString()}`,
    },
  ];

  const pieData = [
    { name: "Orders", count: counts.orders },
    { name: "Products", count: counts.products },
    { name: "Feedbacks", count: counts.feedbacks },
    { name: "User", count: counts.user },
  ];

  const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#DC3C22"];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className=""
    >
      <h2 className="text-xl  sm:text-3xl font-bold text-gray-800 mb-4">
        To Kese He Aap Logg !!
      </h2>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.05 }}
            className="bg-white shadow-lg rounded-xl flex flex-col gap-1 items-center p-4 border border-gray-100 hover:shadow-xl transition-all"
          >
            <div className="text-3xl text-blue-500 mb-2">{stat.icon}</div>
            <div className="text-sm text-gray-500">{stat.label}</div>
            <div className="text-xl font-semibold text-gray-800">
              {stat.value}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        {/* Donut Chart */}
        <div className="bg-white">
          <h3 className="text-lg font-semibold mb-4 text-gray-700">
            Overview Chart
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                dataKey="count"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                label={({ name, percent }) =>
                  `${name}: ${(percent * 100).toFixed(0)}%`
                }
              >
                {pieData.map((_, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Legend verticalAlign="bottom" height={36} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Line Chart */}
        <div className="bg-white ">
          <h3 className="text-lg font-semibold mb-4 text-gray-700">
            Daily Orders
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="date"
                tickFormatter={(date) => dayjs(date).format("DD MMM")}
                angle={-45}
                textAnchor="end"
              />

              <YAxis allowDecimals={false} />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="orders"
                stroke="#10b981"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Area Chart */}
        <div className="bg-white md:col-span-2">
          <h3 className="text-lg font-semibold mb-4 text-gray-700">
            Revenue by Date
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={monthlyData}>
              <defs>
                <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis
                dataKey="date"
                tickFormatter={(date) => dayjs(date).format("DD MMM")}
                angle={-45}
                textAnchor="end"
              />

              <YAxis />
              <CartesianGrid strokeDasharray="3 3" />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="revenue"
                stroke="#6366f1"
                fillOpacity={1}
                fill="url(#colorRev)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
      {/* <Footer /> */}
    </motion.div>
  );
};

export default Dashboard;
