"use client";
import Dialog from "@mui/material/Dialog";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { LoginModalProps, RegisterFormInput } from "@/types";
import { LoadingButton } from "@mui/lab";
import { Alert, Box, Typography } from "@mui/material";
import InputField from "./InputField";
import { useAuth } from "@/utils/useAuth";
import { useState } from "react";
import { emailRules } from "@/utils/formRules";
const LoginModal = ({ open, setIsLoginModalOpen }: LoginModalProps) => {
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm({
    defaultValues: { email: "", password: "" },
  });
  const { authUser, loading } = useAuth() || {};
  const [errorMsg, setErrorMsg] = useState("");
  const onSubmit: SubmitHandler<
    Pick<RegisterFormInput, "email" | "password">
  > = async (inputData) => {
    if (!authUser) return;
    setErrorMsg("");
    try {
      await authUser(inputData);
      setIsLoginModalOpen(false);
    } catch (error) {
      console.error(error);
      if (error instanceof Error) {
        setErrorMsg(error.message);
      }
    }
  };
  return (
    <Dialog
      maxWidth={"sm"}
      fullWidth
      PaperProps={{
        sx: {
          alignItems: { xs: "stretch", sm: "center" },
          justifyItems: "stretch",
          justifyContent: "stretch",
          bgcolor: "black",
          border: "4px solid white",
        },
      }}
      onClose={() => setIsLoginModalOpen(false)}
      open={open}
    >
      <Box
        component={"form"}
        flexDirection={"column"}
        display={"flex"}
        alignItems={"center"}
        justifyItems={"center"}
        p={4}
        rowGap={1}
        flex={"1 1 0"}
        maxWidth={{ xs: "100%", sm: "50%" }}
        onSubmit={handleSubmit(onSubmit)}
      >
        <Typography color={"white"} fontSize={24} textTransform={"uppercase"}>
          Login
        </Typography>
        {errorMsg && (
          <Alert severity="error" variant="filled">
            {errorMsg}
          </Alert>
        )}
        <Controller
          name="email"
          control={control}
          rules={emailRules}
          render={({ field, fieldState }) => (
            <InputField state={fieldState} {...field} ref={field.ref} />
          )}
        />
        <Controller
          name="password"
          control={control}
          rules={{
            required: { value: true, message: "Password is required" },
          }}
          render={({ field, fieldState }) => (
            <InputField
              {...field}
              ref={field.ref}
              state={fieldState}
              password
            />
          )}
        />
        <LoadingButton
          fullWidth
          loading={isSubmitting}
          type="submit"
          size="large"
          variant="contained"
        >
          Login
        </LoadingButton>
      </Box>
    </Dialog>
  );
};

export default LoginModal;
