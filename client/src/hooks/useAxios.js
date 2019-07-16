import { useState, useEffect } from "react";
import axios from "axios";

const useAxios = ({ method, url, options } = {}) => {
  let [response, setResponse] = useState(null);
  let [error, setError] = useState(null);
  let [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!method) {
        return {
            response: {},
        }
    };
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const res = await axios[method.toLowerCase()](url, options);
        setResponse(res.data);
        setIsLoading(false);
      } catch (error) {
        setError(error);
      }
    };
    fetchData();
  }, [method, url, options]);
  return [ response, error, isLoading ];
};

export default useAxios;
