import { useState, useContext } from "react";

// import ModalContext from "../../composites/AddModal";

import DogamiDisplay from "../../composites/DogamiDisplay";

import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

import useStratFormData from "../../../hooks/useStratFormData";

import {
  ADD_DOGAMI_URI,
  HEADER_JSON_CONFIG,
} from "../../../constants/backendRequests";

import { axiosDogamiUri } from "../../../lib/axiosRequests/axiosDogamiEndpoints";
import {
  axiosBackendPost,
  axiosBackendGet,
} from "../../../lib/axiosRequests/axiosBackendEndpoints";

import { constructDogamiObject } from "../../../lib/dogamiData";

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
 * Form to be used in a modal, catering for a few possibilities:
 * - (Dogami id always provided and uneditable)
 * - Track id editable or not (trackIdLocked boolean)
 * - add or update (isUpdate boolean)
 */

export const StrategyForm = ({
  dogamiId,
  updateTrigger_cbfn,
  isUpdate = false,
  trackIdLocked = false,
  trackDetails,
  handleClose,
}) => {
  const [isPrivate, setIsPrivate] = useState(false);
  const [powerOne, setPowerOne] = useState("");
  const [powerTwo, setPowerTwo] = useState("");
  const [consumable, setConsumable] = useState("");
  const [bestTime, setBestTime] = useState(0);

  const [addDogamiMsg, setAddDogamiMsg] = useState(null);

  // track page - track is locked, dogami page, track user provided
  const [trackId, setTrackId] = useState(trackIdLocked ? trackDetails._id : "");

  // custom hook
  const { stratAddData, error, loading } = useStratFormData();

  const handlePowerOneChange = (event) => setPowerOne(event.target.value);

  // const { handleClose } = useContext(ModalContext);

  const submitToBackend = async () => {
    // setAddDogamiMsg(null);
    // const response = await axiosBackendPost(
    //   ADD_DOGAMI_URI,
    //   dogami,
    //   HEADER_JSON_CONFIG
    // );

    console.log("Simulating submit");
    console.log("isPrivate", isPrivate);
    console.log("powerOne", powerOne);

    const response = { success: true };
    if (response.success) {
      console.log("Simulaitng submitting form details");
      updateTrigger_cbfn(new Date());
    } else {
      setAddDogamiMsg(response.error.message);
    }
  };

  if (loading) return <p>Loading...</p>;

  if (error) {
    return (
      <>
        <h3>Error</h3>
        <div>
          <p>Issue generating the add strat form.</p>
          <p>
            <Link to="/dashboard">Return to dashboard</Link>
          </p>
        </div>
      </>
    );
  }

  return (
    <Box sx={style}>
      <Stack spacing={3}>
        <Grid item>
          <Box sx={{ borderBottom: "1px solid black" }}>
            <Typography variant="h5" align="center">
              {isUpdate ? "Update Strategy" : "Add Strategy"}
            </Typography>
          </Box>
        </Grid>

        <Grid item align="center">
          <Box
            component="form"
            noValidate
            autoComplete="off"
            onSubmit={submitToBackend}
          >
            <Box>
              {trackIdLocked ? (
                <TextField
                  id="track-id"
                  type="text"
                  label="Track"
                  value={trackDetails.name}
                  disabled
                />
              ) : (
                // Add track dropdown alternative for dogami page!!!
                <></>
                // <Dropdown
                //   labelText="Track: "
                //   options={stratAddData.tracks}
                //   onChange={handleTrackChange}
                //   value={trackId}
                // />
              )}
            </Box>

            <Box>
              <FormControlLabel
                control={<Checkbox />}
                label="Keep strategy private?"
                value={isPrivate}
                onChange={(e) => setIsPrivate(e.target.value)}
              />
            </Box>

            <Box>
              <Dropdown
                labelText="First power: "
                options={stratAddData.powers}
                onChange={handlePowerOneChange}
                value={powerOne}
              />
              {/* <TextField
                id="track-id"
                type="number"
                label="First Power"
                value={powerOne}
                onChange={(e) => setPowerOne(e.target.value)}
              /> */}
            </Box>

            <Box>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={handleClose}
              >
                Close
              </Button>
            </Box>
          </Box>
        </Grid>

        {/* <DogamiSelector assignDogami_cbfn={assignDogami_cbfn} /> */}

        {/* {dogami && (
          <Grid item>
            <Grid container direction="column" spacing={2} alignItems="center">
              <Grid item>
                <DogamiDisplay dogami={dogami} />
              </Grid>
              <Grid item>
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  onClick={addDogamiToBackend}
                >
                  Add Dogami
                </Button>
              </Grid>
              <Grid item>
                {addDogamiMsg ? (
                  <Alert severity="error">{addDogamiMsg}</Alert>
                ) : (
                  <></>
                )}
              </Grid>
            </Grid>
          </Grid>
        )} */}
        {/* </Grid> */}
      </Stack>
    </Box>
  );
};

const DogamiSelector = (props) => {
  const [dogamiOfficialId, setDogamiOfficialId] = useState("1000");

  const selectDogami = async (event) => {
    event.preventDefault();

    // collect official dogami data from proxy api
    const response = await axiosDogamiUri(dogamiOfficialId);
    const dogamiProxyData = response.data[0];
    let dogamiObj = null;
    if (response.success) {
      // construct a Dogami class from the collected data
      dogamiObj = constructDogamiObject(dogamiProxyData);
    } else {
      setAddDogamiMsg(response.error);
    }

    // Separately get trusted img data from backend
    const dogamiImgData = await axiosBackendGet(
      `/dogami-images/${dogamiOfficialId}`
    ); // returns an array
    if (response.success) {
      // add img url to the constructed object
      const imgUrl = dogamiImgData.data.img_url;
      dogamiObj.img_url = imgUrl;
      props.assignDogami_cbfn(dogamiObj);
    } else {
      setAddDogamiMsg(response.error);
    }
  };

  return (
    <>
      <Grid item align="center">
        <Box
          component="form"
          noValidate
          autoComplete="off"
          onSubmit={selectDogami}
        ></Box>
        <Box>
          <TextField
            id="dogami-id"
            type="number"
            label="Dogami id"
            value={dogamiOfficialId}
            onChange={(e) => setDogamiOfficialId(e.target.value)}
          />
        </Box>
      </Grid>

      <Grid item>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={selectDogami}
        >
          Select
        </Button>
      </Grid>
    </>
  );
};

const Dropdown = ({ labelText, options, onChange, value }) => {
  return (
    <>
      <Select
        labelId="demo-simple-select-label"
        id="not-sure"
        value={value}
        label="Check" //{labelText}
        onChange={onChange}
      >
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
    </>
  );
};
