"use client";
import { InputProps } from "@/types";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import { forwardRef, useState } from "react";
import { MdVisibilityOff, MdVisibility } from "react-icons/md";
import { styled } from "@mui/material/styles";
const StyledTextField = styled(TextField)(() => ({
  color: "white",
  fontFamily: "inherit",
  "& label.Mui-focused": {
    color: "white",
    fontFamily: "inherit",
  },
  "& .MuiInput-root:before": { borderColor: "white" },
  "& .MuiInput-root:hover:not(.Mui-disabled):before": { borderColor: "white" },
  "& .MuiInput-underline:after": {
    borderBottomColor: "white",
  },
  "& .MuiInputLabel-root": { color: "white", fontFamily: "inherit" },
  "& .MuiInput-input": { color: "white", fontFamily: "inherit" },
  "& .MuiInput-input:selection": {
    color: "rgb(83,181,227)",
    backgroundColor: "white",
    fontFamily: "inherit",
  },
  "&.MuiTextField-root": { color: "#fff", fontFamily: "inherit" },
  "& .MuiOutlinedInput-root": {
    color: "white",
    fontFamily: "inherit",
    "& fieldset": {
      borderColor: "white",
      fontFamily: "inherit",
    },
    "&:hover fieldset": {
      borderColor: "white",
      fontFamily: "inherit",
    },
    "&.Mui-focused fieldset": {
      borderColor: "white",
      fontFamily: "inherit",
    },
  },
}));
const InputField = forwardRef(
  ({ error, password, ...props }: InputProps, ref) => {
    const { name } = props;
    const [isPasswordVisible, setisPasswordVisible] = useState(false);
    return (
      <StyledTextField
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
                      {isPasswordVisible ? (
                        <MdVisibilityOff />
                      ) : (
                        <MdVisibility />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }
            : undefined
        }
        {...props}
      />
    );
  }
);
export default InputField;
