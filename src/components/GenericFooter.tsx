import { Stack, Text } from "@chakra-ui/react";

const Footer = () => {
  return (
    <Stack
      pos={"absolute"}
      bottom={0}
      left={0}
      minH={"2em"}
      w={"full"}
      bgColor={"#003D73"}
      align={"center"}
      justify={"center"}
      textAlign={"center"}
    >
      <Text color={"white"}>
        © 2023 | Fakultas Teknik & Informatika, Universitas Multimedia Nusantara
      </Text>
    </Stack>
  );
};

export default Footer;