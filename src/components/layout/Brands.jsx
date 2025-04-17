import { Container } from "@mui/material";
import { Box } from "@mui/material";
import React from "react";
import ronaldo from "../img/brands/ronaldo-brand.png";
import nike from "../img/logo/nike-logo.svg";

const Brands = () => {
  return (
    <>
      <Container maxWidth="lg">
        <Box>
          <Box>
            <h2 className="text-[30px] inline-block font-medium mb-10 border-b-2 border-[#827B7B]">
              Explore Top Brands
            </h2>

            <Box>
              <Box className="!flex !flex-col !justify-center !gap-x-5 p-5 border border-[#E5E9EB] rounded-[15px]">
                <Box className="h-[315px] w-[272px] overflow-hidden rounded-[15px] bg-gray-200">
                  <img
                    className="!w-full h-[315px] bg-cover"
                    src={ronaldo}
                    alt="Brand Person"
                  />
                </Box>
              <img className="h-[68px] w-[132px]" src={nike} alt="Brands" />
              </Box>
            </Box>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default Brands;
