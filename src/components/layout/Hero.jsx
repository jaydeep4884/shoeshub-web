import { Box } from "@mui/material";
import React from "react";
import Slider from "react-slick";
import slide1 from "../img/slides/hero-banner-01.webp";
import slide2 from "../img/slides/hero-banner-02.webp";
import slide3 from "../img/slides/hero-banner-03.webp";
import slide4 from "../img/slides/hero-banner-04.webp";
import slide5 from "../img/slides/hero-banner-05.webp";
import respSlide1 from "../img/slides/resp-banner-01.webp";
import respSlide2 from "../img/slides/resp-banner-02.webp";
import respSlide3 from "../img/slides/resp-banner-03.webp";
import respSlide4 from "../img/slides/resp-banner-04.webp";
import respSlide5 from "../img/slides/resp-banner-05.webp";

function Hero() {
  const settings = {
    dots: false,
    infinite: true,
    fade: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 3000,
    cssEase: "linear",
    arrows: false,
  };

  return (
    <Box>
      {/* Desktop Slides - hidden on small screens */}
      <Box className="hidden sm:block w-full">
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

      {/* Responsive Slides - shown only on small screens */}
      <Box className="block sm:hidden w-full">
        <Slider {...settings}>
          {[respSlide1, respSlide2, respSlide3, respSlide4, respSlide5].map(
            (slide, index) => (
              <Box key={index}>
                <img
                  src={slide}
                  alt={`resp-slide-${index + 1}`}
                  className="w-full h-auto object-cover"
                />
              </Box>
            )
          )}
        </Slider>
      </Box>
    </Box>
  );
}

export default Hero;
