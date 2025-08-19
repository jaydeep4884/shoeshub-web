import React from "react";
import { Container } from "@mui/material";
import ronaldo from "../img/brands/ronaldo-brand.png";
import virat from "../img/brands/virat-brand.png";
import varun from "../img/brands/varun-brand.png";
import luffy from "../img/brands/luffy-brand.png";
import { motion } from "framer-motion";

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

const members = [
  {
    name: "Virat Kohli",
    role: "PUMA",
    image: virat,
  },
  {
    name: "Ronaldo CR7",
    role: "NIKE",
    image: ronaldo,
  },
  {
    name: "Varun Dhawan",
    role: "JORDAN",
    image: varun,
  },
  {
    name: "Luffy",
    role: "REBOOK",
    image: luffy,
  },
];

const Brands = () => {
  return (
    <Container maxWidth="lg">
      <div className="py-5 sm:py-14">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl">
            Explore Top Brands
          </h2>
          <p className="mt-4 text-base font-normal leading-7 text-gray-600 lg:text-lg lg:mt-6 lg:leading-8">
            AuraUI gives you the blocks & components you need to create a truly
            professional website, landing page, or admin panel for your SaaS.
          </p>
        </div>
      </div>

      <div className="relative grid px-5 w-full pt-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {members.map((member, index) => (
          <motion.div
            key={index}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            custom={index}
          >
            <div
              key={index}
              className={`relative overflow-hidden rounded-2xl group transform transition duration-300 ${
                index % 2 === 0 ? "-rotate-1" : "rotate-1"
              } hover:rotate-0`}
            >
              <img
                className="object-contain w-full h-auto transition-all duration-500 group-hover:scale-110"
                src={member.image}
                alt={member.name}
              />
              <div className="absolute bottom-0 left-0 w-full px-6 py-5">
                <p className="text-lg font-semibold text-white">
                  {member.name}
                </p>
                <p className="mt-1 text-sm font-normal text-gray-300">
                  {member.role}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </Container>
  );
};

export default Brands;
