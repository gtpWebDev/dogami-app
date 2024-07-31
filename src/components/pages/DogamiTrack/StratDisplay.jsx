import { useState } from "react";

import {
  BACKEND_URI,
  HEADER_JSON_CONFIG,
} from "../../../constants/backendRequests";

import { axiosBackendDelete } from "../../../lib/axiosRequests/axiosBackendEndpoints";

const TrackStatsDisplay = (props) => {
  return props.dogamiStrats.map((element) => (
    <div key={element._id}>
      Track: {element.track_id.name}&nbsp;&nbsp; Power 1: {element.power_1.name}
      &nbsp;&nbsp; Power 2: {element.power_2.name}&nbsp;&nbsp; Consumable 1:{" "}
      {element.consumable_1.name}&nbsp;&nbsp; &nbsp;&nbsp; Best Time:{" "}
      {element.strat_best_time}&nbsp;&nbsp;
      <DeleteStratButton
        stratId={element._id}
        dogamiId={props.dogamiId}
        trackId={props.trackId}
        updateTrigger_cbfn={props.updateTrigger_cbfn}
      />
    </div>
  ));
};

const DeleteStratButton = (props) => {
  const [errorMsg, setErrorMsg] = useState(null);

  // should add modulars - "are you sure"? and "deletion error"
  const handleDelete = async () => {
    const deleteUri = `${BACKEND_URI}/dogamis/${props.dogamiId}/strats/${props.stratId}`;
    const response = await axiosBackendDelete(deleteUri, HEADER_JSON_CONFIG);
    if (response.success) {
      // need to refresh content of page to include the new dog
      props.updateTrigger_cbfn(new Date());
    } else {
      setErrorMsg(response.error.message);
    }
  };

  return (
    <>
      <button onClick={handleDelete}>Delete</button>
      {/* Message for delete dogami issues, poss use modular instead? */}
      {errorMsg ? <p>{errorMsg}</p> : <></>}
    </>
  );
};

export default TrackStatsDisplay;
