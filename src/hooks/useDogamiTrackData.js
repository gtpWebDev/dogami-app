import { useState, useEffect } from "react";
import { axiosBackendGet } from "../lib/axiosRequests/axiosBackendEndpoints";

/**
 * Note, it would have been possible to collect this data using
 * a single frontend-focussed end point on the backend and then
 * using the useGetBackendData custom hook.
 * Wanted to try this as an approach, using generalised API
 * endpoints.
 */

const useDogamiTrackData = (dogamiId, trackId, updateTrigger) => {
  const [trackData, setTrackData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getTrackData = async () => {
      try {
        const [dogami, track, strats] = await Promise.all([
          axiosBackendGet(`dogamis/${dogamiId}`),
          axiosBackendGet(`tracks/${trackId}`),
          axiosBackendGet(`dogamis/${dogamiId}/strats?track_id=${trackId}`),
        ]);

        // console.log("dogami.data", dogami.data);
        // console.log("track.data", track.data);
        // console.log("strat.data", strat.data);

        setTrackData({
          dogami: dogami.data,
          track: track.data,
          dogamiStrats: strats.data,
        });
      } catch (error) {
        setError(error);
      }
      setLoading(false);
    };
    getTrackData();
  }, [updateTrigger]);

  return { trackData, error, loading };
};

export default useDogamiTrackData;
