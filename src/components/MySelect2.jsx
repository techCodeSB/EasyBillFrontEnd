import React, { useEffect, useState } from 'react';
import { IoAddCircleSharp, IoClose } from "react-icons/io5";
import useMyToaster from '../hooks/useMyToaster';
import Cookies from 'js-cookie';
import { IoIosSearch } from "react-icons/io";
import { useDispatch, useSelector } from 'react-redux';
import { toggle as itemToggle } from '../store/itemModalSlice'
import { toggle } from '../store/partyModalSlice';
import AddPartyModal from './AddPartyModal';
import AddItemModal from './AddItemModal';
import { FaArrowRight } from "react-icons/fa6";
import { Drawer } from 'rsuite';
import { PartyComponent } from '../pages/party/AddParty';
import { AddItemComponent } from '../pages/Items/ItemAdd';







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
  const [partyDrawer, setPartyDrawer] = useState(false);
  const [itemDrawer, setItemDrawer] = useState(false);


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
          console.log(res)
          if(res.data.length > 0){
            setSearchList([...res.data])

          }else{
            setSearchList(['No record', "hello world"])
          }
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

    if (model === "item") {
      setSearchText(value);
      setSelectedValue(value);
    }
  }, [value])




  return (
    <>
      <div className='relative'>
        <AddPartyModal open={getPartyModalState} />
        <AddItemModal open={getItemModalState} />

        {/* Party drawer */}
        <Drawer
          onClose={() => setPartyDrawer(false)}
          open={partyDrawer}
          size={"md"}
        >
          <Drawer.Header>
            <Drawer.Actions>
              <p className='text-lg font-bold'>Add Party</p>
            </Drawer.Actions>
          </Drawer.Header>
          <Drawer.Body>
            <PartyComponent />
          </Drawer.Body>
        </Drawer>

        {/* Item Drawer */}
        <Drawer
          onClose={() => setItemDrawer(false)}
          open={itemDrawer}
          size={"md"}
        >
          <Drawer.Header>
            <Drawer.Actions>
              <p className='text-lg font-bold'>Add Item</p>
            </Drawer.Actions>
          </Drawer.Header>
          <Drawer.Body>
            <AddItemComponent />
          </Drawer.Body>
        </Drawer>


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
        {showDropDown && <div
          className='w-full max-h-[250px] overflow-y-auto bg-white absolute z-50 rounded mt-1'
          style={{ boxShadow: "0px 0px 5px lightgray" }}>
          <ul>
            {
              searchList.length > 0 ? searchList.map((d, i) => {
                return <li key={i}
                  onMouseDown={() => setSelectedData(d)}
                  className='p-1 px-2 cursor-pointer'>
                  {d.title || d.name}
                </li>
              })
                : <li></li>
            }
          </ul>
          <button
            onMouseDown={() => {
              if (model === "party") {
                setPartyDrawer(true);
              }
              else if (model === "item") {
                setItemDrawer(true)
              }
            }}
            className='select__add__button'>
            <IoAddCircleSharp className='text-lg' />
            Add New
            <FaArrowRight className='text-[15px]' />
          </button>
        </div>}
      </div>

    </>
  )
}



export default MySelect2;
