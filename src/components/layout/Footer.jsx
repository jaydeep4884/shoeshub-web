import { Box, Button, Container } from "@mui/material";
import React from "react";
import InputBox from "../ui/InputBox";
import { Field, Form, Formik } from "formik";
import footerBrand from "../img/logo/footer-brand.svg";
import mastercard from "../img/Mastercard.png";
import paypal from "../img/PayPal.png";
import visa from "../img/Visa.png";

const footerLinks = [
  {
    title: "Company",
    links: ["About", "Security", "Privacy", "Charges", "Terms"],
  },
  {
    title: "Product",
    links: [
      "Men’s Shoes",
      "Men’s Slipper",
      "Women Shoes",
      "Women Slipper",
      "Kid’s Shoes",
      "Pricing",
    ],
  },
  {
    title: "Customer Policies",
    links: ["Contact Us", "FAQ", "T&C", "Terms Of Use", "Shipping"],
  },
  {
    title: "My Unisole",
    links: ["My account", "My order", "My shopping Bag", "My wishlist"],
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
                    {section.links.map((link, idx) => (
                      <li key={idx}>
                        <a
                          href="/"
                          className="text-gray-400 hover:text-black transition-colors sm:text-base text-sm duration-200 "
                        >
                          {link}
                        </a>
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
                <img src={footerBrand} alt="Unisole Logo" />
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
