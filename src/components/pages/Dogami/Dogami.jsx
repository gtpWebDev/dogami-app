import useGetBackendData from "../../../hooks/useGetBackendData";

import { Link, useParams } from "react-router-dom";

const Dogami = () => {
  // params not needed as JWT _id used
  const { dogamiId } = useParams();

  // custom hook
  const { data, error, loading } = useGetBackendData(
    `/dogamis/${dogamiId}/frontend-dogami-page`
  );

  if (loading) return <p>Loading...</p>;

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
    <>
      <h3>Dogami: {data.dogami.name}</h3>
      <div>
        <p>You are authorized!</p>
        <p>Dogami: {data.dogami.name}</p>

        <DogStratsDisplay dogStatsData={data.dogStrats} />
        <Link to="/dashboard">Return to dashboard</Link>
      </div>
    </>
  );
};

const DogStratsDisplay = (props) => {
  return props.dogStatsData.map((element) => (
    <div key={element._id}>
      {element.track_id._id}&nbsp;&nbsp;
      <Link to={`track/${element.track_id._id}`}>{element.track_id.name}</Link>
      &nbsp;&nbsp; Power 1: {element.power_1}
      &nbsp;&nbsp; Best Time: {element.strat_best_time}
    </div>
  ));
};

export default Dogami;
