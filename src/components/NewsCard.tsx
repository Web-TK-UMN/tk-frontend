import {
  Stack,
  Text,
  Image,
  Icon,
  Badge,
  Heading,
  Link,
} from "@chakra-ui/react";
import { FaArrowRightLong } from "react-icons/fa6";
import { motion, useAnimation } from "framer-motion";

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

const NewsCard = ({ data }: { data: NewsListDto }) => {
  const bgImageControl = useAnimation();
  const cardDetailControl = useAnimation();

  return (
    <>
      <Stack
        as={Link}
        href={`https://aces.umn.ac.id/article/${data.slug}`}
        isExternal
        _hover={{ textDecoration: "none" }}
        w={"18em"}
        h={"22em"}
        borderRadius={"xl"}
        position={"relative"}
        onMouseEnter={() => {
          bgImageControl.start({
            scale: 1.1,
            transition: { duration: 0.3, ease: "easeInOut" },
          });

          cardDetailControl.start({
            height: "100%",
            transition: { duration: 0.3, ease: "easeInOut" },
          });
        }}
        onMouseLeave={() => {
          bgImageControl.start({
            scale: 1,
            transition: { duration: 0.3, ease: "easeInOut" },
          });

          cardDetailControl.start({
            height: "50%",
            transition: { duration: 0.3, ease: "easeInOut" },
          });
        }}
        overflow={"hidden"}
      >
        <Image
          as={motion.img}
          src={data.image}
          objectFit={"cover"}
          h={"full"}
          w={"full"}
          rounded={"xl"}
          // zIndex={1}
          overflow={"hidden"}
          objectPosition={"center"}
          pos={"absolute"}
          animate={bgImageControl}
        />
        <Stack
          bgColor={"rgba(0, 60, 144, 0.6)"}
          h={"full"}
          borderRadius={"xl"}
          zIndex={2}
        >
          <Stack flex={"1"}>
            <Badge
              rounded={"md"}
              bgColor={"white"}
              m={"1em"}
              w={"fit-content"}
              fontWeight={"semibold"}
              color={"#FD8E09"}
            >
              {data.category.name}
            </Badge>
          </Stack>
          <Stack
            as={motion.div}
            bgColor={"rgba(105, 105, 105, 0.3)"}
            // flex={"1"}
            height={"50%"}
            borderBottomRadius={"xl"}
            id="news-detail"
            animate={cardDetailControl}
          >
            <Stack
              color={"white"}
              margin={"2em"}
              overflow={"hidden"}
              textOverflow={"ellipsis"}
            >
              <Heading fontSize={"lg"} fontStyle={"italic"} fontWeight={"bold"}>
                {data.title}
              </Heading>
              <Text fontSize={"sm"}>{data.excerpt}</Text>
            </Stack>
          </Stack>
        </Stack>
        <Icon
          position="absolute"
          as={FaArrowRightLong}
          bottom={0}
          right={0}
          m={"1em"}
          boxSize={"1.5em"}
          style={{ color: "#FD8E09" }}
          zIndex={2}
        />
      </Stack>
    </>
  );
};

export default NewsCard;
