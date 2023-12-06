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
      w={["24em", "24em", "30em", "30em", "30em"]}
      h={["18em", "18em", "16em", "16em", "16em"]}
      rounded={"2xl"}
      bgImage={"/assets/gedung_profile.png"}
      bgPos={"center"}
      bgSize={"cover"}
      pos={"relative"}
      boxShadow={"0px 2px 8px rgba(0, 0, 0, 0.25)"}
    >
      <Stack
        pos={"absolute"}
        bottom={0}
        bgColor={"white"}
        h={"65%"}
        w={"full"}
        roundedBottom={"2xl"}
        direction={"column"}
        px={"1.5em"}
        pb={["1em", "1em", "1.5em", "1.5em", "1.5em"]}
      >
        <Stack direction={"column"} gap={0} ml={"7em"} mt={"0.5em"}>
          <Heading size={"sm"}>{profile.name}</Heading>
          <Text fontSize={"sm"} color={"#A5A5A5"}>
            {profile.position}
          </Text>
        </Stack>
        <Stack direction={"row"} flex={1} gap={0}>
          <Stack flex={1}>
            <Stack gap={0}>
              <Text color={"#A5A5A5"} fontSize={"sm"}>
                Email
              </Text>
              <Link
                fontWeight={"medium"}
                fontSize={"xs"}
                href={`mailto:${profile.email}`}
              >
                {profile.email}
              </Link>
            </Stack>
            <Stack gap={0} justify={"space-between"}>
              <Stack gap={0}>
                <Text color={"#A5A5A5"} fontSize={"sm"}>
                  Expertise
                </Text>
                <Text
                  fontWeight={"medium"}
                  fontSize={"xs"}
                  noOfLines={2}
                  textOverflow={"ellipsis"}
                >
                  {profile.expertise}
                </Text>
              </Stack>
            </Stack>
          </Stack>
          <Stack
            direction={["column", "column", "row", "row", "row"]}
            align={"end"}
            justify={"end"}
          >
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
              bgGradient={"linear(to-b, #055EAE, #003D73)"}
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
              bgGradient={"linear(to-b, #055EAE, #003D73)"}
              fontSize={"0.75em"}
            >
              Handbook
            </Button>
          </Stack>
        </Stack>
      </Stack>
      <Image
        pos={"absolute"}
        boxSize={"6em"}
        objectFit={"cover"}
        objectPosition={"center"}
        src={profile.picUrl}
        rounded={"full"}
        outline={"4px solid white"}
        top={["3em", "3em", "2.5em", "2.5em", "2.5em"]}
        left={["1.5em", "1.5em", "1.5em", "1.5em", "1.5em"]}
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
