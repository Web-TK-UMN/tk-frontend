import {
  Stack,
  Text,
  Button,
  Icon,
  Avatar,
  Show,
  Heading,
  IconButton,
  Tooltip,
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  MenuDivider,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Spinner,
  Link,
  useToast,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Select,
} from "@chakra-ui/react";

import useSwr, { mutate } from "swr";
import { Link as RouterLink, useLocation } from "react-router-dom";

import {
  FaBars,
  FaChartSimple,
  FaEllipsisVertical,
  FaLayerGroup,
  FaPenToSquare,
  FaPlus,
  FaRightFromBracket,
} from "react-icons/fa6";
import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";

import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { reorderArray } from "@/utils/arrayHelper";
import useApi, { ResponseModel, useToastErrorHandler } from "@/hooks/useApi";
import { useNavigate, useParams } from "@/router";
import { Controller, useForm } from "react-hook-form";
import slugify from "slugify";

type CategoryDto = {
  items: {
    id: string;
    slug: string;
    title: string;
    order: number;
    type: "DYNAMIC" | "PROFILE" | "LINK";
    item: {
      id: string;
    } | null;
  }[];
  order: number;
  id: string;
  slug: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
};

type ItemDto = {
  slug: string;
  title: string;
  type: "PROFILE" | "DYNAMIC" | "LINK";
};

type ModalCategoryPanel = {
  mode: "editCategory" | "addItem" | "editItem";
  category?: CategoryDto;
  item?: ItemDto;
};

