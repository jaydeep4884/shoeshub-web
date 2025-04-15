import { Box, Button, Container } from "@mui/material";
import React from "react";
import InputBox from "../ui/InputBox";
import { Field, Form, Formik } from "formik";

function Footer() {
  const FooterLink = [
    {
      title: "Company",
      link: ["About", "Security", "Privacy", "Charges", "Terms"],
    },
    {
      title: "Product",
      link: [
        "Men’s Shoes",
        "Men’s Slipper",
        "Women Shoes",
        "Women Slipper",
        "Kid’s Shoes",
        "Pricing",
      ],
    },
    {
      title: "CUSTOMER POLICIES",
      link: ["Contact Us", "FAQ", "T&C", "Terms Of Use", "Shipping"],
    },
    {
      title: "My unisole",
      link: ["My account", "My order", "My shopping Bag", "My wishlist"],
    },
  ];

  const handleSubmit = (values, { resetForm }) => {
    console.log(values);
    resetForm();
  };

  return (
    <footer className="w-full bg-[#F8F8F8]">
      <Container maxWidth>
        <Box className="py-16">
          <Box className="!flex justify-between gap-6 items-start">
            <Box className="flex justify-between flex-wrap gap-8 w-full md:w-[60%]">
              {FooterLink.map((section, index) => (
                <Box key={index} className="min-w-[150px]">
                  <h3 className="font-semibold text-gray-500 mb-2">
                    {section.title}
                  </h3>
                  <ul className="space-y-2">
                    {section.link.map((linkItem, idx) => (
                      <li key={idx}>
                        <a
                          href="/"
                          className="text-gray-400 hover:text-black transition-colors duration-200"
                        >
                          {linkItem}
                        </a>
                      </li>
                    ))}
                  </ul>
                </Box>
              ))}
            </Box>

            {/* Newsletter or email input form */}
            <Box className="md:w-[40%]">
              <Formik initialValues={{ email: "" }} onSubmit={handleSubmit}>
                <Form className="flex gap-x-10">
                  <Field
                    name="email"
                    type="email"
                    placeholder="Enter your email"
                    component={InputBox}
                  />
                  <Button
                    type="submit"
                    className="!px-10 !font-semibold"
                    variant="contained"
                  >
                    Subscribe
                  </Button>
                </Form>
              </Formik>
            </Box>
          </Box>
        </Box>
      </Container>
    </footer>
  );
}

export default Footer;
