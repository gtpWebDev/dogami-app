import { useState, useEffect } from "react";
import { axiosBackendGet } from "../lib/axiosRequests/axiosBackendEndpoints";

/**
 * Collecting from a few endpoints to inform the add strategy form:
 * - powers
 * - consumables
 * - tracks
 */

const useStratAddData = () => {
  const [stratAddData, setStratAddData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getStratAddData = async () => {
      try {
        const [powers, consumables, tracks] = await Promise.all([
          axiosBackendGet(`powers`),
          axiosBackendGet(`consumables`),
          axiosBackendGet(`tracks`),
        ]);

        // console.log("powers.data", powers.data);
        // console.log("consumables.data", consumables.data);

        setStratAddData({
          powers: powers.data,
          consumables: consumables.data,
          tracks: tracks.data,
        });
      } catch (error) {
        setError(error);
      }
      setLoading(false);
    };
    getStratAddData();
  }, []);

  return { stratAddData, error, loading };
};

export default useStratAddData;
