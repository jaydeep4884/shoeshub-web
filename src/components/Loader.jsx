import { Box } from "@mui/material";
import React from "react";
import { HashLoader } from "react-spinners";

function Loader() {
  return (
    <>
      <Box className="flex items-center justify-center h-screen">
        <HashLoader color="#a4a637" />
      </Box>
    </>
  );
}

export default Loader;
