import React, { useState, useEffect } from 'react';
import Custompiechart from '../charts/Custompiechart';

const colors = ['#875CF5', '#FA2C37', '#FF6900', '#4F39F6'];

const Recentincomewithchart = ({ data = [], totalincome = 0 }) => {
  const [chartdata, setchartdata] = useState([]);

  useEffect(() => {
    const dataArr = data.map((item) => ({
      name: item?.source || 'Unknown',
      amount: typeof item?.amount === 'number' ? item.amount : 0,
    }));
    setchartdata(dataArr);
  }, [data]);

  return (
    <div className="card">
      <div className="flex items-center justify-between">
        <h5 className="text-lg">Last 60 days income</h5>
      </div>
      <Custompiechart
        data={chartdata}
        label="Total Income"
        totalamount={`${totalincome}`}
    showtextanchor
        colors={colors}
      />
    </div>
  );
};

export default Recentincomewithchart;
