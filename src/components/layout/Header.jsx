import React, { useContext, useState, useEffect } from "react";
import {
  Box,
  Container,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router";
import Select from "react-select";
import { motion, AnimatePresence } from "framer-motion";
import { AuthContext } from "../../assets/contexts";
import { countryOptions } from "../countries";
import brand from "../img/logo/brand.png";
import search from "../img/icons/Search-icon.svg";
import likeIcon from "../img/icons/like-icon.svg";
import orderIcon from "../img/icons/order-icon.svg";
import cartIcon from "../img/icons/cart-icon.svg";
import locationIcon from "../img/icons/location-icon.svg";

const NAV_LINKS = [
  { pageName: "Home", navLink: "/home" },
  { pageName: "Kids", navLink: "/kids" },
  { pageName: "Men's", navLink: "/men" },
  { pageName: "Women", navLink: "/women" },
  { pageName: "Couple", navLink: "/couple" },
];

const PAGE_LINKS = [
  { pageName: "Orders", icon: orderIcon, pageLink: "/orders" },
  { pageName: "Favorite", icon: likeIcon, pageLink: "/fav" },
  { pageName: "Cart", icon: cartIcon, pageLink: "/cart" },
];

const settings = [
  { name: "Profile", link: "/profile" },
  { name: "Log Out", link: "/" },
];

const NavLinks = () =>
  NAV_LINKS.map(({ pageName, navLink }) => (
    <Link key={navLink} to={navLink} className="hover:text-blue-600 py-1">
      {pageName}
    </Link>
  ));

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

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const { isAuthenticated } = useContext(AuthContext);

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "auto";
  }, [mobileMenuOpen]);

  return (
    <header className="w-full bg-white shadow-sm sticky top-0 z-50">
      <Container maxWidth="lg">
        <Box className="flex !items-stretch justify-between flex-wrap py-3 md:pt-4 md:pb-0 gap-4">
          <Box className="flex !items-center gap-4 flex-1">
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

          <Box className="flex items-center gap-5 text-sm text-gray-600">
            <Box className="hidden lg:flex gap-4">
              <PageLinks />
            </Box>

            {isAuthenticated ? (
              <>
                <IconButton
                  onClick={(e) => setAnchorElUser(e.currentTarget)}
                  sx={{ p: 0 }}
                >
                  <Avatar
                    alt="User"
                    src="https://images.unsplash.com/photo-1740252117044-2af197eea287?q=80&w=2500&auto=format&fit=crop&ixlib=rb-4.0.3"
                  />
                </IconButton>
                <Menu
                  sx={{ mt: "45px" }}
                  anchorEl={anchorElUser}
                  open={Boolean(anchorElUser)}
                  onClose={() => setAnchorElUser(null)}
                  anchorOrigin={{ vertical: "top", horizontal: "right" }}
                  transformOrigin={{ vertical: "top", horizontal: "right" }}
                >
                  {settings.map(({ name, link }) => (
                    <MenuItem key={name} onClick={() => setAnchorElUser(null)}>
                      <Link to={link}>
                        <Typography textAlign="center">{name}</Typography>
                      </Link>
                    </MenuItem>
                  ))}
                </Menu>
              </>
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
                <CountrySelector
                  selected={selectedCountry}
                  onChange={setSelectedCountry}
                />
                <Link to="/">
                  <button className="w-full border rounded-md py-2 mt-2">
                    Sign In
                  </button>
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
