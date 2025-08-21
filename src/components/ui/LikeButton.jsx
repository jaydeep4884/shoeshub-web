import React, { useContext, useState } from "react";
import { baseUrl, token } from "../../assets/contexts";
import axios from "axios";
import { Tooltip } from "antd";
import { IconButton } from "@mui/material";
import {
  FavoriteBorder as FavoriteBorderIcon,
  Favorite as FavoriteIcon,
} from "@mui/icons-material";
import toast, { Toaster } from "react-hot-toast";

function LikeButton(props) {
  const [likedProducts, setLikedProducts] = useState({});
  const Token = useContext(token);
  const apiUrl = useContext(baseUrl);
  const productId = props.pid;

  const toggleLike = async (product) => {
    const isLiked = likedProducts[product._id];
    setLikedProducts((prev) => ({ ...prev, [product._id]: !isLiked }));
    const payload = {
      product_id: product._id,
      user_id: JSON.parse(localStorage.getItem("userId")) || "",
    };

    try {
      if (!isLiked) {
        await axios.post(`${apiUrl}/wishlist`, payload, {
          headers: { Authorization: Token },
        });
        toast.success("Product Added in Wishlist 😊");
      } else {
        await axios.delete(`${apiUrl}/wishlist/${payload.product_id}`, {
          headers: { Authorization: Token },
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="flex justify-end">
        <Tooltip title="Add to Favorite" placement="bottom">
          <IconButton
            size="small"
            onClick={() => toggleLike(props.toggle)}
            className="bg-white border rounded-full"
          >
            {likedProducts[productId] ? (
              <FavoriteIcon className="text-red-500" />
            ) : (
              <FavoriteBorderIcon className="text-gray-600" />
            )}
          </IconButton>
        </Tooltip>
      </div>
      <Toaster />
    </div>
  );
}

export default LikeButton;
