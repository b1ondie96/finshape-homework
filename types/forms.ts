import { ControllerFieldState, ControllerRenderProps } from "react-hook-form";

export interface RegisterFormInput {
  username: string;
  email: string;
  password: string;
}
export interface InputProps extends ControllerRenderProps<RegisterFormInput> {
  password?: boolean;
  state: ControllerFieldState;
}
export interface LoginModalProps {
  open: boolean;
  setIsLoginModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
