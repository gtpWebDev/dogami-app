import { useState } from "react";

import {
  BACKEND_URI,
  HEADER_JSON_CONFIG,
} from "../../../constants/backendRequests.js";

import { axiosBackendDelete } from "../../../lib/axiosRequests/axiosBackendEndpoints.js";

import StrategyFormModal from "../../composites/StrategyFormModal.jsx";
import GameItem from "../../composites/GameItem.jsx";

import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import { StyledButton } from "../../styledComponents/buttons.jsx";
import { GridRowItemsCentred } from "../../styledComponents/grid";
import { BoxContentCentred } from "../../styledComponents/box";
import CustomPaper from "../../styledComponents/paper";
import { BestTimeText } from "../../styledComponents/typography";

const StrategyDisplay = (props) => {
  // note this mutates the original array
  const sortedStrats = props.strats.sort(
    (a, b) => a.strat_best_time - b.strat_best_time
  );

  return (
    <>
      {sortedStrats.map((element, index) => (
        <div key={element._id}>
          {index === 0 ? (
            <Box pb={5}>
              <StrategyItem
                dogamiId={props.dogamiId}
                updateTrigger_cbfn={props.updateTrigger_cbfn}
                strat={element}
                track={props.track}
                topStrategy={true}
              />
            </Box>
          ) : (
            <Box pb={1}>
              <StrategyItem
                dogamiId={props.dogamiId}
                updateTrigger_cbfn={props.updateTrigger_cbfn}
                strat={element}
                track={props.track}
                topStrategy={false}
              />
            </Box>
          )}
        </div>
      ))}
    </>
  );
};

const StrategyItem = (props) => {
  return (
    <>
      <Box sx={{ flexGrow: 1, padding: 0 }}>
        <CustomPaper sx={{ padding: 0.2 }} elevation={6}>
          <Grid container spacing={0.2}>
            {/* STONES AND CONSUMABLES */}
            <Grid item xs={12} md>
              <ItemsSection strat={props.strat} />
            </Grid>

            {/* TIME */}
            <Grid item xs={12} md={3}>
              {props.topStrategy ? (
                <BestTimeSection bestTime={props.strat.strat_best_time} />
              ) : (
                <NormalTimeSection bestTime={props.strat.strat_best_time} />
              )}
            </Grid>

            {/* UPDATE / DELETE BUTTONS */}
            <Grid item xs={12} md="auto">
              <ActionSection
                strat={props.strat}
                track={props.track}
                dogamiId={props.dogamiId}
                updateTrigger_cbfn={props.updateTrigger_cbfn}
              />
            </Grid>
          </Grid>
        </CustomPaper>
      </Box>
    </>
  );
};

const ItemsSection = (props) => {
  return (
    <BoxContentCentred sx={{ height: "90px", py: 4, px: 1 }}>
      <GridRowItemsCentred
        container
        spacing={{ xs: 1, sm: 2, md: 2, lg: 5, xl: 7 }}
      >
        <Grid item>
          <GameItem item={props.strat.power_1} type="powerstone" />
        </Grid>
        <Grid item>
          <GameItem item={props.strat.power_2} type="powerstone" />
        </Grid>
        <Grid item>
          <GameItem item={props.strat.consumable_1} type="consumable" />
        </Grid>
      </GridRowItemsCentred>
    </BoxContentCentred>
  );
};

const ActionSection = (props) => {
  return (
    <BoxContentCentred
      sx={{ height: { xs: "50px", md: "90px" }, py: 4, px: 1 }}
    >
      <GridRowItemsCentred container spacing={1}>
        <Grid item>
          <StrategyFormModal
            openButtonText="Update"
            dogamiId={props.dogamiId}
            stratDetails={props.strat}
            trackDetails={props.track}
            updateTrigger_cbfn={props.updateTrigger_cbfn}
            isUpdate={true}
            trackIdLocked={true}
          />
        </Grid>
        <Grid item>
          <DeleteStratButton {...props} />
        </Grid>
      </GridRowItemsCentred>
    </BoxContentCentred>
  );
};

const DeleteStratButton = (props) => {
  const [errorMsg, setErrorMsg] = useState(null);

  // should add modulars to check "are you sure"
  const handleDelete = async () => {
    const deleteUri = `${BACKEND_URI}/dogamis/${props.dogamiId}/strats/${props.strat._id}`;
    const response = await axiosBackendDelete(deleteUri, HEADER_JSON_CONFIG);

    if (response.success) {
      // need to refresh content of page to include the new dog
      props.updateTrigger_cbfn(new Date());
    } else {
      setErrorMsg(response.error.message);
    }
  };

  return (
    <>
      <StyledButton
        variant="contained"
        color="secondary"
        onClick={handleDelete}
      >
        Delete
      </StyledButton>
      {errorMsg ? <p>{errorMsg}</p> : <></>}
    </>
  );
};

const BestTimeSection = (props) => {
  return (
    <BoxContentCentred
      sx={{ height: { xs: "50px", md: "90px" }, py: 4, px: 1 }}
    >
      <BestTimeText variant="h5" color="primary.contrastText">
        {props.bestTime.toFixed(3)}s
      </BestTimeText>
    </BoxContentCentred>
  );
};

const NormalTimeSection = (props) => {
  return (
    <BoxContentCentred
      sx={{ height: { xs: "50px", md: "90px" }, py: 2, px: 1 }}
    >
      <Typography variant="h6" color="error.main">
        {props.bestTime.toFixed(3)}s
      </Typography>
    </BoxContentCentred>
  );
};

export default StrategyDisplay;
