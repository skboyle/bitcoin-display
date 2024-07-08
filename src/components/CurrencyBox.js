import React from 'react';
import './CurrencyBox.css';

const CurrencyBox = ({ currency, rate, amount, onInputChange, onBoxClick }) => {
  const calculateBitcoin = (rate) => {
    return (amount / rate).toFixed(4);
  };

  return (
    <div className="currency-box" onClick={() => onBoxClick(currency)}>
      <h2>{currency}</h2>
      <p>{rate.toFixed(2)}</p>
      <input 
        type="number" 
        value={amount} 
        onChange={onInputChange} 
        placeholder="Enter amount"
        onClick={(e) => e.stopPropagation()} // Prevents the modal from opening when clicking inside the input
      />
      <p>{amount && calculateBitcoin(rate)} Bitcoin</p>
    </div>
  );
};

export default CurrencyBox;

