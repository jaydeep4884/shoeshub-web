import { Box } from "@mui/material";
import React from "react";
import { HashLoader } from "react-spinners";

function Loader() {
  return (
    <>
      <Box className="flex items-center justify-center !w-full">
        <HashLoader color="#a4a637" size={35} />
      </Box>
    </>
  );
}

export default Loader;
