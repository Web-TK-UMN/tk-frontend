import PakSam from "@/components/pakSam";
import { Stack, Text, Image, Show, Center } from "@chakra-ui/react";
import { motion } from "framer-motion";

const TestingCompo = () => {
  return (
    <>
      <Stack
        bgImage={"/assets/bgUMNblue.png"}
        bgSize={"cover"}
        bgPosition={"center"}
        minH={"640px"}
      >
        {/* Desktop */}
        <Show breakpoint="(min-width: 700px)">
          <Stack flexDirection={"row"} margin={"3em"}>
            <Stack flex={"1"} w={"100%"} h={"100%"}>
              {/* 2 Segitiga atas bawah */}
              <Image
                src="/assets/DoubleTriangle.svg"
                w={"2em"}
                zIndex={"1"}
                position={"absolute"}
                maxWidth={"100%"}
                transform={"translateX(-50%)"}
                top={"15%"}
                left={["4%", "4%", "6%", "8%", "8%"]}
              />
              <Image
                src="/assets/DoubleTriangle.svg"
                w={"2em"}
                zIndex={"1"}
                position={"absolute"}
                transform={"rotate(180deg) translateX(-50%)"}
                bottom={"15%"}
                left={"40%"}
                maxWidth={"100%"}
              />

              {/* Inner Triangle (Kuning) */}
              <Image
                src="/assets/InnerTriangle.svg"
                w={["16em", "18em", "20em", "22em", "24em"]}
                zIndex={"2"}
                position={"absolute"}
                transform={"translateX(-50%)"}
                bottom={["24%", "23%", "22%", "21%", "20%"]}
                left={["19%", "21%", "23%", "25%", "25%"]}
                maxWidth={"100%"}
              />

              {/* Outer Triangle (Biru) */}
              <Image
                src="/assets/OutterTriangle.svg"
                w={["16em", "18em", "20em", "22em", "24em"]}
                zIndex={"3"}
                position={"absolute"}
                transform={"translateX(-50%)"}
                bottom={["32%", "31%", "30%", "29%", "28%"]}
                left={["19%", "21%", "23%", "25%", "25%"]}
                maxWidth={"100%"}
              />

              {/* Sir Samuel */}
              <Image
                src="/assets/MrSamuel.png"
                w={["22em", "24em", "26em", "28em", "30em"]}
                zIndex={"3"}
                position={"absolute"}
                transform={"translateX(-50%)"}
                bottom={["24%", "23%", "22%", "21%", "20%"]}
                left={["12%", "14%", "16%", "19%", "19%"]}
                maxWidth={"100%"}
              />
            </Stack>
            <Stack flex={"1"} color={"white"} margin={"2em"} paddingTop={"3em"}>
              <Text fontWeight="normal">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Qui,
                architecto. Aperiam eius explicabo, similique molestias quasi
                inventore necessitatibus reprehenderit ab accusantium error
                libero, placeat, delectus cupiditate esse optio iure iusto!
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Beatae
                quos eveniet explicabo non nemo. Beatae rem inventore facere ad.
                Molestiae harum eum cupiditate, et iure ad praesentium mollitia
                iste expedita!
              </Text>
              <Text paddingTop={"3em"}>Regards,</Text>
              <Text fontWeight={"semibold"}>
                Head of the Study Program Computer Engineering
              </Text>
              <Text fontWeight={"semibold"}>
                Universitas Multimedia Nusantara
              </Text>
            </Stack>
          </Stack>
        </Show>

        {/* Mobile */}
        <Show breakpoint="(max-width: 699px)">
          <Stack flexDirection={"column"} margin={"3em"}>
            <Center flex={"1"} position="relative" w={"100%"} minH={"640px"}>
              <Stack flex={"1"} w={"100%"}>
                {/* 2 Segitiga atas bawah */}
                <Image
                  src="/assets/DoubleTriangle.svg"
                  w={"2em"}
                  zIndex={"1"}
                  position={"absolute"}
                  maxWidth={"100%"}
                  transform={"translateX(-50%)"}
                  left={"10%"}
                  top={"2%"}
                />
                <Image
                  src="/assets/DoubleTriangle.svg"
                  w={"2em"}
                  zIndex={"1"}
                  position={"absolute"}
                  transform={"rotate(180deg) translateX(-50%)"}
                  bottom={"10%"}
                  right={"10%"}
                  maxWidth={"100%"}
                />

                {/* Inner Triangle (Kuning) */}
                <Image
                  src="/assets/InnerTriangle.svg"
                  w={["16em", "18em", "20em", "22em", "24em"]}
                  zIndex={"2"}
                  position={"absolute"}
                  transform={"translateX(-50%)"}
                  bottom={["29%", "28%", "22%", "21%", "20%"]}
                  left={"50%"}
                  maxWidth={"100%"}
                />

                {/* Outer Triangle (Biru) */}
                <Image
                  src="/assets/OutterTriangle.svg"
                  w={["16em", "18em", "20em", "22em", "24em"]}
                  zIndex={"3"}
                  position={"absolute"}
                  transform={"translateX(-50%)"}
                  bottom={["37%", "36%", "30%", "29%", "28%"]}
                  left={"50%"}
                  maxWidth={"100%"}
                />

                {/* Sir Samuel */}
                <Image
                  src="/assets/MrSamuel.png"
                  w={["22em", "24em", "26em", "28em", "30em"]}
                  zIndex={"3"}
                  position={"absolute"}
                  transform={"translateX(-50%)"}
                  bottom={"30%"}
                  left={"35%"}
                  maxWidth={"100%"}
                />
              </Stack>
            </Center>
            <Stack flex={"1"} color={"white"} px={"1em"}>
              <Text fontWeight="normal">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Qui,
                architecto. Aperiam eius explicabo, similique molestias quasi
                inventore necessitatibus reprehenderit ab accusantium error
                libero, placeat, delectus cupiditate esse optio iure iusto!
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Beatae
                quos eveniet explicabo non nemo. Beatae rem inventore facere ad.
                Molestiae harum eum cupiditate, et iure ad praesentium mollitia
                iste expedita!
              </Text>
              <Text paddingTop={"3em"}>Regards,</Text>
              <Text fontWeight={"semibold"}>
                Head of the Study Program Computer Engineering
              </Text>
              <Text fontWeight={"semibold"}>
                Universitas Multimedia Nusantara
              </Text>
            </Stack>
          </Stack>
        </Show>
      </Stack>
    </>
  );
};
export default TestingCompo;
