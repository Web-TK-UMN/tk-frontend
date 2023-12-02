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
    document.title = "CMS | Login";
  }, []);

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
    <Stack bgImage={"url(/assets/BgImg.png)"}>
      <Stack
        direction={["column", "column", "row", "row", "row"]}
        align={"center"}
        justify={"space-between"}
        gap={0}
      >
        <Stack
          direction={"column"}
          align={"center"}
          bgColor={"whiteAlpha.0"}
          bgImage={[
            "none",
            "none",
            "url(/assets/BgImg.png)",
            "url(/assets/BgImg.png)",
            "url(/assets/BgImg.png)",
          ]}
          bgRepeat={"no-repeat"}
          bgPosition={"center"}
          bgSize={"cover"}
          backdropFilter={"blur(5px)"}
          justify={"center"}
          w={["100%", "100%", "50%", "50%", "50%"]}
          h={["40vh", "40vh", "100vh", "100vh", "100vh"]}
        >
          <Stack
            direction={"column"}
            mx={"4em"}
            my={"6em"}
            w={["100%", "100%", "60%", "60%", "60%"]}
            px={"2em"}
            py={["6em", "6em", "8em", "8em", "8em"]}
            bgColor={"whiteAlpha.500"}
            backdropFilter={"blur(10px)"}
          >
            <Stack direction={"column"} textShadow={"2xl"}>
              <Text
                textColor={"white"}
                fontWeight={"thin"}
                fontSize={[
                  "x-large",
                  "x-large",
                  "x-large",
                  "xx-large",
                  "xx-large",
                ]}
                textAlign={"left"}
              >
                Welcome to
              </Text>
              <Text
                textColor={"white"}
                fontWeight={"bold"}
                fontSize={[
                  "x-large",
                  "x-large",
                  "x-large",
                  "xx-large",
                  "xx-large",
                ]}
              >
                Computer
              </Text>
              <Text
                textColor={"white"}
                fontWeight={"bold"}
                fontSize={[
                  "x-large",
                  "x-large",
                  "x-large",
                  "xx-large",
                  "xx-large",
                ]}
              >
                Engineering
              </Text>
              <Text
                textColor={"white"}
                fontWeight={"bold"}
                fontSize={[
                  "x-large",
                  "x-large",
                  "x-large",
                  "xx-large",
                  "xx-large",
                ]}
              >
                CMS.
              </Text>
              <Text
                textColor={"white"}
                fontWeight={"thin"}
                fontSize={["large", "large", "large", "x-large", "x-large"]}
                textAlign={"center"}
                mt={"4em"}
              >
                Login to continue access pages
              </Text>
            </Stack>
          </Stack>
        </Stack>
        <Stack
          direction={"column"}
          align={"center"}
          w={["100%", "100%", "50%", "50%", "50%"]}
          justify={"center"}
          h={["60vh", "60vh", "100vh", "100vh", "100vh"]}
          bgColor={"white"}
          roundedTop={["2em", "2em", "0", "0", "0"]}
          zIndex={5}
        >
          <Stack direction={"row"} align={"center"}>
            <Text
              fontWeight={"bold"}
              fontSize={[
                "x-large",
                "x-large",
                "x-large",
                "xx-large",
                "xx-large",
              ]}
              textColor={"#3C465B"}
            >
              Hi,
            </Text>
            <Text
              fontSize={[
                "x-large",
                "x-large",
                "x-large",
                "xx-large",
                "xx-large",
              ]}
            >
              Have a Good Day!
            </Text>
          </Stack>

          <Stack
            as={"form"}
            align={"center"}
            w={"70%"}
            display={"flex"}
            justify={"center"}
            my={"1em"}
            onSubmit={handleSubmit(async (data) => {
              auth.login(data.email, data.password, data.reCAPTCHAToken);
            })}
          >
            <FormControl isInvalid={!!errors.email}>
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                rounded={"2xl"}
                placeholder="Enter email"
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
                rounded={"2xl"}
                placeholder="Enter password"
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

            <FormControl my={"1em"} isInvalid={!!errors.reCAPTCHAToken}>
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

            <Button
              rounded={"2xl"}
              bgColor={"#556481"}
              _hover={{ bgColor: "#3C465B" }}
              w={"100%"}
              type="submit"
              textColor={"white"}
            >
              Login
            </Button>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default LoginPage;
