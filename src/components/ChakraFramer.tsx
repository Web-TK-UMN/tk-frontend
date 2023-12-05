import { chakra, shouldForwardProp } from "@chakra-ui/react";
import { motion, isValidMotionProp } from "framer-motion";

export const MotionStack = chakra(motion.div, {
  // remove the chakra transition props, so framer-motion can handle it
  shouldForwardProp: (prop) =>
    isValidMotionProp(prop) || shouldForwardProp(prop),
  baseStyle: {
    display: "flex",
    flexDirection: "column",
  },
  label: "MotionStack",
});

export const MotionBox = chakra(motion.div, {
  shouldForwardProp: isValidMotionProp,
});
