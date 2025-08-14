import React, { useContext, useEffect, useState } from "react";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import Feature from "../components/layout/Feature";
import Review from "../components/layout/Review";
import Newsletter from "../components/layout/Newsletter";
import { token } from "../assets/contexts";
import WomenVideo from "../components/img/Banners/women-video.mp4";
import axios from "axios";
import { Rate } from "antd";
import { Link } from "react-router";
import ProductSkeleton from "../components/ui/ProductSkeleton";
import LikeButton from "../components/ui/LikeButton";
import HeroSection from "../components/layout/Hero";
import BgBody from "../components/ui/BgBody";

function Couple() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const Token = useContext(token);

  const fetchWomenProducts = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        "https://generateapi.onrender.com/api/Product-Detail",
        {
          headers: { Authorization: Token },
        }
      );
      const allProducts = Array.isArray(res.data.Data) ? res.data.Data : [];
      const WomenProducts = allProducts.filter(
        (product) => product.cat_name?.cat_name.toLowerCase() === "women"
      );
      setProducts(WomenProducts);
    } catch (err) {
      console.error("Failed to fetch products:", err);
    }
    setLoading(false);
  };
  useEffect(() => {
    fetchWomenProducts();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <Header />
      <HeroSection
        videoSrc={WomenVideo}
        heading="Chic, Bold & Timeless"
        subHeading="Kicks to Match Your Vibe."
        subtitle="Elevate every outfit with our versatile women’s collection."
      />
      <BgBody>
        <h2 className="text-xl font-medium mb-4">Women Shoes : </h2>

        {loading ? (
          <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
            <ProductSkeleton />
          </div>
        ) : products.length === 0 ? (
          <p>No Women Shoes Found</p>
        ) : (
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <Link to={`/product/${product._id}`} key={product._id}>
                <div
                  key={product._id}
                  className="bg-white py-1 px-4 rounded-xl shadow hover:shadow-lg transition"
                >
                  <LikeButton pid={product._id} toggle={product} />
                  <img
                    src={product.images[0]}
                    alt={product.pro_name}
                    className="w-full h-48 object-cover mb-3 rounded"
                  />
                  <h3 className="font-medium text-lg line-clamp-1">
                    {product.pro_name}
                  </h3>
                  <p className="mt-1 mb-1 font-semibold ">
                    MRP : ₹ {product.new_price}.00{" "}
                    <span className="line-through text-sm text-gray-400">
                      {" "}
                      ₹{product.old_price}
                    </span>
                  </p>
                  <div className="flex justify-between gap-2 items-center ">
                    <Rate
                      allowHalf
                      disabled
                      style={{ fontSize: "14px" }}
                      defaultValue={product.pro_rating}
                    />
                    <p className="text-sm text-gray-400">
                      {product.review} Reviews
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        <Feature />
        <Review />
        <Newsletter />
      </BgBody>
      <Footer />
    </>
  );
}

export default Couple;
