import { useState } from "react";

import Modal from "@mui/material/Modal";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";

import CompositeLink from "../primitives/links";

import { GridItemsCentred } from "../styledComponents/grid";

import useStratFormData from "../../hooks/useStratFormData";

import { HEADER_JSON_CONFIG } from "../../constants/backendRequests";

import { axiosBackendPost } from "../../lib/axiosRequests/axiosBackendEndpoints";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  padding: 4,
};

/**
 *
 * Modal that caters for:
 * - Adding a strategy, with given trackId - complete
 * - Updating a strategy, with given trackId - complete
 * - Adding a strategy, user provides trackId - NOT TESTED
 *
 * (User provided through JWT)
 *
 * Props:
 * - openButtonText - e.g. "Add a Strategy"
 * - dogamiId
 * - stratDetails - (null if adding)
 * - trackDetails - for track id and name
 * - updateTrigger_cbfn
 * - isUpdate - true or false
 * - trackIdLocked - true or false
 */

export default function StrategyFormModal(props) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button variant="contained" color="secondary" onClick={handleOpen}>
        {props.openButtonText}
      </Button>
      <Modal open={open} onClose={handleClose}>
        {/* Material UI modal requires a pure Material UI child */}
        <Box>
          <StrategyFormContent handleClose={handleClose} {...props} />
        </Box>
      </Modal>
    </div>
  );
}

export const StrategyFormContent = (props) => {
  // state variables populated according to whether form is add or update

  const [isPrivate, setIsPrivate] = useState(
    props.isUpdate ? props.stratDetails.is_private : false
  );
  const [powerOne, setPowerOne] = useState(
    props.isUpdate ? props.stratDetails.power_1._id : ""
  );
  const [powerTwo, setPowerTwo] = useState(
    props.isUpdate ? props.stratDetails.power_2._id : ""
  );
  const [consumable, setConsumable] = useState(
    props.isUpdate ? props.stratDetails.consumable_1._id : ""
  );
  const [bestTime, setBestTime] = useState(
    props.isUpdate ? props.stratDetails.strat_best_time : 0
  );

  // Not used yet
  const [addStratMsg, setAddStratMsg] = useState(null);

  // track page - track is locked, dogami page, track user provided
  const [trackId, setTrackId] = useState(
    props.trackIdLocked ? props.trackDetails._id : ""
  );

  // custom hook
  const { stratFormData, error, loading } = useStratFormData();

  const handleTrackChange = (event) => setTrackId(event.target.value);
  const handleIsPrivateChange = (event) => setIsPrivate(!isPrivate);
  const handlePowerOneChange = (event) => setPowerOne(event.target.value);
  const handlePowerTwoChange = (event) => setPowerTwo(event.target.value);
  const handleConsumableChange = (event) => setConsumable(event.target.value);
  const handleBestTimeChange = (event) => setBestTime(event.target.value);

  const submitToBackend = async (event) => {
    event.preventDefault();

    // for update form, add stratId
    const stratId = props.isUpdate ? props.stratDetails._id : null;

    // note, dogamiId and stratId sent through the uri params
    const strat = {
      is_private: isPrivate,
      track_id: trackId,
      power_1: powerOne,
      power_2: powerTwo,
      consumable_1: consumable,
      strat_best_time: bestTime,
    };

    let response = {};
    if (props.isUpdate) {
      response = await axiosBackendPost(
        `/dogamis/${props.dogamiId}/strats/${stratId}`,
        strat,
        HEADER_JSON_CONFIG
      );
    } else {
      response = await axiosBackendPost(
        `/dogamis/${props.dogamiId}/strat/create`,
        strat,
        HEADER_JSON_CONFIG
      );
    }

    if (response.success) {
      // trigger parent refresh and close form
      props.updateTrigger_cbfn(new Date());
      props.handleClose();
    } else {
      setAddStratMsg(response.error.message);
    }
  };

  if (loading) return <p>Loading...</p>;

  // Temporary
  if (error) {
    return (
      <Box>
        <CompositeLink to="/dashboard">Return to dashboard</CompositeLink>
      </Box>
    );
  }

  return (
    <Box sx={style}>
      <GridItemsCentred container direction="column" align="center">
        <Grid item pb={3}>
          <ModalTitle isUpdate={props.isUpdate} />
        </Grid>

        <Grid item>
          <Box
            component="form"
            noValidate
            autoComplete="off"
            onSubmit={submitToBackend}
          >
            <TrackIdInput
              trackIdLocked={props.trackIdLocked}
              trackDetails={props.trackDetails}
              onChange={handleTrackChange}
            />

            <IsPrivateInput
              isPrivate={isPrivate}
              onChange={handleIsPrivateChange}
            />

            <DropdownInput
              labelText="First power: "
              options={stratFormData.powers}
              onChange={handlePowerOneChange}
              value={powerOne}
            />

            <DropdownInput
              labelText="Second power: "
              options={stratFormData.powers}
              onChange={handlePowerTwoChange}
              value={powerTwo}
            />

            <DropdownInput
              labelText="Consumable: "
              options={stratFormData.consumables}
              onChange={handleConsumableChange}
              value={consumable}
            />

            <BestTimeInput
              bestTime={bestTime}
              onChange={handleBestTimeChange}
            />

            <GridItemsCentred container spacing={2}>
              <Grid item>
                <SubmitButton isUpdate={props.isUpdate} />
              </Grid>
              <Grid item>
                <CloseFormButton onClick={props.handleClose} />
              </Grid>
            </GridItemsCentred>
          </Box>
        </Grid>
      </GridItemsCentred>
    </Box>
  );
};

