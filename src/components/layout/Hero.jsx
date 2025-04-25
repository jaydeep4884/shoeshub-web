import { Box } from "@mui/material";
import React from "react";
import Slider from "react-slick";
import slide1 from "../img/slides/hero-slide-01.png";
import slide2 from "../img/slides/hero-slide-02.png";
import slide3 from "../img/slides/hero-slide-03.png";
import slide4 from "../img/slides/hero-slide-04.png";
import slide5 from "../img/slides/hero-slide-05.png";

function Hero() {
  const settings = {
    dots: false,
    infinite: true,
    fade: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 2000,
    cssEase: "linear",
    arrows: false,
  };

  return (
    <Box>
      <Box className="w-full">
        <Slider {...settings}>
          {[slide1, slide2, slide3, slide4, slide5].map((slide, index) => (
            <Box key={index}>
              <img
                src={slide}
                alt={`slide-${index + 1}`}
                className="w-full h-auto object-cover"
              />
            </Box>
          ))}
        </Slider>
      </Box>
    </Box>
  );
}

export default Hero;
