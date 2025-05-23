import * as React from "react";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { Field, Form, Formik } from "formik";
import { useState } from "react";

export default function Category() {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState([]);
  const [ini, setIni] = useState({
    cat_name: "",
  });

  const handleSubmit = (values, { resetForm }) => {
    console.log(values);
    setData([...data, values]);
    setOpen(false);
    resetForm();
  };

  return (
    <>
      <Button
        className="gap-1 !capitalize !float-end !mb-5"
        variant="contained"
        onClick={() => setOpen(true)}
      >
        <AddCircleOutlineIcon />
        Create Category
      </Button>

      {/* Model  */}
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        maxWidth="sm"
        fullWidth="true"
      >
        <DialogTitle className="!pb-2">Create New Category !!</DialogTitle>
        <Formik enableReinitialize initialValues={ini} onSubmit={handleSubmit}>
          <Form>
            <DialogContent className="!pt-0">
              <Field
                as={TextField}
                autoFocus
                required
                name="cat_name"
                label="Category Name"
                fullWidth
                variant="standard"
              />
              <DialogActions className="!mt-4 ">
                <Button
                  variant="contained"
                  className="!capitalize"
                  onClick={() => setOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  className="!capitalize"
                  color="success"
                >
                  Add Category
                </Button>
              </DialogActions>
            </DialogContent>
          </Form>
        </Formik>
      </Dialog>

      {/* Table  */}
      <TableContainer component={Paper} className="shadow-lg rounded-xl">
        <Table aria-label="simple table">
          <TableHead>
            <TableRow className="bg-gray-100">
              <TableCell className="font-semibold text-gray-700">No.</TableCell>
              <TableCell className="font-semibold text-gray-700">
                Category Name
              </TableCell>
              <TableCell className="font-semibold text-gray-700" align="center">
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((el, i) => (
              <TableRow
                key={i}
                className="hover:bg-gray-100 transition-all duration-200"
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell>{i + 1}</TableCell>
                <TableCell>{el.cat_name}</TableCell>
                <TableCell align="center">
                  <Box className="flex justify-center gap-3">
                    <Button
                      variant="contained"
                      color="error"
                      className="!capitalize "
                    >
                      Delete
                    </Button>
                    <Button
                      variant="contained"
                      color="success"
                      className="!capitalize "
                    >
                      Update
                    </Button>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
