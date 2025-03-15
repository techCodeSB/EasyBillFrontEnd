import React from 'react'
import { Modal } from 'rsuite';
import { PartyComponent } from '../pages/party/AddParty';
import { useDispatch } from 'react-redux';
import { toggle } from '../store/partyModalSlice';


const AddPartyModal = ({ open }) => {
  const dispatch = useDispatch();


  return (
    <div className='party__modal'>
      <Modal open={open} size={600} onClose={() => {
        dispatch(toggle(false))
        window.location.reload(); //this reload is important for add new party to list;
      }}>
        <Modal.Header>
          <h6 className='py-2'>Add Party</h6>
        </Modal.Header>
        <Modal.Body>
          <PartyComponent />
        </Modal.Body>
      </Modal>
    </div>
  )
}



export default AddPartyModal