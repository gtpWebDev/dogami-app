import Box from "@mui/material/Box";
import { styled } from "@mui/system";

/**
 * Box, content centred horiz and vert
 */

export const BoxContentCentred = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));
