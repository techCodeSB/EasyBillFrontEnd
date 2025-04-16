import React, { useEffect, useMemo, useRef, useState } from 'react'
import Nav from '../../components/Nav';
import SideNav from '../../components/SideNav';
import { BiPrinter } from "react-icons/bi";
import { FaRegCopy } from "react-icons/fa";
import { MdEditSquare, MdFilterList } from "react-icons/md";
import { IoInformationCircle } from "react-icons/io5";
import { FaRegFilePdf } from "react-icons/fa";
import { FaRegFileExcel } from "react-icons/fa";
import { MdAdd } from "react-icons/md";
import { MdOutlineCancel } from "react-icons/md";
import { MdOutlineRestorePage } from "react-icons/md";
import { MdDeleteOutline } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import useExportTable from '../../hooks/useExportTable';
import Cookies from 'js-cookie';
import useMyToaster from '../../hooks/useMyToaster';
import downloadPdf from '../../helper/downloadPdf';
import { GrFormNext } from "react-icons/gr";
import { GrFormPrevious } from "react-icons/gr";
import { FaBook } from "react-icons/fa6";
import DataShimmer from '../../components/DataShimmer';
import { Tooltip } from 'react-tooltip';
import { IoIosAdd, IoMdMore } from 'react-icons/io';
import AddNew from '../../components/AddNew';
import { Popover, Whisper } from 'rsuite';
import { FiMoreHorizontal } from "react-icons/fi";
import { FaRegEdit } from "react-icons/fa";
import { LuBookText } from "react-icons/lu";
import { FaUsers } from "react-icons/fa6";

import { MdOutlineTrendingUp } from "react-icons/md";
import { IoMdTrendingDown } from "react-icons/io";
import { MdOutlineCurrencyRupee } from "react-icons/md";







