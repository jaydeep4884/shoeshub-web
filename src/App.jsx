import "./App.css";
import { Box } from "@mui/material";
import { Route, Routes } from "react-router";
import Login from "./auth/Login";
import SignUp from "./auth/SignUp";
import Home from "./pages/Home";

function App() {
  return (
    <Box>
      <Routes>
        <Route path="/">
          <Route index element={<Home />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="login" element={<Login />} />
        </Route>
      </Routes>
      {/* <NotFound /> */}
    </Box>
  );
}

export default App;
