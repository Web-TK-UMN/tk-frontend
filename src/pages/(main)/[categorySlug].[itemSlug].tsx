import ProfileCard from "@/components/ProfileCard";
import { useParams } from "@/router";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Flex,
  Heading,
  Icon,
  Spinner,
  Stack,
  Text,
  Link,
  Wrap,
} from "@chakra-ui/react";
import useSWR from "swr";

import { motion } from "framer-motion";
import { MotionBox, MotionImage, MotionStack } from "@/components/ChakraFramer";
import { Link as RouterLink, useLocation } from "react-router-dom";
import { FaCaretLeft } from "react-icons/fa6";

type CategoryDto = {
  items: {
    id: string;
    slug: string;
    title: string;
    order: number;
    type: "DYNAMIC" | "PROFILE" | "LINK";
    item: {
      id: string;
      url: string;
    } | null;
  }[];
  order: number;
  id: string;
  slug: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
};

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

  const loc = useLocation();

  const { isLoading: isLoadingCategory, data: dataCategory } =
    useSWR<CategoryDto>(`/category/${categorySlug}`);

  const { isLoading, data } = useSWR<ItemDto>(
    `/item/${categorySlug}/${itemSlug}`
  );

  const items = dataCategory?.items ?? [];

  if (isLoading || isLoadingCategory) {
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
        <MotionImage
          src="/assets/circuit_ornaments_vertical.svg"
          pos={"absolute"}
          top={"24em"}
          w={["1.5em", "1.5em", "3em", "3em", "3em"]}
          transform="scaleY(-1)"
          left={0}
          viewport={{ once: true }}
          initial={{
            opacity: 0,
            x: -10,
          }}
          whileInView={{
            opacity: 1,
            x: 0,
          }}
          // @ts-expect-error chakra ui typescript error
          transition={{
            duration: 1,
            ease: "easeOut",
            delay: 0.5,
          }}
        />
        <MotionStack
          key={data.id}
          gap={"0.5em"}
          flexDir={"column"}
          alignItems={"start"}
          justifyContent={"start"}
          viewport={{ once: true }}
          initial={{
            opacity: 0,
            x: -10,
          }}
          whileInView={{
            opacity: 1,
            x: 0,
          }}
          // @ts-expect-error chakra ui typescript error
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
        </MotionStack>
      </Stack>

      <Stack
        mb={"4em"}
        p={["2em", "2em", "6em", "6em", "6em"]}
        pr={["2em", "2em", "2em", "2em", "2em"]}
        flex={1}
        direction={[
          "column",
          "column",
          "row-reverse",
          "row-reverse",
          "row-reverse",
        ]}
      >
        <Stack
          direction={"column"}
          p={0}
          my={"0.5em"}
          ml={["none", "none", "1em", "1em", "1em"]}
          w={["full", "full", "16em", "16em", "16em"]}
          bgColor={"rgba(0, 61, 115, 0.1)"}
          rounded={"lg"}
          transition={"all 0.3s ease-in-out"}
          h={"fit-content"}
        >
          {items?.map((item) => (
            <Link
              key={item.id}
              as={item.type === "LINK" ? undefined : RouterLink}
              to={`/${categorySlug}/${item.slug}`}
              href={item.type === "LINK" ? item.item?.url : undefined}
              isExternal={item.type === "LINK"}
              variant={"ghost"}
              fontWeight={"semibold"}
              fontSize={"sm"}
              w={"full"}
              display={"flex"}
              alignItems={"center"}
              justifyContent={"space-between"}
              color={
                loc.pathname.includes(`/${item.slug}`) ? "white" : "#003D73"
              }
              bgColor={
                loc.pathname.includes(`/${item.slug}`) ? "#003D73" : undefined
              }
              _hover={{
                color: "#FD8E09",
              }}
              py={"0.5em"}
              px={"1.5em"}
              rounded={"md"}
              transition={"all 0.3s ease-in-out"}

              // m={"1em"}
            >
              {item.title}
              <Icon
                as={FaCaretLeft}
                opacity={loc.pathname.includes(`/${item.slug}`) ? 1 : 0}
                mx={"0.75em"}
              />
            </Link>
          ))}
        </Stack>

        <Flex overflow={"scroll"} flex={1}>
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
                  <MotionBox
                    viewport={{ once: true }}
                    initial={{
                      opacity: 0,
                      y: -15,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    // @ts-expect-error chakra ui typescript error
                    transition={{
                      duration: 1,
                      ease: "easeOut",
                      delay: 1.5 + index * 0.2,
                    }}
                    key={profile.id}
                  >
                    <ProfileCard profile={profile} />
                  </MotionBox>
                ))}
              </Wrap>
            </>
          )}
        </Flex>
      </Stack>
    </>
  );
};

export default DynamicContent;
