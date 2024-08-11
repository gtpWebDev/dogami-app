import React from "react";
import { Box } from "@mui/material";
import { styled } from "@mui/system";

/**
 * Custom paper with white box shadow, catering for elevation 3, 6, otherwise 8
 */

const CustomPaper = styled(Box)(({ theme, elevation }) => ({
  borderRadius: "10px",
  backgroundColor: theme.palette.primary.main,
  boxShadow:
    elevation === 3
      ? "0px 1px 8px rgba(255, 255, 255, 0.2), 0px 3px 4px rgba(255, 255, 255, 0.14), 0px 3px 3px rgba(255, 255, 255, 0.12)"
      : elevation === 6
      ? "0px 3px 5px -1px rgba(255, 255, 255, 0.2), 0px 6px 10px rgba(255, 255, 255, 0.14), 0px 1px 18px rgba(255, 255, 255, 0.12)"
      : "0px 5px 5px -3px rgba(255, 255, 255, 0.2), 0px 8px 10px 1px rgba(255, 255, 255, 0.14), 0px 3px 14px 2px rgba(255, 255, 255, 0.12)",
}));

/**
 * Transparent override, no offset thin white shadow
 */
export const TransparentPaper = styled(Box)(({ theme, elevation }) => ({
  backgroundColor: "transparent",
  // horiz offset, vert offset, blur radius, spread radius, color
  boxShadow: "0px 0px 4px rgba(255, 255, 255, 0.2)",
}));

export default CustomPaper;
