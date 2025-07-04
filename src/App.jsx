import { Routes, Route, Navigate } from "react-router";
import Login from "./auth/Login";
import SignUp from "./auth/SignUp";
import Home from "./pages/Home";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Orders from "./pages/Orders";
import Favorite from "./pages/Favorite";
import Profile from "./pages/Profile";
import Mens from "./pages/Mens";
import Women from "./pages/Women";
import Kids from "./pages/Kids";
import Couple from "./pages/Couple";
import OrderPlaced from "./pages/OrderPlaced";
import NotFound from "./components/layout/Notfound";

// Admin Components
import AdminPanel from "./admin/AdminPanel";
import Dashboard from "./admin/pages/Dashboard";
import AddProduct from "./admin/pages/AddProduct";
import AdminOrders from "./admin/pages/Orders";
import Users from "./admin/pages/Users";
import Contacts from "./admin/pages/Contacts";
import Settings from "./admin/pages/Settings";
import Category from "./admin/pages/Category";
import AdminLogin from "./admin/components/AdminLogin";
// import PrivateRoutes from "./utils/PrivateRoutes";
import ContactUs from "./pages/ContactUs";
import Wishlist from "./admin/pages/Wishlist";

function App() {
  const isAdminAuthenticated = localStorage.getItem("token") ? true : false;
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Login />} />
      <Route path="signup" element={<SignUp />} />
      <Route path="home" element={<Home />} />
      <Route path="cart" element={<Cart />} />
      <Route path="/product/:id" element={<ProductDetail />} />
      <Route path="/checkout/:id" element={<Checkout />} />
      <Route path="orders" element={<Orders />} />
      <Route path="fav" element={<Favorite />} />
      <Route path="profile" element={<Profile />} />
      <Route path="men" element={<Mens />} />
      <Route path="women" element={<Women />} />
      <Route path="kids" element={<Kids />} />
      <Route path="couple" element={<Couple />} />
      <Route path="orderplace" element={<OrderPlaced />} />
      <Route path="contact" element={<ContactUs />} />
      <Route path="*" element={<NotFound />} />

      {/* Admin Login */}
      <Route path="/admin/login" element={<AdminLogin />} />

      {/* Admin  Routes */}
      {isAdminAuthenticated && (
        <Route path="/admin" element={<AdminPanel />}>
          <Route index element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="category" element={<Category />} />
          <Route path="products" element={<AddProduct />} />
          <Route path="wishlist" element={<Wishlist />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="users" element={<Users />} />
          <Route path="contacts" element={<Contacts />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      )}

      {!isAdminAuthenticated && (
        <Route path="/admin/*" element={<Navigate to="/admin/login" />} />
      )}
    </Routes>
  );
}

export default App;
