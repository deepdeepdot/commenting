// source: https://scotch.io/tutorials/create-a-custom-usefetch-react-hook
// reference: https://www.robinwieruch.de/react-hooks-fetch-data/

import { useState, useEffect } from 'react';

const useFetch = (url, options) => {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(url, options);
        const json = await res.json();
        setResponse(json);
        setIsLoading(false);
      } catch (error) {
        setError(error);
      }
    };
    fetchData();
  }, [url, options]);
  return [ response, error, isLoading ]; // minor change from original
};

export default useFetch;
