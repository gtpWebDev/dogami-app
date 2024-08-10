import { useState } from "react";

import useGetBackendData from "../../../hooks/useGetBackendData";

import AuthService from "../../../lib/AuthService";
import { Link } from "react-router-dom";

import DogamiDisplayArea from "./DogamiDisplayArea";

import DogamiFormModal from "../../composites/DogamiFormModal";

import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import { SectionHeader } from "../../styledComponents/typography";
import { StyledButton } from "../../styledComponents/buttons";

function Dashboard() {
  // trigger for the custom hook
  const [updateTrigger, setUpdateTrigger] = useState(new Date());
  const updateTrigger_cbfn = (timestamp) => setUpdateTrigger(timestamp);

  const { data, error, loading } = useGetBackendData(
    "/user/frontend-user-dashboard",
    updateTrigger
  );

  if (loading) return <p>Loading...</p>;
  if (error) return <UnauthorisedContent />;

  return (
    <AuthorisedContent
      backendData={data}
      updateTrigger_cbfn={updateTrigger_cbfn}
    />
  );
}

const AuthorisedContent = (props) => {
  const logout = () => {
    const authService = new AuthService();
    authService.logout();
  };

  return (
    <Grid container spacing={2} align="center">
      <Grid item xs={12}>
        <SectionHeader>Dashboard</SectionHeader>
      </Grid>

      <Grid item xs={12} pb={2}>
        <DogamiFormModal
          openButtonText="Add a Dogami"
          updateTrigger_cbfn={props.updateTrigger_cbfn}
        />
      </Grid>

      <Grid item xs={12}>
        <Paper elevation={5}>
          <Stack pb={3}>
            <Typography
              component="h4"
              variant="h4"
              color="primary.contrastText"
              sx={{ padding: "20px 0" }}
            >
              You own {props.backendData.owned_dogs.length} dogs
            </Typography>
            <DogamiDisplayArea
              dogData={props.backendData.owned_dogs}
              updateTrigger_cbfn={props.updateTrigger_cbfn}
            />
          </Stack>
        </Paper>
      </Grid>

      <Grid item xs={12}>
        <StyledButton onClick={logout} variant="contained">
          Logout
        </StyledButton>
      </Grid>
    </Grid>
  );
};

const UnauthorisedContent = () => {
  return (
    <>
      <h3>Dashboard</h3>
      <div>
        <p>You are not authorized!</p>
        <Link to="/login">Return to login</Link>
      </div>
    </>
  );
};

export default Dashboard;
