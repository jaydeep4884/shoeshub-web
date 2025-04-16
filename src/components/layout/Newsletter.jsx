import { Box, Container } from "@mui/material";
import { Input } from "antd";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";

function Newsletter() {
  return (
    <Box className="py-20 bg-white">
      <Container maxWidth="lg">
        <Box className="flex justify-center">
          <Box className="flex justify-center flex-col gap-y-5 items-center md:w-[60%]">
            <h2 className="text-[32px] font-semibold tracking-[4%] text-center">
              Subscribe to our newsletter to get updates to our latest
              collections
            </h2>

            <p className="tracking-[4%] font-medium opacity-60 text-center">
              Get 20% off on your first order just by subscribing to our
              newsletter
            </p>

            <Box className="flex items-stretch gap-x-2">
              <Input
                className="min-w-[375px]"
                size="large"
                placeholder="Enter your email"
                prefix={<EmailOutlinedIcon className="opacity-50" />}
              />
              <button className="bg-black text-white rounded-[10px] py-2 px-8 font-medium text-lg">
                Subscribe
              </button>
            </Box>

            <p className="tracking-[4%] font-semibold opacity-60 text-center">
              You will be able to unsubscribe at any time.
              <br /> Kindly read our Privacy Policy.
            </p>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

export default Newsletter;
