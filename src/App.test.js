import { render, screen } from '@testing-library/react';
import App from './App';

jest.mock('axios');

describe('App', () => {
  it('renders the main structure', () => {
    render(<App />);
    expect(screen.getByText(/Bitcoin Price Index/i)).toBeInTheDocument();
    expect(screen.getByText(/Next update:/i)).toBeInTheDocument();
  });
});
