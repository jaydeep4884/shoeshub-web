import { Box } from "@mui/material";
import React from "react";
import { HashLoader } from "react-spinners";

function Loader() {
  return (
    <Box className="flex items-center justify-center !w-full">
      <HashLoader color="#73946B" size={30} />
    </Box>
  );
}

export default Loader;
