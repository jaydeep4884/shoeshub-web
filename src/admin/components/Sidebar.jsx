import React from "react";
import { Menu } from "antd";
import {
  DashboardOutlined,
  FileAddOutlined,
  DollarCircleOutlined,
  UserOutlined,
  MessageOutlined,
  LogoutOutlined,
  DatabaseOutlined,
} from "@ant-design/icons";
import logo from "../img/brand.png";

const menuItems = [
  { key: "dashboard", icon: <DashboardOutlined />, label: "Dashboard" },
  { key: "category", icon: <DatabaseOutlined />, label: "Category" },
  { key: "products", icon: <FileAddOutlined />, label: "Add Product" },
  { key: "orders", icon: <DollarCircleOutlined />, label: "Orders" },
  { key: "users", icon: <UserOutlined />, label: "Users" },
  { key: "contacts", icon: <MessageOutlined />, label: "Contacts" },
  { key: "login", icon: <LogoutOutlined />, label: "Logout" },
];

const Sidebar = ({ selectedKey, setSelectedKey, closeDrawer, isDesktop }) => (
  <div className={`bg-white  ${isDesktop ? "hidden lg:block w-64" : ""}`}>
    <div className="px-4 py-2.5 border-b">
      <img src={logo} alt="" />
    </div>
    <Menu
      mode="inline"
      selectedKeys={[selectedKey]}
      onClick={(e) => {
        setSelectedKey(e.key);
        if (!isDesktop && closeDrawer) closeDrawer();
        if (e.key === "login") {
          localStorage.removeItem("token");
        }
      }}
      items={menuItems}
    />
  </div>
);

export default Sidebar;
