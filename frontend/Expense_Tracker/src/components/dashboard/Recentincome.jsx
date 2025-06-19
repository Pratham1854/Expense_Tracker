import React from 'react'
import {LuArrowRight} from "react-icons/lu"
import moment from 'moment'
import TransactionInfoCard from '../cards/TransactionInfoCard'
const Recentincome = ({transactions,OnSeeMore}) => {
  return (
<div className='card'>
        <div className='flex items-center justify-between'>
            <h5 className='text-lg'>Income</h5>
               <button className='card-btn' onClick={OnSeeMore}>
                            SEEALL <LuArrowRight className='text-base'/>
                </button>
        </div>
         <div className='mt-6'>
        {transactions?.slice(0, 5)?.map((item) => (
          <TransactionInfoCard
            key={item._id}
            title={item.source}
            icon={item.icon}
            data={moment(item.date).format('Do MMM YYYY')}
            amount={item.amount}
            type="income"
            hideDeleteBtn
          />
        ))}
      </div>
    </div>
  )
}

export default Recentincome