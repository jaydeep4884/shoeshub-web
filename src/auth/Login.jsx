import { Box, Button, Container, Typography } from "@mui/material";
import { Field, Form, Formik } from "formik";
import InputBox from "../components/ui/InputBox";
import { Link, useNavigate } from "react-router";
import axios from "axios";
import { useContext, useState } from "react";
import { token } from "../assets/contexts";
import toast, { Toaster } from "react-hot-toast";
import Loader from "../components/Loader";

function Login() {
  const navigate = useNavigate();
  const Token = useContext(token);
  const [Loading, setLoading] = useState(false);

  const initialValues = {
    email: "",
    password: "",
  };

  const handleSubmit = async (values, { resetForm }) => {
    const payload = {
      ...values,
      user_id: JSON.parse(localStorage.getItem("userId")) || "",
    };
    setLoading(true);

    try {
      const res = await axios.post(
        "https://generateapi.onrender.com/auth/login",
        payload,
        {
          headers: {
            Authorization: Token,
          },
        }
      );
      if (res.data.Status === "Success") {
        toast.success("Login Successfully"); // USER_1 ram@gmail.com
        navigate("/home");
        setLoading(false);
      }
    } catch (error) {
      toast.error("Email and Password Incorrect !!");
      console.log(error);
    }
    resetForm();
  };

  return (
    <>
      <Box className="bg-[#FFF8F8] flex items-center h-screen">
        <Container maxWidth="sm">
          <Box className="bg-white shadow-xl px-6 sm:px-10 py-10 sm:py-10 rounded-3xl">
            <Box className="mb-10 text-center">
              <h2 className="text-2xl sm:text-3xl font-bold mb-4">
                Welcome Back 👋
              </h2>
              <Typography className="text-sm text-gray-600">
                Today is a new day. It's your day. You shape it. <br />
                Sign in to start purchasing new shoes!
              </Typography>
            </Box>

            <Formik initialValues={initialValues} onSubmit={handleSubmit}>
              <Form className="flex flex-col gap-5">
                <Box>
                  <label
                    htmlFor="email"
                    className="block mb-1 font-medium text-gray-700"
                  >
                    Email
                  </label>
                  <Field name="email">
                    {({ field, form }) => (
                      <InputBox
                        field={field}
                        form={form}
                        placeholder="you@example.com"
                        type="email"
                      />
                    )}
                  </Field>
                </Box>

                <Box>
                  <label
                    htmlFor="password"
                    className="block mb-1 font-medium text-gray-700"
                  >
                    Password
                  </label>
                  <Field name="password">
                    {({ field, form }) => (
                      <InputBox
                        field={field}
                        form={form}
                        placeholder="At least 8 characters"
                        type="password"
                      />
                    )}
                  </Field>
                  <p className="text-end mt-2 text-[#A98240] text-sm hover:underline cursor-pointer">
                    Forgot Password?
                  </p>
                </Box>

                <Field
                  as={Button}
                  type="submit"
                  variant="contained"
                  fullWidth
                  className="!bg-black !py-3 !text-white !rounded-xl !text-lg"
                >
                  {Loading ? <Loader /> : "Login"}
                </Field>

                <Typography className="text-center text-sm text-gray-600">
                  Don’t have an account?{" "}
                  <Link
                    to="/signup"
                    className="text-[#A98240] underline hover:text-[#8a6c34]"
                  >
                    Register
                  </Link>
                </Typography>
              </Form>
            </Formik>
          </Box>
        </Container>
        <Toaster />
      </Box>
    </>
  );
}

export default Login;
