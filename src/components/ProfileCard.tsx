import { Stack, Image, Text, Heading, Button, Link } from "@chakra-ui/react";
import { FaLink, FaPenToSquare } from "react-icons/fa6";

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

const ProfileCard = ({
  profile,
  onEdit,
  isEditable,
}: {
  profile: ProfileDto;
  onEdit?: () => void;
  isEditable?: boolean;
}) => {
  return (
    <Stack
      w={["26em", "26em", "30em", "30em", "30em"]}
      h={["12em", "12em", "14em", "14em", "14em"]}
      rounded={"2xl"}
      bgImage={"/assets/gedung_profile.png"}
      bgPos={"center"}
      bgSize={"cover"}
      pos={"relative"}
    >
      <Stack
        pos={"absolute"}
        bottom={0}
        bgColor={"white"}
        h={"65%"}
        w={"full"}
        roundedBottom={"2xl"}
        direction={"row"}
        px={["1.5em", "1.5em", "2em", "2em", "2em"]}
        py={["1em", "1em", "1.5em", "1.5em", "1.5em"]}
      >
        <Stack
          pt={["1em", "1em", "1.5em", "1.5em", "1.5em"]}
          gap={0}
          justify={"space-between"}
        >
          <Stack gap={0}>
            <Heading size={"xs"}>{profile.name}</Heading>
            <Text fontSize={"xs"} color={"#A5A5A5"}>
              {profile.position}
            </Text>
          </Stack>
          <Stack direction={"row"}>
            <Button
              as={Link}
              href={profile.profileUrl}
              size={"xs"}
              color={"white"}
              leftIcon={<FaLink />}
              rounded={"full"}
              variant={"unstyled"}
              px={"1em"}
              display={"flex"}
              alignItems={"center"}
              bgGradient={"linear(to-b, #232935, #5D6472)"}
              fontSize={"0.75em"}
            >
              Profile
            </Button>
            <Button
              as={Link}
              href={profile.staffHandbookLink}
              size={"xs"}
              color={"white"}
              leftIcon={<FaLink />}
              rounded={"full"}
              variant={"unstyled"}
              px={"1em"}
              display={"flex"}
              alignItems={"center"}
              bgGradient={"linear(to-b, #232935, #5D6472)"}
              fontSize={"0.75em"}
            >
              Handbook
            </Button>
          </Stack>
        </Stack>
        <Stack
          flex={1}
          direction={"column"}
          fontSize={"xs"}
          align={"end"}
          textAlign={"end"}
          gap={0}
        >
          <Stack
            gap={0}
            fontSize={["0.6em", "0.6em", "0.8em", "0.8em", "0.8em"]}
          >
            <Text color={"#A5A5A5"}>Email</Text>
            <Link href={`mailto:${profile.email}`} fontWeight={"medium"}>
              {profile.email}
            </Link>
          </Stack>
          <Stack
            gap={0}
            fontSize={["0.6em", "0.6em", "0.8em", "0.8em", "0.8em"]}
          >
            <Text color={"#A5A5A5"}>Expertise</Text>
            <Text fontWeight={"medium"}>{profile.expertise}</Text>
          </Stack>
        </Stack>
      </Stack>
      <Image
        pos={"absolute"}
        boxSize={["4em", "4em", "6em", "6em", "6em"]}
        objectFit={"cover"}
        objectPosition={"center"}
        src={profile.picUrl}
        rounded={"full"}
        outline={"4px solid white"}
        top={["2em", "2em", "1.5em", "1.5em", "1.5em"]}
        left={"2em"}
      />
      {isEditable && (
        <Button
          pos={"absolute"}
          leftIcon={<FaPenToSquare />}
          size={"sm"}
          top={"1.5em"}
          right={"1em"}
          onClick={onEdit}
        >
          Edit
        </Button>
      )}
    </Stack>
  );
};

export default ProfileCard;
