import React, { act } from 'react';
import { render, waitFor, screen } from '@testing-library/react';
import useFetchBitcoinData from './useFetchBitcoinData';

global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve({
        bpi: {
          USD: { rate_float: 56092.4187 },
          GBP: { rate_float: 43681.8589 },
          EUR: { rate_float: 51739.4787 },
        },
        time: { updatedISO: '2022-10-10T10:00:00Z' },
      }),
    })
  );
  
  const HookWrapper = ({ updateInterval }) => {
    const data = useFetchBitcoinData(updateInterval);
    return <div data-testid="hook-data">{JSON.stringify(data)}</div>;
  };
  
  describe('useFetchBitcoinData', () => {
    beforeEach(() => {
      jest.setTimeout(10000); // Increase timeout for this test suite
    });
  
    it('fetches data and updates state', async () => {
      render(<HookWrapper updateInterval={30} />);
  
      await waitFor(() => {
        const data = JSON.parse(screen.getByTestId('hook-data').textContent);
        expect(data.data).toHaveLength(1);
      });
  
      const data = JSON.parse(screen.getByTestId('hook-data').textContent);
      expect(data.data[0]).toMatchObject({
        USD: 56092.4187,
        GBP: 43681.8589,
        EUR: 51739.4787,
        time: '2022-10-10T10:00:00Z',
      });
    });
  
    it('resets countdown after fetching data', async () => {
      jest.useFakeTimers();
      render(<HookWrapper updateInterval={30} />);
  
      await waitFor(() => {
        const data = JSON.parse(screen.getByTestId('hook-data').textContent);
        expect(data.nextUpdateInSeconds).toBe(30);
      });
  
      act(() => {
        jest.advanceTimersByTime(1000);
      });
  
      const data = JSON.parse(screen.getByTestId('hook-data').textContent);
      expect(data.nextUpdateInSeconds).toBe(29);
    });
  });