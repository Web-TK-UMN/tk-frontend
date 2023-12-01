import { useAuth } from "@/hooks/useAuth";
import {
  Heading,
  ListItem,
  OrderedList,
  Stack,
  Text,
  Image,
  IconButton,
  Icon,
  Button,
  Avatar,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { FaPlus } from "react-icons/fa6";

type Member = {
  name: string;
  role: string;
  photo: string;
};

const teamMembers: Member[] = [
  {
    name: "Fathan Ridhwan",
    role: "Leader & Fullstack Dev",
    photo: "/assets/fathan.jpg",
  },
  {
    name: "Dimas Takeda",
    role: "Frontend Dev",
    photo: "/assets/dimas.jpg",
  },
  {
    name: "Alvin Yohannes",
    role: "Frontend Dev",
    photo: "/assets/alvin.jpg",
  },
  {
    name: "Albert Tirto",
    role: "UI/UX Designer",
    photo: "/assets/albert.jpg",
  },
  {
    name: "Rafael Herdani",
    role: "UI/UX Designer",
    photo: "/assets/pael.jpg",
  },
  {
    name: "Paskasius Gian",
    role: "UI/UX Dev",
    photo: "/assets/gian.jpg",
  },
];

const CMSIndex = () => {
  const auth = useAuth();

  useEffect(() => {
    document.title = "CMS | Dashboard";
  }, []);

  return (
    <Stack flex={1}>
      <Heading size={"md"}>Dashboard</Heading>
      <Stack
        direction={["column", "column", "row", "row", "row"]}
        flex={1}
        gap={"1em"}
        mt={"1em"}
      >
        <Stack flex={1} direction={"column"} gap={"1em"}>
          <Stack
            direction={"column"}
            p={"2em"}
            bgGradient={"linear(to-b, #879FCD, #5776B2)"}
            rounded={"xl"}
            color={"white"}
            pos={"relative"}
            boxShadow={"sm"}
          >
            <Image
              src={"/assets/circuit_ornaments.svg"}
              pos={"absolute"}
              boxSize={"6em"}
              bottom={0}
              right={0}
            />
            <Heading size={"md"}>Hello {auth.user?.name} 👋🏻</Heading>
            <Text fontSize={["sm", "sm", "sm", "sm", "sm"]}>
              Welcome to the the Computer Engineering CMS page. Here you can
              manage the content of the website. You can add, edit, and delete
              categories and items.
            </Text>
          </Stack>
          <Stack direction={"column"} flex={1}>
            <Stack
              direction={"column"}
              h={"full"}
              p={"2em"}
              rounded={"xl"}
              bgColor={"white"}
              pos={"relative"}
              boxShadow={"sm"}
            >
              <Heading size={"md"}>Getting Started</Heading>
              <OrderedList>
                <ListItem>
                  Create new category on the Category section.
                </ListItem>
                <ListItem>
                  Enter details such as title and friendly url slug.
                </ListItem>
                <ListItem>Add new items to the category.</ListItem>
                <ListItem>Enter item type and url slug</ListItem>
                <ListItem>Create the content</ListItem>
                <ListItem>
                  Drag and drop the categories and items to re-order.
                </ListItem>
              </OrderedList>

              <Stack
                flex={1}
                bgColor={"#556481"}
                direction={["column", "column", "row", "row", "row"]}
                align={"center"}
                p={"2em"}
                rounded={"xl"}
              >
                <IconButton
                  boxSize={["8em", "8em", "6em", "8em", "10em"]}
                  variant={"ghost"}
                  rounded={"xl"}
                  aria-label="add category"
                  bgColor={"#3C465B"}
                  color={"white"}
                  icon={
                    <Icon
                      as={FaPlus}
                      boxSize={["4em", "4em", "2em", "4em", "6em"]}
                    />
                  }
                />
                <Stack color={"white"} gap={0} justify={"end"} p={"1em"}>
                  <Text>Lets try it!</Text>
                  <Text fontWeight={"bold"}>Click to add new category</Text>
                </Stack>
              </Stack>
            </Stack>
          </Stack>
        </Stack>
        <Stack direction={"column"} flex={1} gap={"1em"}>
          <Stack direction={"column"} flex={1}>
            <Stack
              direction={"column"}
              h={"full"}
              p={"2em"}
              rounded={"xl"}
              bgColor={"white"}
              pos={"relative"}
              boxShadow={"sm"}
            >
              <Heading size={"md"}>Team Members</Heading>
              <Stack my={"1em"} gap={"1em"}>
                {teamMembers.map((member) => (
                  <Stack direction={"row"} align={"center"}>
                    <Avatar size={"md"} src={member.photo} />
                    <Stack gap={0} mx={"1em"}>
                      <Text fontWeight={"bold"}>{member.name}</Text>
                      <Text textColor={"#BBBBBB"}>{member.role}</Text>
                    </Stack>
                  </Stack>
                ))}
              </Stack>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default CMSIndex;
