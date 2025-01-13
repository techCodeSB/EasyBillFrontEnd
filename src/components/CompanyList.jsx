import React, { useState } from 'react'
import { Modal } from 'rsuite';
import { toggleModal } from '../store/copanyListSlice';
import { useSelector, useDispatch } from 'react-redux';
import { FaCheck } from "react-icons/fa6";
import { IoIosAddCircle } from "react-icons/io";



const CompanyList = ({ isOpen }) => {
  const dispatch = useDispatch();
  const storeVal = useSelector((state) => state.companyListModal.show);
  const userData = useSelector((state) => state.userDetail);
  const companies = Object.keys(userData).length === 0 ? []: userData.companies;
  console.log(companies)

  return (
    <div id='companyList' >
      <Modal open={storeVal} onClose={() => dispatch(toggleModal(false))} size={300}>
        <Modal.Header>
          <p className='font-bold'>Your companies</p>
        </Modal.Header>
        <Modal.Body>
          {
            companies.map((v, index) => (
              <div key={index}
                className='flex items-center justify-between w-full hover:bg-gray-100 p-1 rounded cursor-pointer'>
                <p className='text-[12px]'>{v.name}</p>
                <FaCheck className='text-orange-400' />
              </div>
            ))
          }
        </Modal.Body>
        <Modal.Footer>
          <button className='flex items-center gap-1 w-full rounded bg-blue-700 hover:bg-blue-600 active:bg-blue-700 text-white justify-center p-1'>
            <IoIosAddCircle />
            Create
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default CompanyList;
