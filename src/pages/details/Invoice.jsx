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
import { toWords } from 'number-to-words';
import { Document, Page, View, Text, Image, StyleSheet, PDFViewer } from '@react-pdf/renderer';
import downloadPdf from '../../helper/downloadPdf';



document.title = "Invoice";
const Invoice = () => {
  const navigate = useNavigate();
  const { id, bill } = useParams();
  const [billData, setBillData] = useState(null);
  const [companyDetails, setCompanyDetails] = useState(null);
  const [hsnData, setHsnData] = useState([]);
  const [billDetails, setBillDetails] = useState({})
  const [totalAmountInText, setTotalAmountInText] = useState("");
  const [urlRoute, setUrlRoute] = useState("");




  useEffect(() => {
    if (bill === "quotation") {
      setUrlRoute("quotation");
    } else if (bill === "proforma") {
      setUrlRoute('proforma')
    } else if (bill === 'po') {
      setUrlRoute('po')
    } else if (bill === 'purchaseinvoice') {
      setUrlRoute("purchaseinvoice")
    } else if (bill === "purchasereturn") {
      setUrlRoute('purchasereturn')
    } else if (bill === 'debitnote') {
      setUrlRoute("debitnote")
    } else if (bill === 'salesinvoice') {
      setUrlRoute("salesinvoice")
    } else if (bill === 'salesreturn') {
      setUrlRoute("salesreturn")
    } else if (bill === 'creditnote') {
      setUrlRoute("creditnote")
    } else if (bill === 'deliverychalan') {
      setUrlRoute("deliverychalan")
    } else if (bill === 'deliverychalan') {
      setUrlRoute("deliverychalan")
    }
  }, [])



  useEffect(() => {
    const getData = async () => {
      try {

        const url = process.env.REACT_APP_API_URL + `/${urlRoute}/get`;
        const req = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": 'application/json'
          },
          body: JSON.stringify({ token: Cookies.get("token"), id: id })
        });
        const res = await req.json();
        setBillData(res.data)
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

  }, [urlRoute])


  useEffect(() => {
    let data = [];

    billData && billData.items.forEach((b, _) => {
      let obj = {};

      obj['hsn'] = b.hsn;
      obj['rate'] = b.tax;

      if (data.length > 0) {
        for (let i = 0; i < data.length; i++) {
          if (obj.hsn == data[i].hsn) {
            data[i]['price'] += parseInt(b.price);
            obj['price'] = parseInt(data[i].price);

            data[i]['taxAmount'] += (parseInt(b.qun) * parseInt(b.price)) / 100 * parseInt(b.tax);
            obj['taxAmount'] = parseInt(data[i]['taxAmount']);

            break;
          } else {
            obj['price'] = parseInt(b.price);
            obj['taxAmount'] = (parseInt(b.qun) * parseInt(b.price)) / 100 * parseInt(b.tax);
          }

        }

      } else {
        obj['price'] = parseInt(b.price);
        obj['taxAmount'] = (parseInt(b.qun) * parseInt(b.price)) / 100 * parseInt(b.tax)
      }

      data.push(obj)
    })

    setHsnData([...data]);

  }, [billData]);



  useEffect(() => {
    let qun = 0;
    let taxAmount = 0;
    let discount = 0;
    let amount = 0;

    billData && billData.items.map((b, _) => {
      qun += parseInt(b.qun)
      taxAmount += (parseInt(b.qun) * parseInt(b.price)) / 100 * b.tax;
      discount += parseInt(b.discountPerAmount);

      let a = ((parseInt(b.qun) * parseInt(b.price)) + (parseInt(b.qun) * parseInt(b.price)) / 100 * b.tax);
      amount += a - parseInt(b.discountPerAmount)

    })

    setBillDetails({
      ...billDetails, qun, taxAmount: (taxAmount).toFixed(2), discount, amount: (amount).toFixed(2)
    })

    setTotalAmountInText(toWords(amount));

  }, [billData])


  return (

    <>
      <Nav />
      <main id='main'>
        <SideNav />
        <div className="content__body">
          <div id='invoice' className='content__body__main w-[100%] min-h-[100vh] bg-gray-100 flex justify-center'>
            <div className='bg-white /*w-[190mm]*/ w-[80%]  p-5'>
              {/* Action buttons */}
              <div id='invoiceBtn' className='flex gap-2 w-full justify-end mb-5'>
                <button
                  onClick={() => {
                    downloadPdf(
                      InvoicePdf({ companyDetails, billData, billDetails, hsnData, totalAmountInText })
                    );
                  }}
                  title='PDF'
                  className='bg-blue-700 text-white rounded-[5px] flex justify-center items-center p-2'>
                  <FaRegFilePdf className="text-white text-[15px] mr-1" />
                  Download
                </button>
                {/* <button
                  onClick={() => {
                    navigate(`/admin/bill/print/${id}`)
                  }}
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
                </button> */}
              </div>

              <div>
                <p className='font-bold'>{urlRoute.toUpperCase()}</p>
                <div className='border-black border border-b-0 w-full mt-3'>
                  <div className='flex w-full border-b border-black h-[130px]'>
                    <div className='p-3 w-[60%] flex items-center gap-5 border border-r' style={{ borderRight: "1px solid black" }}>
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
                      <p><span className='font-bold'>Invoice No. </span>{billData?.quotationNumber}</p>
                      <p><span className='font-bold'>Invoice Date </span>{new Date(billData?.estimateData).toLocaleDateString()}</p>
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
                    <tr className='font-bold'>
                      <td colSpan={3} align='right'>TOTAL</td>
                      <td>{billDetails.qun}</td>
                      <td></td>
                      <td>INR. {billDetails.discount}</td>
                      <td>INR. {billDetails.taxAmount}</td>
                      <td>INR. {billDetails.amount}</td>
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
                    {hsnData && (
                      [...new Map(hsnData.map(item => [item.hsn, item]))].map(([hsn, data], i) => {
                        return <>
                          <tr key={`${i}-sgst`}>
                            <td rowSpan={2}>{data.hsn}</td>
                            <td>SGST</td>
                            <td>{data.rate / 2}%</td>
                            <td>{data.price}</td>
                            <td>{(data.taxAmount).toFixed(2)}</td>
                          </tr>
                          <tr key={`${i}-cgst`}>
                            <td>CGST</td>
                            <td>{data.rate / 2}%</td>
                            <td>{data.price}</td>
                            <td>{(data.taxAmount).toFixed(2)}</td>
                          </tr>
                        </>
                      })
                    )}
                  </tbody>

                </table>

                <div className='border border-black w-full mt-2'>
                  <div className='w-full border-b border-black'>
                    <p className='text-[12px] p-1'>
                      <span className='font-bold '>Total Amount (in words) : </span>
                      {/* five hundred and fifty four Rupees .six Paise */}
                      {totalAmountInText}
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

  );
}



