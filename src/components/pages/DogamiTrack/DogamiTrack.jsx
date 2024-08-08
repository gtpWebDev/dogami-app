import useDogamiTrackData from "../../../hooks/useDogamiTrackData";

import { useState, createContext } from "react";

import DogamiDisplay from "../../composites/DogamiDisplay";

import { Link, useParams } from "react-router-dom";

import TrackSection from "./TrackSection";
import StrategyDisplay from "./StrategyDisplay";

import Grid from "@mui/material/Grid";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import { BoxContentCentred } from "../../styledComponents/box";

import { StrategyForm } from "./StrategyForm";

import AddModal from "../../composites/AddModal";

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

  if (loading) return <p>Loading...</p>;

  // Management of errors and lack of auth to come
  if (error) return <Navigate to={`/errorPage`} replace={false} />;

  return (
    <Grid container spacing={4}>
      <Grid item xs={12} mt={2}>
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
      </Grid>

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
      <Grid item xs={12}>
        <p>
          <Link to={`/dogami/${dogamiId}`}>Return to dogami</Link>
        </p>
        <p>
          <Link to="/dashboard">Return to dashboard</Link>
        </p>
      </Grid>
    </Grid>
  );
};

export default DogamiTrack;
