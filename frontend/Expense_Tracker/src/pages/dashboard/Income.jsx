import React from 'react'
import DashboardLayout from '../../components/layout/DashboardLayout'
import {useState,useEffect} from "react"
import axiosInstance from '../../utils/axiosInstance'
import IncomeOverview from '../../components/income/IncomeOverview'
import { API_PATHS } from '../../utils/apiPath'
import Modal from '../../components/Modal'
import Addincomeform from '../../components/income/Addincomeform'
const Income = () => {
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
const handleAddIncome=async(Income)=>{};
 // delete income
const deleteIncome=async(id)=>{};

const handledownloadIncomedetails=async()=>{};

   

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
        </div>
        <Modal isopen={OpenAddIncomeModal}
        onclose={()=>setOpenAddIncomeModal(false)}
         title="Add income">
          {/* <div>add income form</div> */}
          <Addincomeform onAddIncome={handleAddIncome}/>
        </Modal>
      </div>
      </DashboardLayout>
  )
}

export default Income