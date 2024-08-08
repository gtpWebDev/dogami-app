import { useState } from "react";

import DogamiDisplay from "../../composites/DogamiDisplay";

import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";

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
 * This form to be used in a modal
 */

export const DogamiAddForm = (props) => {
  const [dogami, setDogami] = useState(null);
  const [addDogamiMsg, setAddDogamiMsg] = useState(null);

  const assignDogami_cbfn = (dogamiDetails) => {
    setDogami(dogamiDetails);
  };

  const addDogamiToBackend = async () => {
    setAddDogamiMsg(null);
    const response = await axiosBackendPost(
      ADD_DOGAMI_URI,
      dogami,
      HEADER_JSON_CONFIG
    );
    if (response.success) {
      // trigger parent refresh to include the new dog
      props.updateTrigger_cbfn(new Date());
    } else {
      setAddDogamiMsg(response.error.message);
    }
  };

  return (
    <Box sx={style}>
      <Stack spacing={3}>
        {/* <Grid container direction="column" spacing={5}> */}
        <Grid item>
          <Box sx={{ borderBottom: "1px solid black" }}>
            <Typography variant="h5" align="center">
              Dogami selection
            </Typography>
          </Box>
        </Grid>

        <DogamiSelector assignDogami_cbfn={assignDogami_cbfn} />

        {dogami && (
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
                {/* <Typography color="error" sx={{ mt: 2 }}> */}
                {addDogamiMsg ? (
                  <Alert severity="error">{addDogamiMsg}</Alert>
                ) : (
                  <></>
                )}
                {/* </Typography> */}
              </Grid>
            </Grid>
          </Grid>
        )}
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
