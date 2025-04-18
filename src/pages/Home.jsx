import React from "react";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import Newsletter from "../components/layout/Newsletter";
import Review from "../components/layout/Review";
import Feature from "../components/layout/Feature";
import Brands from "../components/layout/Brands";
import Gift from "../components/layout/Gift";
import Hero from "../components/layout/Hero";
import Banner from "../components/layout/Banner";

function Home() {
  return (
    <>
      <Header />
      <Hero />
      <Banner />
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
