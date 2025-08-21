import React, { useContext, useEffect, useState } from "react";
import { Button, Modal, Table, Popconfirm, Space, Input } from "antd";
import { PlusCircleOutlined, QuestionCircleOutlined } from "@ant-design/icons";
import { Field, Form, Formik } from "formik";
import axios from "axios";
import { baseUrl, token } from "../../assets/contexts";
import Loader from "../../components/ui/Loader";
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
  const apiUrl = useContext(baseUrl);
  const Token = useContext(token);

  const fetchContacts = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`${apiUrl}/contact`, {
        headers: { Authorization: Token },
      });
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
        await axios.patch(`${apiUrl}/contact/${Id}`, payload, {
          headers: { Authorization: Token },
        });
        toast.success("Feedback Updated ✅");
      } else {
        await axios.post(`${apiUrl}/contact`, payload, {
          headers: { Authorization: Token },
        });
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
      await axios.delete(`${apiUrl}/contact/${id}`, {
        headers: { Authorization: Token },
      });
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
    // eslint-disable-next-line
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
            description="Are you sure?"
            onConfirm={() => handleDelete(record._id)}
            okText="Yes"
            cancelText="No"
            icon={<QuestionCircleOutlined style={{ color: "red" }} />}
          >
            <Button danger size="small">
              Delete
            </Button>
          </Popconfirm>
          <Button size="small" onClick={() => handleEdit(record)}>
            Update
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div className="p-4 w-full">
      <div className="flex justify-end mb-4">
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

      {/* ✅ Desktop Table */}
      <div className="hidden md:block">
        <div className="overflow-x-auto bg-white rounded shadow">
          <Table
            dataSource={contacts}
            columns={columns}
            rowKey="_id"
            bordered
            pagination={false}
            locale={{
              emptyText: loading ? <Loader /> : "No Feedback available",
            }}
          />
        </div>
      </div>

      {/* ✅ Mobile Cards */}
      <div className="md:hidden space-y-4">
        {loading ? (
          <Loader />
        ) : contacts.length === 0 ? (
          <p className="text-center text-gray-500">No Feedback available</p>
        ) : (
          contacts.map((item, index) => (
            <div
              key={item._id}
              className="border rounded-lg p-4 shadow-sm bg-white"
            >
              <p className="text-sm">
                <strong>No:</strong> {index + 1}
              </p>
              <p className="text-sm">
                <strong>Name:</strong> {item.name}
              </p>
              <p className="text-sm">
                <strong>Email:</strong> {item.email}
              </p>
              <p className="text-sm">
                <strong>Message:</strong> {item.messege}
              </p>
              <div className="flex gap-2 mt-3 justify-end">
                <Button size="small" onClick={() => handleEdit(item)}>
                  Update
                </Button>
                <Popconfirm
                  title="Are you sure?"
                  onConfirm={() => handleDelete(item._id)}
                  okText="Yes"
                  cancelText="No"
                  icon={<QuestionCircleOutlined style={{ color: "red" }} />}
                >
                  <Button size="small" danger>
                    Delete
                  </Button>
                </Popconfirm>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Modal Form */}
      <Modal
        open={open}
        onCancel={() => {
          setOpen(false);
          setId(null);
        }}
        footer={null}
        title={Id ? "Update Feedback" : "Add Feedback"}
        centered
        className="!max-w-[90vw]"
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
              className="w-full"
            />
            <Field
              as={Input}
              name="email"
              placeholder="Email"
              size="large"
              className="w-full"
            />
            <Field
              as={Input.TextArea}
              name="messege"
              placeholder="Message"
              size="large"
              className="w-full"
              rows={4}
            />
            <div className="flex justify-end gap-3 mt-4">
              <Button onClick={() => setOpen(false)}>Cancel</Button>
              <Button type="primary" htmlType="submit" loading={loading}>
                {Id ? "Update" : "Create"}
              </Button>
            </div>
          </Form>
        </Formik>
      </Modal>

      <Toaster />
    </div>
  );
};

export default Contacts;
