import Button from "@mui/material/Button";

export const FormButton = ({ children, type = "submit", label, onClick }) => {
  return (
    <Button type="submit" variant="contained">
      {children}
    </Button>
  );
};
