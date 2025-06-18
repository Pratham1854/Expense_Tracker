import React from 'react'
import Custompiechart from '../charts/Custompiechart'
const colors=["#875CF5","#FA2C37","#FF6900"]
const FinanceOverview = ({totalbalance,totalincome,totalexpense}) => {
    const balancedata=[
        {name:"total balance",amount:totalbalance},
        {name:"total income",amount:totalincome},
        {name:"total expense",amount:totalexpense},
    ]
  return (
    <div className='card'>
        <div className='flex items-center justify-between'>
            <h5 className='text-lg'>FINANCIAL OVERVIEW</h5>
            <Custompiechart
            data={balancedata}
            label="total balance"
            totalamount={`${totalbalance}`}
            colors={colors}
            showtextanchor
            />
        </div>
    </div>
  )
}

export default FinanceOverview