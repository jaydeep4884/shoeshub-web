import React from "react";
import { motion } from "framer-motion";

const PageContainer = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className="!bg-white p-4 rounded  "
  >
    {children}
  </motion.div>
);

export default PageContainer;
