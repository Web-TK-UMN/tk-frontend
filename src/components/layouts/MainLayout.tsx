import { Stack, Heading, Image, Divider, Button } from "@chakra-ui/react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ReactNode } from "react";
import Footer from "@/components/GenericFooter";
import ScrollDownAnim from "@/components/ScrollDownAnim";
import Navbar from "@/components//main/Navbar";

const MainLayout = ({
  children,
  isIndex,
}: {
  children: ReactNode;
  isIndex?: boolean;
}) => {
  const { scrollYProgress } = useScroll();
  const scaled = useTransform(scrollYProgress, [0, 0.5], [1, 0.85]);

  return (
    <Stack minH={"100vh"}>
      {isIndex && (
        <>
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
            poster={"/assets/bg.png"}
            zIndex={-1}
            top={0}
            left={0}
          />

          <Stack
            h={"100vh"}
            w={"100vw"}
            align={"center"}
            justify={"center"}
            pos={"fixed"}
            gap={0}
            top={0}
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
                style={{
                  scale: scaled,
                }}
              >
                <Stack
                  direction={"row"}
                  align={"center"}
                  justify={"center"}
                  gap={["1em", "1em", "2em", "2em", "2em"]}
                >
                  <Image
                    w={["2em", "3em", "4em", "6em", "6em"]}
                    src="/assets/logo_umn.png"
                  />
                  <Divider
                    orientation="vertical"
                    h={"3em"}
                    opacity={1}
                    variant={"solid"}
                    borderColor={"#003D73"}
                    bgColor={"#003D73"}
                    rounded={"xl"}
                    borderWidth={"1px"}
                  />
                  <Heading
                    color={"#003D73"}
                    size={["xl", "2xl", "2xl", "4xl", "4xl"]}
                    textShadow="0px 1px 5px rgba(0,0,0,0.25)"
                  >
                    TEKNIK KOMPUTER
                  </Heading>
                </Stack>
              </motion.div>
            </Stack>
            <Button
              variant={"unstyled"}
              pos={"absolute"}
              bottom={0}
              my={["6em", "6em", "4em", "4em", "4em"]}
              onClick={() => {
                window.scrollTo({
                  top: window.innerHeight,
                  behavior: "smooth",
                });
              }}
            >
              <ScrollDownAnim />
            </Button>
          </Stack>
        </>
      )}

      <Stack
        mt={isIndex ? "100vh" : 0}
        minH={"100vh"}
        pos={"relative"}
        bgColor={"white"}
        gap={0}
        roundedTop={"xl"}
      >
        <Navbar />

        <Stack
          flex={1}
          color={"#003D73"}
          textColor={"#333333"}
          gap={0}
          bgImg={"/assets/bg.png"}
          backgroundAttachment={"fixed"}
          bgPos={"center"}
          bgSize={"cover"}
        >
          {children}
        </Stack>
      </Stack>
      <Footer />
    </Stack>
  );
};

export default MainLayout;
