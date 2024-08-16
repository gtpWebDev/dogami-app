import { useState } from "react";
import { Link, useParams } from "react-router-dom";

import useGetBackendData from "../../../hooks/useGetBackendData";

import StrategyFormModal from "../../composites/StrategyFormModal";
import Loading from "../../composites/Loading";

import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

import { SectionHeader } from "../../styledComponents/typography";

import BestStrategiesDisplay from "./BestStrategiesDisplay";

const Dogami = () => {
  const { dogamiId } = useParams();

  // trigger for the custom hook
  const [updateTrigger, setUpdateTrigger] = useState(new Date());
  const updateTrigger_cbfn = (timestamp) => setUpdateTrigger(timestamp);

  /**
   * Custom hook returning:
   * data: {
   *   dogami: dogami,
   *   dogStrats: allDogStratsForDogami,
   * }
   */

  const { data, error, loading } = useGetBackendData(
    `/dogamis/${dogamiId}/frontend-dogami-page`,
    updateTrigger
  );

  if (loading) return <Loading />;

  if (error) {
    return (
      <>
        <h3>Dogami</h3>
        <div>
          <p>You do not have the permissions to view this dog!</p>
          <p>
            <Link to="/dashboard">Return to dashboard</Link>
          </p>
        </div>
      </>
    );
  }

  return (
    <Grid container spacing={2} align="center">
      <Grid item xs={12}>
        <SectionHeader>{data.dogami.name}</SectionHeader>
      </Grid>

      {/* Add strategy button with modal */}
      <Grid item xs={12} pb={2}>
        <StrategyFormModal
          openButtonText="Add a Strategy"
          dogamiId={dogamiId}
          stratDetails={null}
          trackDetails={null}
          updateTrigger_cbfn={updateTrigger_cbfn}
          isUpdate={false}
          trackIdLocked={false}
        />
      </Grid>

      <Grid item xs={12}>
        {/* Container for display of best strategy by track, with filters */}
        <BestStrategiesDisplay dogamiId={dogamiId} strats={data.dogStrats} />
      </Grid>
    </Grid>
  );
};

export default Dogami;
