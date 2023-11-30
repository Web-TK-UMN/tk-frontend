import { SingleDropZone } from "@/components/DropZone";
import ProfileCard from "@/components/ProfileCard";
import CKEditorInput from "@/components/ckEditorInput";
import useApi, { ResponseModel, useToastErrorHandler } from "@/hooks/useApi";
import { useParams } from "@/router";
import {
  Stack,
  Text,
  Button,
  Heading,
  Badge,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Spinner,
  useToast,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import useSWR, { mutate } from "swr";

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

type ItemDto =
  | {
      id: string;
      title: string;
      slug: string;
      type: "DYNAMIC";
      content: DynamicPageDto | null;
      createdAt: string;
      updatedAt: string;
    }
  | {
      id: string;
      title: string;
      slug: string;
      type: "PROFILE";
      content: ProfilePageDto | null;
      createdAt: string;
      updatedAt: string;
    }
  | {
      id: string;
      title: string;
      slug: string;
      type: "LINK";
      content: LinkPageDto | null;
      createdAt: string;
      updatedAt: string;
    };

type ProfileModalState = {
  mode: "CREATE" | "EDIT";
  profile: ProfileDto | null;
};

const LinkPageEditor = ({ data }: { data: LinkPageDto | null }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Pick<LinkPageDto, "url">>();

  const params = useParams("/cms/category/:categorySlug/:itemSlug");
  const api = useApi();
  const toast = useToast();
  const toastErrorHandler = useToastErrorHandler();

  useEffect(() => {
    if (data && data.url) {
      reset({
        url: data.url,
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);

  return (
    <Stack
      as={"form"}
      onSubmit={handleSubmit((data) => {
        api
          .post<ResponseModel>(
            `/item/${params.categorySlug}/${params.itemSlug}/link`,
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
          .catch(toastErrorHandler);
      })}
      direction={"column"}
      justify={"space-between"}
      flex={1}
      mt={"1em"}
    >
      <Stack>
        <FormControl isInvalid={!!errors.url}>
          <FormLabel>URL to Redirect</FormLabel>
          <Input
            type="url"
            bgColor={"white"}
            rounded={"xl"}
            {...register("url", {
              required: "URL cannot be empty",
              pattern: {
                value:
                  // eslint-disable-next-line no-useless-escape
                  /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/,
                message: "URL is not valid",
              },
            })}
          />

          <FormErrorMessage>
            {errors.url && errors.url.message}
          </FormErrorMessage>
        </FormControl>
      </Stack>

      <Stack direction={"row"} justify={"end"}>
        <Button variant={"outline"} type="submit">
          {data ? "Edit" : "Create"}
        </Button>
      </Stack>
    </Stack>
  );
};

const DynamicPageEditor = ({ data }: { data: DynamicPageDto | null }) => {
  const {
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm<Pick<DynamicPageDto, "content">>();

  const params = useParams("/cms/category/:categorySlug/:itemSlug");
  const api = useApi();
  const toast = useToast();
  const toastErrorHandler = useToastErrorHandler();

  useEffect(() => {
    if (data && data.content) {
      reset({
        content: data.content,
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);

  return (
    <Stack
      as={"form"}
      onSubmit={handleSubmit((data) => {
        api
          .post<ResponseModel>(
            `/item/${params.categorySlug}/${params.itemSlug}/dynamic`,
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
          .catch(toastErrorHandler);
      })}
      direction={"column"}
      justify={"space-between"}
      flex={1}
      mt={"1em"}
    >
      <Stack>
        <FormControl
          isInvalid={!!errors.content}
          h={"75vh"}
          w={"99%"}
          overflowY={"scroll"}
        >
          <FormLabel>Content Editor</FormLabel>
          <CKEditorInput
            name={"content"}
            control={control}
            rules={{
              required: "Content cannot be empty",
            }}
          />

          <FormErrorMessage>
            {errors.content && errors.content.message}
          </FormErrorMessage>
        </FormControl>
      </Stack>

      <Stack direction={"row"} justify={"end"}>
        <Button variant={"outline"} type="submit">
          {data ? "Edit" : "Create"}
        </Button>
      </Stack>
    </Stack>
  );
};

const ProfilePageEditor = ({ data }: { data: ProfilePageDto | null }) => {
  const {
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm<Pick<ProfilePageDto, "description">>();

  const [modalState, setModalState] = useState<ProfileModalState | null>(null);
  const {
    register: registerProfile,
    handleSubmit: handleSubmitProfile,
    formState: { errors: errorsProfile },
    control: controlProfile,
    reset: resetProfile,
  } = useForm<
    Omit<
      ProfileDto,
      "id" | "createdAt" | "updatedAt" | "profilePageId" | "picUrl"
    > & {
      picUrl: File | string;
    }
  >();

  const params = useParams("/cms/category/:categorySlug/:itemSlug");
  const api = useApi();
  const toast = useToast();
  const toastErrorHandler = useToastErrorHandler();

  useEffect(() => {
    if (data && data.description) {
      reset({
        description: data.description,
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params]);

  // borrowed from DropZone
  const validateImg = (url: string) => {
    return url.match(/(https?:\/\/.*\.(?:png|jpg|jpeg|gif))/) != null;
  };

  useEffect(() => {
    if (modalState?.mode === "EDIT") {
      if (validateImg(modalState.profile?.picUrl ?? "")) {
        // download images and turn it into File[]
        api
          // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
          .get(modalState.profile?.picUrl!, { responseType: "blob" })
          .then((res) => {
            const file = new File(
              [res.data],
              res.config.url?.split("/").pop() ?? "",
              {
                type: res.headers["content-type"],
              }
            );

            resetProfile({
              name: modalState.profile?.name,
              email: modalState.profile?.email,
              picUrl: file,
              position: modalState.profile?.position,
              expertise: modalState.profile?.expertise,
              staffHandbookLink: modalState.profile?.staffHandbookLink,
              profileUrl: modalState.profile?.profileUrl,
            });
          })
          .catch(toastErrorHandler);

        return;
      }

      resetProfile({
        name: modalState.profile?.name,
        email: modalState.profile?.email,
        // default value is a tring
        // picUrl: modalState.profile?.picUrl,
        position: modalState.profile?.position,
        expertise: modalState.profile?.expertise,
        staffHandbookLink: modalState.profile?.staffHandbookLink,
        profileUrl: modalState.profile?.profileUrl,
      });
      return;
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modalState]);

  return (
    <Stack
      as={"form"}
      onSubmit={handleSubmit((data) => {
        api
          .post<ResponseModel>(
            `/item/${params.categorySlug}/${params.itemSlug}/profile`,
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
          .finally(() =>
            mutate(`/item/${params.categorySlug}/${params.itemSlug}`)
          );
      })}
      direction={"column"}
      justify={"space-between"}
      flex={1}
      mt={"1em"}
    >
      <Stack>
        <FormControl
          isInvalid={!!errors.description}
          h={"20vh"}
          w={"99%"}
          overflowY={"scroll"}
        >
          <FormLabel>Description</FormLabel>
          <CKEditorInput
            name={"description"}
            control={control}
            rules={{
              required: "Description of profile page cannot be empty",
            }}
          />

          <FormErrorMessage>
            {errors.description && errors.description.message}
          </FormErrorMessage>
        </FormControl>

        <Stack direction={"row"} justify={"space-between"}>
          <Text fontWeight={"medium"}>Profiles</Text>
          <Button
            bgColor={"#222834"}
            color={"white"}
            _hover={{
              bgColor: "white",
              color: "#222834",
            }}
            onClick={() => {
              setModalState({
                mode: "CREATE",
                profile: null,
              });
              resetProfile();
            }}
          >
            Add Profile
          </Button>
        </Stack>

        <Stack
          justify={"center"}
          direction={"row"}
          align={"center"}
          wrap={"wrap"}
          h={"50vh"}
          gap={"2em"}
          overflowY={"scroll"}
        >
          {!data && (
            <Text>
              Please create a profile page first before adding a profile
            </Text>
          )}

          {data?.profile.length === 0 && (
            <Text>No profile found, please add new profile</Text>
          )}

          {data?.profile.map((profile) => (
            <ProfileCard
              key={profile.id}
              profile={profile}
              isEditable
              onEdit={() => {
                setModalState({
                  mode: "EDIT",
                  profile,
                });
              }}
            />
          ))}
        </Stack>
      </Stack>

      <Stack direction={"row"} justify={"end"}>
        <Button variant={"outline"} type="submit">
          {data ? "Edit" : "Create"}
        </Button>
      </Stack>

      <Modal
        isOpen={!!modalState}
        onClose={() => {
          resetProfile();
          setModalState(null);
        }}
        isCentered
      >
        <ModalOverlay backdropFilter={"blur(4px)"} />
        <ModalContent>
          <ModalHeader>
            {modalState?.mode === "CREATE" ? "Create Profile" : "Edit Profile"}
          </ModalHeader>
          <ModalCloseButton />
          <form
            onSubmit={(e) => {
              e.stopPropagation();
              handleSubmitProfile(async (data) => {
                if (data.picUrl) {
                  try {
                    const formData = new FormData();
                    formData.append("upload", data.picUrl);

                    const res = await api.post<{
                      uploaded: boolean;
                      url: string;
                    }>("/upload", formData, {
                      headers: {
                        "Content-Type": "multipart/form-data",
                      },
                    });

                    if (res.data.uploaded) {
                      data.picUrl = res.data.url;
                    }
                  } catch (err) {
                    toastErrorHandler(err as AxiosError<ResponseModel>);
                    return;
                  }
                }

                api[
                  modalState?.mode === "CREATE" ? "post" : "put"
                ]<ResponseModel>(
                  `/item/${params.categorySlug}/${
                    params.itemSlug
                  }/profile/entry${
                    modalState?.mode === "EDIT"
                      ? `/${modalState?.profile?.id}`
                      : ""
                  }`,
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
                    resetProfile();
                    setModalState(null);
                    mutate(`/item/${params.categorySlug}/${params.itemSlug}`);
                  });
              })(e);
            }}
          >
            <ModalBody>
              <FormControl isInvalid={!!errorsProfile.name}>
                <FormLabel>Name</FormLabel>
                <Input
                  {...registerProfile("name", {
                    required: "Name cannot be empty",
                  })}
                />
                <FormErrorMessage>
                  {errorsProfile.name && errorsProfile.name.message}
                </FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={!!errorsProfile.email}>
                <FormLabel>Email</FormLabel>
                <Input
                  type="email"
                  {...registerProfile("email", {
                    required: "Email cannot be empty",
                    pattern: {
                      value:
                        // eslint-disable-next-line no-useless-escape
                        /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                      message: "Email is not valid",
                    },
                  })}
                />
                <FormErrorMessage>
                  {errorsProfile.email && errorsProfile.email.message}
                </FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={!!errorsProfile.position}>
                <FormLabel>Position</FormLabel>
                <Input
                  {...registerProfile("position", {
                    required: "Position cannot be empty",
                  })}
                />
                <FormErrorMessage>
                  {errorsProfile.position && errorsProfile.position.message}
                </FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={!!errorsProfile.expertise}>
                <FormLabel>Expertise</FormLabel>
                <Input
                  {...registerProfile("expertise", {
                    required: "Expertise cannot be empty",
                  })}
                />
                <FormErrorMessage>
                  {errorsProfile.expertise && errorsProfile.expertise.message}
                </FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={!!errorsProfile.profileUrl}>
                <FormLabel>Profile Page (UMN/LinkedIn prefered)</FormLabel>
                <Input
                  type="url"
                  {...registerProfile("profileUrl", {
                    required: "Profile url cannot be empty",
                    pattern: {
                      value:
                        // eslint-disable-next-line no-useless-escape
                        /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/,

                      message: "Profile url is not valid",
                    },
                  })}
                />
                <FormErrorMessage>
                  {errorsProfile.profileUrl && errorsProfile.profileUrl.message}
                </FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={!!errorsProfile.staffHandbookLink}>
                <FormLabel>Staff Handbook Link</FormLabel>
                <Input
                  type="url"
                  {...registerProfile("staffHandbookLink", {
                    required: "Staff Handbook url cannot be empty",
                    pattern: {
                      value:
                        // eslint-disable-next-line no-useless-escape
                        /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/,

                      message: "Staff Handbook url is not valid",
                    },
                  })}
                />
                <FormErrorMessage>
                  {errorsProfile.staffHandbookLink &&
                    errorsProfile.staffHandbookLink.message}
                </FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={!!errorsProfile.picUrl}>
                <FormLabel>Profile Picture</FormLabel>
                <SingleDropZone
                  control={controlProfile}
                  name="picUrl"
                  rules={{
                    required: "Profile picture cannot be empty",
                  }}
                />
                <FormErrorMessage>
                  {errorsProfile.picUrl && errorsProfile.picUrl.message}
                </FormErrorMessage>
              </FormControl>
            </ModalBody>

            <ModalFooter
              justifyContent={
                modalState?.mode === "EDIT" ? "space-between" : "end"
              }
            >
              {modalState?.mode === "EDIT" && (
                <Button
                  colorScheme="red"
                  onClick={() => {
                    api
                      .delete<ResponseModel>(
                        `/item/${params.categorySlug}/${params.itemSlug}/profile/entry/${modalState?.profile?.id}`
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
                        resetProfile();
                        setModalState(null);
                        mutate(
                          `/item/${params.categorySlug}/${params.itemSlug}`
                        );
                      });
                  }}
                >
                  Delete
                </Button>
              )}
              <Button type="submit" variant="outline">
                {modalState?.mode === "CREATE" ? "Create" : "Edit"}
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </Stack>
  );
};

const ContentEditor = () => {
  const params = useParams("/cms/category/:categorySlug/:itemSlug");
  const { data, isLoading } = useSWR<ItemDto>(
    `/item/${params.categorySlug}/${params.itemSlug}`
  );

  if (isLoading) {
    return (
      <Stack flex={1} align={"center"} justify={"center"}>
        <Spinner />
      </Stack>
    );
  }

  if (!data) {
    return (
      <Stack flex={1} align={"center"} justify={"center"}>
        <Text>Item not found</Text>
      </Stack>
    );
  }

  return (
    <Stack
      flex={1}
      justify={"space-between"}
      overflow={"scroll"}
      sx={{
        "::-webkit-scrollbar": {
          display: "none",
        },
      }}
    >
      <Stack>
        <Stack direction={"row"} align={"center"}>
          <Heading size={"md"}>{data?.title}</Heading>
          <Badge
            bgColor={"#222834"}
            color={"white"}
            rounded={"full"}
            px={"0.5em"}
          >
            {data?.type} CONTENT
          </Badge>
        </Stack>
      </Stack>
      {data?.type === "DYNAMIC" && <DynamicPageEditor data={data.content} />}

      {data?.type === "LINK" && <LinkPageEditor data={data.content} />}

      {data?.type === "PROFILE" && <ProfilePageEditor data={data.content} />}
    </Stack>
  );
};

export default ContentEditor;
