import { Box, Button, InputBase } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useFormikContext } from "formik";
import axios from "axios";
import { baseUrl, token } from "../../assets/contexts";

function Applycoup() {
  // eslint-disable-next-line
  const { values, setFieldValue } = useFormikContext();
  const [coupons, setCoupons] = useState([]);
  const [enteredCode, setEnteredCode] = useState("");
  const Token = useContext(token);
  const apiUrl = useContext(baseUrl);

  const fetchCouponCode = async () => {
    try {
      const res = await axios.get(`${apiUrl}/Coupon`, {
        headers: {
          Authorization: Token,
        },
      });

      setCoupons(res.data?.Data || []);
    } catch (err) {
      console.error("Failed to fetch coupons:", err);
    }
  };

  // Coupone Fatch Succusesfully : JAKAS420
  const checkCode = () => {
    const code = enteredCode.trim().toUpperCase();
    const matchCoupon = coupons.find(
      (coupon) => coupon.coupon.toUpperCase() === code
    );

    if (matchCoupon) {
      setFieldValue("couponCode", matchCoupon._id);
      toast.success("Coupon Applied 🎉✨");
    } else {
      setFieldValue("couponCode", "");
      toast.error("Invalid Coupon Code 🙄");
    }
    setEnteredCode("");
  };

  useEffect(() => {
    fetchCouponCode();
    // eslint-disable-next-line
  }, []);

  return (
    <Box className="flex gap-3">
      <InputBase
        value={enteredCode}
        onChange={(e) => setEnteredCode(e.target.value)}
        placeholder="Coupon Code"
        className="flex-1 px-3 py-2 border border-gray-400 rounded placeholder-gray-500"
      />
      <Button
        variant="contained"
        onClick={checkCode}
        className="!capitalize !text-white !font-medium !bg-[#DB4444] hover:!bg-[#cf7e7e] !rounded !px-5 !py-2 !shadow-none"
      >
        Apply Coupon
      </Button>
    </Box>
  );
}

export default Applycoup;
