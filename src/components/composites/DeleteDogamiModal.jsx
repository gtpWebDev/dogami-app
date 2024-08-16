import { useState } from "react";

import Modal from "@mui/material/Modal";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Alert from "@mui/material/Alert";

import {
  BACKEND_URI,
  HEADER_JSON_CONFIG,
} from "../../constants/backendRequests";

import { axiosBackendDelete } from "../../lib/axiosRequests/axiosBackendEndpoints";

import { GridItemsCentred } from "../styledComponents/grid";

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
 * Modal to confirm or cancel dogami deletion
 *
 * Props:
 * - openButtonText - e.g. "Add a Strategy"
 * - dogamiId - database _id
 * - updateTrigger_cbfn - triggers page update
 */

export default function DeleteDogamiModal(props) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      {/* Button to open modal */}
      <Button variant="contained" color="secondary" onClick={handleOpen}>
        {props.openButtonText}
      </Button>
      <Modal open={open} onClose={handleClose}>
        {/* Material UI modal requires a pure Material UI child */}
        <Box>
          <DeleteDogamiFormContent handleClose={handleClose} {...props} />
        </Box>
      </Modal>
    </div>
  );
}

export const DeleteDogamiFormContent = (props) => {
  // Manage issues message
  const [deleteDogamiMsg, setDeleteDogamiMsg] = useState(null);
  const updateDeleteDogamiMsg = (msg) => setDeleteDogamiMsg(msg);

  return (
    <Box sx={style}>
      <GridItemsCentred container direction="column" align="center">
        <Grid item pb={3}>
          <Box sx={{ borderBottom: "1px solid black" }}>
            <Typography variant="h5" align="center">
              Delete Dogami?
            </Typography>
          </Box>
        </Grid>

        <Grid item>
          <GridItemsCentred container spacing={2}>
            <Grid item>
              <CancelButton onClick={props.handleClose} />
            </Grid>
            <Grid item>
              <ConfirmDeleteButton
                dogamiId={props.dogamiId}
                updateDeleteDogamiMsg={updateDeleteDogamiMsg}
                updateTrigger_cbfn={props.updateTrigger_cbfn}
              />
            </Grid>
          </GridItemsCentred>
        </Grid>
        {deleteDogamiMsg ? (
          <Grid item pt={3}>
            <Alert severity="error">{deleteDogamiMsg}</Alert>
          </Grid>
        ) : (
          <></>
        )}
      </GridItemsCentred>
    </Box>
  );
};

const CancelButton = (props) => {
  return (
    <Button variant="contained" color="secondary" onClick={props.onClick}>
      Cancel
    </Button>
  );
};

const ConfirmDeleteButton = (props) => {
  const handleDelete = async () => {
    props.updateDeleteDogamiMsg(null);
    const deleteUri = `${BACKEND_URI}/dogamis/${props.dogamiId}`;
    const response = await axiosBackendDelete(deleteUri, HEADER_JSON_CONFIG);
    if (response.success) {
      // trigger page refresh
      props.updateTrigger_cbfn(new Date());
    } else {
      props.updateDeleteDogamiMsg(response.error.message);
    }
  };

  return (
    <>
      <Button variant="contained" color="secondary" onClick={handleDelete}>
        Confirm
      </Button>
    </>
  );
};
