import React, { useEffect, useState, useContext } from "react";
import { Box, Button, IconButton, Rating } from "@mui/material";
import { Tooltip } from "antd";
import { Link, useNavigate, useParams } from "react-router";
import { motion } from "framer-motion";
import {
  LocalOffer,
  PublicOutlined,
  CreditCardOutlined,
  PersonOutlineOutlined,
  FavoriteBorder as FavoriteBorderIcon,
  Favorite as FavoriteIcon,
} from "@mui/icons-material";
import axios from "axios";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import Breadcrumb from "../components/ui/Breadcrumb";
import { Context, token } from "../assets/contexts";
import Loader from "../components/ui/Loader";
import Review from "../components/layout/Review";
import Gift from "../components/layout/Gift";
import { Form, Formik } from "formik";
import ProductDetailSkeleton from "../components/ui/ProductDetailSkeleton";
import toast, { Toaster } from "react-hot-toast";
import PageContainer from "../components/ui/PageContainer";

function ProductDetail() {
  const [product, setProduct] = useState([]);
  const [selectedImage, setSelectedImage] = useState("");
  const [loading, setLoading] = useState(true);
  const [likedProducts, setLikedProducts] = useState({});
  const { coupon } = useContext(Context);
  const Token = useContext(token);
  const { id } = useParams();
  const navigate = useNavigate();

  const initialValues = {
    user_id: JSON.parse(localStorage.getItem("userId")),
    product_item: id,
    coupon: coupon,
    quantity: 1,
  };

  const handleCart = async (values) => {
    setLoading(true);
    try {
      await axios
        .post("https://generateapi.onrender.com/api/Cart", values, {
          headers: {
            Authorization: Token,
          },
        })
        .then((res) => {
          if (res.data.Status === "Success") {
            setLoading(false);
            toast.success("Product Added in the Cart !");
          }
        });
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

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
        `https://generateapi.onrender.com/api/Product-Detail/`,
        { headers: { Authorization: Token } }
      );
      const productData = res.data.Data;
      const singleProduct = productData.find((item) => item._id === id);
      setProduct(singleProduct);
      setSelectedImage(singleProduct.images?.[0] || "");
      if (!singleProduct) {
        console.error("Product not found");
        setLoading(false);
        setProduct(null);
        return;
      }
    } catch (err) {
      console.error("Failed to fetch product:", err);
    } finally {
      setLoading(false);
    }
  };

  const toggleLike = async (product) => {
    const isLiked = likedProducts[product._id];
    setLikedProducts((prev) => ({ ...prev, [product._id]: !isLiked }));
    const payload = {
      product_id: product._id,
      user_id: JSON.parse(localStorage.getItem("userId")) || "",
    };

    try {
      if (!isLiked) {
        await axios.post(
          "https://generateapi.onrender.com/api/wishlist",
          payload,
          {
            headers: { Authorization: Token },
          }
        );
        toast.success("Product Added in Wishlist 😊");
      } else {
        await axios.delete(
          `https://generateapi.onrender.com/api/wishlist/${payload.product_id}`,
          { headers: { Authorization: Token } }
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProduct();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <Header />
      <PageContainer>
        <Box>
          <Breadcrumb items={breadItems} />

          {/* Product Detail Section */}
          {loading ? (
            <ProductDetailSkeleton />
          ) : !product ? (
            <p className="text-center text-red-500">Product not found.</p>
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
                  className="w-full max-h-[360px] sm:max-h-auto object-contain"
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
                      ₹{product.new_price}
                    </h2>
                    <h2 className="text-lg sm:text-xl text-[#71717A] line-through font-bold">
                      ₹{product.old_price}
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
                <Formik initialValues={initialValues} onSubmit={handleCart}>
                  <Form>
                    <Box className="flex items-center gap-3 mb-6">
                      <Button
                        type="submit"
                        variant="contained"
                        onClick={() => navigate("/cart")}
                        className="!capitalize !bg-black !px-6 py-2"
                      >
                        {loading ? <Loader /> : "Add to Cart"}
                      </Button>

                      <Link to={`/checkout/${id}`}>
                        <Button
                          variant="contained"
                          className="!capitalize !bg-green-500 !text-black !px-6 py-2"
                        >
                          Buy Now
                        </Button>
                      </Link>

                      <Box className="border border-gray-300 rounded-md">
                        <Tooltip title="Add to Favorite" placement="bottom">
                          <IconButton
                            size="small"
                            onClick={() => toggleLike(product)}
                            className="bg-white border rounded-full"
                          >
                            {likedProducts[product._id] ? (
                              <FavoriteIcon className="text-red-500" />
                            ) : (
                              <FavoriteBorderIcon className="text-gray-600" />
                            )}
                          </IconButton>
                        </Tooltip>
                      </Box>
                    </Box>
                  </Form>
                </Formik>

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
          <Toaster />
        </Box>
      </PageContainer>

      <Review />
      <Gift />
      <Footer />
    </>
  );
}

export default ProductDetail;
