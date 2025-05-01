
import React from "react";

import { motion } from "framer-motion";
import {
  ShoppingCartOutlined,
  UserOutlined,
  DollarOutlined,
  MessageOutlined,
} from "@ant-design/icons";

const stats = [
  { icon: <ShoppingCartOutlined />, label: "Total Orders", value: 1200 },
  { icon: <DollarOutlined />, label: "Revenue", value: "$25,430" },
  { icon: <UserOutlined />, label: "Users", value: 450 },
  { icon: <MessageOutlined />, label: "Messages", value: 87 },
];

const Dashboard = () => {
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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <motion.div
            key={idx}
            whileHover={{ scale: 1.05 }}
            className="bg-white backdrop-blur-md shadow-lg rounded-xl p-5 border border-gray-100 hover:shadow-xl transition-all"
          >
            <div className="text-3xl text-blue-500 mb-2">{stat.icon}</div>
            <div className="text-sm text-gray-500">{stat.label}</div>
            <div className="text-xl font-semibold text-gray-800">
              {stat.value}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default Dashboard;
