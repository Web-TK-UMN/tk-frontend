import { Stack, Image, Wrap, WrapItem, Center } from "@chakra-ui/react";
import NewsCard from "@/components/NewsCard";

const NewsSection = () => {
  return (
    <>
      <Stack bgImage={"/assets/bgNews.png"} bgSize="cover" bgPosition="center">
        <Stack
          direction={"row"}
          justifyContent={"center"}
          alignItems={"center"}
          spacing={"2em"}
          py={"2em"}
        >
          <Image src="/assets/TextLogoNews.png" w={"25em"}></Image>
        </Stack>
        <Stack px={"2em"}>
          <Wrap spacing={14} justify="center">
            <WrapItem>
              <Center>
                <NewsCard />
              </Center>
            </WrapItem>
            <WrapItem>
              <Center>
                <NewsCard />
              </Center>
            </WrapItem>
            <WrapItem>
              <Center>
                <NewsCard />
              </Center>
            </WrapItem>
            <WrapItem>
              <Center>
                <NewsCard />
              </Center>
            </WrapItem>
            <WrapItem>
              <Center>
                <NewsCard />
              </Center>
            </WrapItem>
          </Wrap>
        </Stack>
      </Stack>
    </>
  );
};
export default NewsSection;
