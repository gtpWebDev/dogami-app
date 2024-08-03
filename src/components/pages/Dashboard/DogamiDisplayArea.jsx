import { useState } from "react";

import DogamiDisplay from "../../composites/DogamiDisplay";

import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";

import {
  BACKEND_URI,
  HEADER_JSON_CONFIG,
} from "../../../constants/backendRequests";

import { axiosBackendDelete } from "../../../lib/axiosRequests/axiosBackendEndpoints";

const DogamiDisplayArea = (props) => {
  return (
    <Grid
      container
      spacing={4}
      justifyContent="center"
      sx={{ padding: "10px" }}
    >
      {props.dogData.map((element) => (
        <Grid item key={element._id}>
          <DogamiDisplay dogami={element}>
            <DeleteDogButton
              dogamiId={element._id}
              updateTrigger_cbfn={props.updateTrigger_cbfn}
            />
          </DogamiDisplay>
        </Grid>
      ))}
    </Grid>
  );
};

const DeleteDogButton = (props) => {
  const [errorMsg, setErrorMsg] = useState(null);

  // should add modulars to check "are you sure"
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
      <Button variant="contained" color="secondary" onClick={handleDelete}>
        Delete
      </Button>
      {errorMsg ? <p>{errorMsg}</p> : <></>}
    </>
  );
};

export default DogamiDisplayArea;
