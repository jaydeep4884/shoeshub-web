import { TextField } from "@mui/material";
import React from "react";

function InputBox({ field, form, ...props }) {
  const { name } = field;
  const { touched, errors } = form;
  const hasError = touched[name] && Boolean(errors[name]);

  return (
    <TextField
      {...field}
      {...props}
      error={hasError}
      helperText={hasError ? errors[name] : ""}
      variant="outlined"
      className="w-full"
      sx={{
        "& .MuiOutlinedInput-root": {
          borderRadius: "12px",
          backgroundColor: "#C9DBD54D",
          padding: 0,
          "& input": {
            padding: "12px 16px",
          },
        },
      }}
    />
  );
}

export default InputBox;
