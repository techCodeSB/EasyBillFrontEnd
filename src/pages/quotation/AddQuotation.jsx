import React, { useEffect, useState } from 'react';
import { SelectPicker, DatePicker, Button } from 'rsuite';
import MyBreadCrumb from '../../components/BreadCrumb';
import Nav from '../../components/Nav';
import SideNav from '../../components/SideNav';
import { RiDeleteBin6Line } from "react-icons/ri";
import { MdCurrencyRupee } from "react-icons/md";
import { MdOutlinePlaylistAdd } from "react-icons/md";
import { FaRegCheckCircle } from "react-icons/fa";
import { BiReset } from "react-icons/bi";
import useMyToaster from '../../hooks/useMyToaster';
import useApi from '../../hooks/useApi';
import { useSelector } from 'react-redux';
import useBillPrefix from '../../hooks/useBillPrefix';


const Quotation = () => {
  const toast = useMyToaster();
  const {get} = useBillPrefix();
  const [billPrefix, setBillPrefix] = useState();
  const {getApiData} = useApi();
  const itemRowSet = {
    QuotaionItem: 1, itemName: '', description: '', hsn: '', qun: '',
    unit: '', price: '', discountPerAmount: '', discountPerPercentage: '',
    tax: '', taxAmount: '', amount: ''
  }
  const additionalRowSet = {
    additionalRowsItem: 1, particular: '', amount: ''
  }
  const [ItemRows, setItemRows] = useState([itemRowSet]);
  const [additionalRows, setAdditionalRow] = useState([additionalRowSet]); //{ additionalRowsItem: 1 }
  const [formData, setFormData] = useState({
    party: '', quotationNumber: '', estimateData: '', validDate: '', items: ItemRows,
    additionalCharge: additionalRows, note: '', terms: '',
    discountType: '', discountAmount: '', discountPercentage: '',
  })

  // When change discount type;
  const [discountToggler, setDiscountToggler] = useState(true);

  // Store all items without filter
  const [items, setItems] = useState([]);
  // Store units
  const [unit, setUnit] = useState([]);
  // Store taxes
  const [tax, setTax] = useState([]);
  // Store party
  const [party, setParty] = useState([]);


  // store item label and value pair for dropdown
  const [itemData, setItemData] = useState([])


  useState(() => {
    // get data
    const apiData = async () => {
      {
        const data = await getApiData("item");
        setItems([...data.data]);

        const newItemData = data.data.map(d => ({ label: d.title, value: d.title }));
        setItemData(newItemData);
      }
      {
        const data = await getApiData("unit");
        const unit = data.data.map(d => ({ label: d.title, value: d.title }));
        setUnit([...unit]);
      }
      {
        const data = await getApiData("tax");
        const tax = data.data.map(d => ({ label: d.title, value: d.title }));
        setTax([...tax]);
      }
      {
        const data = await getApiData("party");
        const party = data.data.map(d => ({ label: d.name, value: d.name }));
        setParty([...party]);
      }
    }

    apiData();

  }, [])


  useEffect(() => {
    
    let bill = get("invoice");
    console.log(bill)
  }, [])

  // add item and additional row
  const addItem = (which) => {
    which === 1 ?
      setItemRows([...ItemRows, { ...itemRowSet, QuotaionItem: ItemRows.length > 0 ? ItemRows[ItemRows.length - 1].QuotaionItem + 1 : itemRowSet }])
      : setAdditionalRow([...additionalRows, { ...additionalRowSet, additionalRowsItem: additionalRows.length > 0 ? additionalRows[additionalRows.length - 1].additionalRowsItem + 1 : additionalRowSet }]);

  };

  // delete item and additional row
  const deleteItem = (which, ItemId) => {
    which === 1 ?
      setItemRows(ItemRows.filter((i, _) => i.QuotaionItem !== ItemId))
      : setAdditionalRow(additionalRows.filter((i, _) => i.additionalRowsItem !== ItemId))
  }


  const saveBill = () => {
    if ([formData.party, formData.quotationNumber, formData.estimateData, formData.validDate]
      .some((field) => field === "")) {
      return toast("Fill the blank", "error");
    }
    ItemRows.forEach((row, _) => {
      if ([row.itemName, row.qun, row.unit, row.price, row.tax, row.taxAmount]
        .some((field) => field === "")) {
        return toast("Fill the blank", "error");
      }
    });


  }


  const changeDiscountType = (e) => {
    setFormData({ ...formData, discountType: e.target.value });
    if (e.target.value !== "no") {
      setDiscountToggler(false);
    } else {
      setDiscountToggler(true);
    }

  }

  return (
    <>
      <Nav title={"Add Quotation"} />
      <main id='main'>
        <SideNav />
        <div className='content__body'>
          <div className='content__body__main bg-white' id='addQuotationTable'>
            <div className='flex flex-col lg:flex-row items-center justify-around gap-4'>
              <div className='flex flex-col gap-2 w-full'>
                <p className='text-xs'>Select Party</p>
                <SelectPicker
                  onChange={(data) => setFormData({ ...formData, party: data })}
                  data={party}
                  value={formData.party}
                />
              </div>
              <div className='flex flex-col gap-2 w-full lg:w-1/3'>
                <p className='text-xs'>Quotation / Estimate Number</p>
                <input type="text"
                  onChange={(e) => setFormData({ ...formData, quotationNumber: e.target.value })}
                  value={formData.quotationNumber}
                />
              </div>
              <div className='flex flex-col gap-2 w-full lg:w-1/3'>
                <p className='text-xs'>Quotation / Estimate Date</p>
                <DatePicker className='text-xs'
                  onChange={(data) => {
                    let date = new Date(data);
                    setFormData({ ...formData, estimateData: date.toDateString() })
                  }}
                  value={new Date(formData.estimateData)}
                />
              </div>
              <div className='flex flex-col gap-2 w-full lg:w-1/3'>
                <p className='text-xs'>Valid To</p>
                <DatePicker
                  placement='bottomEnd'
                  className='text-xs'
                  onChange={(data) => {
                    let date = new Date(data);
                    setFormData({ ...formData, validDate: date.toDateString() })
                  }}
                  value={new Date(formData.validDate)}
                />
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
                    <tr key={i.QuotaionItem} className='border-b'>
                      <td>
                        <div className='flex flex-col gap-2'>
                          <SelectPicker
                            onChange={(v) => {
                              let item = [...ItemRows];
                              item[index].itemName = v;
                              setItemRows(item);
                            }}
                            value={ItemRows[index].itemName}
                            data={itemData}
                          />
                          <input type='text' className='input-style' placeholder='Description'
                            onChange={(e) => {
                              let item = [...ItemRows];
                              item[index].description = e.target.value;
                              setItemRows(item);
                            }}
                            value={ItemRows[index].description}
                          />
                        </div>
                      </td>
                      <td>
                        <input type='text' className='w-[70px] input-style'
                          onChange={(e) => {
                            let item = [...ItemRows];
                            item[index].hsn = e.target.value;
                            setItemRows(item);
                          }}
                          value={ItemRows[index].hsn}
                        />
                      </td>
                      <td>
                        <input type='text' className='input-style'
                          onChange={(e) => {
                            let item = [...ItemRows];
                            item[index].qun = e.target.value;
                            setItemRows(item);
                          }}
                          value={ItemRows[index].qun}
                        />
                      </td>
                      <td>
                        <select className='input-style'
                          onChange={(e) => {
                            let item = [...ItemRows];
                            item[index].unit = e.target.value;
                            setItemRows(item);
                          }}
                          value={ItemRows[index].unit}
                        >
                          <option value="">aa</option>
                          <option value="">bb</option>
                          <option value="">cc</option>
                        </select>
                      </td>
                      <td align='center'>
                        <div>
                          <input type='text' className='input-style'
                            onChange={(e) => {
                              let item = [...ItemRows];
                              item[index].price = e.target.value;
                              setItemRows(item);
                            }}
                            value={ItemRows[index].price}
                          />
                        </div>
                      </td>
                      <td>
                        <div className='w-[100px] flex flex-col gap-2 items-center' >
                          <div className='add-table-discount-input' >
                            <input type="text"
                              onChange={(e) => {
                                let item = [...ItemRows];
                                item[index].discountPerAmount = e.target.value;
                                setItemRows(item);
                              }}
                              value={ItemRows[index].discountPerAmount}
                            />
                            <div><MdCurrencyRupee /></div>
                          </div>
                          <div className='add-table-discount-input' >
                            <input type="text"
                              onChange={(e) => {
                                let item = [...ItemRows];
                                item[index].discountPerPercentage = e.target.value;
                                setItemRows(item);
                              }}
                              value={ItemRows[index].discountPerPercentage}
                            />
                            <div>%</div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className='flex flex-col gap-2'>
                          <SelectPicker
                            onChange={(v) => {
                              let item = [...ItemRows];
                              item[index].tax = v;
                              setItemRows(item);
                            }}
                            value={ItemRows[index].tax}
                            data={tax}
                          />
                          <input type="text"
                            onChange={(e) => {
                              let item = [...ItemRows];
                              item[index].taxAmount = e.target.value;
                              setItemRows(item);
                            }}
                            value={ItemRows[index].taxAmount}
                          />
                        </div>
                      </td>
                      <td align='center'>
                        <div>
                          <input type="text"
                            value={ItemRows[index].amount}
                            className='bg-gray-100'
                          />
                        </div>
                      </td>
                      <td align='center' className='w-[20px]'>
                        <RiDeleteBin6Line
                          className='cursor-pointer text-[16px]'
                          onClick={() => ItemRows.length > 1 && deleteItem(1, i.QuotaionItem)}
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
                    <td className='min-w-[150px]'>
                      <input type="text" name="total_taxable_amount" id="" />
                    </td>
                    <td className='min-w-[150px]'>
                      <input type="text" name='total_tax_amount' />
                    </td>
                    <td className='min-w-[180px]'>
                      <select name="discount_type" id="" onChange={changeDiscountType}>
                        <option value="no">No Discount</option>
                        <option value="before">Before Tax</option>
                        <option value="after">After Tax</option>
                      </select>
                    </td>
                    <td className='min-w-[180px]'>
                      <div className='add-table-discount-input' >
                        <input type="text"
                          className={`${discountToggler ? 'bg-gray-100' : ''}`}
                          onChange={discountToggler ? null : (e) => setFormData({ ...formData, discountAmount: e.target.value })}
                          value={formData.discountAmount}
                        />
                        <div><MdCurrencyRupee /></div>
                      </div>
                    </td>
                    <td className='min-w-[200px]'>
                      <div className='add-table-discount-input'>
                        <input type="text"
                          className={`${discountToggler ? 'bg-gray-100' : ''}`}
                          onChange={discountToggler ? null : (e) => setFormData({ ...formData, discountPercentage: e.target.value })}
                          value={formData.discountPercentage}
                        />
                        <div>%</div>
                      </div>
                    </td>
                    <td className='min-w-[150px]'>
                      <input type="text" name="total_amount"
                        className='bg-gray-100'
                        value={''}
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            {/* ------- Note and Additional charges ------- */}
            <div className='w-full flex flex-col lg:flex-row justify-between gap-4 mt-3'>
              <div className='flex flex-col w-full gap-3'>
                <div>
                  <p>Note: </p>
                  <input type="text"
                    onChange={(e) => setFormData({ ...formData, note: e.target.value })}
                    value={formData.note}
                  />
                </div>
                <div>
                  <p>Terms:</p>
                  <input type="text"
                    onChange={(e) => setFormData({ ...formData, terms: e.target.value })}
                    value={formData.terms}
                  />
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
                        additionalRows.map((i, index) => (
                          <tr key={i.additionalRowsItem}>
                            <td>
                              <input type="text"
                                onChange={(e) => {
                                  let item = [...additionalRows];
                                  item[index].particular = e.target.value;
                                  setItemRows(item);
                                }}
                                value={ItemRows[index].particular}
                              />
                            </td>
                            <td>
                              <input type="text"
                                onChange={(e) => {
                                  let item = [...additionalRows];
                                  item[index].particular = e.target.value;
                                  setItemRows(item);
                                }}
                                value={ItemRows[index].particular}
                              />
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

            <div className='w-full flex justify-center gap-3 my-3 mt-5'>
              <button
                onClick={saveBill}
                className='add-bill-btn'>
                <FaRegCheckCircle />
                Save
              </button>
              <button className='reset-bill-btn'>
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