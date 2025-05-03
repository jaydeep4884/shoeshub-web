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
import cartImg from "../components/img/shoes/shoes-01-01.png";
import nagadPay from "../components/img/payment logo/nagad-pay.svg";
import masterPay from "../components/img/payment logo/mastercard-pay.svg";
import bkashPay from "../components/img/payment logo/bkash-pay.svg";
import visaPay from "../components/img/payment logo/visa-pay.svg";
import toast, { Toaster } from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";

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
    paymentMethod: "cod",
    bankProvider: "",
  };

  const handleSubmit = (values, { resetForm }) => {
    if (values.paymentMethod === "bank" && !values.bankProvider) {
      toast.error("Please select a bank payment option.");
      return;
    }

    const summary =
      values.paymentMethod === "cod"
        ? "COD"
        : `${values.bankProvider.toUpperCase()}`;

    toast.success(`Payment Method Selected: ${summary}`);
    console.log("Form Data:", values);
    resetForm();
  };

  return (
    <>
      <Header />
      <Container maxWidth="lg">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
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

              <Box>
                <Formik initialValues={initialValues} onSubmit={handleSubmit}>
                  <Form className="flex justify-between items-center gap-10">
                    {/* Left Side  */}
                    <Box className="w-full sm:w-2/3 lg:w-[45%] space-y-5">
                      {[
                        {
                          name: "firstname",
                          label: "First Name*",
                          type: "text",
                        },
                        {
                          name: "company",
                          label: "Company Name",
                          type: "text",
                        },
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
                        {
                          name: "email",
                          label: "Email Address*",
                          type: "email",
                        },
                      ].map(({ name, label, type }) => (
                        <Box key={name}>
                          <label className="text-gray-700 text-sm">
                            {label}
                          </label>
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
                                  Save this information for faster check-out
                                  next time
                                </span>
                              }
                              sx={{ margin: 0 }}
                            />
                          )}
                        </Field>
                      </Box>
                    </Box>

                    {/* Right Side */}
                    <Box className="w-full sm:w-2/3 lg:w-[45%]">
                      <Box className="p-6 border rounded-xl bg-white shadow-sm space-y-6">
                        {/* Product Details */}
                        <Box className="flex justify-between items-center">
                          <Box className="flex items-center gap-4">
                            <img src={cartImg} alt="H1 Gamepad" />
                            <Typography className="font-medium">
                              H1 Gamepad
                            </Typography>
                          </Box>
                          <Typography className="font-semibold">
                            $1100
                          </Typography>
                        </Box>

                        {/* Pricing Summary */}
                        <Box className="space-y-2 border-t pt-4">
                          <Box className="flex justify-between">
                            <Typography>Subtotal:</Typography>
                            <Typography>$1750</Typography>
                          </Box>
                          <Box className="flex justify-between">
                            <Typography>Shipping:</Typography>
                            <Typography>Free</Typography>
                          </Box>
                          <Box className="flex justify-between border-t pt-2 font-semibold">
                            <Typography>Total:</Typography>
                            <Typography>$1750</Typography>
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

                        {/* Bank Options (Conditional) */}
                        <Field name="paymentMethod">
                          {({ field }) => (
                            <AnimatePresence>
                              {field.value === "bank" && (
                                <Field name="bankProvider">
                                  {({ field: bankField }) => (
                                    <motion.div
                                      key="bankProviderSection"
                                      initial={{ opacity: 0, height: 0 }}
                                      animate={{ opacity: 1, height: "auto" }}
                                      exit={{ opacity: 0, height: 0 }}
                                      transition={{
                                        duration: 0.2,
                                        ease: "easeInOut",
                                      }}
                                      className="overflow-hidden flex gap-x-3"
                                    >
                                      {[
                                        { value: "visa", img: visaPay },
                                        { value: "bkash", img: bkashPay },
                                        { value: "nagad", img: nagadPay },
                                        { value: "master", img: masterPay },
                                      ].map((option) => (
                                        <motion.img
                                          key={option.value}
                                          src={option.img}
                                          alt={option.value}
                                          whileTap={{ scale: 0.9 }}
                                          className={` cursor-pointer p-1 border rounded transition-all duration-100 ${
                                            bankField.value === option.value
                                              ? "border-gray-300"
                                              : "border-transparent"
                                          }`}
                                          onClick={() =>
                                            bankField.onChange({
                                              target: {
                                                name: "bankProvider",
                                                value: option.value,
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

                        {/* Coupon Section */}
                        <Applycoup />

                        {/* Place Order Button */}
                        <Buttongroup name="Place Order" />
                      </Box>
                    </Box>
                  </Form>
                </Formik>
              </Box>
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
