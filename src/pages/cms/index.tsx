import CKEditorInput from "@/components/ckEditorInput";
import { Stack, Text, Button, Divider, CSSReset } from "@chakra-ui/react";
import { useState } from "react";
import { useForm } from "react-hook-form";

const IndexPage = () => {
  const [content, setContent] = useState("");

  const { handleSubmit, control } = useForm<{ content: string }>();
  return (
    <Stack h={"100vh"} align={"center"} justify={"center"} p={"2em"}>
      <Text>Ini frontend untuk CMS</Text>
      <Stack
        as={"form"}
        w={"full"}
        onSubmit={handleSubmit((data) => {
          setContent(data.content);
        })}
      >
        <CSSReset />
        <CKEditorInput control={control} name="content" />
        <Button type="submit">Submit</Button>
      </Stack>
      <Divider orientation="horizontal" my={"2em"} />
      <Stack flex={1} w={"full"}>
        <CSSReset />
        <div
          className="ck-reset"
          dangerouslySetInnerHTML={{
            __html: content,
          }}
        />
      </Stack>
    </Stack>
  );
};

export default IndexPage;
