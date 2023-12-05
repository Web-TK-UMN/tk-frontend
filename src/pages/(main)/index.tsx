import CareerProspectsSection from "@/components/main/sections/CareerProspectsSection";
import AlumniCornerSectionSection from "@/components/main/sections/AlumniCornerSection";
import KaprodiSection from "@/components/main/sections/KaprodiSection";
import NewsSection from "@/components/main/sections/NewsSection";
import { Stack } from "@chakra-ui/react";

const IndexPage = () => {
  return (
    <Stack minH={"100vh"} gap={0}>
      <KaprodiSection />
      <CareerProspectsSection />
      <AlumniCornerSectionSection />
      <NewsSection />
    </Stack>
  );
};

export default IndexPage;
