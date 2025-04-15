import React, { useMemo, useState } from "react";
import countryList from "react-select-country-list";
import styled from "styled-components";
import {
  Box,
  Button,
  Container,
  FormControl,
  NativeSelect,
  Badge,
} from "@mui/material";
import { X } from "lucide-react";
import MenuIcon from "@mui/icons-material/Menu";

import brand from "../img/brand.png";
import search from "../img/icons/Search-icon.svg";
import likeIcon from "../img/icons/like-icon.svg";
import orderIcon from "../img/icons/order-icon.svg";
import cartIcon from "../img/icons/cart-icon.svg";
import locationIcon from "../img/icons/location-icon.svg";

const NAV_LINKS = ["Home", "Kids", "Men’s", "Women", "Couple"];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [country, setCountry] = useState("IN");
  const options = useMemo(() => countryList().getData(), []);

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
    <a key={link} href="/" className="hover:text-blue-600 py-1">
      {link}
    </a>
  ));

  return (
    <header className="w-full bg-white shadow-sm sticky top-0 z-50">
      <Container maxWidth>
        {/* Top Bar */}
        <Box className="flex items-stretch justify-between flex-wrap px-4 py-3 md:pt-4 md:pb-0 gap-4">
          {/* Left */}
          <Box className="flex items-center gap-4 flex-1">
            <img src={brand} alt="brand" className="w-[100px]" />
            <Button className="hidden md:flex !items-center !gap-2 !bg-[#4094F7] !text-white !px-4 !py-2 !rounded-md hover:!bg-[#357de1]">
              <MenuIcon fontSize="small" /> Categories
            </Button>
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
          <Box className="flex items-center  gap-5 text-sm text-gray-600">
            <Box className="hidden lg:flex gap-4">
              {[
                { icon: orderIcon, text: "Orders" },
                { icon: likeIcon, text: "Favorites" },
              ].map(({ icon, text }) => (
                <Box key={text} className="flex items-center gap-1">
                  <img src={icon} alt={text} /> {text}
                </Box>
              ))}
              <Box className="flex items-center gap-2">
                <Badge badgeContent={1} color="primary">
                  <img src={cartIcon} alt="cart" />
                </Badge>
                Cart
              </Box>
            </Box>
            <button className="hidden md:flex px-4 py-1 border rounded-md hover:bg-slate-200">
              Sign In
            </button>
            <button
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={24} /> : <MenuIcon size={24} />}
            </button>
          </Box>
        </Box>

        {/* Mobile Search */}
        <Box className="md:hidden px-4 pb-2">
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
      <Container maxWidth>
        <nav className="bg-white">
          {/* Desktop Nav */}
          <Box className="hidden md:flex justify-between items-center py-4 text-sm text-gray-600">
            {CountrySelector}
            <Box className="flex gap-x-16">{NavLinks}</Box>
            <p>Become a Seller</p>
          </Box>

          {/* Mobile Nav */}
          {mobileMenuOpen && (
            <Box className="md:hidden flex flex-col gap-3 px-4 text-sm text-gray-700">
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
              <Button className="!flex !items-center !gap-2 !bg-[#4094F7] !text-white !rounded-md hover:!bg-[#357de1]">
                <MenuIcon fontSize="small" /> Categories
              </Button>
              <button className="w-full border rounded-md py-1">Sign In</button>
            </Box>
          )}
        </nav>
      </Container>
    </header>
  );
}

// Custom Select with no underline
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
