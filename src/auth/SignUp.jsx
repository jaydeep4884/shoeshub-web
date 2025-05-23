import { Box, Button, Container } from "@mui/material";
import { Field, Form, Formik } from "formik";
import InputBox from "../components/ui/InputBox";
import { Link, useNavigate } from "react-router";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useContext } from "react";
import { token } from "../assets/contexts";

function SignUp() {
  const navigate = useNavigate();
  const Token = useContext(token);

  const initialValues = {
    name: "",
    email: "",
    password: "",
  };

  const handleSubmit = async (values, { resetForm }) => {
    console.log(values);

    const loadingToastId = toast.loading("Creating user...");

    try {
      const res = await axios.post(
        "https://generateapi.onrender.com/auth/signUp",
        values,
        {
          headers: {
            Authorization: Token,
          },
        }
      );
      toast.dismiss(loadingToastId); // Dismiss loading toast
      console.log(res.data);

      if (res.data.Status === "Success") {
        toast.success("User Created Successfully!");
        setTimeout(() => {
          navigate("/");
        }, 2000);
      }
    } catch (error) {
      toast.dismiss(loadingToastId);
      toast.error("Something went wrong!");
      console.error(error);
    }

    resetForm();
  };

  return (
    <Box className="bg-[#FFF8F8]">
      <Container maxWidth>
        <Box className="flex justify-center items-center min-h-screen">
          <Box className="bg-white p-12 shadow-xl rounded-[40px]">
            <h2 className="text-3xl font-bold mb-8">Welcome to ShoesHub 👋</h2>
            <Formik initialValues={initialValues} onSubmit={handleSubmit}>
              <Form className="flex flex-col gap-y-5">
                {["name", "email", "password"].map((fieldName, index) => {
                  const placeholders = {
                    name: "Andrews Stantham",
                    email: "you@example.com",
                    password: "Password",
                  };
                  const types = {
                    email: "email",
                    password: "password",
                  };
                  const label = fieldName;
                  return (
                    <Box key={index}>
                      <label className="!text-black" htmlFor={fieldName}>
                        {label}
                      </label>
                      <Field name={fieldName}>
                        {({ field, form }) => (
                          <InputBox
                            field={field}
                            form={form}
                            placeholder={placeholders[fieldName]}
                            type={types[fieldName] || "text"}
                          />
                        )}
                      </Field>
                    </Box>
                  );
                })}

                <Field
                  as={Button}
                  className="!bg-black !rounded-xl !py-[10px] !capitalize !text-lg"
                  variant="contained"
                  type="submit"
                >
                  Sign Up
                </Field>

                <p className="text-center">
                  Already Have an Account?{" "}
                  <Link to="/" className="underline">
                    Login
                  </Link>
                </p>
              </Form>
            </Formik>
          </Box>
        </Box>
      </Container>
      <Toaster />
    </Box>
  );
}

export default SignUp;

// USER = [
//   {
//     name: "test",
//     email: "test@gmail.com",
//     password: "test",
//   },
//   {
//     name: "mansi",
//     email: "mansi@gmail.com",
//     password: "mansi",
//   },
// ];
