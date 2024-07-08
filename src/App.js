import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CurrencyContainer from './components/CurrencyContainer';
import './App.css';

const App = () => {
  const [data, setData] = useState([]);
  const [amount, setAmount] = useState('');

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
    const intervalId = setInterval(fetchData, 30000);

    return () => clearInterval(intervalId);
  }, []);

  const handleInputChange = (e) => {
    setAmount(e.target.value);
  };

  return (
    <div className="app">
      <h1>Bitcoin Price Index</h1>
      <CurrencyContainer data={data} amount={amount} onInputChange={handleInputChange} />
    </div>
  );
};

export default App;


