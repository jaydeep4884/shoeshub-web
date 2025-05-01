import React from "react";
import { Button, Dropdown, Menu, Avatar } from "antd";
import { MenuOutlined, UserOutlined, LogoutOutlined } from "@ant-design/icons";

const HeaderBar = ({ toggleDrawer, toggleDarkMode }) => {
  const menu = (
    <Menu>
      <Menu.Item key="profile" icon={<UserOutlined />}>
        View Profile
      </Menu.Item>
      <Menu.Item
        key="logout"
        icon={<LogoutOutlined />}
        onClick={() => alert("Logout")}
      >
        Logout
      </Menu.Item>
    </Menu>
  );

  return (
    <div className="bg-white  shadow-lg px-6 py-4 flex items-center justify-between">
      {/* Hamburger Menu for Mobile */}
      <Button
        type="text"
        icon={<MenuOutlined />}
        className="lg:hidden"
        onClick={toggleDrawer}
      />

      {/* Admin Panel Title */}
      <h1 className="text-2xl font-semibold text-gray-800 dark:text-white">
        Admin Panel
      </h1>

      {/* Profile Section */}
      <div className="flex items-center space-x-3">
        {/* Avatar and Profile Dropdown */}
        <Dropdown overlay={menu} trigger={["click"]}>
          <Button
            className="flex items-center space-x-2 p-0 border-0 bg-transparent hover:bg-transparent"
            style={{ padding: "0", marginLeft: "12px" }}
          >
            <Avatar icon={<UserOutlined />} size="large" />
          </Button>
        </Dropdown>
      </div>
    </div>
  );
};

export default HeaderBar;
