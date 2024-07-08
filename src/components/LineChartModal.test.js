import React from 'react';
import { render, screen } from '@testing-library/react';
import LineChartModal from './LineChartModal';

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

describe('LineChartModal', () => {
  it('renders without crashing', () => {
    render(<LineChartModal data={mockData} currency="USD" nextUpdateInSeconds={30} />);
    expect(screen.getByText(/USD Price Chart/i)).toBeInTheDocument();
  });
});
