import { Box } from "@mui/material";
import React from "react";
import backgroundImg from "../img/gift-bg-img.png";

function Gift() {
  return (
    <>
      <Box className="py-10 sm:py-14">
        <Box className="">
          <Box>
            <img className="h-[380px]" src={backgroundImg} alt="" />
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default Gift;
