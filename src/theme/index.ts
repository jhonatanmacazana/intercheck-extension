import { extendTheme, ThemeConfig } from "@chakra-ui/react";
import { GlobalStyles, mode } from "@chakra-ui/theme-tools";

const config: ThemeConfig = {
  initialColorMode: "light",
  useSystemColorMode: false,
};

const styles: GlobalStyles = {
  global: props => ({
    "html, body": {
      backgroundColor: mode("backgroundLight", "backgroundDark")(props),
      color: mode("text.light", "text.dark")(props),

      width: "600px",
      height: "400px",
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

const theme = extendTheme({ config, styles });

export default theme;
