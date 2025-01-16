import React, { useEffect, useState } from 'react'
import Nav from '../../components/Nav';
import SideNav from '../../components/SideNav'
import { useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { FaRegCheckCircle } from "react-icons/fa";
import { LuRefreshCcw } from "react-icons/lu";
import useMyToaster from '../../hooks/useMyToaster';
import { SelectPicker } from 'rsuite';
import { useParams } from 'react-router-dom';
import Cookies from 'js-cookie';

<<<<<<< HEAD
=======
const CategoryAdd = ({mode}) => {
    const accountvalidation = useMyToaster();
    const editorRef = useRef(null);
>>>>>>> a64051297b582e854a46d398afb53de903b47596

const CategoryAdd = ({ mode }) => {
  const accountvalidation = useMyToaster();
  const editorRef = useRef(null);
  const [form, setForm] = useState({ title: '', tax: '', hsn: '', type: '', details: "" })
  const { id } = useParams();
  const toast = useMyToaster();


<<<<<<< HEAD
  useEffect(() => {
    if (mode) {
      const get = async () => {
        const url = process.env.REACT_APP_API_URL + "/category/get";
        const cookie = Cookies.get("token");

        const req = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": 'application/json'
          },
          body: JSON.stringify({ token: cookie, id: id })
        })
        const res = await req.json();
        setForm({ ...form, ...res.data });
      }

      get();
    }
  }, [mode])


  const savebutton = async (e) => {
    if (form.title === "" || form.tax === "" || form.hsn === "" || form.type === "") {
      return accountvalidation("fill the blank", "error")
    }

    try {
      const url = process.env.REACT_APP_API_URL + "/category/add";
      const token = Cookies.get("token");
      const req = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(!mode ? { ...form, token } : { ...form, token, update: true, id: id })
      })
      const res = await req.json();
      if (req.status !== 200 || res.err) {
        return toast(res.err, 'error');
      }

      if (!mode) {
        setForm({ title: "", details: '' });
      }

      return toast(!mode ? "Category create success" : "Category update success", 'success');


    } catch (error) {
      return toast("Something went wrong", "error")
    }

  }

  const fromvalueclear = (e) => {
    setForm({
      title: '', tax: '', hsn: '', type: ''
    })
  }

  return (
    <>
      <Nav title={"Item Category"} />
      <main id='main'>
        <SideNav />
        <div className='content__body'>
          <div className='content__body__main bg-white '>
            <div className='  flex justify-between  gap-5 flex-col lg:flex-row'>
              <div className='w-full'>
                <div >
                  <p className='mb-2 '>Title</p>
                  <input type='text' onChange={(e) => setForm({ ...form, title: e.target.value })} value={form.title} />
                </div>
                <div>
                  <p className='ml-1 mb-2 mt-2'>Select Tax</p>
                  <SelectPicker className='w-full' onChange={(e) => setForm({ ...form, tax: e.target.value })} value={form.tax} />
                </div>
              </div>
              <div className='w-full pt-1'>
                <div>
                  <p className='mb-2 ml-1'>HSN/SAC</p>
                  <input type='text' onChange={(e) => setForm({ ...form, hsn: e.target.value })} value={form.hsn} />
                </div>
                <div>
                  <p className='mb-2 mt-2 ml-1'>Type</p>
                  <select onChange={(e) => setForm({ ...form, type: e.target.value })} value={form.type}>
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
              </div>
            </div>
            <div className='mt-3 '>
              <p className='ml-2 pb-2'>Details</p>
              <Editor
                onEditorChange={(v, editor) => {
                  setForm({ ...form, details: editor.getContent() })
                }}
                value={form.details}
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
                <button className='p-2' onClick={savebutton}>Save</button>
              </div>
              <div className='flex rounded-sm ml-4 bg-blue-500 text-white'>
                <LuRefreshCcw className='mt-3 ml-2' />
                <button className='p-2' onClick={fromvalueclear}>Reset</button>
              </div>
              {/* <div className="flex rounded-sm ml-4 bg-gray-500 text-white">
=======
    return (
        <>
            <Nav title={"Item Category"} />
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
                                   <p className='ml-1 mb-2 mt-2'>Select Tax</p> 
                                <SelectPicker className='w-full'  onChange={(e) => setFrom({...from, selectTax: e.target.value})} value={from.selectTax}  />
                                </div>
                            </div>
                            <div className='w-full pt-1'>
                                <div>
                                    <p className='mb-2 ml-1'>HSN/SAC</p>
                                    <input type='text' onChange={(e) => setFrom({...from, hsnSac: e.target.value})} value={from.hsnSac} />
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
                                <button className='p-2' onClick={savebutton}>{mode ? "Update" : "Save"}</button>
                            </div>
                              <div className='flex rounded-sm ml-4 bg-blue-500 text-white'>
                                <LuRefreshCcw className='mt-3 ml-2' />
                                 <button className='p-2' onClick={fromvalueclear}>Reset</button>
                              </div>
                             {/* <div className="flex rounded-sm ml-4 bg-gray-500 text-white">
>>>>>>> a64051297b582e854a46d398afb53de903b47596
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

export default CategoryAdd