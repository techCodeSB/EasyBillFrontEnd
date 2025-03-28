import React, { useEffect, useState } from 'react';
import { IoClose } from "react-icons/io5";
import useMyToaster from '../hooks/useMyToaster';
import Cookies from 'js-cookie';
import { IoIosSearch } from "react-icons/io";
import { useDispatch, useSelector } from 'react-redux';
import { toggle as itemToggle } from '../store/itemModalSlice'
import { toggle } from '../store/partyModalSlice';
import AddPartyModal from './AddPartyModal';
import AddItemModal from './AddItemModal';




const MySelect2 = ({ model, onType, value }) => {
  const toast = useMyToaster();
  const [selectedValue, setSelectedValue] = useState('');
  const [selectedData, setSelectedData] = useState()
  const [showDropDown, setShowDropDown] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [searchList, setSearchList] = useState([]);
  const dispatch = useDispatch();
  const getPartyModalState = useSelector((store) => store.partyModalSlice.show);
  const getItemModalState = useSelector((store) => store.itemModalSlice.show);



  useEffect(() => {

    const get = async () => {
      try {
        if (searchText) {
          const url = process.env.REACT_APP_API_URL + `/${model}/get`;
          const req = await fetch(url, {
            method: "POST",
            headers: {
              "Content-Type": 'application/json'
            },
            body: JSON.stringify({ token: Cookies.get("token"), search: searchText })
          })
          const res = await req.json();

          setSearchList([...res.data])
        }

      } catch (error) {
        return toast("Something went wrong to select", 'error')
      }
    }

    get()

  }, [searchText])



  useEffect(() => {
    if (selectedData) {
      setSelectedValue(selectedData.title || selectedData.name);
      if (model === "item") {
        onType(selectedData.title);
      }
      else {
        onType(selectedData._id);
      }
    }
 
  }, [selectedData])


  

  // if alredy value define
  useEffect(() => {
    if (value && model !== "item") {
      const get = async () => {
        try {
          const url = process.env.REACT_APP_API_URL + `/${model}/get`;
          const req = await fetch(url, {
            method: "POST",
            headers: {
              "Content-Type": 'application/json'
            },
            body: JSON.stringify({ token: Cookies.get("token"), id: value })
          })
          const res = await req.json();

          setSelectedData(res.data)

        } catch (error) {
          return toast("Something went wrong", 'error')
        }

      }

      get()
    }

    if(model === "item"){
      setSearchText(value);
      setSelectedValue(value);
    }
  }, [value])




  return (
    <>
      <div className='relative'>
        <AddPartyModal open={getPartyModalState} />
        <AddItemModal open={getItemModalState} />

        <input type="text"
          className='w-full border rounded'
          value={selectedValue || searchText}
          onFocus={() => setShowDropDown(true)}
          onBlur={() => setShowDropDown(false)}
          onChange={(e) => {
            setSearchText(e.target.value)
          }}
          placeholder='Search...'
        />
        {selectedValue ? <IoClose
          className='absolute right-2 top-[5px] text-[16px] cursor-pointer'
          onClick={() => {
            setSelectedValue("")
            setSelectedData()
            setSearchText('')
            setSearchList([]);
            onType('')
          }}
        /> : <IoIosSearch className='absolute right-2 top-[5px] text-[16px] cursor-pointer' />}

        {/* List dropdown */}
        {showDropDown && <div className='w-full max-h-[250px] overflow-y-auto p-1 bg-white absolute z-50 border'>
          <ul>
            {
              searchList.map((d, i) => {
                return <li key={i}
                  onMouseDown={() => setSelectedData(d)}
                  className='p-1 cursor-pointer'>
                  {d.title || d.name}
                </li>
              })
            }
          </ul>
          <button
            onMouseDown={() => {
              if (model === "party") {
                dispatch(toggle(!getPartyModalState))
              }
              else if (model === "item") {
                dispatch(itemToggle(!getItemModalState))
              }
            }}
            className='w-full bg-blue-400 rounded p-1 text-white'>
            Add New
          </button>
        </div>}
      </div>

    </>
  )
}

export default MySelect2;
