import { useState, useEffect } from "react";

import styles from "./StrategyAddForm.module.css";

import { HEADER_JSON_CONFIG } from "../../constants/backendRequests";

import { axiosBackendPost } from "../../lib/axiosRequests/axiosBackendEndpoints";

import useStratAddData from "../../hooks/useStratAddData";

/**
 * Component to add a dogami strat.
 * Used in multiple locations, so located in composites.
 * Component used in two situations:
 * - track id user provided
 * - track id not user provided, inherited in props
 */

const DogamiStratAddForm = (props) => {
  // custom hook
  const { stratAddData, error, loading } = useStratAddData();

  const [isPrivate, setIsPrivate] = useState(false);
  const [powerOne, setPowerOne] = useState("");
  const [powerTwo, setPowerTwo] = useState("");
  const [consumable, setConsumable] = useState("");
  const [bestTime, setBestTime] = useState(0);

  // if track is user provided, initiate null and allow user to provide
  // if track is not user provided, initiate with prop, and don't allow user to provide
  const [trackId, setTrackId] = useState(
    props.isTrackUserProvided ? "" : props.trackId
  );

  useEffect(() => {
    // when consumables data available, feed defaults to form
    if (stratAddData) {
      setPowerOne(stratAddData.powers[0]._id);
      setPowerTwo(stratAddData.powers[0]._id);
      setConsumable(stratAddData.consumables[0]._id);
      // if user needs to provide track, set a default
      if (props.isTrackUserProvided) setTrackId(stratAddData.tracks[0]._id);
    }
  }, [stratAddData]);

  // trackId either inherited, or provided by user

  const [addStratMsg, setAddStratMsg] = useState(null);

  if (loading) return <p>Loading...</p>;

  if (error) {
    return (
      <>
        <h3>Error</h3>
        <div>
          <p>Issue generating the add strat form.</p>
          <p>
            <Link to="/dashboard">Return to dashboard</Link>
          </p>
        </div>
      </>
    );
  }

  const sendDogamiStrat = async (event) => {
    event.preventDefault();

    const strat = {
      is_private: isPrivate,
      track_id: trackId,
      power_1: powerOne,
      power_2: powerTwo,
      consumable_1: consumable,
      strat_best_time: bestTime,
    };

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
  const handleTrackChange = (event) => setTrackId(event.target.value);

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
        {/* if user is providing trackId, add input to form */}
        {props.isTrackUserProvided ? (
          <Dropdown
            labelText="Track: "
            options={stratAddData.tracks}
            onChange={handleTrackChange}
            value={trackId}
          />
        ) : (
          <></>
        )}

        <Dropdown
          labelText="First power: "
          options={stratAddData.powers}
          onChange={handlePowerOneChange}
          value={powerOne}
        />
        <Dropdown
          labelText="Second power: "
          options={stratAddData.powers}
          onChange={handlePowerTwoChange}
          value={powerTwo}
        />
        <Dropdown
          labelText="Consumable: "
          options={stratAddData.consumables}
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

const Dropdown = ({ labelText, options, onChange, value }) => {
  return (
    <p>
      <label htmlFor="dropdown">{labelText}</label>
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
