import React from 'react'
import Nav from '../components/Nav'
import SideNav from '../components/SideNav';
import MyBreadCrumb from '../components/BreadCrumb';
import { FaArrowDown } from "react-icons/fa";
import { FaArrowTrendUp } from "react-icons/fa6";
import { FaArrowUp } from "react-icons/fa";
import { PiPrinterFill } from "react-icons/pi";
import { FaCopy } from "react-icons/fa";
import { FaFilePdf } from "react-icons/fa";
import { FaFileExcel } from "react-icons/fa";


document.title = 'Dashboard';

const Dashboard = () => {
  return (
    <>
      <Nav />
      <main id='main'>
        <SideNav />
        <div className='content__body'>
          <MyBreadCrumb title={"Dashboard"} links={[
            { name: "Dashboard", link: "/admin/dashboard" },
            { name: "Analytics", link: null }
          ]} />

          <div className='flex justify-between gap-9 w-[100%] p-5'>
            <div className='w-[30%]'>
              <div className='bg-red-400'>
                <div className="p-2 pb-5 pt-3 flex justify-between bg-white h-auto">
                  <p className='text-2xl  text-green-400  font-semibold '>3594.6</p>
                  <div className=' pt-5 text-2xl '>
                    <FaArrowDown />
                  </div>
                </div>
                <div className=' bg-green-400 w-full h-auto flex  justify-between'>
                  <p className='p-2 text-white'>To Collect</p>
                  <div className=' pt-3 mr-3 text-white text-lg'>
                    <FaArrowTrendUp />
                  </div>
                </div>
              </div>
              <div className='w-full' >
                <div className=' pb-8 p-2 mt-7 flex justify-between bg-white w-full h-auto '>
                  <p className='text-orange-400 text-2xl  font-semibold'>424.8</p>
                  <div className=' text-2xl '>
                    <FaArrowUp />
                  </div>
                </div>
                <div className='flex justify-between bg-orange-300  w-full h-auto'>
                  <p className=' text-white p-2'>To Pay </p>
                  <div className=' pt-3 mr-3 text-white text-lg'>
                    <FaArrowTrendUp />
                  </div>
                </div>
              </div>
            </div>
            <div className='bg-white shadow-sm w-[70%] p-4 pl-5'>
              <div>
                <p className='text-lg font-bold'>Account Wise Balance</p>
              </div>
              <div className='flex gap-4 
               pt-7 '>
              <PiPrinterFill  className='bg-blue-500 w-[40px] h-[40px] rounded-full'/>
              <FaCopy />
              <FaFilePdf />
              <FaFileExcel />
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}

export default Dashboard