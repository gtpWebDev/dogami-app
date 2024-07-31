import { useState } from "react";

import styles from "./DogamiAddForm.module.css";

import {
  ADD_DOGAMI_URI,
  HEADER_JSON_CONFIG,
} from "../../../constants/backendRequests";

import { axiosDogamiUri } from "../../../lib/axiosRequests/axiosDogamiEndpoints";
import { axiosBackendPost } from "../../../lib/axiosRequests/axiosBackendEndpoints";

import { constructDogamiObject } from "../../../lib/dogamiData";

const DogamiAddForm = (props) => {
  const [dogamiOfficialId, setDogamiOfficialId] = useState("1000");
  const [dogami, setDogami] = useState(null);
  const [addDogamiMsg, setAddDogamiMsg] = useState(null);

  const selectDogami = async (event) => {
    event.preventDefault();

    const response = await axiosDogamiUri(dogamiOfficialId); // returns an array
    if (response.success) {
      // construct a Dogami class from the collected data
      const dogamiObj = constructDogamiObject(response.data[0]);
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
          {/* Extract this to a dog img component */}
          <p>Name: {dogami.name}</p>
          <p>Breed: {dogami.breed}</p>
          <p>Collection: {dogami.dog_collection}</p>
          <p>Level: {dogami.level}</p>
          <p>Rarity: {dogami.rarity}</p>
          <button onClick={addDogamiToBackend}>Add Dog</button>
        </>
      )}
    </div>
  );
};

export default DogamiAddForm;
