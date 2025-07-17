import React, { useContext, useEffect, useState } from "react";
import {
  Table,
  Select,
  Button,
  Typography,
  Row,
  Col,
  Divider,
  Spin,
} from "antd";
import { Link, useNavigate } from "react-router";
import { ShoppingOutlined, DeleteOutlined } from "@ant-design/icons";
import { motion } from "framer-motion";
import axios from "axios";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import Applycoup from "../components/ui/Applycoup";
import Buttongroup from "../components/ui/Buttongroup";
import { token } from "../assets/contexts";
import Breadcrumb from "../components/ui/Breadcrumb";
import { Container } from "@mui/material";
import toast, { Toaster } from "react-hot-toast";
import { Formik, Form } from "formik";

const { Option } = Select;

const breadItems = [{ label: "Home", link: "/home" }, { label: "Cart" }];

function Cart() {
  const [cartData, setCartData] = useState([]);
  const [loading, setLoading] = useState(false);
  const Token = useContext(token);
  const navigate = useNavigate();

  const fetchCartItems = async () => {
    setLoading(true);
    try {
      const res = await axios.get("https://generateapi.onrender.com/api/Cart", {
        headers: { Authorization: Token },
      });
      setCartData(res.data?.Data || []);
    } catch (error) {
      console.error("Cart fetch failed:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleQtyChange = (itemId, newQty) => {
    setCartData((prev) =>
      prev.map((item) =>
        item._id === itemId ? { ...item, quantity: newQty } : item
      )
    );
  };

  const subtotal = cartData.reduce((sum, item) => {
    const price = item?.product_item?.new_price || 0;
    const quantity = item?.quantity || 1;
    return sum + price * quantity;
  }, 0);

  const deleteCartItem = async (id) => {
    try {
      await axios
        .delete(`https://generateapi.onrender.com/api/Cart/${id}`, {
          headers: { Authorization: Token },
        })
        .then(() => {
          toast.success("Cart Item Deleted !!");
          fetchCartItems();
        });
    } catch (error) {
      console.log(error);
    }
  };

  const columns = [
    {
      title: "No.",
      dataIndex: "index",
      key: "index",
      render: (_, __, idx) => idx + 1,
      responsive: ["xs", "sm", "md", "lg"],
    },
    {
      title: "Product",
      key: "product",
      render: (_, record) => (
        <div className="flex items-center gap-4 min-w-[200px] max-w-[300px]">
          <img
            src={record.product_item.images?.[0]}
            alt={record.product_item.pro_name}
            className="w-14 h-14 object-contain rounded"
          />
          <Typography.Text
            style={{
              whiteSpace: "normal",
              wordWrap: "break-word",
              fontWeight: 500,
            }}
          >
            {record.product_item.pro_name}
          </Typography.Text>
        </div>
      ),
    },
    {
      title: "Price",
      dataIndex: ["product_item", "new_price"],
      key: "price",
      align: "right",
      render: (price) => <Typography.Text strong>${price}</Typography.Text>,
    },
    {
      title: "Quantity",
      key: "quantity",
      align: "right",
      render: (record) => (
        <Select
          value={record.quantity}
          onChange={(value) => handleQtyChange(record._id, value)}
          size="small"
        >
          {[1, 2, 3, 4, 5].map((val) => (
            <Option key={val} value={val}>
              {val}
            </Option>
          ))}
        </Select>
      ),
    },
    {
      title: "Action",
      key: "action",
      align: "center",
      render: (_, record) => (
        <div className="flex flex-col sm:flex-row justify-center gap-2 sm:gap-4">
          <Button
            icon={<ShoppingOutlined />}
            type="primary"
            onClick={() => navigate(`/checkout/${record.product_item?._id}`)}
            className="w-full sm:w-auto"
          >
            Buy Now
          </Button>
          <Button
            icon={<DeleteOutlined />}
            type="primary"
            danger
            onClick={() => deleteCartItem(record._id)}
            className="w-full sm:w-auto"
          >
            Delete
          </Button>
        </div>
      ),
    },
  ];

  useEffect(() => {
    fetchCartItems();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <Header />
      <Container maxWidth="lg">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="px-4 py-8"
        >
          <Breadcrumb items={breadItems} />

          <div className="bg-white shadow rounded-lg overflow-x-auto mb-6">
            {loading ? (
              <Spin tip="Loading cart items...">
                <div style={{ height: "150px" }} />
              </Spin>
            ) : (
              <Table
                dataSource={cartData}
                columns={columns}
                rowKey="_id"
                pagination={false}
                scroll={{ x: true }}
              />
            )}
          </div>

          <Link to="/home">
            <Button className="mb-6" type="default">
              Return to Shop
            </Button>
          </Link>

          <Row gutter={[24, 24]}>
            <Col xs={24} md={14}>
              <Formik
                initialValues={{ couponCode: "" }}
                onSubmit={(values) => {
                  // you can handle coupon submit here if needed
                  console.log("Submitted:", values);
                }}
              >
                <Form>
                  <Applycoup />
                </Form>
              </Formik>
            </Col>

            <Col xs={24} md={10}>
              <div className="border p-6 rounded-lg shadow-sm bg-white">
                <Typography.Title level={5}>Cart Total</Typography.Title>
                <Divider />
                <Row justify="space-between">
                  <Typography.Text>Subtotal:</Typography.Text>
                  <Typography.Text>${subtotal.toFixed(2)}</Typography.Text>
                </Row>
                <Row justify="space-between">
                  <Typography.Text>Shipping:</Typography.Text>
                  <Typography.Text>Free</Typography.Text>
                </Row>
                <Divider />
                <Row justify="space-between">
                  <Typography.Text strong>Total:</Typography.Text>
                  <Typography.Text strong>
                    ${subtotal.toFixed(2)}
                  </Typography.Text>
                </Row>
                <div className="mt-4">
                  <Link to="/checkout">
                    <Buttongroup name="Proceed To Checkout" />
                  </Link>
                </div>
              </div>
            </Col>
          </Row>
        </motion.div>
      </Container>
      <Toaster />
      <Footer />
    </>
  );
}

export default Cart;
