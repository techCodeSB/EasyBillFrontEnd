import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { SelectPicker, DatePicker, Button } from 'rsuite';
import Nav from '../../components/Nav';
import SideNav from '../../components/SideNav';
import { RiDeleteBin6Line } from "react-icons/ri";
import { MdCurrencyRupee } from "react-icons/md";
import { MdOutlinePlaylistAdd } from "react-icons/md";
import { FaRegCheckCircle } from "react-icons/fa";
import { BiReset } from "react-icons/bi";
import useMyToaster from '../../hooks/useMyToaster';
import useApi from '../../hooks/useApi';
import useBillPrefix from '../../hooks/useBillPrefix';


const Quotation = () => {
  const toast = useMyToaster();
  const getBillPrefix = useBillPrefix("invoice");
  const { getApiData } = useApi();
  const itemRowSet = {
    QuotaionItem: 1, itemName: '', description: '', hsn: '', qun: '1',
    unit: '', price: '', discountPerAmount: '', discountPerPercentage: '',
    tax: '', taxAmount: '', amount: '', unitSet: []
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
  const [perPrice, setPerPrice] = useState(null);
  const [perTax, setPerTax] = useState(null);
  const [perDiscount, setPerDiscount] = useState(null);

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
  const [taxData, setTaxData] = useState([]);


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
        const tax = data.data.map(d => ({ label: d.title, value: d.gst }));
        setTax([...data.data]);
        setTaxData([...tax]);
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
    setFormData({ ...formData, quotationNumber: getBillPrefix });
  }, [getBillPrefix])

  // add item and additional row
  const addItem = (which) => {
    which === 1 ?
      setItemRows([
        ...ItemRows, {
          ...itemRowSet, QuotaionItem: ItemRows.length > 0 ? ItemRows[ItemRows.length - 1].QuotaionItem + 1 : itemRowSet,
        }
      ])
      : setAdditionalRow([
        ...additionalRows, {
          ...additionalRowSet, additionalRowsItem: additionalRows.length > 0 ? additionalRows[additionalRows.length - 1].additionalRowsItem + 1 : additionalRowSet
        }
      ]);

  };


  // When `discount type is before` and apply discount this useEffect run;
  useEffect(() => {
    if (formData.discountType === "before") {
      let item = [...ItemRows];
      item.forEach((i, _) => {
        i.discountPerAmount = (formData.discountAmount / (ItemRows.length)).toFixed(2)
        i.discountPerPercentage = ((formData.discountAmount / i.price * 100) / ItemRows.length).toFixed(2);
      })

      setItemData([...item])

    }
  }, [ItemRows])



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


  // When change discount type `before` `after` `no`;
  const changeDiscountType = (e) => {
    setFormData({ ...formData, discountType: e.target.value });
    if (e.target.value !== "no") {
      setDiscountToggler(false);
    } else {
      setDiscountToggler(true);
    }

  }

  const onItemChange = (value, index) => {
    let item = [...ItemRows];
    item[index].itemName = value;
    setItemRows(item);

    let selectedItem = items.filter(i => i.title === value);
    if (selectedItem.length >= 0) {
      let item = [...ItemRows];
      let currentUnit = [];
      let taxId = selectedItem[0].category.tax;
      const getTax = tax.filter((t, _) => t._id === taxId)[0];

      item[index].hsn = selectedItem[0].category.hsn;
      item[index].unit = selectedItem[0].unit;
      item[index].tax = getTax.gst;
      selectedItem[0].unit.forEach((u, _) => {
        currentUnit.push(u.unit);
      })
      item[index].unitSet = [...currentUnit];

      setItemRows(item);
    }

  }

  const calculatePerTaxAmount = (index) => {
    const tax = ItemRows[index].tax / 100;
    const qun = ItemRows[index].qun;
    const price = ItemRows[index].price;
    const disAmount = ItemRows[index].discountPerAmount;
    const amount = ((qun * price) - disAmount);
    const taxamount = (amount * tax).toFixed(2);


    return taxamount;
  }

  const calculatePerAmount = (index) => {
    const qun = ItemRows[index].qun;
    const price = ItemRows[index].price;
    const disAmount = ItemRows[index].discountPerAmount;
    const totalPerAmount = parseInt((qun * price) - disAmount) + parseInt(calculatePerTaxAmount(index));

    return (totalPerAmount).toFixed(2);
  }


  const subTotal = useCallback(() => {
    const subTotal = (which) => {
      let total = 0;

      ItemRows.forEach((item, index) => {
        if (which === "discount") {
          if (item.discountPerAmount) {
            total = (parseInt(total) + parseInt(item.discountPerAmount)).toFixed(2)
          }
        }
        else if (which === "tax") {
          total = (parseInt(total) + parseInt(calculatePerTaxAmount(index))).toFixed(2);
        }
        else if (which === "amount") {
          total = (parseInt(total) + parseInt(calculatePerAmount(index))).toFixed(2);
        }
      })

      return !isNaN(total) ? total : 0;

    }
    return subTotal;
  }, [ItemRows, perPrice, perTax, perDiscount])



  const calculateFinalAmount = () => {
    let totalParticular = 0;
    let total = 0;

    // Total additionla amount and store
    additionalRows.forEach((d, _) => {
      if (d.amount) {
        totalParticular = totalParticular + parseInt(d.amount);
      }
    })

    if (formData.discountType === "no" || formData.discountType === "" || formData.discountType === "before") {
      total = subTotal()('amount');
    }
    else if (formData.discountType === "after") {
      total = (subTotal()('amount') - formData.discountAmount).toFixed(2);
    }

    return !isNaN(totalParticular) ? (parseInt(totalParticular) + parseInt(total)).toFixed(2) : total;

  }



  const onDiscountAmountChange = (e) => {
    if (discountToggler !== null) {
      let per = ((e.target.value / subTotal()('amount')) * 100).toFixed(2)
      setFormData({ ...formData, discountAmount: e.target.value, discountPercentage: per });

      if (formData.discountType === "before") {
        let items = [...ItemRows];
        items.forEach((i, _) => {
          let amount = parseInt(e.target.value) / parseInt(items.length);
          i.discountPerAmount = amount;
          i.discountPerPercentage = amount / i.price * 100;
        })

        setItemRows([...items]);
      }

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
                            onChange={(v) => onItemChange(v, index)}
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
                          {
                            ItemRows[index].unitSet.map((u, _) => {
                              return <option key={_} value={u}>{u}</option>
                            })
                          }
                        </select>
                      </td>
                      <td align='center'>
                        <div>
                          <input type='text' className='input-style'
                            onChange={(e) => {
                              let item = [...ItemRows];
                              item[index].price = e.target.value;
                              setItemRows(item);
                              setPerPrice(e.target.value)
                            }}
                            value={ItemRows[index].price}
                          />
                        </div>
                      </td>
                      <td> {/** Discount amount and percentage */}
                        <div className={`w-[100px] flex flex-col gap-2 items-center`} >
                          <div className='add-table-discount-input'>
                            <input type="text"
                              className={`${formData.discountType === 'before' ? 'bg-gray-100' : ''} `}
                              onChange={formData.discountType !== 'before' ? (e) => {
                                let item = [...ItemRows];
                                let amount = item[index].price * item[index].qun;
                                let percentage = ((e.target.value / amount) * 100).toFixed(2);

                                item[index].discountPerAmount = e.target.value;
                                item[index].discountPerPercentage = percentage;
                                setPerDiscount('');
                                setItemRows(item);
                              } : null}
                              value={ItemRows[index].discountPerAmount}
                            />
                            <div><MdCurrencyRupee /></div>
                          </div>
                          <div className='add-table-discount-input' >
                            <input type="text"
                              className={`${formData.discountType === 'before' ? 'bg-gray-100' : ''} `}
                              onChange={formData.discountType !== 'before' ? (e) => {
                                let item = [...ItemRows];
                                let amount = item[index].price * item[index].qun;
                                let value = ((e.target.value * amount) / 100).toFixed(2);

                                item[index].discountPerAmount = value;
                                item[index].discountPerPercentage = e.target.value;
                                setItemRows(item);
                              } : null}
                              value={ItemRows[index].discountPerPercentage}
                            />
                            <div>%</div>
                          </div>
                        </div>
                      </td>
                      <td> {/** Tax and Taxamount */}
                        <div className='flex flex-col gap-2'>
                          <SelectPicker
                            onChange={(v) => {
                              let item = [...ItemRows];
                              item[index].tax = v;
                              setItemRows(item);
                              setPerTax('')
                            }}
                            value={ItemRows[index].tax}
                            data={taxData}
                          />
                          <input type="text"
                            onChange={(e) => {
                              let item = [...ItemRows];
                              item[index].taxAmount = e.target.value;
                              setItemRows(item);
                            }}
                            value={calculatePerTaxAmount(index)}
                          />
                        </div>
                      </td>
                      <td align='center'>
                        <div>
                          <input type="text"
                            value={calculatePerAmount(index)}
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
                    <td>{subTotal()('discount')}</td>
                    <td>{subTotal()('tax')}</td>
                    <td>{subTotal()('amount')}</td>
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
                      <input type="text" name="total_taxable_amount"
                        value={subTotal()('amount') - subTotal()('tax')}
                      />
                    </td>
                    <td className='min-w-[150px]'>
                      <input type="text" name='total_tax_amount'
                        value={subTotal()('tax')}
                      />
                    </td>
                    <td className='min-w-[180px]'>
                      <select name="discount_type" onChange={changeDiscountType}>
                        <option value="no">No Discount</option>
                        <option value="before">Before Tax</option>
                        <option value="after">After Tax</option>
                      </select>
                    </td>
                    <td className='min-w-[180px]'>
                      <div className='add-table-discount-input' >
                        <input type="text"
                          className={`${discountToggler ? 'bg-gray-100' : ''}`}
                          onChange={(e) => discountToggler ? null : onDiscountAmountChange(e)}
                          value={formData.discountAmount}
                        />
                        <div><MdCurrencyRupee /></div>
                      </div>
                    </td>
                    <td className='min-w-[200px]'>
                      <div className='add-table-discount-input'>
                        <input type="text"
                          className={`${discountToggler ? 'bg-gray-100' : ''}`}
                          onChange={discountToggler ? null : (e) => {
                            let amount = ((subTotal()('amount') / 100) * e.target.value).toFixed(2)
                            setFormData({
                              ...formData, discountPercentage: e.target.value, discountAmount: amount
                            })

                            if (formData.discountType === "before") {
                              let items = [...ItemRows];
                              items.forEach((i, _) => {
                                i.discountPerAmount = amount / parseInt(items.length);
                              })

                              console.log(items);
                              setItemRows([...items]);
                            }
                          }}
                          value={formData.discountPercentage}
                        />
                        <div>%</div>
                      </div>
                    </td>
                    <td className='min-w-[150px]'>
                      <input type="text" name="total_amount"
                        className='bg-gray-100'
                        value={subTotal()('amount')}
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
                                  setAdditionalRow(item);
                                }}
                                value={additionalRows[index].particular}
                              />
                            </td>
                            <td>
                              <input type="text"
                                onChange={(e) => {
                                  let item = [...additionalRows];
                                  item[index].amount = e.target.value;
                                  setAdditionalRow(item);
                                }}
                                value={additionalRows[index].amount}
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
                <input type="text" name="final_amount" className='w-full'
                  value={calculateFinalAmount()}
                />
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