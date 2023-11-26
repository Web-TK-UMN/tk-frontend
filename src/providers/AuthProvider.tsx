import { ReactNode, createContext, useEffect, useState } from "react";
import axios, { AxiosError } from "axios";
import { ResponseModel, baseUrl, useToastErrorHandler } from "@/hooks/useApi";
import { useToast } from "@chakra-ui/react";

type User = {
  id: string;
  name: string;
  email: string;
};

type LoginDto = {
  token: string;
  user: User;
};

type AuthModel = User & {
  token: string;
};

type AuthContext = {
  user: AuthModel | null;
  status: "loading" | "authenticated" | "unauthenticated";
  login: (email: string, password: string) => void;
  logout: () => void;
};

export const AuthContext = createContext<AuthContext>({
  user: null,
  status: "loading",
  login: () => {},
  logout: () => {},
});

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AuthModel | null>(null);
  const [status, setStatus] = useState<
    "loading" | "authenticated" | "unauthenticated"
  >("loading");

  const toast = useToast();
  const errorHandler = useToastErrorHandler();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setStatus("unauthenticated");
      return;
    }

    axios
      .get<ResponseModel<{ user: User }>>(baseUrl + "/auth/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      .then((res) => {
        setUser({
          ...res.data.data.user,
          token: token,
        });

        setStatus("authenticated");
      })
      .catch(() => {
        localStorage.removeItem("token");
        setStatus("unauthenticated");
      });
  }, []);

  const login = (email: string, password: string) => {
    setStatus("loading");
    axios
      .post<ResponseModel<LoginDto>>(baseUrl + "/auth/login", {
        email,
        password,
      })

      .then((authRes) => {
        localStorage.setItem("token", authRes.data.data.token);

        setUser({
          ...authRes.data.data.user,
          token: authRes.data.data.token,
        });

        setStatus("authenticated");

        toast({
          title: "Login Success",
          description: `Welcome, ${authRes.data.data.user.name}`,
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      })
      .catch((err: AxiosError<ResponseModel>) => {
        errorHandler(err);
        setStatus("unauthenticated");
      });
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);

    toast({
      title: "Logout Sucess",
      description: "You have been logged out.",
      status: "success",
      duration: 3000,
      isClosable: true,
    });

    setStatus("unauthenticated");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        status,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
