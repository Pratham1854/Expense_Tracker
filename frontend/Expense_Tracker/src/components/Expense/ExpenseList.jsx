import React from 'react'
import TransactionInfoCard from '../cards/TransactionInfoCard'
import {LuDownload} from"react-icons/lu"
import moment from 'moment'
const ExpenseList = ({transactions,ondelete, ondownload}) => {
  //  console.log(ondownload)
  return (
    <div className='card'>
        <div className='flex items-center justify-between'>
            <h5 className='text-lg'>
        ALL EXPENSES
            </h5>
            <button className='card-btn' onClick={ondownload}>
                <LuDownload className='text-base'/>Download
            </button>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-2'>
          {transactions?.map((expense) => (
  <TransactionInfoCard
    key={expense._id}
    title={expense.category}             // Use 'category' instead of 'source'
    icon={expense.icon}
    date={moment(expense.date).format("Do MMM YYYY")}
    amount={expense.amount}
    type="expense"
    onDelete={() => ondelete(expense._id)}
  />
))}

        </div>
    </div>
  )
}

export default ExpenseList