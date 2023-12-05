import {
  Stack,
  Text,
  Image,
  createIcon,
  useBreakpoint,
} from "@chakra-ui/react";
import { motion } from "framer-motion";

const Triangle = createIcon({
  displayName: "Triangle",
  viewBox: "0 0 400 400",
  path: <path fill="currentColor" d="M 200 25 L 377.5 350 L 22.5 350 Z" />,
});

const RoundedTriangle = createIcon({
  displayName: "RoundedTriangle",
  viewBox: "0 0 400 400",
  path: (
    <path
      fill="currentColor"
      d="M 200 25 L 377.5 350 L 22.5 350 Z"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),
});

const KaprodiAnim = () => {
  const bp = useBreakpoint({ ssr: false });

  return (
    <Stack
      flex={"1"}
      pos={"relative"}
      align={"center"}
      justify={"center"}
      // transform={["scale(0.8)", "scale(0.8)", "scale(0.8)", "none", "none"]}
      // shift to left a little bit
      // left={["-5%", "-5%", "-5%", "0", "0"]}
    >
      <motion.div
        style={{
          position: "absolute",
          left: ["sm", "base"].includes(bp) ? "22%" : "35%",
          transform: "translateX(-50%)",
          // top: "20%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        viewport={{ once: true }}
        initial={{
          rotate: 0,
          opacity: 0,
          zIndex: 1,
        }}
        whileInView={{
          rotate: 45,
          y: 0,
          opacity: 1,
          zIndex: 1,
        }}
        transition={{
          duration: 1.5,
          delay: 0.5,
          ease: "easeInOut",
        }}
      >
        <RoundedTriangle
          boxSize={"20em"}
          color={"#FD8E09"}
          stroke={"#FD8E09"}
          strokeWidth={"0.5em"}
          zIndex={1}
          transform={["scale(0.65)", "scale(0.65)", "none", "none", "none"]}
        />
      </motion.div>

      <motion.div
        style={{
          position: "absolute",
          left: ["sm", "base"].includes(bp) ? "22%" : "35%",
          transform: "translateX(-50%)",
          // top: "20%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        viewport={{ once: true }}
        initial={{
          rotate: 0,
          opacity: 0,
          zIndex: 2,
        }}
        whileInView={{
          rotate: 20,
          y: 0,
          opacity: 1,
          zIndex: 2,
        }}
        transition={{
          duration: 1.5,
          delay: 1,
          ease: "easeInOut",
        }}
      >
        <RoundedTriangle
          boxSize={"20em"}
          color={"#013D71"}
          stroke={"white"}
          strokeWidth={"1em"}
          zIndex={2}
          transform={["scale(0.65)", "scale(0.65)", "none", "none", "none"]}
        />
      </motion.div>

      {/* double triangle kiri */}

      <motion.div
        style={{
          position: "absolute",
          left: "15%",
          top: "0",
          transform: "translateX(-50%)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        viewport={{ once: true }}
        initial={{
          y: 25,
          opacity: 0,
          zIndex: 1,
        }}
        whileInView={{
          y: 0,
          opacity: 1,
          zIndex: 1,
        }}
        transition={{
          duration: 1.5,
          delay: 0.5,
          ease: "easeInOut",
        }}
      >
        <Triangle
          boxSize={"2em"}
          color={"white"}
          // stroke={"white"}
          // strokeWidth={"1em"}
          zIndex={2}
        />
      </motion.div>

      <motion.div
        style={{
          position: "absolute",
          left: "15%",
          top: "2em",
          transform: "translateX(-50%)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        viewport={{ once: true }}
        initial={{
          y: 25,
          opacity: 0,
          zIndex: 1,
        }}
        whileInView={{
          y: 0,
          opacity: 1,
          zIndex: 1,
        }}
        transition={{
          duration: 1.5,
          delay: 0.75,
          ease: "easeInOut",
        }}
      >
        <Triangle
          boxSize={"2em"}
          color={"white"}
          // stroke={"white"}
          // strokeWidth={"1em"}
          zIndex={2}
        />
      </motion.div>

      {/* double triangle kanan */}
      <motion.div
        style={{
          position: "absolute",
          rotate: "180deg",
          right: "15%",
          bottom: "0",
          transform: "translateX(-50%)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        viewport={{ once: true }}
        initial={{
          y: -25,
          opacity: 0,
          zIndex: 1,
        }}
        whileInView={{
          y: 0,
          opacity: 1,
          zIndex: 1,
        }}
        transition={{
          duration: 1.5,
          delay: 0.5,
          ease: "easeInOut",
        }}
      >
        <Triangle
          boxSize={"2em"}
          color={"white"}
          // stroke={"white"}
          // strokeWidth={"1em"}
          zIndex={2}
        />
      </motion.div>

      <motion.div
        style={{
          position: "absolute",
          rotate: "180deg",
          right: "15%",
          bottom: "2em",
          transform: "translateX(-50%)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        viewport={{ once: true }}
        initial={{
          y: -25,
          opacity: 0,
          zIndex: 2,
        }}
        whileInView={{
          y: 0,
          opacity: 1,
          zIndex: 2,
        }}
        transition={{
          duration: 1.5,
          delay: 0.75,
          ease: "easeInOut",
        }}
      >
        <Triangle
          boxSize={"2em"}
          color={"white"}
          // stroke={"white"}
          // strokeWidth={"1em"}
          zIndex={2}
        />
      </motion.div>

      <Image
        src={"/assets/kaprodi.png"}
        w={["16em", "16em", "24em", "24em", "24em"]}
        // pos={"absolute"}
        zIndex={5}
      />
    </Stack>
  );
};

const KaprodiSection = () => {
  return (
    <>
      <Stack
        bgImage={"/assets/bgUMNblue.png"}
        bgSize={"cover"}
        bgPosition={"center"}
        py={"4em"}
        px={["2em", "2em", "6em", "6em", "6em"]}
      >
        <Stack
          direction={["column", "column", "column", "row", "row"]}
          // margin={["none", "none", "3em", "3em", "3em"]}
        >
          <KaprodiAnim />

          <Stack flex={1} color={"white"}>
            <motion.div
              viewport={{ once: true }}
              initial={{
                opacity: 0,
                y: -10,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 1,
                ease: "easeOut",
                delay: 0.5,
              }}
            >
              <Text fontWeight="normal" textAlign={"justify"}>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Qui,
                architecto. Aperiam eius explicabo, similique molestias quasi
                inventore necessitatibus reprehenderit ab accusantium error
                libero, placeat, delectus cupiditate esse optio iure iusto!
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Beatae
                quos eveniet explicabo non nemo. Beatae rem inventore facere ad.
                Molestiae harum eum cupiditate, et iure ad praesentium mollitia
                iste expedita!
              </Text>
              <Text paddingTop={"3em"}>Regards,</Text>
              <Text fontWeight={"semibold"}>
                Head of the Computer Engineering Study Program
              </Text>
              <Text fontWeight={"semibold"}>
                Universitas Multimedia Nusantara
              </Text>
            </motion.div>
          </Stack>
        </Stack>
      </Stack>
    </>
  );
};
export default KaprodiSection;
