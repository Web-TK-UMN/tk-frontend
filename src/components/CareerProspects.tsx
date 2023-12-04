import { Stack, Text, Image } from "@chakra-ui/react";
import { motion, useAnimation } from "framer-motion";

const careerData = [
  "Computer System Engineers",
  "Network Engineers",
  "Software / Hardware Engineers",
  "Embedded System Engineers",
  "System Analysts",
  "Interface Designers",
];

const CareerProspects = () => {
  return (
    <Stack direction={"column"} align={"center"}>
      <Stack
        direction={"row"}
        align={"center"}
        justify={"center"}
        w={["16em", "16em", "24em", "32em", "36em"]}
        mt={"2em"}
      >
        <Image src="/assets/CareerProspects.svg" />
      </Stack>

      <Stack
        direction={"column"}
        align={"center"}
        justify={"space-evenly"}
        flex={1}
        w={"100%"}
      >
        <Stack
          direction={["column", "column", "row", "row", "row"]}
          px={"1em"}
          mt={["2em", "2em", "3em", "4em", "4em"]}
          align={"center"}
          w={"100%"}
        >
          <Stack
            direction={"row"}
            align={"center"}
            bgGradient={"linear(to-b, #013D71, #24365A)"}
            rounded={"3xl"}
            px={"1em"}
            py={"1em"}
            w={["100%", "100%", "33%", "33%", "33%"]}
            h={["4em", "4em", "4.5em", "5em", "5em"]}
          >
            <Stack
              rounded={"full"}
              bgColor={"white"}
              py={"0.25em"}
              px={"0.5em"}
              mr={"1em"}
            >
              <Text
                textColor={"#FD8E09"}
                fontWeight={"bold"}
                fontSize={["small", "medium", "medium", "medium", "medium"]}
              >
                01
              </Text>
            </Stack>
            <Text
              textColor={"white"}
              fontWeight={"bold"}
              fontSize={["small", "medium", "medium", "medium", "medium"]}
            >
              Computer System Engineers
            </Text>
          </Stack>
          <Stack
            direction={"row"}
            align={"center"}
            bgGradient={"linear(to-b, #013D71, #24365A)"}
            rounded={"3xl"}
            px={"1em"}
            py={"1em"}
            w={["100%", "100%", "33%", "33%", "33%"]}
            h={["4em", "4em", "4.5em", "5em", "5em"]}
          >
            <Stack
              rounded={"full"}
              bgColor={"white"}
              py={"0.25em"}
              px={"0.5em"}
              mr={"1em"}
            >
              <Text
                textColor={"#FD8E09"}
                fontWeight={"bold"}
                fontSize={["small", "medium", "medium", "medium", "medium"]}
              >
                02
              </Text>
            </Stack>
            <Text
              textColor={"white"}
              fontWeight={"bold"}
              fontSize={["small", "medium", "medium", "medium", "medium"]}
            >
              Network Engineers
            </Text>
          </Stack>
          <Stack
            direction={"row"}
            align={"center"}
            bgGradient={"linear(to-b, #013D71, #24365A)"}
            rounded={"3xl"}
            px={"1em"}
            py={"1em"}
            w={["100%", "100%", "33%", "33%", "33%"]}
            h={["4em", "4em", "4.5em", "5em", "5em"]}
          >
            <Stack
              rounded={"full"}
              bgColor={"white"}
              py={"0.25em"}
              px={"0.5em"}
              mr={"1em"}
            >
              <Text
                textColor={"#FD8E09"}
                fontWeight={"bold"}
                fontSize={["small", "medium", "medium", "medium", "medium"]}
              >
                03
              </Text>
            </Stack>
            <Text
              textColor={"white"}
              fontWeight={"bold"}
              fontSize={["small", "medium", "medium", "medium", "medium"]}
            >
              Software / Hardware Engineers
            </Text>
          </Stack>
        </Stack>
        <Stack
          direction={["column", "column", "row", "row", "row"]}
          px={"1em"}
          align={"center"}
          w={"100%"}
          my={[0, 0, "0.5em", "1em", "1em"]}
        >
          <Stack
            direction={"row"}
            align={"center"}
            bgGradient={"linear(to-b, #013D71, #24365A)"}
            rounded={"3xl"}
            px={"1em"}
            py={"1em"}
            w={["100%", "100%", "33%", "33%", "33%"]}
            h={["4em", "4em", "4.5em", "5em", "5em"]}
          >
            <Stack
              rounded={"full"}
              bgColor={"white"}
              py={"0.25em"}
              px={"0.5em"}
              mr={"1em"}
            >
              <Text
                textColor={"#FD8E09"}
                fontWeight={"bold"}
                fontSize={["small", "medium", "medium", "medium", "medium"]}
              >
                04
              </Text>
            </Stack>
            <Text
              textColor={"white"}
              fontWeight={"bold"}
              fontSize={["small", "medium", "medium", "medium", "medium"]}
            >
              Embedded System Engineers
            </Text>
          </Stack>
          <Stack
            direction={"row"}
            align={"center"}
            bgGradient={"linear(to-b, #013D71, #24365A)"}
            rounded={"3xl"}
            px={"1em"}
            py={"1em"}
            w={["100%", "100%", "33%", "33%", "33%"]}
            h={["4em", "4em", "4.5em", "5em", "5em"]}
          >
            <Stack
              rounded={"full"}
              bgColor={"white"}
              py={"0.25em"}
              px={"0.5em"}
              mr={"1em"}
            >
              <Text
                textColor={"#FD8E09"}
                fontWeight={"bold"}
                fontSize={["small", "medium", "medium", "medium", "medium"]}
              >
                05
              </Text>
            </Stack>
            <Text
              textColor={"white"}
              fontWeight={"bold"}
              fontSize={["small", "medium", "medium", "medium", "medium"]}
            >
              System Analysts
            </Text>
          </Stack>
          <Stack
            direction={"row"}
            align={"center"}
            bgGradient={"linear(to-b, #013D71, #24365A)"}
            rounded={"3xl"}
            px={"1em"}
            py={"1em"}
            w={["100%", "100%", "33%", "33%", "33%"]}
            h={["4em", "4em", "4.5em", "5em", "5em"]}
          >
            <Stack
              rounded={"full"}
              bgColor={"white"}
              py={"0.25em"}
              px={"0.5em"}
              mr={"1em"}
            >
              <Text
                textColor={"#FD8E09"}
                fontWeight={"bold"}
                fontSize={["small", "medium", "medium", "medium", "medium"]}
              >
                06
              </Text>
            </Stack>
            <Text
              textColor={"white"}
              fontWeight={"bold"}
              fontSize={["small", "medium", "medium", "medium", "medium"]}
            >
              Interface Designers
            </Text>
          </Stack>
        </Stack>
        <Stack
          direction={["column", "column", "row", "row", "row"]}
          px={"1em"}
          align={"center"}
          w={"100%"}
        >
          <Stack
            direction={"row"}
            align={"center"}
            bgGradient={"linear(to-b, #013D71, #24365A)"}
            rounded={"3xl"}
            px={"1em"}
            py={"1em"}
            w={["100%", "100%", "33%", "33%", "33%"]}
            h={["4em", "4em", "4.5em", "5em", "5em"]}
          >
            <Stack
              rounded={"full"}
              bgColor={"white"}
              py={"0.25em"}
              px={"0.5em"}
              mr={"1em"}
            >
              <Text
                textColor={"#FD8E09"}
                fontWeight={"bold"}
                fontSize={["small", "medium", "medium", "medium", "medium"]}
              >
                07
              </Text>
            </Stack>
            <Text
              textColor={"white"}
              fontWeight={"bold"}
              fontSize={["small", "medium", "medium", "medium", "medium"]}
            >
              Research Assistants
            </Text>
          </Stack>
          <Stack
            direction={"row"}
            align={"center"}
            bgGradient={"linear(to-b, #013D71, #24365A)"}
            rounded={"3xl"}
            px={"1em"}
            py={"1em"}
            w={["100%", "100%", "33%", "33%", "33%"]}
            h={["4em", "4em", "4.5em", "5em", "5em"]}
          >
            <Stack
              rounded={"full"}
              bgColor={"white"}
              py={"0.25em"}
              px={"0.5em"}
              mr={"1em"}
            >
              <Text
                textColor={"#FD8E09"}
                fontWeight={"bold"}
                fontSize={["small", "medium", "medium", "medium", "medium"]}
              >
                08
              </Text>
            </Stack>
            <Text
              textColor={"white"}
              fontWeight={"bold"}
              fontSize={["small", "medium", "medium", "medium", "medium"]}
            >
              Scholars
            </Text>
          </Stack>
          <Stack
            direction={"row"}
            align={"center"}
            bgGradient={"linear(to-b, #013D71, #24365A)"}
            rounded={"3xl"}
            px={"1em"}
            py={"1em"}
            w={["100%", "100%", "33%", "33%", "33%"]}
            h={["4em", "4em", "4.5em", "5em", "5em"]}
          >
            <Stack
              rounded={"full"}
              bgColor={"white"}
              py={"0.25em"}
              px={"0.5em"}
              mr={"1em"}
            >
              <Text
                textColor={"#FD8E09"}
                fontWeight={"bold"}
                fontSize={["small", "medium", "medium", "medium", "medium"]}
              >
                09
              </Text>
            </Stack>
            <Text
              textColor={"white"}
              fontWeight={"bold"}
              fontSize={["small", "medium", "medium", "medium", "medium"]}
            >
              Technopreneurs
            </Text>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};
export default CareerProspects;
