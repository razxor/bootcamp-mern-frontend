// StatsBox.jsx
import React from 'react';

const StatsBox = ({ title, value, description, bgColor = 'bg-blue-500' }) => {
  return (
    <div className={`p-6 rounded-lg shadow-md ${bgColor} text-white`}>
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-2xl font-bold mt-2">{value}</p>
      <p className="mt-1 text-sm">{description}</p>
    </div>
  );
};

export default StatsBox;
