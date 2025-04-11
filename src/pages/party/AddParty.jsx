import React, { useEffect, useRef, useState } from 'react'
import Nav from '../../components/Nav';
import SideNav from '../../components/SideNav';
import { SelectPicker } from 'rsuite';
import { countryList, statesAndUTs } from '../../helper/data';
import { Editor } from '@tinymce/tinymce-react';
import { BiReset } from 'react-icons/bi';
import { FaRegCheckCircle } from 'react-icons/fa';
import useMyToaster from '../../hooks/useMyToaster';
import Cookies from 'js-cookie';
import { useParams } from 'react-router-dom';
import MySelect2 from '../../components/MySelect2';



const AddParty = ({ mode }) => {
  return (
    <>
      <Nav title={mode ? "Update Party" : "Add Party"} />
      <main id='main'>
        <SideNav />
        <div className="content__body">
          <PartyComponent mode={mode} />
        </div>
      </main >
    </>
  )
}



const PartyComponent = ({ mode, save }) => {
  const editorRef = useRef(null);
  const { id } = useParams()
  const toast = useMyToaster()
  const [partyData, setPartyData] = useState({
    name: "", type: "", contactNumber: "", billingAddress: "", shippingAddress: '',
    pan: "", gst: "", openingBalance: "0", details: '', email: '',
    partyCategory: '', creditPeriod: '', creditLimit: '', dob: '', partyCategory: ''
  })





  useEffect(() => {
    if (mode) {
      const get = async () => {
        const url = process.env.REACT_APP_API_URL + "/party/get";
        const cookie = Cookies.get("token");

        const req = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": 'application/json'
          },
          body: JSON.stringify({ token: cookie, id: id })
        })
        const res = await req.json();
        console.log(res)
        setPartyData({ ...partyData, ...res.data });
      }

      get();
    }
  }, [mode])



  const saveParty = async () => {
    if ([partyData.name, partyData.type, partyData.contactNumber, partyData.billingAddress,
    partyData.gst, partyData.pan]
      .some((field) => field === "")) {
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
        body: JSON.stringify(!mode ? { ...partyData, token } : { ...partyData, token, update: true, id: id })
      })
      const res = await req.json();
      if (req.status !== 200 || res.err) {
        return toast(res.err, 'error');
      }

      if (!mode) {
        clear();
      }

      toast(!mode ? "Party create success" : "Party update success", 'success');
      // for close sidebar in MySelect2
      if (save) {
        save(true)
      }
      return;

    } catch (error) {
      console.log(error)
      return toast("Something went wrong", "error")
    }

  }

  const clear = () => {
    setPartyData({
      name: "", type: "", contactNumber: "", address: "",
      pan: "", gst: "", country: "", state: "", openingBalance: "0",
      details: '', email: '', billingAddress: '', shippingAddress: '',
      creditPeriod: '', creditLimit: '', dob: '', partyCategory: ''
    })
  }


  return (
    <div className="bg-white content__body__main ">
      <div className='grid grid-cols-1 lg:grid-cols-2 lg:gap-4 gap-0'>
        {/* First Column */}
        <div className='flex flex-col gap-2'>
          <div>
            <p className='mb-1'>Party Name <span className='text-red-600'>*</span></p>
            <input type="text"
              onChange={(e) => setPartyData({ ...partyData, name: e.target.value })}
              value={partyData.name}
            />
          </div>
          <div>
            <p className='mb-1'>Contact Number <span className='text-red-600'>*</span></p>
            <input type="text" onChange={(e) => setPartyData({ ...partyData, contactNumber: e.target.value })}
              value={partyData.contactNumber} />
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
            <p className='mb-1'>Credit Period </p>
            <input type="text"
              onChange={(e) => setPartyData({ ...partyData, creditPeriod: e.target.value })}
              value={partyData.creditPeriod}
            />
          </div>

          <div>
            <p className='mb-1'>Party Category </p>
            <MySelect2
              model={"partycategory"}
              onType={(v) => setPartyData({ ...partyData, partyCategory: v })}
              value={partyData.partyCategory}
            />
          </div>

          <div>
            <p className='mb-1'>Billing Address</p>
            <textarea rows={3}
              value={partyData.billingAddress}
              onChange={(e) => setPartyData({ ...partyData, billingAddress: e.target.value })}
            ></textarea>
          </div>

        </div>

        {/* Second Column */}
        <div className='flex flex-col gap-2'>

          <div className='flex flex-col md:flex-row gap-2 items-center w-full'>
            <div className='w-full'>
              <p className='mb-1'>PAN</p>
              <input type="text"
                onChange={(e) => setPartyData({ ...partyData, pan: e.target.value.toUpperCase() })}
                value={partyData.pan.toUpperCase()}
              />
            </div>

            <div className='w-full'>
              <p className='mb-1'>GST Number</p>
              <input type="text"
                onChange={(e) => setPartyData({ ...partyData, gst: e.target.value.toUpperCase() })}
                value={partyData.gst.toUpperCase()}
              />
            </div>
          </div>

          <div>
            <p className='mb-1'>Email</p>
            <input type="email"
              onChange={(e) => setPartyData({ ...partyData, email: e.target.value })}
              value={partyData.email} />
          </div>

          <div>
            <p className='mb-1'>Opening Balance</p>
            <input type="text"
              onChange={(e) => setPartyData({ ...partyData, openingBalance: e.target.value })}
              value={partyData.openingBalance}
            />
          </div>

          <div>
            <p className='mb-1'>Credit Limit</p>
            <input type="text"
              onChange={(e) => setPartyData({ ...partyData, creditLimit: e.target.value })}
              value={partyData.creditLimit}
            />
          </div>

          <div>
            <p className='mb-1'>DOB</p>
            <input type="date"
              onChange={(e) => setPartyData({ ...partyData, dob: e.target.value })}
              value={partyData.dob ? new Date(partyData.dob).toISOString().split('T')[0] : ''}
            />
          </div>

          <div>
            <div className='mb-1 mt-1 flex items-center'>
              <p>Shipping Address</p>
              <input type="checkbox" className='ml-5' onChange={(e) => {
                if (e.target.checked) {
                  setPartyData({ ...partyData, shippingAddress: partyData.billingAddress })
                } else {
                  setPartyData({ ...partyData, shippingAddress: "" })
                }
              }} />
              <p>Same as billing address</p>
            </div>
            <textarea rows={3}
              value={partyData.shippingAddress}
              onChange={(e) => setPartyData({ ...partyData, shippingAddress: e.target.value })}
            ></textarea>
          </div>

        </div>
      </div>

      <div className='w-full flex justify-center gap-3 mt-5 my-3'>
        <button
          onClick={saveParty}
          className='bg-green-500 hover:bg-green-400 text-md text-white rounded w-[90px] flex items-center justify-center gap-1 py-2'>
          <FaRegCheckCircle />
          {!mode ? "Save" : "Update"}
        </button>
        <button
          onClick={clear}
          className='bg-blue-800 hover:bg-blue-700 text-md text-white rounded w-[90px] flex items-center justify-center gap-1 py-2'>
          <BiReset />
          Reset
        </button>
      </div>
    </div>
  )
}

export {
  PartyComponent
}

export default AddParty;