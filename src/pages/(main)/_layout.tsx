import MainLayout from "@/components/layouts/MainLayout";
import { useFetcher } from "@/hooks/useApi";
import { Outlet, useLocation } from "react-router-dom";
import { SWRConfig } from "swr";

const Layout = () => {
  const fetcher = useFetcher();
  const loc = useLocation();

  return (
    <SWRConfig
      value={{
        fetcher,
        refreshInterval: 60 * 1000,
      }}
    >
      <MainLayout isIndex={loc.pathname === "/"}>
        <Outlet />
      </MainLayout>
    </SWRConfig>
  );
};

export default Layout;
