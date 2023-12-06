import ScrollToHashElement from "@/components/ScrollToHash";
import CMSLayout from "@/components/layouts/CMSLayout";
import { useFetcher } from "@/hooks/useApi";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "@/router";
import { Spinner, Stack, Text, useToast } from "@chakra-ui/react";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { SWRConfig } from "swr";

const CMSMainLayout = () => {
  const auth = useAuth();
  const nav = useNavigate();
  const toast = useToast();
  const fetcher = useFetcher();

  useEffect(() => {
    if (auth.status === "unauthenticated") {
      toast({
        title: "You are not logged in.",
        description: "You will be redirected to the login page.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      nav("/cms/login");
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth]);

  if (auth.status !== "authenticated") {
    return (
      <Stack h={"100vh"} align={"center"} justify={"center"}>
        <Spinner size={"xl"} />
        <Text>Loading...</Text>
      </Stack>
    );
  }

  return (
    <SWRConfig
      value={{
        fetcher: fetcher,
        refreshInterval: 60 * 1000,
      }}
    >
      <ScrollToHashElement />
      <CMSLayout>
        <ScrollToHashElement />
        <Outlet />
      </CMSLayout>
    </SWRConfig>
  );
};

export default CMSMainLayout;
