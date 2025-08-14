import React, { useContext, useEffect, useState } from "react";
import { Button, Modal, Table, Popconfirm, message, Space, Input } from "antd";
import {
  BulbOutlined,
  PlusCircleOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";
import { Field, Form, Formik } from "formik";
import axios from "axios";
import { token } from "../../assets/contexts";
import Loader from "../../components/ui/Loader";

const Category = () => {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const Token = useContext(token);
  const [id, setId] = useState(null);
  const [initialValues, setInitialValues] = useState({ cat_name: "" });

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        "https://generateapi.onrender.com/api/category",
        {
          headers: { Authorization: Token },
        }
      );
      setData(res.data?.Data || []);
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
      if (id) {
        await axios.patch(
          `https://generateapi.onrender.com/api/category/${id}`,
          payload,
          { headers: { Authorization: Token } }
        );
        message.success("Category Updated ✅");
      } else {
        await axios.post(
          "https://generateapi.onrender.com/api/category",
          payload,
          { headers: { Authorization: Token } }
        );
        message.success("Category Added ✅");
      }
      fetchCategories();
      setOpen(false);
      resetForm();
      setId(null);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const deleteCategory = async (id) => {
    try {
      await axios.delete(
        `https://generateapi.onrender.com/api/category/${id}`,
        { headers: { Authorization: Token } }
      );
      message.success("Category Deleted ✅");
      fetchCategories();
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  const updateCategory = (el) => {
    setOpen(true);
    setInitialValues({ cat_name: el.cat_name });
    setId(el._id);
  };

  useEffect(() => {
    fetchCategories();
    // eslint-disable-next-line
  }, []);

  const columns = [
    {
      title: "No.",
      render: (_, __, index) => index + 1,
    },
    {
      title: "Category Name",
      dataIndex: "cat_name",
    },
    {
      title: "Actions",
      render: (_, record) => (
        <Space>
          <Popconfirm
            title="Delete the Category?"
            description="Are you sure you want to delete this category?"
            onConfirm={() => deleteCategory(record._id)}
            okText="Yes"
            cancelText="No"
            icon={<QuestionCircleOutlined style={{ color: "red" }} />}
          >
            <Button danger type="primary">
              Delete
            </Button>
          </Popconfirm>
          <Button type="default" onClick={() => updateCategory(record)}>
            Update
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <>
      <div className=" flex justify-end mb-5">
        <Button
          type="primary"
          icon={<PlusCircleOutlined />}
          onClick={() => setOpen(true)}
        >
          Create Category
        </Button>
      </div>

      <Table
      className=""
        dataSource={data}
        columns={columns}
        locale={{
          emptyText: loading ? <Loader /> : "No data available",
        }}
        rowKey={(record) => record._id}
        bordered
        pagination={false}
      />

      <Modal
        open={open}
        onCancel={() => {
          setOpen(false);
          setId(null);
        }}
        footer={null}
        title={id ? "Update Category" : "Create Category"}
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
              name="cat_name"
              placeholder="Category Name"
              fullWidth
              size="large"
              required
              prefix={<BulbOutlined />}
            />
            <div className="flex justify-end gap-4 mt-4">
              <Button onClick={() => setOpen(false)}>Cancel</Button>
              <Button type="primary" htmlType="submit" loading={loading}>
                {id ? "Update" : "Create"}
              </Button>
            </div>
          </Form>
        </Formik>
      </Modal>
    </>
  );
};

export default Category;
