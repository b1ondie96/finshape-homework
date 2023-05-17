"use client";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { RegisterFormInput } from "@types";
import InputField from "@components/InputField";
import { useMutation } from "@apollo/client";
import LoadingButton from "@mui/lab/LoadingButton";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { CREATE_USER } from "@/utils/Apollo";
import { useRouter } from "next/navigation";
import { useAuth } from "@/utils/useAuth";
import { emailRules, passwordRules } from "@/utils/formRules";
import { useEffect } from "react";
const Register = () => {
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
    setFocus,
  } = useForm({
    defaultValues: { username: "", email: "", password: "" },
  });
  const [createUser] = useMutation(CREATE_USER);
  const { authUser } = useAuth() || {};
  const router = useRouter();
  const onSubmit: SubmitHandler<RegisterFormInput> = async (data) => {
    try {
      await createUser({
        variables: data,
      });

      if (authUser) {
        await authUser({
          email: data.email,
          password: data.password,
        });
      }
      router.push("/");
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    setFocus("username");
  }, [setFocus]);
  return (
    <Box display={"flex"} flexDirection={"column"} alignItems={"center"}>
      <Box
        component={"form"}
        flexDirection={"column"}
        display={"flex"}
        alignItems={"center"}
        justifyItems={"center"}
        rowGap={1}
        maxWidth={{ xs: "100%", sm: "50%" }}
        onSubmit={handleSubmit(onSubmit)}
      >
        <Typography variant={"h5"} fontWeight={900}>
          Create free account
        </Typography>
        <Controller
          name="username"
          rules={{
            required: { value: true, message: "Username is required" },
          }}
          control={control}
          render={({ field, fieldState }) => (
            <InputField state={fieldState} {...field} ref={field.ref} />
          )}
        />
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
          rules={passwordRules}
          render={({ field, fieldState }) => (
            <InputField
              state={fieldState}
              {...field}
              password
              ref={field.ref}
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
          Register
        </LoadingButton>
      </Box>
    </Box>
  );
};

export default Register;
