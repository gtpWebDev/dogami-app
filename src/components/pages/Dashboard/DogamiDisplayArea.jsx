import { useState, useEffect } from "react";

import { Link } from "react-router-dom";

import { axiosBackendDelete } from "../../../lib/axiosRequests/axiosBackendEndpoints";

import {
  BACKEND_URI,
  HEADER_JSON_CONFIG,
} from "../../../constants/backendRequests";

import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";

const DogamiDisplayArea = (props) => {
  return (
    <Grid
      container
      spacing={4}
      justifyContent="center"
      sx={{ padding: "10px" }}
    >
      {props.dogData.map((element) => (
        <Grid item key={element._id} xs={12} sm={6} md={3} lg={2}>
          <DogamiDisplay
            dogami={element}
            updateTrigger_cbfn={props.updateTrigger_cbfn}
          />
        </Grid>
      ))}
    </Grid>
  );
};

const DogamiDisplay = ({ dogami, updateTrigger_cbfn }) => {
  return (
    <Paper
      elevation={5}
      sx={{ backgroundColor: "secondary.main", padding: "15px 0" }}
    >
      <Grid container direction="column" spacing={1}>
        <Grid item>
          <Link underline="none" to={`/dogami/${dogami._id}`}>
            {dogami.name} ({dogami.dogami_official_id})
          </Link>
        </Grid>
        <Grid item>
          <DogImage url={dogami.img_url} />
        </Grid>
        <Grid item>
          <DeleteDogButton
            dogamiId={dogami._id}
            updateTrigger_cbfn={updateTrigger_cbfn}
          />
        </Grid>
      </Grid>
    </Paper>
  );
};

const DogImage = (props) => {
  return (
    <>{<img src={`${props.url}?w=200&auto=format`} alt="" width={200} />}</>
  );
};

const DeleteDogButton = (props) => {
  const [errorMsg, setErrorMsg] = useState(null);

  // should add modulars - "are you sure"? and "deletion error"
  const handleDelete = async () => {
    const deleteUri = `${BACKEND_URI}/dogamis/${props.dogamiId}`;
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
      <Button variant="outlined" onClick={handleDelete}>
        Delete
      </Button>
      {errorMsg ? <p>{errorMsg}</p> : <></>}
    </>
  );
};

export default DogamiDisplayArea;
