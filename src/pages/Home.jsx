import React from "react";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import Newsletter from "../components/layout/Newsletter";
import Review from "../components/layout/Review";
import Feature from "../components/layout/Feature";

function Home() {
  return (
    <>
      <Header />
      <Feature />
      <Review />
      <Newsletter />
      <Footer />
    </>
  );
}

export default Home;
