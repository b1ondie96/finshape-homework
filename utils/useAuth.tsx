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
  const [userID, setUserID] = useLocalStorage("userID", null);
  useEffect(() => {
    if (token && username && userID) {
      setUser({ token: token, username: username, userid: userID });
    }
  }, [token, username, userID]);
  const authUser = async (
    inputData: Pick<RegisterFormInput, "email" | "password">
  ) => {
    try {
      const { data } = await authUserMutation({
        variables: inputData,
      });

      if (data) {
        const {
          authenticateUserWithPassword: {
            token,
            item: { name, id },
          },
        } = data;
        setUser({
          token: token,
          username: name,
          userid: id,
        });
        setUsername(name);
        setToken(token);
        setUserID(id);
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message, error.name);
      } else console.error(error);
    }
  };
  const logout = () => {
    setUser(null);
    setUsername(null);
    setToken(null);
    setUserID(null);
  };
  return (
    <AuthContext.Provider value={{ user, authUser, loading, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
export const useAuth = () => {
  return useContext(AuthContext);
};
