import React, { useContext, useEffect, useState } from "react";
import { Button, Input, Typography } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { Field, Form, Formik } from "formik";
import { useNavigate, Link } from "react-router";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { token } from "../assets/contexts";
import Loader from "../components/ui/Loader";

function Login() {
  const navigate = useNavigate();
  const Token = useContext(token);
  const [loading, setLoading] = useState(false);
  const isAuthenticated = localStorage.getItem("token") ? true : false;

  const initialValues = {
    email: "",
    password: "",
  };

  const handleSubmit = async (values, { resetForm }) => {
    // const payload = {
    //   ...values,
    //   user_id: JSON.parse(localStorage.getItem("userId")) || "",
    // };

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
        toast.success("Login Successfully");
        localStorage.setItem("token", Token);
        localStorage.setItem("userId", JSON.stringify(res.data?.data?._id));
        navigate("/home");
      } else {
        toast.error("Login failed.");
      }
    } catch (error) {
      toast.error("Email and Password Incorrect !!");
      console.error(error);
    } finally {
      setLoading(false);
      resetForm();
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/home");
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#FFF8F8] px-4">
      <div className="w-full max-w-md bg-white p-6 sm:p-10 rounded-3xl shadow-xl">
        <div className="mb-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-2">
            Welcome Back 👋
          </h2>
          <Typography.Text className="text-sm">
            Today is a new day. It's your day. You shape it. <br />
            Sign in to start purchasing new shoes!
          </Typography.Text>
        </div>

        <Formik initialValues={initialValues} onSubmit={handleSubmit}>
          <Form className="flex flex-col gap-5">
            <div>
              <label
                htmlFor="email"
                className="block mb-1 font-medium text-gray-700"
              >
                Email
              </label>
              <Field name="email">
                {({ field }) => (
                  <Input
                    {...field}
                    type="email"
                    placeholder="you@example.com"
                    size="large"
                    required
                  />
                )}
              </Field>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block mb-1 font-medium text-gray-700"
              >
                Password
              </label>
              <Field name="password">
                {({ field }) => (
                  <Input.Password
                    {...field}
                    placeholder="At least 8 characters"
                    iconRender={(visible) =>
                      visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                    }
                    size="large"
                  />
                )}
              </Field>
              <div className="text-right mt-2 text-[#A98240] text-sm hover:underline cursor-pointer">
                Forgot Password?
              </div>
            </div>

            <Button
              htmlType="submit"
              size="large"
              className="bg-black text-white rounded-xl"
              block
              disabled={loading}
            >
              {loading ? <Loader /> : "Login"}
            </Button>

            <Typography.Text className="text-center text-sm text-gray-600">
              Don’t have an account?{" "}
              <Link
                to="/signup"
                className="text-[#A98240] underline hover:text-[#8a6c34]"
              >
                Register
              </Link>
            </Typography.Text>
          </Form>
        </Formik>

        <Toaster />
      </div>
    </div>
  );
}

export default Login;
