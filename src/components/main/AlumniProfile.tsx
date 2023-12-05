import { createIcon, Stack, Text, Heading, Icon } from "@chakra-ui/react";
import { FaUserGraduate } from "react-icons/fa6";
import { MotionBox, MotionImage } from "../ChakraFramer";

const Triangle = createIcon({
  displayName: "Triangle",
  viewBox: "0 0 400 400",
  path: <path fill="currentColor" d="M 200 25 L 377.5 350 L 22.5 350 Z" />,
});

type Alumni = {
  name: string;
  batch: string;
  picUrl: string;
};

const AlumniProfile = ({ data }: { data: Alumni }) => {
  return (
    <Stack pos={"relative"} h={"23em"} w={"20em"} overflow={"hidden"}>
      <MotionBox
        initial={{
          y: 25,
          opacity: 0,
          zIndex: 1,
        }}
        whileInView={{
          y: 0,
          opacity: 1,
          zIndex: 1,
        }}
        // @ts-expect-error chakra ui typescript error
        transition={{
          duration: 1,
          ease: "easeOut",
        }}
      >
        <Triangle
          top={0}
          left={"50%"}
          transform={"translateX(-50%)"}
          pos={"absolute"}
          boxSize={"16em"}
          color={"transparent"}
          stroke={"#FD8E09"}
          strokeWidth={"0.5em"}
          zIndex={1}
        />
      </MotionBox>

      <MotionBox
        initial={{
          y: 25,
          opacity: 0,
          zIndex: 2,
        }}
        whileInView={{
          y: 0,
          opacity: 1,
          zIndex: 2,
        }}
        // @ts-expect-error chakra ui typescript error
        transition={{
          duration: 1,
          delay: 0.2,
          ease: "easeOut",
        }}
      >
        <Triangle
          // top={"2.5em"}
          mt={"2.5em"}
          left={"50%"}
          transform={"translateX(-50%)"}
          pos={"absolute"}
          boxSize={"16em"}
          color={"white"}
          strokeWidth={"1em"}
          zIndex={2}
        />
      </MotionBox>

      <MotionBox
        initial={{
          y: 25,
          opacity: 0,
          zIndex: 3,
        }}
        whileInView={{
          y: 0,
          opacity: 1,
          zIndex: 3,
        }}
        // @ts-expect-error chakra ui typescript error
        transition={{
          duration: 1,
          delay: 0.4,
          ease: "easeOut",
        }}
      >
        <Triangle
          // top={"5em"}
          mt={"5em"}
          left={"50%"}
          transform={"translateX(-50%)"}
          pos={"absolute"}
          boxSize={"16em"}
          color={"#013D71"}
          strokeWidth={"1em"}
          zIndex={3}
        />
      </MotionBox>

      {/* kiri kanan */}

      <MotionBox
        initial={{
          y: 25,
          opacity: 0,
          zIndex: 4,
        }}
        whileInView={{
          y: 0,
          opacity: 1,
          zIndex: 4,
        }}
        // @ts-expect-error chakra ui typescript error
        transition={{
          duration: 1,
          delay: 0.6,
          ease: "easeOut",
        }}
      >
        <Triangle
          mt={"3em"}
          left={"80%"}
          transform={"translateX(-50%)"}
          pos={"absolute"}
          boxSize={"1.5em"}
          color={"#FD8E09"}
          zIndex={2}
        />
      </MotionBox>

      <MotionBox
        initial={{
          y: 25,
          opacity: 0,
          zIndex: 4,
        }}
        whileInView={{
          y: 0,
          opacity: 1,
          zIndex: 4,
        }}
        // @ts-expect-error chakra ui typescript error
        transition={{
          duration: 1,
          delay: 0.8,
          ease: "easeOut",
        }}
      >
        <Triangle
          // top={"7em"}
          mt={"5em"}
          left={"20%"}
          transform={"translateX(-50%)"}
          pos={"absolute"}
          boxSize={"1em"}
          color={"white"}
          zIndex={2}
        />
      </MotionBox>

      <Stack
        pos={"absolute"}
        direction={"column"}
        h={"full"}
        w={"full"}
        zIndex={5}
        gap={0}
      >
        <MotionImage
          style={{
            height: "100%",
            width: "100%",
            objectFit: "cover",
          }}
          initial={{
            y: 25,
            opacity: 0,
          }}
          whileInView={{
            y: 0,
            opacity: 1,
          }}
          // @ts-expect-error chakra ui typescript error
          transition={{
            duration: 0.5,
            // delay: 0.2,
            ease: "easeOut",
          }}
          src={data.picUrl}
        />
        <Stack
          direction={"row"}
          w={"full"}
          h={"3em"}
          bottom={0}
          left={0}
          bgColor={"#FD8E09"}
          p={"0.5em"}
          align={"center"}
          justify={"center"}
          zIndex={5}
          color={"#013D71"}
        >
          <MotionBox
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            initial={{
              y: 10,
              opacity: 0,
            }}
            whileInView={{
              y: 0,
              opacity: 1,
            }}
            // @ts-expect-error chakra ui typescript error
            transition={{
              duration: 1,
              delay: 0.2,
              ease: "easeOut",
            }}
          >
            <Heading size={"lg"}>{data.batch}</Heading>
            <Icon as={FaUserGraduate} boxSize={"1.25em"} mx={"0.25em"} />
            <Text>- {data.name}</Text>
          </MotionBox>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default AlumniProfile;
