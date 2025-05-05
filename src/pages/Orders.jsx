import React from "react";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import { Box, Container } from "@mui/material";
import { motion } from "framer-motion";

function Orders() {
  return (
    <>
      <Header />
      <Container maxWidth="lg">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <Box className="py-5 sm:py-10">
            <h1>No Orders Right Now !</h1>
          </Box>
        </motion.div>
      </Container>
      <Footer />
    </>
  );
}

export default Orders;
