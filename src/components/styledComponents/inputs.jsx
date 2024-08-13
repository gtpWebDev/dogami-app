import { styled } from "@mui/system";

import TextField from "@mui/material/TextField";

const StyledTextField = styled(TextField)(({ theme }) => ({
  //  Label greyed when unfocused, otherwise white
  "& .MuiInputLabel-root": {
    color: theme.palette.primary.unfocused,
  },
  "& .MuiInputLabel-root.Mui-focused": {
    color: theme.palette.primary.contrastText,
  },

  "& .MuiInputBase-input": {
    color: theme.palette.primary.contrastText, // default input color (unfocussed)
  },

  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "transparent", // Default border color
    },
    "&:hover fieldset": {
      borderColor: "transparent", // Border color on hover
    },
    "&.Mui-focused fieldset": {
      borderColor: "transparent", // Border color when focused
    },
  },
  minWidth: "350px",
}));

export const FilterTextField = (props) => {
  return (
    <StyledTextField
      type="text"
      label={props.label}
      value={props.value}
      onChange={(e) => props.onChangeFn(e)}
    />
  );
};

const StyledWhiteTextField = styled(TextField)(({ theme }) => ({
  //  Label always white - focused and not
  "& .MuiInputLabel-root": {
    color: theme.palette.primary.contrastText,
  },
  "& .MuiInputLabel-root.Mui-focused": {
    color: theme.palette.primary.contrastText,
  },

  // input always white
  "& .MuiInputBase-input": {
    color: theme.palette.primary.contrastText, // default input color (unfocussed)
  },

  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "#ffffff", // Default border color
    },
    "&:hover fieldset": {
      borderColor: "#ffffff", // Border color on hover
    },
    "&.Mui-focused fieldset": {
      borderColor: "#ffffff", // Border color when focused
    },
  },
}));

export const WhiteTextField = (props) => {
  return (
    <StyledWhiteTextField
      type={props.type}
      label={props.label}
      value={props.value}
      onChange={(e) => props.onChangeFn(e)}
    />
  );
};
