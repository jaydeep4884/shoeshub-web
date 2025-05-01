import React from "react";
import {
  Box,
  Breadcrumbs,
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  TextField,
  Typography,
} from "@mui/material";
import { Link } from "react-router";
import { Field, Form, Formik } from "formik";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import Applycoup from "../components/ui/Applycoup";
import Buttongroup from "../components/ui/Buttongroup";

const Checkout = () => {
  const initialValues = {
    firstname: "",
    company: "",
    address: "",
    apartment: "",
    city: "",
    mobile: "",
    email: "",
    permission: "",
  };

  const handleSubmit = (values, { resetForm }) => {
    console.log(values);
    initialValues.permission = false;
    resetForm();
  };

  return (
    <>
      <Header />
      <Container maxWidth="lg">
        <Box className="py-8 sm:py-14">
          <Breadcrumbs aria-label="breadcrumb" className="mb-6 sm:!mb-10">
            {["Account", "Product", "View Cart", "CheckOut"].map(
              (label, idx) => (
                <Link key={idx} to="">
                  <p>{label}</p>
                </Link>
              )
            )}
          </Breadcrumbs>

          <Box className="p-6 sm:p-10 border rounded-xl  shadow-sm bg-white">
            <Typography variant="h4" className="!mb-6 font-semibold">
              Billing Details
            </Typography>

            <Box className="flex justify-between items-center gap-10">
              <Box className="w-full sm:w-2/3 lg:w-[45%]">
                <Formik initialValues={initialValues} onSubmit={handleSubmit}>
                  <Form className="space-y-5">
                    {[
                      { name: "firstname", label: "First Name*", type: "text" },
                      { name: "company", label: "Company Name", type: "text" },
                      {
                        name: "address",
                        label: "Street Address*",
                        type: "text",
                      },
                      {
                        name: "apartment",
                        label: "Apartment, floor, etc. (optional)",
                        type: "text",
                      },
                      { name: "city", label: "Town/City*", type: "text" },
                      {
                        name: "mobile",
                        label: "Phone Number*",
                        type: "number",
                      },
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
                          InputProps={{
                            sx: {
                              "& fieldset": {
                                border: "none",
                              },
                              backgroundColor: "#f3f4f6",
                            },
                          }}
                        />
                      </Box>
                    ))}
                    <Box className="flex items-center gap-2">
                      <Field name="permission">
                        {({ field }) => (
                          <FormControlLabel
                            control={
                              <Checkbox
                                {...field}
                                checked={field.value}
                                size="small"
                                color="error"
                                sx={{ p: 0 }}
                              />
                            }
                            label={
                              <span className=" text-sm pl-2">
                                Save this information for faster check-out next
                                time
                              </span>
                            }
                            sx={{ margin: 0 }}
                          />
                        )}
                      </Field>
                    </Box>
                    <Buttongroup name="Place Order" />
                  </Form>
                </Formik>
              </Box>

              <Box className="w-full sm:w-2/3 lg:w-[45%]">
                <Applycoup />
              </Box>
            </Box>
          </Box>
        </Box>
      </Container>
      <Footer />
    </>
  );
};

export default Checkout;
