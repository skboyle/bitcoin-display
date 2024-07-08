import React, { useState } from 'react';
import CurrencyContainer from './components/CurrencyContainer';
import Countdown from './components/Countdown';
import BitcoinModal from './components/BitcoinModal';
import useFetchBitcoinData from './hooks/useFetchBitcoinData';
import './App.css';

const App = () => {
  const { data, nextUpdateInSeconds } = useFetchBitcoinData(30);
  const [amount, setAmount] = useState('');
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState(null);

  const handleInputChange = (e) => {
    setAmount(e.target.value);
  };

  const openModal = (currency) => {
    setSelectedCurrency(currency);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedCurrency(null);
  };

  return (
    <div className="app">
      <h1>Bitcoin Price Index</h1>
      <p>Next update: <Countdown initialSeconds={nextUpdateInSeconds} /></p>
      <CurrencyContainer data={data} amount={amount} onInputChange={handleInputChange} onBoxClick={openModal} />
      <BitcoinModal 
        isOpen={modalIsOpen} 
        onRequestClose={closeModal} 
        data={data} 
        selectedCurrency={selectedCurrency} 
        nextUpdateInSeconds={nextUpdateInSeconds} 
      />
    </div>
  );
};

export default App;





