import React, { useContext, useEffect, useState } from "react";
import { Typography, Image } from "antd";
import axios from "axios";
import { baseUrl, token } from "../../assets/contexts";
import Loader from "../../components/ui/Loader";
import toast, { Toaster } from "react-hot-toast";

const Orders = () => {
  const [orderData, setOrderData] = useState([]);
  const [loading, setLoading] = useState(false);
  const Token = useContext(token);
  const apiUrl = useContext(baseUrl);

  const fetchOrderData = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${apiUrl}/Payment-Details`, {
        headers: { Authorization: Token },
      });
      setOrderData(res.data?.Data || []);
      console.log(res.data?.Data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
    setLoading(false);
  };

  const cancelOrder = async (id) => {
    try {
      await axios
        .delete(`${apiUrl}/Payment-Details/${id}`, {
          headers: { Authorization: Token },
        })
        .then(() => {
          fetchOrderData();
          toast.success("Order Cancel Successfully !");
        });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchOrderData();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="space-y-6">
      {loading ? (
        <Loader />
      ) : orderData.length === 0 ? (
        <Typography.Text>No Orders Available</Typography.Text>
      ) : (
        orderData.map((order) => {
          const product = order.cart_product;

          return (
            <div
              key={order._id}
              className="border rounded-lg p-4 flex flex-col items-center sm:flex-row gap-4 shadow-sm hover:shadow-md transition"
            >
              {/* Product Image */}
              <div className="flex-shrink-0">
                <Image
                  src={product?.images[0]}
                  alt={product?.pro_name}
                  width={120}
                  height={120}
                  preview={false}
                  className="object-contain rounded"
                />
              </div>

              {/* Product Details */}
              <div className="flex flex-col justify-between w-full">
                <div className="block sm:flex sm:justify-between sm:items-start">
                  <div className="!mb-3 sm:mb-0">
                    <Typography.Text strong className="text-base">
                      {product?.pro_name}
                    </Typography.Text>
                    <div className="text-sm mt-1 space-y-1 text-gray-600">
                      <p>Price: ${product?.new_price}</p>
                      <p>Quantity: {order?.quantity || 1}</p>
                      <p>
                        Total: ${product?.new_price * (order?.quantity || 1)}
                      </p>

                      <p>City: {order.city}</p>
                      <p>
                        Arrives: <strong>Fri, 4/19 – Tue, 4/23</strong>
                      </p>
                      <p>User : {order.fullName}</p>
                      <p className="text-green-600 font-medium">
                        In stock and ready to ship
                      </p>
                    </div>
                  </div>

                  {/* Edit Button */}
                  <Typography.Link
                    className="text-sm"
                    onClick={() => cancelOrder(order._id)}
                    strong
                  >
                    Cancel Order ?
                  </Typography.Link>
                </div>
              </div>
            </div>
          );
        })
      )}
      <Toaster />
    </div>
  );
};

export default Orders;
