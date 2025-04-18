import { Box, Container, Rating } from "@mui/material";
import React from "react";
import customer1 from "../img/customer-01.png";
import customer2 from "../img/customer-02.png";

function Review() {
  const reviewData = [
    {
      name: "Ava Joshi",
      desc: "Pretty good. Nice colour. An excellent product from crocs",
      image: customer1,
    },
    {
      name: "Otis bisnoy",
      desc: "Valuable Product. Chipest Prices. Only Brand Name Unisole.",
      image: customer2,
    },
  ];

  return (
    <Box className="py-5 sm:py-14">
      <Container maxWidth="lg">
        {/* Heading */}
        <Box className="flex justify-center mb-10">
          <Box className="flex gap-4 items-center">
            <Box className="w-10 h-[3px] bg-black" />
            <h2 className="text-2xl sm:text-4xl font-medium text-center">
              Customer Review
            </h2>
            <Box className="w-10 h-[3px] bg-black" />
          </Box>
        </Box>

        {/* Reviews */}
        <Box className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {reviewData.map((data, i) => (
            <Box
              key={i}
              className="p-6 sm:p-8 border-2 border-[#DEDEDE] rounded-3xl"
            >
              <Box className="flex flex-col justify-center lg:flex-row items-center lg:items-start gap-5 rounded-2xl ">
                <img
                  src={data.image}
                  alt="Review"
                  className="w-28 h-28 object-cover rounded-full"
                />
                <Box className="text-center lg:text-left flex flex-col justify-center items-center lg:items-start lg:justify-start">
                  <h3 className="text-xl font-semibold">{data.name}</h3>
                  <Rating
                    name={`rating-${i}`}
                    value={4.5}
                    precision={0.5}
                    readOnly
                  />
                  <p className="text-base text-black/75 mt-2">{data.desc}</p>
                </Box>
              </Box>
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
}

export default Review;
