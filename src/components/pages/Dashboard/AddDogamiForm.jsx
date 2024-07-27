import { useState, useEffect } from "react";

import styles from "./AddDogamiForm.module.css";

import {
  ADD_DOGAMI_URI,
  HEADER_JSON_CONFIG,
} from "../../../constants/backendRequests";

import { axiosBackendPost, axiosDogamiUri } from "../../../lib/axiosUtility";
import { constructDogamiObject } from "../../../lib/dogamiData";

const AddDogamiForm = (props) => {
  const [dogamiOfficialId, setDogamiOfficialId] = useState("3750");
  const [dogami, setDogami] = useState(null);
  const [addDogamiMsg, setAddDogamiMsg] = useState(null);

  const selectDogami = async (event) => {
    event.preventDefault();
    const response = await axiosDogamiUri(dogamiOfficialId);
    if (response.success) {
      // construct dogami data for UI and for backend
      const dogamiObj = constructDogamiObject(response.data);
      setDogami(dogamiObj);
    } else {
      setAddDogamiMsg(response.error);
    }
  };

  const addDogamiToBackend = async () => {
    const response = await axiosBackendPost(
      ADD_DOGAMI_URI,
      dogami,
      HEADER_JSON_CONFIG
    );
    if (response.success) {
      // trigger parent refresh to include the new dog
      props.updateTrigger_cbfn(new Date());
    } else {
      setAddDogamiMsg(response.error.message);
    }
  };

  return (
    <div className={styles.myDiv}>
      <h3>Add Dogami Here</h3>

      <form onSubmit={selectDogami}>
        <label htmlFor="dogami_official_id">Dogami #:</label>
        <input
          type="number"
          id="dogami_official_id"
          value={dogamiOfficialId}
          onChange={(e) => setDogamiOfficialId(e.target.value)}
          required
        />
        <input type="submit" value="Search" />
        {/* Message for add dogami issues */}
        {addDogamiMsg ? <p>{addDogamiMsg}</p> : <></>}
      </form>

      {dogami && (
        <>
          <p>Name: {dogami.name}</p>
          <p>Breed: {dogami.breed}</p>
          <p>Collection: {dogami.dog_collection}</p>
          {/* Message for add dogami issues */}
          {addDogamiMsg ? <p>{addDogamiMsg}</p> : <></>}
          <button onClick={addDogamiToBackend}>Add Dog</button>
        </>
      )}
    </div>
  );
};

export default AddDogamiForm;
