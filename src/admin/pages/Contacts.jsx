import React, { useContext, useEffect, useState } from "react";
import { Button, Modal, Table, Popconfirm, Space, Input } from "antd";
import { PlusCircleOutlined, QuestionCircleOutlined } from "@ant-design/icons";
import { Field, Form, Formik } from "formik";
import axios from "axios";
import { token } from "../../assets/contexts";
import Loader from "../../components/Loader";
import toast, { Toaster } from "react-hot-toast";

const Contacts = () => {
  const [open, setOpen] = useState(false);
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [Id, setId] = useState(null);
  const [initialValues, setInitialValues] = useState({
    name: "",
    email: "",
    messege: "",
  });

  const Token = useContext(token);

  const fetchContacts = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        "https://generateapi.onrender.com/api/contact",
        {
          headers: { Authorization: Token },
        }
      );
      setContacts(data?.Data || []);
    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (values, { resetForm }) => {
    setLoading(true);
    const payload = {
      ...values,
      user_id: JSON.parse(localStorage.getItem("userId")) || "",
    };

    try {
      if (Id) {
        await axios.patch(
          `https://generateapi.onrender.com/api/contact/${Id}`,
          payload,
          {
            headers: { Authorization: Token },
          }
        );
        toast.success("Feedback Updated ✅");
      } else {
        await axios.post(
          "https://generateapi.onrender.com/api/contact",
          payload,
          {
            headers: { Authorization: Token },
          }
        );
        toast.success("Feedback Added ✅");
      }
      fetchContacts();
      setOpen(false);
      resetForm();
      setId(null);
    } catch (err) {
      console.error("Submit error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `${"https://generateapi.onrender.com/api/contact"}/${id}`,
        {
          headers: { Authorization: Token },
        }
      );
      toast.success("Feedback Deleted ✅");
      fetchContacts();
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  const handleEdit = (el) => {
    setOpen(true);
    setInitialValues({ name: el.name, email: el.email, messege: el.messege });
    setId(el._id);
  };

  useEffect(() => {
    fetchContacts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const columns = [
    {
      title: "No.",
      render: (_, __, index) => index + 1,
    },
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "messege",
      dataIndex: "messege",
    },
    {
      title: "Actions",
      render: (_, record) => (
        <Space>
          <Popconfirm
            title="Delete the Feedback?"
            description="Are you sure you want to delete this feedback?"
            onConfirm={() => handleDelete(record._id)}
            okText="Yes"
            cancelText="No"
            icon={<QuestionCircleOutlined style={{ color: "red" }} />}
          >
            <Button danger type="primary">
              Delete
            </Button>
          </Popconfirm>
          <Button type="default" onClick={() => handleEdit(record)}>
            Update
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <>
      <div className="flex justify-end mb-5">
        <Button
          type="primary"
          icon={<PlusCircleOutlined />}
          onClick={() => {
            setInitialValues({ name: "", email: "", messege: "" });
            setId(null);
            setOpen(true);
          }}
        >
          Add Feedback
        </Button>
      </div>

      <Table
        dataSource={contacts}
        columns={columns}
        rowKey="_id"
        bordered
        pagination={false}
        locale={{ emptyText: loading ? <Loader /> : "No Feedback available" }}
      />

      <Modal
        open={open}
        onCancel={() => {
          setOpen(false);
          setId(null);
        }}
        footer={null}
        title={Id ? "Update Feedback" : "Add Feedback"}
        centered
      >
        <Formik
          enableReinitialize
          initialValues={initialValues}
          onSubmit={handleSubmit}
        >
          <Form className="space-y-4">
            <Field
              as={Input}
              name="name"
              placeholder="Full Name"
              size="large"
            />
            <Field as={Input} name="email" placeholder="Email" size="large" />
            <Field
              as={Input.TextArea}
              name="messege"
              placeholder="messege"
              size="large"
            />
            <div className="flex justify-end gap-4 mt-4">
              <Button onClick={() => setOpen(false)}>Cancel</Button>
              <Button type="primary" htmlType="submit" loading={loading}>
                {Id ? "Update" : "Create"}
              </Button>
            </div>
          </Form>
        </Formik>
      </Modal>

      <Toaster />
    </>
  );
};

export default Contacts;
