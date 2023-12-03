import { Stack, Image, Wrap, Spinner, Text } from "@chakra-ui/react";
import NewsCard from "@/components/NewsCard";
import useSWR from "swr";
import axios from "axios";
import { motion } from "framer-motion";

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
        bgImage={"/assets/bgNews.png"}
        bgSize="cover"
        bgPosition="center"
        p={"1em"}
        py={"4em"}
      >
        <motion.div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginBottom: "2em",
          }}
          viewport={{ once: true }}
          initial={{
            opacity: 0,
            y: -10,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
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
        </motion.div>
        {isLoading && (
          <Stack align={"center"} justify={"center"}>
            <Spinner />
            <Text>Loading...</Text>
          </Stack>
        )}
        {data && (
          <Wrap spacing={"1em"} justify="center" style={{ gap: "1em" }}>
            {data.data.map((news, index) => (
              <motion.div
                key={index}
                viewport={{ once: true }}
                initial={{ opacity: 0, y: -10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.2,
                  ease: "easeOut",
                }}
              >
                <NewsCard data={news} />
              </motion.div>
            ))}
          </Wrap>
        )}
      </Stack>
    </>
  );
};

export default NewsSection;
