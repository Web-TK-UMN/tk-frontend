import Footer from "@/components/GenericFooter";
import { Stack, Text, Heading, Image, Divider } from "@chakra-ui/react";
import { motion } from "framer-motion";

const IndexPage = () => {
  return (
    <Stack minH={"100vh"} overflow={"auto"}>
      <Stack
        as={"video"}
        autoPlay
        loop
        playsInline
        muted
        src={"/assets/cinematic.mp4"}
        h={"100vh"}
        w={"100vw"}
        objectFit={"cover"}
        pos={"fixed"}
        zIndex={-1}
        top={0}
        left={0}
      />
      <Stack
        h={"100vh"}
        align={"center"}
        justify={"center"}
        pos={"relative"}
        gap={0}
      >
        <Stack flex={1} align={"center"} justify={"center"}>
          <motion.div
            viewport={{ once: true }}
            initial={{
              opacity: 0,
              y: -10,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 1,
              ease: "easeOut",
              delay: 0.5,
            }}
          >
            <Stack
              direction={"row"}
              align={"center"}
              justify={"center"}
              gap={"1em"}
            >
              <Image w={"2.5em"} src="/assets/logo_umn.png" />
              <Divider
                orientation="vertical"
                h={"3em"}
                opacity={1}
                variant={"solid"}
                borderColor={"#003D73"}
                borderWidth={"1px"}
              />
              <Heading
                color={"#003D73"}
                size={["lg", "lg", "xl", "2xl", "2xl"]}
                textShadow="0px 1px 5px rgba(0,0,0,0.25)"
              >
                TEKNIK KOMPUTER
              </Heading>
            </Stack>
          </motion.div>
          <motion.div
            viewport={{ once: true }}
            initial={{
              opacity: 0,
              y: -10,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 1,
              ease: "easeOut",
              delay: 1,
            }}
          >
            <Heading
              fontWeight={"semibold"}
              textColor={"white"}
              size={["3xl", "3xl", "3xl", "4xl", "4xl"]}
              textShadow="0px 1px 5px rgba(0,0,0,0.25)"
            >
              <Text as={"span"} color={"#003D73"}>
                Coming
              </Text>{" "}
              <Text as={"span"} color={"#D87B2B"}>
                Soon!
              </Text>
            </Heading>
          </motion.div>
        </Stack>
      </Stack>
      <Footer />
    </Stack>
  );
};

export default IndexPage;
