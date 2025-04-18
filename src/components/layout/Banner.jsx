import { Box, Container } from "@mui/material";
import React from "react";
import shoesImage from "../img/shoes.png";

function Banner() {
  return (
    <Box className="px-4 sm:px-8 bg-[#63A1DC] rounded-xl text-white">
      <Container maxWidth="lg">
        <Box className="py-10">
          {/* Hero Section */}
          <Box className="flex flex-col md:flex-row items-center justify-between ">
            {/* Text Section */}
            <Box className="w-full md:w-[42%] space-y-8">
              <Box>
                <h3 className="text-sm tracking-wide">YOUR STYLISH...</h3>
                <h2 className="text-4xl font-bold">Sthos Sek</h2>
                <p className="text-base mt-2">
                  Step into comfort and walk in style with us..
                </p>
                <button className="mt-4 bg-[#96CF02] hover:bg-[#7fb800] transition-all duration-300 text-white rounded-md py-2 px-5 uppercase font-semibold text-sm shadow-md">
                  Explore Our Collection
                </button>
              </Box>

              <Box>
                <h2 className="text-2xl font-semibold">Men’s Sport Shoes</h2>
                <p className="text-base mt-2">
                  Elevate your style with our classic leather shoes. These shoes
                  offer superior comfort.
                </p>
                <button className="mt-4 bg-[#96CF02] hover:bg-[#7fb800] transition-all duration-300 text-white rounded-md py-2 px-5 uppercase font-semibold text-sm shadow-md">
                  Add to Cart
                </button>
              </Box>
            </Box>

            {/* Image + Discount */}
            <Box className="relative flex justify-center">
              <img
                src={shoesImage}
                alt="Shoes"
                className="w-[320px] sm:w-[400px] md:w-[700px] transition-all duration-500 hover:scale-105 drop-shadow-2xl"
              />
              <Box className="absolute top-0 right-0 transform translate-x-4 -translate-y-4 bg-[#96CF02] text-white text-center font-bold text-[20px] px-5 py-5 rounded-full shadow-lg animate-bounce">
                40%
                <br />
                off
              </Box>
            </Box>
          </Box>

          {/* Reviews */}
          <Box className="text-center">
            <h2 className="text-2xl font-semibold mb-2">Reviews</h2>
            <p className="text-sm text-white/80 mb-6">
              Testimony of our customers
            </p>
            <Box className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {[
                {
                  name: "ALICE",
                  review:
                    "I recently purchased a pair of shoes from this store and I am incredibly happy!",
                  stars: 5,
                },
                {
                  name: "MARY",
                  review:
                    "I love the shoes I bought in this store, they are the most comfortable I have ever tried.",
                  stars: 4.5,
                },
                {
                  name: "HADY",
                  review:
                    "My favorite shoe store, all very nice and comfortable, I always find what I want.",
                  stars: 5,
                },
              ].map((item, idx) => (
                <Box
                  key={idx}
                  className="bg-white/10 p-4 rounded-lg shadow-md hover:shadow-xl transition"
                >
                  <h3 className="font-bold text-white mb-2">{item.name}</h3>
                  <p className="text-sm text-white/90 mb-3">{item.review}</p>
                  <div className="text-[#96CF02] text-lg">
                    {"★".repeat(Math.floor(item.stars))}
                    {item.stars % 1 !== 0 && "½"}
                  </div>
                </Box>
              ))}
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

export default Banner;
