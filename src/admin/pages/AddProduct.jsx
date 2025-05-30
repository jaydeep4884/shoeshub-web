import React, { useContext, useEffect, useState } from "react";
import { Field, Form, Formik } from "formik";
import axios from "axios";
import { token } from "../../assets/contexts";
import Loader from "../../components/Loader";
import toast, { Toaster } from "react-hot-toast";
import {
  Modal,
  Button,
  Input,
  InputNumber,
  Select,
  Rate,
  Typography,
  Dropdown,
  Space,
} from "antd";
import {
  PlusOutlined,
  DeleteOutlined,
  EditOutlined,
  DownOutlined,
} from "@ant-design/icons";

const { Option } = Select;

const Category = () => {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState([]);
  const [catData, setCatData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [id, setId] = useState(null);
  const Token = useContext(token);

  const menuItems = catData.map((cat) => ({
    key: cat._id,
    label: cat.cat_name,
  }));

  const [initialValues, setInitialValues] = useState({
    pro_name: "",
    pro_rating: "",
    review: "",
    new_price: "",
    old_price: "",
    type: "",
    typeofheel: "",
    waterlevel: "",
    material: "",
    images: [],
    cat_name: "",
  });

  // GET CATEGORY AND PRODUCT DATA
  const fetchData = async () => {
    setLoading(true);
    try {
      const [products, categories] = await Promise.all([
        axios.get("https://generateapi.onrender.com/api/product", {
          headers: { Authorization: Token },
        }),
        axios.get("https://generateapi.onrender.com/api/category", {
          headers: { Authorization: Token },
        }),
      ]);
      setData(products.data?.Data || []);
      setCatData(categories.data?.Data || []);
      setLoading(false);
    } catch (err) {
      toast.error("Failed to load data.");
      console.log(err);
    }
  };

  // CREATE AND UPDATE PRODUCT
  const handleSubmit = async (values, { resetForm }) => {
    const formData = new FormData();
    Object.entries(values).forEach(([key, val]) => {
      if (key === "images" && Array.isArray(val)) {
        val.forEach((img) => formData.append("images", img));
      } else {
        formData.append(key, val);
      }
    });
    formData.append("user_id", JSON.parse(localStorage.getItem("userId")));

    try {
      const config = {
        headers: {
          Authorization: Token,
          "Content-Type": "multipart/form-data",
        },
      };
      if (id) {
        await axios.patch(
          `https://generateapi.onrender.com/api/product/${id}`,
          formData,
          config
        );
        toast.success("Product Updated!");
      } else {
        await axios
          .post(
            "https://generateapi.onrender.com/api/product",
            formData,
            config
          )
          .then((res) => {
            console.log(res.data);
          });
        toast.success("Product Added!");
      }
      resetForm();
      setOpen(false);
      setId(null);
      fetchData();
    } catch (error) {
      toast.error("Failed to save product.");
      console.log(error);
    }
  };

  // UPDATE PRODUCT
  const updateProduct = (product) => {
    setInitialValues({
      pro_name: product.pro_name,
      pro_rating: product.pro_rating,
      review: product.review,
      new_price: product.new_price,
      old_price: product.old_price,
      type: product.type,
      typeofheel: product.typeofheel,
      waterlevel: product.waterlevel,
      material: product.material,
      images: product.images,
      cat_name: product.cat_name,
    });
    setId(product._id);
    setOpen(true);
  };

  // DELETE PRODUCT
  const deleteProduct = async (productId) => {
    try {
      await axios.delete(
        `https://generateapi.onrender.com/api/product/${productId}`,
        {
          headers: { Authorization: Token },
        }
      );
      toast.success("Product Deleted!");
      fetchData();
    } catch (error) {
      toast.error("Failed to delete.");
      console.log(error);
    }
  };

  // PRODUCT FIELD
  const ProductFormFields = ({ setFieldValue, values }) => {
    const fields = [
      { name: "pro_name", placeholder: "Product Name" },
      { name: "type", placeholder: "Product Type" },
      { name: "typeofheel", placeholder: "Type of Heel" },
      { name: "waterlevel", placeholder: "Water Level" },
      { name: "material", placeholder: "Material" },
    ];

    const numbers = [
      { name: "pro_rating", min: 0, max: 5, placeholder: "Rating" },
      { name: "review", min: 0, placeholder: "Reviews" },
      { name: "new_price", min: 0, placeholder: "New Price" },
      { name: "old_price", min: 0, placeholder: "Old Price" },
    ];

    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {fields.map(({ name, placeholder }) => (
          <Field key={name} name={name}>
            {({ field }) => (
              <Input {...field} placeholder={placeholder} required />
            )}
          </Field>
        ))}
        {numbers.map(({ name, min, max, placeholder }) => (
          <Field key={name} name={name}>
            {({ field }) => (
              <InputNumber
                {...field}
                min={min}
                max={max}
                className="w-full"
                placeholder={placeholder}
                onChange={(val) => setFieldValue(name, val)}
              />
            )}
          </Field>
        ))}
        <Select
          placeholder="Select Category"
          onChange={(val) => setFieldValue("cat_name", val)}
          value={values.cat_name}
          className="w-full"
        >
          {catData.map((cat) => (
            <Option key={cat._id} value={cat._id}>
              {cat.cat_name}
            </Option>
          ))}
        </Select>
        <div className="col-span-1 sm:col-span-2">
          <p className="text-sm mb-1">Upload Images</p>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={(e) =>
              setFieldValue("images", Array.from(e.target.files))
            }
          />
          <p className="text-xs text-gray-500 mt-1">
            {values.images.length} image(s) selected
          </p>
        </div>
      </div>
    );
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <div className="flex justify-between items-stretch">
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => setOpen(true)}
          className="mb-4 "
        >
          Add Product
        </Button>
        <Dropdown menu={{ items: menuItems }}>
          <Button>
            <Space>
              Categories <DownOutlined />
            </Space>
          </Button>
        </Dropdown>
      </div>

      {/* CARD  */}
      {loading ? (
        <Loader />
      ) : data.length === 0 ? (
        <Typography>No products found.</Typography>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {data.map((product) => (
            <div
              key={product._id}
              className="border rounded-lg p-2 bg-white shadow"
            >
              <img
                src={product.images?.[0] || "https://via.placeholder.com/150"}
                alt={product.pro_name}
                className="w-full h-40 object-cover rounded mb-2"
              />
              <h3 className="text-lg font-semibold">{product.pro_name}</h3>
              <Rate
                disabled
                defaultValue={product.pro_rating}
                allowHalf
                style={{ fontSize: "15px" }}
              />

              <Typography className="text-base font-bold">
                ${product.new_price}
                <span className="line-through text-gray-400 ml-2">
                  ${product.old_price}
                </span>
              </Typography>

              <Typography className="text-gray-600 text-sm">
                {product.review} reviews
              </Typography>

              <Typography className="text-gray-600 text-sm">
                Category : {product.cat_name?.cat_name || "Unknown"}
              </Typography>

              <div className="flex justify-between mt-3">
                <Button
                  icon={<EditOutlined />}
                  onClick={() => updateProduct(product)}
                  loading={loading}
                >
                  Edit
                </Button>
                <Button
                  icon={<DeleteOutlined />}
                  danger
                  onClick={() => deleteProduct(product._id)}
                  loading={loading}
                >
                  Delete
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* MODEL  */}
      <Modal
        title={id ? "Update Product" : "Add Product"}
        open={open}
        onCancel={() => setOpen(false)}
        footer={null}
        destroyOnClose
        centered
      >
        <Formik
          initialValues={initialValues}
          enableReinitialize
          onSubmit={handleSubmit}
        >
          {({ setFieldValue, values }) => (
            <Form>
              <ProductFormFields
                setFieldValue={setFieldValue}
                values={values}
              />
              <Button
                type="primary"
                htmlType="submit"
                className="w-full mt-4"
                loading={loading}
              >
                {id ? "Update Product" : "Add Product"}
              </Button>
            </Form>
          )}
        </Formik>
      </Modal>

      <Toaster position="top-center" />
    </div>
  );
};

export default Category;
