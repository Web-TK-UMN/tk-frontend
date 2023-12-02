import { Stack, Text, Button, Icon } from "@chakra-ui/react";
import { FaArrowRightLong } from "react-icons/fa6";
import { motion } from "framer-motion";

const NewsCard = () => {
  return (
    <>
      <Stack
        w={"400px"}
        h={"509px"}
        bgImage={"/assets/gue.jpeg"}
        bgSize="cover"
        bgPosition="center"
        borderRadius={"xl"}
        position={"relative"}
      >
        <Stack
          bgColor={"rgba(0, 60, 144, 0.6)"}
          h={" 100%"}
          borderRadius={"xl"}
        >
          <Stack flex={"1"}>
            <Text
              margin={"1.5em"}
              bgColor={"white"}
              display={"inline-block"}
              w={"fit-content"}
              px={"0.5em"}
              fontWeight={"semibold"}
              color={"#FD8E09"}
              boxShadow={"lg"}
            >
              Pemilihan Jodoh
            </Text>
          </Stack>
          <Stack
            bgColor={"rgba(105, 105, 105, 0.3)"}
            flex={"1"}
            borderBottomRadius={"xl"}
          >
            <Stack color={"white"} margin={"2em"}>
              <Text fontSize={"4xl"} as={"cite"} fontWeight={"bold"}>
                Hi Im Juntol
              </Text>
              <Text fontSize={"md"}>
                Im a Communication Science Student, and im going to get ur
                number and insta after this. Stay with me for 2 min.
              </Text>
            </Stack>
          </Stack>
        </Stack>
        <Button
          position="absolute"
          bottom={0}
          right={0}
          bgColor={"transparent"}
          mx={"0.8em"}
          my={"1em"}
        >
          <Icon
            as={FaArrowRightLong}
            boxSize={6}
            style={{ color: "#FD8E09" }}
          />
        </Button>
      </Stack>
    </>
  );
};

export default NewsCard;
