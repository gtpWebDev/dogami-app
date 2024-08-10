import { useState } from "react";
import { Link, useParams } from "react-router-dom";

import useGetBackendData from "../../../hooks/useGetBackendData";

import StrategyFormModal from "../../composites/StrategyFormModal";

import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import { SectionHeader, TimeText } from "../../styledComponents/typography";
import CustomPaper from "../../styledComponents/paper";

import CompositeLink from "../../primitives/links";

import { GameItem } from "../../composites/GameItemsSVG";

import TrackCanvas from "../../composites/TrackCanvas";
const Dogami = () => {
  const { dogamiId } = useParams();

  // trigger for the custom hook
  const [updateTrigger, setUpdateTrigger] = useState(new Date());
  const updateTrigger_cbfn = (timestamp) => setUpdateTrigger(timestamp);

  /**
   * Custom hook returning:
   * data: {
   *   dogami: dogami,
   *   dogStrats: allDogStratsForDogami,
   * }
   *
   * Note, dog strats only populates track currently
   */

  const { data, error, loading } = useGetBackendData(
    `/dogamis/${dogamiId}/frontend-dogami-page`,
    updateTrigger
  );

  if (loading) return <p>Loading...</p>;

  if (error) {
    return (
      <>
        <h3>Dogami</h3>
        <div>
          <p>You do not have the permissions to view this dog!</p>
          <p>
            <Link to="/dashboard">Return to dashboard</Link>
          </p>
        </div>
      </>
    );
  }

  return (
    <Grid container spacing={2} align="center">
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

      <Grid item xs={12}>
        <SectionHeader>{data.dogami.name}</SectionHeader>
      </Grid>

      {/* Add strategy button with modal */}
      <Grid item xs={12} pb={2}>
        <StrategyFormModal
          openButtonText="Add a Strategy"
          dogamiId={dogamiId}
          stratDetails={null}
          trackDetails={null}
          updateTrigger_cbfn={updateTrigger_cbfn}
          isUpdate={false}
          trackIdLocked={false}
        />
      </Grid>

      {/* Combination of filters and display - spans full width */}
      <Grid item xs={12}>
        {/* Container for combination of filters and display*/}

        <Paper elevation={5}>
          <Grid container align="center">
            {/* Title */}
            <Grid item xs={12}>
              <Typography
                variant="h5"
                p={2}
                sx={{ color: "primary.contrastText" }}
              >
                Fastest Strategies by Track
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Filters />

              <Grid item xs={12}>
                {/* Track top strats display */}
                <Grid container px={3} pb={4} spacing={3}>
                  <StrategyDisplay
                    strats={data.dogStrats}
                    dogamiId={dogamiId}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
};

const Filters = () => {
  return (
    <Grid container align="left">
      {/* Individual filter - name*/}
      <Grid item xs={12} sm="auto">
        <NameFilter />
      </Grid>
      {/* Individual filter - colour sequence*/}
      {/* Full width xs, otherwise auto width */}
      <Grid item xs={12} sm="auto">
        <ColorSequenceFilter />
      </Grid>
    </Grid>
  );
};

const NameFilter = () => {
  return (
    <Typography variant="body1" p={2} sx={{ color: "primary.contrastText" }}>
      Filter by name should be quite long
    </Typography>
  );
};

const ColorSequenceFilter = () => {
  return (
    <Typography variant="body1" p={2} sx={{ color: "primary.contrastText" }}>
      Filter by colour sequence should be quite long
    </Typography>
  );
};

const StrategyDisplay = ({ strats, dogamiId }) => {
  // note this mutates the original array
  const sortedStrats = strats.sort((a, b) =>
    a.trackDetails.name.localeCompare(b.trackDetails.name)
  );

  return (
    <>
      {/* Individual top strat display will need to map array */}
      {sortedStrats.map((strat) => (
        <IndividualStratDisplay
          key={strat.track_id}
          strat={strat}
          dogamiId={dogamiId}
        />
      ))}
    </>
  );
};

const IndividualStratDisplay = ({ strat, dogamiId }) => {
  // console.log("strat", strat);

  /**
   * Need to populate power 1, power 2 and consumable
   */

  return (
    <Grid item xs={12} sm={6} md={4} lg={3}>
      <CompositeLink linkLoc={`/dogami/${dogamiId}/track/${strat.track_id}`}>
        <CustomPaper elevation={5}>
          <Track trackDetails={strat.trackDetails} />

          <GameItems strat={strat} />

          <BestTimeDisplay bestTime={strat.strat_best_time} />
        </CustomPaper>
      </CompositeLink>
    </Grid>
  );
};

const Track = ({ trackDetails }) => {
  return (
    <Box pb={1}>
      <Typography variant="h6" pt={1} sx={{ color: "primary.contrastText" }}>
        Track {trackDetails.name}
      </Typography>

      <TrackCanvas drawArray={trackDetails.draw_array} fullWidth={250} />
    </Box>
  );
};

const GameItems = ({ strat }) => {
  return (
    <Grid container>
      <Grid item xs={4}>
        <GameItem item={strat.power_1} type="powerstone" />
      </Grid>
      <Grid item xs={4}>
        <GameItem item={strat.power_2} type="powerstone" />
      </Grid>
      <Grid item xs={4}>
        <GameItem item={strat.consumable_1} type="consumable" />
      </Grid>
    </Grid>
  );
};

const BestTimeDisplay = ({ bestTime }) => {
  return (
    <TimeText variant="h5" p={2}>
      {bestTime.toFixed(3)}s
    </TimeText>
  );
};

export default Dogami;
