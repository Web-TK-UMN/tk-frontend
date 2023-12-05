import { Stack, Text, Image, Link } from "@chakra-ui/react";
import GenericFooter from "@/components/GenericFooter";
const Footer = () => {
  return (
    <>
      <Stack
        bgImage={"/assets/bgFooter.png"}
        bgPosition={"center"}
        bgSize={"cover"}
        minH={"429px"}
        color={"white"}
      >
        <Stack
          flexDirection={["column", "column", "column", "row", "row"]}
          marginBottom={["3.5em", "3.5em", "2.5em", "2.5em", "2.5em"]}
        >
          <Stack flex={"1.3"}>
            <Image
              src="/assets/LogoUMNdanText.svg"
              w={"20em"}
              marginStart={["1em", "1em", "1em", "5.2em", "5.2em"]}
              marginTop={"3.3em"}
            />
            <Text
              marginStart={["1.3em", "1.3em", "1.3em", "4.56em", "4.56em"]}
              marginEnd={["1em", "1em", "1em", "1em", "1em"]}
              fontSize={"xl"}
              fontWeight={"semibold"}
              paddingTop={"1em"}
            >
              Fakultas Teknik & Informatika <br />
              Universitas Multimedia Nusantara
            </Text>
            <Text
              fontSize={"md"}
              marginStart={["1.5em", "1.5em", "1.5em", "5.7em", "5.7em"]}
              marginEnd={["1em", "1em", "1em", "1em", "1em"]}
            >
              Jl. Scientia Boulevard, Gading Serpong, Kel. Curug <br />
              Sangereng, Kec. Kelapa Dua, Kab. Tangerang, Prop. <br />
              Banten 15810, Indonesia
            </Text>
          </Stack>
          <Stack flex={"0.9"} paddingTop={"4.5em"}>
            <Stack flexDirection={"row"}>
              <Stack
                marginStart={["1.5em", "1.5em", "1.5em", "5.5em", "5.5em"]}
                marginEnd={["1em", "1em", "1em", "1em", "1em"]}
                flex={"1"}
              >
                <Text fontSize={"xl"} fontWeight={"semibold"}>
                  Links
                </Text>
                <Link>My UMN</Link>
                <Link>E-Learning</Link>
                <Link>Gapura</Link>
                <Link>Library</Link>
                <Link>CDC</Link>
              </Stack>
              <Stack flex={"1"}>
                <Text fontSize={"xl"} fontWeight={"semibold"}>
                  Pages
                </Text>
                <Link>Home</Link>
                <Link>Academic Profile</Link>
                <Link>Career Prospects</Link>
                <Link>Alumni Corner</Link>
                <Link>News</Link>
              </Stack>
            </Stack>
          </Stack>
          <Stack flex={"1.2"} paddingTop={"4.5em"}>
            <Text
              fontSize={"xl"}
              fontWeight={"semibold"}
              marginStart={["1.2em", "1.2em", "1.2em", "4em", "4em"]}
              marginEnd={["1em", "1em", "1em", "1em", "1em"]}
            >
              Admission Information
            </Text>
            <Stack
              bgColor={"whiteAlpha.300"}
              marginStart={["1.3em", "1.3em", "1.3em", "5em", "5em"]}
              marginEnd={["1.3em", "1.3em", "1.3em", "5.5em", "5.5em"]}
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
