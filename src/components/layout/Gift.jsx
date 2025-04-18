import { Box, Button } from "@mui/material";
import React from "react";
import backgroundImg from "../img/gift-bg-img.png";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

function Gift() {
  return (
    <Box className="py-10 sm:py-14 bg-white">
      {/* CONTAINER: Keeps content centered and not full-width */}
      <Box className="mx-auto w-full">
        <Box className="flex flex-col md:flex-row items-center bg-black text-white rounded-lg overflow-hidden">
          {/* Image Section */}
          <Box className="w-full md:w-1/2">
            <img
              className="w-full h-full object-cover"
              src={backgroundImg}
              alt="Gift Promo"
            />
          </Box>

          {/* Text Section */}
          <Box className="w-full md:w-1/2 p-6 sm:px-16 space-y-4">
            <h2 className="text-2xl sm:text-4xl font-medium ">
              35% off only this Friday <br /> and get special gift
            </h2>
            <Button
              variant="contained"
              className="!bg-white !text-black !capitalize !font-semibold hover:!bg-gray-300 !rounded-[10px] !px-[18px] !py-[10px]"
              endIcon={<ArrowForwardIcon />}
            >
              Grab it now
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default Gift;
