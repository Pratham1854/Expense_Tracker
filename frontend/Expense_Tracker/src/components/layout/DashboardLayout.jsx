import React from 'react'
import { useContext } from 'react'
import { UserContext } from '../../context/UserContext'
import Navbar from './Navbar'
import Sidemenu from './Sidemenu'

const DashboardLayout = ({children,Acitvemenu}) => {
    const user=useContext(UserContext)
  return (
    <div className=''>
        <Navbar Acitvemenu={Acitvemenu}/>
        {user &&
        (
            <div className='flex'>
            <div className='max-[1080px]:hidden'>
                <Sidemenu Acitvemenu={Acitvemenu}/>
            </div>
            <div className='grow mx-5'>{children}</div>
            </div>
        )}


    </div>
  )
}

export default DashboardLayout