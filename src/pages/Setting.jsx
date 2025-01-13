import SideNav from '../components/SideNav'
import Nav from '../components/Nav'
import { SelectPicker, TagInput } from 'rsuite';
import { MdUploadFile } from "react-icons/md";
import { LuFileX2 } from "react-icons/lu";
import { countryList, statesAndUTs } from '../helper/data';
import { FaRegCheckCircle } from 'react-icons/fa';
import { BiReset } from 'react-icons/bi';
import { useEffect, useState } from 'react';
import checkfile from '../helper/checkfile'
import useMyToaster from '../hooks/useMyToaster';
import Cookies from 'js-cookie'



const Setting = () => {
  const toast = useMyToaster();
  const [siteData, setSiteData] = useState({
    title: '', moto: '', email: '', allEmail: '', contactNumber: '',
    alternativeContact: "", helplineNumber: '', emergencyNumber: '',
    about: '', address: '', twitterUrl: '', facebookUrl: '', instgramaUrl: '',
    pinterestUrl: '', youtubeUrl: '', whatsappUrl: '', telegramUrl: '', linkedInUrl: '',
    visibleSearchEngine: '', protectContect: '', siteLogo: '', siteLogoReverse: '',
    favIcon: '', metaTitle: '', metaKeyword: '', metaDescription: '',
    extraHeaderCode: '', extraFooterCode: "", locationMetaData: '', frontPage: ''
  });
  const [companyData, setCompanyData] = useState({
    name: '', phone: '', email: '', gst: '', pan: '', invoiceLogo: '', signature: '',
    address: '', country: '', state: '', poInitial: '', invoiceInitial: '',
    proformaInitial: '', poNextCount: '', invoiceNextCount: '', proformaNextCount: '',
    salesReminder: '', purchaseReminder: ''
  })

  useEffect(() => {
    const getCompany = async () => {
      try {
        const url = process.env.REACT_APP_API_URL + "/company/get";
        const req = await fetch(url, {
          method:"POST",
          headers:{
            "Content-Type": 'application/json'
          },
          body:JSON.stringify({token: Cookies.get("token")})
        });
        const res = await req.json();

        console.log(res)
        setCompanyData({...res})

      } catch (error) {
        console.log(error)
      }
    }

    getCompany();
  }, [])

  const fileUpload = async (e, field) => {
    const validatefile = await checkfile(e.target.files[0]);
    if (typeof (validatefile) !== "boolean") {
      return toast(validatefile, 'warning');
    }

    if (field === "siteLogo") {
      setSiteData({ ...siteData, siteLogo: e.target.files[0] });
    } else if (field === "logoReverse") {
      setSiteData({ ...siteData, siteLogoReverse: e.target.files[0] });
    } else if (field === "favIcon") {
      setSiteData({ ...siteData, favIcon: e.target.files[0] });
    } else if (field === "invoiceLogo") {
      setCompanyData({ ...companyData, invoiceLogo: e.target.files[0] });
    } else if (field === "signutre") {
      setCompanyData({ ...companyData, signature: e.target.files[0] });
    }
  }

  const removeUpload = (field) => {
    if (field === "siteLogo") {
      setSiteData({ ...siteData, siteLogo: "" });
    } else if (field === "logoReverse") {
      setSiteData({ ...siteData, siteLogoReverse: "" });
    } else if (field === "favIcon") {
      setSiteData({ ...siteData, favIcon: "" });
    } else if (field === "invoiceLogo") {
      setCompanyData({ ...companyData, invoiceLogo: "" });
    } else if (field === "signutre") {
      setCompanyData({ ...companyData, signature: "" });
    }
  }

  const saveSiteData = () => {
    if (Object.keys(siteData).some((field) => siteData[field] === "")) {
      return toast("fill the blank", "warning")
    }


  }


  return (
    <>
      <Nav title={"Site/Business"} />
      <main id='main'>
        <SideNav />
        <div className='content__body' id='Settings'>
          {/* site setting */}
          <div className="content__body__main bg-white" >
            <p className='font-bold'>Site Settings</p>
            <hr />
            <div className='forms grid grid-cols-1 lg:grid-cols-2 gap-3 lg:gap-5 mt-3'>
              {/* First col */}
              <div className='flex flex-col gap-2'>
                <div>
                  <p>Title</p>
                  <input type="text" onChange={(e) => setSiteData({ ...siteData, title: e.target.value })}
                    value={siteData.title}
                  />
                </div>
                <div>
                  <p>Moto</p>
                  <input type="text" onChange={(e) => setSiteData({ ...siteData, moto: e.target.value })}
                    value={siteData.moto}
                  />
                </div>
                <div>
                  <p>Email</p>
                  <input type="email" onChange={(e) => setSiteData({ ...siteData, email: e.target.value })}
                    value={siteData.email}
                  />
                </div>
                <div>
                  <p>All Email</p>
                  <TagInput
                    onChange={(v) => setSiteData({ ...siteData, allEmail: v })}
                    value={siteData.allEmail}
                    trigger={['Space', 'Comma']}
                    className='w-full'
                    menuStyle={{ width: 300 }}
                    onCreate={(value, item) => {
                      console.log(value, item);
                    }}
                  />
                </div>
                <div>
                  <p>Contact Number</p>
                  <input type="text" onChange={(e) => setSiteData({ ...siteData, contactNumber: e.target.value })}
                    value={siteData.contactNumber}
                  />
                </div>
                <div>
                  <p>Alternative Contact Number</p>
                  <input type="text" onChange={(e) => setSiteData({ ...siteData, alternativeContact: e.target.value })}
                    value={siteData.alternativeContact}
                  />
                </div>
                <div>
                  <p>HelpLine Number</p>
                  <input type="text" onChange={(e) => setSiteData({ ...siteData, helplineNumber: e.target.value })}
                    value={siteData.helplineNumber}
                  />
                </div>
                <div>
                  <p>Emergency Number</p>
                  <input type="text" onChange={(e) => setSiteData({ ...siteData, emergencyNumber: e.target.value })}
                    value={siteData.emergencyNumber}
                  />
                </div>
                <div>
                  <p>About Site</p>
                  <textarea rows={1} onChange={(e) => setSiteData({ ...siteData, about: e.target.value })}
                  >{siteData.about}</textarea>
                </div>
                <div>
                  <p>Address</p>
                  <textarea rows={1} onChange={(e) => setSiteData({ ...siteData, about: e.target.value })}>{siteData.address}</textarea>
                </div>
                <div>
                  <p>Twitter Account URL</p>
                  <input type="text" onChange={(e) => setSiteData({ ...siteData, twitterUrl: e.target.value })}
                    value={siteData.twitterUrl}
                  />
                </div>
                <div>
                  <p>Facebook Profile URL</p>
                  <input type="text" onChange={(e) => setSiteData({ ...siteData, facebookUrl: e.target.value })}
                    value={siteData.facebookUrl}
                  />
                </div>
                <div>
                  <p>Instagram Profile URL</p>
                  <input type="text" onChange={(e) => setSiteData({ ...siteData, instgramaUrl: e.target.value })}
                    value={siteData.instgramaUrl}
                  />
                </div>
                <div>
                  <p>LinkedIN Profile URL</p>
                  <input type="text" onChange={(e) => setSiteData({ ...siteData, linkedInUrl: e.target.value })}
                    value={siteData.linkedInUrl}
                  />
                </div>
                <div>
                  <p>Pinterest Profile URL</p>
                  <input type="text" onChange={(e) => setSiteData({ ...siteData, pinterestUrl: e.target.value })}
                    value={siteData.pinterestUrl} />
                </div>
                <div>
                  <p>Youtube Channel URL</p>
                  <input type="text" onChange={(e) => setSiteData({ ...siteData, youtubeUrl: e.target.value })}
                    value={siteData.youtubeUrl} />
                </div>
                <div>
                  <p>WhatsApp Chat/group URL</p>
                  <input type="text" onChange={(e) => setSiteData({ ...siteData, whatsappUrl: e.target.value })}
                    value={siteData.whatsappUrl} />
                </div>
                <div>
                  <p>Telegram Chat/group/Channel URL</p>
                  <input type="text" onChange={(e) => setSiteData({ ...siteData, telegramUrl: e.target.value })}
                    value={siteData.telegramUrl} />
                </div>
              </div>
              {/* Second col */}
              <div className='flex flex-col gap-2'>
                <div>
                  <p>Visible in search engines?</p>
                  <select onChange={(e) => setSiteData({ ...siteData, visibleSearchEngine: e.target.value })}
                    value={siteData.visibleSearchEngine}
                  >
                    <option value="none">--Select--</option>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                  </select>
                </div>

                <div>
                  <p>Protect Content</p>
                  <select onChange={(e) => setSiteData({ ...siteData, protectContect: e.target.value })}
                    value={siteData.protectContect}>
                    <option value="none">--Select--</option>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                  </select>
                </div>
                <div>
                  <p>Site Logo</p>
                  <div className='file__uploader__div'>
                    <span className='file__name'>{siteData.siteLogo.name}</span>
                    <div className='flex gap-2'>
                      <input type="file" id="siteLogo" className='hidden' onChange={(e) => fileUpload(e, 'siteLogo')} />
                      <label htmlFor="siteLogo" className='file__upload' title='Upload'>
                        <MdUploadFile />
                      </label>
                      <LuFileX2 className='remove__upload ' title='Remove upload' onClick={() => removeUpload('siteLogo')} />
                    </div>
                  </div>
                </div>

                <div>
                  <p>Site Logo Reverse</p>
                  <div className='file__uploader__div'>
                    <span className='file__name'>{siteData.siteLogoReverse.name}</span>
                    <div className='flex gap-2'>
                      <input type="file" id="siteLogoReverse" className='hidden' onChange={(e) => fileUpload(e, "logoReverse")} />
                      <label htmlFor="siteLogoReverse" className='file__upload' title='Upload'>
                        <MdUploadFile />
                      </label>
                      <LuFileX2 className='remove__upload ' title='Remove upload' onClick={() => removeUpload('logoReverse')} />
                    </div>
                  </div>
                </div>

                <div>
                  <p>Site FAV Icon</p>
                  <div className='file__uploader__div'>
                    <span className='file__name'>{siteData.favIcon.name}</span>
                    <div className='flex gap-2'>
                      <input type="file" id="favIcon" className='hidden' onChange={(e) => fileUpload(e, 'favIcon')} />
                      <label htmlFor="favIcon" className='file__upload' title='Upload'>
                        <MdUploadFile />
                      </label>
                      <LuFileX2 className='remove__upload ' title='Remove upload' onClick={() => removeUpload('favIcon')} />
                    </div>
                  </div>
                </div>
                <div>
                  <p>Meta Title</p>
                  <input type="text" onChange={(e) => setSiteData({ ...siteData, metaTitle: e.target.value })}
                    value={siteData.metaTitle} />
                </div>
                <div>
                  <p>Meta Keyword</p>
                  <TagInput
                    onChange={(v) => setSiteData({ ...siteData, metaKeyword: v })}
                    value={siteData.metaKeyword}
                    trigger={['Space', 'Comma']}
                    className='w-full'
                    menuStyle={{ width: 300 }}
                    onCreate={(value, item) => {
                      console.log(value, item);
                    }}
                  />
                </div>
                <div>
                  <p>Meta Description</p>
                  <textarea rows={1}
                    onChange={(e) => setSiteData({ ...siteData, metaDescription: e.target.value })}
                  >{siteData.metaDescription}</textarea>
                </div>
                <div>
                  <p>Extra Header Code</p>
                  <textarea rows={1}
                    onChange={(e) => setSiteData({ ...siteData, extraHeaderCode: e.target.value })}
                  >{siteData.extraHeaderCode}</textarea>
                </div>
                <div>
                  <p>Extra Footer Code</p>
                  <textarea rows={1}
                    onChange={(e) => setSiteData({ ...siteData, extraFooterCode: e.target.value })}
                  >{siteData.extraFooterCode}</textarea>
                </div>
                <div>
                  <p>Location Map Data</p>
                  <textarea rows={1}
                    onChange={(e) => setSiteData({ ...siteData, locationMetaData: e.target.value })}
                  >{siteData.locationMetaData}</textarea>
                </div>
                <div>
                  <p>Select Front Page</p>
                  <textarea rows={1}
                    onChange={(e) => setSiteData({ ...siteData, frontPage: e.target.value })}
                  >{siteData.frontPage}</textarea>
                </div>
              </div>
            </div>
            <div className='w-full flex justify-center gap-3 my-3'>
              <button
                onClick={saveSiteData}
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
          {/* ================================ Company creation ======================*/}
          {/* ======================================================================== */}
          <div className="content__body__main bg-white mt-5">
            <p className='font-bold'>Company Creation</p>
            <hr />
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
                        <LuFileX2 className='remove__upload ' title='Remove upload' onClick={() => removeUpload('invoiceLogo')} />
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
                        <LuFileX2 className='remove__upload' title='Remove upload' onClick={() => removeUpload('signutre')} />
                      </div>
                    </div>
                  </div>
                  <div>
                    <p>Company Address</p>
                    <textarea name="" id="" rows={1}></textarea>
                  </div>
                  <div>
                    <p>Select Country</p>
                    <SelectPicker className='w-full' data={countryList} />
                  </div>
                  <div>
                    <p>Select State</p>
                    <SelectPicker className='w-full' data={statesAndUTs} />
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
                      <td className='min-w-[150px]'><input type="text" id="" /></td>
                      <td className='min-w-[150px]'><input type="text" id="" /></td>
                      <td className='min-w-[150px]'><input type="text" id="" /></td>
                    </tr>
                  </tbody>
                  <tfoot>
                    <tr className='bg-gray-200 h-[30px]'>
                      <th>Next Count</th>
                      <th>Next Count</th>
                      <th>Next Count</th>
                    </tr>
                    <tr>
                      <td className='min-w-[150px]'><input type="text" id="" /></td>
                      <td className='min-w-[150px]'><input type="text" id="" /></td>
                      <td className='min-w-[150px]'><input type="text" id="" /></td>
                    </tr>
                  </tfoot>
                </table>
              </div>
              <div className="w-full flex flex-col lg:flex-row gap-2 lg:gap-5">
                <div className='w-full'>
                  <p>Sales Invoice Reminder (Days Before)</p>
                  <input type="text" name="" id="" />
                </div>
                <div className='w-full'>
                  <p>Purchase Invoice Reminder (Days Before)</p>
                  <input type="text" name="" id="" />
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
          </div>
        </div>
      </main>
    </>
  )
}

export default Setting