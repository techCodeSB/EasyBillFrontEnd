import React from 'react'
import Nav from '../../components/Nav';
import SideNav from '../../components/SideNav';
import { SelectPicker, DatePicker, Button } from 'rsuite';
import { FaRegCheckCircle } from "react-icons/fa";
import { LuRefreshCcw } from "react-icons/lu";
import { IoMdArrowRoundBack } from "react-icons/io";

const TransactionAdd = () => {
  return (
    <>
       <Nav title={"Other transations"} />
      <main id="main">
        <SideNav />
         <div className='content__body '>
          <div className='content__body__main bg-white' >
              <div className='flex justify-between gap-4 flex-col lg:flex-row'>
                 <div className='w-full'>
                    <div>
                        <p className='ml-1 mb-2'> Select Transaction Type</p>
                        <SelectPicker className='w-full' />
                    </div>
                    <div>
                        <p className='ml-1 mb-1 mt-2'>Purpose</p>
                        <input type='text' />
                    </div>
                    <div>
                        <p className='ml-1 mb-1 mt-2'>Transaction Number</p>
                        <input type='number'/>
                    </div>
                     <div>
                      <p className='ml-1 mb-1 mt-2'>Transaction Date</p>
                        <input type='date'  />
                     </div>
                 </div>    
                 <div className='w-full'>
                    <div>
                        <p className='ml-1 mb-1 '>Payment Mode</p>
                        <SelectPicker className='w-full' />
                    </div>
                    <div >
                      <p className='ml-1 mb-1 mt-2'>Account</p>
                       <SelectPicker className='w-full' />
                    </div>
                    <div>
                        <p className='ml-1 mb-1 mt-2'>Amount</p>
                        <input type='number' />
                    </div>
                    <div>
                        <p className='ml-1 mb-1 mt-2'>Note/Remark</p>
                        <input type='text'/>
                    </div>
                </div>          
              </div>
               <div className='flex justify-center pt-9 mb-6'>
                 <div className='flex rounded-sm bg-green-500 text-white'>
                  <FaRegCheckCircle className='mt-3 ml-2' />
                 <button className='p-2'>Save</button>
                </div>
                 <div className='flex rounded-sm ml-4 bg-blue-500 text-white'>
                  <LuRefreshCcw className='mt-3 ml-2' />
                  <button className='p-2'>Reset</button>
                 </div>
                 {/* <div className="flex rounded-sm ml-4 bg-gray-500 text-white">
                   <IoMdArrowRoundBack className='mt-3 ml-2' />
                     <button className='p-2'>Back</button>
                     </div>*/}
                 </div>  
          </div>
        </div> 
       </main>   
    </>
  )
}

export default TransactionAdd
