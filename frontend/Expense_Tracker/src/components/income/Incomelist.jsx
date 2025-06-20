import React from 'react'
import { LuDownload} from"react-icons/lu"
import moment from 'moment'
import TransactionInfoCard from '../cards/TransactionInfoCard'
const Incomelist = ({transactions,ondelete,ondowmload}) => {
  return (
    <div className='card'>
        <div className='flex items-center justify-between'>
            <h5 className='text-lg'>
        Income Sources
            </h5>
            <button className='card-btn' onClick={ondowmload}>
                <LuDownload className='text-base'/>Download
            </button>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-2'>
            {transactions?.map((income)=>(
                <TransactionInfoCard
                key={income._id}
                title={income.source}
                icon={income.icon}
                date={moment(income.date).format("Do MMM YYYY")}
                amount={income.amount}
                type="income"
                onDelete={()=>ondelete(income._id)}
                />
            ))}

        </div>
    </div>
  )
}

export default Incomelist