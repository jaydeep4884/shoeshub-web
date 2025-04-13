import React, { useState } from "react";
import {
  Menu,
  X,
  Search,
  Package,
  Heart,
  ShoppingCart,
  MapPin,
} from "lucide-react";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="w-full bg-white shadow-md sticky top-0 z-50">
      <div className="flex items-center justify-between px-4 py-3 md:py-4 max-w-7xl mx-auto">
        {/* Logo & Location */}
        <div className="flex items-center gap-3">
          <img src="/logo.png" alt="Logo" className="h-8 w-8" />
          <h1 className="text-xl font-bold">Unisole</h1>
          <div className="hidden sm:flex items-center text-gray-500 text-sm ml-4">
            <MapPin className="w-4 h-4 mr-1" />
            <span>India</span>
          </div>
        </div>

        {/* Search */}
        <div className="hidden md:flex flex-1 mx-6">
          <div className="flex items-center w-full border rounded-md px-3 py-1">
            <input
              type="text"
              placeholder="Search Shoes..."
              className="flex-1 outline-none px-2 py-1 text-sm"
            />
            <Search className="w-4 h-4 text-gray-500" />
          </div>
        </div>

        {/* Right actions */}
        <div className="flex items-center gap-3 text-sm">
          <div className="hidden lg:flex items-center gap-2 text-gray-600">
            <Package className="w-4 h-4" />
            Orders
          </div>
          <div className="hidden lg:flex items-center gap-2 text-gray-600">
            <Heart className="w-4 h-4" />
            Favorites
          </div>
          <div className="relative hidden lg:flex items-center gap-1 text-gray-600">
            <ShoppingCart className="w-4 h-4" />
            <span>Cart</span>
            <span className="absolute top-[-6px] right-[-10px] bg-red-500 text-white text-xs rounded-full px-1">
              3
            </span>
          </div>
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
        </div>
      </div>

      {/* Search bar on mobile */}
      <div className="md:hidden px-4 pb-2">
        <div className="flex items-center w-full border rounded-md px-3 py-1">
          <input
            type="text"
            placeholder="Search Shoes..."
            className="flex-1 outline-none px-2 py-1 text-sm"
          />
          <Search className="w-4 h-4 text-gray-500" />
        </div>
      </div>

      {/* Main nav links */}
      <nav className="bg-white border-t md:border-none">
        <div className="hidden md:flex justify-center gap-8 py-3 text-sm font-medium text-gray-700">
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
        </div>

        {/* Mobile dropdown nav */}
        {mobileMenuOpen && (
          <div className="flex flex-col md:hidden px-4 py-2 gap-2 bg-white border-t">
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
            <div className="flex items-center gap-2 text-gray-600 mt-2">
              <Package className="w-4 h-4" />
              Orders
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <Heart className="w-4 h-4" />
              Favorites
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <ShoppingCart className="w-4 h-4" />
              Cart{" "}
              <span className="ml-auto bg-red-500 text-white text-xs rounded-full px-1">
                3
              </span>
            </div>
            <button className="w-full border rounded-md py-1 mt-2">
              Sign In
            </button>
            <button className="w-full border rounded-md py-1">Sign Up</button>
          </div>
        )}
      </nav>
    </header>
  );
}
