import { v4 as uuidv4 } from "uuid";

import { useState } from "react";

import {
  BACKEND_URI,
  HEADER_JSON_CONFIG,
} from "../../../constants/backendRequests.js";

import { axiosBackendDelete } from "../../../lib/axiosRequests/axiosBackendEndpoints.js";

import GameItemsSVG from "../../composites/GameItemsSVG";

import { StyledButton } from "../../primitives/buttons";

import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import CustomPaper from "../../styledComponents/paper";

const StrategyDisplay = (props) => {
  return props.strats.map((element) => (
    <div key={element._id}>
      <StrategyItem
        dogamiId={props.dogamiId}
        updateTrigger_cbfn={props.updateTrigger_cbfn}
        strat={element}
      />
    </div>
  ));
};

const StrategyItem = (props) => {
  const sectionStyle = {
    height: "90px",
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
              <ItemsSection strat={props.strat} sectionStyle={sectionStyle} />
            </Grid>

            {/* BEST TIME */}
            <Grid item xs={12} md={3}>
              <BestTimeSection
                bestTime={props.strat.strat_best_time}
                sectionStyle={sectionStyle}
              />
            </Grid>

            {/* UPDATE / DELETE BUTTONS */}
            <Grid item xs={12} md="auto">
              <ActionSection
                strat={props.strat}
                sectionStyle={sectionStyle}
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
    <Box sx={props.sectionStyle}>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        spacing={{ xs: 1, sm: 2, lg: 5, xl: 7 }}
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
      </Grid>
    </Box>
  );
};

const ActionSection = (props) => {
  return (
    <Box sx={props.sectionStyle}>
      <Grid container justifyContent="center" alignItems="center" spacing={1}>
        <Grid item>
          <StyledButton variant="contained" color="secondary">
            Update
          </StyledButton>
        </Grid>
        <Grid item>
          <DeleteStratButton {...props} />
        </Grid>
      </Grid>
    </Box>
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
    <Typography variant="h5" color="primary.contrastText">
      <Box sx={props.sectionStyle}>{props.bestTime.toFixed(3)}</Box>
    </Typography>
  );
};

const GameItem = ({ item, type }) => {
  const power1ColourArray = () => {
    let array = [];
    item.skills.forEach((skill) => {
      array.push(skill.colour);
    });
    return array;
  };

  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
    >
      <Grid item>
        <GameItemText item={item} />
      </Grid>
      <Grid item>
        <GameItemsSVG
          item={type}
          colorArray={power1ColourArray()}
          id={uuidv4()}
          width={50}
          height={50}
        />
      </Grid>
    </Grid>
  );
};

const GameItemText = ({ item }) => {
  const skillsText = () => {
    const output =
      item.name === "Dragon"
        ? "All"
        : item.skills.length === 1
        ? item.skills[0].name.substring(0, 3)
        : item.skills[0].name.substring(0, 3) +
          "/" +
          item.skills[1].name.substring(0, 3);
    return output;
  };

  return (
    <Typography variant="body2" color="primary.contrastText">
      {skillsText()}
    </Typography>
  );
};

export default StrategyDisplay;
