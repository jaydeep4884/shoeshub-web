import React from "react";
import {
  Box,
  Breadcrumbs,
  Button,
  Container,
  TextField,
  Typography,
} from "@mui/material";
import { Link } from "react-router";
import { Field, Form, Formik } from "formik";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";

const Checkout = () => {
  const initialValues = {
    firstname: "",
    company: "",
    address: "",
    apartment: "",
    city: "",
    mobile: "",
    email: "",
  };

  const handleSubmit = (values, { resetForm }) => {
    console.log(values);
    resetForm();
  };

  return (
    <>
      <Header />
      <Container maxWidth="lg">
        <Box className="py-8 sm:py-14">
          <Breadcrumbs aria-label="breadcrumb" className="mb-6 sm:mb-10">
            {["Account", "Product", "View Cart", "CheckOut"].map(
              (label, idx) => (
                <Link key={idx} to="">
                  <Typography color="text.primary">{label}</Typography>
                </Link>
              )
            )}
          </Breadcrumbs>

          <Box className="p-6 sm:p-10 border rounded-xl shadow-sm bg-white">
            <Typography variant="h4" className="mb-6 font-semibold">
              Billing Details
            </Typography>

            <Box className="w-full sm:w-2/3 lg:w-1/2">
              <Formik initialValues={initialValues} onSubmit={handleSubmit}>
                <Form className="space-y-5">
                  {[
                    { name: "firstname", label: "First Name*", type: "text" },
                    { name: "company", label: "Company Name", type: "text" },
                    { name: "address", label: "Street Address*", type: "text" },
                    {
                      name: "apartment",
                      label: "Apartment, floor, etc. (optional)",
                      type: "text",
                    },
                    { name: "city", label: "Town/City*", type: "text" },
                    { name: "mobile", label: "Phone Number*", type: "number" },
                    { name: "email", label: "Email Address*", type: "email" },
                  ].map(({ name, label, type }) => (
                    <Box key={name}>
                      <label className="text-gray-700 text-sm">{label}</label>
                      <Field
                        as={TextField}
                        name={name}
                        type={type}
                        size="small"
                        fullWidth
                        required
                        className="bg-gray-100"
                      />
                    </Box>
                  ))}

                  <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    className="!capitalize !text-white !font-medium !bg-[#DB4444] hover:!bg-[#cf7e7e] !rounded !py-2 !shadow-none"
                  >
                    Place Order
                  </Button>
                </Form>
              </Formik>
            </Box>
          </Box>
        </Box>
      </Container>
      <Footer />
    </>
  );
};

export default Checkout;
