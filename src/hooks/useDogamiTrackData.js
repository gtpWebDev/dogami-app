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
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      try {
        /**
         * Axios functions setup not to generate errors.
         * Potentially makes life harder!
         * Returns:
         *  .success true, .data, .error null
         *  or
         *  .success false, data null, error {status and message}
         */
        const [dogami, track, strats] = await Promise.all([
          axiosBackendGet(`dogamis/${dogamiId}`),
          axiosBackendGet(`tracks/${trackId}`),
          axiosBackendGet(`dogamis/${dogamiId}/strats?track_id=${trackId}`),
        ]);

        if (!dogami.success) {
          throw new Error(dogami.error.message);
        }
        if (!track.success) {
          throw new Error(track.error.message);
        }
        if (!strats.success) {
          throw new Error(strats.error.message);
        }

        // console.log("dogami", dogami);
        // console.log("track", track);
        // console.log("strats", strats);

        setData({
          dogami: dogami.data,
          track: track.data,
          dogamiStrats: strats.data,
        });
      } catch (error) {
        setError(error);
      }
      setLoading(false);
    };
    getData();
  }, [updateTrigger]);

  return { data, error, loading };
};

export default useDogamiTrackData;
