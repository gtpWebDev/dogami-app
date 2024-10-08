import useDogamiTrackData from "../../../hooks/useDogamiTrackData";

import { useState } from "react";

import DogamiDisplay from "../../composites/DogamiDisplay";
import Loading from "../../composites/Loading";

import { Link, useParams } from "react-router-dom";

import TrackSection from "./TrackSection";
import StrategyDisplay from "./StrategyDisplay";

import Grid from "@mui/material/Grid";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import { Navigate } from "react-router-dom";

const DogamiTrack = () => {
  // route parameters
  const { dogamiId, trackId } = useParams();

  // trigger for the custom hook
  const [updateTrigger, setUpdateTrigger] = useState(new Date());
  const updateTrigger_cbfn = (timestamp) => setUpdateTrigger(timestamp);

  const { data, error, loading } = useDogamiTrackData(
    dogamiId,
    trackId,
    updateTrigger
  );

  if (loading) return <Loading />;

  // Not authorised. Would like a tidier solution, but this does work
  if (error) return <Navigate to={`/unauthorised`} replace={false} />;

  return (
    <Grid container spacing={4}>
      {/* <Grid item xs={12} mt={2}>
        <Typography
          variant="body2"
          color={{
            xs: "green",
            sm: "red",
            md: "blue",
            lg: "orange",
            xl: "pink",
          }}
        >
          xs green, sm red, md blue, lg orange, xl pink
        </Typography>
      </Grid> */}

      {/* Track section full width always */}
      <Grid item xs={12} mt={2}>
        <TrackSection
          dogamiId={dogamiId}
          trackData={data.track}
          updateTrigger_cbfn={updateTrigger_cbfn}
        />
      </Grid>

      {/* Next row, full width, grid styling can possibly be tidied up */}
      <Grid item xs={12}>
        <Box style={{ flexGrow: 1 }}>
          <Grid
            container
            spacing={2}
            sx={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            {/* Dog display, and add strategy button below, always auto width */}
            <Grid item xs="auto">
              <DogamiDisplay dogami={data.dogami} />
            </Grid>
            {/* Strategy display below for xs, to the right form small upwards */}
            <Grid item xs={12} sm>
              <StrategyDisplay
                strats={data.dogamiStrats}
                track={data.track}
                dogamiId={dogamiId}
                updateTrigger_cbfn={updateTrigger_cbfn}
              />
            </Grid>
          </Grid>
        </Box>
      </Grid>
    </Grid>
  );
};

export default DogamiTrack;
