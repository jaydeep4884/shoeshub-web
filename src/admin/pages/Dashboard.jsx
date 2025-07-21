import React, { useContext, useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  ShoppingCartOutlined,
  UserOutlined,
  DollarOutlined,
  MessageOutlined,
} from "@ant-design/icons";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import axios from "axios";
import { token } from "../../assets/contexts";

const Dashboard = () => {
  const Token = useContext(token);
  const [counts, setCounts] = useState({
    orders: 0,
    products: 0,
    feedbacks: 0,
  });

  const fetchData = async () => {
    try {
      const [ordersRes, productsRes, feedbacksRes] = await Promise.all([
        axios.get("https://generateapi.onrender.com/api/Payment-Details", {
          headers: { Authorization: Token },
        }),
        axios.get("https://generateapi.onrender.com/api/product", {
          headers: { Authorization: Token },
        }),
        axios.get("https://generateapi.onrender.com/api/contact", {
          headers: { Authorization: Token },
        }),
      ]);

      setCounts({
        orders: ordersRes.data?.Data?.length || 0,
        products: productsRes.data?.Data?.length || 0,
        feedbacks: feedbacksRes.data?.Data?.length || 0,
      });
    } catch (err) {
      console.error("Error fetching dashboard data:", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const stats = [
    {
      icon: <ShoppingCartOutlined />,
      label: "Total Orders",
      value: counts.orders,
    },
    {
      icon: <DollarOutlined />,
      label: "Total Revenue",
      value: "$25,430",
    },
    {
      icon: <UserOutlined />,
      label: "Total Products",
      value: counts.products,
    },
    {
      icon: <MessageOutlined />,
      label: "Feedbacks",
      value: counts.feedbacks,
    },
  ];

  const chartData = [
    { name: "Orders", count: counts.orders },
    { name: "Products", count: counts.products },
    { name: "Feedbacks", count: counts.feedbacks },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <h2 className="text-3xl font-bold text-gray-800 mb-4">
        🚀 Welcome Back, Admin
      </h2>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <motion.div
            key={idx}
            whileHover={{ scale: 1.05 }}
            className="bg-white shadow-lg rounded-xl p-5 border border-gray-100 hover:shadow-xl transition-all"
          >
            <div className="text-3xl text-blue-500 mb-2">{stat.icon}</div>
            <div className="text-sm text-gray-500">{stat.label}</div>
            <div className="text-xl font-semibold text-gray-800">
              {stat.value}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Chart */}
      <div className="bg-white rounded-xl p-6 shadow-md">
        <h3 className="text-lg font-semibold mb-4 text-gray-700">
          Overview Chart
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Bar dataKey="count" fill="#3b82f6" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};

export default Dashboard;
