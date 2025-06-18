import React from 'react';
import { PieChart, Cell, Tooltip, ResponsiveContainer, Legend, Pie, Label } from "recharts";

const Custompiechart = ({
    data,
     label,
      totalamount,
    colors,
    showtextanchor
}) => {
  return (
    <ResponsiveContainer width="100%" height={380}>
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
            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
        {showtextanchor &&(
          <>
          <text
          x="50%"
          y="50%"
          dy={-25}
          textAnchor='middle'
          fill="#666"
          fontSize="14px"
          >
            {label}
          </text>
          <text
           x="50%"
          y="50%"
          dy={8}
          textAnchor='middle'
          fill="#333"
          fontSize="24px"
          fontWeight="semi-bold"
          >
            {totalamount}
          </text>
          </>
        ) 
        }
      </PieChart>
    </ResponsiveContainer>
  );
}

export default Custompiechart;
