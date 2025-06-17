import axios from "axios";
import React, { createContext, useEffect, useState } from "react";

export const token = createContext("4aMp3nobXg24Lqun");

export const Context = createContext();

export const AuthProvider = ({ children }) => {
  const [coupon, setCoupon] = useState();

  const GetCoupon = async () => {
    try {
      await axios
        .get("https://generateapi.onrender.com/api/Coupon", {
          headers: { Authorization: "4aMp3nobXg24Lqun" },
        })
        .then((res) => {
          setCoupon(res.data?.Data[0]._id);
        });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    GetCoupon();
  }, []);

  return <Context.Provider value={{ coupon }}>{children}</Context.Provider>;
};
