import App from "./App";
import HomePage from "./components/pages/HomePage/HomePage";
import Register from "./components/pages/Register/Register";
import Login from "./components/pages/Login/Login";
import Dashboard from "./components/pages/Dashboard/Dashboard";
import Dogami from "./components/pages/Dogami/Dogami";
import DogamiTrack from "./components/pages/DogamiTrack/DogamiTrack";
import ErrorPage from "./components/pages/ErrorPage/ErrorPage";
import Unauthorised from "./components/pages/Unauthorised/Unauthorised";

/**
 * Navigation strategy:
 *
 * Logic stage 0. Netlify _redirects any domain server request to index.html.
 * Logic stage 1. React-router-app loaded in main.jsx, applying router logic - including invalid addresses to errorpage
 * Logic stage 2. App level currentUser state variable.
 *  2a - Populated with valid JWT on first load.
 *  2b - App level - updated to null, navigate to Homepage
 *  2c - Locally on Homepage, Login page and register page - updated to not null, navigate to dashboard
 * Logic stage 3. Backend request for page gives an unauthorised error - navigate to unauthorised (should be edge case)

 * Action: Valid user navigates to / refreshes on valid page - Logic 0 directs to App. Logic 1 routes to requested page. ACCESS REQUESTED PAGE
 * Action: Non-user navigates to / refreshes on valid page - Logic 0 directs to App. Logic 1 applies routing logic to requested page. Logic 2b NAVIGATES TO HOMEPAGE
 * Action: Valid user navigates to invalid page - Logic 0 directs to Application. Logic 1 applies routing logic to errorpage. NAVIGATE TO ERRORPAGE
 * Action: Non-user navigates to invalid page - Logic 0 directs to Application. Logic 1 applies routing logic to errorpage. NAVIGATE TO ERRORPAGE
 * Action: Valid user logs out within application. currentUser set to null. Logic 2b navigates to Homepage
 * Action: Log-in on login page. currentUser set to username. Logic 2c navigates to dashboard
 * Action: Registration on registration page. currentUser set to username. Logic 2c navigates to dashboard
 * Action: Valid user clicks on client side react router link. Logic 1 routes to requested page. ACCESS REQUESTED PAGE
 * Action: Valid user navigates to valid app page, but user not authorised. Logic 0 directs to Application. Logic 1 routes to requested page. Logic 3 navigates to unauthorised. NAVIGATE TO UNAUTHORISED
 */

// create the configuration for the router
const routes = [
  {
    // Holds the main page structure - header, sidebar, footer, etc.
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      // renders when there are no children
      { index: true, element: <HomePage /> },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/dogami/:dogamiId",
        element: <Dogami />,
      },
      {
        path: "/dogami/:dogamiId/track/:trackId",
        element: <DogamiTrack />,
      },
      {
        path: "/unauthorised",
        element: <Unauthorised />,
      },
    ],
  },
];

export default routes;
