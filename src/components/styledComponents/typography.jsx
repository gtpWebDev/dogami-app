import { styled } from "@mui/system";

import Typography from "@mui/material/Typography";

const StyledHeader = styled(Typography)(({ theme }) => ({
  fontWeight: "900",
  margin: "10px",
  padding: "15px 0",
  color: theme.palette.primary.contrastText,
}));

export const SectionHeader = ({ children }) => {
  return (
    <StyledHeader component="h3" variant="h3">
      {children}
    </StyledHeader>
  );
};

// Inline remove padding, higher specificity
export const SubSectionHeader = ({ children }) => {
  return (
    <StyledHeader component="h5" variant="h5" sx={{ padding: "0" }}>
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

export const BestTimeText = styled(Typography)(({ theme }) => ({
  // color: theme.palette.primary.contrastText,
  color: "#80ff80",
  fontWeight: "bold",
  textShadow: "3px 3px black",
}));
