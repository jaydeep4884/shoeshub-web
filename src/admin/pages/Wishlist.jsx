import { Popconfirm, Rate, Typography } from "antd";
import React, { useContext, useEffect, useState } from "react";
import { token } from "../../assets/contexts";
import axios from "axios";
import Loader from "../../components/ui/Loader";
import { QuestionCircleOutlined } from "@ant-design/icons";
import DeleteIcon from "@mui/icons-material/Delete";
import { motion } from "framer-motion";
import { IconButton } from "@mui/material";
import  {toast, Toaster } from "react-hot-toast";

function Wishlist() {
  const [wishlistData, setWishlistData] = useState([]);
  const [loading, setLoading] = useState(false);
  const Token = useContext(token);

  const getWishlistData = async () => {
    setLoading(true);
    try {
      await axios
        .get("https://generateapi.onrender.com/api/wishlist", {
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

  const handleDelete = async (id) => {
    console.log(id);
    try {
      await axios
        .delete(`https://generateapi.onrender.com/api/wishlist/${id}`, {
          headers: {
            Authorization: Token,
          },
        })
        .then(() => {
          getWishlistData();
          toast.success("Favorite Item Deleted !!");
        });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getWishlistData();
    // eslint-disable-next-line
  }, []);
  return (
    <>
      <Typography className="text-lg mb-5 font-semibold">
        Wishlist Items :
      </Typography>
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
                  {/* Wishlist icon */}
                  <div className="absolute top-2 right-2 z-10">
                    <Popconfirm
                      title="Delete the Favorite?"
                      description="Are you sure?"
                      onConfirm={() => handleDelete(product.product_id._id)}
                      okText="Yes"
                      cancelText="No"
                      icon={<QuestionCircleOutlined style={{ color: "red" }} />}
                    >
                      <IconButton
                        size="small"
                        className="bg-white border rounded-full"
                      >
                        <DeleteIcon className="text-gray-300" />
                      </IconButton>
                    </Popconfirm>
                  </div>
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
                  <div className="flex-col md:flex-row items-start md:items-center justify-between gap-1 md:gap-0">
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
            <Toaster />
          </motion.div>
        </>
      )}
    </>
  );
}

export default Wishlist;
