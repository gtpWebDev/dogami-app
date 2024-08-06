import useDogamiTrackData from "../../../hooks/useDogamiTrackData";

import { useState } from "react";

import {
  yellow,
  purple,
  red,
  green,
  blue,
  orange,
} from "../../../constants/trackTemplates";

import PowerStoneSVG from "../../composites/PowerStoneSVG";
import PowerStone2SVG from "../../composites/PowerStone2SVG";
import ConsumableSVG from "../../composites/ConsumableSVG";

import DogamiDisplay from "../../composites/DogamiDisplay";
import { StyledButton } from "../../primitives/buttons";

import { Link, useParams } from "react-router-dom";

import TrackCanvas from "../../composites/canvas";

import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import CustomPaper from "../../styledComponents/paper";

const DogamiTrack = () => {
  // route params
  const { dogamiId, trackId } = useParams();

  // trigger for the custom hook
  const [updateTrigger, setUpdateTrigger] = useState(new Date());
  const updateTrigger_cbfn = (timestamp) => setUpdateTrigger(timestamp);

  // custom hook
  const { trackData, error, loading } = useDogamiTrackData(
    dogamiId,
    trackId,
    updateTrigger
  );

  if (loading) return <p>Loading...</p>;

  if (error) {
    return (
      <>
        <h3>Dogami</h3>
        <div>
          <p>
            You do not have the permissions to view this dog's track strategies!
          </p>
          <p>
            <Link to="/login">Return to login</Link>
          </p>
          <p>
            <Link to="/dashboard">Return to dashboard</Link>
          </p>
        </div>
      </>
    );
  }

  return (
    <>
      <Grid container spacing={2}>
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
          <TrackSection trackName={trackData.track.name} />
        </Grid>

        {/*  */}
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
              {/* Dog display always auto width */}
              <Grid item xs="auto">
                <DogamiDisplay dogami={trackData.dogami} />
              </Grid>
              {/* Strategy display to side from small */}
              <Grid item xs={12} sm>
                <Paper
                  sx={{
                    width: "100%",
                    backgroundColor: "primary.main",
                    padding: 2,
                  }}
                >
                  <StrategyDisplay strats={trackData.dogamiStrats} />
                </Paper>
              </Grid>
            </Grid>
          </Box>
        </Grid>
        <Grid item sx={12}>
          <p>
            <Link to={`/dogami/${dogamiId}`}>Return to dogami</Link>
          </p>
          <p>
            <Link to="/dashboard">Return to dashboard</Link>
          </p>
        </Grid>
      </Grid>

      {/* <Grid item xs={12}>
        <Grid container>
          <TrackStatsDisplay
            dogamiStrats={trackData.dogamiStrats}
            updateTrigger_cbfn={updateTrigger_cbfn}
            dogamiId={dogamiId}
          />
        </Grid>
      
        {trackData && (
          <DogamiStratAddForm
            dogamiId={dogamiId}
            isTrackUserProvided={false}
            trackId={trackId}
            trackData={trackData}
            updateTrigger_cbfn={updateTrigger_cbfn}
          />
        )}
      </Grid> */}
    </>
  );
};

/**
 * Track title and canvas of track
 */

const TrackSection = (props) => {
  return (
    <CustomPaper>
      <Box
        sx={{
          borderRadius: "8px",
          backgroundColor: "primary.main",
          overflow: "hidden", // ensures content doesn't overflow, stopping bottom borders from being rounded
        }}
      >
        <Stack>
          <Box pt={1}>
            <Typography variant="h4" color="primary.contrastText">
              Track {props.trackName}
            </Typography>
          </Box>
          <Box p={2} sx={{ backgroundColor: "primary.main" }}>
            <TrackCanvas trackName={props.trackName} fullWidth={250} />
          </Box>
        </Stack>
      </Box>
    </CustomPaper>
  );
};

const StrategyDisplay = (props) => {
  return props.strats.map((element) => (
    <div key={element._id}>
      <StrategyItem strat={element} />
    </div>
  ));
};

const StrategyItem = (props) => {
  const sectionStyle = {
    height: "50px", // Adjust height as needed

    backgroundColor: "primary.main",
    py: 4,
    px: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  return (
    <>
      <Box sx={{ flexGrow: 1, padding: 2 }}>
        <CustomPaper sx={{ padding: 0.2 }} elevation={6}>
          <Grid container spacing={0.2}>
            {/* STONES AND CONSUMABLES */}
            <Grid item xs={12} md>
              <Box sx={sectionStyle}>
                <Grid
                  container
                  justifyContent="center"
                  alignItems="center"
                  spacing={{ xs: 1, sm: 2, lg: 5, xl: 7 }}
                >
                  <Grid item>
                    <PowerStoneSVG colorOne={green} colorTwo={red} />
                  </Grid>
                  <Grid item>
                    <PowerStone2SVG colorOne={yellow} colorTwo={yellow} />
                  </Grid>
                  <Grid item>
                    <ConsumableSVG color={blue} />
                  </Grid>
                </Grid>
              </Box>
            </Grid>
            {/* STRATEGY TIME */}
            <Grid item xs={12} md={3}>
              <Typography variant="h5" color="primary.contrastText">
                <Box sx={sectionStyle}>
                  {props.strat.strat_best_time.toFixed(3)}
                </Box>
              </Typography>
            </Grid>
            {/* UPDATE / DELETE BUTTONS */}
            <Grid item xs={12} md="auto">
              <Box sx={sectionStyle}>
                <Grid
                  container
                  justifyContent="center"
                  alignItems="center"
                  spacing={1}
                >
                  <Grid item>
                    <StyledButton variant="contained" color="secondary">
                      Update
                    </StyledButton>
                  </Grid>
                  <Grid item>
                    <StyledButton variant="contained" color="secondary">
                      Delete
                    </StyledButton>
                  </Grid>
                </Grid>
              </Box>
            </Grid>
          </Grid>
        </CustomPaper>
      </Box>
    </>
  );
};

const TrackImage = (props) => {
  return <img src={trackImg} width={props.width} alt="" />;
};

export default DogamiTrack;
