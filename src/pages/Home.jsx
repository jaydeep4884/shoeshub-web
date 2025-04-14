import React, { useState } from "react";
import { Menu, X, Search, Package, Heart, ShoppingCart } from "lucide-react";
import brand from "../img/brand.png";
import MenuIcon from "@mui/icons-material/Menu";
import { Box, Button, Container } from "@mui/material";
import search from "../img/icons/Search-icon.svg";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="w-full bg-white shadow-md sticky top-0 z-50">
      <Container maxWidth>
        <Box className="flex items-stretch justify-between flex-wrap px-4 py-3 md:py-4 gap-4">
          {/* Left - Logo + Categories + Search */}
          <Box className="flex items-center gap-4 flex-1">
            <img src={brand} alt="brand" className="w-[100px]" />

            <Button className="!flex !items-center !gap-2 !bg-[#4094F7] !text-white !px-4 !py-2 !rounded-md hover:!bg-[#357de1]">
              <MenuIcon fontSize="small" />
              Categories
            </Button>

            <Box className="hidden md:flex items-center flex-1 border rounded-md px-3 py-2">
              <input
                type="text"
                placeholder="Search Shoes..."
                className="flex-1 text-sm outline-none"
              />
              <img src={search} alt="search" className="w-4 h-4" />
            </Box>
          </Box>

          {/* Right - Icons + Signin + Menu */}
          <Box className="flex items-center gap-5 text-sm text-gray-600">
            <Box className="hidden lg:flex gap-4">
              <Box className="flex items-center gap-1">
                <Package size={16} />
                Orders
              </Box>
              <Box className="flex items-center gap-1">
                <Heart size={16} />
                Favorites
              </Box>
              <Box className="relative flex items-center gap-1">
                <ShoppingCart size={16} />
                Cart
                <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs px-1 rounded-full">
                  3
                </span>
              </Box>
            </Box>

            <Box className="hidden md:flex">
              <button className="px-4 py-1 border rounded-md">Sign In</button>
            </Box>

            {/* Mobile Menu Toggle */}
            <button
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </Box>
        </Box>
      </Container>

      {/* Mobile Search */}
      <Box className="md:hidden px-4 pb-2">
        <Box className="flex items-center border rounded-md px-3 py-2">
          <input
            type="text"
            placeholder="Search Shoes..."
            className="flex-1 text-sm outline-none"
          />
          <Search size={16} className="text-gray-500" />
        </Box>
      </Box>

      {/* Navigation Links */}
      <nav className="bg-white border-t md:border-none">
        <Box className="hidden md:flex justify-center gap-8 py-3 text-sm font-medium text-gray-700">
          {["Kids", "Men’s", "Women", "Couple"].map((link) => (
            <a key={link} href="/" className="hover:text-blue-600">
              {link}
            </a>
          ))}
        </Box>

        {/* Mobile Dropdown */}
        {mobileMenuOpen && (
          <Box className="flex flex-col md:hidden px-4 py-3 gap-2 border-t bg-white text-gray-700 text-sm">
            {["Kids", "Men’s", "Women", "Couple"].map((link) => (
              <a key={link} href="/">
                {link}
              </a>
            ))}
            <Box className="flex items-center gap-2 mt-2">
              <Package size={16} /> Orders
            </Box>
            <Box className="flex items-center gap-2">
              <Heart size={16} /> Favorites
            </Box>
            <Box className="flex items-center gap-2">
              <ShoppingCart size={16} />
              Cart
              <span className="ml-auto bg-red-500 text-white text-xs rounded-full px-1">
                3
              </span>
            </Box>
            <button className="w-full border rounded-md py-1 mt-2">
              Sign In
            </button>
            <button className="w-full border rounded-md py-1">Sign Up</button>
          </Box>
        )}
      </nav>
    </header>
  );
}