document.title = "Party";
const Party = () => {
  const toast = useMyToaster();
  const { copyTable, downloadExcel, printTable, exportPdf } = useExportTable();
  const [activePage, setActivePage] = useState(1);
  const [dataLimit, setDataLimit] = useState(10);
  const [totalData, setTotalData] = useState()
  const [selected, setSelected] = useState([]);
  const navigate = useNavigate();
  const [partyData, setPartyData] = useState([]);
  const tableRef = useRef(null);
  const [tableStatusData, setTableStatusData] = useState('active');
  const exportData = useMemo(() => {
    return partyData && partyData.map(({ name, type, openingBalance }) => ({
      Name: name,
      Type: type,
      OpeningBalance: openingBalance,
    }));
  }, [partyData]);
  const [loading, setLoading] = useState(true)
  const [totalCollection, setTotalCollection] = useState(null)
  const [totalPay, setTotalPay] = useState(null)



  // Get data;
  useEffect(() => {
    const getParty = async () => {
      try {
        const data = {
          token: Cookies.get("token"),
          trash: tableStatusData === "trash" ? true : false,
          all: tableStatusData === "all" ? true : false
        }
        const url = process.env.REACT_APP_API_URL + `/party/get?page=${activePage}&limit=${dataLimit}`;
        const req = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": 'application/json'
          },
          body: JSON.stringify(data)
        });
        const res = await req.json();
        setTotalData(res.totalData)
        setPartyData([...res.data]);
        setLoading(false);

      } catch (error) {
        console.log(error)
      }
    }
    getParty();
  }, [tableStatusData, dataLimit, activePage])


  useEffect(() => {
    const getTotaoCollectAndPay = async (whichType) => {
      try {
        const url = process.env.REACT_APP_API_URL + `/${whichType}/get`;
        const req = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": 'application/json'
          },
          body: JSON.stringify({token: Cookies.get("token"), totalPayment: true})
        });
        const res = await req.json();
        
        if(req.status === 200){
          if(whichType === "paymentin"){
            setTotalCollection(res.totalAmount);
          }else{
            setTotalPay(res.totalAmount);
          }
        }

      } catch (error) {
        return toast("Can't get total collection", 'error')
      }

    }

    getTotaoCollectAndPay("paymentin");
    getTotaoCollectAndPay("paymentout");


  }, [])



  const searchTable = (e) => {
    const value = e.target.value.toLowerCase();
    const rows = document.querySelectorAll('.list__table tbody tr');
    rows.forEach(row => {
      const cols = row.querySelectorAll('td');
      let found = false;
      cols.forEach((col, index) => {
        if (index !== 0 && col.innerHTML.toLowerCase().includes(value)) {
          found = true;
        }
      });
      if (found) {
        row.style.display = "";
      } else {
        row.style.display = "none";
      }
    });
  }


  const selectAll = (e) => {
    if (e.target.checked) {
      setSelected(partyData.map(party => party._id));
    } else {
      setSelected([]);
    }
  };


  const handleCheckboxChange = (id) => {
    setSelected((prevSelected) => {
      if (prevSelected.includes(id)) {
        return prevSelected.filter((previd, _) => previd !== id);
      } else {
        return [...prevSelected, id];
      }
    });
  };


  const exportTable = async (whichType) => {
    if (whichType === "copy") {
      copyTable("listOfPartys"); // Pass tableid
    }
    else if (whichType === "excel") {
      downloadExcel(exportData, 'party-list.xlsx') // Pass data and filename
    }
    else if (whichType === "print") {
      printTable(tableRef, "Party List"); // Pass table ref and title
    }
    else if (whichType === "pdf") {
      let document = exportPdf('Party List', exportData);
      downloadPdf(document)
    }
  }


  const removeData = async (trash) => {
    if (selected.length === 0 || tableStatusData !== 'active') {
      return;
    }
    const url = process.env.REACT_APP_API_URL + "/party/delete";
    try {
      const req = await fetch(url, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ ids: selected, trash: trash })
      });
      const res = await req.json();

      if (req.status !== 200 || res.err) {
        return toast(res.err, 'error');
      }

      selected.forEach((id, _) => {
        setPartyData((prevData) => {
          return prevData.filter((data, _) => data._id !== id)
        })
      });
      setSelected([]);

      return toast(res.msg, 'success');

    } catch (error) {
      console.log(error)
      toast("Something went wrong", "error")
    }
  }


  const restoreData = async () => {
    if (selected.length === 0 || tableStatusData !== "trash") {
      return;
    }

    const url = process.env.REACT_APP_API_URL + "/party/restore";
    try {
      const req = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ ids: selected })
      });
      const res = await req.json();

      if (req.status !== 200 || res.err) {
        return toast(res.err, 'error');
      }

      selected.forEach((id, _) => {
        setPartyData((prevData) => {
          return prevData.filter((data, _) => data._id !== id)
        })
      });
      setSelected([]);
      return toast(res.msg, 'success');

    } catch (error) {
      console.log(error)
      toast("Something went wrong", "error")
    }
  }



  return (
    <>
      <Nav title={"Party"} />
      <main id='main' >
        <SideNav />
        <Tooltip id='partyTooltip' />
        <div className="content__body">
          {/* top section */}
          <div className={`add_new_compnent`}>
            <div className='flex justify-between items-center'>
              <div className='flex flex-col'>
                <select value={dataLimit} onChange={(e) => setDataLimit(e.target.value)}>
                  <option value={10}>10</option>
                  <option value={25}>25</option>
                  <option value={50}>50</option>
                  <option value={100}>100</option>
                </select>
              </div>
              <div className='flex items-center gap-2 listing__btn_grp'>
                <div className='flex w-full flex-col lg:w-[300px]'>
                  <input type='text'
                    placeholder='Search...'
                    onChange={searchTable}
                    className='p-[6px]'
                  />
                </div>
                {/* <button className='bg-gray-100 border'>
                  <MdFilterList className='text-xl' />
                  Filter
                </button> */}
                <button
                  onClick={() => removeData(false)}
                  className={`${selected.length > 0 ? 'bg-red-500 text-white' : 'bg-gray-100'} border`}>
                  <MdDeleteOutline className='text-lg' />
                  Delete
                </button>
                <button
                  onClick={() => navigate("/admin/party/add")}
                  className='bg-[#003E32] text-white '>
                  <IoIosAdd className='text-xl text-white' />
                  Add New
                </button>
                <div className='flex justify-end'>
                  <Whisper placement='leftStart' enterable
                    speaker={<Popover full>
                      <div className='download__menu' onClick={() => exportTable('print')} >
                        <BiPrinter className='text-[16px]' />
                        Print Table
                      </div>
                      <div className='download__menu' onClick={() => exportTable('copy')}>
                        <FaRegCopy className='text-[16px]' />
                        Copy Table
                      </div>
                      <div className='download__menu' onClick={() => exportTable('pdf')}>
                        <FaRegFilePdf className="text-[16px]" />
                        Download Pdf
                      </div>
                      <div className='download__menu' onClick={() => exportTable('excel')} >
                        <FaRegFileExcel className='text-[16px]' />
                        Download Excel
                      </div>
                    </Popover>}
                  >
                    <div className='record__download' >
                      <IoMdMore />
                    </div>
                  </Whisper>
                </div>
              </div>
            </div>

            <div id='party'>
            </div>
          </div>
          {
            !loading ? partyData.length > 0 ? <div className='content__body__main'>
              <div className='flex flex-col md:flex-row justify-between items-center mb-5 gap-8'>
                <div className='party__data'>
                  <h6><FaUsers /> Total Parties</h6>
                  <p>{totalData}</p>
                </div>
                <div className='party__data'>
                  <h6><MdOutlineTrendingUp /> Total Pay</h6>
                  <p><MdOutlineCurrencyRupee />{totalPay}</p>
                </div>
                <div className='party__data'>
                  <h6><IoMdTrendingDown /> Total Collect</h6>
                  <p><MdOutlineCurrencyRupee /> {totalCollection}</p>
                </div>
              </div>

              {/* Table start */}
              <div className='overflow-x-auto list__table'>
                <table className='min-w-full bg-white' id='listOfPartys' ref={tableRef}>
                  <thead className='list__table__head'>
                    <tr>
                      <th className='py-2 px-4 w-[50px]'>
                        <input type='checkbox' onChange={selectAll} checked={partyData.length > 0 && selected.length === partyData.length} />
                      </th>
                      <td className='py-2 px-4'>Name</td>
                      <td className='py-2 px-4'>Phone</td>
                      <th className='py-2 px-4'>Type</th>
                      <th className='py-2 px-4'>Balance</th>
                      <th className='py-2 px-4 w-[100px]'>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      partyData.map((data, i) => {
                        return <tr key={i}>
                          <td className='py-2 px-4'>
                            <input type='checkbox' checked={selected.includes(data._id)} onChange={() => handleCheckboxChange(data._id)} />
                          </td>
                          <td className='px-4'>{data.name}</td>
                          <td className='px-4'>{data.contactNumber}</td>
                          <td className='px-4 text-center'>
                            <span className='customer_badge'>
                              {data.type}
                            </span>
                          </td>
                          <td className='px-4 text-center'>{data.openingBalance}</td>
                          <td className='px-4 text-center'>
                            <Whisper
                              placement='leftStart'
                              trigger={"click"}
                              speaker={<Popover full>
                                <div
                                  className='table__list__action__icon'
                                  onClick={() => navigate("/admin/party/edit/" + data._id)}
                                >
                                  <FaRegEdit className='text-[16px]' />
                                  Edit
                                </div>
                                <div
                                  className='table__list__action__icon'
                                  onClick={() => navigate("/admin/party/ladger/" + data._id)}
                                >
                                  <LuBookText className='text-[16px]' />
                                  Ladger
                                </div>
                              </Popover>}
                            >
                              <div className='table__list__action' >
                                <FiMoreHorizontal />
                              </div>
                            </Whisper>
                          </td>
                        </tr>
                      })
                    }
                  </tbody>
                </table>
                <div className='paginate__parent'>
                  <p>Showing {partyData.length} of {totalData} entries</p>
                  {/* ----- Paginatin ----- */}
                  <div className='flex justify-end gap-2'>
                    {
                      activePage > 1 ? <div
                        onClick={() => setActivePage(activePage - 1)}
                        className='border bg-[#003E32] text-white w-[20px] h-[20px] grid place-items-center rounded cursor-pointer'>
                        <GrFormPrevious />
                      </div> : null
                    }
                    {
                      Array.from({ length: Math.ceil((totalData / dataLimit)) }).map((_, i) => {
                        return <div
                          onClick={() => setActivePage(i + 1)}
                          className='border-[#003E32] border w-[20px] h-[20px] text-center rounded cursor-pointer'
                          style={activePage === i + 1 ? { border: "1px solid #003E32" } : {}}
                        >
                          {i + 1}
                        </div>
                      })
                    }
                    {
                      (totalData / dataLimit) > activePage ? <div
                        onClick={() => setActivePage(activePage + 1)}
                        className='border bg-[#003E32] text-white w-[20px] h-[20px] flex items-center justify-center rounded cursor-pointer'>
                        <GrFormNext />
                      </div> : null
                    }
                  </div>
                  {/* pagination end */}
                </div>
              </div>
            </div>
              : <AddNew title={"Party"} link={"/admin/party/add"} />
              : <DataShimmer />
          }
        </div>
      </main >
    </>
  )
}

export default Party;

