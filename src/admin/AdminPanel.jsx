import React, { useState, useEffect } from "react";
import { Layout, Drawer } from "antd";
import Sidebar from "./components/Sidebar";
import HeaderBar from "./components/Header";
import PageContainer from "./components/PageContainer";

import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import AddProduct from "./pages/AddProduct";
import Orders from "./pages/Orders";
import Users from "./pages/Users";
import Contacts from "./pages/Contacts";
import Settings from "./pages/Settings";

const { Content, Sider } = Layout;

const AdminPanel = () => {
  const [selectedKey, setSelectedKey] = useState("dashboard");
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const isDesktop = window.innerWidth >= 1024;

  // Toggle dark mode and update the body's class
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  // Sync dark mode with localStorage (optional, remember user's preference)
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setDarkMode(true);
      document.body.classList.add("dark");
    }
  }, []);

  useEffect(() => {
    if (darkMode) {
      localStorage.setItem("theme", "dark");
      document.body.classList.add("dark"); // Add dark class to body
    } else {
      localStorage.setItem("theme", "light");
      document.body.classList.remove("dark"); // Remove dark class from body
    }
  }, [darkMode]);

  const renderPage = () => {
    switch (selectedKey) {
      case "dashboard":
        return <Dashboard />;
      case "products":
        return <Products />;
      case "create-product":
        return <AddProduct />;
      case "orders":
        return <Orders />;
      case "users":
        return <Users />;
      case "contacts":
        return <Contacts />;
      case "settings":
        return <Settings />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <Layout className={`min-h-screen ${darkMode ? "dark" : ""}`}>
      {/* Sidebar for Desktop */}
      {isDesktop && (
        <Sider width={250} className="bg-gray-200 dark:bg-gray-900">
          <Sidebar
            selectedKey={selectedKey}
            setSelectedKey={setSelectedKey}
            isDesktop={isDesktop}
          />
        </Sider>
      )}

      {/* Main Layout */}
      <Layout>
        {/* Header */}
        <HeaderBar
          toggleDrawer={() => setDrawerVisible(true)}
          toggleDarkMode={toggleDarkMode}
        />

        {/* Content */}
        <Content className="p-4">
          <PageContainer>{renderPage()}</PageContainer>
        </Content>
      </Layout>

      {/* Sidebar for Mobile */}
      {!isDesktop && (
        <Drawer
          visible={drawerVisible}
          onClose={() => setDrawerVisible(false)}
          placement="left"
          bodyStyle={{ padding: 0 }}
        >
          <Sidebar
            selectedKey={selectedKey}
            setSelectedKey={setSelectedKey}
            closeDrawer={() => setDrawerVisible(false)}
            isDesktop={false}
          />
        </Drawer>
      )}
    </Layout>
  );
};

export default AdminPanel;
