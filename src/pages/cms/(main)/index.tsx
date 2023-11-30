import { useAuth } from "@/hooks/useAuth";
import { Heading, ListItem, OrderedList, Stack, Text } from "@chakra-ui/react";

const CMSIndex = () => {
  const auth = useAuth();

  return (
    <Stack>
      <Heading size={"lg"}>Welcome to the Computer Engineering CMS</Heading>

      <Text>Hello, {auth.user?.name}.</Text>

      <Text>
        Welcome to the CMS page. Here you can manage the content of the website.
        You can add, edit, and delete categories and items.
      </Text>
      <Stack my={"1em"}>
        <Text fontWeight={"bold"}>Getting Started :</Text>
        <OrderedList>
          <ListItem>Create new category on the Category section.</ListItem>
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
      </Stack>
    </Stack>
  );
};

export default CMSIndex;
