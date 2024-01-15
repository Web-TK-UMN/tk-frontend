import { Stack, Text, Image, Link } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

import GenericFooter from "@/components/GenericFooter";
const Footer = () => {
  return (
    <>
      <Stack
        as={"footer"}
        bgImage={"/assets/bgFooter.png"}
        bgPosition={"center"}
        bgSize={"cover"}
        minH={"28em"}
        color={"white"}
        gap={0}
        zIndex={2}
        py={"4em"}
        px={["2em", "2em", "6em", "6em", "6em"]}
        roundedTop={"2xl"}
      >
        <Stack
          flexDirection={["column", "column", "column", "row", "row"]}
          gap={"3em"}
        >
          <Stack flex={"1"}>
            <Image
              src="/assets/LogoUMNdanText.svg"
              w={"20em"}
              // marginStart={["1em", "1em", "1em", "5.2em", "5.2em"]}
              // marginTop={"3.3em"}
            />
            <Text fontSize={"xl"} fontWeight={"semibold"} paddingTop={"1em"}>
              Fakultas Teknik & Informatika <br />
              Universitas Multimedia Nusantara
            </Text>
            <Text fontSize={"md"} textAlign={"justify"}>
              Jl. Scientia Boulevard, Gading Serpong, Kel. Curug <br />
              Sangereng, Kec. Kelapa Dua, Kab. Tangerang, Prov. <br />
              Banten 15810, Indonesia
            </Text>
          </Stack>
          <Stack flex={"1"}>
            <Stack flexDirection={"row"}>
              <Stack flex={"1"}>
                <Text fontSize={"xl"} fontWeight={"semibold"}>
                  Links
                </Text>
                <Link href={"https://my.umn.ac.id/"} isExternal>
                  My UMN
                </Link>
                <Link href={"https://elearning.umn.ac.id/"} isExternal>
                  E-Learning
                </Link>
                <Link href={"https://elearning.umn.ac.id/"} isExternal>
                  Gapura
                </Link>
                <Link href={"https://library.umn.ac.id"} isExternal>
                  Library
                </Link>
                <Link href={"https://cdc.umn.ac.id/"} isExternal>
                  CDC
                </Link>
              </Stack>
              <Stack flex={"1"}>
                <Text fontSize={"xl"} fontWeight={"semibold"}>
                  Sections
                </Text>
                <Link as={RouterLink} to={"/"}>
                  Home
                </Link>
                <Link as={RouterLink} to={"/#academic"}>
                  Academic Profile
                </Link>
                <Link as={RouterLink} to={"/#career"}>
                  Career Prospects
                </Link>
                <Link as={RouterLink} to={"/#alumni"}>
                  Alumni Corner
                </Link>
                <Link as={RouterLink} to={"/#news"}>
                  News
                </Link>
              </Stack>
            </Stack>
          </Stack>
          <Stack flex={"1"}>
            <Text fontSize={"xl"} fontWeight={"semibold"}>
              Admission Information
            </Text>
            <Stack
              bgColor={"whiteAlpha.300"}
              borderRadius={"1em"}
              padding={"1em"}
            >
              <Text fontWeight={"bold"} lineHeight={"1"}>
                E-mail:
              </Text>
              <Text lineHeight={"1"}>admisi@umn.ac.id</Text>
              <Text fontWeight={"bold"} lineHeight={"1"}>
                Format:
              </Text>
              <Text>
                Nama, Alamat, <br />
                No. Telp, Jurusan yang diminati, <br />
                dan Keterangan
              </Text>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
      <GenericFooter></GenericFooter>
    </>
  );
};

export default Footer;
