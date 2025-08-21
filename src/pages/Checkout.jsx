import React, { useContext, useEffect, useState } from "react";
import {
  Box,
  Checkbox,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import { Field, Form, Formik } from "formik";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import Applycoup from "../components/ui/Applycoup";
import Buttongroup from "../components/ui/Buttongroup";
import { motion, AnimatePresence } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";
import visaPay from "../components/img/payment logo/visa-pay.svg";
import bkashPay from "../components/img/payment logo/bkash-pay.svg";
import nagadPay from "../components/img/payment logo/nagad-pay.svg";
import masterPay from "../components/img/payment logo/mastercard-pay.svg";
import Breadcrumb from "../components/ui/Breadcrumb";
import { useNavigate, useParams } from "react-router";
import { baseUrl, token } from "../assets/contexts";
import axios from "axios";
import ProductDetailSkeleton from "../components/ui/ProductDetailSkeleton";
import PageContainer from "../components/ui/PageContainer";

const Checkout = () => {
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState("");
  const Token = useContext(token);
  const apiUrl = useContext(baseUrl);
  const { id } = useParams();
  localStorage.setItem("ProductId", JSON.stringify(id));

  const inputFields = [
    { name: "fullName", label: "First Name*", type: "text" },
    { name: "companyName", label: "Company Name", type: "text" },
    { name: "streetAddress", label: "Street Address*", type: "text" },
    {
      name: "apartment",
      label: "Apartment, floor, etc. (optional)",
      type: "text",
    },
    { name: "city", label: "Town/City*", type: "text" },
    { name: "phone", label: "Phone Number*", type: "number" },
    { name: "email", label: "Email Address*", type: "email" },
  ];

  const banks = [
    { value: "visa", img: visaPay },
    { value: "bkash", img: bkashPay },
    { value: "nagad", img: nagadPay },
    { value: "master", img: masterPay },
  ];

  const initialValues = {
    fullName: "",
    companyName: "",
    streetAddress: "",
    apartment: "",
    city: "",
    phone: "",
    email: "",
    paymentMethod: "",
    paymentProvider: "",
    couponCode: "",
    saveForNextTime: false,
  };

  const breadItems = [
    { label: "Home", link: "/home" },
    { label: "Product", link: `/product/${id}` },
    { label: "View Cart", link: "/cart" },
    { label: "CheckOut" },
  ];

  const handleSubmit = async (values, { resetForm }) => {
    if (values.paymentMethod === "bank" && !values.paymentProvider) {
      toast.error("Please select a bank payment option.");
      return;
    }
    const payload = {
      ...values,
      user_id: JSON.parse(localStorage.getItem("userId")) || "",
      cart_product: JSON.parse(localStorage.getItem("ProductId")) || "",
    };

    try {
      await axios
        .post(`${apiUrl}/Payment-Details`, payload, {
          headers: { Authorization: Token },
        })
        .then(() => {
          toast.success("Order Placed Successfully 🎉🎂");
          navigate("/orderplace");
        });
    } catch (error) {
      console.log(error);
    }
    resetForm();
  };

  // Fetching Single Product
  const fetchProduct = async () => {
    try {
      const res = await axios.get(`${apiUrl}/Product-Detail`, {
        headers: { Authorization: Token },
      });
      const productData = res.data.Data;
      const singleProduct = productData.find((item) => item._id === id);

      if (singleProduct) {
        setProduct(singleProduct);
        setSelectedImage(singleProduct.images?.[0] || "");
      } else {
        console.error("Product not found");
      }
    } catch (err) {
      console.error("Failed to fetch product:", err);
    } finally {
    }
  };

  useEffect(() => {
    fetchProduct();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <Header />
      <PageContainer>
        <Box className="pb-3 sm:pb-5">
          <Breadcrumb items={breadItems} />

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
                  <Field name="saveForNextTime">
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
                  <Box className="p-4 sm:p-5 bg-white border rounded-xl shadow-sm ">
                    {product ? (
                      <>
                        <Box className="flex justify-between items-center gap-5">
                          <Box className="flex items-center gap-4">
                            <img
                              src={selectedImage}
                              alt={product.pro_name}
                              className="w-16 sm:w-20 object-contain"
                            />
                            <Typography className="font-medium line-clamp-1">
                              {product.pro_name}
                            </Typography>
                          </Box>
                          <Typography className="font-semibold">
                            ${product.new_price}
                          </Typography>
                        </Box>

                        {/* Summary */}
                        <Box className="space-y-2 border-t pt-4 text-sm">
                          <Box className="flex justify-between">
                            <span>Subtotal:</span>
                            <span>${product.new_price}</span>
                          </Box>
                          <Box className="flex justify-between">
                            <span>Shipping:</span>
                            <span>Free</span>
                          </Box>
                          <Box className="flex justify-between border-t pt-2 font-semibold">
                            <span>Total:</span>
                            <span>${product.new_price}</span>
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
                                <Field name="paymentProvider">
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
                                                name: "paymentProvider",
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

                        <Applycoup />
                        <br />
                        <Buttongroup name="Place Order" />
                      </>
                    ) : (
                      <ProductDetailSkeleton />
                    )}
                  </Box>
                </Box>
              </Form>
            </Formik>
          </Box>
        </Box>
      </PageContainer>
      <Toaster />
      <Footer />
    </>
  );
};

export default Checkout;
