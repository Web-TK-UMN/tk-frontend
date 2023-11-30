import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "@/router";
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Spinner,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import ReCAPTCHA from "react-google-recaptcha";

type LoginDto = {
  email: string;
  password: string;
  reCAPTCHAToken: string;
};

const LoginPage = () => {
  const auth = useAuth();
  const nav = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<LoginDto>();

  useEffect(() => {
    if (auth.status === "authenticated") {
      nav("/cms");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth]);

  if (auth.status === "loading") {
    return (
      <Stack h={"100vh"} align={"center"} justify={"center"}>
        <Spinner size={"xl"} />
        <Text>Loading...</Text>
      </Stack>
    );
  }

  return (
    <Stack align={"center"} justify={"center"}>
      <form
        onSubmit={handleSubmit(async (data) => {
          auth.login(data.email, data.password, data.reCAPTCHAToken);
        })}
      >
        <FormControl isInvalid={!!errors.email}>
          <FormLabel>Email</FormLabel>
          <Input
            type="email"
            {...register("email", {
              required: "Email cannot be empty",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "Email is not valid",
              },
            })}
          />
          <FormErrorMessage>
            {errors.email && errors.email.message}
          </FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={!!errors.password}>
          <FormLabel>Password</FormLabel>
          <Input
            type="password"
            {...register("password", {
              required: "Password cannot be empty",
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters long",
              },
            })}
          />
          <FormErrorMessage>
            {errors.password && errors.password.message}
          </FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={!!errors.reCAPTCHAToken}>
          <Controller
            control={control}
            name="reCAPTCHAToken"
            rules={{
              required: "Please verify that you are not a robot",
            }}
            render={({ field: { onChange } }) => (
              <ReCAPTCHA
                sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
                onExpired={() => onChange("")}
                onChange={(token) => onChange(token)}
                onErrored={() => onChange("")}
              />
            )}
          />
          <FormErrorMessage>
            {errors.reCAPTCHAToken && errors.reCAPTCHAToken.message}
          </FormErrorMessage>
        </FormControl>

        <Button type="submit">Login</Button>
      </form>
    </Stack>
  );
};

export default LoginPage;
