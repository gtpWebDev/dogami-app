import useDogamiTrackData from "../../../hooks/useDogamiTrackData";

import { useState } from "react";

import DogamiStratAddForm from "../../composites/StrategyAddForm";

import TrackStatsDisplay from "./StratDisplay";

import { Link, useParams } from "react-router-dom";

const DogamiTrack = () => {
  // route params
  const { dogamiId, trackId } = useParams();

  // trigger for the custom hook
  const [updateTrigger, setUpdateTrigger] = useState(new Date());
  const updateTrigger_cbfn = (timestamp) => setUpdateTrigger(timestamp);

  // custom hook
  const { trackData, error, loading } = useDogamiTrackData(
    dogamiId,
    trackId,
    updateTrigger
  );

  if (loading) return <p>Loading...</p>;

  if (error) {
    return (
      <>
        <h3>Dogami</h3>
        <div>
          <p>
            You do not have the permissions to view this dog's track strategies!
          </p>
          <p>
            <Link to="/login">Return to login</Link>
          </p>
          <p>
            <Link to="/dashboard">Return to dashboard</Link>
          </p>
        </div>
      </>
    );
  }

  return (
    <>
      <h3>Dogami Track Strategies</h3>
      <div>
        <p>You are authorized!</p>
        <p>Dogami: {trackData.dogami.name}</p>
        <p>Track: {trackData.track.name}</p>

        <h4>Tried Strategies</h4>
        <TrackStatsDisplay
          dogamiStrats={trackData.dogamiStrats}
          updateTrigger_cbfn={updateTrigger_cbfn}
          dogamiId={dogamiId}
        />
        <p>
          <Link to={`/dogami/${dogamiId}`}>Return to dogami</Link>
        </p>
        <p>
          <Link to="/dashboard">Return to dashboard</Link>
        </p>
        {trackData && (
          <DogamiStratAddForm
            dogamiId={dogamiId}
            isTrackUserProvided={false}
            trackId={trackId}
            trackData={trackData}
            updateTrigger_cbfn={updateTrigger_cbfn}
          />
        )}
      </div>
    </>
  );
};

export default DogamiTrack;
