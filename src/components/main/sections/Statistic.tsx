import { MotionImage, MotionStack } from "@/components/ChakraFramer";
import { Stack, Text, Image, Heading, Flex } from "@chakra-ui/react";

const Statistic = () => {
  return (
    <Stack
      id="statistic"
      direction={"column"}
      px={["2em", "2em", "6em", "6em", "6em"]}
      pt={"2em"}
      pb={"4em"}
      align={"center"}
      justify={"center"}
    >
      <MotionImage
        src="/assets/HorizontalLine.svg"
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
      />

      <MotionStack
        flexDir={"column"}
        my={"2em"}
        alignItems={"center"}
        justifyContent={"center"}
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
        <Heading size={"md"} fontWeight={"medium"} textAlign={"center"}>
          we are continuously refining and enhancing process for{" "}
          <Heading
            as={"span"}
            size={"md"}
            fontWeight={"semibold"}
            color={"#003C72"}
          >
            better results.
          </Heading>
        </Heading>
      </MotionStack>

      <Stack
        w={"full"}
        gap={"1em"}
        direction={["column", "column", "row", "row", "row"]}
        my={"2em"}
      >
        <MotionStack
          pos={"relative"}
          h={["18em", "20em", "14em", "16em", "24em"]}
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
          <Image
            src={"/assets/GPA.svg"}
            h={["18em", "20em", "14em", "16em", "24em"]}
          />
          <Stack
            pos={"absolute"}
            w={"full"}
            h={"full"}
            align={"end"}
            justify={"end"}
            px={["1em", "1em", "2em", "2em", "2em"]}
            py={["3em", "5em", "2em", "2em", "2em"]}
          >
            <Heading
              fontSize={["4em", "5em", "5em", "5em", "6em"]}
              fontWeight={"semibold"}
            >
              3.14
            </Heading>
            <Text fontWeight={"medium"}>student's average GPA</Text>
          </Stack>
        </MotionStack>

        <Stack
          direction={"column"}
          flex={1}
          gap={["2em", "2em", "1em", "1em", "1em"]}
        >
          <MotionStack
            h={"75%"}
            bgColor={"#E5E5E5"}
            p={["1em", "2em", "2em", "2em", "2em"]}
            rounded={"2xl"}
            flexDir={"column"}
            justifyContent={"space-between"}
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
            <Image src="/assets/calendar.svg" boxSize={"4em"}></Image>
            <Stack flex={1} align={"end"} justify={"end"}>
              <Heading fontSize={["2em", "3em", "3em", "3em", "4em"]}>
                3 <Heading as={"span"}>Months</Heading>
              </Heading>
              <Text fontWeight={"medium"} textAlign={"end"}>
                average waiting time from graduation to getting the first job
              </Text>
            </Stack>
          </MotionStack>
          <MotionStack
            bgColor={"#E5E5E5"}
            p={["1em", "2em", "2em", "2em", "2em"]}
            rounded={"2xl"}
            alignItems={"end"}
            justifyContent={"center"}
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
            <Text fontWeight={"medium"}>No content here</Text>
          </MotionStack>
        </Stack>
      </Stack>

      <MotionImage
        src="/assets/HorizontalLine.svg"
        transform={"scaleY(-1)"}
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
      />
    </Stack>
  );
};
export default Statistic;
