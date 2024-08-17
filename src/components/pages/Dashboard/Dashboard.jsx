import { useState } from "react";

import useGetBackendData from "../../../hooks/useGetBackendData";

import { Link } from "react-router-dom";

import DogamiDisplayArea from "./DogamiDisplayArea";
import DogamiFormModal from "../../composites/DogamiFormModal";

import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import { SectionHeader } from "../../styledComponents/typography";
import { TransparentPaper } from "../../styledComponents/paper";

import Loading from "../../composites/Loading";

function Dashboard() {
  // trigger for the custom hook
  const [updateTrigger, setUpdateTrigger] = useState(new Date());
  const updateTrigger_cbfn = (timestamp) => setUpdateTrigger(timestamp);

  const { data, error, loading } = useGetBackendData(
    "/user/frontend-user-dashboard",
    updateTrigger
  );

  if (loading) return <Loading />;

  // Not authorised. Would like a tidier solution, but this does work
  if (error) return <Navigate to={`/unauthorised`} replace={false} />;

  return (
    <Grid container spacing={2} align="center">
      <Grid item xs={12}>
        <SectionHeader>Dashboard</SectionHeader>
      </Grid>

      <Grid item xs={12} pb={2}>
        <DogamiFormModal
          openButtonText="Add a Dogami"
          updateTrigger_cbfn={updateTrigger_cbfn}
        />
      </Grid>

      <Grid item xs={12}>
        <TransparentPaper elevation={5}>
          <Stack pb={3}>
            <Typography
              component="h4"
              variant="h4"
              color="primary.contrastText"
              sx={{ padding: "20px 0" }}
            >
              You own {data.owned_dogs.length} dogs
            </Typography>
            <DogamiDisplayArea
              dogData={data.owned_dogs}
              updateTrigger_cbfn={updateTrigger_cbfn}
            />
          </Stack>
        </TransparentPaper>
      </Grid>
    </Grid>
  );
}

export default Dashboard;
