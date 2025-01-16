import React, { useState } from 'react'
import Nav from '../../components/Nav';
import SideNav from '../../components/SideNav';
import { SelectPicker, DatePicker, Button } from 'rsuite';
import { FaRegCheckCircle } from "react-icons/fa";
import { LuRefreshCcw } from "react-icons/lu";
import { IoMdArrowRoundBack } from "react-icons/io";
import useMyToaster from '../../hooks/useMyToaster';


const TransactionAdd = ({mode}) => {
  const inputvalidation = useMyToaster();
  const[inputval, setInputval] = useState({
    selectTransactiontype:'', purpose:'', transactionNumber:'', transactionDate:'',
    paymentMode:'', account:'', amount:'', noteRemark:''
  })
     
    const Updatebtn = (e) =>{
    if(inputval.selectTransactiontype === "" || inputval.purpose === "" || inputval. transactionNumber === "" ||
       inputval. transactionDate === "" || inputval.paymentMode === "" || inputval.account === "" || inputval.amount === "" || inputval.noteRemark === "")
        {
            return inputvalidation("fill the blank", "warning");
     }
    }

     const Resetbtn = () => {
      setInputval({
        selectTransactiontype:'', purpose:'', tranactionNumber:'', transactionDate:'',
        paymentMode:'', account:'', amount:'', noteRemark:''
      })
     }



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
                        <SelectPicker className='w-full' onChange={(e) =>
                           setInputval({...inputval, selectTransactiontype: e.target.valu})}
                            value={inputval.selectTransactiontype} />
                    </div>
                    <div>
                        <p className='ml-1 mb-1 mt-2'>Purpose</p>
                        <input type='text'onChange={(e) => setInputval({...inputval, purpose: e.target.value})} 
                          value={inputval.purpose}/>
                    </div>
                    <div>
                        <p className='ml-1 mb-1 mt-2'>Transaction Number</p>
                        <input type='number'onChange={(e) => setInputval({...inputval, transactionNumber: e.target.value})}
                          value={inputval.transactionNumber}/>
                    </div>
                     <div>
                      <p className='ml-1 mb-1 mt-2'>Transaction Date</p>
                        <input type='date' onChange={(e) => setInputval({...inputval, transactionDate: e.target.value})} 
                          value={inputval.transactionDate}/>
                     </div>
                 </div>    
                 <div className='w-full'>
                    <div>
                        <p className='ml-1 mb-1 '>Payment Mode</p>
                        <SelectPicker className='w-full' onChange={(e) => 
                          setInputval({...inputval, paymentMode: e.target.value})}
                         value={inputval.paymentMode} />
                    </div>
                    <div >
                      <p className='ml-1 mb-1 mt-2'>Account</p>
                       <SelectPicker className='w-full' onChange={(e) => 
                        setInputval({...inputval, account: e.target.value})}
                        value={inputval.account} />
                    </div>
                    <div>
                        <p className='ml-1 mb-1 mt-2'>Amount</p>
                        <input type='number' onChange={(e) => 
                          setInputval({...inputval, amount: e.target.value})}
                          value={inputval.amount} />
                    </div>
                    <div>
                        <p className='ml-1 mb-1 mt-2'>Note/Remark</p>
                        <input type='text' onChange={(e) => 
                          setInputval({...inputval, noteRemark: e.target.value})}
                          value={inputval.noteRemark}/>
                    </div>
                </div>          
              </div>
               <div className='flex justify-center pt-9 mb-6'>
                 <div className='flex rounded-sm bg-green-500 text-white'>
                  <FaRegCheckCircle className='mt-3 ml-2' />
                 <button className='p-2'onClick={Updatebtn}>{mode? "Update" : "Save"}</button>
                </div>
                 <div className='flex rounded-sm ml-4 bg-blue-500 text-white'>
                  <LuRefreshCcw className='mt-3 ml-2' />
                  <button className='p-2'onClick={Resetbtn}>Reset</button>
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
