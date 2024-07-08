import React, { useEffect, useState, act } from 'react';
import { render, waitFor, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import fetchMock from 'jest-fetch-mock';

// Enable fetch mocks
fetchMock.enableMocks();

const useFetchBitcoinData = (updateInterval) => {
  const [data, setData] = useState([]);
  const [nextUpdateInSeconds, setNextUpdateInSeconds] = useState(updateInterval);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://api.coindesk.com/v1/bpi/currentprice.json');
        const { bpi, time } = await response.json();
        setData((prevData) => [
          ...prevData.slice(-9), // Keep only the last 10 data points
          { USD: bpi.USD.rate_float, GBP: bpi.GBP.rate_float, EUR: bpi.EUR.rate_float, time: time.updatedISO },
        ]);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
    const interval = setInterval(() => {
      setNextUpdateInSeconds((prev) => (prev === 1 ? updateInterval : prev - 1));
    }, 1000);

    return () => clearInterval(interval);
  }, [updateInterval]);

  return { data, nextUpdateInSeconds };
};

const HookWrapper = ({ updateInterval }) => {
  const data = useFetchBitcoinData(updateInterval);
  return <div data-testid="hook-data">{JSON.stringify(data)}</div>;
};

describe('useFetchBitcoinData', () => {
  beforeEach(() => {
    jest.setTimeout(10000); // Increase timeout for this test suite
    fetch.resetMocks();
  });

  it('fetches data and updates state', async () => {
    fetch.mockResponseOnce(JSON.stringify({
      bpi: {
        USD: { rate_float: 56092.4187 },
        GBP: { rate_float: 43681.8589 },
        EUR: { rate_float: 51739.4787 },
      },
      time: { updatedISO: '2022-10-10T10:00:00Z' },
    }));

    render(<HookWrapper updateInterval={30} />);

    await waitFor(() => {
      const data = JSON.parse(screen.getByTestId('hook-data').textContent);
      console.log('Data in waitFor:', data);
      expect(data.data).toHaveLength(1);
    });

    const data = JSON.parse(screen.getByTestId('hook-data').textContent);
    console.log('Final Data:', data);
    expect(data.data[0]).toMatchObject({
      USD: 56092.4187,
      GBP: 43681.8589,
      EUR: 51739.4787,
      time: '2022-10-10T10:00:00Z',
    });
  });

  it('resets countdown after fetching data', async () => {
    jest.useFakeTimers();
    fetch.mockResponseOnce(JSON.stringify({
      bpi: {
        USD: { rate_float: 56092.4187 },
        GBP: { rate_float: 43681.8589 },
        EUR: { rate_float: 51739.4787 },
      },
      time: { updatedISO: '2022-10-10T10:00:00Z' },
    }));

    render(<HookWrapper updateInterval={30} />);

    await waitFor(() => {
      const data = JSON.parse(screen.getByTestId('hook-data').textContent);
      console.log('Data before advancing timers:', data);
      expect(data.nextUpdateInSeconds).toBe(30);
    });

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    const data = JSON.parse(screen.getByTestId('hook-data').textContent);
    console.log('Data after advancing timers:', data);
    expect(data.nextUpdateInSeconds).toBe(29);
  });
});
