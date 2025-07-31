import React, { useContext, useState, useEffect } from "react";
import { Box, Container } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router";
import Select from "react-select";
import { motion, AnimatePresence } from "framer-motion";
import { token } from "../../assets/contexts";
import CallIcon from "@mui/icons-material/Call";
import { countryOptions } from "../ui/countries";
import brand from "../img/logo/brand.png";
import search from "../img/icons/Search-icon.svg";
import likeIcon from "../img/icons/like-icon.svg";
import orderIcon from "../img/icons/order-icon.svg";
import cartIcon from "../img/icons/cart-icon.svg";
import locationIcon from "../img/icons/location-icon.svg";
import axios from "axios";
import UserMenu from "../ui/UserMenu";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [data, setData] = useState([]);
  const Token = useContext(token);
  const isAuthenticated = localStorage.getItem("token") ? true : false;

  const fetchCategories = async () => {
    try {
      const res = await axios.get(
        "https://generateapi.onrender.com/api/category",
        {
          headers: { Authorization: Token },
        }
      );
      const categories = Array.isArray(res.data.Data) ? res.data.Data : [];
      setData(categories);
      localStorage.setItem("categories", JSON.stringify(categories));
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const NavLinks = () =>
    data.map((category) => (
      <Link
        key={category._id || category.cat_name}
        to={`/${category.cat_name.toLowerCase()}`}
        className="hover:text-blue-600 py-1"
      >
        {category.cat_name}
      </Link>
    ));

  const PAGE_LINKS = [
    { pageName: "Orders", icon: orderIcon, pageLink: "/orders" },
    { pageName: "Favorite", icon: likeIcon, pageLink: "/fav" },
    { pageName: "Cart", icon: cartIcon, pageLink: "/cart" },
  ];

  const PageLinks = () =>
    PAGE_LINKS.map(({ pageName, icon, pageLink }) => (
      <Link to={pageLink} key={pageLink} className="flex items-center gap-1">
        <img src={icon} alt={pageName} /> {pageName}
      </Link>
    ));

  const CountrySelector = ({ selected, onChange }) => (
    <Box className="flex items-center gap-2">
      <img src={locationIcon} alt="location" />
      <Select
        options={countryOptions}
        value={selected}
        onChange={onChange}
        placeholder="Select a country"
        className="text-black !border-none"
        styles={{
          control: (base) => ({
            ...base,
            border: "none",
            boxShadow: "none",
            backgroundColor: "transparent",
            cursor: "pointer",
          }),
          input: (base) => ({ ...base, margin: 0, padding: 0 }),
          placeholder: (base) => ({ ...base, color: "#888" }),
        }}
      />
    </Box>
  );

  useEffect(() => {
    const cached = localStorage.getItem("categories");
    if (cached) {
      setData(JSON.parse(cached));
    }
    fetchCategories();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "auto";
  }, [mobileMenuOpen]);

  return (
    <header className="w-full bg-white shadow-sm sticky top-0 z-50">
      <Container maxWidth="lg">
        <Box className="flex items-stretch justify-between flex-wrap py-3 md:pt-4 md:pb-0 gap-4">
          <Box className="flex items-center gap-4 flex-1">
            <Link to="/home">
              <img src={brand} alt="brand" className="w-[100px]" />
            </Link>
            <Box className="hidden md:flex flex-1 items-center border rounded-md px-3 py-2">
              <input
                type="text"
                placeholder="Search Shoes..."
                className="flex-1 text-sm outline-none"
              />
              <img src={search} alt="search" />
            </Box>
          </Box>

          {/* Page Link : Order,Favorite,Cart  */}
          <Box className="flex items-center gap-5 text-sm text-gray-600">
            <Box className="hidden lg:flex gap-4 items-center">
              <PageLinks />
              <Link to={"/contact"} className="flex items-center gap-1">
                <CallIcon style={{ fontSize: "18px", color: "#B1BABF" }} />{" "}
                Contact
              </Link>
            </Box>

            {/* UserMenu  */}
            {isAuthenticated ? (
              <UserMenu />
            ) : (
              <Link to="/">
                <button className="hidden md:flex px-4 py-2 border rounded-md hover:bg-slate-200">
                  Sign In
                </button>
              </Link>
            )}

            <button
              className="md:hidden transition-all duration-300"
              onClick={() => setMobileMenuOpen(true)}
            >
              <MenuIcon fontSize="small" />
            </button>
          </Box>
        </Box>

        {/* Mobile View Seach Bar  */}
        <Box className="md:hidden pb-2">
          <Box className="flex items-center border rounded-md px-3 py-2">
            <input
              type="text"
              placeholder="Search Shoes..."
              className="flex-1 text-sm outline-none"
            />
            <img src={search} alt="search" />
          </Box>
        </Box>
      </Container>

      {/* Country Selection  */}
      <Container maxWidth="lg">
        <nav className="bg-white">
          <Box className="hidden md:flex justify-between items-center py-4 text-sm text-gray-600">
            <CountrySelector
              selected={selectedCountry}
              onChange={setSelectedCountry}
            />
            <Box className="flex gap-x-16">
              <NavLinks />
            </Box>
          </Box>
        </nav>
      </Container>

      {/* Mobile View  */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              className="fixed inset-0 bg-black bg-opacity-50 z-40"
              onClick={() => setMobileMenuOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            />
            <motion.div
              className="fixed top-0 left-0 right-0 bg-white z-50 flex flex-col gap-5 p-6"
              initial={{ y: "-100%" }}
              animate={{ y: 0 }}
              exit={{ y: "-100%" }}
              transition={{ type: "spring", stiffness: 100, damping: 20 }}
            >
              <Box className="flex justify-end">
                <button
                  className="text-gray-700 text-2xl"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  ✕
                </button>
              </Box>
              <div className="flex flex-col gap-4">
                <NavLinks />
                <PageLinks />
                <Link to={"/contact"} className="flex items-center gap-2">
                  <CallIcon style={{ fontSize: "18px", color: "#B1BABF" }} />{" "}
                  Contact
                </Link>
                <CountrySelector
                  selected={selectedCountry}
                  onChange={setSelectedCountry}
                />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
