import AlumniCornerSectionSection from "@/components/main/sections/AlumniCornerSection";
import NewsSection from "@/components/main/sections/NewsSection";
import { Stack } from "@chakra-ui/react";

const IndexPage = () => {
  return (
    <Stack minH={"100vh"} gap={0}>
      <AlumniCornerSectionSection />
      <NewsSection />
    </Stack>
  );
};

export default IndexPage;
