// import "./App.css";

import { useEffect, useState } from "react";

import { Outlet } from "react-router-dom";

import ScrollToTop from "./scrollToTop";

import TitleBar from "./components/layouts/TitleBar";
import NavBar from "./components/layouts/NavBar";
import Footer from "./components/layouts/Footer";

import { CURRENT_USER_URI } from "./constants/backendRequests";
import { axiosBackendGet } from "./lib/axiosRequests/axiosBackendEndpoints";

import { Navigate } from "react-router-dom";

import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

function App() {
  // currentUser controls a significant amount of the navigation logic
  // and is used in the navbar for UX
  const [currentUser, setCurrentUser] = useState(null);
  const [gotUser, setGotUser] = useState(false);
  const handleChangeCurrentUser = (user) => setCurrentUser(user);

  useEffect(() => {
    // collect username on first nav to app or refresh
    const requestUsername = async () => {
      const response = await axiosBackendGet(CURRENT_USER_URI);
      if (response.success) setCurrentUser(response.data);
      setGotUser(true);
    };
    requestUsername();
  }, []);

  return (
    gotUser && (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
        }}
      >
        <ScrollToTop />
        {/* Container uses full height, pushes footer to end of page*/}
        <Container maxWidth="xl" sx={{ flexGrow: 1, py: 3 }}>
          <Grid container direction="column">
            {/* Fancy title bar, no function, scrolls off */}
            <TitleBar />

            {/* Functional application bar */}
            <NavBar
              currentUser={currentUser}
              handleChangeCurrentUser={handleChangeCurrentUser}
            />

            <MainArea
              currentUser={currentUser}
              handleChangeCurrentUser={handleChangeCurrentUser}
            />
          </Grid>
        </Container>

        <Footer />
      </Box>
    )
  );
}

const MainArea = ({ currentUser, handleChangeCurrentUser }) => {
  // Container centres content for all routes, widest possible
  return (
    <Container maxWidth="xl">
      {/* Navigation logic here applies on first load, including page refreshes */}
      {/* _redirects file rule applies then this logic */}
      {!currentUser && <Navigate to={`/`} replace={false} />}
      <main>
        <Box pb={6}>
          <Outlet context={[currentUser, handleChangeCurrentUser]} />
        </Box>
      </main>
    </Container>
  );
};

export default App;
