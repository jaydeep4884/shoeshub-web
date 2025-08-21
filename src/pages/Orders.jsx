import React, { useContext, useEffect, useState } from "react";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import Bestshoes from "../components/layout/Bestshoes";
import Gift from "../components/layout/Gift";
import ProductDetailSkeleton from "../components/ui/ProductDetailSkeleton";
import axios from "axios";
import { baseUrl, token } from "../assets/contexts";
import { motion } from "framer-motion";
import { Card, Steps, Typography, Space, Row, Col, Divider, Tag } from "antd";
import { CheckCircleOutlined } from "@ant-design/icons";

import toast, { Toaster } from "react-hot-toast";
import PageContainer from "../components/ui/PageContainer";

const { Step } = Steps;
const { Title, Text } = Typography;

const Orders = () => {
  const [orderData, setOrderData] = useState([]);
  const [loading, setLoading] = useState(false);
  const Token = useContext(token);
  const apiUrl = useContext(baseUrl);

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get(`${apiUrl}/Payment-Detail`, {
          headers: { Authorization: Token },
        });
        setOrderData(data.Data);
      } catch {
        toast.error("No Any Orders Found !!");
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <Header />
      <PageContainer>
        <Title level={4}>Your Orders :</Title>

        {loading ? (
          <ProductDetailSkeleton />
        ) : (
          orderData.map((item) => (
            <Card
              key={item._id}
              variant="border"
              hoverable
              className="my-5 shadow-sm"
            >
              <Row gutter={[16, 16]} align="middle">
                <Col xs={24} sm={6}>
                  <motion.img
                    whileHover={{ scale: 1.03 }}
                    transition={{ duration: 0.3 }}
                    src={item.cart_product.images[0]}
                    alt="product"
                    className="w-full h-48 object-contain rounded "
                  />
                </Col>
                <Col xs={24} sm={18}>
                  <Title level={5}>{item.cart_product.pro_name}</Title>
                  <Text type="secondary">
                    Eligible for return up to 30 days from purchase
                  </Text>
                  <div className="mt-2 flex gap-3 items-center">
                    <Text strong>${item.cart_product.new_price}</Text>
                    <Tag icon={<CheckCircleOutlined />} color="processing">
                      Delivered : 01 April
                    </Tag>
                  </div>
                </Col>
              </Row>

              <Divider />

              <Steps current={3} responsive size="small">
                {["Confirmed", "Shipped", "Out for Delivery", "Delivered"].map(
                  (title) => (
                    <Step key={title} title={title} />
                  )
                )}
              </Steps>

              <Divider />

              <Row gutter={[16, 16]} justify="space-between" align="middle">
                <Col xs={24} md={16}>
                  <Space direction="vertical" size="small">
                    <Text>
                      <strong>Order ID:</strong> #{item._id}
                    </Text>
                    <Text>
                      <strong>Ordered On:</strong> 25 March 2025
                    </Text>
                    <Text>
                      <strong>Payment:</strong> {item.paymentProvider}
                    </Text>
                    <Text>
                      <strong>Shipping:</strong> {item.streetAddress}
                    </Text>
                  </Space>
                </Col>
              </Row>
            </Card>
          ))
        )}
      </PageContainer>
      <Bestshoes />
      <Gift />
      <Footer />
      <Toaster />
    </>
  );
};

export default Orders;
