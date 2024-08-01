import { useState, useEffect } from "react";

import useGetBackendData from "../../../hooks/useGetBackendData";

import AuthService from "../../../lib/AuthService";
import { Link } from "react-router-dom";

import DogamiDisplayArea from "./DogamiDisplayArea";
import DogamiAddForm from "./DogamiAddForm";
import AccountAddForm from "./AccountAddForm";

import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

const Dashboard = () => {
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
};

const AuthorisedContent = (props) => {
  const logout = () => {
    const authService = new AuthService();
    authService.logout();
  };

  return (
    <Grid container spacing={2} align="center">
      <Grid item xs={12}>
        <Typography
          component="h3"
          variant="h3"
          fontSize={{ xs: "40px", sm: "50px" }}
          sx={{
            color: "primary.main",
            fontWeight: "bold",
            margin: "10px",
            padding: "15px 0",
          }}
        >
          Dashboard
        </Typography>
      </Grid>

      <Grid item xs={12}>
        <Paper elevation={5}>
          <Typography component="h4" variant="h4" sx={{ padding: "20px 0" }}>
            You own {props.backendData.owned_dogs.length} dogs
          </Typography>

          <DogamiDisplayArea
            dogData={props.backendData.owned_dogs}
            updateTrigger_cbfn={props.updateTrigger_cbfn}
          />
        </Paper>
      </Grid>

      <Grid item xs={12}>
        <DogamiAddForm updateTrigger_cbfn={props.updateTrigger_cbfn} />
      </Grid>

      <Grid item xs={12}>
        <AccountAddForm updateTrigger_cbfn={props.updateTrigger_cbfn} />
      </Grid>
      <p>
        <button onClick={logout}>logout</button>
      </p>
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
