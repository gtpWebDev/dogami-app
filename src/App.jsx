import "./App.css";

import PropTypes from "prop-types";

import { Outlet, Link } from "react-router-dom";

import ScrollToTop from "./scrollToTop";

/**
 *
 * Front-end to do list:
 * - Review and implement useContext where sensible.
 * - Implement a structure for managing the logged in user:
 *    - reflecting the logged in user in the nav bar
 *    - probably creating a factory for a combined user and localStorage?
 */

function App() {
  return (
    <>
      <ScrollToTop />
      <TitleBar />
      <NavBar />
      <Sidebar />
      <main>
        <h2>Main Content</h2>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

const TitleBar = () => {
  return (
    <header>
      <h1>Title Bar</h1>
      <hr />
    </header>
  );
};

const NavBar = () => {
  return (
    <nav>
      <h2>Nav Bar</h2>
      <Link to="/">Return to home</Link>
      <hr />
    </nav>
  );
};

const Sidebar = () => {
  <aside>{/* Empty currently */}</aside>;
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
