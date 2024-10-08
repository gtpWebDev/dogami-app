import { createTheme, responsiveFontSizes } from "@mui/material/styles";
import { red } from "@mui/material/colors";

/**
 * Color tool:
 * https://m2.material.io/inline-tools/color/
 * e.g. red[500]
 */

// when generating theme can't reference theme!
const primaryMain = "#1E0356";
const secondaryMain = "#74175A";

// Create a theme instance.
let theme = createTheme({
  palette: {
    // Everything defaults to primary
    primary: {
      main: primaryMain,
      contrastText: "#ffffff",
      unfocused: "#999999",
      // light: // can set up light and dark mode
      // dark:
    },
    secondary: {
      main: secondaryMain,
    },
    // error, warning, info, success for severity and use in Alerts
    error: {
      main: red.A400,
    },
    footer: {
      accent: secondaryMain,
      background: "#0E012B",
    },
    customBackground: {
      // think no longer used
      main: "#330033",
    },
  },
  // Stack defaults - center
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          // backgroundColor: "transparent",
          backgroundColor: primaryMain,
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        // seems to work with specificity
        root: {
          // all button types
          disableRipple: true, // bit old fashioned
          borderRadius: 10,
        },
        containedPrimary: {
          // only override for contained and primary instances of button
          borderRadius: 10,
        },
      },
      // add your own variants
      variants: [
        {
          props: {
            variant: "square-red",
          },
          style: {
            backgroundColor: red[500],
            color: "#ffffff",
            borderRadius: 1,
          },
        },
      ],
    },
    MuiFab: {
      defaultProps: {
        size: "medium",
      },
      styleOverrides: {
        // use a function to change how existing properties such as "size" work
        root: ({ state }) => ({
          ...(state.size === "large" && {
            width: 60,
            height: 60,
          }),
        }),
      },
    },
    MuiStack: {
      defaultProps: {
        // direction: "column",
        alignItems: "center",
      },
    },
  },
});

// Very nice trick, all Typography responds to window size
// all variants react to the viewport
theme = responsiveFontSizes(theme);

export default theme;
