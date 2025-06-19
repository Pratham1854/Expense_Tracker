import React, { useState,useEffect } from 'react'

import Custombarchart from '../charts/Custombarchart';
import { prepareExpenseBarChartData } from '../../utils/helper';

const Last30DaysExpense = ({ data = [] }) => {
  const [chardata, setchartdata] = useState([]);

  useEffect(() => {
    const result = prepareExpenseBarChartData(data);
    setchartdata(result);
  }, [data]);

  return (
    <div className='card col-span-1'>
      <div className='flex items-center justify-between'>
        <h5 className='text-lg'>Last 30 days expense</h5>
      </div>
      <div>
        <Custombarchart data={chardata} />
      </div>
    </div>
  );
};
export default Last30DaysExpense;