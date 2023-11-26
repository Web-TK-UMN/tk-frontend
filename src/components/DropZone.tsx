import { Text, Image, Center, useToast, Stack } from "@chakra-ui/react";
import { useController } from "react-hook-form";
import { useDropzone } from "react-dropzone";
import imageCompression from "browser-image-compression";
import { useEffect } from "react";

import axios from "axios";
import { useToastErrorHandler } from "@/hooks/useApi";

const validateImg = (url: string) => {
  return url.match(/(https?:\/\/.*\.(?:png|jpg|jpeg|gif))/) != null;
};

// adopted from MAXIMA 23
export const MultiDropZone = ({
  control,
  name,
  rules,
  defaultValue,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: any;
  name: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  rules?: any;
  defaultValue?: string[];
}) => {
  // yep ini buat nge hook ke react-hook-form
  const {
    field: { value, onChange },
  } = useController({
    control,
    name,
    rules,
    // defaultValue: defaultFiles,
  });

  const handleError = useToastErrorHandler();

  useEffect(() => {
    if (!defaultValue) {
      return;
    }

    const validated = defaultValue.filter((url: string) => validateImg(url));

    // download images and turn it into File[]
    Promise.all(
      validated.map((url: string) => axios.get(url, { responseType: "blob" }))
    )
      .then((res) =>
        res.map(
          (res) =>
            new File([res.data], res.config.url?.split("/").pop() ?? "", {
              type: res.headers["content-type"],
            })
        )
      )
      .then((res) => {
        onChange(res);
      })
      .catch(handleError);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultValue]);

  const toast = useToast();

  const { getRootProps, getInputProps } = useDropzone({
    maxFiles: 5,
    // "image/jpg": [".jpg"],
    accept: { "image/jpeg": [".jpeg", ".jpg"], "image/png": [".png"] },
    onDrop: async (acceptedFiles: File[]) => {
      if (acceptedFiles.length) {
        try {
          const compressedFiles = await Promise.all(
            acceptedFiles.map((file) =>
              imageCompression(file, {
                maxSizeMB: 1,
                maxWidthOrHeight: 1024,
                useWebWorker: true,
              })
            )
          );

          onChange(
            compressedFiles.map(
              (file) =>
                new File([file], file.name, {
                  lastModified: file.lastModified,
                  type: file.type,
                })
            )
          );
        } catch (err) {
          console.error(err);

          toast({
            title: "Error",
            description: "Terjadi kesalahan saat komnpresi gambar",
            status: "error",
            duration: 5000,
            isClosable: true,
          });
        }
      }
    },
  });

  const thumb = value && (
    <Stack
      direction={["column", "column", "row", "row", "row"]}
      flexWrap={"wrap"}
      my={"1em"}
    >
      {value.map((file: File) => {
        const url = URL.createObjectURL(file);
        return (
          <Image
            src={url}
            width={"auto"}
            height={"auto"}
            maxWidth={"100%"}
            maxHeight={"100%"}
            objectFit={"contain"}
            alt={file.name}
            onLoad={() => {
              URL.revokeObjectURL(url);
            }}
          />
        );
      })}
    </Stack>
  );

  return (
    <>
      <Center
        p={"0.8em"}
        border={"dashed #e2e8f0"}
        width={"100%"}
        height={"5em"}
        borderRadius={10}
        {...getRootProps({ className: "dropzone" })}
        transition={"0.1s ease-in-out"}
        _hover={{ border: "dashed #CBD5E0", cursor: "pointer" }}
      >
        <input {...getInputProps()} />
        <Text color={"#A6A8AC"} userSelect={"none"} align={"center"}>
          Seret dan taruh file di sini, atau klik untuk memilih file
        </Text>
      </Center>
      <Stack direction={"row"} flexWrap={"wrap"}>
        {value && thumb}
      </Stack>
    </>
  );
};

export const SingleDropZone = ({
  control,
  name,
  rules,
  defaultValue,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: any;
  name: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  rules?: any;
  defaultValue?: string;
}) => {
  // yep ini buat nge hook ke react-hook-form
  const {
    field: { value, onChange },
  } = useController({
    control,
    name,
    rules,
    // defaultValue: defaultFiles,
  });

  const handleError = useToastErrorHandler();

  useEffect(() => {
    if (!defaultValue) {
      return;
    }

    const validated = validateImg(defaultValue);

    if (!validated) {
      return;
    }

    // download images and turn it into File
    axios
      .get(defaultValue, { responseType: "blob" })
      .then((res) => {
        onChange(
          new File([res.data], res.config.url?.split("/").pop() ?? "", {
            type: res.headers["content-type"],
          })
        );
      })
      .catch(handleError);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultValue]);

  const toast = useToast();

  const { getRootProps, getInputProps } = useDropzone({
    maxFiles: 1,
    // "image/jpg": [".jpg"],
    accept: {
      "image/jpeg": [".jpeg", ".jpg"],
      "image/png": [".png"],
      "image/webp": [".webp"],
    },
    onDrop: async (acceptedFiles: File[]) => {
      if (acceptedFiles.length) {
        try {
          imageCompression(acceptedFiles[0], {
            maxSizeMB: 1,
            maxWidthOrHeight: 1024,
            useWebWorker: true,
          }).then((file) => {
            onChange(
              new File([file], file.name, {
                lastModified: file.lastModified,
                type: file.type,
              })
            );
          });
        } catch (err) {
          console.error(err);

          toast({
            title: "Error",
            description: "Terjadi kesalahan saat komnpresi gambar",
            status: "error",
            duration: 5000,
            isClosable: true,
          });
        }
      }
    },
  });

  const thumbUrl = value ? URL.createObjectURL(value) : undefined;
  const thumb = value && (
    <Stack
      direction={["column", "column", "row", "row", "row"]}
      flexWrap={"wrap"}
      my={"1em"}
    >
      <Image
        src={thumbUrl}
        width={"auto"}
        height={"auto"}
        maxWidth={"100%"}
        maxHeight={"100%"}
        objectFit={"contain"}
        alt={value.name}
        onLoad={() => {
          URL.revokeObjectURL(thumbUrl!);
        }}
      />
      );
    </Stack>
  );

  return (
    <>
      <Center
        p={"0.8em"}
        border={"dashed #e2e8f0"}
        width={"100%"}
        height={"5em"}
        borderRadius={10}
        {...getRootProps({ className: "dropzone" })}
        transition={"0.1s ease-in-out"}
        _hover={{ border: "dashed #CBD5E0", cursor: "pointer" }}
      >
        <input {...getInputProps()} />
        <Text color={"#A6A8AC"} userSelect={"none"} align={"center"}>
          Seret dan taruh file di sini, atau klik untuk memilih file
        </Text>
      </Center>
      <Stack direction={"row"} flexWrap={"wrap"}>
        {value && thumb}
      </Stack>
    </>
  );
};
