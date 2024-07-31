import { useState, useEffect } from "react";
import { axiosBackendGet } from "../lib/axiosRequests/axiosBackendEndpoints";

/**
 * Custom hook for all get requests to the backend server
 */

const useGetBackendData = (relativeUri, updateTrigger) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axiosBackendGet(relativeUri);
        if (response.success) {
          // console.log("response.data", response.data);
          setData(response.data);
        } else {
          setError(response.error);
        }
        setLoading(false);
        // console.log("Custom hook returning handled response");
      } catch (error) {
        // console.log("Custom hook returning unhandled response");
        setError(error);
        setLoading(false);
      }
    };
    getData();
  }, [updateTrigger]);

  return { data, error, loading };
};

export default useGetBackendData;
