import React from "react";
import { Card, Avatar, Input, Select, Button, Typography } from "antd";
import { motion } from "framer-motion";
import Footer from "../components/layout/Footer";
import Header from "../components/layout/Header";
import {
  Box,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Option } from "antd/es/mentions";
import Breadcrumb from "../components/ui/Breadcrumb";

const Profile = () => {
  const breadItems = [{ label: "Home", link: "/home" }, { label: "Profile" }];
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Header />
      <Container maxWidth="lg">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Box className="py-8 sm:py-10">
            <Breadcrumb items={breadItems} />
            <Card className="rounded-2xl shadow-xl p-6 !w-full">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-4">
                  <IconButton sx={{ p: 0 }}>
                    <Avatar
                      size={64}
                      alt="User"
                      src="https://images.unsplash.com/photo-1740252117044-2af197eea287?q=80&w=2500&auto=format&fit=crop&ixlib=rb-4.0.3"
                    />
                  </IconButton>
                  <div>
                    <Typography.Title level={3} className="!m-0">
                      Sagathiya Jaydeep
                    </Typography.Title>
                    <Typography.Text type="secondary">
                      jaydeep@gmail.com
                    </Typography.Text>
                  </div>
                </div>
                <Button type="primary" onClick={handleClickOpen}>
                  Update Profile
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <Input placeholder="Full Name" size="large" disabled />
                <Input placeholder="Nick Name" size="large" disabled />
                <Select placeholder="Gender" size="large" disabled>
                  <Option value="male">Male</Option>
                  <Option value="female">Female</Option>
                </Select>
                <Input placeholder="Country" size="large" disabled />
                <Select placeholder="Language" size="large" disabled>
                  <Option value="english">English</Option>
                  <Option value="ukrainian">Ukrainian</Option>
                </Select>
                <Select placeholder="Time Zone" size="large" disabled>
                  <Option value="gmt+2">GMT+2</Option>
                  <Option value="gmt+3">GMT+3</Option>
                </Select>
              </div>

              <div className="mb-4">
                <Typography.Title level={5} className="mb-2">
                  My email Address
                </Typography.Title>
                <div className="flex items-center space-x-4">
                  <Avatar size="small" style={{ backgroundColor: "#1890ff" }}>
                    ✓
                  </Avatar>
                  <div>
                    <Typography.Text>alexarawles@gmail.com</Typography.Text>
                    <div className="text-gray-500 text-sm">1 month ago</div>
                  </div>
                </div>
                <Button
                  type="dashed"
                  className="mt-4 text-blue-500 border-blue-500"
                >
                  + Add Email Address
                </Button>
              </div>
            </Card>
          </Box>

          <Dialog
            fullScreen={fullScreen}
            open={open}
            onClose={handleClose}
            aria-labelledby="responsive-dialog-title"
          >
            <DialogTitle id="responsive-dialog-title">
              {"Use Google's location service?"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText>
                Let Google help apps determine location. This means sending
                anonymous location data to Google, even when no apps are
                running.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button autoFocus onClick={handleClose}>
                Disagree
              </Button>
              <Button onClick={handleClose} autoFocus>
                Agree
              </Button>
            </DialogActions>
          </Dialog>
        </motion.div>
      </Container>
      <Footer />
    </>
  );
};

export default Profile;
