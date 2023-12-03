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
  Box,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { FaBars, FaChevronDown } from "react-icons/fa6";
import { Link as RouterLink } from "react-router-dom";
import useSWR from "swr";

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

  return (
    <Stack
      w={"full"}
      h={"5em"}
      roundedTop={"xl"}
      direction={"row"}
      align={"center"}
      justify={"space-between"}
      px={["1em", "1em", "4em", "4em", "4em"]}
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
        <motion.div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row",
            gap: "0.5em",
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
        </motion.div>
      </Stack>

      <Show above="md">
        <Stack
          direction={"row"}
          gap={"2em"}
          color={"#003D73"}
          fontSize={"medium"}
        >
          <motion.div
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
          </motion.div>
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
                  <motion.div
                    key={index}
                    viewport={{ once: true }}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
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
                  </motion.div>
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
        <motion.div
          viewport={{ once: true }}
          initial={{
            opacity: 0,
            x: 10,
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
          <IconButton
            aria-label="menu"
            variant={"ghost"}
            color={"#003D73"}
            rounded={"xl"}
            icon={<FaBars />}
            onClick={onOpen}
          />
        </motion.div>

        <Drawer placement={"right"} onClose={onClose} isOpen={isOpen}>
          <DrawerOverlay backdropFilter={"blur(4px)"} />
          <DrawerContent roundedLeft={"xl"}>
            <DrawerHeader my={"1em"}>
              <DrawerCloseButton m={"1.25em"} color={"#003D73"} />
            </DrawerHeader>
            <DrawerBody>
              <Accordion allowToggle>
                <Stack gap={"1em"}>
                  <AccordionItem border={"none"} color={"#003D73"}>
                    <Button
                      as={RouterLink}
                      to={"/"}
                      variant={"ghost"}
                      fontWeight={"semibold"}
                      w={"full"}
                      display={"flex"}
                      alignItems={"center"}
                      justifyContent={"start"}
                      color={"#003D73"}
                      _hover={{
                        color: "#FD8E09",
                      }}
                    >
                      Home
                    </Button>
                  </AccordionItem>
                  {isLoading && (
                    <Stack direction={"row"} align={"center"} gap={"0.5em"}>
                      <Spinner size={"xs"} />
                      <Text>Loading...</Text>
                    </Stack>
                  )}

                  {data &&
                    data.map((category) => (
                      <AccordionItem
                        border={"none"}
                        color={"#003D73"}
                        key={category.id}
                      >
                        <AccordionButton
                          _hover={{
                            color: "#FD8E09",
                          }}
                        >
                          <Box
                            as="span"
                            fontWeight={"semibold"}
                            flex="1"
                            textAlign="left"
                            _hover={{
                              color: "#FD8E09",
                            }}
                          >
                            {category.name}
                          </Box>
                          <AccordionIcon />
                        </AccordionButton>
                        <AccordionPanel p={0} pl={"1em"}>
                          {category.items.map((item) => (
                            <Link
                              key={item.id}
                              as={item.type === "LINK" ? undefined : RouterLink}
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
                              justifyContent={"start"}
                              color={"#003D73"}
                              _hover={{
                                color: "#FD8E09",
                              }}
                              my={"1em"}
                              ml={"1em"}
                            >
                              {item.title}
                            </Link>
                          ))}
                        </AccordionPanel>
                      </AccordionItem>
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
