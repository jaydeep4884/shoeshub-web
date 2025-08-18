import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";

function HeroSection({ videoSrc, heading, subHeading, subtitle }) {
  const videoRef = useRef(null);

  useEffect(() => {
    videoRef.current?.play();
  }, [videoSrc]); // play whenever video changes

  const fadeIn = {
    hidden: { opacity: 0, y: 30 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1, duration: 0.6 },
    }),
  };

  return (
    <div className="relative w-full h-screen overflow-hidden">
      <video
        ref={videoRef}
        className="absolute top-0 left-0 w-full h-full object-cover z-0 pointer-events-none"
        autoPlay
        preload="none"
        loop
        muted
        playsInline
      >
        <source src={videoSrc} type="video/mp4" />
      </video>

      <div className="absolute inset-0 bg-black/30 z-0 pointer-events-none" />

      <div className="absolute inset-0 z-10 flex items-center justify-center text-center text-white px-4">
        <motion.div
          className="max-w-4xl mx-auto px-4"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.h1
            className="text-4xl sm:text-5xl lg:text-6xl font-bold"
            variants={fadeIn}
            custom={0}
          >
            {heading} <br />
            <span className="bg-gradient-to-r from-[#eddae8] to-[#ff3bca] text-transparent bg-clip-text">
              {subHeading}
            </span>
          </motion.h1>
          <motion.p
            className="mt-6 text-base sm:text-lg max-w-xl mx-auto text-gray-300"
            variants={fadeIn}
            custom={1}
          >
            {subtitle}
          </motion.p>
        </motion.div>
      </div>
    </div>
  );
}

export default HeroSection;
