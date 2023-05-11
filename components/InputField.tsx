"use client";
import { InputProps } from "@/types";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import { forwardRef, useState } from "react";
import { MdVisibilityOff, MdVisibility } from "react-icons/md";
const InputField = forwardRef(({ error, password, ...props }: InputProps) => {
  const { name } = props;
  const [isPasswordVisible, setisPasswordVisible] = useState(false);
  return (
    <TextField
      fullWidth
      error={Boolean(error)}
      helperText={error ? error.message : " "}
      placeholder={name}
      label={name}
      type={password ? (isPasswordVisible ? "text" : "password") : "text"}
      InputProps={
        password
          ? {
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => {
                      setisPasswordVisible(!isPasswordVisible);
                    }}
                    tabIndex={-1}
                    aria-label="toggle password visibility"
                    sx={{
                      color: "#fbfbfbcc",
                      ":hover": { cursor: "pointer" },
                    }}
                    edge="end"
                  >
                    {isPasswordVisible ? <MdVisibilityOff /> : <MdVisibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }
          : undefined
      }
      {...props}
    />
  );
});
export default InputField;
