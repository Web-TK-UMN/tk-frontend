import { Stack, Text, Image } from "@chakra-ui/react";

const Statistic = () => {
  return (
    <Stack direction={"column"} align={"center"} w={"100%"}>
      {" "}
      <Stack
        direction={["column", "column", "row", "row", "row"]}
        w={"100%"}
        align={"center"}
        justify={"center"}
        mt={"2em"}
      >
        <Stack
          direction={"row"}
          align={"center"}
          justify={"center"}
          fontSize={["small", "medium", "large", "large", "x-large"]}
          fontWeight={600}
        >
          <Text>we are continuously refining and </Text>
        </Stack>
        <Stack direction={"row"} align={"center"} justify={"center"}>
          <Stack direction={"row"} align={"center"} justify={"center"}>
            <Text
              fontSize={["small", "medium", "large", "large", "x-large"]}
              fontWeight={600}
            >
              enhancing process for
            </Text>
          </Stack>
          <Stack
            direction={"row"}
            align={"center"}
            justify={"center"}
            textColor={"#003C72"}
          >
            <Text
              fontSize={["small", "medium", "large", "large", "x-large"]}
              fontWeight={600}
            >
              better results.
            </Text>
          </Stack>
        </Stack>
      </Stack>
      <Stack direction={"row"} w={"85%"} justify={"space-between"} mt={"2em"}>
        <Stack direction={"column"}>
          <Image src="/assets/GPA.svg" />
          <Stack direction={"column"} align={"end"} mt={"-30%"} px={"1em"}>
            <Text
              fontWeight={"bold"}
              fontSize={[
                "large",
                "large",
                "xx-large",
                "xxx-large",
                "xxx-large",
              ]}
              textColor={"#555555"}
            >
              3.14
            </Text>
            <Text
              fontSize={["x-small", "medium", "large", "large", "x-large"]}
              textColor={"#555555"}
            >
              student's average GPA
            </Text>
          </Stack>
        </Stack>
        <Stack direction={"column"}>
          <Stack direction={"column"}>
            <Image src="/assets/Employment.svg" />
            <Stack direction={"column"} align={"end"}>
              <Stack direction={"row"} align={"center"} mt={"-25%"} px={"1em"}>
                <Text
                  fontSize={[
                    "large",
                    "large",
                    "xx-large",
                    "xxx-large",
                    "xxx-large",
                  ]}
                  fontWeight={"bold"}
                  textColor={"#555555"}
                >
                  3
                </Text>
                <Text
                  fontSize={[
                    "medium",
                    "medium",
                    "x-large",
                    "xx-large",
                    "xx-large",
                  ]}
                  fontWeight={"bold"}
                  textColor={"#555555"}
                >
                  Months
                </Text>
              </Stack>
              <Stack direction={"row"} align={"center"} px={"1em"}>
                <Text
                  textAlign={"justify"}
                  fontSize={["x-small", "medium", "small", "large", "x-large"]}
                  textColor={"#555555"}
                >
                  average waiting time from graduation to getting the first job
                </Text>
              </Stack>
            </Stack>
          </Stack>
          <Stack direction={"column"}>
            <Image src="/assets/Rectangle.svg" />
            <Stack direction={"column"} align={"end"} mt={"-10%"} px={"1em"}>
              <Text
                fontSize={["x-small", "medium", "small", "large", "x-large"]}
                textColor={"#555555"}
              >
                i don't know
              </Text>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
      <Stack direction={"column"} w={"85%"} align={"center"}>
        <Image
          src="/assets/HorizontalLine.svg"
          w={"100%"}
          mt={"8em"}
          transform="scaleY(-1)"
        />
      </Stack>
    </Stack>
  );
};
export default Statistic;
