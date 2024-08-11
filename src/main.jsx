import * as React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "./theme";

import Box from "@mui/material/Box";

import { GlobalStyles } from "@mui/system";
import backImg from "./assets/backgrounds/purple-608575_1280.jpg";

const globalStyles = (
  <GlobalStyles
    styles={{
      body: {
        /**
         * note to revert to gradient, leave only the following 3 lines,
         * and remove the <Box> object from inside the ThemeProvider
         * background: `linear-gradient(${theme.palette.primary.main}, ${theme.palette.customBackground.main})`,
         * minHeight: "100vh",
         * margin: "0",
         */
        /**
         * Following styles achieves image fixed in background no matter the zoom level
         * Also requires Box inside ThemeProvider for the application content
         */
        margin: 0,
        padding: 0,
        minHeight: "100vh",
        backgroundImage: `url(${backImg})`,
        backgroundColor: "#290066", // Fallback color
        backgroundSize: "cover", // Ensures the image covers the entire viewport
        backgroundPosition: "top center", // Centers the image
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed", // Keeps the image fixed in position
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
      {/* This box in concert with GLobalStyles above gives background effect.
      Remove Box if not effect required */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          // alignItems: "center",
          minHeight: "100vh",
          color: "#fff",
          textShadow: "2px 2px 4px rgba(0, 0, 0, 0.7)",
          position: "relative",
        }}
      >
        {/* CssBaseline adds styles for more consistency across browsers, consistent box sizing, base typography styles and removes default margins. */}
        <CssBaseline />
        {globalStyles}
        <RouterProvider router={router} />
      </Box>
    </ThemeProvider>
  </React.StrictMode>
);
