import React, { useContext, useState } from "react";
import { Button, Input, Typography } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { Field, Form, Formik } from "formik";
import { useNavigate, Link } from "react-router";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { token } from "../assets/contexts";
import Loader from "../components/ui/Loader";

function SignUp() {
  const navigate = useNavigate();
  const Token = useContext(token);
  const [loading, setLoading] = useState(false);

  const initialValues = {
    name: "",
    email: "",
    password: "",
  };

  const handleSubmit = async (values, { resetForm }) => {
    setLoading(true);
    try {
      const res = await axios.post(
        "https://myapigenerator.onrender.com/auth/signUp",
        values,
        {
          headers: {
            Authorization: Token,
          },
        }
      );

      if (res.data.Status === "Success") {
        toast.success("User Created Successfully!");
        navigate("/");
      } else {
        toast.error("Sign up failed.");
      }
    } catch (error) {
      toast.error("Something went wrong!");
      console.error(error);
    } finally {
      setLoading(false);
      resetForm();
    }
  };

  return (
    <div className="bg-[#FFF8F8] flex items-center justify-center min-h-screen px-4">
      <div className="w-full max-w-md bg-white p-5 sm:p-8 rounded-[20px] shadow-xl">
        <div className="text-center mb-8">
          <h2 className="text-xl sm:text-2xl font-bold">
            Welcome to ShoesHub 👋
          </h2>
        </div>

        <Formik initialValues={initialValues} onSubmit={handleSubmit}>
          <Form className="flex flex-col gap-5">
            <div>
              <label
                htmlFor="name"
                className="block mb-1 font-medium text-gray-700"
              >
                Name
              </label>
              <Field name="name">
                {({ field }) => (
                  <Input
                    {...field}
                    placeholder="Andrews Stantham"
                    size="large"
                  />
                )}
              </Field>
            </div>

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
                    placeholder="Password"
                    iconRender={(visible) =>
                      visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                    }
                    size="large"
                  />
                )}
              </Field>
            </div>

            <Button
              htmlType="submit"
              size="large"
              className="bg-black text-white rounded-xl"
              block
              disabled={loading}
            >
              {loading ? <Loader /> : "Sign Up"}
            </Button>

            <Typography.Text className="text-center text-sm text-gray-600">
              Already have an account?{" "}
              <Link
                to="/"
                className="text-[#A98240] underline hover:text-[#8a6c34]"
              >
                Login
              </Link>
            </Typography.Text>
          </Form>
        </Formik>
        <Toaster />
      </div>
    </div>
  );
}

export default SignUp;
