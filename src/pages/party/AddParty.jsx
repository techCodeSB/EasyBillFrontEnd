import React, { useRef, useState } from 'react'
import Nav from '../../components/Nav';
import SideNav from '../../components/SideNav';
import { SelectPicker } from 'rsuite';
import { countryList, statesAndUTs } from '../../helper/data';
import { Editor } from '@tinymce/tinymce-react';
import { BiReset } from 'react-icons/bi';
import { FaRegCheckCircle } from 'react-icons/fa';
import useMyToaster from '../../hooks/useMyToaster';
import Cookies from 'js-cookie'

const AddParty = () => {
  const editorRef = useRef(null);
  const toast = useMyToaster()
  const [partyData, setPartyData] = useState({
    name: "", type: "", contactNumber: "", address: "",
    pan: "", gst: "", country: "", state: "", openingBalance: "0",
    details: ''
  })

  const saveParty = async () => {
    if ([partyData.name, partyData.type, partyData.contactNumber, partyData.address, partyData.gst, partyData.pan, partyData.country, partyData.state].some((field) => field === "")) {
      return toast("fill the require", "error")
    }

    try {
      const url = process.env.REACT_APP_API_URL + "/party/add";
      const token = Cookies.get("token");
      const req = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ ...partyData, token })
      })
      const res = await req.json();
      if (req.status !== 200 || res.err) {
        return toast(res.err, 'error');
      }

      setPartyData({
        name: "", type: "", contactNumber: "", address: "",
        pan: "", gst: "", country: "", state: "", openingBalance: "0",
        details: ''
      });

      return toast("Party create successfully", 'success');


    } catch (error) {
      return toast("Something went wrong", "error")
    }

  }

  const clear = () => {
    setPartyData({
      name: "", type: "", contactNumber: "", address: "",
      pan: "", gst: "", country: "", state: "", openingBalance: "0",
      details: ''
    })
  }





  return (
    <>
      <Nav title={"Add Party"} />
      <main id='main'>
        <SideNav />
        <div className="content__body">
          <div className="bg-white content__body__main ">
            <div className='grid grid-cols-1 lg:grid-cols-2 lg:gap-4 gap-0'>
              {/* First Column */}
              <div className='flex flex-col gap-2'>
                <div>
                  <p className='mb-1'>Party Name</p>
                  <input type="text"
                    onChange={(e) => setPartyData({ ...partyData, name: e.target.value })}
                    value={partyData.name}
                  />
                </div>
                <div>
                  <p className='mb-1'>Type</p>
                  <select onChange={(e) => setPartyData({ ...partyData, type: e.target.value })}
                    value={partyData.type}>
                    <option value="none">--Select--</option>
                    <option value="customer">Customer</option>
                    <option value="supplier">Supplier</option>
                    <option value="both">Both</option>
                  </select>
                </div>
                <div>
                  <p className='mb-1'>Contact Number</p>
                  <input type="text" onChange={(e) => setPartyData({ ...partyData, contactNumber: e.target.value })}
                    value={partyData.contactNumber} />
                </div>
                <div>
                  <p className='mb-1'>Address</p>
                  <textarea rows={1}
                    value={partyData.address}
                    onChange={(e) => setPartyData({ ...partyData, address: e.target.value })}
                  ></textarea>
                </div>
              </div>

              {/* Second Column */}
              <div className='flex flex-col gap-2'>
                <div>
                  <p className='mb-1'>PAN</p>
                  <input type="text" onChange={(e) => setPartyData({ ...partyData, pan: e.target.value })}
                    value={partyData.pan} />
                </div>
                <div>
                  <p className='mb-1'>GST Number</p>
                  <input type="text" onChange={(e) => setPartyData({ ...partyData, gst: e.target.value })}
                    value={partyData.gst} />
                </div>
                <div>
                  <p className='mb-1'>Select Country</p>
                  <SelectPicker className='w-full' data={countryList}
                    onChange={(v) => setPartyData({ ...partyData, country: v })}
                    value={partyData.country}
                  />
                </div>
                <div>
                  <p className='mb-1'>Select State</p>
                  <SelectPicker className='w-full' data={statesAndUTs}
                    onChange={(v) => setPartyData({ ...partyData, state: v })}
                    value={partyData.state}
                  />
                </div>
                <div>
                  <p className='mb-1'>Opening Balance</p>
                  <input type="text"
                    onChange={(e) => setPartyData({ ...partyData, openingBalance: e.target.value })}
                    value={partyData.openingBalance}
                  />
                </div>
              </div>
            </div>
            <p className='my-2'>Details/Remark</p>
            <Editor
              onEditorChange={(v, editor) => {
                setPartyData({ ...partyData, details: editor.getContent() })
              }}
              value={partyData.details}
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

            <div className='w-full flex justify-center gap-3 mt-3'>
              <button
                onClick={saveParty}
                className='bg-green-500 hover:bg-green-400 text-md text-white rounded w-[60px] flex items-center justify-center gap-1 py-2'>
                <FaRegCheckCircle />
                Save
              </button>
              <button
                onClick={clear}
                className='bg-blue-800 hover:bg-blue-700 text-md text-white rounded w-[60px] flex items-center justify-center gap-1 py-2'>
                <BiReset />
                Reset
              </button>
            </div>
          </div>

        </div>
      </main >
    </>
  )
}

export default AddParty;