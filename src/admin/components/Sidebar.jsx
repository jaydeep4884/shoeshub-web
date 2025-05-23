import React from "react";
import { Menu } from "antd";
import {
  DashboardOutlined,
  ShoppingOutlined,
  FileAddOutlined,
  DollarCircleOutlined,
  UserOutlined,
  MessageOutlined,
  SettingOutlined,
  LogoutOutlined,
  DatabaseOutlined,
} from "@ant-design/icons";
import logo from "../img/brand.png";

const menuItems = [
  { key: "dashboard", icon: <DashboardOutlined />, label: "Dashboard" },
  { key: "create-category", icon: <DatabaseOutlined />, label: "Category" },
  { key: "products", icon: <ShoppingOutlined />, label: "Products" },
  { key: "create-product", icon: <FileAddOutlined />, label: "Add Product" },
  { key: "orders", icon: <DollarCircleOutlined />, label: "Orders" },
  { key: "users", icon: <UserOutlined />, label: "Users" },
  { key: "contacts", icon: <MessageOutlined />, label: "Contacts" },
  { key: "settings", icon: <SettingOutlined />, label: "Settings" },
  { key: "logout", icon: <LogoutOutlined />, label: "Logout" },
];

const Sidebar = ({ selectedKey, setSelectedKey, closeDrawer, isDesktop }) => (
  <div
    className={`bg-white shadow h-[100vh] ${isDesktop ? "hidden lg:block w-64" : ""}`}
  >
    <div className="px-4 py-2.5 border-b">
      <img src={logo} alt="" />
    </div>
    <Menu
      mode="inline"
      selectedKeys={[selectedKey]}
      onClick={(e) => {
        setSelectedKey(e.key);
        if (!isDesktop && closeDrawer) closeDrawer();
      }}
      items={menuItems}
    />
  </div>
);

export default Sidebar;
