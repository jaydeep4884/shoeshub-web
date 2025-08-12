import React from "react";
import { Container } from "@mui/material";
import { motion } from "framer-motion";

function PageContainer({ children }) {
  return (
    <>
      <Container maxWidth="lg">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="mt-20 sm:mt-40"
        >
          {children}
        </motion.div>
      </Container>
    </>
  );
}

export default PageContainer;
