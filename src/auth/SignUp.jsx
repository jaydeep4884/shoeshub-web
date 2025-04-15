import { Box, Button, Container } from "@mui/material";
import { Field, Form, Formik } from "formik";
import InputBox from "../components/ui/InputBox";
import { Link, useNavigate } from "react-router";

function SignUp() {
  const navigate = useNavigate();

  const initialValues = {
    name: "",
    email: "",
    mobile: "",
    address: "",
    password: "",
  };

  const handleSubmit = async (values, { resetForm }) => {
    console.log(values);
    navigate("/");
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
                {["name", "email", "mobile", "address", "password"].map(
                  (fieldName, index) => {
                    const placeholders = {
                      name: "Andrews Stantham",
                      email: "you@example.com",
                      mobile: "+91 956 8972 525",
                      address: "Enter your Address",
                      password: "at least 8 characters",
                    };
                    const types = {
                      email: "email",
                      mobile: "number",
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
                  }
                )}

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
