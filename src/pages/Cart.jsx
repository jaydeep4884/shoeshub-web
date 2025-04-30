import {
  Box,
  Breadcrumbs,
  Container,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  Select,
  MenuItem,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  useMediaQuery,
  useTheme,
  InputBase,
} from "@mui/material";
import React, { useState } from "react";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import { Link } from "react-router";
import shoesThumb from "../components/img/shoes/shoes-01-01.png";
import LocalMallIcon from "@mui/icons-material/LocalMall";

function Cart() {
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const [cartItem, setCartItem] = useState([
    {
      id: 1,
      name: "Air Pegasus 37 Running Shoes",
      price: 6500,
      quantity: 1,
      image: shoesThumb,
    },
  ]);

  const handleQtyChange = (id, newQty) => {
    setCartItem((preItems) =>
      preItems.map((item) =>
        item.id === id ? { ...item, quantity: newQty } : item
      )
    );
  };
  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const subtotal = cartItem?.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <>
      <Header />
      <Container maxWidth="lg">
        <Box className="py-5 sm:py-10">
          <Breadcrumbs aria-label="breadcrumb" className="mb-6 sm:!mb-10">
            <Link to="/">
              <Typography>Home</Typography>
            </Link>
            <Typography className="text-black font-medium">Cart</Typography>
          </Breadcrumbs>

          {/* Cart Table */}
          <Box className="relative w-full overflow-x-auto rounded-xl shadow-md mb-7">
            <Box
              className="min-w-[700px] bg-white bg-opacity-60 backdrop-blur-md rounded-xl scroll-smooth overflow-x-auto scrollbar-thin scrollbar-thumb-[#DB4444]/70 scrollbar-track-transparent hover:scrollbar-thumb-[#DB4444] transition-all duration-300"
              style={{ WebkitOverflowScrolling: "touch" }}
            >
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>No.</TableCell>
                    <TableCell>Product</TableCell>
                    <TableCell align="right">Price</TableCell>
                    <TableCell align="right">Quantity</TableCell>
                    <TableCell align="center">Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {cartItem.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>{item.id}</TableCell>
                      <TableCell>
                        <Box className="flex items-center gap-4">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-16 h-16 object-contain"
                          />
                          <Typography>{item.name}</Typography>
                        </Box>
                      </TableCell>
                      <TableCell align="right">${item.price}</TableCell>
                      <TableCell align="right">
                        <Select
                          value={item.quantity}
                          onChange={(e) =>
                            handleQtyChange(item.id, parseInt(e.target.value))
                          }
                          size="small"
                        >
                          {[1, 2, 3, 4, 5].map((qty) => (
                            <MenuItem value={qty} key={qty}>
                              {qty}
                            </MenuItem>
                          ))}
                        </Select>
                      </TableCell>
                      <TableCell align="center">
                        <Button
                          variant="contained"
                          color="secondary"
                          startIcon={<LocalMallIcon />}
                          onClick={handleClickOpen}
                          className="!capitalize font-medium"
                        >
                          Buy Now
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Box>

          {/* Return to Shop Button */}
          <Link to="/">
            <Button
              variant="outlined"
              className="!capitalize !text-black !font-medium hover:!bg-[#c63b3b] hover:!text-white !rounded !px-5 !py-2"
            >
              Return To Shop
            </Button>
          </Link>

          {/* Coupon + Cart Summary */}
          <Box className="flex flex-col lg:flex-row justify-between items-start gap-6 mt-10">
            {/* Coupon */}
            <Box className="w-full lg:w-1/2 flex gap-3">
              <InputBase
                placeholder="Coupon Code"
                className="flex-1 px-3 py-2 border border-gray-400 rounded placeholder-gray-500"
              />
              <Button
                variant="contained"
                className="!capitalize !text-white !font-medium !bg-[#DB4444] hover:!bg-[#cf7e7e] !rounded !px-5 !py-2 !shadow-none"
              >
                Apply Coupon
              </Button>
            </Box>

            {/* Cart Total */}
            <Box className="w-full lg:w-[40%] border rounded-md px-5 py-7">
              <Typography variant="h6" className="!mb-6 font-medium">
                Cart Total
              </Typography>
              <Box className="flex justify-between border-b pb-2 mb-4">
                <span>Subtotal:</span>
                <span>${subtotal}</span>
              </Box>
              <Box className="flex justify-between border-b pb-2 mb-4">
                <span>Shipping:</span>
                <span>Free</span>
              </Box>
              <Box className="flex justify-between pb-2 mb-4">
                <span>Total:</span>
                <span>${subtotal}</span>
              </Box>
              <Button
                variant="contained"
                className="!capitalize w-full !text-white !font-medium !bg-[#DB4444] hover:!bg-[#cf7e7e] !rounded !px-5 !py-2 !shadow-none"
              >
                Proceed To Checkout
              </Button>
            </Box>
          </Box>
        </Box>

        {/* Dialog */}
        <Dialog fullScreen={fullScreen} open={open} onClose={handleClose}>
          <DialogTitle>Buy Confirmation</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Are you sure you want to proceed with your purchase?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button autoFocus onClick={handleClose}>
              Cancel
            </Button>
            <Button onClick={handleClose} autoFocus>
              Confirm
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
      <Footer />
    </>
  );
}

export default Cart;
