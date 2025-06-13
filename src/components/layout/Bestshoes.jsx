import React, { useContext, useEffect, useState } from "react";
import { Box, Container, IconButton, Tooltip } from "@mui/material";
import { Rate, Typography } from "antd";
import axios from "axios";
import { token } from "../../assets/contexts";
import {
  FavoriteBorder as FavoriteBorderIcon,
  Favorite as FavoriteIcon,
} from "@mui/icons-material";

function Bestshoes() {
  const [data, setData] = useState([]);
  const [likedProducts, setLikedProducts] = useState({});
  const Token = useContext(token);

  // Fetch and randomize products
  const fetchProducts = async () => {
    try {
      const res = await axios.get(
        "https://generateapi.onrender.com/api/product",
        {
          headers: { Authorization: Token },
        }
      );
      const products = Array.isArray(res.data.Data) ? res.data.Data : [];
      setData(getRandomProducts(products, 4));
    } catch (err) {
      console.error(err);
    }
  };

  const toggleLike = (id) => {
    console.log(id);

    setLikedProducts((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const getRandomProducts = (arr, count) =>
    [...arr].sort(() => 0.5 - Math.random()).slice(0, count);

  useEffect(() => {
    fetchProducts();
    // eslint-disable-next-line
  }, []);

  return (
    <Container maxWidth="lg">
      <Box className="py-6 sm:py-12">
        <h3 className="text-xl font-semibold text-[#252C32] border-b-2 border-[#252C32] inline-block mb-8">
          Best of Shoes
        </h3>

        <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
          {data.map((product) => (
            <div
              key={product._id}
              className="relative bg-white border rounded-md hover:shadow-lg transition p-3 sm:p-4 flex flex-col"
            >
              {/* Wishlist icon */}
              <div className="absolute top-2 right-2 z-10">
                <Tooltip title="Add to Favorite" placement="bottom">
                  <IconButton
                    size="small"
                    onClick={() => toggleLike(product._id)}
                    className="bg-white border rounded-full"
                  >
                    {likedProducts[product._id] ? (
                      <FavoriteIcon className="text-red-500" />
                    ) : (
                      <FavoriteBorderIcon className="text-gray-600" />
                    )}
                  </IconButton>
                </Tooltip>
              </div>

              {/* Product Image */}
              <div className="w-full h-[160px] sm:h-[180px] md:h-[200px] flex items-center justify-center mb-3">
                <img
                  src={product.images?.[0]}
                  alt={product.pro_name}
                  className="max-h-full object-contain"
                />
              </div>

              {/* Product Name */}
              <Typography.Text className="text-sm font-semibold text-gray-800 mb-1 line-clamp-1">
                {product.pro_name}
              </Typography.Text>

              {/* Price */}
              <div className="mb-2">
                <span className="font-bold">${product.new_price}</span>
                <span className="ml-2 line-through text-gray-400 text-sm">
                  ${product.old_price}
                </span>
              </div>

              {/* Rating and Review */}
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-1 md:gap-0">
                <div className="flex items-center gap-1">
                  <Rate
                    disabled
                    allowHalf
                    defaultValue={product.pro_rating}
                    style={{ fontSize: "14px" }}
                  />
                  <span className="text-xs text-gray-600">
                    {product.pro_rating}/5
                  </span>
                </div>
                <Typography.Text className="text-xs text-gray-500">
                  {product.review} reviews
                </Typography.Text>
              </div>
            </div>
          ))}
        </div>
      </Box>
    </Container>
  );
}

export default Bestshoes;
