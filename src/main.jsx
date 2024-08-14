import * as React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Container from "@mui/material/Container";

import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "./theme";

import { GlobalStyles } from "@mui/system";

const globalStyles = (
  <GlobalStyles
    styles={{
      body: {
        background: `linear-gradient(${theme.palette.primary.main}, ${theme.palette.customBackground.main})`,
        minHeight: "100vh",
        margin: "0",
      },
    }}
  />
);

// enable use of roboto for Material UI
// https://mui.com/material-ui/getting-started/installation/
import "@fontsource/roboto";

import routes from "./routes";

const router = createBrowserRouter(routes);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      {/* CssBaseline adds styles for more consistency across browsers, consistent box sizing, base typography styles and removes default margins. */}
      <Container maxWidth="xl">
        <CssBaseline />
        {globalStyles}
        <RouterProvider router={router} />
      </Container>
      {/* </Box> */}
    </ThemeProvider>
  </React.StrictMode>
);
