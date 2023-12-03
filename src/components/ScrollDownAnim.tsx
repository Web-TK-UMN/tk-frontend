import { Box } from "@chakra-ui/react";
import { motion } from "framer-motion";

const ScrollDownAnim = () => {
  return (
    // mouse scroll down anim using chakra-ui and framer-motion
    <Box
      w={"1.5em"}
      h={"2.5em"}
      border={"solid 2px #003D73"}
      rounded={"full"}
      //   align={"center"}
      //   justify={"center"}
    >
      <motion.div
        animate={{
          y: [0, 10],
        }}
        transition={{
          duration: 1,
          repeat: Infinity,
          repeatType: "loop",
          ease: "easeOut",
        }}
      >
        <Box
          w={"0.25em"}
          h={"0.5em"}
          bgColor={"#003D73"}
          rounded={"full"}
          pos={"relative"}
          top={"0.5em"}
          left={"0.5em"}
        />
      </motion.div>
    </Box>
  );
};

export default ScrollDownAnim;
