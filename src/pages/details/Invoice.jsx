import React, { useEffect, useState } from 'react'
import { BiPrinter } from 'react-icons/bi'
import { FaRegFilePdf } from 'react-icons/fa'
import { MdEditSquare } from 'react-icons/md';
import { IoMdArrowBack } from "react-icons/io";
import Logo from '../../assets/images/logo2.png'
import { useNavigate, useParams } from 'react-router-dom';
import Cookies from 'js-cookie';
import Nav from '../../components/Nav';
import SideNav from '../../components/SideNav';



document.title = "Invoice";
const Invoice = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [billData, setBillData] = useState(null);
  const [companyDetails, setCompanyDetails] = useState(null);

  const printBill = () => {
    const btnGroup = document.querySelector("#invoiceBtn");
    btnGroup.style.display = 'none';
    window.print();
    btnGroup.style.display = '';
  }

  useEffect(() => {
    const getData = async () => {
      try {
        const url = process.env.REACT_APP_API_URL + `/quotation/get`;
        const req = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": 'application/json'
          },
          body: JSON.stringify({ token: Cookies.get("token"), id: id })
        });
        const res = await req.json();
        setBillData(res.data)
        // console.log(res.data)
        return res;

      } catch (error) {
        console.log(error)
        return error;
      }
    }

    const getCompanyDetails = async () => {
      try {
        const url = process.env.REACT_APP_API_URL + `/company/get`;
        const req = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": 'application/json'
          },
          body: JSON.stringify({ token: Cookies.get("token") })
        });
        const res = await req.json();
        console.log(res)
        setCompanyDetails(res);
        return res;

      } catch (error) {
        console.log(error)
        return error;
      }
    }


    getCompanyDetails()
    getData();

  }, [])




  return (
    <>
      <Nav />
      <main id='main'>
        <SideNav />
        <div className="content__body">
          <div id='invoice' className='content__body__main w-[100%] min-h-[100vh] bg-gray-100 flex justify-center'>
            <div className='bg-white w-[190mm] h-[100vh] p-5'>
              {/* Action buttons */}
              <div id='invoiceBtn' className='flex gap-2 w-full justify-end'>
                <button
                  title='PDF'
                  className='bg-blue-700 rounded-full w-[25px] h-[25px] flex justify-center items-center'>
                  <FaRegFilePdf className="text-white text-[15px]" />
                </button>
                <button
                  onClick={printBill}
                  title='Print'
                  className='bg-blue-700 rounded-full w-[25px] h-[25px] flex justify-center items-center'>
                  <BiPrinter className="text-white text-[15px]" />
                </button>
                <button
                  onClick={() => navigate(`/admin/quotation-estimate/edit/${id}`)}
                  title='Edit'
                  className='bg-blue-700 rounded-full w-[25px] h-[25px] flex justify-center items-center'>
                  <MdEditSquare className="text-white text-[15px]" />
                </button>
                <button
                  onClick={() => {
                    navigate(-1)
                  }}
                  title='Back'
                  className='bg-blue-700 rounded-full w-[25px] h-[25px] flex justify-center items-center'>
                  <IoMdArrowBack className="text-white text-[15px]" />
                </button>
              </div>
              <div>
                <p className='font-bold'>Proforma Invoice</p>
                <div className='border-black border border-b-0 w-full mt-3'>
                  <div className='flex w-full border-b border-black h-[130px]'>
                    <div className='p-3 w-[60%] flex justify-center items-center gap-5 border border-r' style={{ borderRight: "1px solid black" }}>
                      <div>
                        <img src={Logo} className='h-[40px]' />
                      </div>
                      <div className='flex flex-col gap-1 text-[12px]'>
                        <p className='text-blue-700 font-bold text-[16px] leading-none'>
                          {companyDetails?.name}
                        </p>
                        <p className='leading-[30px]'>{companyDetails?.address}</p>
                        <p className='leading-[0]'>
                          <span className='font-bold'>GSTIN</span>:  {companyDetails?.gst}
                          <span className='font-bold ml-5'>Mobile</span>:  {companyDetails?.phone}</p>
                        <p><span className='font-bold'>PAN Number</span>: {companyDetails?.pan}</p>
                      </div>
                    </div>
                    <div className='w-[40%] flex flex-col justify-center px-3 text-[12px]'>
                      <p><span className='font-bold'>Proforma Invoice No. </span>{billData?.quotationNumber}</p>
                      <p><span className='font-bold'>Proforma Invoice Date </span>{new Date(billData?.estimateData).toLocaleDateString()}</p>
                    </div>
                  </div>

                  <div className='p-3'>
                    <p className='text-[12px]'>TO</p>
                    <p className='text-black font-bold text-[12px] uppercase'>{billData?.party.name}</p>
                    <p className='text-[12px]'><span className='text-black font-bold'>Address:</span> {billData?.party.address}</p>
                    <p className='text-[12px] uppercase text-black'>
                      <span className='font-bold'>GSTIN:</span> {billData?.party.gst}
                      <span className='font-bold ml-2'>State:</span> {billData?.party.state}
                    </p>
                  </div>
                </div>
                <table className='w-full text-[12px]'>
                  <thead className='bg-gray-100'>
                    <tr>
                      <td className='p-2'>S.NO.</td>
                      <td>ITEM</td>
                      <td>HSN/SAC</td>
                      <td>QTY.</td>
                      <td>RATE</td>
                      <td>DISCOUNT</td>
                      <td>TAX</td>
                      <td>AMOUNT</td>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      billData && billData.items.map((data, index) => {
                        return <tr key={index}>
                          <td className='p-2'>{index + 1}</td>
                          <td>{data.itemName}</td>
                          <td>{data.hsn}</td>
                          <td>{data.qun}</td>
                          <td>{data.price}</td>
                          <td align='right'>
                            {data.discountPerAmount || "0.00"}
                            <div className='text-gray-500'>
                              {
                                isNaN(parseFloat(data.discountPerAmount) / (parseFloat(data.price) * parseFloat(data.qun)) * 100)
                                  ? "(0.00%)"
                                  : `(${((parseFloat(data.discountPerAmount) / (parseFloat(data.price) * parseFloat(data.qun))) * 100).toFixed(2)}%)`
                              }
                            </div>
                          </td>
                          <td align='right'>
                            {((data.qun * data.price) / 100 * data.tax).toFixed(2)}
                            <div className='text-gray-500'>{`(${data.tax || '0.00'}%)`}</div>
                          </td>
                          <td>{
                            (parseFloat(data.price) * parseFloat(data.qun) - parseFloat(data.discountPerAmount || 0) + ((data.qun * data.price) / 100 * data.tax)).toFixed(2)
                          }</td>
                        </tr>
                      })
                    }
                  </tbody>
                  <tfoot>
                    <tr>
                      <td colSpan={3} align='right'>TOTAL</td>
                      <td>1</td>
                      <td></td>
                      <td>INR. 0</td>
                      <td>INR.84.6</td>
                      <td>INR. 554.6</td>
                    </tr>
                  </tfoot>
                </table>

                <table className='w-full text-[12px] mt-2'>
                  <thead className='bg-gray-100'>
                    <tr>
                      <td>HSN Code</td>
                      <td>Tax Type</td>
                      <td>Rate</td>
                      <td>Amount</td>
                      <td>Total Tax Amount</td>
                    </tr>
                  </thead>
                  <tbody>
                    {billData &&
                      billData.items.map((data, i, arr) => {
                        // Check if the previous item has the same HSN (to avoid duplicate rowspan)
                        const isFirstOccurrence = i === 0 || arr[i - 1].hsn !== data.hsn;

                        // Count occurrences for rowspan
                        const rowSpan = isFirstOccurrence
                          ? arr.filter(item => item.hsn === data.hsn).length
                          : 0;

                        return (
                          <tr key={i}>
                            {/* Apply rowSpan only for the first occurrence of an HSN */}
                            {isFirstOccurrence && <td rowSpan={rowSpan}>{data.hsn}</td>}
                            <td>{data.taxType}</td>
                            <td>{data.rate}</td>
                            <td>{data.amount}</td>
                            <td>{data.totalTaxAmount}</td>
                          </tr>
                        );
                      })}
                  </tbody>

                </table>

                <div className='border border-black w-full mt-2'>
                  <div className='w-full border-b border-black'>
                    <p className='text-[12px] p-1'>
                      <span className='font-bold '>Total Amount (in words) : </span>
                      five hundred and fifty four Rupees .six Paise
                    </p>
                  </div>
                  <div className='w-full flex'>
                    <div className='w-full p-2'></div>
                    <div className='border-l border-black w-full text-center p-2'>
                      <img src="/adf/adf" alt="signature" />
                      <p className='text-[10px] leading-[0] mt-5'>Authorised Signatory For</p>
                      <p className='text-[10px]'>Techinnovator Solutions PVT LTD</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}

export default Invoice