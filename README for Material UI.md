# Readme for setup of material UI

This will likely be moved into a skeleton template and represents the main step-by-step setup elements within a Vite react project.

## Step-by-step guide

### Install the libraries

```bash
npm install @mui/material @emotion/react @emotion/styled
npm install @mui/icons-material
```

### Setting up the roboto font

```bash
npm install @fontsource/roboto
```

Add an import command in the project entry point, for Vite, **main.jsx**

```js
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
```

or

```js
import "@fontsource/roboto";
```

### Basic vite setup

Make the following additions / adjustments to **main.jsx** to get started.

```js
import * as React from "react";

import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "./theme";

<React.StrictMode>
  <ThemeProvider theme={theme}>
    {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
    <CssBaseline />
    <RouterProvider router={router} />
  </ThemeProvider>
</React.StrictMode>;
```

Add **theme.js** as a starter theme file

```js
import { createTheme } from "@mui/material/styles";
import { red } from "@mui/material/colors";

// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      main: "#556cd6",
    },
    secondary: {
      main: "#19857b",
    },
    error: {
      main: red.A400,
    },
  },
});

export default theme;
```

### Usage

[Useful crash course if need a refresher](https://www.youtube.com/watch?v=o1chMISeTC0)
