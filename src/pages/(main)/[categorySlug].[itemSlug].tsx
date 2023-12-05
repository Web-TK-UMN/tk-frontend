import ProfileCard from "@/components/ProfileCard";
import { useParams } from "@/router";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Heading,
  Spinner,
  Stack,
  Text,
  Wrap,
} from "@chakra-ui/react";
import useSWR from "swr";

import { motion } from "framer-motion";

type Author = {
  name: string;
};

type DynamicPageDto = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  content: string;
  author: Author;
};

type LinkPageDto = {
  id: string;
  url: string;
  createdAt: Date;
  updatedAt: Date;
  author: Author;
};

type ProfileDto = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  name: string;
  email: string;
  picUrl: string;
  position: string;
  expertise: string;
  staffHandbookLink: string;
  profileUrl: string;
  profilePageId: string | null;
};

type ProfilePageDto = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  description: string;
  profile: ProfileDto[];
  author: Author;
};

type Category = {
  id: string;
  name: string;
  slug: string;
};

type ItemDto =
  | {
      id: string;
      title: string;
      slug: string;
      type: "DYNAMIC";
      content: DynamicPageDto | null;
      Category: Category;
      createdAt: string;
      updatedAt: string;
    }
  | {
      id: string;
      title: string;
      slug: string;
      type: "PROFILE";
      content: ProfilePageDto | null;
      Category: Category;
      createdAt: string;
      updatedAt: string;
    }
  | {
      id: string;
      title: string;
      slug: string;
      type: "LINK";
      content: LinkPageDto | null;
      Category: Category;
      createdAt: string;
      updatedAt: string;
    };

const DynamicContent = () => {
  const { categorySlug, itemSlug } = useParams(
    "/cms/category/:categorySlug/:itemSlug"
  );
  const { isLoading, data } = useSWR<ItemDto>(
    `/item/${categorySlug}/${itemSlug}`
  );

  if (isLoading) {
    return (
      <Stack flex={1} align={"center"} justify={"center"} color={"#003D73"}>
        <Spinner />
        <Text>Loading...</Text>
      </Stack>
    );
  }

  if (!data || !data.content) {
    return (
      <Stack
        flex={1}
        align={"center"}
        justify={"center"}
        color={"#003D73"}
        p={"1em"}
      >
        <Heading size={"4xl"}>404</Heading>
        <Heading size={"xl"} textColor={"#D87B2B"}>
          Page not found
        </Heading>

        <Text textAlign={"center"}>
          We can't seem to find the page that you are looking for.
        </Text>
      </Stack>
    );
  }

  return (
    <>
      <Stack
        bgImage={"/assets/frame_dynamic.png"}
        bgPos={"center"}
        bgSize={"cover"}
        bgRepeat={"no-repeat"}
        h={"16em"}
        color={"white"}
        justify={"center"}
        px={["2em", "2em", "6em", "6em", "6em"]}
        roundedBottom={"xl"}
      >
        <motion.div
          key={data.id}
          style={{
            display: "flex",
            gap: "0.5em",
            flexDirection: "column",
            justifyContent: "start",
            alignItems: "start",
          }}
          viewport={{ once: true }}
          initial={{
            opacity: 0,
            x: -10,
          }}
          whileInView={{
            opacity: 1,
            x: 0,
          }}
          transition={{
            duration: 1,
            ease: "easeOut",
            delay: 0.5,
          }}
        >
          <Stack
            border={"2px solid white"}
            w={"fit-content"}
            px={"1em"}
            py={"0.25em"}
          >
            <Text size={"md"}>{data.Category.name}</Text>
          </Stack>
          <Heading size={["lg", "xl", "2xl", "2xl", "2xl"]}>
            {data.title}
          </Heading>

          <Breadcrumb fontSize={["xs", "sm", "sm", "sm", "sm"]}>
            <BreadcrumbItem isCurrentPage>
              <BreadcrumbLink href="#">{data.Category.name}</BreadcrumbLink>
            </BreadcrumbItem>

            <BreadcrumbItem isCurrentPage>
              <BreadcrumbLink href="#">{data.title}</BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>
        </motion.div>
      </Stack>

      <Stack mb={"4em"} p={["2em", "2em", "6em", "6em", "6em"]} flex={1}>
        {data.type === "DYNAMIC" && (
          // render dynamic content as html
          <motion.div
            viewport={{ once: true }}
            initial={{
              opacity: 0,
              y: -10,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 1,
              ease: "easeOut",
              delay: 1,
            }}
            dangerouslySetInnerHTML={{
              __html: data.content.content,
            }}
          />
        )}

        {data.type === "PROFILE" && (
          <>
            <Stack>
              <motion.div
                initial={{
                  opacity: 0,
                  y: -10,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  duration: 1,
                  ease: "easeOut",
                  delay: 1,
                }}
                dangerouslySetInnerHTML={{
                  __html: data.content.description,
                }}
              />
            </Stack>

            <Wrap
              direction={"row"}
              justify={"center"}
              align={"center"}
              spacing={"2em"}
              my={"4em"}
            >
              {data.content.profile.map((profile, index) => (
                <motion.div
                  viewport={{ once: true }}
                  initial={{
                    opacity: 0,
                    y: -15,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    duration: 1,
                    ease: "easeOut",
                    delay: 1.5 + index * 0.2,
                  }}
                  key={profile.id}
                >
                  <ProfileCard profile={profile} />
                </motion.div>
              ))}
            </Wrap>
          </>
        )}
      </Stack>
    </>
  );
};

export default DynamicContent;
