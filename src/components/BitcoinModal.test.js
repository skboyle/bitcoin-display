import React from 'react';
import { render, screen } from '@testing-library/react';
import BitcoinModal from './BitcoinModal';
import Modal from 'react-modal';

Modal.setAppElement(document.createElement('div')); // To avoid Modal warning

const mockData = [
  { time: '10:00', USD: 56092.4187, GBP: 43681.8589, EUR: 51739.4787 }
];

// Mock ResizeObserver
class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}

window.ResizeObserver = ResizeObserver;

describe('BitcoinModal', () => {
  it('renders without crashing', () => {
    render(
      <BitcoinModal
        isOpen={true}
        onRequestClose={() => {}}
        data={mockData}
        selectedCurrency="USD"
        nextUpdateInSeconds={30}
      />
    );

    expect(screen.getByText(/close/i)).toBeInTheDocument();
  });
});
