import React, { useRef, useState } from "react";
import { Card, Avatar, Input, Button, Typography, Modal } from "antd";
import Footer from "../components/layout/Footer";
import Header from "../components/layout/Header";
import { Box, IconButton } from "@mui/material";
import Breadcrumb from "../components/ui/Breadcrumb";
import { Field, Form, Formik } from "formik";
import PageContainer from "../components/ui/PageContainer";

const Profile = () => {
  const [ini, setIni] = useState({
    firstname: "Sagathiya",
    lastname: "Jaydeep",
    email: "jaydeep@gmail.com",
    password: "Jakaas420",
    city: "Surat",
    mobile: "2211485698",
    bio: "Passionated Developer",
    profileImage:
      "https://images.unsplash.com/photo-1740252117044-2af197eea287?q=80&w=2500&auto=format&fit=crop&ixlib=rb-4.0.3",
  });

  const fields = [
    { label: "First Name", name: "firstname" },
    { label: "Last Name", name: "lastname" },
    { label: "Email", name: "email" },
    { label: "Password", name: "password" },
    { label: "City", name: "city" },
    { label: "Mobile No.", name: "mobile" },
    { label: "Bio", name: "bio", isTextArea: true },
  ];

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
    setIni(values);
    resetForm();
    handleClose();
  };

  return (
    <>
      <Header />
      <PageContainer>
        <Box className="pb-3 sm:pb-5">
          <Breadcrumb items={breadItems} />
          <Card className="rounded-2xl shadow-xl !w-full p-3 sm:p-5 ">
            <Box className="flex flex-wrap items-center justify-between mb-6">
              <Box className="flex items-center space-x-4">
                <IconButton sx={{ p: 0 }}>
                  <Avatar
                    size={64}
                    alt="User"
                    src={profileImage || ini.profileImage}
                  />
                </IconButton>
                <Box>
                  <Typography.Title level={3} className="!m-0">
                    {ini.firstname} {ini.lastname}
                  </Typography.Title>
                  <Typography.Text type="secondary">
                    {ini.email}
                  </Typography.Text>
                </Box>
              </Box>
              <Button
                type="primary"
                className="mt-4 sm:mt-0 !order-last"
                onClick={handleClickOpen}
              >
                Update Profile
              </Button>
            </Box>

            <Box className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {fields.map(({ label, name, isTextArea }) => (
                <Box
                  className={`flex flex-col ${isTextArea ? "md:col-span-2" : ""}`}
                >
                  <label className="mb-1 text-gray-600 text-sm md:text-base">
                    {label}
                  </label>
                  {isTextArea ? (
                    <Input.TextArea
                      value={ini[name]}
                      disabled
                      size="large"
                      autoSize={{ minRows: 2, maxRows: 4 }}
                    />
                  ) : (
                    <Input value={ini[name]} size="large" disabled />
                  )}
                </Box>
              ))}
            </Box>

            <Box className="mb-4">
              <Typography.Title level={5} className="mb-2">
                My email Address
              </Typography.Title>
              <Box className="flex flex-wrap items-center space-x-4">
                <Avatar size="small" style={{ backgroundColor: "#1890ff" }}>
                  ✓
                </Avatar>
                <Box>
                  <Typography.Text>alexarawles@gmail.com</Typography.Text>
                  <Box className="text-gray-500 text-sm">1 month ago</Box>
                </Box>
              </Box>
              <Button
                type="dashed"
                className="mt-4 text-blue-500 border-blue-500"
              >
                + Add Email Address
              </Button>
            </Box>
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
                {fields.map(({ label, name, isTextArea }) => (
                  <Box key={name} className="flex flex-col mb-4">
                    <label className="mb-1 text-gray-600">{label}</label>
                    <Field
                      name={name}
                      as={isTextArea ? Input.TextArea : Input}
                      placeholder={label}
                      size="large"
                      autoSize={
                        isTextArea ? { minRows: 2, maxRows: 4 } : undefined
                      }
                    />
                  </Box>
                ))}

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
      </PageContainer>
      <Footer />
    </>
  );
};

export default Profile;
