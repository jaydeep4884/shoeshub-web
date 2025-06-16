import { Avatar, Dropdown, Menu, Space } from "antd";
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

  const menu = (
    <Menu>
      <Menu.Item key="profile" icon={<UserOutlined />}>
        <Link to="/profile">Profile</Link>
      </Menu.Item>
      <Menu.Item key="settings" icon={<SettingOutlined />}>
        <Link to="/settings">Settings</Link>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="logout" icon={<LogoutOutlined />} danger>
        <Link onClick={LogoutAdmin}>Logout</Link>
      </Menu.Item>
    </Menu>
  );

  return (
    <>
      <Dropdown overlay={menu} trigger={["click"]}>
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
