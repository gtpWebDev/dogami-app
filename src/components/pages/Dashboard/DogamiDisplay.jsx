import { useState, useEffect } from "react";

import { Link } from "react-router-dom";

import { axiosDogamiUri } from "../../../lib/axiosUtility";

import {
  BACKEND_URI,
  HEADER_JSON_CONFIG,
} from "../../../constants/backendRequests";
import { axiosBackendDelete } from "../../../lib/axiosUtility";

const DogamiDisplay = (props) => {
  return props.dogData.map((element) => (
    <div key={element._id}>
      <DogImage url={element.img_url} />
      {element.dogami_official_id}&nbsp;&nbsp;
      <Link to={`/dogami/${element._id}`}>{element.name}</Link>&nbsp;&nbsp;
      <DeleteDogButton
        dogamiId={element._id}
        updateTrigger_cbfn={props.updateTrigger_cbfn}
      />
    </div>
  ));
};

const DogImage = (props) => {
  return (
    <>{<img src={`${props.url}?w=200&auto=format`} alt="" width={200} />}</>
  );
};

const DeleteDogButton = (props) => {
  const [errorMsg, setErrorMsg] = useState(null);

  // should add modulars - "are you sure"? and "deletion error"
  const handleDelete = async () => {
    const deleteUri = `${BACKEND_URI}/dogami/${props.dogamiId}`;
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

export default DogamiDisplay;
