import React from 'react';
import './CurrencyBox.css';

const CurrencyBox = ({ currency, rate, amount, onInputChange }) => {
  const calculateBitcoin = (rate) => {
    return (amount / rate).toFixed(4);
  };

  return (
    <div className="currency-box">
      <h2>{currency}</h2>
      <p>{rate.toFixed(2)}</p>
      <input 
        type="number" 
        value={amount} 
        onChange={onInputChange} 
        placeholder="Enter amount"
      />
      <p>{amount && calculateBitcoin(rate)} Bitcoin</p>
    </div>
  );
};

export default CurrencyBox;
