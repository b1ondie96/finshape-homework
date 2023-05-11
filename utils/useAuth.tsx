import { IAuthContext, RegisterFormInput, User, UserAuthData } from "@types";
import { useMutation } from "@apollo/client";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { AUTH_USER } from "./Apollo";
import useLocalStorage from "./useLocalStorage";
const AuthContext = createContext<IAuthContext | null>(null);
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [authUserMutation, { loading }] = useMutation<UserAuthData>(AUTH_USER);

  const [token, setToken] = useLocalStorage("token", null);
  const [username, setUsername] = useLocalStorage("username", null);
  useEffect(() => {
    if (token && username) {
      setUser({ token: token, username: username });
    }
  }, [token, username]);
  const authUser = async (
    inputData: Pick<RegisterFormInput, "email" | "password">
  ) => {
    try {
      const { data } = await authUserMutation({
        variables: inputData,
      });
      console.log(data);
      if (data) {
        setUser({
          token: data.authenticateUserWithPassword.token,
          username: data.authenticateUserWithPassword.item.name,
        });
        setUsername(data.authenticateUserWithPassword.item.name);
        setToken(data.authenticateUserWithPassword.token);
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <AuthContext.Provider value={{ user, authUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
}
export const useAuth = () => {
  return useContext(AuthContext);
};
