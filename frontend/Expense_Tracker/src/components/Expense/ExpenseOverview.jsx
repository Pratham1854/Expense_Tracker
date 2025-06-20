import React, { useState ,useEffect} from 'react'
import { LuPlus} from"react-icons/lu"
import { prepareExpenselineChartdata } from '../../utils/helper'
import CustomLinechart from '../charts/CustomLinechart'
const ExpenseOverview = ({transactions,onexpenseincome}) => {
    const[chardata,setchartdata]=useState([])
    useEffect(() => {
      const result=prepareExpenselineChartdata(transactions);
      setchartdata(result)
    
      return () => {
      }
    }, [transactions])
    
  return (
    <div className='card'>
        <div className='flex items-center justify-between'>
            <div className=''>
                <h5 className='text-lg'>Expense Overview</h5>
                <p className='text-xs text-gray-500 mt-0.5'>track your spending trend and insights</p>
            </div>
            <button className='add-btn' onClick={onexpenseincome}>
                <LuPlus className='text-lg'/>Add expense
            </button>
        </div>
        <div className='mt-10'>
            <CustomLinechart data={chardata}/>
        </div>
    </div>
  )
}

export default ExpenseOverview