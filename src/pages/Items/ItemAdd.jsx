import React, { useState } from 'react'
import Nav from '../../components/Nav';
import SideNav from '../../components/SideNav'
import { useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { FaRegCheckCircle } from "react-icons/fa";
import { LuRefreshCcw } from "react-icons/lu";
import { IoMdArrowRoundBack } from "react-icons/io";
import useMyToaster from '../../hooks/useMyToaster';
import { SelectPicker, DatePicker, Button } from 'rsuite';

const ItemAdd = ({mode}) => {
    const accountvalidation = useMyToaster();
    const editorRef = useRef(null);

     const [from, setFrom] = useState({
        title:'', selectTax:'', hsnSac:'', type:'', selectPrice:'', selectCategory:''
     })

     const savebutton = (e) => {
       if(from.title === ""|| from.selectTax === "" || from.hsnSac === "" || from.type === "" || from.selectCategory === "" || from.selectPrice === ""){
         return accountvalidation("fill the blank", "warning")                                                                                                               
       }
     }
       
        const fromvalueclear = (e) => {
            setFrom({
                title:'', selectTax:'', hsnSac:'', type:'', selectPrice:'', selectCategory:''
             })
        }

    return (
        <>
            <Nav title={"Item "} />
            <main id='main'>
                <SideNav />
                <div className='content__body'>
                    <div className='content__body__main bg-white '>
                        <div className='  flex justify-between  gap-5 flex-col lg:flex-row'>
                            <div className='w-full'>
                                <div >
                                    <p className='mb-2 '>Title</p>
                                    <input type='text' onChange={(e) => setFrom({...from, title: e.target.value})} value={from.title} />
                                </div>  
                                <div>
                                  <p className='mb-2 mt-2 ml-1'>Type</p>
                                  <select onChange={(e) => setFrom({...from, type: e.target.value})} value={from.type}>
                                        <option value={""}>
                                            --select--
                                        </option>
                                       <option value={"Product"}>
                                           Product
                                       </option>
                                       <option value={"Service"}>
                                            Service
                                       </option>
                                   </select>
                                </div>  
                                <div>
                                   <p className='mt-2 mb-2'>Sale Price</p>
                                   <input type="number" onChange={(e) => setFrom({...from, selectPrice: e.target.value})} value={from.selectPrice} />
                                </div>  
                            </div>
                            <div className='w-full pt-1'>
                                  <div>
                                    <p className='ml-1'>Select Category</p> 
                                     <SelectPicker className='w-full'  onChange={(e) => setFrom({...from, selectCategory: e.target.value})} value={from.selectCategory}  />
                                    </div>
                                <div>
                                   <p className='ml-1 mb-2 mt-2'>Select Tax</p> 
                                    <SelectPicker className='w-full'  onChange={(e) => setFrom({...from, selectTax: e.target.value})} value={from.selectTax}  />
                                   </div>
                                   <div>
                                    <p className=' mt-2 mb-2 ml-1'>HSN/SAC</p>
                                    <input type='text' onChange={(e) => setFrom({...from, hsnSac: e.target.value})} value={from.hsnSac} />
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

export default ItemAdd