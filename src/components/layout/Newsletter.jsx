import { Box, Container } from "@mui/material";
import { Input } from "antd";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import { Field, Form, Formik } from "formik";

function Newsletter() {
  const handleSubmit = (values, { resetForm }) => {
    console.log(values);
    resetForm();
  };

  return (
    <Box className="py-10 sm:py-16 px-4 ">
      <Container maxWidth="lg">
        <Box className="flex justify-center">
          <Box className="flex flex-col items-center gap-y-5 w-full md:w-[80%] lg:w-[60%] ">
            <h2 className="text-xl sm:text-3xl font-semibold tracking-[4%] text-center">
              Subscribe to our newsletter to get updates to our latest
              collections
            </h2>

            <p className="tracking-[4%] font-medium opacity-60 text-center text-sm sm:text-base">
              Get 20% off on your first order just by subscribing to our
              newsletter
            </p>

            <Box className="w-full">
              <Formik
                enableReinitialize
                initialValues={{ email: "" }}
                onSubmit={handleSubmit}
              >
                <Form className="flex flex-col sm:flex-row items-stretch gap-3 w-full">
                  <Field
                    as={Input}
                    name="email"
                    size="large"
                    placeholder="Enter your email"
                    prefix={<EmailOutlinedIcon className="opacity-20" />}
                    className="w-full"
                    required
                  />
                  <button
                    type="submit"
                    className="bg-black text-white rounded-[10px] py-2 px-6 font-medium text-base sm:text-lg w-full sm:w-auto"
                  >
                    Subscribe
                  </button>
                </Form>
              </Formik>
            </Box>

            <p className="tracking-[4%] font-semibold opacity-60 text-center text-sm sm:text-base">
              You will be able to unsubscribe at any time.
              <br />
              Kindly read our Privacy Policy.
            </p>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

export default Newsletter;
