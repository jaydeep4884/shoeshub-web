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
    <Container maxWidth="lg" className="px-4 sm:px-6 md:px-10">
      <Confetti width={width} height={height} numberOfPieces={200} />

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="min-h-[80vh] flex flex-col items-center justify-center text-center py-10 space-y-8"
      >
        {/* Heading Section */}
        <Box className="space-y-4 max-w-2xl">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-green-500 leading-snug">
            🎉 Order Placed Successfully!
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-gray-600 px-2">
            Thank you for your purchase. Your order is now being processed.
            You will receive a confirmation email shortly.
          </p>
        </Box>

        {/* Button Section */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.4 }}
        >
          <Button
            type="primary"
            size="large"
            className="px-6 py-2 text-sm sm:text-base md:text-lg rounded-lg"
            onClick={() => navigate("/home")}
          >
            Continue Shopping
          </Button>
        </motion.div>
      </motion.div>
    </Container>
  );
}

export default OrderPlaced;
