import React, { useContext, useState } from "react";
import { Formik, Form, Field } from "formik";
import { motion } from "framer-motion";
import { EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons";
import { token } from "../../assets/contexts";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router";
import Loader from "../../components/ui/Loader";

const AdminLogin = () => {
  const [showPassword, setShowPassword] = useState(false);
  const Token = useContext(token);

  console.log("Token ==> ",Token);
  
  const [Loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const initialValues = {
    email: "",
    password: "",
  };

  const handleSubmit = async (values, { resetForm }) => {
    const payload = {
      ...values,
      user_id: JSON.parse(localStorage.getItem("userId")) || "",
    };

    console.log("login ==> ",payload);
    

    setLoading(true);

    try {
      const res = await axios.post(
        "https://myapigenerator.onrender.com/auth/login",
        values,
        {
          headers: {
            Authorization: Token,
          },
        }
      );
      if (res.data.Status === "Success") {
        toast.success("Admin Login Successfully"); // USER_1 ram@gmail.com
        
        localStorage.setItem("token", Token);
        navigate("/admin/dashboard/");
        setLoading(false);
      }
    } catch (error) {
      toast.error("Email and Password InValid !!");
      console.log(error);
    }
    resetForm();
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <motion.div
        className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8"
        initial={{ opacity: 0, scale: 0.95, y: -30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Admin Login
        </h2>

        <Formik
          enableReinitialize
          initialValues={initialValues}
          onSubmit={handleSubmit}
        >
          <Form className="space-y-5">
            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email Address
              </label>
              <Field
                name="email"
                type="email"
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="admin@example.com"
              />
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <div className="relative">
                <Field
                  name="password"
                  type={showPassword ? "text" : "password"}
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  placeholder="••••••••"
                />
                <div
                  className="absolute inset-y-0 right-3 flex items-center cursor-pointer text-gray-500"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeInvisibleOutlined /> : <EyeOutlined />}
                </div>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-200 font-medium"
            >
              {Loading ? <Loader /> : "Login"}
            </button>
          </Form>
        </Formik>

        <p className="text-xs text-gray-400 text-center mt-6">
          © {new Date().getFullYear()} Admin Panel. All rights reserved.
        </p>
      </motion.div>
      <Toaster />
    </div>
  );
};

export default AdminLogin;
