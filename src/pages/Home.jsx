import React from "react";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import Newsletter from "../components/layout/Newsletter";
import Review from "../components/layout/Review";
import Feature from "../components/layout/Feature";
import Brands from "../components/layout/Brands";
import Gift from "../components/layout/Gift";
import Banner from "../components/layout/Banner";
import Bestshoes from "../components/layout/Bestshoes";
import HeroSection from "../components/layout/Hero";
import heroVideo from "../components/img/Banners/hero-video.mp4";

function Home() {
  return (
    <>
      <Header />
      <HeroSection
        videoSrc={heroVideo}
        heading=" Step Up. Stand Out."
        subHeading=" Exclusive Kicks for Every Vibe."
        subtitle="Discover our latest arrivals and timeless classics, all in one place."
      />
      <Bestshoes />
      <Banner />
      <Bestshoes />
      <Feature />
      <Brands />
      <Review />
      <Gift />
      <Newsletter />
      <Footer />
    </>
  );
}

export default Home;
