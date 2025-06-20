import { Avatar, Dropdown, Space } from "antd";
import React from "react";
import {
  UserOutlined,
  LogoutOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Link, useNavigate } from "react-router";

function UserMenu() {
  const navigate = useNavigate();

  const LogoutAdmin = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const menuItems = [
    {
      key: "profile",
      icon: <UserOutlined />,
      label: <Link to="/profile">Profile</Link>,
    },
    {
      key: "settings",
      icon: <SettingOutlined />,
      label: <Link to="/settings">Settings</Link>,
    },
    {
      type: "divider",
    },
    {
      key: "logout",
      icon: <LogoutOutlined />,
      danger: true,
      label: <span onClick={LogoutAdmin}>Logout</span>, // Don't wrap logout in <Link>
    },
  ];

  return (
    <>
      <Dropdown menu={{ items: menuItems }} trigger={["click"]}>
        <Space>
          <Avatar
            className="cursor-pointer"
            size="large"
            icon={<UserOutlined />}
            src="https://api.dicebear.com/7.x/miniavs/svg?seed=1"
          />
        </Space>
      </Dropdown>
    </>
  );
}

export default UserMenu;
