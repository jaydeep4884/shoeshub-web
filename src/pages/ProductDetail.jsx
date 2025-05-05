import {
  Box,
  Button,
  Container,
  IconButton,
  Rating,
} from "@mui/material";
import { Tooltip } from "antd";
import React, { useState } from "react";
import { Link } from "react-router";
import { motion } from "framer-motion";
import shoes1 from "../components/img/shoes/shoes-01-01.png";
import shoes2 from "../components/img/shoes/shoes-01-02.png";
import shoes3 from "../components/img/shoes/shoes-01-03.png";
import shoes1Main from "../components/img/shoes/shoes-01-main.jpg";
import shoes2Main from "../components/img/shoes/shoes-02-main.png";
import shoes3Main from "../components/img/shoes/shoes-03-main.png";
import {
  LocalOffer as LocalOfferIcon,
  FavoriteBorder as FavoriteBorderIcon,
  Favorite as FavoriteIcon,
  PublicOutlined,
  CreditCardOutlined,
  PersonOutlineOutlined,
} from "@mui/icons-material";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import Breadcrumb from "../components/ui/Breadcrumb";

const productDetails = [
  { label: "Closure Type", value: "Lace-Up" },
  { label: "Type of heel", value: "No heels" },
  { label: "Water resistant level", value: "Not water resistant" },
  { label: "Sole Material", value: "Rubber" },
  { label: "Exterior Material", value: "Synthetic" },
];

const productFeatures = [
  {
    icon: <PublicOutlined fontSize="small" style={{ fill: "#A1A1AA" }} />,
    text: "Free shipping worldwide",
  },
  {
    icon: <CreditCardOutlined fontSize="small" style={{ fill: "#A1A1AA" }} />,
    text: "100% Secured Payment",
  },
  {
    icon: (
      <PersonOutlineOutlined fontSize="small" style={{ fill: "#A1A1AA" }} />
    ),
    text: "Made by the Professionals",
  },
];

function Cart() {
  const breadItems = [
    {
      label: " Home",
      link: "/home",
    },
    {
      label: "ProductDetail",
    },
  ];
  const images = [
    { thumb: shoes1, main: shoes1Main },
    { thumb: shoes2, main: shoes2Main },
    { thumb: shoes3, main: shoes3Main },
  ];
  const [like, setLike] = useState(false);
  const [selectedImage, setSelectedImage] = useState(images[0].main);

  return (
    <>
      <Header />
      <Container maxWidth="lg">
        <Box className="py-5 sm:py-10">
          <Breadcrumb items={breadItems} />

          {/* Product Detail  */}
          <Box className="flex flex-col lg:flex-row gap-10">
            {/* Left Side */}
            <Box className="flex flex-col sm:flex-row gap-6 sm:gap-10 w-full lg:w-[60%]">
              <Box className="flex sm:flex-col gap-3">
                {images.map((img, idx) => (
                  <img
                    key={idx}
                    src={img.thumb}
                    alt={`shoe-thumb-${idx}`}
                    className={`h-[80px] w-[80px] sm:h-[80px] sm:w-[100px] object-cover cursor-pointer rounded-md border ${selectedImage === img.main ? "border-blue-500" : "border-black"}`}
                    onClick={() => setSelectedImage(img.main)}
                  />
                ))}
              </Box>
              <motion.img
                key={selectedImage}
                src={selectedImage}
                alt="Selected Shoe"
                className="w-full max-h-[360px] sm:max-h-[490px] object-cover"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              />
            </Box>

            {/* Right Side */}
            <Box className="w-full lg:w-[40%]">
              <Box className="mb-6">
                <h1 className="text-2xl sm:text-3xl font-bold mb-4 leading-tight">
                  Nike Mens Air Zoom Pegasus 37 Flyease Running Shoes
                </h1>
                <Box className="flex gap-2 items-center">
                  <Rating
                    name="read-only"
                    defaultValue={3}
                    size="small"
                    readOnly
                  />
                  <p className="text-[#52525B] text-sm font-medium">
                    157 Reviews
                  </p>
                </Box>
              </Box>

              <Box className="mb-6">
                <Box className="flex items-center gap-1 mb-2">
                  <h2 className="text-2xl sm:text-3xl font-bold">$163</h2>
                  <h2 className="text-lg sm:text-xl text-[#71717A] line-through font-bold">
                    $200
                  </h2>
                </Box>
                <Box className="flex items-center gap-1">
                  <LocalOfferIcon
                    fontSize="small"
                    style={{ fill: "#A1A1AA" }}
                  />
                  <p className="text-[#71717A] text-sm font-medium">
                    Save 30% right now
                  </p>
                </Box>
              </Box>

              <Box className="mb-6">
                <p className="text-gray-900 font-medium mb-3">
                  Product Details:
                </p>
                <ul className="list-disc pl-4 space-y-2">
                  {productDetails.map((detail, idx) => (
                    <li key={idx}>
                      <span className="font-medium">{detail.label}: </span>
                      <span className="font-medium text-gray-700">
                        {detail.value}
                      </span>
                    </li>
                  ))}
                </ul>
              </Box>

              <Box className="flex !items-center gap-3 mb-6">
                <Link to="/cart">
                  <Button
                    variant="contained"
                    className="!capitalize !bg-black !px-6 py-2"
                  >
                    Add to Cart
                  </Button>
                </Link>
                <Box className="border border-fuchsia-300 rounded-md">
                  <Tooltip title="Favorite" placement="bottom">
                    <IconButton onClick={() => setLike(!like)}>
                      {like ? (
                        <FavoriteIcon style={{ fill: "black" }} />
                      ) : (
                        <FavoriteBorderIcon />
                      )}
                    </IconButton>
                  </Tooltip>
                </Box>
              </Box>

              <Box className="space-y-4">
                {productFeatures.map((feature, idx) => (
                  <Box key={idx} className="flex gap-2 items-center">
                    {feature.icon}
                    <p className="text-sm text-gray-600">{feature.text}</p>
                  </Box>
                ))}
              </Box>
            </Box>
          </Box>
        </Box>
      </Container>
      <Footer />
    </>
  );
}

export default Cart;
