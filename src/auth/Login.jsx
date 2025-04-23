import { Box, Button, Container, Typography } from "@mui/material";
import { Field, Form, Formik } from "formik";
import InputBox from "../components/ui/InputBox";
import { Link, useNavigate } from "react-router";

function Login() {
  const navigate = useNavigate();

  const initialValues = {
    email: "",
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
          <Box className="bg-white px-12 py-20 shadow-xl min-w-[35%] rounded-[40px]">
            <Box className="mb-10">
              <h2 className="text-3xl font-bold mb-5">Welcome Back 👋</h2>
              <Typography className="text-sm">
                Today is a new day. It's your day. You shape it. <br />
                Sign in to start Purchasing New Shoes!!
              </Typography>
            </Box>

            <Formik initialValues={initialValues} onSubmit={handleSubmit}>
              <Form className="flex flex-col gap-y-5">
                <Box>
                  <label className="!text-black" htmlFor="email">
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
                  <label className="!text-black" htmlFor="password">
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
                  <p className="text-end mt-6 text-[#A98240] cursor-pointer ">
                    Forgot Password?
                  </p>
                </Box>

                <Field
                  as={Button}
                  className="!bg-black !rounded-xl !py-[10px] !capitalize !text-lg"
                  variant="contained"
                  type="submit"
                >
                  Login
                </Field>

                <p className="text-center ">
                  If you don't have an account,{" "}
                  <Link to="/signup" className="underline">
                    Register
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

export default Login;
