import { SelectPicker, TagInput, DatePicker, InputNumber } from 'rsuite'
import MyBreadCrumb from '../components/BreadCrumb'
import Nav from '../components/Nav'
import SideNav from '../components/SideNav';
import { RiDeleteBin6Line } from "react-icons/ri";

const Quotation = () => {


  const data = [
    { label: 'Party 1', value: 'Party 1' },
    { label: 'Party 2', value: 'Party 1' },
  ];

  return (
    <>
      <Nav />
      <main id='main'>
        <SideNav />
        <div className='content__body'>
          <MyBreadCrumb title={"Quotation"} links={[
            { name: "Quotation ", link: "/admin/quatation" },
            { name: "Estimate", link: "/admin/quatation" },
            { name: "Add", link: null }
          ]} />

          <div className='content__body__main bg-white'>
            <div className='flex flex-col lg:flex-row items-center justify-around gap-4'>
              <div className='flex flex-col gap-4 w-2/3'>
                <p className='text-xs'>Select Party</p>
                <SelectPicker className='text-xs'/>
              </div>
              <div className='flex flex-col gap-4 w-1/3'>
                <p className='text-xs'>Quotation / Estimate Number</p>
                <TagInput className='text-xs'/>
              </div>
              <div className='flex flex-col gap-4 w-1/3'>
                <p className='text-xs'>Quotation / Estimate Date</p>
                <DatePicker className='text-xs'/>
              </div>
              <div className='flex flex-col gap-4 w-1/3'>
                <p className='text-xs'>Valid To</p>
                <DatePicker placement='bottomEnd' className='text-xs'/>
              </div>
            </div>

            <div className='overflow-x-auto'>
              <table className='add__table min-w-full table-style'>
                <thead >
                  <tr>
                    <th className='text-[5px]'>Items</th>
                    <th>HSN/SAC</th>
                    <th>QTY</th>
                    <th>Unit</th>
                    <th>Price/Item</th>
                    <th>Discount</th>
                    <th>Tax</th>
                    <th>Amount</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody className=''>
                  <tr>
                    <td>
                      <div className='flex flex-col gap-2'>
                        <SelectPicker />
                        <input type='text' className='input-style' />
                      </div>
                    </td>
                    <td>
                      <input type='text' className='w-[70px] input-style' />
                    </td>
                    <td>
                      <input type='number' className='w-[70px] input-style' />
                    </td>
                    <td>
                      <select name="" id="" className='input-style'>
                        <option value="">aa</option>
                        <option value="">bb</option>
                        <option value="">cc</option>
                      </select>
                    </td>
                    <td align='center'>
                      <div className='w-[80px]'>
                        <InputNumber className='input-style' />
                      </div>
                    </td>
                    <td>
                      <div className='w-[100px] flex flex-col gap-2 items-center' >
                        <InputNumber prefix="$" className='input-style' />
                        <InputNumber prefix="%" className='input-style' />
                      </div>
                    </td>
                    <td>
                      <div className='flex flex-col gap-2'>
                        <SelectPicker />
                        <TagInput />
                      </div>
                    </td>
                    <td align='center'>
                      <div className='w-[80px]'>
                        <InputNumber className='input-style' />
                      </div>
                    </td>
                    <td align='center' className='w-[20px]'>
                      <RiDeleteBin6Line className='cursor-pointer text-lg'/>
                    </td>
                  </tr>
                  <tr>

                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}

export default Quotation