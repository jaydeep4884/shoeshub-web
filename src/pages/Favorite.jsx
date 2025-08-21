import React, { useContext, useEffect, useState } from "react";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import { Box } from "@mui/material";
import { motion } from "framer-motion";
import { Rate, Typography } from "antd";
import axios from "axios";
import { baseUrl, token } from "../assets/contexts";
import Loader from "../components/ui/Loader";
import PageContainer from "../components/ui/PageContainer";

function Favorite() {
  const [wishlistData, setWishlistData] = useState([]);
  const [loading, setLoading] = useState(false);
  const Token = useContext(token, baseUrl);
  const apiUrl = useContext(baseUrl);

  const getWishlistData = async () => {
    setLoading(true);
    try {
      await axios
        .get(`${apiUrl}/wishlist`, {
          headers: { Authorization: Token },
        })
        .then((res) => {
          setWishlistData(res.data?.Data || []);
          setLoading(false);
        });
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getWishlistData();
    // eslint-disable-next-line
  }, []);
  return (
    <>
      <Header />
      <PageContainer>
        <Box className="pb-3 sm:pb-5">
          <Typography.Title className="!text-lg !mb-5">
            Your Favorite Items :
          </Typography.Title>
          {loading ? (
            <Loader />
          ) : (
            <>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
              >
                <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
                  {wishlistData.map((product) => (
                    <div
                      key={product._id}
                      className="relative bg-white border rounded-md hover:shadow-lg transition p-3 sm:p-4 flex flex-col"
                    >
                      {/* Product Image */}
                      <div className="w-full h-[160px] sm:h-[180px] md:h-[200px] flex items-center justify-center mb-3">
                        <img
                          src={product.product_id.images?.[0]}
                          alt="favorite"
                          className="max-h-full object-contain"
                        />
                      </div>

                      {/* Product Name */}
                      <Typography.Text className="text-sm font-semibold text-gray-800 mb-1 line-clamp-1">
                        {product.product_id.pro_name}
                      </Typography.Text>

                      {/* Price */}
                      <div className="mb-2">
                        <span className="font-bold">
                          ${product.product_id.new_price}
                        </span>
                        <span className="ml-2 line-through text-gray-400 text-sm">
                          ${product.product_id.old_price}
                        </span>
                      </div>

                      {/* Rating and Review */}
                      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-1 md:gap-0">
                        <div className="flex items-center gap-1">
                          <Rate
                            disabled
                            allowHalf
                            defaultValue={product.product_id.pro_rating}
                            style={{ fontSize: "14px" }}
                          />
                          <span className="text-xs text-gray-600">
                            {product.product_id.pro_rating}/5
                          </span>
                        </div>
                        <Typography.Text className="text-xs text-gray-500">
                          {product.product_id.review} reviews
                        </Typography.Text>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </>
          )}
        </Box>
      </PageContainer>
      <Footer />
    </>
  );
}

export default Favorite;
