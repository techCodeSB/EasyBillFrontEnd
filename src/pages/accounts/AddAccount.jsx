import React, { useState } from 'react'
import Nav from '../../components/Nav';
import SideNav from '../../components/SideNav'
import { useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { FaRegCheckCircle } from "react-icons/fa";
import { LuRefreshCcw } from "react-icons/lu";
import { IoMdArrowRoundBack } from "react-icons/io";
import useMyToaster from '../../hooks/useMyToaster';

const AddAccount = ({mode}) => {
    const accountvalidation = useMyToaster();
    const editorRef = useRef(null);

     const [from, setFrom] = useState({
        title:'', accountName:'', accountNumber:'', ifscCode:'', bankName:'', openingBalance:'', type:''
     })

     const savebutton = (e) => {
       if(from.title === "" || from.accountName === "" || from.accountNumber === "" || 
       from.ifscCode === "" || from.bankName === "" || from.openingBalance === "" || from.type === ""){
         return accountvalidation("fill the blank", "warning")                                                                                                               
       }
     }
       
        const fromvalueclear = (e) => {
            setFrom({
                title:'', accountName:'', accountNumber:'', ifscCode:'', bankName:'', openingBalance:'', type:''
             })
        }

    return (
        <>
            <Nav title={"Account"} />
            <main id='main'>
                <SideNav />
                <div className='content__body'>
                    <div className='content__body__main bg-white '>
                        <div className='flex justify-between gap-6  flex-col lg:flex-row'>
                            <div className='w-full'>
                                <div className='p-2'>
                                    <p className='pb-1'>Title</p>
                                    <input type='text' onChange={(e) => setFrom({...from, title: e.target.value})} value={from.title} />
                                </div>
                                <div className='p-2'>
                                    <p className='pb-1'>Account Holder Name (If Bank)</p>
                                    <input type='text' onChange={(e) => setFrom({...from, accountName: e.target.value})} value={from.accountName} />
                                </div>
                                <div className='p-2'>
                                    <p className='pb-1'>Account Number (If Bank)</p>
                                    <input type="number" onChange={(e) => setFrom({...from, accountNumber: e.target.value})} value={from.accountNumber} />
                                </div>
                            </div>
                            <div className='w-full'>
                                <div className='p-2'>
                                    <p className='pb-1'>IFSC Code (If Bank)</p>
                                    <input type='text' onChange={(e) => setFrom({...from, ifscCode: e.target.value })} value={from.ifscCode}/>
                                </div>
                                <div className='p-2'>
                                    <p className='pb-1'>Bank Name (If Bank)</p>
                                    <input type='text' onChange={(e) => setFrom({...from, bankName: e.target.value})} value={from.bankName} />
                                </div>
                                <div className='p-2'>
                                    <p className='pb-1'>Opening Balance</p>
                                    <input type="number" onChange={(e) => setFrom({...from, openingBalance: e.target.value})} value={from.openingBalance} />
                                </div>
                                <div className='ml-2 pt-2 '>
                                    <p className='pb-2'>Type</p>
                                    <select onChange={(e) => setFrom({...from, type: e.target.value})} value={from.type} >
                                        <option value={""}>
                                            --Select--
                                        </option>
                                        <option value={"Cash"}>
                                            Cash
                                        </option>
                                        <option value={"Bank"}>
                                            Bank
                                        </option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className='mt-3 '>
                            <p className='ml-2 pb-2'>Details</p>
                            <Editor 
                                apiKey='765rof3c4qgyk8u59xk0o3vvhvji0y156uwtbjgezhnbcct7'
                                onInit={(_evt, editor) => editorRef.current = editor}
                                init={{  
                                     height: 300,
                                      menubar: false,
                                       plugins: [
                                         'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                                          'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                                         'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
                                     ],
                                       toolbar: 'undo redo | blocks | ' +
                                         'bold italic forecolor | alignleft aligncenter ' +
                                         'alignright alignjustify | bullist numlist outdent indent | ' +
                                         'removeformat | help',
                                       content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                                }}
                            />
                        </div>
                       <div className='flex justify-center pt-9 mb-6'>
                             <div className='flex rounded-sm bg-green-500 text-white'>
                              <FaRegCheckCircle className='mt-3 ml-2' />
                                <button className='p-2' onClick={savebutton}>{mode? "Update" : "Save"}</button>
                            </div>
                              <div className='flex rounded-sm ml-4 bg-blue-500 text-white'>
                                <LuRefreshCcw className='mt-3 ml-2' />
                                 <button className='p-2' onClick={fromvalueclear}>Reset</button>
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

export default AddAccount