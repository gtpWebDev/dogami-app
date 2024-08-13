import { useState, createContext, useContext } from "react";
import Grid from "@mui/material/Grid";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";

import { BestTimeText } from "../../styledComponents/typography";
import CustomPaper from "../../styledComponents/paper";
import { TransparentPaper } from "../../styledComponents/paper";
import { SubSectionHeader } from "../../styledComponents/typography";

import { FilterTextField } from "../../styledComponents/inputs";

import { CompositeLinkNoUnderline } from "../../styledComponents/links";

import GameItem from "../../composites/GameItem";

import TrackCanvas from "../../composites/TrackCanvas";

const FilterContext = createContext({
  trackNameFilter: "",
  obstacleFilter: "",
  handleChangeNameFilter_cbfn: () => {},
  handleChangeObstacleFilter_cbfn: () => {},
});

const BestStrategiesDisplay = ({ strats, dogamiId }) => {
  // Filter management, case insensitive, always show caps
  const [trackNameFilter, setTrackNameFilter] = useState("");
  const handleChangeNameFilter_cbfn = (event) => {
    setTrackNameFilter(event.target.value.toUpperCase());
  };
  const [obstacleFilter, setObstacleFilter] = useState("");
  const handleChangeObstacleFilter_cbfn = (event) => {
    setObstacleFilter(event.target.value.toUpperCase());
  };

  // Filter construction
  const filteredStrats = strats.filter((strategy) => {
    return (
      (trackNameFilter === "" ||
        strategy.trackDetails.name
          .toLowerCase()
          .includes(trackNameFilter.toLowerCase())) &&
      (obstacleFilter === "" ||
        strategy.trackDetails.obstacle_sequence
          .toLowerCase()
          .includes(obstacleFilter.toLowerCase()))
    );
  });

  return (
    <FilterContext.Provider
      value={{
        trackNameFilter,
        obstacleFilter,
        handleChangeNameFilter_cbfn,
        handleChangeObstacleFilter_cbfn,
      }}
    >
      <TransparentPaper elevation={5}>
        <Grid container align="center" spacing={2}>
          {/* Title */}
          <Grid item xs={12}>
            <SubSectionHeader>Fastest Strategies by Track</SubSectionHeader>
          </Grid>
          <Grid item xs={12}>
            <Filters />
          </Grid>
          <Grid item xs={12}>
            <StrategyDisplay strats={filteredStrats} dogamiId={dogamiId} />
          </Grid>
        </Grid>
      </TransparentPaper>
    </FilterContext.Provider>
  );
};

const Filters = () => {
  const {
    trackNameFilter,
    obstacleFilter,
    handleChangeNameFilter_cbfn,
    handleChangeObstacleFilter_cbfn,
  } = useContext(FilterContext);

  return (
    // Small, padding left controlled and auto-width
    // Extra small, full width, no padding
    <Grid container spacing={2} paddingX={{ xs: 0, sm: 2 }}>
      <Grid item xs>
        <CustomPaper elevation={5}>
          <FilterTextField
            label='Filter by Track Name - e.g. "C2"'
            value={trackNameFilter}
            onChangeFn={handleChangeNameFilter_cbfn}
          />
        </CustomPaper>
      </Grid>
      <Grid item xs>
        <CustomPaper elevation={5}>
          <FilterTextField
            label='Filter by obstacle sequence - e.g. "YBG"'
            value={obstacleFilter}
            onChangeFn={handleChangeObstacleFilter_cbfn}
          />
        </CustomPaper>
      </Grid>
    </Grid>
  );
};

const StrategyDisplay = ({ strats, dogamiId }) => {
  // note this mutates the original array
  const sortedStrats = strats.sort((a, b) =>
    a.trackDetails.name.localeCompare(b.trackDetails.name)
  );

  return (
    <Grid container px={3} pb={4} spacing={3} paddingX={{ xs: 0, sm: 2 }}>
      {/* Individual top strat display will need to map array */}
      {sortedStrats.map((strat) => (
        <IndividualStratDisplay
          key={strat.track_id}
          strat={strat}
          dogamiId={dogamiId}
        />
      ))}
    </Grid>
  );
};

const IndividualStratDisplay = ({ strat, dogamiId }) => {
  return (
    <Grid item xs={12} sm={6} md={4} lg={3}>
      <CompositeLinkNoUnderline
        linkLoc={`/dogami/${dogamiId}/track/${strat.track_id}`}
      >
        <CustomPaper elevation={5}>
          <Track trackDetails={strat.trackDetails} />
          <GameItems strat={strat} />
          <BestTimeDisplay bestTime={strat.strat_best_time} />
        </CustomPaper>
      </CompositeLinkNoUnderline>
    </Grid>
  );
};

const Track = ({ trackDetails }) => {
  return (
    <Box>
      <Typography
        underline="none"
        variant="h6"
        pt={1}
        sx={{ color: "primary.contrastText" }}
      >
        Track {trackDetails.name}
      </Typography>
      <TrackCanvas drawArray={trackDetails.draw_array} fullWidth={220} />
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
    <BestTimeText variant="h5" pb={1}>
      {bestTime.toFixed(3)}s
    </BestTimeText>
  );
};

export default BestStrategiesDisplay;
