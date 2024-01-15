import { Stack } from "@chakra-ui/react";
import CareerProspectsSection from "@/components/main/sections/CareerProspectsSection";
import AlumniCornerSectionSection from "@/components/main/sections/AlumniCornerSection";
import KaprodiSection from "@/components/main/sections/KaprodiSection";
import NewsSection from "@/components/main/sections/NewsSection";
import AcademicProfile from "@/components/main/sections/AcademicProfile";
// import Statistic from "@/components/main/sections/Statistic";
import { MotionImage } from "@/components/ChakraFramer";

const IndexPage = () => {
  return (
    <Stack minH={"100vh"} gap={0}>
      <MotionImage
        src="/assets/circuit_ornaments_vertical.svg"
        pos={"absolute"}
        top={"20em"}
        w={["1.5em", "1.5em", "3em", "3em", "3em"]}
        transform="scaleY(-1)"
        left={0}
        viewport={{ once: true }}
        initial={{
          opacity: 0,
          x: -10,
        }}
        whileInView={{
          opacity: 1,
          x: 0,
        }}
        // @ts-expect-error chakra ui typescript error
        transition={{
          duration: 1,
          ease: "easeOut",
          delay: 0.5,
        }}
      />
      <MotionImage
        src="/assets/circuit_ornaments_vertical.svg"
        pos={"absolute"}
        top={"65em"}
        right={0}
        w={["1.5em", "1.5em", "3em", "3em", "3em"]}
        transform={"scaleX(-1)"}
        viewport={{ once: true }}
        initial={{
          opacity: 0,
          x: 10,
          scaleX: -1,
        }}
        whileInView={{
          opacity: 1,
          x: 0,
          scaleX: -1,
        }}
        // @ts-expect-error chakra ui typescript error
        transition={{
          duration: 1,
          ease: "easeOut",
          delay: 0.5,
        }}
      />
      <AcademicProfile />
      {/* 
        Bu Monic minta ini di hapus
      <Statistic /> */}
      <KaprodiSection />
      <CareerProspectsSection />
      {/* <AlumniCornerSectionSection /> */}
      <NewsSection />
    </Stack>
  );
};

export default IndexPage;