const ModalTitle = ({ isUpdate }) => {
  return (
    <Grid item>
      <Box sx={{ borderBottom: "1px solid black" }}>
        <Typography variant="h5" align="center">
          {isUpdate ? "Update Strategy" : "Add Strategy"}
        </Typography>
      </Box>
    </Grid>
  );
};

const TrackIdInput = (props) => {
  return (
    <Box pb={1}>
      {props.trackIdLocked ? (
        <TextField
          id="track-id"
          type="text"
          label="Track"
          value={props.trackDetails.name}
          disabled
          onChange={(e) => props.onChange(e.target.value)}
        />
      ) : (
        <p>add track</p>
        // Add track dropdown alternative for dogami page!!!
        // <Dropdown
        //   labelText="Track: "
        //   options={stratFormData.tracks}
        //   onChange={handleTrackChange}
        //   value={trackId}
        // />
      )}
    </Box>
  );
};

const IsPrivateInput = (props) => {
  return (
    <Box pb={2}>
      <FormControlLabel
        control={<Checkbox />}
        label="Keep strategy private?"
        checked={props.isPrivate}
        onChange={(e) => props.onChange(e)}
      />
    </Box>
  );
};

const DropdownInput = ({ labelText, options, onChange, value }) => {
  return (
    <Box pb={2}>
      {/* No formal link between label and input - wuld need to generate unique id */}
      <FormControl fullWidth>
        <InputLabel>{labelText}</InputLabel>
        <Select label={labelText} value={value} onChange={onChange}>
          {options.map((option) => (
            <MenuItem
              key={option._id}
              value={option._id}
              sx={{ color: "primary.contrastText" }}
            >
              {option.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

const BestTimeInput = (props) => {
  return (
    <Box pb={3}>
      <TextField
        id="best-time-id"
        type="number"
        label="Best Time"
        value={props.bestTime}
        onChange={(e) => props.onChange(e)}
      />
    </Box>
  );
};

const SubmitButton = ({ isUpdate }) => {
  return (
    <>
      <Button variant="contained" color="secondary" type="submit">
        {isUpdate ? "Update" : "Add"}
      </Button>
    </>
  );
};

const CloseFormButton = (props) => {
  return (
    <Button variant="contained" color="secondary" onClick={props.onClick}>
      Close
    </Button>
  );
};
