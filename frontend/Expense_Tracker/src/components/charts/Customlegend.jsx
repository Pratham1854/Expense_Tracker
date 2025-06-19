import React from 'react';

const Customlegend = ({ payload }) => {
  console.log("Custom Legend Payload:", payload);

  if (!payload || !payload.length) return null;

  return (
<div className="flex flex-wrap justify-center gap-x-6 gap-y-3 mt-4 ">

      {payload.map((entry, index) => (
        <div key={`Legend-${index}`} className="flex items-center space-x-2">
          <div
            className="w-2.5 h-2.5 rounded-full"
            style={{ backgroundColor: entry.color }}
          ></div>
          <span className="text-xs text-gray-700 font-medium">
            {entry.value}
          </span>
        </div>
      ))}
    </div>
  );
};

export default Customlegend;
