import { Box, Button, InputBase } from "@mui/material";
import React from "react";
import toast, { Toaster } from "react-hot-toast";

function Applycoup() {
  const code = "JAKAAS123";
  const checkCode = () => {
    if (code === "JAKAAS123") {
      toast.success("Coupon Added 🎉✨");
    } else {
      toast.error("Invalid Coupane Code 🙄🙄");
    }
  };
  return (
    <>
      <Box className="flex gap-3">
        <InputBase
          placeholder="Coupon Code"
          className="flex-1 px-3 py-2 border border-gray-400 rounded placeholder-gray-500"
        />
        {/* <Buttongroup name="Apply Coupone" /> */}

        <Button
          variant="contained"
          onClick={checkCode}
          className="!capitalize !text-white !font-medium !bg-[#DB4444] hover:!bg-[#cf7e7e] !rounded !px-5 !py-2 !shadow-none"
        >
          Apply Coupon
        </Button>
        <Toaster />
      </Box>
    </>
  );
}

export default Applycoup;
