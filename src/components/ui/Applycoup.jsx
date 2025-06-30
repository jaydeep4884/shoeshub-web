import { Box, Button, InputBase } from "@mui/material";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useFormikContext } from "formik";

function Applycoup() {
  const { values, setFieldValue } = useFormikContext();
  const [enteredCode, setEnteredCode] = useState("");

  // You could fetch this list from your API, but hardcoded for now
  const validCoupons = {
    JAKAAS123: "682d5f2478f9be60721ce1a0",
    // more can be added here
  };

  const checkCode = () => {
    const code = enteredCode.trim().toUpperCase();
    const couponId = validCoupons[code];

    if (couponId) {
      setFieldValue("couponCode", couponId); // store coupon **ID**
      toast.success("Coupon Applied 🎉✨");
    } else {
      setFieldValue("couponCode", ""); // clear invalid
      toast.error("Invalid Coupon Code 🙄");
    }

    setEnteredCode("");
  };

  return (
    <Box className="flex gap-3">
      <InputBase
        value={enteredCode}
        onChange={(e) => setEnteredCode(e.target.value)}
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
    </Box>
  );
}

export default Applycoup;
