import React from "react";
import { Button, Dropdown, Menu, Avatar } from "antd";
import { MenuOutlined, UserOutlined, LogoutOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router";

const HeaderBar = ({ toggleDrawer }) => {
  const navigate = useNavigate();

  const LogoutAdmin = () => {
    localStorage.removeItem("token");
    navigate("/admin/login");
  };

  const Profilemenu = (
    <Menu>
      <Menu.Item key="profile" icon={<UserOutlined />}>
        View Profile
      </Menu.Item>
      <Menu.Item
        key="logout"
        icon={<LogoutOutlined />}
        onClick={LogoutAdmin}
        danger
      >
        Logout
      </Menu.Item>
    </Menu>
  );

  return (
    <div className="bg-white border-b border-[#ddd] px-6 py-4 flex items-center justify-between">
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
        <Dropdown overlay={Profilemenu} trigger={["click"]}>
          <Button className="flex items-center space-x-2 p-0 border-0 bg-transparent hover:bg-transparent">
            <Avatar
              src="https://api.dicebear.com/7.x/miniavs/svg?seed=1"
              size="large"
            />
          </Button>
        </Dropdown>
      </div>
    </div>
  );
};

export default HeaderBar;
