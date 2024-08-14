import { useState } from "react";
import { useOutletContext } from "react-router-dom";

import { axiosBackendPost } from "../../../lib/axiosRequests/axiosBackendEndpoints";
import AuthService from "../../../lib/AuthService";

import { StyledButton } from "../../styledComponents/buttons";

import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";

import { WhiteTextField } from "../../styledComponents/inputs";
import { SectionHeader } from "../../styledComponents/typography";
import CustomPaper from "../../styledComponents/paper";
import { CompositeLink } from "../../styledComponents/links";

import {
  REGISTER_URI,
  HEADER_JSON_CONFIG,
} from "../../../constants/backendRequests";
import { Navigate } from "react-router-dom";

const Register = () => {
  // Outlet context from react-router-app
  const [currentUser, handleChangeCurrentUser] = useOutletContext();

  return (
    <Container maxWidth="xs">
      {/* User available after successful login, redirect to dashboard */}
      {currentUser && <Navigate to={`/dashboard`} replace={false} />}

      <Grid container spacing={2} align="center">
        <Grid item xs={12} mt={2}>
          <SectionHeader>Registration</SectionHeader>
        </Grid>

        <Grid item xs={12}>
          <RegisterForm handleChangeCurrentUser={handleChangeCurrentUser} />
        </Grid>

        <Grid item xs={12} mb={5}>
          <CompositeLink linkLoc="/">Return to Home Page</CompositeLink>
        </Grid>
      </Grid>
    </Container>
  );
};

const RegisterForm = ({ handleChangeCurrentUser }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [registerMsg, setRegisterMsg] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const body = { username, password };
    const response = await axiosBackendPost(
      REGISTER_URI,
      body,
      HEADER_JSON_CONFIG
    );
    if (response.success) {
      const credentials = response.data;
      // store credentials in local storage and update current user
      const authService = new AuthService(username);
      authService.setLocalStorage(credentials);
      handleChangeCurrentUser(credentials.user.username);
    } else {
      setRegisterMsg(response.error.message);
    }
  };

  return (
    <Box
      p={1}
      pb={5}
      component="form"
      noValidate
      autoComplete="off"
      onSubmit={handleSubmit}
    >
      <CustomPaper>
        <Box pt={4} pb={2}>
          <WhiteTextField
            id="username-input"
            type="text"
            label="Username"
            value={username}
            onChangeFn={(e) => setUsername(e.target.value)}
          />
        </Box>

        <Box pb={4}>
          <WhiteTextField
            id="password-input"
            type="password"
            label="Password"
            value={password}
            onChangeFn={(e) => setPassword(e.target.value)}
          />
        </Box>

        <Box pb={4}>
          <StyledButton
            sx={{ backgroundColor: "secondary.main" }}
            type="submit"
            variant="contained"
          >
            Submit
          </StyledButton>
        </Box>

        {/* Message for login issues */}
        {registerMsg ? (
          <Box pb={4}>
            <Alert severity="error">{registerMsg}</Alert>
          </Box>
        ) : (
          <></>
        )}
      </CustomPaper>
    </Box>
  );
};

export default Register;
