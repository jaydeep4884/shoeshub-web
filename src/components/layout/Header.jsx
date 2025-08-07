import React, { useContext, useEffect, useState } from "react";
import { Box, Container } from "@mui/material";
import { Link } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import { Close, Call as CallIcon, Menu as MenuIcon } from "@mui/icons-material";
import { Typography } from "antd";
import axios from "axios";
import { token } from "../../assets/contexts";
import UserMenu from "../ui/UserMenu";
import brand from "../img/logo/brand.png";
import search from "../img/icons/Search-icon.svg";
import orderIcon from "../img/icons/order-icon.svg";
import likeIcon from "../img/icons/like-icon.svg";
import cartIcon from "../img/icons/cart-icon.svg";
import heroVedio from "../img/Banners/hero-video.mp4";

const fadeIn = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6 },
  }),
};

const PAGE_LINKS = [
  { name: "Orders", icon: orderIcon, to: "/orders" },
  { name: "Favorite", icon: likeIcon, to: "/fav" },
  { name: "Cart", icon: cartIcon, to: "/cart" },
];

const Header = () => {
  const [data, setData] = useState([]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const Token = useContext(token);
  const isAuthenticated = Boolean(localStorage.getItem("token"));

  useEffect(() => {
    const cached = localStorage.getItem("categories");
    if (cached) setData(JSON.parse(cached));
    axios
      .get("https://generateapi.onrender.com/api/category", {
        headers: { Authorization: Token },
      })
      .then((res) => {
        const categories = Array.isArray(res.data.Data) ? res.data.Data : [];
        setData(categories);
        localStorage.setItem("categories", JSON.stringify(categories));
      })
      .catch(console.error);
  }, [Token]);

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "auto";
  }, [mobileMenuOpen]);

  const NavLink = ({ to, children }) => (
    <Link
      to={to}
      className="relative transition-all duration-300 text-white hover:text-white after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-gradient-to-r after:from-white after:to-purple-600 after:transition-all after:duration-300 hover:after:w-full py-1"
    >
      {children}
    </Link>
  );

  const NavLinks = () =>
    data.map((c) => (
      <NavLink key={c._id || c.cat_name} to={`/${c.cat_name.toLowerCase()}`}>
        {c.cat_name}
      </NavLink>
    ));

  const PageLinks = () =>
    PAGE_LINKS.map(({ name, icon, to }) => (
      <NavLink key={to} to={to}>
        <Box className="flex items-center gap-1">
          <img src={icon} alt={name} />
          <Typography>{name}</Typography>
        </Box>
      </NavLink>
    ));

  return (
    <div className="relative w-full h-screen overflow-hidden">
      <video
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
        autoPlay
        loop
        muted
        playsInline
      >
        <source src={heroVedio} type="video/mp4" />
      </video>

      <div className="absolute inset-0 bg-black/30 z-0" />

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
            Step Up. Stand Out. <br />
            <span className="bg-gradient-to-r from-[#FF6FD8] to-[#3813C2] text-transparent bg-clip-text">
              Exclusive Kicks for Every Vibe.
            </span>
          </motion.h1>
          <motion.p
            className="mt-6 text-base sm:text-lg max-w-xl mx-auto text-gray-300"
            variants={fadeIn}
            custom={1}
          >
            Use Clarity and AuraUI to build professional-grade UI experiences in
            minutes, not weeks.
          </motion.p>
        </motion.div>
      </div>

      <header className="fixed top-2 left-2 right-2 md:top-5 md:left-5 md:right-5 rounded-full z-10 bg-black/30 backdrop-blur-sm shadow-md">
        <Container maxWidth="lg">
          <Box className="flex justify-between flex-wrap items-stretch py-3 md:pt-4 md:pb-0 gap-4">
            <Box className="flex items-center gap-4 flex-1">
              <Link to="/home">
                <img src={brand} alt="brand" className="w-[100px]" />
              </Link>
              <Box className="hidden md:flex flex-1 items-center border border-[#928e8e] rounded-md px-3 py-2">
                <input
                  type="text"
                  placeholder="Search Shoes..."
                  className="flex-1 text-sm outline-none bg-transparent text-white placeholder-white"
                />
                <img src={search} alt="search" />
              </Box>
            </Box>

            <Box className="flex items-center gap-5 text-sm text-white">
              <Box className="hidden lg:flex gap-4 items-center">
                <PageLinks />
                <NavLink to="/contact">
                  <CallIcon style={{ fontSize: 18, color: "#B1BABF" }} />{" "}
                  Contact
                </NavLink>
              </Box>
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
                onClick={() => setMobileMenuOpen(true)}
                className="md:hidden text-white p-2 rounded-md hover:bg-white/10"
              >
                {mobileMenuOpen ? (
                  <Close className="h-6 w-6" />
                ) : (
                  <MenuIcon className="h-6 w-6" />
                )}
              </button>
            </Box>
          </Box>
        </Container>

        <Container maxWidth="lg">
          <nav className="bg-transparent hidden md:flex justify-center items-center font-medium py-4 text-sm text-white">
            <Box className="flex gap-x-16">
              <NavLinks />
            </Box>
          </nav>
        </Container>

        <AnimatePresence>
          {mobileMenuOpen && (
            <>
              <motion.div
                className="fixed inset-0 bg-black/50 z-40"
                onClick={() => setMobileMenuOpen(false)}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
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
                  <NavLink to="/contact">
                    <CallIcon style={{ fontSize: 18, color: "#B1BABF" }} />{" "}
                    Contact
                  </NavLink>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </header>
    </div>
  );
};

export default Header;
