import React, { useState, useEffect } from 'react';

const Countdown = ({ initialSeconds, onComplete }) => {
  const [countdown, setCountdown] = useState(initialSeconds);

  useEffect(() => {
    setCountdown(initialSeconds); // Initialize the countdown

    const interval = setInterval(() => {
      setCountdown(prevCountdown => {
        if (prevCountdown <= 1) {
          clearInterval(interval);
          if (onComplete) onComplete();
          return initialSeconds; // Reset countdown
        }
        return prevCountdown - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [initialSeconds, onComplete]);

  return <span>{countdown} seconds</span>;
};

export default Countdown;
