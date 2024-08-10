import Button from "@mui/material/Button";
import { styled } from "@mui/system";

export const FormButton = ({ children, type = "submit", label, onClick }) => {
  return (
    <Button type="submit" variant="contained">
      {children}
    </Button>
  );
};

export const ContainedSecondaryButton = ({ label, onClick }) => {
  return (
    <StyledButton variant="contained" color="secondary" onClick={onClick}>
      {label}
    </StyledButton>
  );
};

export const StyledButton = styled(Button)(() => ({
  color: "secondary",
  disableRipple: true,
  borderRadius: "10px",
}));
