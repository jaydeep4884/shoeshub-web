import React, { useContext, useEffect, useState } from "react";
import {
  Box,
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
import { QuestionCircleOutlined } from "@ant-design/icons";
import { Button, Popconfirm } from "antd";

const Category = () => {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const Token = useContext(token);
  const [id, setId] = useState(null);
  const [initialValues, setinitialValues] = useState({ cat_name: "" });

  // GET ALL CATEGORY
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

  // CREATE CATEGORY
  const handleSubmit = async (values, { resetForm }) => {
    setLoading(true);
    values.user_id = JSON.parse(localStorage.getItem("userId")) || "";

    if (id !== null) {
      console.log("Id Found :", id);
      try {
        await axios
          .patch(
            `https://generateapi.onrender.com/api/category/${id}`,
            values,
            {
              headers: {
                Authorization: Token,
              },
            }
          )
          .then(() => {
            fetchCategories();
            resetForm();
            setOpen(false);
            setId(null);
            setLoading(false);
            toast.success("Category Updated ✅");
          });
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log("Id Not Found !");
      try {
        await axios
          .post("https://generateapi.onrender.com/api/category", values, {
            headers: { Authorization: Token },
          })
          .then(() => {
            toast.success("Category Added!");
            resetForm();
            setOpen(false);
            setLoading(false);
            fetchCategories();
          });
      } catch (err) {
        console.error("Submit error:", err);
      }
    }
  };

  // DELETE CATEGORY
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

  // UPDATE CATEGORY
  const updateCategory = (el) => {
    setOpen(true);
    setinitialValues({
      cat_name: el.cat_name,
    });
    setId(el._id);
  };

  useEffect(() => {
    fetchCategories();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <Button
        type="primary"
        className=" !capitalize !py-4 !float-end !mb-5"
        onClick={() => setOpen(true)}
      >
        <AddIcon /> Create Category
      </Button>

      {/* MODAL  */}
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
                <Button
                  color="blue"
                  variant="solid"
                  onClick={() => setOpen(false)}
                >
                  Cancel
                </Button>
                <Button htmlType="submit" color="purple" variant="solid">
                  Add Category
                </Button>
              </DialogActions>
            </DialogContent>
          </Form>
        </Formik>
      </Dialog>

      {/* TABLE  */}
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
                      <Popconfirm
                        title="Delete the Category !!"
                        description="Are you sure to delete this Category ?"
                        icon={
                          <QuestionCircleOutlined style={{ color: "red" }} />
                        }
                        onConfirm={() => deleteCategory(item._id)}
                      >
                        <Button type="primary" danger>
                          Delete
                        </Button>
                      </Popconfirm>

                      <Button
                        color="green"
                        type="primary"
                        onClick={() => updateCategory(item)}
                      >
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