const InvoicePdf = ({ companyDetails, billData, billDetails, hsnData, totalAmountInText }) => {

  const styles = StyleSheet.create({
    page: { padding: 20 },
    section: { marginBottom: 0 },
    bold: { fontWeight: 'bold' },
    flexRow: { flexDirection: 'row' },
    flexCol: { flexDirection: 'column' },
    border: { border: '1px solid black' },
    table: { display: 'table', width: 'auto' },
    tableRow: { flexDirection: 'row' },
    tableCol: { borderBottom: '1px solid black', padding: 2, borderRight: '0px solid black', borderLeft: '1px solid black', },
    header: { backgroundColor: '#f0f0f0' },
    textSmall: { fontSize: 10 },
    textXSmall: { fontSize: 5 },
    partyText: { paddingTop: 3, paddingBottom: 3 }
  });

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.section}>
          <Text style={[styles.bold, { marginBottom: 10 }]}>Proforma Invoice</Text>
          <View style={[styles.border, { borderBottomWidth: 0 }]}>
            <View style={[styles.flexRow, { borderBottom: '1px solid black', height: 90 }]}>
              <View style={{ width: '60%', padding: 10, flexDirection: 'row', borderRight: '1px solid black' }}>
                <Image src={Logo} style={{ height: 35, marginRight: 10, marginTop: 15 }} />
                <View style={[styles.flexCol, styles.textSmall]}>
                  <Text style={[{ color: '#2202D0', fontWeight: '800', fontSize: 14, }, styles.partyText]}>
                    {companyDetails?.name}
                  </Text>
                  <Text style={styles.partyText}>{companyDetails?.address}</Text>
                  <Text>
                    <Text style={[styles.bold, styles.partyText]}>GSTIN:</Text> {companyDetails?.gst}
                    <Text style={[styles.bold, styles.partyText]}> Mobile:</Text> {companyDetails?.phone}
                  </Text>
                  <Text style={styles.partyText}><Text style={[styles.bold]}>PAN Number:</Text> {companyDetails?.pan}</Text>
                </View>
              </View>
              <View style={[styles.flexCol, { width: '40%', padding: 10, justifyContent: 'center' }, styles.textSmall]}>
                <Text style={styles.partyText}><Text style={styles.bold}>Invoice No.</Text> {billData?.quotationNumber}</Text>
                <Text style={styles.partyText}><Text style={styles.bold}>Invoice Date</Text> {new Date(billData?.estimateData).toLocaleDateString()}</Text>
              </View>
            </View>

            {/* Party Details */}
            <View style={{ padding: 10 }}>
              <Text style={[styles.textSmall, styles.partyText]}>TO</Text>
              <Text style={[styles.bold, styles.textSmall, styles.partyText]}>{billData?.party.name?.toUpperCase()}</Text>
              <Text style={[styles.textSmall, styles.partyText]}>
                <Text>Address:</Text> {billData?.party.address}
              </Text>
              <Text style={[styles.textSmall, styles.partyText, { textTransform: 'uppercase' }]}>
                <Text>GSTIN:</Text> {billData?.party.gst}
                <Text>State:</Text> {billData?.party.state}
              </Text>
            </View>
          </View>
        </View>

        {/* Items Table */}
        <View style={[styles.table, { borderTop: "1px solid black", borderRight: "1px solid black" }]}>
          <View style={[styles.tableRow, styles.header]}>
            {['S.NO.', 'ITEM', 'HSN/SAC', 'QTY.', 'RATE', 'DISCOUNT', 'TAX', 'AMOUNT'].map((header, i) => (
              <View key={i} style={[styles.tableCol, { width: i === 1 ? '30%' : '10%' }]}>
                <Text style={styles.textSmall}>{header}</Text>
              </View>
            ))}
          </View>
          {billData?.items.map((data, index) => (
            <View style={[styles.tableRow]} key={index}>
              <View style={[styles.tableCol, { width: '10%' }]}><Text style={styles.textSmall}>{index + 1}</Text></View>
              <View style={[styles.tableCol, { width: '30%' }]}><Text style={styles.textSmall}>{data.itemName}</Text></View>
              <View style={[styles.tableCol, { width: '10%' }]}><Text style={styles.textSmall}>{data.hsn}</Text></View>
              <View style={[styles.tableCol, { width: '10%' }]}><Text style={styles.textSmall}>{data.qun}</Text></View>
              <View style={[styles.tableCol, { width: '10%' }]}><Text style={styles.textSmall}>{data.price}</Text></View>
              <View style={[styles.tableCol, { width: '10%' }]}>
                <Text style={styles.textSmall}>{data.discountPerAmount || "0.00"}</Text>
                <Text style={[styles.textSmall, { color: '#666' }]}>
                  {isNaN(parseFloat(data.discountPerAmount) / (parseFloat(data.price) * parseFloat(data.qun)) * 100)
                    ? "(0.00%)"
                    : `(${((parseFloat(data.discountPerAmount) / (parseFloat(data.price) * parseFloat(data.qun))) * 100).toFixed(2)}%)`}
                </Text>
              </View>
              <View style={[styles.tableCol, { width: '10%' }]}>
                <Text style={styles.textSmall}>{((data.qun * data.price) / 100 * data.tax).toFixed(2)}</Text>
                <Text style={[styles.textSmall, { color: '#666' }]}>{`(${data.tax || '0.00'}%)`}</Text>
              </View>
              <View style={[styles.tableCol, { width: '10%' }]}>
                <Text style={styles.textSmall}>
                  {(parseFloat(data.price) * parseFloat(data.qun) - parseFloat(data.discountPerAmount || 0) + ((data.qun * data.price) / 100 * data.tax)).toFixed(2)}
                </Text>
              </View>
            </View>
          ))}
          <View style={[styles.tableRow, styles.bold]}>
            <View style={[styles.tableCol, { width: '50%' }]}><Text style={styles.textSmall}>TOTAL</Text></View>
            <View style={[styles.tableCol, { width: '10%' }]}><Text style={styles.textSmall}>{billDetails.qun}</Text></View>
            <View style={[styles.tableCol, { width: '10%' }]}><Text style={styles.textSmall}></Text></View>
            <View style={[styles.tableCol, { width: '10%' }]}><Text style={styles.textSmall}>INR. {billDetails.discount}</Text></View>
            <View style={[styles.tableCol, { width: '10%' }]}><Text style={styles.textSmall}>INR. {billDetails.taxAmount}</Text></View>
            <View style={[styles.tableCol, { width: '10%' }]}><Text style={styles.textSmall}>INR. {billDetails.amount}</Text></View>
          </View>
        </View>

        {/* HSN Table */}
        <View style={[styles.table, { marginTop: 10, borderTop: "1px solid black", borderRight: "1px solid black" }]}>
          <View style={[styles.tableRow, styles.header]}>
            {['HSN Code', 'Tax Type', 'Rate', 'Amount', 'Total Tax Amount'].map((header, i) => (
              <View key={i} style={[styles.tableCol, { width: '20%' }]}>
                <Text style={styles.textSmall}>{header}</Text>
              </View>
            ))}
          </View>
          {hsnData && [...new Map(hsnData.map(item => [item.hsn, item]))].map(([hsn, data], i) => (
            <>
              <View style={styles.tableRow} key={`${i}-sgst`}>
                <View style={[styles.tableCol, { width: '20%', borderBottom: '0' }]}>
                  <Text style={styles.textSmall}>{data.hsn}</Text>
                </View>
                <View style={[styles.tableCol, { width: '20%' }]}>
                  <Text style={styles.textSmall}>SGST</Text>
                </View>
                <View style={[styles.tableCol, { width: '20%' }]}>
                  <Text style={styles.textSmall}>{data.rate / 2}%</Text>
                </View>
                <View style={[styles.tableCol, { width: '20%' }]}>
                  <Text style={styles.textSmall}>{data.price}</Text>
                </View>
                <View style={[styles.tableCol, { width: '20%' }]}>
                  <Text style={styles.textSmall}>{(data.taxAmount).toFixed(2)}</Text>
                </View>
              </View>
              <View style={styles.tableRow} key={`${i}-cgst`}>
                <View style={[styles.tableCol, { width: '20%' }]}>
                  <Text style={styles.textSmall}></Text>
                </View>
                <View style={[styles.tableCol, { width: '20%' }]}>
                  <Text style={styles.textSmall}>CGST</Text>
                </View>
                <View style={[styles.tableCol, { width: '20%' }]}>
                  <Text style={styles.textSmall}>{data.rate / 2}%</Text>
                </View>
                <View style={[styles.tableCol, { width: '20%' }]}>
                  <Text style={styles.textSmall}>{data.price}</Text>
                </View>
                <View style={[styles.tableCol, { width: '20%' }]}>
                  <Text style={styles.textSmall}>{(data.taxAmount).toFixed(2)}</Text>
                </View>
              </View>
            </>
          ))}
        </View>

        {/* Footer */}
        <View style={[styles.border, { marginTop: 10 }]}>
          <View style={{ borderBottom: '1px solid black', padding: 3 }}>
            <Text style={styles.textSmall}>
              <Text style={styles.bold}>Total Amount (in words) :</Text> {totalAmountInText}
            </Text>
          </View>
          <View style={styles.flexRow}>
            <View style={{ width: '50%' }}></View>
            <View style={{ width: '50%', borderLeft: '1px solid black', textAlign: 'center', padding: 5 }}>
              <Image src="/adf/adf" style={{ height: 30, marginBottom: 10 }} />
              <Text style={styles.textSmall}>Authorised Signatory For</Text>
              <Text style={styles.textSmall}>Techinnovator Solutions PVT LTD</Text>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  )
}


export {
  InvoicePdf
}
export default Invoice