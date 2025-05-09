import "./App.css";
import { Routes, Route } from "react-router";
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
// import AdminPanel from "./admin/AdminPanel";
import NotFound from "./components/layout/Notfound";

function App() {
  return (
    <>
      <Routes>
        <Route path="/">
          <Route index element={<Login />} />
          <Route path="home" element={<Home />} />
          <Route path="cart" element={<Cart />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="productdetail" element={<ProductDetail />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="orders" element={<Orders />} />
          <Route path="fav" element={<Favorite />} />
          <Route path="profile" element={<Profile />} />
          <Route path="men" element={<Mens />} />
          <Route path="women" element={<Women />} />
          <Route path="kids" element={<Kids />} />
          <Route path="couple" element={<Couple />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
      {/* <AdminPanel /> */}
    </>
  );
}

export default App;
