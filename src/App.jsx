import "./App.css";
import { Box } from "@mui/material";
import SignUp from "./pages/auth/SignUp";
import Login from "./pages/auth/Login";
import { Route, Routes } from "react-router";

function App() {
  return (
    <Box>
      <Routes>
        <Route path="/">
          <Route index element={<Login />} />
          <Route path="signup" element={<SignUp />} />
        </Route>
      </Routes>
      {/* <SignUp /> */}
      {/* <Login /> */}
    </Box>
  );
}

export default App;
