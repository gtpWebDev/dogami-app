import App from "./App";
import HomePage from "./components/pages/HomePage/HomePage";
import Register from "./components/pages/Register/Register";
import Login from "./components/pages/Login/Login";
import Dashboard from "./components/pages/Dashboard/Dashboard";
import Dogami from "./components/pages/Dogami/Dogami";
import DogamiTrack from "./components/pages/DogamiTrack/DogamiTrack";
import ErrorPage from "./components/pages/ErrorPage/ErrorPage";

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
