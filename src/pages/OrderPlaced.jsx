import { Box, Container } from "@mui/material";
import React from "react";
import { motion } from "framer-motion";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";
import { useNavigate } from "react-router";
import { Button } from "antd";

function OrderPlaced() {
  const { width, height } = useWindowSize();
  const navigate = useNavigate();

  return (
    <Container maxWidth="lg">
      <Confetti width={width} height={height} numberOfPieces={250} />
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="h-screen flex flex-col items-center justify-center space-y-6"
      >s
        <Box className="text-center">
          <h1 className="text-4xl font-bold text-green-500">
            🎉 Order Placed Successfully!
          </h1>
          <p className="text-gray-500 mt-2 text-lg">
            Thank you for your purchase. Your order is now being processed. You
            will receive a confirmation email shortly.
          </p>
        </Box>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <Button
            variant="solid"
            color="danger"
            onClick={() => navigate("/home")}
            className="p-5 text-lg"
          >
            Continue Shopping
          </Button>
        </motion.div>
      </motion.div>
    </Container>
  );
}

export default OrderPlaced;
