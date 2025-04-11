import React, { useState } from "react";
import { Box, Button, Container, TextField } from "@mui/material";
import { Field, Form, Formik } from "formik";

function SignUp() {
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
        <Box className="flex justify-center items-center  pt-14">
          <Box className="bg-white py-11 shadow-xl rounded-[56px] px-16">
            <h2 className="text-4xl font-bold mb-8">Welcome to ShoesHub 👋</h2>
            <Formik
              enableReinitialize
              initialValues={ini}
              onSubmit={handleSubmit}
            >
              <Form className="flex flex-col gap-y-8">
                <Box>
                  <label className="!text-black" htmlFor="Name">
                    Name
                  </label>
                  <Field
                    as={TextField}
                    name="name"
                    placeholder="Andrews Stantham"
                    variant="outlined"
                    className="w-full !mt-2"
                    sx={TextFieldStyle}
                  />
                </Box>

                <Box>
                  <label className="mb-2 !text-black" htmlFor="Email">
                    Email
                  </label>
                  <Field
                    as={TextField}
                    name="email"
                    placeholder="Example@email.com"
                    type="email"
                    variant="outlined"
                    className="w-full !mt-2"
                    sx={TextFieldStyle}
                    required
                  />
                </Box>

                <Box>
                  <label className="mb-2 !text-black" htmlFor="Phone No.">
                    Phone No.
                  </label>
                  <Field
                    as={TextField}
                    name="mobile"
                    placeholder="+91 956 8972 525"
                    type="number"
                    variant="outlined"
                    className="w-full !mt-2"
                    sx={TextFieldStyle}
                  />
                </Box>

                <Box>
                  <label className="mb-2 !text-black" htmlFor="Address">
                    Address
                  </label>
                  <Field
                    as={TextField}
                    name="address"
                    placeholder="Enter your currunt Address"
                    variant="outlined"
                    className="w-full !mt-2"
                    sx={TextFieldStyle}
                  />
                </Box>

                <Box>
                  <label className="mb-2 !text-black" htmlFor="Password">
                    Password
                  </label>
                  <Field
                    as={TextField}
                    name="password"
                    placeholder="at least 8 characters"
                    variant="outlined"
                    type="password"
                    className="w-full !mt-2"
                    sx={TextFieldStyle}
                  />
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
              </Form>
            </Formik>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

export default SignUp;

const TextFieldStyle = {
  "& .MuiOutlinedInput-root": {
    borderRadius: "12px",
    backgroundColor: "#C9DBD54D",
    padding: 0,
    "& input": {
      padding: "14px 20px",
    },
  },
};
