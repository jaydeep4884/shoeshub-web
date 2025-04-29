import "./App.css";
import { Box } from "@mui/material";
import { Route, Routes } from "react-router";
import Login from "./auth/Login";
import SignUp from "./auth/SignUp";
import Home from "./pages/Home";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";

function App() {
  return (
    <Box>
      <Routes>
        <Route path="/">
          <Route index element={<Home />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="login" element={<Login />} />
          <Route path="productdetail" element={<ProductDetail />} />
          <Route path="cart" element={<Cart />} />
        </Route>
      </Routes>
    </Box>
  );
}

export default App;
