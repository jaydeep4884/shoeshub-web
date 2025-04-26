import { Box, Breadcrumbs, Container } from "@mui/material";
import { Typography } from "antd";
import React, { useState } from "react";
import { Link } from "react-router"; // FIX: react-router-dom
import { motion } from "framer-motion"; // ✨ Import motion!

import shoes1 from "../components/img/shoes/shoes-01-01.png";
import shoes2 from "../components/img/shoes/shoes-01-02.png";
import shoes3 from "../components/img/shoes/shoes-01-03.png";
import shoes1Main from "../components/img/shoes/shoes-01-main.jpg";
import shoes2Main from "../components/img/shoes/shoes-02-main.png";
import shoes3Main from "../components/img/shoes/shoes-03-main.png";

function Cart() {
  const images = [
    { thumb: shoes1, main: shoes1Main },
    { thumb: shoes2, main: shoes2Main },
    { thumb: shoes3, main: shoes3Main },
  ];

  const [selectedImage, setSelectedImage] = useState(images[0].main); // Default: first main image

  return (
    <Container maxWidth="lg">
      <Box className="py-5 sm:py-14">
        {/* Breadcrumbs */}
        <Breadcrumbs aria-label="breadcrumb" className="!mb-10">
          <Link to="">
            <Typography>Home</Typography>
          </Link>
          <Link to="">
            <Typography>Product</Typography>
          </Link>
          <Typography>Breadcrumbs</Typography>
        </Breadcrumbs>

        {/* Main Section */}
        <Box className="flex flex-col sm:flex-row gap-10">
          {/* Thumbnails */}
          <Box className="flex sm:flex-col gap-3">
            {images.map((img, idx) => (
              <img
                key={idx}
                src={img.thumb}
                alt={`shoe-thumb-${idx}`}
                className={`h-[86px] w-[96px] object-cover cursor-pointer rounded-md border-2 ${
                  selectedImage === img.main
                    ? "border-blue-500"
                    : "border-black"
                }`}
                onClick={() => setSelectedImage(img.main)}
              />
            ))}
          </Box>

          {/* Main Animated Image */}
          <Box>
            <motion.img
              key={selectedImage} // Important to re-trigger animation
              src={selectedImage}
              alt="Selected Shoe"
              className="max-h-[400px] object-contain"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            />
          </Box>
        </Box>
      </Box>
    </Container>
  );
}

export default Cart;
