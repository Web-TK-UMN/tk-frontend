import { MotionStack } from "@/components/ChakraFramer";
import { Stack, Image, Text, VisuallyHidden } from "@chakra-ui/react";

const AcademicProfile = () => {
  return (
    <Stack
      id="academic"
      direction={"column"}
      align={"center"}
      px={["2em", "2em", "6em", "6em", "6em"]}
      pt={"4em"}
      pb={"2em"}
    >
      <MotionStack
        flexDir={"column"}
        alignItems={"center"}
        justifyContent={"top"}
        w={"full"}
        viewport={{ once: true }}
        initial={{
          opacity: 0,
          y: -10,
        }}
        whileInView={{
          opacity: 1,
          y: 0,
        }}
        // @ts-expect-error chakra ui typescript error
        transition={{
          duration: 1,
          ease: "easeOut",
          delay: 0.5,
        }}
      >
        <VisuallyHidden>What is Computer Engineering?</VisuallyHidden>
        <Image src="/assets/AcademicProfile.svg" />
      </MotionStack>
      <MotionStack
        flexDir={"row"}
        justifyContent={"center"}
        w={"full"}
        h={["1.5em", "2em", "2.5em", "2.5em", "2.5em"]}
        my={["1em", "1em", "2em", "2em", "2em"]}
        gap={"1em"}
        viewport={{ once: true }}
        initial={{
          opacity: 0,
          y: -10,
        }}
        whileInView={{
          opacity: 1,
          y: 0,
        }}
        // @ts-expect-error chakra ui typescript error
        transition={{
          duration: 1,
          ease: "easeOut",
          delay: 0.5,
        }}
      >
        <Stack
          rounded={["md", "xl", "xl", "xl", "xl"]}
          w={"fit-content"}
          bgColor={"#FD8E09"}
          align={"center"}
          justify={"center"}
          px={"1em"}
        >
          <Text
            textColor={"white"}
            fontSize={["md", "md", "md", "md", "lg"]}
            whiteSpace={"nowrap"}
          >
            Academic Profile
          </Text>
        </Stack>
        <Stack
          rounded={["md", "xl", "xl", "xl", "xl"]}
          w={"full"}
          bgColor={"#003C72"}
        ></Stack>
      </MotionStack>
      <MotionStack
        viewport={{ once: true }}
        initial={{
          opacity: 0,
          y: -10,
        }}
        whileInView={{
          opacity: 1,
          y: 0,
        }}
        // @ts-expect-error chakra ui typescript error
        transition={{
          duration: 1,
          ease: "easeOut",
          delay: 0.5,
        }}
      >
        <Text
          textColor={"#676767"}
          // fontSize={["xx-small", "xx-small", "small", "medium", "large"]}
          textAlign={"justify"}
        >
          The Computer Engineering program is designed to produce the graduates
          who are able to develop mobile technology. This program focuses on
          embedded systems as the main part of mobile devices. The program also
          prepares the students to be able to design and build computer networks
          and data communication both in a company and in a mobile format and
          also design various digital-technology-based devices.
        </Text>
      </MotionStack>
    </Stack>
  );
};

export default AcademicProfile;
