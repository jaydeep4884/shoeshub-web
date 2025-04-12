import React, { useState } from "react";
import { Box, Button, Container, Link, Typography } from "@mui/material";
import { Field, Form, Formik } from "formik";
import InputBox from "../componets/InputBox";

function SignUp(props) {
  const [ini, setIni] = useState({
    name: "",
    email: "",
    mobile: "",
    address: "",
    password: "",
  });

  const handleSubmit = async (values, { resetForm }) => {
    console.log(values);
    resetForm();
  };
  return (
    <Box className="bg-[#FFF8F8]">
      <Container maxWidth>
        <Box className="flex justify-center items-center  min-h-screen">
          <Box className="bg-white p-12 shadow-xl rounded-[40px] ">
            <h2 className="text-3xl font-bold mb-8">Welcome to ShoesHub 👋</h2>
            <Formik
              enableReinitialize
              initialValues={ini}
              onSubmit={handleSubmit}
            >
              <Form className="flex flex-col gap-y-5">
                <Box>
                  <label className="!text-black" htmlFor="Name">
                    Name
                  </label>
                  <Field name="name">
                    {({ field, form }) => (
                      <InputBox
                        field={field}
                        form={form}
                        placeholder="Andrews Stantham"
                      />
                    )}
                  </Field>
                </Box>

                <Box>
                  <label className=" !text-black" htmlFor="Email">
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
                  <label className=" !text-black" htmlFor="Phone No.">
                    Phone No.
                  </label>
                  <Field name="mobile">
                    {({ field, form }) => (
                      <InputBox
                        field={field}
                        form={form}
                        placeholder="+91 956 8972 525"
                        type="number"
                      />
                    )}
                  </Field>
                </Box>

                <Box>
                  <label className=" !text-black" htmlFor="Address">
                    Address
                  </label>
                  <Field name="address">
                    {({ field, form }) => (
                      <InputBox
                        field={field}
                        form={form}
                        placeholder="Enter your Address"
                      />
                    )}
                  </Field>
                </Box>

                <Box>
                  <label className=" !text-black" htmlFor="Password">
                    Password
                  </label>
                  <Field name="password">
                    {({ field, form }) => (
                      <InputBox
                        field={field}
                        form={form}
                        placeholder="at least 8 characters"
                        type="password"
                      />
                    )}
                  </Field>
                </Box>

                {/* Primary Button  */}
                <Field
                  as={Button}
                  className="!bg-black !rounded-xl !py-[10px] !capitalize !text-lg"
                  variant="contained"
                  type="submit"
                >
                  Sign Up
                </Field>
                <Typography className="text-center">
                  Already Have An Account ? <Link>Login</Link>
                </Typography>
              </Form>
            </Formik>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

export default SignUp;
