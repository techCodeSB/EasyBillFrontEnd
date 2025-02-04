import React from 'react'
import Nav from '../../components/Nav'
import SideNav from '../../components/SideNav'
import { DateInput, DatePicker, SelectPicker } from 'rsuite'

const AddPayment = () => {
  return (
    <>
      <Nav title={"Add Payment"} />
      <main id='main'>
        <SideNav />
        <div className='content__body'>
          <div className='content__body__main bg-white'>
            <div className='grid grid-cols-1 lg:grid-cols-2 lg:gap-4 gap-0'>
              {/* First Column */}
              <div className='flex flex-col gap-2'>
                <div>
                  <p className='mb-1'>Select Party</p>
                  <SelectPicker className='w-full'

                  />
                </div>
                <div>
                  <p className='mb-1'>Payment Out Number</p>
                  <input type='text' />
                </div>
                <div>
                  <p className='mb-1'>Payment Out Date</p>
                  <DatePicker/>
                </div>
                <div>
                  <p className='mb-1'>Address</p>
                  <textarea rows={1}
                  ></textarea>
                </div>
              </div>

              {/* Second Column */}
              <div className='flex flex-col gap-2'>
                <div>
                  <p className='mb-1'>PAN</p>
                  <input type="text" />
                </div>
                <div>
                  <p className='mb-1'>GST Number</p>
                  <input type="text" />
                </div>
                <div>
                  <p className='mb-1'>Select Country</p>
                  <SelectPicker className='w-full'

                  />
                </div>
                <div>
                  <p className='mb-1'>Select State</p>
                  <SelectPicker className='w-full'

                  />
                </div>
                <div>
                  <p className='mb-1'>Opening Balance</p>
                  <input type="text"

                  />
                </div>
              </div>
            </div>
          </div>
        </div>

      </main>

    </>
  )
}

export default AddPayment