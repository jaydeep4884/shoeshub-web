import React, { useContext, useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Rating,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import AddIcon from "@mui/icons-material/AddCircleOutline";
import { Field, Form, Formik } from "formik";
import axios from "axios";
import { token } from "../../assets/contexts";
import Loader from "../../components/Loader";
import toast, { Toaster } from "react-hot-toast";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

const Category = () => {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const Token = useContext(token);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [ini, setIni] = useState({
    pro_name: "",
    pro_rating: "",
    review: "",
    new_price: "",
    old_price: "",
    type: "",
    typeofheel: "",
    waterlevel: "",
    material: "",
    images: null,
    cat_name: "",
  });

  // ALL PRODUCTS
  const fetchCategories = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        "https://generateapi.onrender.com/api/product",
        {
          headers: {
            Authorization: Token,
          },
        }
      );
      setData(res.data?.Data || []);
      setLoading(false);
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  // CREATE PRODUCT
  const handleSubmit = async (values, { resetForm }) => {
    const formData = new FormData();

    formData.append("pro_name", values.pro_name.trim());
    formData.append("pro_rating", parseFloat(values.pro_rating));
    formData.append("review", parseInt(values.review));
    formData.append("new_price", parseFloat(values.new_price));
    formData.append("old_price", parseFloat(values.old_price));
    formData.append("type", values.type || "");
    formData.append("typeofheel", values.typeofheel || "");
    formData.append("waterlevel", values.waterlevel || "");
    formData.append("material", values.material || "");
    formData.append("cat_name", values.cat_name.trim());

    if (values.images instanceof File) {
      const imgdata = formData.append("images", values.images);
      console.log(imgdata);
    } else {
      toast.error("Please select a valid image file.");
      return;
    }

    formData.append(
      "user_id",
      JSON.parse(localStorage.getItem("userId")) || ""
    );
    // try {
    //   const res = await axios.post(
    //     "https://generateapi.onrender.com/api/product",
    //     formData,
    //     {
    //       headers: {
    //         Authorization: Token,
    //         "Content-Type": "multipart/form-data",
    //       },
    //     }
    //   );
    //   setData((prev) => [...prev, res.data.Data]);
    //   toast.success("Product Added !!");
    //   resetForm();
    //   setOpen(false);
    //   fetchCategories();
    // } catch (error) {
    //   console.log(error);
    // }
    console.log("Product Data : ", values);
  };

  // DELETE PRODUCT
  const deleteCategory = async (id) => {
    try {
      await axios.delete(`https://generateapi.onrender.com/api/product/${id}`, {
        headers: {
          Authorization: Token,
        },
      });
      toast.success("Category Deleted!");
      fetchCategories();
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  useEffect(() => {
    fetchCategories();
    // eslint-disable-next-line
  }, []);

  const ProductFormFields = ({ setFieldValue }) => (
    <Box className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {[
        { name: "pro_name", label: "Product Name" },
        { name: "pro_rating", label: "Product Rating", type: "number" },
        { name: "review", label: "Review Count", type: "number" },
        { name: "new_price", label: "New Price", type: "number" },
        { name: "old_price", label: "Original Price", type: "number" },
        { name: "type", label: "Product Type" },
        { name: "typeofheel", label: "Type Of Heel" },
        { name: "waterlevel", label: "Water Level" },
        { name: "material", label: "Material" },
        { name: "cat_name", label: "Category Name" },
      ].map(({ name, label, type = "text" }) => (
        <Field
          key={name}
          as={TextField}
          name={name}
          label={label}
          type={type}
          fullWidth
          required={
            name !== "type" && name !== "typeofheel" && name !== "material"
          }
          variant="standard"
        />
      ))}

      {/* File Upload Field */}
      <Box>
        <Typography variant="body2" className="!mb-1">
          Product Image
        </Typography>
        <input
          type="file"
          name="images"
          accept="image/*"
          onChange={(event) => {
            setFieldValue("images", event.currentTarget.files[0]);
          }}
        />
      </Box>
    </Box>
  );

  return (
    <>
      <Box className="flex justify-end !mb-5">
        <Button
          variant="contained"
          className="!capitalize "
          onClick={() => setOpen(true)}
        >
          <AddIcon /> &nbsp;New Product
        </Button>
      </Box>

      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        maxWidth="sm"
        fullScreen={fullScreen}
      >
        <DialogTitle className="!pb-2">Create New Product</DialogTitle>
        <Formik initialValues={ini} onSubmit={handleSubmit}>
          {({ setFieldValue }) => (
            <Form>
              <DialogContent className="!pt-0">
                <ProductFormFields setFieldValue={setFieldValue} />
              </DialogContent>
              <DialogActions>
                <Button
                  variant="contained"
                  color="error"
                  className="!capitalize"
                  onClick={() => setOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  className="!capitalize"
                  type="submit"
                  color="warning"
                  variant="contained"
                >
                  Add Product
                </Button>
              </DialogActions>
            </Form>
          )}
        </Formik>
      </Dialog>

      {loading ? (
        <Loader />
      ) : (
        <Box className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-3 sm:gap-5 ">
          {data.map((item, i) => (
            <Card
              key={i}
              className="!shadow-lg border border-[#ddd] !rounded-md"
            >
              <CardMedia
                component="img"
                className="w-full object-cover h-[150px] sm:h-[200px] "
                image={item.images}
                alt={item.pro_name}
              />
              <CardContent className="!p-3">
                <Typography className="!text-sm">{item.pro_name}</Typography>
                <Typography className="text-base !font-semibold">
                  {item.new_price}
                </Typography>
                <Rating
                  name="read-only"
                  value={item.pro_rating}
                  size="small"
                  readOnly
                />
                <Box className="flex gap-1 justify-end">
                  <IconButton
                    aria-label="delete"
                    className="!p-1"
                    onClick={() => deleteCategory(item._id)}
                  >
                    <DeleteIcon className="text-gray-400" />
                  </IconButton>
                  <IconButton aria-label="delete" className="!p-1">
                    <EditIcon className="text-gray-400" />
                  </IconButton>
                </Box>
              </CardContent>
            </Card>
          ))}
        </Box>
      )}

      <Toaster />
    </>
  );
};

export default Category;
