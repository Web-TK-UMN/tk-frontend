import React from "react";
import ReactDOM from "react-dom/client";
import { Routes } from "@generouted/react-router";
import { ChakraProvider } from "@chakra-ui/react";
import AuthProvider from "@/providers/AuthProvider";
import { extendTheme } from "@chakra-ui/react";
import "@/main.css";

export const theme = extendTheme({
  fonts: {
    heading: "Poppins, sans-serif",
    body: "Poppins, sans-serif",
  },
  styles: {
    global: {
      h2: {
        fontSize: "2xl",
        fontWeight: "bold",
      },
      h3: {
        fontSize: "xl",
        fontWeight: "bold",
      },
      h4: {
        fontSize: "lg",
        fontWeight: "bold",
      },
      // table: {
      //   borderCollapse: "collapse",
      // },
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </ChakraProvider>
  </React.StrictMode>
);
