import Grid from "@mui/material/Grid";

import DogamiDisplay from "../../composites/DogamiDisplay";
import DeleteDogamiModal from "../../composites/DeleteDogamiModal";

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
  {
    /* Delete button doesn't delete, opens modal to confirm */
  }
  return (
    <DeleteDogamiModal
      openButtonText="Delete"
      dogamiId={props.dogamiId}
      updateTrigger_cbfn={props.updateTrigger_cbfn}
    />
  );
};

export default DogamiDisplayArea;
