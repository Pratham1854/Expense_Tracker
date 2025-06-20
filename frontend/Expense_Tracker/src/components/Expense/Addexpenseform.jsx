import React from 'react'
import Input from '../input/Input'
import { useState } from 'react'
import Emojipickerpopup from '../Emojipickerpopup'
const Addexpenseform = ({onaddexpense}) => {
      const [income, setIncome] = useState({
        category: '',
        amount: '',
        date: '',
        icon: ''
      });
       const handleChange = (key, value) => setIncome({ ...income, [key]: value });
  return (
    <div><Emojipickerpopup icon={income.icon}
    onselect={(selectedicon)=>handleChange("icon",selectedicon)}/>
     <Input
        value={income.category}
        onChange={({ target }) => handleChange('category', target.value)}
        label="Category"
        placeholder="rent,grocery, etc."
        type="text"
      />
       <Input
        value={income.amount}
        onChange={({ target }) => handleChange('amount', target.value)}
        label="Amount"
        placeholder=""
        type="number"
      />

      {/* Optional: add date input if needed */}
      <Input
        value={income.date}
        onChange={({ target }) => handleChange('date', target.value)}
        label="Date"
        type="date"
      />

      <div className="flex justify-end mt-6">
        <button
          type="button"
          className="add-btn add-btn-fill"
          onClick={() => onaddexpense(income)}
        >
          ADD EXPENSE
        </button>
        </div>
    </div>
  )
}

export default Addexpenseform