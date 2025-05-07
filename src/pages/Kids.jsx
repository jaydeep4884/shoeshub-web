import { Box, Container } from "@mui/material";
import React from "react";
import Header from "../components/layout/Header";
import { motion } from "framer-motion";
import Footer from "../components/layout/Footer";
import KidsBanner from "../components/img/Banners/kids-banner.png";
import PageBanner from "../components/ui/PageBanner";

function Kids() {
  return (
    <>
      <Header />
      {/* Banner section  */}
      <PageBanner path={KidsBanner} />
      <Container maxWidth="lg">
        <Box className="py-8 sm:py-10">
          <motion.Box
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p>Kids Page</p>
          </motion.Box>
        </Box>
      </Container>
      <Footer />
    </>
  );
}

export default Kids;
