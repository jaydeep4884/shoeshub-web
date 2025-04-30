import React, { useContext, useMemo, useState, useEffect } from "react";
import countryList from "react-select-country-list";
import styled from "styled-components";
import {
  Box,
  Container,
  FormControl,
  NativeSelect,
  Badge,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import brand from "../img/logo/brand.png";
import search from "../img/icons/Search-icon.svg";
import likeIcon from "../img/icons/like-icon.svg";
import orderIcon from "../img/icons/order-icon.svg";
import cartIcon from "../img/icons/cart-icon.svg";
import locationIcon from "../img/icons/location-icon.svg";
import { Link } from "react-router";
import { AuthContext } from "../../assets/contexts";

const NAV_LINKS = ["Home", "Kids", "Men’s", "Women", "Couple"];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [country, setCountry] = useState("IN");
  const [anchorElUser, setAnchorElUser] = useState(null);
  const { isAuthenticated, logout } = useContext(AuthContext);

  const options = useMemo(() => {
    try {
      const data = countryList().getData();
      return Array.isArray(data) ? data : [];
    } catch (error) {
      console.error("Error loading country list:", error);
      return [];
    }
  }, []);

  const settings = [
    { name: "Profile", link: "/" },
    {
      name: "Log Out",
      action: () => {
        logout();
      },
    },
  ];

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "auto";
  }, [mobileMenuOpen]);

  const CountrySelector = (
    <Box className="flex items-center gap-2">
      <img src={locationIcon} alt="location" />
      <FormControl fullWidth>
        <CustomNativeSelect
          value={country}
          onChange={(e) => setCountry(e.target.value)}
        >
          {options.map(({ value, label }) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </CustomNativeSelect>
      </FormControl>
    </Box>
  );

  const NavLinks = NAV_LINKS.map((link) => (
    <Link key={link} to="/" className="hover:text-blue-600 py-1">
      {link}
    </Link>
  ));

  return (
    <header className="w-full bg-white shadow-sm sticky top-0 z-50">
      <Container maxWidth="lg">
        {/* Top Bar */}
        <Box className="flex !items-stretch justify-between flex-wrap py-3 md:pt-4 md:pb-0 gap-4">
          {/* Left */}
          <Box className="flex !items-center gap-4 flex-1">
            <img src={brand} alt="brand" className="w-[100px]" />
            <Box className="hidden md:flex flex-1 items-center border rounded-md px-3 py-2">
              <input
                type="text"
                placeholder="Search Shoes..."
                className="flex-1 text-sm outline-none"
              />
              <img src={search} alt="search" />
            </Box>
          </Box>

          {/* Right */}
          <Box className="flex items-center gap-5 text-sm text-gray-600">
            <Box className="hidden lg:flex gap-4">
              {[
                { icon: orderIcon, text: "Orders", link: "/" },
                { icon: likeIcon, text: "Favorites", link: "/" },
              ].map(({ icon, text, link }) => (
                <Box key={text}>
                  <Link className="flex items-center gap-1" to={link}>
                    <img src={icon} alt={text} /> {text}
                  </Link>
                </Box>
              ))}
              <Box className="flex items-center gap-2">
                <Badge badgeContent={1} color="primary">
                  <Link to="/cart">
                    <img src={cartIcon} alt="cart" />
                  </Link>
                </Badge>
                Cart
              </Box>
            </Box>

            {isAuthenticated ? (
              <Box>
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar
                    alt="User"
                    src="https://images.unsplash.com/photo-1740252117044-2af197eea287?q=80&w=2500&auto=format&fit=crop&ixlib=rb-4.0.3"
                  />
                </IconButton>
                <Menu
                  sx={{ mt: "45px" }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{ vertical: "top", horizontal: "right" }}
                  keepMounted
                  transformOrigin={{ vertical: "top", horizontal: "right" }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  {settings.map((setting) => (
                    <MenuItem
                      key={setting.name}
                      onClick={() => {
                        handleCloseUserMenu();
                        if (setting.action) setting.action();
                      }}
                    >
                      <Typography sx={{ textAlign: "center" }}>
                        {setting.name}
                      </Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
            ) : (
              <Link to="/login">
                <button className="hidden md:flex px-4 py-2 border rounded-md hover:bg-slate-200">
                  Sign In
                </button>
              </Link>
            )}

            {/* Mobile Menu Toggle */}
            <button
              className="md:hidden transition-all duration-300"
              onClick={() => setMobileMenuOpen(true)}
            >
              <MenuIcon fontSize="small" />
            </button>
          </Box>
        </Box>

        {/* Mobile Search */}
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

      {/* Navigation Section */}
      <Container maxWidth="lg">
        <nav className="bg-white">
          {/* Desktop Nav */}
          <Box className="hidden md:flex justify-between items-center py-4 text-sm text-gray-600">
            {CountrySelector}
            <Box className="flex gap-x-16">{NavLinks}</Box>
          </Box>
        </nav>
      </Container>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <>
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={() => setMobileMenuOpen(false)}
          ></div>

          {/* Slide Down Drawer */}
          <Box
            className="fixed top-0 left-0 right-0 bg-white z-50 flex flex-col gap-5 p-6 animate-slideDown"
            sx={{
              animation: "slideDown 0.3s ease forwards",
            }}
          >
            {/* Close Button inside drawer (optional) */}
            {/* You can add an X button inside if you want */}
            <Box className="flex justify-end">
              <button
                className="text-gray-700 text-2xl"
                onClick={() => setMobileMenuOpen(false)}
              >
                ✕
              </button>
            </Box>

            {/* Drawer Contents */}
            <div className="flex flex-col gap-4">
              {NavLinks}
              <Box className="flex gap-2 items-center">
                <img src={orderIcon} alt="order" /> Orders
              </Box>
              <Box className="flex gap-2 items-center">
                <img src={likeIcon} alt="like" /> Favorites
              </Box>
              <Box className="flex gap-2 items-center">
                <img src={cartIcon} alt="cart" /> Cart
              </Box>
              {CountrySelector}
              <p className="text-gray-600">Become a Seller</p>
              <Link to="/login">
                <button className="w-full border rounded-md py-2 mt-2">
                  Sign In
                </button>
              </Link>
            </div>
          </Box>
        </>
      )}
    </header>
  );
}

// Custom Select (styled)
const CustomNativeSelect = styled((props) => (
  <NativeSelect {...props} disableUnderline IconComponent={() => null} />
))`
  background: none;
  border: none;
  padding-right: 8px;

  select {
    appearance: none;
    border: none;
    outline: none;
    background: none;
  }

  &:before,
  &:after {
    display: none !important;
  }
`;
