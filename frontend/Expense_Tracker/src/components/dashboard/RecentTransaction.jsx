import React from 'react';
import { LuArrowRight } from 'react-icons/lu';
import moment from 'moment';
import TransactionInfoCard from '../cards/TransactionInfoCard';

const RecentTransaction = ({ transaction, onSeeMore }) => {
  return (
    <div className='card'>
              {/*console.log(transaction)*/}
      <div className='flex items-center justify-between'>
        <h5 className='text-lg'>Recent Transactions</h5>
        <button className='card-btn' onClick={onSeeMore}>
          SEE ALL <LuArrowRight className='text-base' />
        </button>
      </div>
      <div className='mt-6'>
        {transaction?.slice(0, 4)?.map((item) => (
          <TransactionInfoCard
            key={item._id}
            title={item.type === 'expense' ? item.category : item.source}
            icon={item.icon}
            data={moment(item.date).format('Do MMM YYYY')}
            amount={item.amount}
            type={item.type}
            hideDeleteBtn
          />
        ))}
      </div>

    </div>
  );
};

export default RecentTransaction;
