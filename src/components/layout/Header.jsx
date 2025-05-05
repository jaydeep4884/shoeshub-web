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
import brand from "../img/logo/brand.png";
import search from "../img/icons/Search-icon.svg";
import likeIcon from "../img/icons/like-icon.svg";
import orderIcon from "../img/icons/order-icon.svg";
import cartIcon from "../img/icons/cart-icon.svg";
import locationIcon from "../img/icons/location-icon.svg";
import { Link } from "react-router";
import { AuthContext } from "../../assets/contexts";
import Select from "react-select";
import { countryOptions } from "../countries";

const NAV_LINKS = [
  {
    pageName: "Home",
    navLink: "/home",
  },
  {
    pageName: "Kids",
    navLink: "/kids",
  },
  {
    pageName: "Men's",
    navLink: "/men",
  },
  {
    pageName: "Women",
    navLink: "/women",
  },
  {
    pageName: "Couple",
    navLink: "/couple",
  },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const { isAuthenticated } = useContext(AuthContext);

  const handleChange = (option) => {
    setSelectedCountry(option);
  };

  const settings = [
    { name: "Profile", link: "/home" },
    { name: "Log Out", link: "/login" },
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
      <Select
        options={countryOptions}
        value={selectedCountry}
        onChange={handleChange}
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
          input: (base) => ({
            ...base,
            margin: 0,
            padding: 0,
          }),
          placeholder: (base) => ({
            ...base,
            color: "#888",
          }),
        }}
      />
    </Box>
  );

  const NavLinks = NAV_LINKS.map((nav) => (
    <Link
      key={nav.navLink}
      to={nav.navLink}
      className="hover:text-blue-600 py-1"
    >
      {nav.pageName}
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
                { icon: orderIcon, text: "Orders", link: "/orders" },
                { icon: likeIcon, text: "Favorites", link: "/fav" },
                { icon: cartIcon, text: "Cart", link: "/cart" },
              ].map(({ icon, text, link }) => (
                <Link to={link} key={link} className="flex items-center gap-1">
                  <img src={icon} alt={text} /> {text}
                </Link>
              ))}
              {/* <Box className="flex items-center gap-2">
                <Badge badgeContent={1} color="primary">
                  <img src={cartIcon} alt="cart" />
                </Badge>
                Cart
              </Box> */}
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
                    <MenuItem key={setting.name} onClick={handleCloseUserMenu}>
                      <Link to={setting.link}>
                        <Typography sx={{ textAlign: "center" }}>
                          {setting.name}
                        </Typography>
                      </Link>
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
