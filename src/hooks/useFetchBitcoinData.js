import { useEffect, useState } from 'react';

const useFetchBitcoinData = (updateInterval) => {
  const [data, setData] = useState([]);
  const [nextUpdateInSeconds, setNextUpdateInSeconds] = useState(updateInterval);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://api.coindesk.com/v1/bpi/currentprice.json');
        const result = await response.json();
        const { bpi, time } = result;
        setData((prevData) => [
          ...prevData.slice(-9), // Keep only the last 10 data points
          { USD: bpi.USD.rate_float, GBP: bpi.GBP.rate_float, EUR: bpi.EUR.rate_float, time: time.updatedISO },
        ]);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
    const interval = setInterval(() => {
      fetchData();
      setNextUpdateInSeconds(updateInterval);
    }, updateInterval * 1000);

    const countdown = setInterval(() => {
      setNextUpdateInSeconds((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => {
      clearInterval(interval);
      clearInterval(countdown);
    };
  }, [updateInterval]);

  return { data, nextUpdateInSeconds };
};

export default useFetchBitcoinData;
