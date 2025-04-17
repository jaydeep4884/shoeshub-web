import { Box, Container } from "@mui/material";
import React from "react";
import featureIcon1 from "../img/icons/feature-icon-01.svg";
import featureIcon2 from "../img/icons/feature-icon-02.svg";
import featureIcon3 from "../img/icons/feature-icon-03.svg";
import featureIcon4 from "../img/icons/feature-icon-04.svg";

function Feature() {
  const FeatureData = [
    {
      icon: featureIcon1,
      featureName: "Original Products",
      desc: "We provide money back  if the product are not original.",
    },
    {
      icon: featureIcon2,
      featureName: "Satisfaction Guarantee",
      desc: "Exchange the product you’ve purchased if doesn’t fit on you.",
    },
    {
      icon: featureIcon3,
      featureName: "New Arrival Everyday",
      desc: "We updates our collection almost everyday.",
    },
    {
      icon: featureIcon4,
      featureName: "Fast & Free Shipping",
      desc: "We offer fast and free shipping for our loyal customers.",
    },
  ];

  return (
    <Container maxWidth="lg">
      <Box className="py-10 sm:py-14">
        {/* Updated Heading */}
        <Box className="flex flex-col lg:flex-row items-start gap-2  lg:gap-10 lg:justify-between mb-10 lg:mb-16">
          <h1 className="text-2xl sm:text-3xl font-medium lg:w-[40%]">
            We provide best customer experiences
          </h1>
          <p className="text-gray-500 text-sm font-medium tracking-[4%] border-l-0 lg:border-l-[2px] lg:pl-7 lg:py-5 border-black">
            We ensure our customers have the best shopping experience
          </p>
        </Box>

        {/* Feature Content */}
        <Box className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {FeatureData.map((data, i) => (
            <Box key={i} className="flex flex-col items-start">
              <img
                src={data.icon}
                className="h-10 w-[35px] object-contain"
                alt="Feature Icon"
              />
              <h3 className="text-base md:text-lg my-2 lg:my-3 font-medium tracking-[4%]">
                {data.featureName}
              </h3>
              <p className="text-sm font-medium text-gray-500 tracking-[4%]">
                {data.desc}
              </p>
            </Box>
          ))}
        </Box>
      </Box>
    </Container>
  );
}

export default Feature;
