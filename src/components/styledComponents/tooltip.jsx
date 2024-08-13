import { styled } from "@mui/system";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";

export const ConsumableTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.primary.contrastText,
    boxShadow: theme.shadows[1],
    fontSize: 14,
  },
}));
