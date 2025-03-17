import SideNav from '../../components/SideNav'
import { SelectPicker } from 'rsuite';
import { MdUploadFile } from "react-icons/md";
import { LuFileX2 } from "react-icons/lu";
import { countryList, statesAndUTs } from '../../helper/data';
import { FaRegCheckCircle } from 'react-icons/fa';
import { BiReset } from 'react-icons/bi';
import { useState } from 'react';
import checkfile from '../../helper/checkfile'
import useMyToaster from '../../hooks/useMyToaster';
import Nav from '../../components/Nav';
import Cookies from 'js-cookie';
import { useDispatch } from 'react-redux';
import { addCompany } from '../../store/userDetailSlice';


const AddCompany = () => {
  const toast = useMyToaster();
  const dispatch = useDispatch()

  const [companyData, setCompanyData] = useState({
    name: '', phone: '', email: '', gst: '', pan: '', invoiceLogo: '', signature: '',
    address: '', country: '', state: '', poInitial: '', invoiceInitial: '',
    proformaInitial: '', poNextCount: '', invoiceNextCount: '', proformaNextCount: '',
    salesReminder: '', purchaseReminder: ''
  })

  const fileUpload = async (e, field) => {
    const validatefile = await checkfile(e.target.files[0]);
    if (typeof (validatefile) !== "boolean") {
      return toast(validatefile, 'warning');
    }

    if (field === "invoiceLogo") {
      setCompanyData({ ...companyData, invoiceLogo: e.target.files[0] });
    } else if (field === "signutre") {
      setCompanyData({ ...companyData, signature: e.target.files[0] });
    }
  }


  const removeUpload = (field) => {
    if (field === "invoiceLogo") {
      setCompanyData({ ...companyData, invoiceLogo: "" });
    } else if (field === "signutre") {
      setCompanyData({ ...companyData, signature: "" });
    }
  }


  const saveCompany = async () => {
    if (Object.values(companyData).some((field) => field === "")) {
      console.log(companyData)
      return toast("fill the require", 'error');
    }

    try {
      const formData = new FormData();
      Object.keys(companyData).forEach((elm, _) => {
        formData.append(elm, companyData[elm])
      })
      formData.append("token", Cookies.get("token"))
      const url = process.env.REACT_APP_API_URL + "/company/add";
      const req = await fetch(url, {
        method: 'POST',
        body: formData
      });
      const res = await req.json();
      if (req.status !== 200) {
        return toast(res.err, "error")
      }

      dispatch(addCompany(res));
      toast("Company create successfully", 'success')
      switchCompany(res._id);
      return;

    } catch (error) {
      console.log(error)
      return toast("something went wrong", 'error')
    }

  }


  const switchCompany = async (id) => {
    try {
      const token = Cookies.get("token");
      const url = process.env.REACT_APP_API_URL + "/company/switch-company";
      const req = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ token, companyId: id })
      })
      const res = await req.json();

      if (req.status !== 200 || !res.msg) {
        return toast(res.err, 'error');
      }

      toast(res.msg, 'success');
      document.location = "/admin/dashboard";

    } catch (error) {
      console.log(error);
      return toast("Something went wrong", 'error')
    }

  }



  return (
    <>
      <Nav title={"Add Company"} />
      <main id='main'>
        <SideNav />
        <div className='content__body'>
          <div className="content__body__main bg-white">
            <div className='flex flex-col gap-2'>
              <div className='forms grid grid-cols-1 lg:grid-cols-2 gap-3 lg:gap-5'>
                {/* first col */}
                <div className='flex flex-col gap-2'>
                  <div>
                    <p>Company Name</p>
                    <input type="text"
                      onChange={(e) => setCompanyData({ ...companyData, name: e.target.value })}
                      value={companyData.name}
                    />
                  </div>
                  <div>
                    <p>Company Phone</p>
                    <input type="text" onChange={(e) => setCompanyData({ ...companyData, phone: e.target.value })}
                      value={companyData.phone} />
                  </div>
                  <div>
                    <p>Company Email</p>
                    <input type="text" onChange={(e) => setCompanyData({ ...companyData, email: e.target.value })}
                      value={companyData.email} />
                  </div>
                  <div>
                    <p>GST</p>
                    <input type="text" onChange={(e) => setCompanyData({ ...companyData, gst: e.target.value })}
                      value={companyData.gst} />
                  </div>
                  <div>
                    <p>PAN</p>
                    <input type="text" onChange={(e) => setCompanyData({ ...companyData, pan: e.target.value })}
                      value={companyData.pan} />
                  </div>
                </div>
                {/* Second col */}
                <div className='flex flex-col gap-2'>
                  <div>
                    <p>Bill/Invoice Logo</p>
                    <div className='file__uploader__div'>
                      <span className='file__name'>{companyData.invoiceLogo.name}</span>
                      <div className="flex gap-2">
                        <input type="file" id="invoiceLogo" className='hidden' onChange={(e) => fileUpload(e, 'invoiceLogo')} />
                        <label htmlFor="invoiceLogo" className='file__upload' title='Upload'>
                          <MdUploadFile />
                        </label>
                        {
                          companyData.invoiceLogo && <LuFileX2 className='remove__upload ' title='Remove upload'
                            onClick={() => removeUpload('invoiceLogo')} />
                        }
                      </div>
                    </div>
                  </div>
                  <div>
                    <p>Authority Signature</p>
                    <div className='file__uploader__div'>
                      <span className='file__name'>{companyData.signature.name}</span>
                      <div className="flex gap-2">
                        <input type="file" id="signutre" className='hidden' onChange={(e) => fileUpload(e, 'signutre')} />
                        <label htmlFor="signutre" className='file__upload' title='Upload'>
                          <MdUploadFile />
                        </label>
                        {
                          companyData.signature && <LuFileX2 className='remove__upload' title='Remove upload'
                            onClick={() => removeUpload('signutre')} />
                        }
                      </div>
                    </div>
                  </div>
                  <div>
                    <p>Company Address</p>
                    <textarea rows={1} onChange={(e) => setCompanyData({ ...companyData, address: e.target.value })}>{companyData.address}</textarea>
                  </div>
                  <div>
                    <p>Select Country</p>
                    <SelectPicker className='w-full' data={countryList}
                      value={companyData.country}
                      onChange={(v) => setCompanyData({ ...companyData, country: v })} />
                  </div>
                  <div>
                    <p>Select State</p>
                    <SelectPicker className='w-full' data={statesAndUTs} value={companyData.state}
                      onChange={(v) => setCompanyData({ ...companyData, state: v })} />
                  </div>
                </div>
              </div>

              <div className='overflow-x-auto'>
                <table className='table-style w-full'>
                  <thead className='bg-gray-200 h-[30px]'>
                    <tr>
                      <th>PO Initial</th>
                      <th>Invoice Initial</th>
                      <th>Proforma Initial</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className='min-w-[150px]'>
                        <input type="text" value={companyData.poInitial}
                          onChange={(e) => setCompanyData({ ...companyData, poInitial: e.target.value })} />
                      </td>
                      <td className='min-w-[150px]'>
                        <input type="text" value={companyData.invoiceInitial}
                          onChange={(e) => setCompanyData({ ...companyData, invoiceInitial: e.target.value })} />
                      </td>
                      <td className='min-w-[150px]'>
                        <input type="text" value={companyData.proformaInitial}
                          onChange={(e) => setCompanyData({ ...companyData, proformaInitial: e.target.value })} />
                      </td>
                    </tr>
                  </tbody>
                  <tfoot>
                    <tr className='bg-gray-200 h-[30px]'>
                      <th>Next Count</th>
                      <th>Next Count</th>
                      <th>Next Count</th>
                    </tr>
                    <tr>
                      <td className='min-w-[150px]'>
                        <input type="text" value={companyData.poNextCount}
                          onChange={(e) => setCompanyData({ ...companyData, poNextCount: e.target.value })} />
                      </td>
                      <td className='min-w-[150px]'>
                        <input type="text" value={companyData.invoiceNextCount}
                          onChange={(e) => setCompanyData({ ...companyData, invoiceNextCount: e.target.value })} />
                      </td>
                      <td className='min-w-[150px]'>
                        <input type="text" value={companyData.proformaNextCount}
                          onChange={(e) => setCompanyData({ ...companyData, proformaNextCount: e.target.value })} />
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
              <div className="w-full flex flex-col lg:flex-row gap-2 lg:gap-5">
                <div className='w-full'>
                  <p>Sales Invoice Reminder (Days Before)</p>
                  <input type="text" value={companyData.salesReminder}
                    onChange={(e) => setCompanyData({ ...companyData, salesReminder: e.target.value })} />
                </div>
                <div className='w-full'>
                  <p>Purchase Invoice Reminder (Days Before)</p>
                  <input type="text"
                    value={companyData.purchaseReminder}
                    onChange={(e) => setCompanyData({ ...companyData, purchaseReminder: e.target.value })} />
                </div>
              </div>
              <div className='w-full flex justify-center gap-3 my-3'>
                <button onClick={saveCompany}
                  className='bg-green-500 hover:bg-green-400 text-md text-white rounded w-[60px] flex items-center justify-center gap-1 py-2'>
                  <FaRegCheckCircle />
                  Save
                </button>
                <button className='bg-blue-800 hover:bg-blue-700 text-md text-white rounded w-[60px] flex items-center justify-center gap-1 py-2'>
                  <BiReset />
                  Reset
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}

export default AddCompany