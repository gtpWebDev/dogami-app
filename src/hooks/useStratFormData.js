import { useState, useEffect } from "react";
import { axiosBackendGet } from "../lib/axiosRequests/axiosBackendEndpoints";

/**
 * Collecting from a few endpoints to inform the update and add strategy form:
 * - powers
 * - consumables
 * - tracks
 */

const useStratFormData = () => {
  const [stratFormData, setStratFormData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getStratFormData = async () => {
      try {
        const [powers, consumables, tracks] = await Promise.all([
          axiosBackendGet(`powers`),
          axiosBackendGet(`consumables`),
          axiosBackendGet(`tracks`),
        ]);

        setStratFormData({
          powers: powers.data,
          consumables: consumables.data,
          tracks: tracks.data,
        });
      } catch (error) {
        setError(error);
      }
      setLoading(false);
    };
    getStratFormData();
  }, []);

  return { stratFormData, error, loading };
};

export default useStratFormData;
