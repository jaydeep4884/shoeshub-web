import React from "react";
import {
  Box,
  Breadcrumbs,
  Checkbox,
  Container,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import { Link } from "react-router";
import { Field, Form, Formik } from "formik";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import Applycoup from "../components/ui/Applycoup";
import Buttongroup from "../components/ui/Buttongroup";
import { motion, AnimatePresence } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";
import cartImg from "../components/img/shoes/shoes-01-01.png";
import visaPay from "../components/img/payment logo/visa-pay.svg";
import bkashPay from "../components/img/payment logo/bkash-pay.svg";
import nagadPay from "../components/img/payment logo/nagad-pay.svg";
import masterPay from "../components/img/payment logo/mastercard-pay.svg";

const Checkout = () => {
  const inputFields = [
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
  ];

  const banks = [
    { value: "visa", img: visaPay },
    { value: "bkash", img: bkashPay },
    { value: "nagad", img: nagadPay },
    { value: "master", img: masterPay },
  ];

  const initialValues = {
    firstname: "",
    company: "",
    address: "",
    apartment: "",
    city: "",
    mobile: "",
    email: "",
    permission: "",
    paymentMethod: "cod",
    bankProvider: "",
  };

  const handleSubmit = (values, { resetForm }) => {
    if (values.paymentMethod === "bank" && !values.bankProvider) {
      toast.error("Please select a bank payment option.");
      return;
    }
    toast.success("Order Placed Successfully 🎉🎂");
    resetForm();
    console.log(values);
  };

  return (
    <>
      <Header />
      <Container maxWidth="lg">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <Box className="py-8 sm:py-10">
            <Breadcrumbs className="!mb-6 text-sm md:text-base">
              {["Account", "Product", "View Cart", "CheckOut"].map(
                (label, i) => (
                  <Link key={i} to="">
                    <p>{label}</p>
                  </Link>
                )
              )}
            </Breadcrumbs>

            <Box className="bg-white p-4 sm:p-6 md:p-10 border rounded-xl shadow-sm">
              <Typography variant="h4" className="font-semibold !mb-6">
                Billing Details
              </Typography>

              <Formik initialValues={initialValues} onSubmit={handleSubmit}>
                <Form className="flex justify-between items-center flex-col lg:flex-row gap-10">
                  {/* Left */}
                  <Box className="w-full lg:w-[45%] space-y-5">
                    {inputFields.map(({ name, label, type }) => (
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
                              "& fieldset": { border: "none" },
                              backgroundColor: "#f3f4f6",
                            },
                          }}
                        />
                      </Box>
                    ))}
                    <Field name="permission">
                      {({ field }) => (
                        <FormControlLabel
                          control={
                            <Checkbox
                              {...field}
                              checked={field.value}
                              size="small"
                              color="error"
                            />
                          }
                          label={
                            <span className="text-sm">
                              Save info for next time
                            </span>
                          }
                        />
                      )}
                    </Field>
                  </Box>

                  {/* Right */}
                  <Box className="w-full lg:w-[45%] space-y-6">
                    <Box className="p-4 sm:p-5 bg-white border rounded-xl shadow-sm space-y-6">
                      {/* Product */}
                      <Box className="flex justify-between items-center">
                        <Box className="flex items-center gap-4">
                          <img
                            src={cartImg}
                            alt="H1 Gamepad"
                            className="w-16 sm:w-20 object-contain"
                          />
                          <Typography className="font-medium">
                            H1 Gamepad
                          </Typography>
                        </Box>
                        <Typography className="font-semibold">$1100</Typography>
                      </Box>

                      {/* Summary */}
                      <Box className="space-y-2 border-t pt-4 text-sm">
                        <Box className="flex justify-between">
                          <span>Subtotal:</span>
                          <span>$1750</span>
                        </Box>
                        <Box className="flex justify-between">
                          <span>Shipping:</span>
                          <span>Free</span>
                        </Box>
                        <Box className="flex justify-between border-t pt-2 font-semibold">
                          <span>Total:</span>
                          <span>$1750</span>
                        </Box>
                      </Box>

                      {/* Payment Method */}
                      <Field name="paymentMethod">
                        {({ field }) => (
                          <RadioGroup {...field}>
                            <FormControlLabel
                              value="bank"
                              control={<Radio />}
                              label="Bank"
                            />
                            <FormControlLabel
                              value="cod"
                              control={<Radio />}
                              label="Cash on Delivery"
                            />
                          </RadioGroup>
                        )}
                      </Field>

                      {/* Bank Provider */}
                      <Field name="paymentMethod">
                        {({ field }) => (
                          <AnimatePresence>
                            {field.value === "bank" && (
                              <Field name="bankProvider">
                                {({ field: bankField }) => (
                                  <motion.div
                                    key="bankSection"
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: "auto" }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className="flex flex-wrap gap-3 overflow-hidden"
                                  >
                                    {banks.map(({ value, img }) => (
                                      <motion.img
                                        key={value}
                                        src={img}
                                        alt={value}
                                        whileTap={{ scale: 0.95 }}
                                        className={`p-1 cursor-pointer border rounded ${
                                          bankField.value === value
                                            ? "border-gray-300"
                                            : "border-transparent"
                                        }`}
                                        onClick={() =>
                                          bankField.onChange({
                                            target: {
                                              name: "bankProvider",
                                              value,
                                            },
                                          })
                                        }
                                      />
                                    ))}
                                  </motion.div>
                                )}
                              </Field>
                            )}
                          </AnimatePresence>
                        )}
                      </Field>

                      {/* Coupon and Button */}
                      <Applycoup />
                      <Buttongroup name="Place Order" />
                    </Box>
                  </Box>
                </Form>
              </Formik>
            </Box>
          </Box>
        </motion.div>
      </Container>
      <Toaster />
      <Footer />
    </>
  );
};

export default Checkout;
