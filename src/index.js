import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import {
  StyledEngineProvider,
  ThemeProvider,
  createTheme,
} from "@mui/material/styles";
import { ThemeProvider as StyledComponentsThemeProvider } from "styled-components";
import { base } from "./styles/StylesComponentsTheme.js";
import GlobalStyle from "./styles/GlobalStyles";
import store from "./context/store";

const rootElement = document.getElementById("root");

const root = ReactDOM.createRoot(rootElement);

const muiTheme = createTheme({
  components: {
    MuiPopover: {
      defaultProps: {
        container: rootElement,
      },
    },
    MuiPopper: {
      defaultProps: {
        container: rootElement,
      },
    },
  },
  palette: {
    primary: {
      main: "#006F9B",
    },
    secondary: {
      main: "#0094CF",
    },
  },
});

const styledComponetsTheme = {
  ...base,
};

root.render(
  <Provider store={store}>
    <StyledEngineProvider injectFirst>
      <StyledComponentsThemeProvider theme={styledComponetsTheme}>
        <ThemeProvider theme={muiTheme}>
          <GlobalStyle />
          <App />
        </ThemeProvider>
      </StyledComponentsThemeProvider>
    </StyledEngineProvider>
  </Provider>
);
