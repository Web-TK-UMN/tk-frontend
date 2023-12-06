import {
  Stack,
  Text,
  Image,
  Divider,
  Heading,
  Button,
  Link,
  Show,
  Spinner,
  PopoverContent,
  Popover,
  PopoverBody,
  PopoverTrigger,
  Icon,
  useDisclosure,
  IconButton,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  DrawerCloseButton,
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
} from "@chakra-ui/react";
import { FaBars, FaCaretLeft, FaChevronDown } from "react-icons/fa6";
import { Link as RouterLink, useLocation } from "react-router-dom";
import useSWR from "swr";
import { MotionBox, MotionStack } from "../ChakraFramer";

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

const Navbar = () => {
  const { isLoading, data } = useSWR<CategoryDto[]>(`/category/`);
  const { isOpen, onClose, onOpen } = useDisclosure();
  const loc = useLocation();

  return (
    <Stack
      w={"full"}
      h={"5em"}
      roundedBottom={"2xl"}
      direction={"row"}
      align={"center"}
      justify={"space-between"}
      px={["2em", "2em", "6em", "6em", "6em"]}
      boxShadow={"0px 4px 8px -2px rgba(0, 0, 0, 0.1)"}
      pos={"sticky"}
      top={0}
      zIndex={10}
      bgColor={"white"}
    >
      <Stack
        as={RouterLink}
        to={"/"}
        direction={"row"}
        align={"center"}
        justify={"center"}
        gap={"1em"}
        transition={"all 0.2s ease-in-out"}
      >
        <MotionStack
          justifyContent={"center"}
          alignItems={"center"}
          flexDirection={"row"}
          gap={"0.5em"}
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
          <Image w={"1.5em"} src="/assets/logo_umn.png" />
          <Divider
            orientation="vertical"
            h={"2em"}
            opacity={1}
            variant={"solid"}
            borderColor={"#003D73"}
            bgColor={"#003D73"}
            rounded={"xl"}
            borderWidth={"0.05em"}
          />
          <Heading size={"md"} color={"#003D73"}>
            TEKNIK KOMPUTER
          </Heading>
        </MotionStack>
      </Stack>

      <Show above="md">
        <Stack
          direction={"row"}
          gap={"2em"}
          color={"#003D73"}
          fontSize={"medium"}
        >
          <MotionBox
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
            <Button
              as={RouterLink}
              to={"/"}
              variant={"unstyled"}
              display={"flex"}
              alignItems={"center"}
              transition={"all 0.2s ease-in-out"}
              _hover={{
                color: "#FD8E09",
                borderBottom: "solid 2px #FD8E09",
              }}
              rounded={"none"}
            >
              Home
            </Button>
          </MotionBox>
          {isLoading && (
            <Stack direction={"row"} align={"center"} gap={"0.5em"}>
              <Spinner size={"xs"} />
              <Text>Loading...</Text>
            </Stack>
          )}

          {data &&
            data.map((category, index) => (
              <Popover trigger="hover">
                <PopoverTrigger>
                  <MotionBox
                    key={index}
                    viewport={{ once: true }}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    // @ts-expect-error chakra ui typescript error
                    transition={{
                      duration: 0.5,
                      delay: 0.5 + index * 0.2,
                      ease: "easeOut",
                    }}
                  >
                    <Button
                      variant={"unstyled"}
                      transition={"all 0.2s ease-in-out"}
                      display={"flex"}
                      alignItems={"center"}
                      rightIcon={<Icon as={FaChevronDown} w={"0.75em"} />}
                      rounded={"none"}
                      _hover={{
                        color: "#FD8E09",
                        borderBottom: "solid 2px #FD8E09",
                      }}
                    >
                      {category.name}
                    </Button>
                  </MotionBox>
                </PopoverTrigger>
                <PopoverContent
                  w={"16em"}
                  minH={"3em"}
                  rounded={"xl"}
                  border={"none"}
                  gap={"5em"}
                  boxShadow={"0px 4px 8px -2px rgba(0, 0, 0, 0.1)"}
                >
                  <PopoverBody>
                    {category.items.map((item) => (
                      <Link
                        as={item.type === "LINK" ? undefined : RouterLink}
                        to={`/${category.slug}/${item.slug}`}
                        href={item.type === "LINK" ? item.item?.url : undefined}
                        isExternal={item.type === "LINK"}
                        // if type is link, open in new tab
                        key={item.id}
                        _hover={{
                          textDecoration: "none",
                        }}
                      >
                        <Button
                          variant={"unstyled"}
                          w={"full"}
                          textAlign={"left"}
                          rounded={"xl"}
                          _hover={{
                            color: "#FD8E09",
                          }}
                        >
                          {item.title}
                        </Button>
                      </Link>
                    ))}
                  </PopoverBody>
                </PopoverContent>
              </Popover>
            ))}
        </Stack>
      </Show>

      <Show below="md">
        <MotionBox
          viewport={{ once: true }}
          initial={{
            opacity: 0,
            x: 10,
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
          <IconButton
            aria-label="menu"
            variant={"ghost"}
            color={"#003D73"}
            rounded={"xl"}
            icon={<FaBars />}
            onClick={onOpen}
          />
        </MotionBox>

        <Drawer placement={"right"} onClose={onClose} isOpen={isOpen}>
          <DrawerOverlay backdropFilter={"blur(4px)"} />
          <DrawerContent roundedLeft={"xl"}>
            <DrawerHeader my={"1em"}>
              <DrawerCloseButton m={"1.25em"} color={"#003D73"} />
            </DrawerHeader>
            <DrawerBody p={0}>
              <Accordion
                allowToggle
                defaultIndex={
                  // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
                  data?.findIndex((pred) => loc.pathname.includes(pred.slug))! +
                  1
                }
              >
                <Stack gap={"1em"}>
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
                      duration: 0.25,
                      ease: "easeOut",
                      delay: 0.15,
                    }}
                  >
                    <AccordionItem
                      border={"none"}
                      color={"#003D73"}
                      bgColor={
                        loc.pathname === "/"
                          ? "rgba(0, 61, 115, 0.1)"
                          : undefined
                      }
                    >
                      <AccordionButton
                        as={RouterLink}
                        to={"/"}
                        fontWeight={"semibold"}
                        w={"full"}
                        display={"flex"}
                        alignItems={"center"}
                        justifyContent={"start"}
                        color={"#003D73"}
                        _hover={{
                          color: "#FD8E09",
                        }}
                        h={"3em"}
                        p={0}
                        gap={"2em"}
                        fontSize={"lg"}
                        transition={"all 0.3s ease-in-out"}
                      >
                        <Stack
                          bgColor={loc.pathname === "/" ? "#013D71" : undefined}
                          w={"0.35em"}
                          h={"full"}
                          roundedRight={"xl"}
                          transition={"all 0.3s ease-in-out"}
                        />
                        <Text as={"span"}>Home</Text>
                      </AccordionButton>
                    </AccordionItem>
                  </MotionBox>
                  {isLoading && (
                    <Stack direction={"row"} align={"center"} gap={"0.5em"}>
                      <Spinner size={"xs"} />
                      <Text>Loading...</Text>
                    </Stack>
                  )}

                  {data &&
                    data.map((category, index) => (
                      <MotionBox
                        key={index}
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
                          duration: 0.25,
                          ease: "easeOut",
                          delay: 0.15 + index * 0.1,
                        }}
                      >
                        <AccordionItem
                          border={"none"}
                          color={"#003D73"}
                          key={category.id}
                        >
                          <AccordionButton
                            fontWeight={"semibold"}
                            w={"full"}
                            display={"flex"}
                            alignItems={"center"}
                            justifyContent={"space-between"}
                            color={"#003D73"}
                            bgColor={
                              loc.pathname.includes(`/${category.slug}`)
                                ? "rgba(0, 61, 115, 0.1)"
                                : undefined
                            }
                            _hover={{
                              color: "#FD8E09",
                            }}
                            h={"3em"}
                            p={0}
                            gap={"2em"}
                            fontSize={"lg"}
                            transition={"all 0.3s ease-in-out"}
                          >
                            <Stack
                              bgColor={
                                loc.pathname.includes(`/${category.slug}`)
                                  ? "#013D71"
                                  : undefined
                              }
                              w={"0.35em"}
                              h={"full"}
                              roundedRight={"xl"}
                              transition={"all 0.3s ease-in-out"}
                            />
                            <Stack direction={"row"} flex={1}>
                              <Text as={"span"}>{category.name}</Text>
                            </Stack>
                            <AccordionIcon mx={"1.25em"} />
                          </AccordionButton>
                          <AccordionPanel
                            p={0}
                            my={"0.5em"}
                            ml={"2.5em"}
                            bgColor={
                              loc.pathname.includes(`/${category.slug}`)
                                ? "rgba(0, 61, 115, 0.1)"
                                : undefined
                            }
                            roundedLeft={"lg"}
                            transition={"all 0.3s ease-in-out"}
                          >
                            {category.items.map((item) => (
                              <Link
                                key={item.id}
                                as={
                                  item.type === "LINK" ? undefined : RouterLink
                                }
                                to={`/${category.slug}/${item.slug}`}
                                href={
                                  item.type === "LINK"
                                    ? item.item?.url
                                    : undefined
                                }
                                isExternal={item.type === "LINK"}
                                variant={"ghost"}
                                fontWeight={"semibold"}
                                fontSize={"sm"}
                                w={"full"}
                                display={"flex"}
                                alignItems={"center"}
                                justifyContent={"space-between"}
                                color={
                                  loc.pathname.includes(`/${item.slug}`)
                                    ? "white"
                                    : "#003D73"
                                }
                                bgColor={
                                  loc.pathname.includes(`/${item.slug}`)
                                    ? "#003D73"
                                    : undefined
                                }
                                _hover={{
                                  color: "#FD8E09",
                                }}
                                py={"0.5em"}
                                px={"1.5em"}
                                roundedLeft={"md"}
                                transition={"all 0.3s ease-in-out"}

                                // m={"1em"}
                              >
                                {item.title}
                                <Icon
                                  as={FaCaretLeft}
                                  opacity={
                                    loc.pathname.includes(`/${item.slug}`)
                                      ? 1
                                      : 0
                                  }
                                  mx={"0.75em"}
                                />
                              </Link>
                            ))}
                          </AccordionPanel>
                        </AccordionItem>
                      </MotionBox>
                    ))}
                </Stack>
              </Accordion>
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      </Show>
    </Stack>
  );
};

export default Navbar;
