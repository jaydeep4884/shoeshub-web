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
  const [selectedCategory, setSelectedCategory] = useState(null);
  const Token = useContext(token);

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
    } catch {
      toast.error("Failed to load data.");
    }
  };

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
      if (id) {
        await axios
          .patch(
            `https://generateapi.onrender.com/api/product/${id}`,
            formData,
            {
              headers: {
                Authorization: Token,
                "Content-Type": "multipart/form-data",
              },
            }
          )
          .then(() => {
            toast.success("Product Updated!");
            setId(null);
            fetchData();
            handleModelClose();
          });
      } else {
        await axios
          .post("https://generateapi.onrender.com/api/product/", formData, {
            headers: {
              Authorization: Token,
              "Content-Type": "multipart/form-data",
            },
          })
          .then(() => {
            toast.success("Product Added !");
            fetchData();
            setOpen(false);
            handleModelClose();
          });
        resetForm();
      }
    } catch {
      toast.error("Failed to save product.");
    }
  };

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
      cat_name: product.cat_name?._id || "",
    });
    setId(product._id);
    setOpen(true);
  };

  const deleteProduct = async (productId) => {
    try {
      await axios.delete(
        `https://generateapi.onrender.com/api/product/${productId}`,
        { headers: { Authorization: Token } }
      );
      toast.success("Product Deleted!");
      fetchData();
    } catch {
      toast.error("Failed to delete product.");
    }
  };

  const ProductFormFields = ({ setFieldValue, values }) => {
    const textFields = [
      { name: "pro_name", placeholder: "Product Name" },
      { name: "type", placeholder: "Product Type" },
      { name: "typeofheel", placeholder: "Type of Heel" },
      { name: "waterlevel", placeholder: "Water Level" },
      { name: "material", placeholder: "Material" },
    ];

    const numberFields = [
      { name: "pro_rating", min: 0, max: 5, placeholder: "Rating" },
      { name: "review", min: 0, placeholder: "Reviews" },
      { name: "new_price", min: 0, placeholder: "New Price" },
      { name: "old_price", min: 0, placeholder: "Old Price" },
    ];

    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {textFields.map(({ name, placeholder }) => (
          <Field key={name} name={name}>
            {({ field }) => <Input {...field} placeholder={placeholder} />}
          </Field>
        ))}
        {numberFields.map(({ name, min, max, placeholder }) => (
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

  const handleCategorySelect = ({ key }) => {
    setSelectedCategory(key === "all" ? null : key);
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line
  }, []);

  const filteredProducts = selectedCategory
    ? data.filter((product) => product.cat_name?.cat_name === selectedCategory)
    : data;

  const menuItems = [
    { key: "all", label: "All Categories" },
    ...catData.map((cat) => ({
      key: cat.cat_name,
      label: cat.cat_name,
    })),
  ];

  const handleModelClose = () => {
    setOpen(false);
    setInitialValues({
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
  };

  return (
    <div>
      <div className="flex justify-between items-stretch mb-4">
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => setOpen(true)}
        >
          Add Product
        </Button>
        <Dropdown menu={{ items: menuItems, onClick: handleCategorySelect }}>
          <Button>
            <Space>
              {selectedCategory || "All Categories"} <DownOutlined />
            </Space>
          </Button>
        </Dropdown>
      </div>

      {loading ? (
        <Loader />
      ) : filteredProducts.length === 0 ? (
        <Typography className="text-center">No products found.</Typography>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredProducts.map((product) => (
            <div
              key={product._id}
              className="border rounded-lg p-2 bg-white shadow"
            >
              <div className="bg-[#DDD]">
                <img
                  src={product.images?.[0]}
                  alt={product.pro_name}
                  className="w-full  h-[15rem] sm:h-40 object-cover rounded mb-2"
                />
              </div>
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
                Category: {product.cat_name?.cat_name || "Unknown"}
              </Typography>
              <div className="flex justify-between mt-3">
                <Button
                  icon={<EditOutlined />}
                  onClick={() => updateProduct(product)}
                >
                  Edit
                </Button>
                <Button
                  icon={<DeleteOutlined />}
                  danger
                  onClick={() => deleteProduct(product._id)}
                >
                  Delete
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      <Modal
        title={id ? "Update Product" : "Add Product"}
        open={open}
        onCancel={handleModelClose}
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
