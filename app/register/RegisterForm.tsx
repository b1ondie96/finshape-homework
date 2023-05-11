import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { RegisterFormInput } from "@types";
import InputField from "@components/InputField";
import { gql, useMutation } from "@apollo/client";
import LoadingButton from "@mui/lab/LoadingButton";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { AUTH_USER, CREATE_USER } from "@/utils/Apollo";
import { redirect } from "next/navigation";
const Register = () => {
  const { control, handleSubmit } = useForm({
    defaultValues: { username: "", email: "", password: "" },
  });
  const [createUser, { loading }] = useMutation(CREATE_USER);
  const [authUser] = useMutation(AUTH_USER);

  const onSubmit: SubmitHandler<RegisterFormInput> = async (data) => {
    try {
      const result = await createUser({
        variables: data,
      });

      console.log(result);
      redirect("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
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
      <Typography variant={"h3"} textTransform={"uppercase"}>
        Register
      </Typography>
      <Controller
        name="username"
        rules={{
          required: { value: true, message: "Username is required" },
        }}
        control={control}
        render={({ field, fieldState }) => (
          <InputField error={fieldState.error} {...field} />
        )}
      />
      <Controller
        name="email"
        control={control}
        rules={{
          required: { value: true, message: "Email is required" },
          pattern: {
            value: /\b[\w.-]+@[\w.-]+\.\w{2,6}\b/,
            message: "Invalid email format",
          },
        }}
        render={({ field, fieldState }) => (
          <InputField error={fieldState.error} {...field} />
        )}
      />
      <Controller
        name="password"
        control={control}
        rules={{
          required: { value: true, message: "Password is required" },
          pattern: {
            value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm,
            message:
              "Password must contain at least 1 uppercase letter, 1 lowercase letter, and 1 number",
          },
        }}
        render={({ field, fieldState }) => (
          <InputField error={fieldState.error} {...field} password />
        )}
      />
      <LoadingButton
        fullWidth
        loading={loading}
        type="submit"
        size="large"
        variant="contained"
      >
        Register
      </LoadingButton>
    </Box>
  );
};

export default Register;