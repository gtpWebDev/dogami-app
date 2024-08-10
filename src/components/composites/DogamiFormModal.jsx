import { useState } from "react";

import DogamiDisplay from "./DogamiDisplay";

import Modal from "@mui/material/Modal";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";

import { GridItemsCentred } from "../styledComponents/grid";
import { ContainedSecondaryButton } from "../styledComponents/buttons";

import {
  ADD_DOGAMI_URI,
  HEADER_JSON_CONFIG,
} from "../../constants/backendRequests";

import { axiosDogamiUri } from "../../lib/axiosRequests/axiosDogamiEndpoints";
import {
  axiosBackendPost,
  axiosBackendGet,
} from "../../lib/axiosRequests/axiosBackendEndpoints";

import { constructDogamiObject } from "../../lib/dogamiData";

const modalStyle = {
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
 * - Adding an existing dogami to user
 *
 * (user provided through JWT)
 *
 * Props:
 * - openButtonText - e.g. "Add a Dogami"
 * - updateTrigger_cbfn
 */

export default function DogamiFormModal(props) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <ContainedSecondaryButton
        label={props.openButtonText}
        onClick={handleOpen}
      />
      <Modal open={open} onClose={handleClose}>
        {/* Material UI modal requires a pure Material UI child */}
        <Box>
          <DogamiFormContent handleClose={handleClose} {...props} />
        </Box>
      </Modal>
    </div>
  );
}

export const DogamiFormContent = (props) => {
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
    <Box sx={modalStyle}>
      <GridItemsCentred container direction="column" align="center">
        <Grid item pb={3}>
          <ModalTitle isUpdate={props.isUpdate} />
        </Grid>

        {/* First part of form - select dogami */}
        <DogamiSelector
          handleClose={props.handleClose}
          assignDogami_cbfn={assignDogami_cbfn}
        />

        {/* Second part of form - add the selected dogami */}
        {dogami && (
          <Grid item>
            <Grid container direction="column" spacing={2} alignItems="center">
              <Grid item>
                <DogamiDisplay dogami={dogami} />
              </Grid>
              <Grid item>
                <ContainedSecondaryButton
                  label="Add Dogami"
                  onClick={addDogamiToBackend}
                />
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
        )}
      </GridItemsCentred>
      {/* </Stack> */}
    </Box>
  );
};

const DogamiSelector = (props) => {
  const [dogamiOfficialId, setDogamiOfficialId] = useState("1000");

  const selectDogami = async (event) => {
    event.preventDefault();

    // collect dogami data from dogami proxy api
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

  const handleDogamiOfficialIdChange = (event) =>
    setDogamiOfficialId(event.target.value);

  return (
    <>
      <Grid item align="center" pb={3}>
        <Box
          component="form"
          noValidate
          autoComplete="off"
          onSubmit={selectDogami}
        >
          <Box pb={2}>
            <DogamiIdInput
              dogamiOfficialId={dogamiOfficialId}
              onChange={handleDogamiOfficialIdChange}
            />
          </Box>

          <GridItemsCentred container spacing={2}>
            <Grid item>
              <ContainedSecondaryButton label="Select" onClick={selectDogami} />
            </Grid>
            <Grid item>
              <ContainedSecondaryButton
                label="Close"
                onClick={props.handleClose}
              />
            </Grid>
          </GridItemsCentred>
        </Box>
      </Grid>
    </>
  );
};

const DogamiIdInput = (props) => {
  return (
    <TextField
      type="number"
      label="Dogami id"
      value={props.dogamiOfficialId}
      onChange={(e) => setDogamiOfficialId(e.target.value)}
    />
  );
};

const ModalTitle = () => {
  return (
    <Grid item>
      <Box sx={{ borderBottom: "1px solid black" }}>
        <Typography variant="h5" align="center">
          Dogami selection
        </Typography>
      </Box>
    </Grid>
  );
};
