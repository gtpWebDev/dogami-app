import Grid from "@mui/material/Grid";
import { styled } from "@mui/system";

/**
 * Grid, direction row, items centred horiz and vert
 */

export const GridRowItemsCentred = styled(Grid)(() => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

export const GridItemsCentred = styled(Grid)(() => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));
