import {
  Box,
  Breadcrumbs,
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
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
} from "@mui/material";
import React from "react";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import { Link } from "react-router";
import shoesThumb from "../components/img/shoes/shoes-01-01.png";
import LocalMallIcon from "@mui/icons-material/LocalMall";

const cartItems = [
  {
    id: 1,
    name: "Air Pegasus 37 Running Shoes",
    price: 650,
    quantity: 1,
    image: shoesThumb,
  },
];

function Cart() {
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Header />
      <Container maxWidth="lg">
        <Box className="py-5 sm:py-10">
          <Breadcrumbs aria-label="breadcrumb" className="!mb-6 sm:!mb-10">
            <Link to="/">
              <Typography>Home</Typography>
            </Link>
            <Typography className="text-black !font-medium">Cart</Typography>
          </Breadcrumbs>

          {/* Table */}
          <TableContainer component={Paper} className="rounded-xl shadow-md">
            <Table sx={{ minWidth: 650 }}>
              <TableHead>
                <TableRow>
                  <TableCell className="!font-semibold">No.</TableCell>
                  <TableCell className="!font-semibold">Product</TableCell>
                  <TableCell className="!font-semibold" align="right">
                    Price
                  </TableCell>
                  <TableCell className="!font-semibold" align="right">
                    Quantity
                  </TableCell>
                  <TableCell className="!font-semibold" align="center">
                    Action
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {cartItems.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>{item.id}</TableCell>
                    <TableCell>
                      <Box className="flex items-center gap-4">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-16 h-16 object-contain"
                        />
                        <Typography className="!font-medium">
                          {item.name}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell align="right">${item.price}</TableCell>
                    <TableCell align="right">
                      <Select
                        value={item.quantity}
                        size="small"
                        variant="outlined"
                        sx={{ minWidth: 60 }}
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
                        className="!capitalize !font-medium"
                        startIcon={<LocalMallIcon />}
                        onClick={handleClickOpen}
                      >
                        Buy Now
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          {/* Responsive Dialog Box */}
          <Dialog
            fullScreen={fullScreen}
            open={open}
            onClose={handleClose}
            aria-labelledby="responsive-dialog-title"
          >
            <DialogTitle id="responsive-dialog-title">
              {"Use Google's location service?"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText>
                Let Google help apps determine location. This means sending
                anonymous location data to Google, even when no apps are
                running.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button autoFocus onClick={handleClose}>
                Disagree
              </Button>
              <Button onClick={handleClose} autoFocus>
                Agree
              </Button>
            </DialogActions>
          </Dialog>
        </Box>
      </Container>
      <Footer />
    </>
  );
}

export default Cart;
