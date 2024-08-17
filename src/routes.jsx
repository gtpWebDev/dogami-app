import App from "./App";
import HomePage from "./components/pages/HomePage/HomePage";
import Register from "./components/pages/Register/Register";
import Login from "./components/pages/Login/Login";
import Dashboard from "./components/pages/Dashboard/Dashboard";
import Dogami from "./components/pages/Dogami/Dogami";
import DogamiTrack from "./components/pages/DogamiTrack/DogamiTrack";
import ErrorPage from "./components/pages/ErrorPage/ErrorPage";

/**
 * Navigation strategy:
 *
 * Logic 0. Netlify _redirects any domain server request to index.html.
 * Logic 1. React-router-app loaded in main.jsx, applying router logic - including invalid addresses to errorpage
 * Logic 2. Populate currentUser on app load (navigate or refresh) if valid JWT exists.
 * Logic 3. Navigation rule applied at app level above router outlet (activates on updates) - state variable updated to null, navigate to Homepage
 * Logic 4. Local navigate rule on Homepage, Login page & Register page (activates on updates). State variable currentUser updated to !null, navigate to Dashboard
 *
 * Action: authorised user navigates to / refreshes on valid page - Logic 0 directs to App. Logic 1 applies routing logic to homepage. Logic 2 populates currentUser. Logic 4 NAVIGATE TO DASHBOARD
 * Action: unauthorised user navigates to / refreshes on valid page - Logic 0 directs to App. Logic 1 applies routing logic to homepage. Logic 2 gives no currentUser. Logic 3 NAVIGATE TO HOMEPAGE
 * Action: authorised user navigates to invalid page - Logic 0 directs to Application. Logic 1 applies routing logic to errorpage.
 * Action: unauthorised user navigates to invalid page - Logic 0 directs to Application. Logic 1 applies routing logic to errorpage.
 * Action: user logs out within application. currentUser set to null. Logic 3 navigates to Homepage
 * Action: User logs in on login page. currentUser set to username. Logic 4 navigates to dashboard
 * Action: User registers on registration page. currentUser set to username. Logic 4 navigates to dashboard
 * Action: User clicks on client side react router link. In app react-router logic applies
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
    ],
  },
];

export default routes;
