import React, { useContext, useEffect, useState } from "react";
import { Container } from "@mui/material";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import PageBanner from "../components/ui/PageBanner";
import MensBanner from "../components/img/Banners/mens-banner.png";
import { motion } from "framer-motion";
import { token } from "../assets/contexts";
import axios from "axios";
import Loader from "../components/ui/Loader";

function Mens() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const Token = useContext(token);

  const fetchMensProducts = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        "https://generateapi.onrender.com/api/Product-Detail",
        {
          headers: { Authorization: Token },
        }
      );
      const allProducts = Array.isArray(res.data.Data) ? res.data.Data : [];
      const mensProducts = allProducts.filter(
        (product) => product.cat_name?.cat_name.toLowerCase() === "men"
      );
      console.log(mensProducts);

      setProducts(mensProducts);
    } catch (err) {
      console.error("Failed to fetch products:", err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchMensProducts();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <Header />
      <PageBanner path={MensBanner} />
      <Container maxWidth="lg">
        <div className="py-8 sm:py-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-xl font-semibold mb-4">Men's Shoes</h2>

            {loading ? (
              <Loader />
            ) : products.length === 0 ? (
              <p>No Men's Shoes Found</p>
            ) : (
              <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {products.map((product) => (
                  <div
                    key={product._id}
                    className="border p-4 rounded shadow hover:shadow-lg transition"
                  >
                    <img
                      src={product.images[0]}
                      alt={product.pro_name}
                      className="w-full h-48 object-cover mb-3 rounded"
                    />
                    <h3 className="font-semibold text-lg">{product.name}</h3>
                    <p className="text-sm text-gray-600">
                      {product.description}
                    </p>
                    <p className="mt-1 font-bold text-blue-600">
                      ${product.price}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </Container>
      <Footer />
    </>
  );
}

export default Mens;
