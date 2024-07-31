import { useState, useEffect } from "react";

import useGetBackendData from "../../../hooks/useGetBackendData";

import AuthService from "../../../lib/AuthService";
import { Link } from "react-router-dom";

import DogamiDisplay from "./DogamiDisplay";
import DogamiAddForm from "./DogamiAddForm";
import AccountAddForm from "./AccountAddForm";

const Dashboard = () => {
  // trigger for the custom hook
  const [updateTrigger, setUpdateTrigger] = useState(new Date());
  const updateTrigger_cbfn = (timestamp) => setUpdateTrigger(timestamp);

  // custom hook, triggered on addition of new dogs
  const { data, error, loading } = useGetBackendData(
    "/user/frontend-user-dashboard",
    updateTrigger
  );

  if (loading) return <p>Loading...</p>;
  if (error) return <NotAuthorised />;

  return <Authorised data={data} updateTrigger_cbfn={updateTrigger_cbfn} />;
};

const Authorised = (props) => {
  const logout = () => {
    const authService = new AuthService();
    authService.logout();
  };

  return (
    <>
      <h3>Dashboard</h3>
      <div>
        <p>You are authorized!</p>
        <p>Username: {props.data.username}</p>
        <p>User owns {props.data.owned_dogs.length} dogs</p>
        <DogamiDisplay
          dogData={props.data.owned_dogs}
          updateTrigger_cbfn={props.updateTrigger_cbfn}
        />
        <DogamiAddForm updateTrigger_cbfn={props.updateTrigger_cbfn} />
        <AccountAddForm updateTrigger_cbfn={props.updateTrigger_cbfn} />
        <p>
          <button onClick={logout}>logout</button>
        </p>
      </div>
    </>
  );
};

const NotAuthorised = () => {
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
