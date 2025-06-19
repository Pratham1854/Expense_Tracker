import React from 'react';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import Customtooltip from './Customtooltip';
import Customlegend from './Customlegend';

const Custompiechart = ({
  data = [],
  label = 'Total Income',
  totalamount = 0,
  colors = [],
  showtextanchor = false,
}) => {
  return (
    <div className="relative w-full h-[380px]">
      {/* 👇 Absolute text in center */}
      {showtextanchor && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center z-10">
          <div className="text-sm text-gray-600">{label}</div>
          <div className="text-xl font-semibold text-gray-800">${totalamount}</div>
        </div>
      )}

      {/* 👇 Chart below the overlay */}
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            dataKey="amount"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={130}
            innerRadius={100}
            labelLine={false}
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={colors[index % colors.length] || '#ccc'}
              />
            ))}
          </Pie>
          <Tooltip content={<Customtooltip />} />
          <Legend content={<Customlegend />} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Custompiechart;
