import React from 'react';
import CurrencyBox from './CurrencyBox';
import './CurrencyContainer.css';

const CurrencyContainer = ({ data, amount, onInputChange }) => {
  return (
    <div className="currency-container">
      {data.length > 0 && ['USD', 'GBP', 'EUR'].map((currency) => (
        <CurrencyBox
          key={currency}
          currency={currency}
          rate={data[data.length - 1][currency]} // Use the latest rate
          amount={amount}
          onInputChange={onInputChange}
        />
      ))}
    </div>
  );
};

export default CurrencyContainer;
