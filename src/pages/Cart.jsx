import {
  Box,
  Breadcrumbs,
  Button,
  Container,
  IconButton,
  Rating,
} from "@mui/material";
import { Tooltip, Typography } from "antd";
import React, { useState } from "react";
import { Link } from "react-router";
import { motion } from "framer-motion";
import shoes1 from "../components/img/shoes/shoes-01-01.png";
import shoes2 from "../components/img/shoes/shoes-01-02.png";
import shoes3 from "../components/img/shoes/shoes-01-03.png";
import shoes1Main from "../components/img/shoes/shoes-01-main.jpg";
import shoes2Main from "../components/img/shoes/shoes-02-main.png";
import shoes3Main from "../components/img/shoes/shoes-03-main.png";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

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
        <Box className="flex gap-x-10">
          {/* Slide Section  */}
          <Box className="flex flex-col sm:flex-row gap-14 w-[60%]">
            {/* Thumbnails */}
            <Box className="flex sm:flex-col gap-3">
              {images.map((img, idx) => (
                <img
                  key={idx}
                  src={img.thumb}
                  alt={`shoe-thumb-${idx}`}
                  className={`h-[90px] w-[100px] object-cover cursor-pointer rounded-md border ${
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
                key={selectedImage}
                src={selectedImage}
                alt="Selected Shoe"
                className="max-h-[400px] object-cover"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              />
            </Box>
          </Box>

          {/* Product Content  */}
          <Box className="w-[40%]">
            {/* Heading and Rating  */}
            <Box className="mb-6">
              <h1 className="text-3xl font-bold font-sans mb-4">
                Nike Mens Air Zoom Pegasus 37 Flyease Running Shoes
              </h1>
              <Box className="flex gap-2 items-center">
                <Rating
                  name="read-only"
                  defaultValue={3}
                  size="small"
                  readOnly
                />
                <p className="text-[#52525B] font-medium text-[14px]">
                  157 Reviews
                </p>
              </Box>
            </Box>

            {/* Price and Lable */}
            <Box className="mb-6">
              <Box className="flex items-center gap-1 mb-2">
                <h2 className="text-3xl font-bold font-sans">$163</h2>
                <h2 className="text-xl text-[#71717A] line-through font-bold font-sans">
                  $200
                </h2>
              </Box>
              <Box className="flex items-center gap-1">
                <LocalOfferIcon fontSize="12px" style={{ fill: "#A1A1AA" }} />
                <p className="text-[#71717A] text-[14px] font-medium">
                  Save 30% right now
                </p>
              </Box>
            </Box>

            {/* Product Detail  */}
            <Box className="mb-6">
              <p className="text-gray-900 font-medium mb-3">Product Details:</p>
              <ul className="list-disc pl-4 space-y-2 ">
                <li>
                  <span className="font-medium">Closure Type: </span>
                  <span className="font-medium text-gray-700">Lace-Up</span>
                </li>
                <li>
                  <span className="font-medium">Type of heel: </span>
                  <span className="font-medium text-gray-700">No heels</span>
                </li>
                <li>
                  <span className="font-medium">Water resistant level: </span>
                  <span className="font-medium text-gray-700">
                    Not water resistant
                  </span>
                </li>
                <li>
                  <span className="font-medium">Sole Material: </span>
                  <span className="font-medium text-gray-700">Rubber</span>
                </li>
                <li>
                  <span className="font-medium">Exterior Material: </span>
                  <span className="font-medium text-gray-700">Synthetic</span>
                </li>
              </ul>
            </Box>

            {/* Cart Button  */}
            <Box className="flex gap-3">
              <Button
                className="!capitalize  !bg-black !px-10 !py-2"
                variant="contained"
              >
                Add to Cart
              </Button>
              <Box className="!border !border-fuchsia-300 rounded-[5px]">
                <Tooltip placement="bottom" title="Delete">
                  <IconButton>
                    <FavoriteBorderIcon />
                  </IconButton>
                </Tooltip>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Container>
  );
}

export default Cart;
