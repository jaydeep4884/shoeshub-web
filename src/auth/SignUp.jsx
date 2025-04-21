import { Box, Button, Container } from "@mui/material";
import { Field, Form, Formik } from "formik";
import InputBox from "../components/ui/InputBox";
import { Link, useNavigate } from "react-router";
import axios from "axios";

function SignUp() {
  const navigate = useNavigate();
  const Token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3Zjc1YTc3YmYzMzczMGY5NjI0ZTFmMiIsImlhdCI6MTc0NDI2Mzc5OX0.1TIh6YZqgiekXJZ_qzns74n2HCIqD57idf1bJ_5rFZQ";

  const initialValues = {
    name: "",
    email: "",
    password: "",
  };

  const handleSubmit = async (values, { resetForm }) => {
    console.log(values);
    try {
      await axios
        .post("https://ecommerce-karv.onrender.com/", values, {
          headers: {
            Authorization: Token,
          },
        })
        .then((res) => {
          console.log(res.data);
          navigate("/login");
          alert("User Created Successfully !");
        });
    } catch (error) {
      console.log(error);
    }

    // navigate("/");
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
                    password: "at least 8 characters",
                  };
                  const types = {
                    email: "email",
                    password: "password",
                  };
                  const label =
                    fieldName.charAt(0).toUpperCase() +
                    fieldName.slice(1).replace("mobile", "Phone No.");

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
                  <Link to="/login" className="underline">
                    Login
                  </Link>
                </p>
              </Form>
            </Formik>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

export default SignUp;
