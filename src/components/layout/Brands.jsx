import { Container, Box } from "@mui/material";
import React from "react";
import { motion } from "framer-motion";
import ronaldo from "../img/brands/ronaldo-brand.png";
import virat from "../img/brands/virat-brand.png";
import varun from "../img/brands/varun-brand.png";
import luffy from "../img/brands/luffy-brand.png";
import nike from "../img/logo/nike-logo.svg";
import jordan from "../img/logo/jordan-logo.svg";
import puma from "../img/logo/puma-logo.svg";
import reebok from "../img/logo/reebok-logo.svg";

const brandData = [
  { person: ronaldo, logo: nike, name: "Ronaldo - Nike" },
  { person: virat, logo: puma, name: "Virat - Puma" },
  { person: luffy, logo: jordan, name: "Luffy - Jordan" },
  { person: varun, logo: reebok, name: "Varun - Reebok" },
];
const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.15,
      duration: 0.6,
      ease: "easeOut",
    },
  }),
};
const Brands = () => {
  return (
    <Container maxWidth="lg">
      <Box className="py-5 sm:py-14" > 
        <h2 className="text-[24px] sm:text-[28px] lg:text-[30px] font-medium mb-8 sm:mb-10 inline-block border-b-2 border-[#827B7B]">
          Explore Top Brands
        </h2>

        <Box className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {brandData.map((brand, index) => (
            <motion.div
              key={index}
              className="flex flex-col shadow-md items-center gap-2 sm:gap-5 md:gap-1 p-3 sm:p-5 md:p-3 lg:p-5 border border-[#E5E9EB] rounded-[15px] bg-white"
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              custom={index}
            >
              {/* Person Image with Hover Animation */}
              <Box className="!w-full h-[420px] sm:h-[350px] md:h-[230px] lg:h-[265px] overflow-hidden rounded-[15px]">
                <motion.img
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  src={brand.person}
                  alt={`${brand.name} - person`}
                  className="w-full h-full object-cover rounded-[15px]"
                />
              </Box>

              {/* Brand Logo */}
              <Box className="h-[60px] w-full flex items-center justify-center">
                <img
                  src={brand.logo}
                  alt={`${brand.name} - logo`}
                  className="max-h-[50px] max-w-[120px] object-contain"
                />
              </Box>
            </motion.div>
          ))}
        </Box>
      </Box>
    </Container>
  );
};

export default Brands;
