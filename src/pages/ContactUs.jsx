import React, { useContext, useState } from "react";
import { Input, Button } from "antd";
import { motion } from "framer-motion";
import {
  MailOutlined,
  PhoneOutlined,
  EnvironmentOutlined,
} from "@ant-design/icons";
import { Field, Form, Formik } from "formik";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import Feature from "../components/layout/Feature";
import Loader from "../components/Loader";
import { token } from "../assets/contexts";

const inputs = [
  { name: "name", placeholder: "Enter Your Name" },
  { name: "email", placeholder: "Enter Your Email" },
  { name: "messege", placeholder: "Your Message", isTextArea: true },
];

const contactInfo = [
  {
    icon: <MailOutlined />,
    text: "support@example.com",
    link: "mailto:support@example.com",
  },
  {
    icon: <PhoneOutlined />,
    text: "+91 987654321*",
    link: "tel:+919876543210",
  },
  {
    icon: <EnvironmentOutlined />,
    text: "Surat, Gujarat",
    link: "https://www.google.com/maps/search/?api=1&query=Surat,+India",
  },
];

const ContactUs = () => {
  const [loading, setLoading] = useState(false);
  const Token = useContext(token);
  const initialValues = { name: "", email: "", messege: "" };

  const handleSubmit = async (values, { resetForm }) => {
    setLoading(true);
    try {
      const user_id = JSON.parse(localStorage.getItem("userId")) || "";
      const { data } = await axios.post(
        "https://generateapi.onrender.com/api/contact",
        { ...values, user_id },
        { headers: { Authorization: Token } }
      );
      if (data.Status === "Success")
        toast.success("Thank You For Contacting Us !");
      setLoading(false);
    } catch (err) {
      toast.error("Server Busy");
      console.error(err);
    }
    resetForm();
  };

  return (
    <>
      <Header />
      <div className="bg-gray-50 p-4 md:p-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="mx-auto bg-white rounded-xl shadow-xl grid lg:grid-cols-2 gap-6 overflow-hidden"
        >
          <div className="p-6 lg:p-10 space-y-6">
            <h2 className="text-3xl font-bold text-gray-800">Contact Us</h2>
            <p className="text-gray-600">
              We'd love to hear from you! Send us a message and we’ll respond as
              soon as possible.
            </p>

            <Formik initialValues={initialValues} onSubmit={handleSubmit}>
              <Form className="space-y-4">
                {inputs.map(({ name, placeholder, isTextArea }) => (
                  <Field
                    key={name}
                    as={isTextArea ? Input.TextArea : Input}
                    name={name}
                    placeholder={placeholder}
                    size="large"
                    rows={isTextArea ? 4 : undefined}
                    required={!isTextArea}
                  />
                ))}
                <Button
                  type="dashed"
                  htmlType="submit"
                  size="large"
                  className="w-full"
                >
                  {loading ? <Loader /> : "Send Message"}
                </Button>
              </Form>
            </Formik>

            <div className="pt-6 space-y-2 text-sm text-gray-500">
              {contactInfo.map(({ icon, text, link }) => (
                <a
                  key={text}
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 hover:underline"
                >
                  {icon} {text}
                </a>
              ))}
            </div>
          </div>

          <div className="w-full h-96 lg:h-auto bg-[#ddd]">
            <iframe
              title="Google Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14013.36292747192!2d77.2100361!3d28.6139391!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce2b5e82a4bdb%3A0x32f7a2e90eddf4c7!2sConnaught%20Place%2C%20New%20Delhi%2C%20Delhi%20110001!5e0!3m2!1sen!2sin!4v1674060098415!5m2!1sen!2sin"
              className="w-full h-full border-0"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </motion.div>
      </div>
      <Feature />
      <Footer />
      <Toaster />
    </>
  );
};

export default ContactUs;
