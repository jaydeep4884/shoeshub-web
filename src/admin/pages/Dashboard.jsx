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
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Bar,
  ComposedChart,
  Line,
  AreaChart,
  Area,
} from "recharts";
import axios from "axios";
import dayjs from "dayjs";
import ProductionQuantityLimitsIcon from "@mui/icons-material/ProductionQuantityLimits";
import { baseUrl, token } from "../../assets/contexts";

const Dashboard = () => {
  const Token = useContext(token);
  const apiUrl = useContext(baseUrl);
  const [counts, setCounts] = useState({
    orders: 0,
    products: 0,
    feedbacks: 0,
    user: 0,
  });
  const [monthlyData, setMonthlyData] = useState([]);
  const [totalRevenue, setTotalRevenue] = useState(0);

  const fetchOrders = async () => {
    const res = await axios.get(`${apiUrl}/Payment-Details`, {
      headers: { Authorization: Token },
    });

    const orders = res.data?.Data || [];
    let totalRevenue = 0;

    const orderData = orders.map((order, index) => {
      const amount = order.cart_product?.new_price || 0;
      totalRevenue += amount;

      return {
        id: index + 1, // Unique ID for chart
        date: dayjs(order.createdAt).format("YYYY-MM-DD HH:mm"), // Date + Time
        orders: 1, // Always 1 per record
        revenue: amount, // Revenue for this order
      };
    });
    console.log(orderData);

    setMonthlyData(orderData); // For charts
    setTotalRevenue(totalRevenue); // Just the sum (for stats card)
    setCounts((prev) => ({ ...prev, orders: orders.length }));
  };

  const fetchProducts = async () => {
    const res = await axios.get(`${apiUrl}/Product-Detail`, {
      headers: { Authorization: Token },
    });
    const products = res.data?.Data || [];
    setCounts((prev) => ({ ...prev, products: products.length }));
  };

  const fetchFeedbacks = async () => {
    const res = await axios.get(`${apiUrl}/contact`, {
      headers: { Authorization: Token },
    });
    const feedbacks = res.data?.Data || [];
    setCounts((prev) => ({ ...prev, feedbacks: feedbacks.length }));
  };

  const fetchUsers = async () => {
    const res = await axios.get(
      "https://myapigenerator.onrender.com/auth/authUser",
      {
        headers: { Authorization: Token },
      }
    );
    const myUsers = res.data?.Data || [];
    setCounts((prev) => ({ ...prev, user: myUsers.length }));
  };

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
    { icon: <MessageOutlined />, label: "Feedbacks", value: counts.feedbacks },
    { icon: <UserOutlined />, label: "Total Users", value: counts.user },
    {
      icon: <DollarOutlined />,
      label: "Total Revenue",
      value: `₹${totalRevenue.toLocaleString()}`,
    },
  ];

  const pieData = [
    { name: "Orders", count: counts.orders },
    { name: "Products", count: counts.products },
    { name: "Feedbacks", count: counts.feedbacks },
    { name: "User", count: counts.user },
  ];

  const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#DC3C22"];

  useEffect(() => {
    fetchOrders();
    fetchProducts();
    fetchFeedbacks();
    fetchUsers();
    // eslint-disable-next-line
  }, []);
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-xl sm:text-3xl font-bold text-gray-800 mb-4">
        To Kese He Aap Logg !!
      </h2>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.05 }}
            className="shadow-lg rounded-xl flex flex-col gap-1 items-center p-4 border border-gray-300 hover:shadow-xl transition-all"
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
        <div>
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

        {/* Composed Chart - Orders by Day */}
        <div className="">
          <h3 className="text-lg font-semibold mb-4 text-gray-700">
            Daily Orders
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <ComposedChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" hide />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="orders" barSize={20} fill="#82ca9d" />
              <Line
                type="monotone"
                dataKey="orders"
                stroke="#ff7300"
                strokeWidth={2}
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>

        {/* Area Chart - Revenue by Day */}
        <div className="md:col-span-2">
          <h3 className="text-lg font-semibold mb-4 text-gray-700">
            Revenue Trend
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={monthlyData}>
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="date"
                tickFormatter={(date) => dayjs(date).format("DD MMM")}
                angle={-45}
                textAnchor="end"
              />
              <YAxis />
              <Tooltip
                contentStyle={{
                  background: "#fff",
                  borderRadius: "8px",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                  border: "none",
                }}
              />
              <Area
                type="monotone"
                dataKey="revenue"
                stroke="#6366f1"
                fillOpacity={1}
                fill="url(#colorRevenue)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </motion.div>
  );
};

export default Dashboard;
