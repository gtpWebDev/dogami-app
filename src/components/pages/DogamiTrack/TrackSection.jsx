import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import CustomPaper from "../../styledComponents/paper";

import TrackCanvas from "../../composites/TrackCanvas";

import StrategyFormModal from "../../composites/StrategyFormModal";

const TrackSection = (props) => {
  const boxStyle = {
    // backgroundColor: "primary.main",
    overflow: "hidden", // ensures content doesn't overflow, stopping bottom borders from being rounded
  };

  return (
    <CustomPaper sx={{ borderRadius: "10px" }}>
      <Box sx={boxStyle}>
        <Stack>
          <Box pt={1}>
            <Typography variant="h4" color="primary.contrastText">
              Track {props.trackData.name}
            </Typography>
          </Box>
          <Box p={2}>
            <TrackCanvas
              drawArray={props.trackData.draw_array}
              fullWidth={250}
            />
          </Box>
          <Box pb={2}>
            <StrategyFormModal
              openButtonText="Add a Strategy"
              dogamiId={props.dogamiId}
              stratDetails={null}
              trackDetails={props.trackData}
              updateTrigger_cbfn={props.updateTrigger_cbfn}
              isUpdate={false}
              trackIdLocked={true}
            />
          </Box>
        </Stack>
      </Box>
    </CustomPaper>
  );
};

export default TrackSection;
