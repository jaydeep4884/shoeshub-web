import { Box, Button, InputBase } from "@mui/material";
import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

function Applycoup() {
  const [couponCode, setCouponCode] = useState("");
  const validCode = "JAKAAS123";

  const checkCode = () => {
    if (couponCode.trim().toUpperCase() === validCode) {
      toast.success("Coupon Added 🎉✨");
    } else {
      toast.error("Invalid Coupon Code 🙄🙄");
    }
    setCouponCode("");
  };

  return (
    <Box className="flex gap-3">
      <InputBase
        value={couponCode}
        onChange={(e) => setCouponCode(e.target.value)}
        placeholder="Coupon Code"
        className="flex-1 px-3 py-2 border border-gray-400 rounded placeholder-gray-500"
      />
      <Button
        variant="contained"
        onClick={checkCode}
        className="!capitalize !text-white !font-medium !bg-[#DB4444] hover:!bg-[#cf7e7e] !rounded !px-5 !py-2 !shadow-none"
      >
        Apply Coupon
      </Button>
      <Toaster />
    </Box>
  );
}

export default Applycoup;
