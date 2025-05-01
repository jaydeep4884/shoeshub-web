import { Button } from "@mui/material";
import React from "react";

export default function Buttongroup(props) {
  return (
    <>
      <Button
        type="submit"
        variant="contained"
        fullWidth
        className="!capitalize !text-white !font-medium !bg-[#DB4444] hover:!bg-[#cf7e7e] !rounded !py-2 !shadow-none"
      >
        {props.name}
      </Button>
    </>
  );
}
