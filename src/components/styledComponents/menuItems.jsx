import { styled } from "@mui/system";

import MenuItem from "@mui/material/Typography";

export const StyledTrackMenuItem = styled(MenuItem)(({ theme }) => ({
  height: 20,
  color: "primary.contrastText",
}));

export const TrackMenuItem = ({ children, value }) => {
  return <StyledTrackMenuItem value={value}>{children}</StyledTrackMenuItem>;
};
