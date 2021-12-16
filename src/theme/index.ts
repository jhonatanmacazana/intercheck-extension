import { extendTheme, ThemeConfig } from "@chakra-ui/react";
import { GlobalStyles, mode } from "@chakra-ui/theme-tools";

import { EXTENSION_HEIGHT, EXTENSION_WIDTH } from "#root/lib/constants";

const config: ThemeConfig = {
  initialColorMode: "light",
  useSystemColorMode: false,
};

const colors = {
  text: {
    light: "#123",
    dark: "#321",
  },
};

const styles: GlobalStyles = {
  global: props => ({
    "html, body": {
      backgroundColor: mode("backgroundLight", "backgroundDark")(props),
      // color: mode("text.light", "text.dark")(props),
      color: "text.light",

      width: EXTENSION_WIDTH,
      height: EXTENSION_HEIGHT,
      margin: 0,
      fontFamily: `-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu",
      "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif`,
      WebkitFontSmoothing: "antialiased",
      MozOsxFontSmoothing: "grayscale",
      textRendering: "optimizeLegibility",
    },
    code: {
      fontFamily: `source-code-pro, Menlo, Monaco, Consolas, "Courier New", monospace`,
    },
  }),
};

const theme = extendTheme({ config, colors, styles });

export default theme;
