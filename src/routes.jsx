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
 * Logic 0a. DONE. Netlify _redirects any domain server request to index.html. DONE
 * Logic 0b. DONE. React-router-app loaded in main.jsx, applying router logic. DONE
 * Logic 1. DONE. Client side requests to invalid route are routed to errorPage. DONE
 * Logic 2. DONE. First load of app (navigated or refreshed), collect username from server if JWT exists, populating currentUser app level state variable
 * Logic 3. DONE. App level navigation rule at any point - if no currentUser, navigate to Homepage
 * Logic 4. DONE. Login page. If currentUser not null, navigate to dashboard
 * Logic 5. DONE. Register page. If currentUser not null, navigate to dashboard
 * Logic 5. DONE. Homepage. If currentUser not null, navigate to dashboard
 *
 * Action: unauthorised user navigates to / refreshes on valid page - Logic 0 directs to Application. Logic 2 gives no currentUser. Logic 3 navigates to homepage
 * Action: authorised user navigates to / refreshes on valid page - Logic 0 directs to Application. Logic 2 populates username in currentUser. No redirect, consume client-side route
 * Action: authorised user navigates to invalid page - Logic 0 directs to Application. Logic 1 navigates to errorPage
 * Action: unauthorised user navigates to invalid page - Logic 0 directs to Application. Logic 1 navigates to errorPage
 * Action: user logs out within application. currentUser set to null. Logic 3 navigates to Homepage
 * Action: User logs in on login page. currentUser set to username. Logic 4 navigates to dashboard
 * Action: User registers on registration page. currentUser set to username. Logic 4 navigates to dashboard
 * Action: User clicks on client side react router link. In app react-router logic applies
 *
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
