import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  Link,
  TextField,
  Typography,
} from "@mui/material";
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
                  <Field
                    as={TextField}
                    name="name"
                    placeholder="Andrews Stantham"
                    variant="outlined"
                    className="w-full "
                    sx={TextFieldStyle}
                  />
                </Box>

                <Box>
                  <label className=" !text-black" htmlFor="Email">
                    Email
                  </label>
                  <Field
                    as={TextField}
                    name="email"
                    placeholder="Example@email.com"
                    type="email"
                    variant="outlined"
                    className="w-full "
                    sx={TextFieldStyle}
                    required
                  />
                </Box>

                <Box>
                  <label className=" !text-black" htmlFor="Phone No.">
                    Phone No.
                  </label>
                  <Field
                    as={TextField}
                    name="mobile"
                    placeholder="+91 956 8972 525"
                    type="number"
                    variant="outlined"
                    className="w-full "
                    sx={TextFieldStyle}
                  />
                </Box>

                <Box>
                  <label className=" !text-black" htmlFor="Address">
                    Address
                  </label>
                  <Field
                    as={TextField}
                    name="address"
                    placeholder="Enter your currunt Address"
                    variant="outlined"
                    className="w-full "
                    sx={TextFieldStyle}
                  />
                </Box>

                <Box>
                  <label className=" !text-black" htmlFor="Password">
                    Password
                  </label>
                  <Field
                    as={TextField}
                    name="password"
                    placeholder="at least 8 characters"
                    variant="outlined"
                    type="password"
                    className="w-full "
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

const TextFieldStyle = {
  "& .MuiOutlinedInput-root": {
    borderRadius: "12px",
    backgroundColor: "#C9DBD54D",
    padding: 0,
    "& input": {
      padding: "12px 16px",
    },
  },
};
