import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import Countdown from './Countdown';

const LineChartModal = ({ data = [], currency = 'USD', nextUpdateInSeconds = 30 }) => {
    const values = data.map(item => item[currency]);
    const minValue = Math.min(...values);
    const maxValue = Math.max(...values);
  
    // Adjust the domain to zoom in even more closely around the data points
    const domainMin = minValue * 0.999;
    const domainMax = maxValue * 1.001;
  
    // Format the Y-axis ticks to be more readable
    const formatYAxis = (tick) => tick.toFixed(2);
  
    return (
      <div>
        <h2>{currency} Price Chart</h2>
        <p>Next update: <Countdown initialSeconds={nextUpdateInSeconds} /></p>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={data} margin={{ top: 20, right: 40, left: 60, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" />
            <YAxis domain={[domainMin, domainMax]} tickFormatter={formatYAxis} width={80} />
            <Tooltip />
            <Line type="monotone" dataKey={currency} stroke="#8884d8" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    );
  };

export default LineChartModal;

