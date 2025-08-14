import React from "react";
import { Container } from "@mui/material";
import { motion } from "framer-motion";

function BgBody({ children }) {
  return (
    <Container maxWidth="lg">
      <div className="py-8 sm:py-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {children}
        </motion.div>
      </div>
    </Container>
  );
}

export default BgBody;
