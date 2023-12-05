import {
  Stack,
  Image,
  Text,
  Box,
  IconButton,
  Icon,
  VisuallyHidden,
} from "@chakra-ui/react";
import AlumniProfile from "@/components/main/AlumniProfile";
import Slider from "react-slick";
import { RxChevronLeft, RxChevronRight } from "react-icons/rx";
import { useRef } from "react";
import { MotionBox, MotionStack } from "@/components/ChakraFramer";

const alumnis = [
  {
    name: "John Thor",
    batch: "'20",
    picUrl: "/assets/alumni/abang_jago.png",
    quotes:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.",
  },
  {
    name: "John Thor",
    batch: "'20",
    picUrl: "/assets/alumni/abang_jago.png",
    quotes:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.",
  },
  {
    name: "John Thor",
    batch: "'20",
    picUrl: "/assets/alumni/abang_jago.png",
    quotes:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.",
  },
  {
    name: "John Thor",
    batch: "'20",
    picUrl: "/assets/alumni/abang_jago.png",
    quotes:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.",
  },
];

const AlumniCornerSectionSection = () => {
  const slickRef = useRef<Slider>(null);

  return (
    <Stack
      bgImage={"/assets/bgUMNblue.png"}
      bgSize={"cover"}
      bgPos={"center"}
      bgRepeat={"no-repeat"}
      align={"center"}
      justify={"center"}
      py={"4em"}
    >
      <MotionBox
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
        <VisuallyHidden>Alumni Corner</VisuallyHidden>
        <Image
          src={"/assets/TextAlumniCorner.svg"}
          w={["18em", "18em", "24em", "24em", "24em"]}
        />
      </MotionBox>

      <MotionBox
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
          delay: 1,
        }}
      >
        <Slider
          infinite
          speed={1000}
          slidesToShow={1}
          slidesToScroll={1}
          draggable
          autoplay
          autoplaySpeed={5000}
          pauseOnHover
          pauseOnFocus
          easing="ease-in-out"
          arrows={false}
          ref={slickRef}
        >
          {alumnis.map((alumni) => (
            <Box key={alumni.name}>
              <Stack
                direction={["column", "column", "column", "row", "row"]}
                px={["1em", "1em", "4em", "8em", "8em"]}
                py={"1em"}
                gap={"4em"}
                align={"center"}
                justify={"center"}
              >
                <AlumniProfile
                  data={{
                    name: alumni.name,
                    batch: alumni.batch,
                    picUrl: alumni.picUrl,
                  }}
                />
                <MotionStack
                  flex={1}
                  m={["none", "none", "none", "3em", "3em"]}
                  p={"2em"}
                  border={"4px solid white"}
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
                  <Text textColor={"white"}>{alumni.quotes}</Text>
                </MotionStack>
              </Stack>
            </Box>
          ))}
        </Slider>
      </MotionBox>

      {/* custom button react slick */}
      <Stack
        direction={"row"}
        w={"full"}
        pos={"absolute"}
        justify={"space-between"}
      >
        <IconButton
          variant={"unstyled"}
          color={"white"}
          aria-label="slide-left"
          icon={<Icon as={RxChevronLeft} boxSize={"3em"} opacity={0.5} />}
          onClick={() => slickRef.current?.slickPrev()}
        />
        <IconButton
          variant={"unstyled"}
          color={"white"}
          aria-label="slide-right"
          icon={<Icon as={RxChevronRight} boxSize={"3em"} opacity={0.5} />}
          onClick={() => slickRef.current?.slickNext()}
        />
      </Stack>
    </Stack>
  );
};

export default AlumniCornerSectionSection;
