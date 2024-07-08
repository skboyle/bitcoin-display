import { useEffect, useState } from 'react';
import axios from 'axios';

const useFetchBitcoinData = (updateInterval) => {
  const [data, setData] = useState([]);
  const [nextUpdateInSeconds, setNextUpdateInSeconds] = useState(updateInterval);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://api.coindesk.com/v1/bpi/currentprice.json');
        const newData = {
          time: new Date(response.data.time.updatedISO).toLocaleTimeString(),
          USD: response.data.bpi.USD.rate_float,
          GBP: response.data.bpi.GBP.rate_float,
          EUR: response.data.bpi.EUR.rate_float,
        };

        setData(prevData => {
          if (prevData.length >= 10) {
            return [...prevData.slice(1), newData];
          } else {
            return [...prevData, newData];
          }
        });
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
    const intervalId = setInterval(() => {
      fetchData();
      setNextUpdateInSeconds(updateInterval); // Reset the countdown timer
    }, updateInterval * 1000);

    return () => clearInterval(intervalId);
  }, [updateInterval]);

  useEffect(() => {
    const countdownInterval = setInterval(() => {
      setNextUpdateInSeconds(prevSeconds => (prevSeconds > 1 ? prevSeconds - 1 : updateInterval));
    }, 1000);

    return () => clearInterval(countdownInterval);
  }, [updateInterval]);

  return { data, nextUpdateInSeconds };
};

export default useFetchBitcoinData;

