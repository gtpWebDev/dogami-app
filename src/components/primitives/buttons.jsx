import Button from "@mui/material/Button";

export const FormButton = ({ children, type = "submit", label, onClick }) => {
  return (
    <Button type="submit" variant="contained">
      {children}
    </Button>
  );
};

import { styled } from "@mui/system";

export const StyledButton = styled(Button)(() => ({
  color: "secondary",
  // height: 25,
  disableRipple: true,
  borderRadius: "10px",
}));
