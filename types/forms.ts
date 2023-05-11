import { ControllerRenderProps, FieldError } from "react-hook-form";

export interface RegisterFormInput {
  username: string;
  email: string;
  password: string;
}
export interface InputProps extends ControllerRenderProps<RegisterFormInput> {
  password?: boolean;
  error?: FieldError;
}
export interface LoginModalProps {
  open: boolean;
  setIsLoginModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
