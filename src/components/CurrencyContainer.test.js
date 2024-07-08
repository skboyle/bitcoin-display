import { render, screen, fireEvent } from '@testing-library/react';
import CurrencyContainer from './CurrencyContainer';

const mockData = [
  { time: '10:00', USD: 56092.4187, GBP: 43681.8589, EUR: 51739.4787 }
];

describe('CurrencyContainer', () => {
  it('renders currency boxes', () => {
    render(<CurrencyContainer data={mockData} amount="100" onInputChange={() => {}} onBoxClick={() => {}} />);

    expect(screen.getByText(/USD/i)).toBeInTheDocument();
    expect(screen.getByText(/56092.42/i)).toBeInTheDocument();
  });

  it('handles box click', () => {
    const handleBoxClick = jest.fn();
    render(<CurrencyContainer data={mockData} amount="100" onInputChange={() => {}} onBoxClick={handleBoxClick} />);

    fireEvent.click(screen.getByText(/USD/i));

    expect(handleBoxClick).toHaveBeenCalledWith('USD');
  });
});
