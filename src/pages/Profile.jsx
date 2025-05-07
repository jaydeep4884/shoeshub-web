import React, { useRef, useState } from "react";
import { Card, Avatar, Input, Select, Button, Typography, Modal } from "antd";
import { motion } from "framer-motion";
import Footer from "../components/layout/Footer";
import Header from "../components/layout/Header";
import { Box, Container, IconButton } from "@mui/material";
import Breadcrumb from "../components/ui/Breadcrumb";
import { Field, Form, Formik } from "formik";

const { Option } = Select;

const Profile = () => {
  const [ini, setIni] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    city: "",
    mobile: "",
    bio: "",
    profileImage: "",
  });
  const breadItems = [{ label: "Home", link: "/home" }, { label: "Profile" }];
  const [open, setOpen] = React.useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const fileInputRef = useRef(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setProfileImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (values, { resetForm }) => {
    console.log(values);
    resetForm();
    handleClose();
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
            <Card className="rounded-2xl shadow-xl !w-full">
              <div className="flex flex-wrap items-center justify-between mb-6">
                <div className="flex items-center space-x-4">
                  <IconButton sx={{ p: 0 }}>
                    <Avatar
                      size={64}
                      alt="User"
                      src={
                        profileImage ||
                        "https://images.unsplash.com/photo-1740252117044-2af197eea287?q=80&w=2500&auto=format&fit=crop&ixlib=rb-4.0.3"
                      }
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
                <Button
                  type="primary"
                  className="mt-4 sm:mt-0 !order-last"
                  onClick={handleClickOpen}
                >
                  Update Profile
                </Button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2  gap-4 mb-6">
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
                <div className="flex flex-wrap items-center space-x-4">
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

            {/* Dialogue Box  */}
            <Modal
              title={
                <span className="text-xl font-semibold">Edit Your Profile</span>
              }
              open={open}
              onCancel={handleClose}
              footer={null}
              centered
              width={700}
              styles={{
                body: {
                  padding: 24,
                  backgroundColor: "#f9fafb",
                  borderRadius: 12,
                },
              }}
            >
              <Formik
                enableReinitialize
                initialValues={ini}
                onSubmit={handleSubmit}
              >
                <Form className="animate-fadeIn">
                  {/* Profile Image Upload Section */}
                  <Box className="flex flex-col items-center mb-6">
                    <img
                      src={
                        profileImage ||
                        "https://images.unsplash.com/photo-1740252117044-2af197eea287?q=80&w=2500&auto=format&fit=crop&ixlib=rb-4.0.3"
                      }
                      alt="Profile"
                      className="w-24 h-24 rounded-full object-contain shadow-md border-2 border-gray-200"
                    />
                    <label htmlFor="imageUpload" className="mt-3">
                      <input
                        id="imageUpload"
                        name="profileImage"
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="hidden"
                        ref={fileInputRef}
                      />
                      <Button
                        type="default"
                        className=" rounded-xl bg-gray-100 hover:bg-gray-200"
                        onClick={() => fileInputRef.current?.click()}
                      >
                        Change Photo
                      </Button>
                    </label>
                  </Box>

                  {/* Form Fields */}
                  <Box className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <Field
                      name="firstname"
                      as={Input}
                      placeholder="First Name *"
                      size="large"
                      className="rounded-xl"
                    />
                    <Field
                      name="lastname"
                      as={Input}
                      placeholder="Last Name"
                      size="large"
                      className="rounded-xl"
                    />
                    <Field
                      name="email"
                      as={Input}
                      type="email"
                      placeholder="Email"
                      size="large"
                      className="rounded-xl"
                    />
                    <Field
                      as={Input.Password}
                      name="password"
                      placeholder="Password"
                      size="large"
                      className="rounded-xl"
                    />
                    <Field
                      name="city"
                      as={Input}
                      placeholder="City"
                      size="large"
                      className="rounded-xl"
                    />
                    <Field
                      name="mobile"
                      as={Input}
                      maxLength={10}
                      placeholder="Mobile No."
                      size="large"
                      className="rounded-xl"
                    />
                  </Box>

                  <Field
                    as={Input.TextArea}
                    name="bio"
                    placeholder="Tell us about yourself..."
                    allowClear
                    size="large"
                    className="rounded-xl"
                    autoSize={{ minRows: 2, maxRows: 4 }}
                  />

                  <Box className="flex justify-end gap-3 mt-6">
                    <Button
                      onClick={handleClose}
                      className="rounded-xl border-gray-400"
                    >
                      Cancel
                    </Button>
                    <Button
                      htmlType="submit"
                      type="primary"
                      className="rounded-xl bg-blue-600 hover:bg-blue-700 text-white"
                    >
                      Save Changes
                    </Button>
                  </Box>
                </Form>
              </Formik>
            </Modal>
          </Box>
        </motion.div>
      </Container>

      <Footer />
    </>
  );
};

export default Profile;
