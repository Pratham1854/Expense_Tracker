import React from 'react'
import DashboardLayout from '../../components/layout/DashboardLayout'
import {useState,useEffect} from "react"
import axiosInstance from '../../utils/axiosInstance'
import IncomeOverview from '../../components/income/IncomeOverview' 
import { API_PATHS } from '../../utils/apiPath'
import Modal from '../../components/Modal'
import Addincomeform from '../../components/income/Addincomeform'
import { toast } from 'react-hot-toast';  

import Incomelist from '../../components/income/Incomelist'
import DeleteAlert from '../../components/DeleteAlert'
import { useUserAuth } from '../../hooks/useUserAuth'
const Income = () => {
  useUserAuth();
const [OpenAddIncomeModal, setOpenAddIncomeModal] = useState(false)
const[incomedata,setincomedata]=useState([])
const[loading,setloading]=useState(false)
const[opendeleteAlert,setopendeleteAlert]=useState({
  show:false,
  data:null,
})

 const fetchIncomeDetails = async () => {
    if (loading) return;
    setloading(true);
    try {
      const response = await axiosInstance.get(API_PATHS.INCOME.GET_ALL_INCOME);
      if (response.data) {
        setincomedata(response.data);
      }
    } catch (error) {
      console.error('Something went wrong:', error);
    } finally {
      setloading(false);
    }
  };
  //add income
const handleAddIncome = async (incomeData) => {
  const { source, amount, date, icon } = incomeData;

  if (!source?.trim()) {
    toast.error("Source is required");
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
    await axiosInstance.post(API_PATHS.INCOME.ADD_INCOME, {
      source,
      amount,
      date,
      icon,
    });
    setOpenAddIncomeModal(false);
    toast.success("Income added successfully");
    fetchIncomeDetails();
  } catch (error) {
    console.error("Error adding income:", error.response?.data?.message || error.message);
    toast.error(error.response?.data?.message || "Failed to add income");
  }
};

 // delete income
const deleteIncome=async(id)=>{
  try{
    console.log(id)
    await axiosInstance.delete(API_PATHS.INCOME.DELETE_INCOME(id))
    setopendeleteAlert({show:false ,data:null})
    toast.success("income deleted successfully"); 
    fetchIncomeDetails();
  }catch(error){
       console.error("Error in  delete:", error.response?.data?.message || error.message);
  }
};

const handledownloadIncomedetails=async()=>{
   try {
    const token = localStorage.getItem("token"); // Or however you store your token

    const response = await axiosInstance.get(API_PATHS.INCOME.DOWNLOAD_INCOME, {
      responseType: "blob",
      headers: {
        Authorization: `Bearer ${token}`,  // ✅ Add this
      },
    });

    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "Incomedetails.xlsx");
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
    fetchIncomeDetails();
  }, []);



//fetch all income details

  return (
   <DashboardLayout Activemenu="Income">

      <div className='my-5 mx-auto'>
        <div className='grid grid-cols-1 gap-6'>
          <div className=''>
        <IncomeOverview transactions={incomedata}
        onAddIncome={()=>{setOpenAddIncomeModal(true)}}/>
          </div>
          <Incomelist
          transactions={incomedata}
          ondelete={(id)=>{
            setopendeleteAlert({show:true, data:id})

          }}
          ondowmload={handledownloadIncomedetails}
          />
        </div>
        <Modal isopen={OpenAddIncomeModal}
        onclose={()=>setOpenAddIncomeModal(false)}
         title="Add income">
          {/* <div>add income form</div> */}
          <Addincomeform onAddIncome={handleAddIncome}/>
        </Modal>
        <Modal isopen={opendeleteAlert.show}
        onclose={()=>setopendeleteAlert({show:false,data:null})}
         title="Delete Income">
          {/* <div>add income form</div> */}
         <DeleteAlert
         content="are you sure you want to delete?"
        ondelete={()=>deleteIncome(opendeleteAlert.data)}/>
        </Modal>
      </div>
      </DashboardLayout>
  )
}

export default Income