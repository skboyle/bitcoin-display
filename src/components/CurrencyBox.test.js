import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import CurrencyBox from './CurrencyBox';


describe('CurrencyBox', () => {
  it('renders without crashing', () => {
    const { getByText } = render(
      <CurrencyBox 
        currency="USD" 
        rate={56092.4187} 
        amount="100" 
        onInputChange={() => {}} 
        onBoxClick={() => {}} 
      />
    );
    expect(screen.getByText(/USD/i)).toBeInTheDocument();
  });
});
