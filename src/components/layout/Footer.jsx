import { Box, Button, Container } from "@mui/material";
import React from "react";
import InputBox from "../ui/InputBox";
import { Field, Form, Formik } from "formik";
import footerBrand from "../img/logo/footer-brand.svg";
import mastercard from "../img/Mastercard.png";
import paypal from "../img/PayPal.png";
import visa from "../img/Visa.png";
import { Link } from "react-router";

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
  const handleSubmit = (values, { resetForm }) => {
    console.log(values);
    resetForm();
  };

  return (
    <footer
      className="w-full !bg-[#faeded]"
      style={{
        borderTop: "10px solid",
        borderImage:
          " linear-gradient(to right, rgba(151, 71, 255, 1), rgba(255, 165, 0, 1)) 1",
      }}
    >
      <Container maxWidth="lg">
        <Box className="py-10 sm:py-14">
          <Box className="flex flex-col lg:flex-row gap-10">
            {/* Footer Left */}
            <Box className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:w-[60%] gap-8 ">
              {footerLinks.map((section, index) => (
                <Box key={index}>
                  <h3 className="font-semibold text-gray-500 mb-2 sm:text-base text-sm">
                    {section.title}
                  </h3>
                  <ul className="space-y-2">
                    {section.FooterData.map((el, idx) => (
                      <li key={idx}>
                        <Link
                          to={el.link}
                          className="text-gray-400 hover:text-black transition-colors sm:text-base text-sm duration-200 "
                        >
                          {el.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </Box>
              ))}
            </Box>

            {/* Footer Right */}
            <Box className="flex-1 sm:w-full md:w-full !lg:w-[40%]">
              <Box className="mb-10">
                <Formik initialValues={{ email: "" }} onSubmit={handleSubmit}>
                  <Form className="flex flex-col sm:flex-row gap-4 sm:items-stretch">
                    <Field
                      name="email"
                      type="email"
                      placeholder="Enter your email"
                      component={InputBox}
                    />
                    <Button
                      type="submit"
                      variant="contained"
                      className="font-semibold !px-8"
                    >
                      Subscribe
                    </Button>
                  </Form>
                </Formik>
              </Box>

              <Box className="flex justify-between sm:flex-row  md:flex-row  sm:items-center gap-6">
                <Link to="/home">
                  <img src={footerBrand} alt="Unisole Logo" />
                </Link>
                <Box>
                  <p className="font-semibold mb-2 text-sm sm:text-base">
                    Payment Methods
                  </p>
                  <Box className="flex gap-4">
                    <img src={mastercard} alt="Mastercard" />
                    <img src={paypal} alt="PayPal" />
                    <img src={visa} alt="Visa" />
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Container>
    </footer>
  );
};

export default Footer;
