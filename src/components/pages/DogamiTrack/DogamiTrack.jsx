import { useEffect, useState } from "react";
import { axiosBackendGet } from "../../../lib/axiosUtility";

import { Link, useParams } from "react-router-dom";

const DogamiTrack = () => {
  // route params
  const { dogamiId, trackId } = useParams();

  // custom hook
  const { data, error, loading } = useDogamiTrackData(dogamiId, trackId);

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
        <p>Dogami: {data.dogami.name}</p>
        <p>Track: {data.track.name}</p>

        <TrackStatsDisplay trackStatsData={data.dogamiTrackStrats} />
        <p>
          <Link to={`/dogami/${dogamiId}`}>Return to dogami</Link>
        </p>
        <p>
          <Link to="/dashboard">Return to dashboard</Link>
        </p>
      </div>
    </>
  );
};

const useDogamiTrackData = (dogamiId, trackId) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      try {
        const [dogami, track, strat] = await Promise.all([
          axiosBackendGet(`dogami/${dogamiId}`),
          axiosBackendGet(`track/${trackId}`),
          axiosBackendGet(`dogami/${dogamiId}/strats?track_id=${trackId}`),
        ]);
        setData({
          dogami: dogami.data,
          track: track.data,
          dogamiTrackStrats: strat.data,
        });
      } catch (error) {
        setError(error);
      }
      setLoading(false);
    };
    getData();
  }, []);

  return { data, error, loading };
};

const TrackStatsDisplay = (props) => {
  return props.trackStatsData.map((element) => (
    <div key={element._id}>
      Track: {element.track_id.name}&nbsp;&nbsp; Power 1: {element.power_1}
      &nbsp;&nbsp; Best Time: {element.strat_best_time}
    </div>
  ));
};

export default DogamiTrack;
