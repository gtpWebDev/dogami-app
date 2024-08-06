import { useState, useEffect } from "react";

import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

import CompositeLink from "../primitives/links";

import CustomPaper from "../styledComponents/paper";

/**
 * Display with 2 sections - info and image
 * Third section below uses composition for optional additions.
 */

const DogamiDisplay = ({ children, dogami }) => {
  // makes available dogami info
  // useEffect(() => {
  //   console.log("dogami", dogami);
  // }, []);

  return (
    <CustomPaper elevation={6} sx={{ padding: "15px 0" }}>
      <Grid container direction="column" spacing={1}>
        <Grid item>
          <CompositeLink linkLoc={`/dogami/${dogami._id}`}>
            <Grid item>
              <Box paddingX={2} sx={{ display: "flex" }}>
                <Typography
                  variant="h5"
                  sx={{ color: "#ffffff", fontWeight: "900" }}
                >
                  {dogami.name}
                </Typography>
              </Box>
              <Box paddingX={2} sx={{ display: "flex" }}>
                <Typography variant="body1" sx={{ color: "#ffffff" }}>
                  #{dogami.dogami_official_id}
                </Typography>
              </Box>
              <Box paddingX={2} sx={{ display: "flex" }}>
                <Typography variant="body1" sx={{ color: "#ffffff" }}>
                  Level {dogami.level} {dogami.breed}
                </Typography>
              </Box>
            </Grid>
            <Grid item sx={{ padding: "0 10px" }}>
              <DogImage url={dogami.img_url} />
            </Grid>
          </CompositeLink>
        </Grid>

        <Grid item>{children}</Grid>
      </Grid>
    </CustomPaper>
  );
};

const DogImage = (props) => {
  return (
    <>{<img src={`${props.url}?w=200&auto=format`} alt="" width={200} />}</>
  );
};

export default DogamiDisplay;
