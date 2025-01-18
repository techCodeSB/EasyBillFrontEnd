import React, { useEffect, useState } from 'react'
import Nav from '../../components/Nav';
import SideNav from '../../components/SideNav'
import { useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { FaRegCheckCircle } from "react-icons/fa";
import { LuRefreshCcw } from "react-icons/lu";
// import { IoMdArrowRoundBack } from "react-icons/io";
import useMyToaster from '../../hooks/useMyToaster';
import { SelectPicker } from 'rsuite';
import Cookies from 'js-cookie';
import { useParams } from 'react-router-dom';
import useApi from '../../hooks/useApi';



const ItemAdd = ({ mode }) => {
  const toast = useMyToaster();
  const { getApiData } = useApi()
  const editorRef = useRef(null);
  const [form, setForm] = useState({
    title: '', type: '', salePrice: '', category: '', details: '', hsn: '', tax: ''
  })
  const { id } = useParams();
  const [category, setCategory] = useState([])
  const [tax, setTax] = useState([]);
  const [unit, setUnit] = useState([]);
  const [fullCategory, setFullCategory] = useState([]);
  const unitRowSet = {
    unit: "", conversion: '', opening: '', alert: ''
  }
  const [unitRow, setUnitRow] = useState([unitRowSet]);



  useEffect(() => {
    if (mode) {
      const get = async () => {
        const url = process.env.REACT_APP_API_URL + "/item/get";
        const cookie = Cookies.get("token");

        const req = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": 'application/json'
          },
          body: JSON.stringify({ token: cookie, id: id })
        })
        const res = await req.json();
      }

      get();
    }
  }, [mode])

  // Get Data
  useEffect(() => {
    const get = async () => {
      // Category
      {
        const { data } = await getApiData("category");
        setCategory([...data.map(({ _id, title }, _) => ({ value: _id, label: title }))]);
        setFullCategory([...data]);
      }
      // Tax
      {
        const { data } = await getApiData("tax");
        setTax([...data.map(({ title }, _) => ({ label: title, value: title }))])
      }
      // Unit
      {
        const { data } = await getApiData("unit");
        setUnit([...data.map(({ _id, title }, _) => ({ label: title, value: _id }))])
      }
    }
    get()

  }, [])


  const savebutton = async (e) => {
    if (form.title === "" || form.tax === "" || form.hsn === "" || form.type === "" || form.category === "" || form.salePrice === "") {
      return toast("fill the blank", "error")
    }

    try {
      const url = process.env.REACT_APP_API_URL + "/item/add";
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

      if (!mode) fromvalueclear();

      return toast(!mode ? "Item create success" : "Item update success", 'success');

    } catch (error) {
      return toast("Something went wrong", "error")
    }

  }

  const fromvalueclear = () => setForm({
    title: '', type: '', salePrice: '', category: '', details: '', hsn: ''
  })

  const categoryChange = (v) => {
    fullCategory.forEach((c, _) => {
      if (c._id === v) {
        setForm({ ...form, hsn: c.hsn, category: v, tax: c.tax.title })
      }
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
                  <input type='text' onChange={(e) => setForm({ ...form, title: e.target.value })} value={form.title} />
                </div>
                <div>
                  <p className='mb-2 mt-2 ml-1'>Type</p>
                  <select onChange={(e) => setForm({ ...form, type: e.target.value })} value={form.type}>
                    <option value={""}>--select--</option>
                    <option value={"goods"}>Goods</option>
                    <option value={"service"}>Service</option>
                  </select>
                </div>
                <div>
                  <p className='mt-2 mb-2'>Sale Price</p>
                  <input type="text" onChange={(e) => setForm({ ...form, salePrice: e.target.value })} value={form.salePrice} />
                </div>
              </div>
              <div className='w-full pt-1'>
                <div>
                  <p className='ml-1'>Select Category</p>
                  <SelectPicker className='w-full'
                    data={category}
                    onChange={(v) => categoryChange(v)}
                    value={form.category} />
                </div>
                <div>
                  <p className='ml-1 mb-2 mt-2'>Select Tax</p>
                  <SelectPicker className='w-full'
                    data={tax}
                    onChange={(v) => setForm({ ...form, tax: v })}
                    value={form.tax} />
                </div>
                <div>
                  <p className=' mt-2 mb-2 ml-1'>HSN/SAC</p>
                  <input type='text'
                    onChange={(e) => setForm({ ...form, hsn: e.target.value })}
                    value={form.hsn} />
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
                <button className='p-2' onClick={savebutton}>{mode ? "Update" : "Save"}</button>
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