import { useState ,useEffect} from 'react'
import React from 'react'
import DashboardLayout from '../../components/layout/DashboardLayout'
import { useUserAuth } from '../../hooks/useUserAuth'
import { API_PATHS } from '../../utils/apiPath'
import axiosInstance from '../../utils/axiosInstance'
import ExpenseOverview from '../../components/Expense/ExpenseOverview'
import Modal from '../../components/Modal'
import { toast } from 'react-hot-toast';  

import Addexpenseform from '../../components/Expense/Addexpenseform'
import ExpenseList from '../../components/Expense/ExpenseList'
import DeleteAlert from '../../components/DeleteAlert'
const Expense = () => {
  useUserAuth();
  const [OpenAddExpenseModal, setOpenAddExpenseModal] = useState(false)
  const[expensedata,setexpensedata]=useState([])
  const[loading,setloading]=useState(false)
  const[opendeleteAlert,setopendeleteAlert]=useState({
    show:false,
    data:null,
  })
  const fetchExpenseDetails = async () => {
    if (loading) return;
    setloading(true);
    try {
      const response = await axiosInstance.get(API_PATHS.EXPENSE.GET_ALL_EXPENSE);
      if (response.data) {
        setexpensedata(response.data);
      }
    } catch (error) {
      console.error('Something went wrong:', error);
    } finally {
      setloading(false);
    }
  
  };
  //add income
const handleAddExpense = async (expenseData) => {
  const { category, amount, date, icon } = expenseData;

  if (!category?.trim()) {
    toast.error("category is required");
    return;
  }
  if (!amount || isNaN(amount) || Number(amount) <= 0) {
    toast.error("Amount should be a valid number greater than zero");
    return;
  }
  if (!date) {
    toast.error("Date is required");
    return;
  }

  try {
    await axiosInstance.post(API_PATHS.EXPENSE.ADD_EXPENSE, {
      category,
      amount,
      date,
      icon,
    });
    setOpenAddExpenseModal(false);
    toast.success("expense added successfully");
    fetchExpenseDetails();
  } catch (error) {
    console.error("Error adding income:", error.response?.data?.message || error.message);
    toast.error(error.response?.data?.message || "Failed to add income");
  }
};
// delete income
const deleteExpense=async(id)=>{
  try{
    console.log(id)
    await axiosInstance.delete(API_PATHS.EXPENSE.DELETE_EXPENSE(id))
    setopendeleteAlert({show:false ,data:null})
    toast.success("expense deleted successfully"); 
    fetchExpenseDetails();
  }catch(error){
       console.error("Error in  delete:", error.response?.data?.message || error.message);
  }
};
const handledownloadIncomedetails = async () => {
  try {
    const token = localStorage.getItem("token"); // Or however you store your token

    const response = await axiosInstance.get(API_PATHS.EXPENSE.DOWNLOAD_EXPENSE, {
      responseType: "blob",
      headers: {
        Authorization: `Bearer ${token}`,  // ✅ Add this
      },
    });

    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "expensedetails.xlsx");
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error("Error downloading expense detail", error);
    toast.error("Failed to download. Please try again.");
  }
};



  
useEffect(() => {
fetchExpenseDetails();

  return () => { }
}, [])

//{  console.log(expensedata);}
  return (
    <DashboardLayout Activemenu="Expense">

      <div className='my-5 mx-auto'>
        <div className='grid grid-cols-1 gap-6'>
          <div className=''>
      <ExpenseOverview
      transactions={expensedata}
  onexpenseincome={() => setOpenAddExpenseModal(true)}/>
          </div>
         <ExpenseList
  transactions={expensedata}
  ondelete={(id) => setopendeleteAlert({ show: true, data: id })}
  ondownload={handledownloadIncomedetails}
/>

        </div>
        <Modal
        isopen={OpenAddExpenseModal}
        onclose={()=>setOpenAddExpenseModal(false)}
        title="Add Expense"
        >
          <Addexpenseform
          onaddexpense={handleAddExpense}/>
        </Modal>
         <Modal isopen={opendeleteAlert.show}
        onclose={()=>setopendeleteAlert({show:false,data:null})}
         title="Delete Income">
          {/* <div>add income form</div> */}
         <DeleteAlert
         content="are you sure you want to delete?"
        ondelete={()=>deleteExpense(opendeleteAlert.data)}/>
        </Modal>
      </div>
      </DashboardLayout>
  )
}

export default Expense