import { Stack } from "@chakra-ui/react";
import { ReactNode } from "react";
import { SidebarNavbar } from "@/components/cms/SidebarNavbar";

const CMSLayout = ({ children }: { children: ReactNode }) => {
  return (
    <Stack
      h={"100vh"}
      direction={["column", "column", "row", "row", "row"]}
      gap={0}
      color={"#232935"}
    >
      {/* nav */}
      <SidebarNavbar />

      {/* content */}
      <Stack
        flex={1}
        gap={0}
        bgColor={"white"}
        pr={"1em"}
        py={"1em"}
        pl={["1em", "1em", "0em", "0em", "0em"]}
      >
        <Stack flex={1} bgColor={"#F2F3F7"} rounded={"xl"} p={"2em"}>
          {children}
        </Stack>
      </Stack>
    </Stack>
  );
};

export default CMSLayout;
