import { MotionStack } from "@/components/ChakraFramer";
import { Stack, Text, Image, VisuallyHidden } from "@chakra-ui/react";

const careerData = [
  [
    "Computer System Engineers",
    "Network Engineers",
    "Software / Hardware Engineers",
  ],
  ["Embedded System Engineers", "System Analysts", "Interface Designers"],
  ["Research Assistant", "Scholars", "Technopreneurs"],
];

const CareerProspectsSection = () => {
  return (
    <Stack
      id="career"
      direction={"column"}
      align={"center"}
      py={"4em"}
      px={["2em", "2em", "6em", "6em", "6em"]}
    >
      <MotionStack
        flexDirection={"row"}
        alignItems={"center"}
        justify={"center"}
        w={["16em", "16em", "24em", "32em", "36em"]}
        mb={"2em"}
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
        <VisuallyHidden>Career Prospect</VisuallyHidden>
        <Image src="/assets/CareerProspects.svg" />
      </MotionStack>
      <Stack
        direction={"column"}
        align={"center"}
        justify={"space-evenly"}
        flex={1}
        w={"100%"}
        gap={"1em"}
      >
        {careerData.map((group, groupIndex) => (
          <Stack
            direction={["column", "column", "row", "row", "row"]}
            align={"center"}
            w={"100%"}
            gap={"1em"}
          >
            {group.map((career, careerIndex) => (
              <MotionStack
                flexDir={"row"}
                alignItems={"center"}
                bgGradient={"linear(to-b, #013D71, #24365A)"}
                rounded={"3xl"}
                px={"1em"}
                py={"1em"}
                w={["100%", "100%", "33%", "33%", "33%"]}
                h={["4em", "4em", "4.5em", "5em", "5em"]}
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
                  delay: 0.5 + groupIndex * 0.2 + careerIndex * 0.1,
                }}
              >
                <Stack
                  rounded={"full"}
                  bgColor={"white"}
                  py={"0.25em"}
                  px={"0.5em"}
                  mr={"1em"}
                  w={"2em"}
                  h={"2em"}
                  align={"center"}
                  justify={"center"}
                >
                  <Text
                    textColor={"#FD8E09"}
                    fontWeight={"bold"}
                    fontSize={["small", "medium", "medium", "medium", "medium"]}
                  >
                    {/* number logic, so it goes like 1,2,3 - 4,5,6 - 7,8,9 */}
                    {groupIndex * 3 + careerIndex + 1}
                  </Text>
                </Stack>
                <Text
                  textColor={"white"}
                  fontWeight={"bold"}
                  fontSize={["small", "medium", "medium", "medium", "medium"]}
                >
                  {career}
                </Text>
              </MotionStack>
            ))}
          </Stack>
        ))}
      </Stack>
    </Stack>
  );
};
export default CareerProspectsSection;
