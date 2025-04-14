import React, { useState } from "react";
import { Menu, X, Search, Package, Heart, ShoppingCart } from "lucide-react";
import brand from "../img/brand.png";
import MenuIcon from "@mui/icons-material/Menu";
import { Box, Button } from "@mui/material";
import search from "../img/icons/Search-icon.svg";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="w-full bg-white shadow-md sticky top-0 z-50">
      <Box className="flex items-center gap-x-5 px-4 py-3 md:py-4  mx-auto">
        <Box className="flex items-center gap-3 w-3/5">
          {/* brand  */}
          <Box className="">
            <img src={brand} alt="brand" />
          </Box>

          {/* category button  */}
          <Button className="!flex !justify-center !items-center !gap-x-2 !rounded-md !capitalize !bg-[#4094F7] !px-5 !py-2 !text-white hover:!bg-[#357de1]">
            <span>
              <MenuIcon />
            </span>
            Category
          </Button>

          {/* search */}
          <Box className="hidden md:flex flex-1">
            <Box className="flex items-center w-full border focus:border-black rounded-md px-4 py-2">
              <input
                type="text"
                placeholder="Search Shoes..."
                className="flex-1 outline-none pr-3 text-sm"
              />
              <img src={search} alt="" />
            </Box>
          </Box>
        </Box>

        {/* Right actions */}
        <Box className="flex items-center gap-3 w-2/5 text-sm">
          <Box className="hidden lg:flex items-center gap-2 text-gray-600">
            <Package className="w-4 h-4" />
            Orders
          </Box>
          <Box className="hidden lg:flex items-center gap-2 text-gray-600">
            <Heart className="w-4 h-4" />
            Favorites
          </Box>
          <Box className="relative hidden lg:flex items-center gap-1 text-gray-600">
            <ShoppingCart className="w-4 h-4" />
            <span>Cart</span>
            <span className="absolute top-[-6px] right-[-10px] bg-red-500 text-white text-xs rounded-full px-1">
              3
            </span>
          </Box>
          <button className="hidden md:block px-3 py-1 border rounded-md">
            Sign In
          </button>
          <button className="hidden md:block px-3 py-1 border rounded-md">
            Sign Up
          </button>

          {/* Mobile toggle */}
          <button
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </Box>
      </Box>

      {/* Search bar on mobile */}
      <Box className="md:hidden px-4 pb-2">
        <Box className="flex items-center w-full border rounded-md px-3 py-1">
          <input
            type="text"
            placeholder="Search Shoes..."
            className="flex-1 outline-none px-2 py-1 text-sm"
          />
          <Search className="w-4 h-4 text-gray-500" />
        </Box>
      </Box>

      {/* Main nav links */}
      <nav className="bg-white border-t md:border-none">
        <Box className="hidden md:flex justify-center gap-8 py-3 text-sm font-medium text-gray-700">
          <a href="/" className="hover:text-blue-600">
            Kids
          </a>
          <a href="/" className="hover:text-blue-600">
            Men’s
          </a>
          <a href="/" className="hover:text-blue-600">
            Women
          </a>
          <a href="/" className="hover:text-blue-600">
            Couple
          </a>
        </Box>

        {/* Mobile dropdown nav */}
        {mobileMenuOpen && (
          <Box className="flex flex-col md:hidden px-4 py-2 gap-2 bg-white border-t">
            <a href="/" className="text-gray-700">
              Kids
            </a>
            <a href="/" className="text-gray-700">
              Men’s
            </a>
            <a href="/" className="text-gray-700">
              Women
            </a>
            <a href="/" className="text-gray-700">
              Couple
            </a>
            <Box className="flex items-center gap-2 text-gray-600 mt-2">
              <Package className="w-4 h-4" />
              Orders
            </Box>
            <Box className="flex items-center gap-2 text-gray-600">
              <Heart className="w-4 h-4" />
              Favorites
            </Box>
            <Box className="flex items-center gap-2 text-gray-600">
              <ShoppingCart className="w-4 h-4" />
              Cart{" "}
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
