import React, { useEffect, useState } from 'react';
import DashboardLayout from '../../components/layout/DashboardLayout';
import { useUserAuth } from '../../hooks/useUserAuth';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPath';
import InfoCard from '../../components/cards/InfoCard';
import { LuHandCoins, LuWalletMinimal } from 'react-icons/lu';
import { IoMdCard } from 'react-icons/io'; // ✅ Corrected icon import
import { addThousandSeparator } from '../../utils/helper';
import RecentTransaction from '../../components/dashboard/RecentTransaction';
import FinanceOverview from '../../components/dashboard/FinanceOverview';
import Expensetransaction from '../../components/dashboard/Expensetransaction';
import Last30DaysExpense from '../../components/dashboard/Last30DaysExpense';
import Recentincomewithchart from '../../components/dashboard/Recentincomewithchart';
import Recentincome from '../../components/dashboard/Recentincome';

const Home = () => {
  useUserAuth();
  const navigate = useNavigate();
  const [dashboarddata, setDashboarddata] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchDashboardData = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const response = await axiosInstance.get(API_PATHS.DASHBOARD.GET_DATA);
      if (response.data) {
        setDashboarddata(response.data);
      }
    } catch (error) {
      console.error('Something went wrong:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  return (
   <DashboardLayout Activemenu="Dashboard"> {/* ✅ Fixed prop typo */}

      <div className='my-5 mx-auto'>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
          {dashboarddata ? (
            <>
              <InfoCard
                icon={<IoMdCard />}
                label="Total Balance"
                value={addThousandSeparator(dashboarddata.totalBalance || 0)}
                color="bg-blue-800"
              />
                 <InfoCard
                icon={<LuWalletMinimal/>}
                label="Total Income"
                value={addThousandSeparator(dashboarddata.totalIncome || 0)}
                color="bg-green-600"
              />
                 <InfoCard
                icon={<LuHandCoins />}
                label="Total Expense"
                value={addThousandSeparator(dashboarddata.totalExpense || 0)}
                color="bg-red-500"
              />
            
            </>
          ) : (
            <div className="col-span-full text-center text-gray-500">
              {loading ? 'Loading dashboard data...' : 'No data available.'}
            </div>
          )}
        </div>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mt-6'>
          <RecentTransaction
          transaction={dashboarddata?.recentTransactions}
          onSeeMore={()=>navigate("/expense")}
          />
          {console.log(dashboarddata)}
          <FinanceOverview
           totalbalance={dashboarddata?.totalBalance || 0} 
           totalincome={dashboarddata?.totalIncome || 0}
           totalexpense={dashboarddata?.totalExpense || 0}
           />
           { <Expensetransaction
  transactions={dashboarddata?.last30DaysExpenses?.transactions || []}
  OnSeeMore={() => navigate("/expense")}
/> }
           <Last30DaysExpense data={dashboarddata?.last30DaysExpenses.transactions || []}/>
           <Recentincomewithchart
           data={dashboarddata?.last60DaysIncome?.transactions?.slice(0,4) || []}
           totalincome={dashboarddata?.totalIncome || 0}
          />
          <Recentincome
          transactions={dashboarddata?.last60DaysIncome?.transactions ||[]}
           OnSeeMore={() => navigate("/income")}
          />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Home;
