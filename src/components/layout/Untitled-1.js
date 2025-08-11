import React, { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router";
import { Image } from "antd";

const Header2 = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="w-full">
      {/* Main Nav */}
      <nav className="flex items-center justify-between px-6 py-3  bg-black backdrop-blur-xl border border-white/10 shadow-lg">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image
            className="h-8 w-auto lg:h-10"
            src="https://www.auraui.com/logo-dark.png"
            alt="AuraUI Logo"
            height={40}
            width={120}
          />
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="relative text-white text-sm font-medium transition-all duration-300 hover:text-purple-400 after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-gradient-to-r after:from-purple-500 after:to-pink-500 after:transition-all after:duration-300 hover:after:w-full"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="hidden md:flex">
          <Link
            href="#signup"
            className="px-5 py-2 text-sm font-medium text-white rounded-full bg-gradient-to-r from-purple-600 to-pink-500 hover:shadow-[0_0_15px_rgba(217,70,239,0.7)] transition-all duration-300"
          >
            Sign up
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden text-white p-2 rounded-md hover:bg-white/10 transition-all"
        >
          {isMenuOpen ? (
            <FiX className="h-6 w-6" />
          ) : (
            <FiMenu className="h-6 w-6" />
          )}
        </button>
      </nav>

    </header>
  );
};

export default Header2;
