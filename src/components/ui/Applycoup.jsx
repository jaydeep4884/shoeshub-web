import { Box, Button, InputBase } from "@mui/material";
import React from "react";

function Applycoup() {
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
          className="!capitalize !text-white !font-medium !bg-[#DB4444] hover:!bg-[#cf7e7e] !rounded !px-5 !py-2 !shadow-none"
        >
          Apply Coupon
        </Button>
      </Box>
    </>
  );
}

export default Applycoup;
