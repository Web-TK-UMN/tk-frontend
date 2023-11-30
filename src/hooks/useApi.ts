import axios, { AxiosError, isAxiosError } from "axios";
import { useAuth } from "@/hooks/useAuth";
import { useEffect } from "react";
import { useToast } from "@chakra-ui/react";
import { useNavigate } from "@/router";
export const baseUrl =
  import.meta.env.VITE_API_BASE_URL ?? "http://localhost:3000";

export const instance = axios.create({
  baseURL: baseUrl,
});

export type ResponseModel<T = undefined> = {
  code: number;
  message: string;
  data: T;
};

export enum Responses {
  SUCCESS = 200,
  CREATED = 201,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  NOT_FOUND = 404,
  FORBIDDEN = 403,
  CONFLICT = 409,
  VALIDATION_ERROR = 422,
  INTERNAL_SERVER_ERROR = 500,
}

const useApi = () => {
  const auth = useAuth();
  const nav = useNavigate();

  useEffect(() => {
    if (auth.user) {
      instance.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${auth.user.token}`;
    }

    instance.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response.status === 401) {
          auth.logout();
          nav("/cms/login");
        }
        return Promise.reject(error);
      }
    );

    return () => {
      delete instance.defaults.headers.common["Authorization"];
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth]);

  return instance;
};

export const useToastErrorHandler = () => {
  const toast = useToast();

  return (error: AxiosError<ResponseModel>) => {
    console.error(error);

    if (!isAxiosError(error)) {
      toast({
        title: "Error",
        description: "Something went wrong",
        status: "error",
        isClosable: true,
      });
      return;
    }

    if (error.response) {
      // handle error code

      toast({
        title: error.response.data.code
          ? Responses[error.response.data.code]
          : "Error",
        description: error.response.data.message || "Something went wrong",
        status: "error",
        isClosable: true,
      });
      return;
    }
  };
};

// prepare for useSwr hook
export const useFetcher = () => {
  const api = useApi();
  const toastErrorHandler = useToastErrorHandler();

  return (url: string) => {
    return api
      .get(url)
      .then((res) => res.data.data)
      .catch(toastErrorHandler);
  };
};
export default useApi;
