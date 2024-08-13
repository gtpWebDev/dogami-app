// import "./App.css";

import { Outlet, Link } from "react-router-dom";

import ScrollToTop from "./scrollToTop";

import TitleBar from "./components/layouts/TitleBar";
import NavBar from "./components/layouts/NavBar";

// Material UI imports
import { Container, Typography, AppBar, Grid, Box } from "@mui/material";

function App() {
  return (
    <>
      <ScrollToTop />
      <Container maxWidth="xl" disableGutters={true}>
        <Grid container direction="column">
          {/* Fancy title bar, no function, scrolls off */}
          <TitleBar />

          {/* Functional application bar */}
          <NavBar />

          <Sidebar />

          <MainArea />

          <Footer />
        </Grid>
      </Container>
    </>
  );
}

/**
 * Title bar which scrolls off the screen
 * Note, this is above the app bar that provides links and functionality
 */

const MainArea = () => {
  // Container centres content for all routes, widest possible
  return (
    <Container maxWidth="xl">
      <main>
        <Outlet />
      </main>
    </Container>
  );
};

const Sidebar = () => {
  <aside>hello{/* Empty currently */}</aside>;
};

const Footer = () => {
  return (
    <footer>
      <hr />
      <h2>Footer</h2>
    </footer>
  );
};

export default App;
