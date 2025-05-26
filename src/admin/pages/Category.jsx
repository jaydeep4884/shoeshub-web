import React, { useContext, useEffect, useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import AddIcon from "@mui/icons-material/AddCircleOutline";
import { Field, Form, Formik } from "formik";
import axios from "axios";
import { token } from "../../assets/contexts";
import Loader from "../../components/Loader";
import toast, { Toaster } from "react-hot-toast";

const Category = () => {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const Token = useContext(token);
  const initialValues = { cat_name: "" };

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
    values.user_id = JSON.parse(localStorage.getItem("userId")) || "";
    try {
      const res = await axios.post(
        "https://generateapi.onrender.com/api/category",
        values,
        {
          headers: { Authorization: Token },
        }
      );
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
      await axios.delete(
        `https://generateapi.onrender.com/api/category/${id}`,
        {
          headers: { Authorization: Token },
        }
      );
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

  return (
    <>
      <Button
        variant="contained"
        className="!capitalize !float-end !mb-5"
        onClick={() => setOpen(true)}
      >
        <AddIcon /> Create Category
      </Button>

      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle className="!pb-2">Create New Category</DialogTitle>
        <Formik
          enableReinitialize
          initialValues={initialValues}
          onSubmit={handleSubmit}
        >
          <Form>
            <DialogContent className="!pt-0">
              {loading ? (
                <Box className="flex justify-center">
                  <Loader />
                </Box>
              ) : (
                <>
                  <Field
                    as={TextField}
                    name="cat_name"
                    label="Category Name"
                    fullWidth
                    required
                    autoFocus
                    variant="standard"
                  />
                  <DialogActions>
                    <Button onClick={() => setOpen(false)}>Cancel</Button>
                    <Button type="submit" color="success" variant="contained">
                      Add Category
                    </Button>
                  </DialogActions>
                </>
              )}
            </DialogContent>
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
