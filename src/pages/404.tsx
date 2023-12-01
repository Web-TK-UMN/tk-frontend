import { Stack, Text, Heading } from "@chakra-ui/react";
import Footer from "@/components/GenericFooter";

const GenericNotFoundPage = () => {
  return (
    <Stack minH={"100vh"} overflow={"auto"} pos={"relative"}>
      {/* <Stack
        as={"video"}
        autoPlay
        loop
        playsInline
        muted
        src="/assets/cinematic.mp4"
        h={"100vh"}
        w={"100vw"}
        objectFit={"cover"}
        pos={"fixed"}
        zIndex={-1}
        top={0}
        left={0}
      /> */}
      <Stack
        h={"100vh"}
        align={"center"}
        justify={"center"}
        pos={"relative"}
        gap={0}
        // replace kalo cinematic udah jadi
        bgImage={"/assets/bg_sementara.png"}
        bgRepeat={"no-repeat"}
        bgPosition={"center"}
        bgSize={"cover"}
        // replace kalo cinematic udah jadi
      >
        <Stack
          flex={1}
          align={"center"}
          justify={"center"}
          color={"#003D73"}
          p={"1em"}
        >
          <Heading size={"4xl"}>404</Heading>
          <Heading size={"xl"}>Page not found</Heading>

          <Text textAlign={"center"}>
            We can't seem to find the page that you are looking for.
          </Text>
        </Stack>
      </Stack>
      <Footer />
    </Stack>
  );
};

export default GenericNotFoundPage;
