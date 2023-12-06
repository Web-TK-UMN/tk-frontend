import { Stack, Image, Wrap, Spinner, Text, Show } from "@chakra-ui/react";
import NewsCard from "@/components/NewsCard";
import useSWR from "swr";
import axios from "axios";

import Slider from "react-slick";
import { MotionBox, MotionStack } from "@/components/ChakraFramer";

type Category = {
  name: string;
  slug: string;
};

type NewsListDto = {
  body: string;
  category: Category;
  excerpt: string;
  image: string;
  title: string;
  slug: string;
};

const NewsSection = () => {
  // raw swr
  const { isLoading, data } = useSWR<{ data: NewsListDto[] }>(
    "https://aces.umn.ac.id/backend/api/posts",
    (url: string) => axios.get(url).then((res) => res.data)
  );

  return (
    <>
      <Stack
        id="news"
        // bgImage={"/assets/bgNews.png"}
        bgSize="cover"
        bgPosition="center"
        py={"4em"}
        px={["none", "none", "6em", "6em", "6em"]}
      >
        <MotionStack
          justifyContent={"center"}
          alignItems={"center"}
          marginBottom={"2em"}
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
          <Image
            src="/assets/TextLogoNews.svg"
            w={["16em", "20em", "22em", "24em", "24em"]}
          />
        </MotionStack>
        {isLoading && (
          <Stack align={"center"} justify={"center"}>
            <Spinner />
            <Text>Loading...</Text>
          </Stack>
        )}
        <Show above="md">
          {data && (
            <Wrap spacing={"1em"} justify="center" style={{ gap: "1em" }}>
              {data.data.map((news, index) => (
                <MotionBox
                  key={index}
                  viewport={{ once: true }}
                  initial={{ opacity: 0, y: -10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  // @ts-expect-error chakra ui typescript error
                  transition={{
                    duration: 0.5,
                    delay: index * 0.2,
                    ease: "easeOut",
                  }}
                >
                  <NewsCard data={news} />
                </MotionBox>
              ))}
            </Wrap>
          )}
        </Show>
        <Show below="md">
          {data && (
            <Slider
              dots={true}
              infinite={true}
              speed={500}
              slidesToShow={1}
              slidesToScroll={1}
              draggable={true}
              arrows={false}
              autoplay={true}
              autoplaySpeed={3000}
              pauseOnHover={true}
              pauseOnFocus={true}
              easing="ease-in-out"
              centerMode={true}
            >
              {data.data.map((news) => (
                <NewsCard data={news} />
              ))}
            </Slider>
          )}
        </Show>
      </Stack>
    </>
  );
};

export default NewsSection;
