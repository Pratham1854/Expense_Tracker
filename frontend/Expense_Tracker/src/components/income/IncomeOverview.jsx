import React, { useState,useEffect } from 'react'
import {LuPlus}  from "react-icons/lu";
import Custombarchart from '../charts/Custombarchart';
import { prepareExpenseBarChartData, prepareincomebarchart } from '../../utils/helper';
const IncomeOverview = ({transactions,onAddIncome}) => {
    console.log("Raw transactions:", transactions);

    const[chardata,setchartdata]=useState([])
    useEffect(() => {
      const result=prepareincomebarchart(transactions)
      setchartdata(result)
    
      return () => {
      }
    }, [transactions])
    
  return (
    <div className='card'>
        <div className='flex items-center justify-between'>
            <div className=''>
                <h5 className='text-lg'>Income Overview</h5>
                <p className='text-xs text-gray-400 mt-0.5'>
            TRACK YOUR EARNINGS OVER TIME AND ANALYZE YOUR INCOME TRENDS.
                </p>
            </div>
            <button className='add-btn' onClick={onAddIncome}>
                <LuPlus className='text-lg'/>
                ADD INCOME
            </button>
        </div>
        <div className='mt-10'>
            {console.log(chardata)}
    <Custombarchart data={chardata}/>
        </div>
    </div>
  )
}

export default IncomeOverview