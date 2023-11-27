import React from "react";
import ReactDOM from "react-dom/client";
import { Routes } from "@generouted/react-router";
import { ChakraProvider } from "@chakra-ui/react";
import AuthProvider from "./providers/AuthProvider";
import { extendTheme } from "@chakra-ui/react";

export const theme = extendTheme({
  // fonts: {
  //   heading: 'Roboto',
  //   body: 'Roboto'
  // },
  styles: {
    global: {
      h1: {
        fontSize: "3xl",
        fontWeight: "bold",
      },
      h2: {
        fontSize: "2xl",
        fontWeight: "bold",
      },
      h3: {
        fontSize: "lg",
      },
      h4: {
        fontSize: "md",
      },
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
