import { styled } from "@mui/system";

import Typography from "@mui/material/Typography";

/**
 * Material UI styled component approach
 */

const StyledHeader = styled(Typography)(({ theme }) => ({
  fontWeight: "900",
  margin: "10px",
  padding: "15px 0",
  color: theme.palette.primary.main,
}));

export const SectionHeader = ({ children }) => {
  return (
    <StyledHeader component="h3" variant="h3">
      {children}
    </StyledHeader>
  );
};

export const StyledTitleHeader = styled(Typography)(({ theme }) => ({
  color: theme.palette.primary.contrastText,
  fontWeight: "bold",
  textShadow: "3px 3px black",
  fontSize: "50px",
  [theme.breakpoints.up("sm")]: {
    fontSize: "60px",
  },
  [theme.breakpoints.up("md")]: {
    fontSize: "70px",
  },
  [theme.breakpoints.up("lg")]: {
    fontSize: "80px",
  },
}));
