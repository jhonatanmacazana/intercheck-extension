import { ColorModeScript, ChakraProvider } from "@chakra-ui/react";
import React from "react";
import ReactDOM from "react-dom";
import { MemoryRouter } from "react-router-dom";

import App from "#root/App";
import reportWebVitals from "#root/reportWebVitals";
import theme from "#root/theme";

ReactDOM.render(
  <ChakraProvider theme={theme}>
    <MemoryRouter>
      <React.StrictMode>
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
        <App />
      </React.StrictMode>
    </MemoryRouter>
  </ChakraProvider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
