import React, { useState } from 'react';
import { SelectPicker, DatePicker, Button } from 'rsuite';
import MyBreadCrumb from '../../components/BreadCrumb';
import Nav from '../../components/Nav';
import SideNav from '../../components/SideNav';
import { RiDeleteBin6Line } from "react-icons/ri";
import { MdCurrencyRupee } from "react-icons/md";
import { MdOutlinePlaylistAdd } from "react-icons/md";
import { FaRegCheckCircle } from "react-icons/fa";
import { BiReset } from "react-icons/bi";



const Quotation = () => {
  const [ItemRows, setItemRows] = useState([{ QuotaionItem: 1 }]);
  const [additionalRows, setAdditionalRow] = useState([]); //{ additionalRowsItem: 1 }

  const addItem = (which) => {
    which === 1 ?
      setItemRows([...ItemRows, { QuotaionItem: ItemRows.length > 0 ? ItemRows[ItemRows.length - 1].QuotaionItem + 1 : 1 }])
      : setAdditionalRow([...additionalRows, { additionalRowsItem: additionalRows.length > 0 ? additionalRows[additionalRows.length - 1].additionalRowsItem + 1 : 1 }]);
  };

  const deleteItem = (which, ItemId) => {
    which === 1 ?
      setItemRows(ItemRows.filter((i, _) => i.QuotaionItem !== ItemId))
      : setAdditionalRow(additionalRows.filter((i, _) => i.additionalRowsItem !== ItemId))
  }


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

          <div className='content__body__main bg-white' id='addQuotationTable'>
            <div className='flex flex-col lg:flex-row items-center justify-around gap-4'>
              <div className='flex flex-col gap-2 w-full'>
                <p className='text-xs'>Select Party</p>
                <SelectPicker onChange={(data)=>{
                  console.log(data)
                }} data={data}/>
              </div>


              <div className='flex flex-col gap-2 w-1/3'>
                <p className='text-xs'>Quotation / Estimate Number</p>
                <input type="text" name="" id="" />
              </div>
              <div className='flex flex-col gap-2 w-1/3'>
                <p className='text-xs'>Quotation / Estimate Date</p>
                <DatePicker className='text-xs'/>
              </div>
              <div className='flex flex-col gap-2 w-1/3'>
                <p className='text-xs'>Valid To</p>
                <DatePicker placement='bottomEnd' className='text-xs' />
              </div>
            </div>

            <div className='overflow-x-auto rounded'>
              <table className='add__table min-w-full table-style'>
                <thead >
                  <tr>
                    <th style={{ "width": "*" }}>Item</th>
                    <th style={{ "width": "6%" }}>HSN/SAC</th>
                    <th style={{ "width": "5%" }}>QTY</th>
                    <th style={{ "width": "7%" }}>Unit</th>
                    <th style={{ "width": "10%" }}>Price/Item</th>
                    <th style={{ "width": "10%" }}>Discount</th>
                    <th style={{ "width": "10%" }}>Tax</th>
                    <th style={{ "width": "10%" }}>Amount</th>
                    <th style={{ "width": "3%" }}></th>
                  </tr>
                </thead>
                <tbody>
                  {ItemRows.map((i, index) => (
                    <tr key={i.QuotaionItem}>
                      <td>
                        <div className='flex flex-col gap-2'>
                          <SelectPicker />
                          <input type='text' className='input-style' placeholder='Description' />
                        </div>
                      </td>
                      <td>
                        <input type='text' className='w-[70px] input-style' />
                      </td>
                      <td>
                        <input type='number' className='input-style' />
                      </td>
                      <td>
                        <select name="" id="" className='input-style'>
                          <option value="">aa</option>
                          <option value="">bb</option>
                          <option value="">cc</option>
                        </select>
                      </td>
                      <td align='center'>
                        <div>
                          <input type='number' className='input-style' />
                        </div>
                      </td>
                      <td>
                        <div className='w-[100px] flex flex-col gap-2 items-center' >
                          <div className='add-table-discount-input' >
                            <input type="number" />
                            <div><MdCurrencyRupee /></div>
                          </div>
                          <div className='add-table-discount-input' >
                            <input type="number" />
                            <div>%</div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className='flex flex-col gap-2'>
                          <SelectPicker />
                          <input type="text" />
                        </div>
                      </td>
                      <td align='center'>
                        <div>
                          <input type="number" />
                        </div>
                      </td>
                      <td align='center' className='w-[20px]'>
                        <RiDeleteBin6Line
                          className='cursor-pointer text-lg'
                          onClick={() => deleteItem(1, i.QuotaionItem)}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr>
                    <td colSpan={9}>
                      <Button color='blue' className='float-right w-full font-bold' onClick={() => addItem(1)}>
                        <MdOutlinePlaylistAdd className='text-lg mr-1' />
                        Add Item
                      </Button>
                    </td>
                  </tr>
                  <tr>
                    <td colSpan={5} align='right'>
                      <p className='py-2 font-bold'>Sub-Total</p>
                    </td>
                    <td>0.00</td>
                    <td>0.00</td>
                    <td>0.00</td>
                  </tr>
                </tfoot>
              </table>
            </div>
            {/* --------- Tax amount table ------- */}
            <div className='overflow-x-auto rounded' id='taxAmountTable'>
              <table className='table-style w-full'>
                <thead>
                  <tr>
                    <td>Total Taxable Amount</td>
                    <td>Total Tax Amount</td>
                    <td>
                      <span className='font-bold mr-1'>Discount Type</span>
                      <span>(Additional)</span>
                    </td>
                    <td>
                      <span className='font-bold mr-1'>Discount Amount</span>
                      <span>(Additional)</span>
                    </td>
                    <td>
                      <span className='font-bold mr-1'>Discount Percentage</span>
                      <span>(Additional)</span>
                    </td>
                    <td>Total Amount</td>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <input type="text" name="total_taxable_amount" id="" />
                    </td>
                    <td>
                      <input type="text" name='total_tax_amount' />
                    </td>
                    <td>
                      <select name="discount_type" id="">
                        <option value="before">Before Tax</option>
                        <option value="after">After Tax</option>
                        <option value="no">No Discount</option>
                      </select>
                    </td>
                    <td>
                      <div className='add-table-discount-input' >
                        <input type="number" />
                        <div><MdCurrencyRupee /></div>
                      </div>
                    </td>
                    <td>
                      <div className='add-table-discount-input' >
                        <input type="number" />
                        <div>%</div>
                      </div>
                    </td>
                    <td>
                      <input type="text" name="total_amount" id="" />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            {/* ------- Note and Additional charges ------- */}
            <div className='w-full flex justify-between gap-4 mt-3'>
              <div className='flex flex-col w-full gap-3'>
                <div>
                  <p>Note: </p>
                  <input type="text" name="" id="" />
                </div>
                <div>
                  <p>Terms:</p>
                  <input type="text" name="" id="" />
                </div>
              </div>
              <div className='w-full'>
                <div className='uppercase font-bold border border-dashed p-2 rounded'>
                  Additional Charges
                </div>
                <div className='overflow-x-auto rounded mt-3' id='addtionalChargeTable'>
                  <table className='table-style w-full'>
                    <thead className='bg-gray-100'>
                      <tr>
                        <td>Particular</td>
                        <td>Amount</td>
                        <td>Actions</td>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        additionalRows.map((i, _) => (
                          <tr key={i.additionalRowsItem}>
                            <td>
                              <input type="text" name="" id="" />
                            </td>
                            <td>
                              <input type="text" name="" id="" />
                            </td>
                            <td align='center'>
                              <RiDeleteBin6Line
                                className='cursor-pointer text-lg'
                                onClick={() => deleteItem(2, i.additionalRowsItem)}
                              />
                            </td>
                          </tr>
                        ))
                      }
                    </tbody>
                    <tfoot>
                      <tr>
                        <td colSpan={3}>
                          <Button color='blue' className='float-right w-full font-bold' onClick={() => addItem(2)}>
                            <MdOutlinePlaylistAdd className='text-lg mr-1' />
                            Add Item
                          </Button>
                        </td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
                <p className='font-bold mt-4 mb-2'>Final Amount</p>
                <input type="text" name="final_amount" className='w-full' />
              </div>
            </div>

            <div className='w-full flex justify-center gap-3 my-3'>
              <button className='bg-green-500 hover:bg-green-400 text-md text-white rounded w-[60px] flex items-center justify-center gap-1 py-2'>
                <FaRegCheckCircle />
                Save
              </button>
              <button className='bg-blue-800 hover:bg-blue-700 text-md text-white rounded w-[60px] flex items-center justify-center gap-1 py-2'>
                <BiReset />
                Reset
              </button>
            </div>

          </div>
          {/* Content Body Main Close */}
        </div>
        {/* Content Body Close */}
      </main>
    </>
  )
}

export default Quotation;