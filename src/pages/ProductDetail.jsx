import React, { useEffect, useState, useContext } from "react";
import { Box, Button, Container, IconButton, Rating } from "@mui/material";
import { Tooltip } from "antd";
import { useParams, Link } from "react-router";
import { motion } from "framer-motion";
import {
  LocalOffer,
  FavoriteBorder,
  Favorite,
  PublicOutlined,
  CreditCardOutlined,
  PersonOutlineOutlined,
} from "@mui/icons-material";
import axios from "axios";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import Breadcrumb from "../components/ui/Breadcrumb";
import { token } from "../assets/contexts";
import Loader from "../components/ui/Loader";

function ProductDetail() {
  const { id } = useParams();
  const Token = useContext(token);
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState("");
  const [like, setLike] = useState(false);
  const [loading, setLoading] = useState(true);

  const breadItems = [
    { label: "Home", link: "/home" },
    { label: "Product Detail" },
  ];

  const features = [
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

  // Fetching Single Product
  const fetchProduct = async () => {
    try {
      const res = await axios.get(
        `https://generateapi.onrender.com/api/product/`,
        { headers: { Authorization: Token } }
      );
      const productData = res.data.Data;
      const singleProduct = productData.find((item) => item._id === id);
      setProduct(singleProduct);
      setSelectedImage(singleProduct.images?.[0] || "");
    } catch (err) {
      console.error("Failed to fetch product:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProduct();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <Header />
      <Container maxWidth="lg">
        <Box className="py-5 sm:py-10">
          <Breadcrumb items={breadItems} />

          {/* Product Detail Section */}
          {loading ? (
            <Loader />
          ) : (
            <Box className="flex flex-col lg:flex-row gap-10">
              {/* Left Side - Images */}
              <Box className="flex flex-col sm:flex-row gap-6 sm:gap-10 w-full lg:w-[60%]">
                <Box className="flex sm:flex-col gap-3">
                  {product.images?.map((img, idx) => (
                    <img
                      key={idx}
                      src={img}
                      alt={`thumb-${idx}`}
                      className={`h-auto w-[80px] object-contain cursor-pointer rounded-md border ${
                        selectedImage === img
                          ? "border-blue-500"
                          : "border-black"
                      }`}
                      onClick={() => setSelectedImage(img)}
                    />
                  ))}
                </Box>

                <motion.img
                  key={selectedImage}
                  src={selectedImage}
                  alt="Selected"
                  className="w-full max-h-[360px] sm:max-h-auto object-cover"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                />
              </Box>

              {/* Right Side - Details */}
              <Box className="w-full lg:w-[40%]">
                <h1 className="text-2xl sm:text-3xl font-bold mb-4">
                  {product.pro_name}
                </h1>

                <Box className="flex gap-2 items-center mb-6">
                  <Rating
                    name="rating"
                    value={parseFloat(product.pro_rating) || 0}
                    readOnly
                    size="small"
                  />
                  <p className="text-[#52525B] text-sm font-medium">
                    {product.review} Reviews
                  </p>
                </Box>

                <Box className="mb-6">
                  <Box className="flex items-center gap-2 mb-2">
                    <h2 className="text-2xl sm:text-3xl font-bold">
                      ${product.new_price}
                    </h2>
                    <h2 className="text-lg sm:text-xl text-[#71717A] line-through font-bold">
                      ${product.old_price}
                    </h2>
                  </Box>
                  <Box className="flex items-center gap-1">
                    <LocalOffer fontSize="small" style={{ fill: "#A1A1AA" }} />
                    <p className="text-[#71717A] text-sm font-medium">
                      Save{" "}
                      {Math.round(
                        ((product.old_price - product.new_price) /
                          product.old_price) *
                          100
                      )}
                      % right now
                    </p>
                  </Box>
                </Box>

                {/* Product Description or Attributes */}
                <Box className="mb-6">
                  <p className="text-gray-900 font-medium mb-3">
                    Product Details:
                  </p>
                  <ul className="list-disc pl-4 space-y-1 text-gray-700">
                    <li>Closure Type: {product.type || "Unknown"}</li>
                    <li>Type of heel: {product.typeofheel || "N/A"}</li>
                    <li>
                      Water resistant level: {product.waterlevel || "Unisex"}
                    </li>
                    <li>Sole Material: {product.material || "Synthetic"}</li>
                  </ul>
                </Box>

                {/* Actions */}
                <Box className="flex items-center gap-3 mb-6">
                  <Link to="/cart">
                    <Button
                      variant="contained"
                      className="!capitalize !bg-black !px-6 py-2"
                    >
                      Add to Cart
                    </Button>
                  </Link>
                  <Box className="border border-gray-300 rounded-md">
                    <Tooltip title="Favorite" placement="bottom">
                      <IconButton onClick={() => setLike(!like)}>
                        {like ? (
                          <Favorite style={{ fill: "black" }} />
                        ) : (
                          <FavoriteBorder />
                        )}
                      </IconButton>
                    </Tooltip>
                  </Box>
                </Box>

                {/* Features */}
                <Box className="space-y-4">
                  {features.map((f, idx) => (
                    <Box key={idx} className="flex items-center gap-2">
                      {f.icon}
                      <p className="text-sm text-gray-600">{f.text}</p>
                    </Box>
                  ))}
                </Box>
              </Box>
            </Box>
          )}
        </Box>
      </Container>
      <Footer />
    </>
  );
}

export default ProductDetail;
