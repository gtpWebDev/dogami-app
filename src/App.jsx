// import "./App.css";

import { useEffect, useState } from "react";

import { Outlet } from "react-router-dom";

import ScrollToTop from "./scrollToTop";

import TitleBar from "./components/layouts/TitleBar";
import NavBar from "./components/layouts/NavBar";
import Footer from "./components/layouts/Footer";

import { Navigate } from "react-router-dom";

// Material UI imports
import { Container, Typography, AppBar, Grid, Box } from "@mui/material";

function App() {
  // Manage username, which controls navbar profile menu - is not used for authorisation
  const [currentUser, setCurrentUser] = useState(null);

  const handleChangeCurrentUser = (user) => {
    console.log(`Current user changed to ${user}`);
    setCurrentUser(user);
  };

  useEffect(() => {
    // collect username from local storage, if it exists
    const username = localStorage.getItem("username") || "";
    handleChangeCurrentUser(username);
  }, []);

  return (
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
  );
}

const MainArea = ({ currentUser, handleChangeCurrentUser }) => {
  // Container centres content for all routes, widest possible
  return (
    <Container maxWidth="xl">
      {/* If not logged in, navigate to home page */}
      {!currentUser && <Navigate to={`/`} replace={false} />}
      {currentUser && <Navigate to={`/Dashboard`} replace={false} />}
      <main>
        <Box pb={6}>
          <Outlet context={[currentUser, handleChangeCurrentUser]} />
        </Box>
      </main>
    </Container>
  );
};

export default App;
