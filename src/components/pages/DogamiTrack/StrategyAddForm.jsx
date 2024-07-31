import { useState } from "react";

import styles from "./StrategyAddForm.module.css";

import {
  ADD_DOGAMI_URI,
  HEADER_JSON_CONFIG,
} from "../../../constants/backendRequests";

import { axiosDogamiUri } from "../../../lib/axiosRequests/axiosDogamiEndpoints";
import { axiosBackendPost } from "../../../lib/axiosRequests/axiosBackendEndpoints";

import { constructDogamiObject } from "../../../lib/dogamiData";

const DogamiStratAddForm = (props) => {
  const [isPrivate, setIsPrivate] = useState(false);
  const [powerOne, setPowerOne] = useState(props.data.powers[0]._id);
  const [powerTwo, setPowerTwo] = useState(props.data.powers[0]._id);
  const [consumable, setConsumable] = useState(props.data.consumables[0]._id);
  const [bestTime, setBestTime] = useState(0);

  // const [dogami, setDogami] = useState(null);
  const [addStratMsg, setAddStratMsg] = useState(null);

  const sendDogamiStrat = async (event) => {
    event.preventDefault();

    const strat = {
      is_private: isPrivate,
      track_id: props.trackId,
      power_1: powerOne,
      power_2: powerTwo,
      consumable_1: consumable,
      strat_best_time: bestTime,
    };

    console.log("strat set", strat);

    const response = await axiosBackendPost(
      `/dogamis/${props.dogamiId}/strat/create`,
      strat,
      HEADER_JSON_CONFIG
    );
    if (response.success) {
      // trigger parent refresh to include the new dog
      props.updateTrigger_cbfn(new Date());
    } else {
      setAddStratMsg(response.error.message);
    }
  };

  const handlePowerOneChange = (event) => setPowerOne(event.target.value);
  const handlePowerTwoChange = (event) => setPowerTwo(event.target.value);
  const handleConsumableChange = (event) => setConsumable(event.target.value);
  const handleIsPrivateChange = () => setIsPrivate(!isPrivate);

  return (
    <div className={styles.myDiv}>
      <h3>Add Dogami Strat Here</h3>

      <form onSubmit={sendDogamiStrat}>
        <label htmlFor="is_private">Keep strategy private?</label>
        <input
          type="checkbox"
          id="is_private"
          value={isPrivate}
          onChange={handleIsPrivateChange}
        />
        <Dropdown
          options={props.data.powers}
          onChange={handlePowerOneChange}
          value={powerOne}
        />
        <Dropdown
          options={props.data.powers}
          onChange={handlePowerTwoChange}
          value={powerTwo}
        />
        <Dropdown
          options={props.data.consumables}
          onChange={handleConsumableChange}
          value={consumable}
        />
        <label htmlFor="is_private">Strategy best time</label>
        <input
          type="number"
          id="strat_best_time"
          value={bestTime}
          onChange={(e) => setBestTime(e.target.value)}
          required
        />

        <p>
          <input type="submit" value="Add strategy" />
        </p>

        {addStratMsg ? <p>{addStratMsg}</p> : <></>}
      </form>
    </div>
  );
};

const Dropdown = ({ options, onChange, value }) => {
  return (
    <p>
      <label htmlFor="dropdown">Choose an option:</label>
      <select id="dropdown" value={value} onChange={onChange}>
        {options.map((option) => (
          <option key={option._id} value={option._id}>
            {option.name}
          </option>
        ))}
      </select>
    </p>
  );
};

export default DogamiStratAddForm;
