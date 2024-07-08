// src/components/Countdown.test.js
import React, { act } from 'react';
import { render } from 'react-dom';
import Countdown from './Countdown';

jest.useFakeTimers();

describe('Countdown', () => {
  let container;

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  afterEach(() => {
    document.body.removeChild(container);
    container = null;
  });

  it('resets after reaching zero', () => {
    act(() => {
      render(<Countdown initialSeconds={3} />, container);
    });

    expect(container.textContent).toBe('3 seconds');

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    expect(container.textContent).toBe('2 seconds');

    act(() => {
      jest.advanceTimersByTime(2000);
    });

    expect(container.textContent).toBe('3 seconds'); // Assuming it resets to initial value
  });
});

