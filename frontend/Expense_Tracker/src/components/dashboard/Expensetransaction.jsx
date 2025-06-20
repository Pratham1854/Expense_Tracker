import React from 'react'
import {LuArrowRight} from "react-icons/lu"
import moment from 'moment';
import TransactionInfoCard from '../cards/TransactionInfoCard'
const Expensetransaction = ({transactions,OnSeeMore}) => {
  return (
    <div className='card'>
        {console.log(transactions)}
        <div className=' flex justify-between items-center '>
            <h5 className='text-lg'>Expenses</h5>
            <button className='card-btn' onClick={OnSeeMore}>
                SEEALL <LuArrowRight className='text-base'/>
            </button>
        </div>
        <div className='mt-6'>
        {transactions?.slice(0, 4)?.map((expense) => (
          <TransactionInfoCard
            key={expense._id}
            title={expense.category}
            icon={expense.icon}
            data={moment(expense.date).format('Do MMM YYYY')}
            amount={expense.amount}
            type="expense"
            hideDeleteBtn
          />
        ))}
      </div>

    </div>
  )
}

export default Expensetransaction