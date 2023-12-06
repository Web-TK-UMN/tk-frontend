import { Stack, Image, Text } from "@chakra-ui/react";

const AcademicProfile = () => {
  return (
    <Stack direction={"column"} align={"center"}>
      <Stack
        direction={"column"}
        align={"center"}
        justify={"top"}
        w={"85%"}
        mt={"2em"}
      >
        <Image src="/assets/AcademicProfile.svg" />
      </Stack>
      <Stack
        direction={"row"}
        justify={"center"}
        w={"85%"}
        h={["1.5em", "2em", "2.5em", "2.5em", "2.5em"]}
      >
        <Stack
          direction={"row"}
          rounded={["md", "xl", "xl", "xl", "xl"]}
          w={["40%", "35%", "25%", "25%", "20%"]}
          bgColor={"#FD8E09"}
          align={"center"}
          justify={"center"}
        >
          <Text
            textColor={"white"}
            fontSize={["xx-small", "xx-small", "small", "medium", "large"]}
          >
            Academic Profile
          </Text>
        </Stack>
        <Stack
          direction={"row"}
          rounded={["md", "xl", "xl", "xl", "xl"]}
          w={"80%"}
          bgColor={"#003C72"}
        ></Stack>
      </Stack>
      <Stack direction={"row"} w={"85%"}>
        <Text
          textColor={"#676767"}
          fontSize={["xx-small", "xx-small", "small", "medium", "large"]}
          textAlign={"justify"}
        >
          The Computer Engineering program is designed to produce the graduates
          who are able to develop mobile technology. This program focuses on
          embedded systems as the main part of mobile devices. The program also
          prepares the students to be able to design and build computer networks
          and data communication both in a company and in a mobile format and
          also design various digital-technology-based devices.
        </Text>
      </Stack>
      <Image
        mt={["4em", "4em", "8em", "8em", "8em"]}
        w={"85%"}
        src="/assets/HorizontalLine.svg"
      />
    </Stack>
  );
};

export default AcademicProfile;
