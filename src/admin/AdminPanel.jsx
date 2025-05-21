import React, { useState } from "react";
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
import Category from "./pages/Category";

const { Content, Sider } = Layout;

const AdminPanel = () => {
  const [selectedKey, setSelectedKey] = useState("dashboard");
  const [drawerVisible, setDrawerVisible] = useState(false);
  const isDesktop = window.innerWidth >= 1024;

  const renderPage = () => {
    switch (selectedKey) {
      case "dashboard":
        return <Dashboard />;
      case "create-category":
        return <Category />;
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
    <Layout>
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
        <HeaderBar toggleDrawer={() => setDrawerVisible(true)} />

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
          style={{ padding: 0 }}
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
