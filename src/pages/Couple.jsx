import { Box, Container } from "@mui/material";
import React from "react";
import Header from "../components/layout/Header";
import { motion } from "framer-motion";
import Footer from "../components/layout/Footer";

function Couple() {
  return (
    <>
      <Header />
      <Container maxWidth="lg">
        <motion.Box
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Box className="py-8 sm:py-10">
            <p>Couple Page</p>
          </Box>
        </motion.Box>
      </Container>
      <Footer />
    </>
  );
}

export default Couple;
