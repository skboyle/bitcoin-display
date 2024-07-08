import React from 'react';
import Modal from 'react-modal';
import LineChartModal from './LineChartModal';

const BitcoinModal = ({ isOpen, onRequestClose, data, selectedCurrency, nextUpdateInSeconds }) => {
  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose} contentLabel="Currency Data Modal">
      <button onClick={onRequestClose}>Close</button>
      {selectedCurrency && (
        <LineChartModal 
          data={data} 
          currency={selectedCurrency} 
          nextUpdateInSeconds={nextUpdateInSeconds} 
        />
      )}
    </Modal>
  );
};

export default BitcoinModal;
