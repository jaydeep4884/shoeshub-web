import React from "react";
import { Image, Input, Typography } from "antd";
import footerBrand from "../img/logo/mylogo.png";
import { Link } from "react-router";
import {
  FaFacebookF,
  FaXTwitter,
  FaSquareInstagram,
  FaRss,
} from "react-icons/fa6";

const footerLinks = [
  {
    title: "Company",
    FooterData: [
      { name: "About", link: "/*" },
      { name: "Security", link: "/*" },
      { name: "Privacy", link: "/*" },
      { name: "Charges", link: "/*" },
      { name: "Terms", link: "/*" },
    ],
  },
  {
    title: "Product",
    FooterData: [
      { name: "Men’s Shoes", link: "/men" },
      { name: "Men’s Slipper", link: "/men" },
      { name: "Women Shoes", link: "/women" },
      { name: "Women Slipper", link: "/women" },
      { name: "Kid’s Shoes", link: "/kids" },
      { name: "Pricing", link: "/*" },
    ],
  },
  {
    title: "Customer Policies",
    FooterData: [
      { name: "Contact Us", link: "/contact" },
      { name: "FAQ", link: "/*" },
      { name: "T&C", link: "/*" },
      { name: "Terms Of Use", link: "/*" },
      { name: "Shipping", link: "/cart" },
    ],
  },
  {
    title: "My Unisole",
    FooterData: [
      { name: "My account", link: "/profile" },
      { name: "My order", link: "/orders" },
      { name: "My shopping Bag", link: "/cart" },
      { name: "My wishlist", link: "/fav" },
    ],
  },
];

const Footer = () => {
  const linkStyle =
    "text-gray-400 hover:text-white transition-colors duration-300 cursor-pointer text-sm";

  const sectionTitle =
    "text-white/90 font-semibold tracking-wide text-sm uppercase mb-4";

  const socialStyle =
    "w-10 h-10 flex items-center justify-center rounded-full border border-white/20 bg-white/5 backdrop-blur-sm hover:bg-blue-500 hover:border-blue-500 hover:text-white text-gray-300 transition-all duration-300";

  return (
    <footer className="relative bg-gradient-to-br from-gray-900 via-gray-950 to-black text-white overflow-hidden">
      {/* Decorative gradient blobs */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-fuchsia-600/20 rounded-full blur-3xl animate-pulse"></div>

      <div className="relative pt-16 pb-10 px-6 lg:px-12">
        {/* Top Section */}
        <div className="w-full grid grid-cols-1 md:grid-cols-6 gap-14">
          {/* Brand + Description */}
          <div className="md:col-span-2">
            <Image
              src={footerBrand}
              alt="Brand Logo"
              className="mb-4 !h-[70px] !w-[150px] object-cover"
            />
            <p className="text-gray-400 text-base leading-7 ">
              <span className="font-medium text-white">Unisole</span> Step into
              comfort, step into style. From everyday wear to statement looks,
              we’ve got the perfect sole for every walk of life.
            </p>
          </div>

          {/* Footer Links */}
          <div className="md:col-span-4 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-10 text-sm">
            {footerLinks.map((section, index) => (
              <div key={index}>
                <h4 className={sectionTitle}>{section.title}</h4>
                <ul className="space-y-3">
                  {section.FooterData.map((el, idx) => (
                    <li key={idx}>
                      <Link to={el.link} className={linkStyle}>
                        {el.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Newsletter */}
        <div className="mt-10 max-w-[800px] mx-auto border-t border-white/10 pt-8 text-center">
          <Typography.Title
            level={3}
            className="!text-white text-xl font-semibold mb-3"
          >
            Stay Updated
          </Typography.Title>
          <p className="text-gray-400 mb-8 text-sm">
            Join our newsletter – Be the first to know about new collections &
            deals.
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-4 justify-center">
            <Input
              type="email"
              placeholder="Enter your email"
              className="w-full sm:w-auto flex-1 rounded-full border border-white/20 bg-white/10 backdrop-blur-md px-5 py-3 text-sm text-black placeholder-gray-400 "
            />
            <button className="px-8 py-3 rounded-full bg-gradient-to-r from-blue-600 to-fuchsia-600 hover:from-blue-500 hover:to-pink-500 text-white text-sm font-medium shadow-lg shadow-blue-600/20 transition-all duration-300">
              Subscribe
            </button>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-10 border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
          {/* Socials */}
          <div className="flex gap-4 mb-6 md:mb-0">
            {[FaFacebookF, FaXTwitter, FaSquareInstagram, FaRss].map(
              (Icon, i) => (
                <Link key={i} to="/home" className={socialStyle}>
                  <Icon className="w-4 h-4" />
                </Link>
              )
            )}
          </div>
          <p className="text-center">
            © {new Date().getFullYear()}{" "}
            <span className="text-white font-medium">Unisole</span>. All Rights
            Reserved
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
