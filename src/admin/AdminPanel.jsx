import React, { useState, useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router";
import { Drawer } from "antd";
import Sidebar from "./components/Sidebar";
import HeaderBar from "./components/Header";
import PageContainer from "./components/PageContainer";

const AdminPanel = () => {
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1024);
  const location = useLocation();
  const navigate = useNavigate();
  const isAdminAuthenticated = localStorage.getItem("token") ? true : false;
  // Extract last segment of path for selectedKey
  const selectedKey = location.pathname.split("/").pop();

  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 1024);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleSetSelectedKey = (key) => {
    navigate(`/admin/${key}`);
    if (!isDesktop) setDrawerVisible(false);
  };

  useEffect(() => {
    isAdminAuthenticated
      ? navigate("/admin/dashboard")
      : navigate("/admin/login");
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <div className="flex h-screen overflow-hidden">
        {/* Sidebar */}
        {isDesktop && (
          <div className="fixed top-0 left-0 w-64 h-full z-20  shadow">
            <Sidebar
              selectedKey={selectedKey}
              setSelectedKey={handleSetSelectedKey}
              isDesktop={true}
            />
          </div>
        )}

        {/* Main Content */}
        <div className={`flex flex-col flex-1 ${isDesktop ? "lg:ml-64" : ""}`}>
          <div className="fixed top-0 left-0 right-0 z-10  lg:ml-64">
            <HeaderBar toggleDrawer={() => setDrawerVisible(true)} />
          </div>

          <div className="pt-20 px-4 overflow-auto h-full">
            <PageContainer>
              <Outlet />
            </PageContainer>
          </div>
        </div>

        {/* Mobile Drawer */}
        {!isDesktop && (
          <Drawer
            visible={drawerVisible}
            onClose={() => setDrawerVisible(false)}
            placement="left"
            bodyStyle={{ padding: 0 }}
          >
            <Sidebar
              selectedKey={selectedKey}
              setSelectedKey={handleSetSelectedKey}
              isDesktop={false}
            />
          </Drawer>
        )}
      </div>
    </>
  );
};

export default AdminPanel;
