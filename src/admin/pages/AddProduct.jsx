import React, { useContext, useEffect, useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import AddIcon from "@mui/icons-material/AddCircleOutline";
import { Field, Form, Formik } from "formik";
import axios from "axios";
import { token } from "../../assets/contexts";
import Loader from "../../components/Loader";
import toast, { Toaster } from "react-hot-toast";

const API_URL = "https://generateapi.onrender.com/api/category";

const initialFormValues = {
  pro_name: "",
  pro_rating: "",
  review: "",
  new_price: "",
  old_price: "",
  type: "",
  typeofheel: "",
  waterlevel: "",
  material: "",
  images: "",
  cat_name: "",
};

const ProductFormFields = () => (
  <Grid container spacing={2}>
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
      { name: "images", label: "Product Image", type: "file" },
      { name: "cat_name", label: "Category Name" },
    ].map(({ name, label, type = "text" }) => (
      <Grid item xs={12} sm={6} key={name}>
        <Field
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
      </Grid>
    ))}
  </Grid>
);

const Category = () => {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const Token = useContext(token);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const headers = { Authorization: Token };

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const res = await axios.get(API_URL, { headers });
      setData(res.data?.Data || []);
    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (values, { resetForm }) => {
    setLoading(true);
    values.user_id = JSON.parse(localStorage.getItem("userId")) || "";
    try {
      const res = await axios.post(API_URL, values, { headers });
      setData((prev) => [...prev, res.data.Data]);
      toast.success("Category Added!");
      resetForm();
      setOpen(false);
    } catch (err) {
      console.error("Submit error:", err);
    } finally {
      setLoading(false);
    }
  };

  const deleteCategory = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`, { headers });
      toast.success("Category Deleted!");
      fetchCategories();
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <>
      <Button
        variant="contained"
        className="!capitalize !float-end !mb-5"
        onClick={() => setOpen(true)}
      >
        <AddIcon /> &nbsp;New Product
      </Button>

      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        fullWidth
        maxWidth="sm"
        fullScreen={fullScreen}
      >
        <DialogTitle>Create New Product</DialogTitle>
        <Formik initialValues={initialFormValues} onSubmit={handleSubmit}>
          <Form>
            <DialogContent>
              <ProductFormFields />
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setOpen(false)}>Cancel</Button>
              <Button type="submit" color="success" variant="contained">
                Add Product
              </Button>
            </DialogActions>
          </Form>
        </Formik>
      </Dialog>

      <TableContainer component={Paper} className="shadow-lg rounded-xl">
        <Table>
          <TableHead>
            <TableRow className="bg-gray-100">
              <TableCell>No.</TableCell>
              <TableCell>Category Name</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <Loader />
            ) : (
              data.map((item, i) => (
                <TableRow key={item._id} className="hover:bg-gray-100">
                  <TableCell>{i + 1}</TableCell>
                  <TableCell>{item.cat_name}</TableCell>
                  <TableCell align="center">
                    <Box className="flex justify-center gap-3">
                      <Button
                        color="error"
                        variant="contained"
                        onClick={() => deleteCategory(item._id)}
                      >
                        Delete
                      </Button>
                      <Button color="success" variant="contained">
                        Update
                      </Button>
                    </Box>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <Toaster />
    </>
  );
};

export default Category;