const CategoryPanel = () => {
  const api = useApi();
  const toast = useToast();
  const toastErrorHandler = useToastErrorHandler();
  const params = useParams("/cms/category/:categorySlug/:itemSlug");
  const nav = useNavigate();

  // data fetch
  const { data, isLoading } = useSwr<CategoryDto[]>("/category/");

  // modal state
  const [modalState, setModalState] = useState<ModalCategoryPanel | null>(null);

  // form state
  const editCategoryForm = useForm<Pick<CategoryDto, "name" | "slug">>();

  const addItemForm = useForm<ItemDto>();

  useEffect(() => {
    addItemForm.setValue(
      "slug",
      slugify(addItemForm.watch("title", ""), { lower: true })
    );

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [addItemForm.watch("title")]);

  useEffect(() => {
    if (modalState?.mode === "editCategory") {
      editCategoryForm.reset({
        name: modalState.category?.name,
        slug: modalState.category?.slug,
      });
    }

    if (modalState?.mode === "editItem") {
      addItemForm.reset({
        title: modalState.item?.title,
        slug: modalState.item?.slug,
        type: modalState.item?.type,
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modalState]);

  if (isLoading) {
    <Stack w={"full"}>
      <Spinner color="#232935" />
    </Stack>;
  }

  const openIndex = data?.findIndex(
    (category) => category.slug === params.categorySlug
  );

  return (
    <Stack
      direction={"column"}
      w={"full"}
      // bgColor={"#F2F3F7"}
      roundedLeft={"xl"}
    >
      {isLoading && (
        <Stack w={"full"} h={"full"} align={"center"} justify={"center"}>
          <Spinner color="#232935" />
        </Stack>
      )}
      <DragDropContext
        onDragEnd={(res) => {
          if (!res.destination) {
            return;
          }

          if (res.destination.index === res.source.index) {
            return;
          }

          const reordered = reorderArray<CategoryDto>(
            data!,
            res.source.index,
            res.destination.index
          );

          api
            .put<ResponseModel>("/category/order", {
              order: reordered.map((category) => category.slug),
            })
            .then((res) => {
              toast({
                title: "Success",
                description: res.data.message,
                status: "success",
                duration: 5000,
                isClosable: true,
              });
            })
            .catch(toastErrorHandler)
            .finally(() => mutate("/category/"));
        }}
      >
        <Droppable droppableId="category">
          {(provided) => (
            <Accordion
              allowToggle
              ref={provided.innerRef}
              {...provided.droppableProps}
              defaultIndex={openIndex}
            >
              {data?.map((category, i) => (
                <Draggable draggableId={category.id} index={i}>
                  {(provided) => (
                    <AccordionItem
                      border={"none"}
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      bgColor={
                        params.categorySlug === category.slug
                          ? "#F2F3F7"
                          : "transparent"
                      }
                      // _hover={{ bgColor: "#F2F3F7" }}
                      roundedLeft={"xl"}
                      my={"0.25em"}
                    >
                      <AccordionButton
                        border={"none"}
                        roundedLeft={"xl"}
                        _hover={{
                          bgColor: "#F2F3F7",
                        }}
                        p={"0.5em"}
                      >
                        <Stack direction={"row"} align={"center"} w={"full"}>
                          <Tooltip
                            label={"Drag to reorder category"}
                            rounded={"md"}
                          >
                            <IconButton
                              aria-label="reorder"
                              variant={"unstyled"}
                              icon={<FaBars />}
                              display={"flex"}
                              alignItems={"center"}
                              size={"md"}
                              onClick={(event) => {
                                event.stopPropagation();
                                // Add your logic here
                              }}
                              {...provided.dragHandleProps}
                            />
                          </Tooltip>
                          <Text flex={1} textAlign={"start"}>
                            {category.name}
                          </Text>
                          <Stack direction={"row"} gap={0}>
                            <Tooltip
                              label={"Edit this category"}
                              rounded={"md"}
                            >
                              <IconButton
                                size={"xs"}
                                aria-label="edit category"
                                variant={"unstyled"}
                                // rounded={"full"}
                                icon={<FaPenToSquare />}
                                // bgColor={"white"}
                                color={"#232935"}
                                // _hover={{
                                //   bgColor: "#232935",
                                //   color: "white",
                                // }}
                                onClick={(event) => {
                                  event.stopPropagation();
                                  setModalState({
                                    mode: "editCategory",
                                    category,
                                  });
                                  // Add your logic here
                                }}
                              />
                            </Tooltip>
                            <Tooltip
                              label={"Add new item in this category"}
                              rounded={"md"}
                            >
                              <IconButton
                                size={"xs"}
                                aria-label="add item"
                                variant={"unstyled"}
                                // rounded={"full"}
                                icon={<FaPlus />}
                                // bgColor={"white"}
                                color={"#232935"}
                                // _hover={{
                                //   bgColor: "#232935",
                                //   color: "white",
                                // }}
                                onClick={(event) => {
                                  event.stopPropagation();
                                  // Add your logic here
                                  setModalState({
                                    mode: "addItem",
                                    category,
                                  });
                                }}
                              />
                            </Tooltip>
                          </Stack>
                        </Stack>
                        {/* <AccordionIcon /> */}
                      </AccordionButton>
                      <DragDropContext
                        onDragEnd={(res) => {
                          if (!res.destination) {
                            return;
                          }

                          if (res.destination.index === res.source.index) {
                            return;
                          }

                          const reordered = reorderArray<ItemDto>(
                            category.items,
                            res.source.index,
                            res.destination.index
                          );

                          api
                            .put<ResponseModel>(
                              `/item/order/${category.slug}`,
                              {
                                order: reordered.map((item) => item.slug),
                              }
                            )
                            .then((res) => {
                              toast({
                                title: "Success",
                                description: res.data.message,
                                status: "success",
                                duration: 5000,
                                isClosable: true,
                              });
                            })
                            .catch(toastErrorHandler)
                            .finally(() => mutate("/category/"));
                        }}
                      >
                        <Droppable droppableId={category.id}>
                          {(provided) => (
                            <AccordionPanel
                              ref={provided.innerRef}
                              {...provided.droppableProps}
                              // p={"0.5em"}
                              // pl={"1.5em"}
                              p={0}
                            >
                              {category.items.length === 0 && (
                                <Text ml={"1em"} fontSize={"sm"}>
                                  No items...
                                </Text>
                              )}

                              {category.items.map((item, i) => (
                                <Draggable draggableId={item.id} index={i}>
                                  {(provided) => (
                                    <Stack
                                      direction={"row"}
                                      align={"center"}
                                      justify={"space-between"}
                                      // ml={"1em"}
                                      gap={0}
                                      ref={provided.innerRef}
                                      {...provided.draggableProps}
                                      bgColor={
                                        item.slug === params.itemSlug
                                          ? "#3C465B"
                                          : undefined
                                      }
                                      transition={"all 0.2s ease-in-out"}
                                      pl={"1.5em"}
                                      rounded={"md"}
                                    >
                                      <Stack direction={"row"} align={"center"}>
                                        <Tooltip
                                          label={"Drag to reorder item"}
                                          rounded={"md"}
                                        >
                                          <IconButton
                                            aria-label="reorder"
                                            variant={"unstyled"}
                                            icon={
                                              <Icon as={FaEllipsisVertical} />
                                            }
                                            onClick={(event) => {
                                              event.stopPropagation();
                                              // Add your logic here
                                            }}
                                            color={
                                              item.slug === params.itemSlug
                                                ? "white"
                                                : "#232935"
                                            }
                                            transition={"all 0.2s ease-in-out"}
                                            {...provided.dragHandleProps}
                                          />
                                        </Tooltip>
                                        <Link
                                          as={RouterLink}
                                          w={"full"}
                                          to={`/cms/category/${category.slug}/${item.slug}`}
                                          _hover={{ textDecoration: "none" }}
                                          fontSize={"sm"}
                                          fontWeight={"normal"}
                                          textOverflow={"ellipsis"}
                                          noOfLines={1}
                                          color={
                                            item.slug === params.itemSlug
                                              ? "white"
                                              : "#232935"
                                          }
                                          transition={"all 0.2s ease-in-out"}
                                        >
                                          {item.title}
                                        </Link>
                                      </Stack>
                                      <Tooltip
                                        label={"Edit this item"}
                                        rounded={"md"}
                                      >
                                        <IconButton
                                          mr={"0.5em"}
                                          size={"xs"}
                                          aria-label="edit item"
                                          variant={"unstyled"}
                                          // rounded={"full"}
                                          icon={<FaPenToSquare />}
                                          // bgColor={"white"}
                                          color={
                                            item.slug === params.itemSlug
                                              ? "white"
                                              : "#232935"
                                          }
                                          transition={"all 0.2s ease-in-out"}
                                          // _hover={{
                                          //   bgColor: "#232935",
                                          //   color: "white",
                                          // }}
                                          onClick={(event) => {
                                            event.stopPropagation();
                                            setModalState({
                                              mode: "editItem",
                                              category,
                                              item,
                                            });
                                            // Add your logic here
                                          }}
                                        />
                                      </Tooltip>
                                    </Stack>
                                  )}
                                </Draggable>
                              ))}
                              {provided.placeholder}
                            </AccordionPanel>
                          )}
                        </Droppable>
                      </DragDropContext>
                    </AccordionItem>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </Accordion>
          )}
        </Droppable>
      </DragDropContext>

      <Modal
        isOpen={!!modalState}
        onClose={() => {
          addItemForm.reset();
          editCategoryForm.reset();
          setModalState(null);
        }}
        isCentered
      >
        <ModalOverlay backdropFilter={"blur(4px)"} />
        <ModalContent>
          <ModalHeader>
            {modalState?.mode === "editCategory"
              ? `Edit ${modalState.category?.name}`
              : modalState?.mode === "editItem"
              ? `Edit ${modalState.item?.title}`
              : "Create new Item"}
          </ModalHeader>
          <ModalCloseButton />
          {modalState?.mode === "editCategory" && (
            <form
              onSubmit={editCategoryForm.handleSubmit((data) => {
                api
                  .put<ResponseModel>(
                    `/category/${modalState.category?.slug}`,
                    data
                  )
                  .then((res) =>
                    toast({
                      title: "Success",
                      description: res.data.message,
                      status: "success",
                      duration: 5000,
                      isClosable: true,
                    })
                  )
                  .catch(toastErrorHandler)
                  .finally(() => {
                    editCategoryForm.reset();
                    setModalState(null);
                    mutate("/category/");
                  });
              })}
            >
              <ModalBody>
                <FormControl
                  isInvalid={!!editCategoryForm.formState.errors.name}
                >
                  <FormLabel>Name</FormLabel>
                  <Input
                    placeholder="Name"
                    {...editCategoryForm.register("name", {
                      required: "Category name is required",
                      maxLength: {
                        value: 20,
                        message:
                          "Category name must be less than 20 characters",
                      },
                    })}
                  />
                  <FormErrorMessage>
                    {editCategoryForm.formState.errors.name &&
                      editCategoryForm.formState.errors.name.message}
                  </FormErrorMessage>
                </FormControl>
                <FormControl
                  isInvalid={!!editCategoryForm.formState.errors.slug}
                >
                  <FormLabel>Slug</FormLabel>
                  <Input
                    placeholder="Slug"
                    {...editCategoryForm.register("slug", {
                      required: "Category slug is required",
                      maxLength: {
                        value: 20,
                        message:
                          "Category slug must be less than 20 characters",
                      },
                      pattern: {
                        value: /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
                        message: "Category slug must be valid url safe slug",
                      },
                    })}
                  />
                  <FormErrorMessage>
                    {editCategoryForm.formState.errors.slug &&
                      editCategoryForm.formState.errors.slug.message}
                  </FormErrorMessage>
                </FormControl>
              </ModalBody>

              <ModalFooter gap={"1em"} justifyContent={"space-between"}>
                <Button
                  colorScheme="red"
                  onClick={() => {
                    api
                      .delete<ResponseModel>(
                        `/category/${modalState.category?.slug}`
                      )
                      .then((res) =>
                        toast({
                          title: "Success",
                          description: res.data.message,
                          status: "success",
                          duration: 5000,
                          isClosable: true,
                        })
                      )
                      .catch(toastErrorHandler)
                      .finally(() => {
                        editCategoryForm.reset();
                        setModalState(null);
                        mutate("/category/");
                      });
                  }}
                >
                  Delete
                </Button>
                <Stack direction={"row"} gap={"1em"}>
                  <Button variant={"outline"} type="submit">
                    Edit
                  </Button>
                </Stack>
              </ModalFooter>
            </form>
          )}

          {modalState?.mode === "addItem" && (
            <form
              onSubmit={addItemForm.handleSubmit((data) => {
                api
                  .post<ResponseModel>(
                    `/item/${modalState.category?.slug}`,
                    data
                  )
                  .then((res) => {
                    toast({
                      title: "Success",
                      description: res.data.message,
                      status: "success",
                      duration: 5000,
                      isClosable: true,
                    });
                  })
                  .catch(toastErrorHandler)
                  .finally(() => {
                    setModalState(null);
                    addItemForm.reset();

                    mutate("/category/");
                  });
              })}
            >
              <ModalBody>
                <FormControl isInvalid={!!addItemForm.formState.errors.title}>
                  <FormLabel>Title</FormLabel>
                  <Input
                    placeholder="Title"
                    {...addItemForm.register("title", {
                      required: "Item title is required",
                      maxLength: {
                        value: 20,
                        message: "Item title must be less than 20 characters",
                      },
                    })}
                  />
                  <FormErrorMessage>
                    {addItemForm.formState.errors.title &&
                      addItemForm.formState.errors.title.message}
                  </FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={!!addItemForm.formState.errors.slug}>
                  <FormLabel>Slug</FormLabel>
                  <Input
                    placeholder="Slug"
                    {...addItemForm.register("slug", {
                      required: "Item slug is required",
                      maxLength: {
                        value: 20,
                        message: "Item slug must be less than 20 characters",
                      },
                      pattern: {
                        value: /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
                        message: "Item slug must be valid url safe slug",
                      },
                    })}
                  />
                  <FormErrorMessage>
                    {addItemForm.formState.errors.slug &&
                      addItemForm.formState.errors.slug.message}
                  </FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={!!addItemForm.formState.errors.type}>
                  <FormLabel>Type</FormLabel>
                  <Controller
                    control={addItemForm.control}
                    name="type"
                    rules={{
                      required: "Type is required",
                    }}
                    render={({ field }) => (
                      <Select placeholder="Select page type" {...field}>
                        <option value="DYNAMIC">Dynamic Page</option>
                        <option value="PROFILE">Profile Page</option>
                        <option value="LINK">Link Page</option>
                      </Select>
                    )}
                  />
                  <FormErrorMessage>
                    {addItemForm.formState.errors.type &&
                      addItemForm.formState.errors.type.message}
                  </FormErrorMessage>
                </FormControl>
              </ModalBody>

              <ModalFooter gap={"1em"}>
                <Button variant={"outline"} type="submit">
                  Create
                </Button>
              </ModalFooter>
            </form>
          )}

          {modalState?.mode === "editItem" && (
            <form
              onSubmit={addItemForm.handleSubmit((data) => {
                api
                  .put<ResponseModel>(
                    `/item/${modalState.category?.slug}/${modalState.item?.slug}`,
                    data
                  )
                  .then((res) => {
                    toast({
                      title: "Success",
                      description: res.data.message,
                      status: "success",
                      duration: 5000,
                      isClosable: true,
                    });
                  })
                  .catch(toastErrorHandler)
                  .finally(() => {
                    setModalState(null);
                    addItemForm.reset();

                    mutate("/category/");
                  });
              })}
            >
              <ModalBody>
                <FormControl isInvalid={!!addItemForm.formState.errors.title}>
                  <FormLabel>Title</FormLabel>
                  <Input
                    placeholder="Title"
                    {...addItemForm.register("title", {
                      required: "Item title is required",
                      maxLength: {
                        value: 20,
                        message: "Item title must be less than 20 characters",
                      },
                    })}
                  />
                  <FormErrorMessage>
                    {addItemForm.formState.errors.title &&
                      addItemForm.formState.errors.title.message}
                  </FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={!!addItemForm.formState.errors.slug}>
                  <FormLabel>Slug</FormLabel>
                  <Input
                    placeholder="Slug"
                    {...addItemForm.register("slug", {
                      required: "Item slug is required",
                      maxLength: {
                        value: 20,
                        message: "Item slug must be less than 20 characters",
                      },
                      pattern: {
                        value: /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
                        message: "Item slug must be valid url safe slug",
                      },
                    })}
                  />
                  <FormErrorMessage>
                    {addItemForm.formState.errors.slug &&
                      addItemForm.formState.errors.slug.message}
                  </FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={!!addItemForm.formState.errors.type}>
                  <FormLabel>Type</FormLabel>
                  <Controller
                    control={addItemForm.control}
                    name="type"
                    rules={{
                      required: "Type is required",
                    }}
                    render={({ field }) => (
                      <Select placeholder="Select page type" {...field}>
                        <option value="DYNAMIC">Dynamic Page</option>
                        <option value="PROFILE">Profile Page</option>
                        <option value="LINK">Link Page</option>
                      </Select>
                    )}
                  />
                  <FormErrorMessage>
                    {addItemForm.formState.errors.type &&
                      addItemForm.formState.errors.type.message}
                  </FormErrorMessage>
                </FormControl>
              </ModalBody>

              <ModalFooter gap={"1em"} justifyContent={"space-between"}>
                <Button
                  colorScheme="red"
                  onClick={() => {
                    api
                      .delete<ResponseModel>(
                        `/item/${modalState.category?.slug}/${modalState.item?.slug}`
                      )
                      .then((res) => {
                        toast({
                          title: "Success",
                          description: res.data.message,
                          status: "success",
                          duration: 5000,
                          isClosable: true,
                        });
                        nav("/cms");
                      })
                      .catch(toastErrorHandler)
                      .finally(() => {
                        setModalState(null);
                        addItemForm.reset();

                        mutate("/category/");
                      });
                  }}
                >
                  Delete
                </Button>
                <Stack direction={"row"} gap={"1em"}>
                  <Button variant={"outline"} type="submit">
                    Edit
                  </Button>
                </Stack>
              </ModalFooter>
            </form>
          )}
        </ModalContent>
      </Modal>
    </Stack>
  );
};

const SidebarItems = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<Pick<CategoryDto, "name" | "slug">>();

  const loc = useLocation();
  const api = useApi();
  const toastErrorHandler = useToastErrorHandler();
  const toast = useToast();

  useEffect(() => {
    setValue("slug", slugify(watch("name", ""), { lower: true }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watch("name")]);

  return (
    <Stack w={"full"} gap={"0.25em"}>
      <Stack
        as={RouterLink}
        to={"/cms"}
        direction={"row"}
        bgColor={loc.pathname === "/cms" ? "#F2F3F7" : "white"}
        transition={"all 0.2s"}
        h={"4em"}
        w={"full"}
        // roundedLeft={"xl"}
      >
        <Stack
          w={"0.5em"}
          h={"full"}
          bgColor={loc.pathname === "/cms" ? "#232935" : "transparent"}
          transition={"all 0.2s ease-in-out"}
          roundedRight={"xl"}
        />
        <Stack direction={"row"} align={"center"} mx={"1em"}>
          <Icon as={FaChartSimple} boxSize={"1.5em"} color={"#232935"} />
          <Text fontWeight={"medium"} mx={"0.5em"}>
            Dashboard
          </Text>
        </Stack>
      </Stack>
      <Stack
        direction={"row"}
        bgColor={loc.pathname.includes("/cms/category/") ? "#F2F3F7" : "white"}
        h={"4em"}
        w={"full"}
        // roundedLeft={"xl"}
        justify={"space-between"}
        align={"center"}
        transition={"all 0.2s ease-in-out"}
      >
        <Stack direction={"row"} h={"full"} w={"full"}>
          <Stack
            w={"0.5em"}
            h={"full"}
            bgColor={
              loc.pathname.includes("/cms/category/")
                ? "#232935"
                : "transparent"
            }
            roundedRight={"xl"}
          />
          <Stack direction={"row"} align={"center"} mx={"1em"}>
            <Icon as={FaLayerGroup} boxSize={"1.5em"} color={"#232935"} />
            <Text fontWeight={"medium"} mx={"0.5em"}>
              Category
            </Text>
          </Stack>
        </Stack>
        <Tooltip
          label={"Add new category to be shown in navbar"}
          rounded={"md"}
        >
          <IconButton
            size={"xs"}
            mx={"1.25em"}
            aria-label="add category"
            variant={"ghost"}
            rounded={"full"}
            color={"white"}
            bgColor={"#232935"}
            _hover={{
              color: "#232935",
              bgColor: "white",
            }}
            icon={<FaPlus />}
            onClick={onOpen}
          />
        </Tooltip>
      </Stack>

      <Stack
        direction={"column"}
        w={"full"}
        pl={"1em"}
        overflowY="auto"
        maxHeight="calc(100vh - 55vh)"
      >
        <CategoryPanel />
      </Stack>

      <Modal isCentered isOpen={isOpen} onClose={onClose}>
        <ModalOverlay backdropFilter={"blur(4px)"} />
        <ModalContent>
          <ModalHeader>Add New Category</ModalHeader>
          <ModalCloseButton />
          <form
            onSubmit={handleSubmit((data) => {
              api
                .post<ResponseModel>("/category/", data)
                .then((res) =>
                  toast({
                    title: "Success",
                    description: res.data.message,
                    status: "success",
                    duration: 5000,
                    isClosable: true,
                  })
                )
                .catch(toastErrorHandler)
                .finally(() => {
                  onClose();
                  mutate("/category/");
                });
            })}
          >
            <ModalBody>
              <FormControl isInvalid={!!errors.name}>
                <FormLabel>Name</FormLabel>
                <Input
                  placeholder="Name"
                  {...register("name", {
                    required: "Category name is required",
                    maxLength: {
                      value: 20,
                      message: "Category name must be less than 20 characters",
                    },
                  })}
                />
                <FormErrorMessage>
                  {errors.name && errors.name.message}
                </FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={!!errors.slug}>
                <FormLabel>Slug</FormLabel>
                <Input
                  placeholder="Slug"
                  {...register("slug", {
                    required: "Category slug is required",
                    maxLength: {
                      value: 20,
                      message: "Category slug must be less than 20 characters",
                    },
                    pattern: {
                      value: /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
                      message: "Category slug must be valid url safe slug",
                    },
                  })}
                />
                <FormErrorMessage>
                  {errors.slug && errors.slug.message}
                </FormErrorMessage>
              </FormControl>
            </ModalBody>

            <ModalFooter gap={"1em"}>
              <Button variant={"outline"} type="submit">
                Create
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </Stack>
  );
};

export const SidebarNavbar = () => {
  const auth = useAuth();
  const logoutModal = useDisclosure();
  const drawer = useDisclosure();

  return (
    <>
      {/* sidebar desktop */}
      <Show above="md">
        <Stack w={"20em"} py={"1em"} justify={"space-between"}>
          <Stack direction={"column"}>
            <Stack direction={"column"} p={"1em"} align={"center"}>
              <Avatar size={"md"} my={"0.5em"} />
              <Heading size={"md"}>{auth.user?.name}</Heading>
              <Text>Admin</Text>
            </Stack>

            {/* sidebar content */}
            <Stack direction={"column"} spacing={4}>
              <SidebarItems />
            </Stack>
          </Stack>

          <Button
            variant={"ghost"}
            h={"4em"}
            w={"full"}
            p={"1em"}
            rounded={"xl"}
            leftIcon={
              <Icon
                as={FaRightFromBracket}
                boxSize={"3em"}
                p={"0.75em"}
                rounded={"xl"}
                bgGradient={"linear(to-t, #232935, #5D6472)"}
                color={"white"}
                transform={"rotate(180deg)"}
              />
            }
            // make this align left
            justifyContent={"flex-start"}
            onClick={logoutModal.onOpen}
          >
            <Text mx={"1em"}>Log out</Text>
          </Button>
        </Stack>
      </Show>

      {/* mobile navbar */}
      <Show below="md">
        <Stack
          h={"6em"}
          direction={"row"}
          bgColor={"#F2F3F7"}
          m={"1em"}
          rounded={"xl"}
          align={"center"}
          justify={"space-between"}
          p={"1em"}
        >
          <IconButton
            aria-label="menu"
            variant={"unstyled"}
            alignItems={"center"}
            icon={
              <Icon
                as={FaBars}
                boxSize={"1.5em"}
                display={"flex"}
                alignItems={"center"}
              />
            }
            onClick={drawer.onOpen}
            size={"lg"}
          />

          <Menu>
            <Avatar as={MenuButton} size={"md"} />
            <MenuList rounded={"xl"}>
              <Stack p={"1em"}>
                <Text>{auth.user?.name}</Text>
              </Stack>
              <MenuDivider />
              <MenuItem>
                <Stack direction={"row"} onClick={logoutModal.onOpen}>
                  <Icon as={FaRightFromBracket} boxSize={"1.5em"} />
                  <Text>Log Out</Text>
                </Stack>
              </MenuItem>
            </MenuList>
          </Menu>
        </Stack>
      </Show>

      <Drawer
        onClose={drawer.onClose}
        isOpen={drawer.isOpen}
        size={"xs"}
        placement="left"
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>
            <Stack
              align={"center"}
              justify={"center"}
              textAlign={"center"}
              gap={0}
              my={"1em"}
            >
              {/* ganti logo maybe */}
              <Text fontWeight={"bold"}>CMS</Text>
              <Text fontWeight={"bold"}>Teknik Komputer</Text>
            </Stack>
          </DrawerHeader>
          <DrawerBody px={"0em"}>
            <SidebarItems />
          </DrawerBody>
        </DrawerContent>
      </Drawer>

      <Modal
        isOpen={logoutModal.isOpen}
        onClose={logoutModal.onClose}
        isCentered
      >
        <ModalOverlay backdropFilter={"blur(4px)"} />
        <ModalContent>
          <ModalHeader>Log out of CMS</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>Are you sure you want to log out?</Text>
          </ModalBody>

          <ModalFooter>
            <Button
              mx={"0.25em"}
              colorScheme="red"
              variant={"outline"}
              onClick={() => auth.logout()}
            >
              Logout
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
