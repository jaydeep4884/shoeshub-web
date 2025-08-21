import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";

export const token = createContext(process.env.REACT_APP_API_KEY);
export const baseUrl = createContext(`${process.env.REACT_APP_API_URL}api`);

export const Context = createContext();
export const AuthProvider = ({ children }) => {
  const [coupon, setCoupon] = useState();
  const apiUrl = useContext(baseUrl);
  const Token = useContext(token);
  const GetCoupon = async () => {
    try {
      await axios
        .get(`${apiUrl}/Coupon`, {
          headers: { Authorization: Token },
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
    // eslint-disable-next-line
  }, []);

  return <Context.Provider value={{ coupon }}>{children}</Context.Provider>;
};
