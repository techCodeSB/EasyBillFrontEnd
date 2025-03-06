import React, { useEffect, useMemo, useRef, useState } from 'react'
import Nav from '../../components/Nav';
import SideNav from '../../components/SideNav';
import { BiPrinter } from "react-icons/bi";
import { FaRegCopy } from "react-icons/fa";
import { MdEditSquare } from "react-icons/md";
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




document.title = "Ladger";
const Ladger = () => {
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
        setPartyData([...res.data])

      } catch (error) {
        console.log(error)
      }
    }
    getParty();
  }, [tableStatusData, dataLimit, activePage])



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
        {/* <PDFViewer width={'100%'}>
          {exportPdf("Party List", exportData)}
        </PDFViewer> */}
        <div className="content__body">
          <div className='content__body__main bg-white'>
            {/* First Row */}
            <div className='flex justify-between items-center flex-col lg:flex-row gap-4'>
              <div className='flex items-center gap-4 justify-between w-full lg:justify-start'>
                <div className='flex flex-col'>
                  <p>Show</p>
                  <select value={dataLimit} onChange={(e) => setDataLimit(e.target.value)}>
                    <option value={10}>10</option>
                    <option value={25}>25</option>
                    <option value={50}>50</option>
                    <option value={100}>100</option>
                  </select>
                </div>
                <div className='list__icons'>
                  <div className='list__icon' title='Print'>
                    <BiPrinter className='text-white text-[16px]' onClick={() => exportTable('print')} />
                  </div>
                  <div className='list__icon' title='Copy'>
                    <FaRegCopy className='text-white text-[16px]' onClick={() => exportTable('copy')} />
                  </div>
                  <div className='list__icon' title='PDF' onClick={() => exportTable('pdf')}>
                    <FaRegFilePdf className="text-white text-[16px]" />
                  </div>
                  <div className='list__icon' title='Excel'>
                    <FaRegFileExcel className='text-white text-[16px]' onClick={() => exportTable('excel')} />
                  </div>
                </div>
              </div>
              <div className='flex w-full flex-col lg:w-[300px]'>
                <p>Search</p>
                <input type='text' onChange={searchTable} />
              </div>
            </div>

            {/* Table start */}
            <div className='overflow-x-auto mt-5 list__table'>
              <table className='min-w-full bg-white' id='listOfPartys' ref={tableRef}>
                <thead className='bg-gray-100'>
                  <tr>
                    <th className='py-2 px-4 border-b w-[50px]'>
                      <input type='checkbox' onChange={selectAll} checked={partyData.length > 0 && selected.length === partyData.length} />
                    </th>
                    <th className='py-2 px-4 border-b'>Date</th>
                    <th className='py-2 px-4 border-b'>Purpose</th>
                    <th className='py-2 px-4 border-b'>Transaction No</th>
                    <th className='py-2 px-4 border-b w-[100px]'>Remark</th>
                    <th className='py-2 px-4 border-b w-[100px]'>Debit</th>
                    <th className='py-2 px-4 border-b w-[100px]'>Credit</th>
                  </tr>
                </thead>
                {/* <tbody>
                  {
                    partyData.map((data, i) => {
                      return <tr key={i}>
                        <td className='py-2 px-4 border-b'>
                          <input type='checkbox' checked={selected.includes(data._id)} onChange={() => handleCheckboxChange(data._id)} />
                        </td>
                        <td className='px-4 border-b'>{data.name}</td>
                        <td className='px-4 border-b'>{data.type}</td>
                        <td className='px-4 border-b'>{data.openingBalance}</td>
                        <td className='px-4 border-b'>
                          <div className='flex flex-col md:flex-row gap-2 mr-2'>
                            <button
                              onClick={() => navigate("/admin/party/edit/" + data._id)}
                              className='bg-blue-400 text-white px-2 py-1 rounded w-full text-[16px]'>
                              <MdEditSquare />
                            </button>
                            <button className='bg-red-500 text-white px-2 py-1 rounded w-full text-lg'>
                              <IoInformationCircle />
                            </button>
                          </div>
                        </td>
                      </tr>
                    })
                  }
                </tbody> */}
              </table>
              <p className='py-4'>Showing {partyData.length} of {totalData} entries</p>
              {/* ----- Paginatin ----- */}
              <div className='flex justify-end gap-2'>
                {
                  activePage > 1 ? <div
                    onClick={() => setActivePage(activePage - 1)}
                    className='border bg-blue-600 text-white w-[20px] h-[20px] grid place-items-center rounded cursor-pointer'>
                    <GrFormPrevious />
                  </div> : null
                }
                {
                  Array.from({ length: Math.ceil((totalData / dataLimit)) }).map((_, i) => {
                    return <div
                      onClick={() => setActivePage(i + 1)}
                      className='border-blue-400 border w-[20px] h-[20px] text-center rounded cursor-pointer'
                      style={activePage === i + 1 ? { border: "1px solid blue" } : {}}
                    >
                      {i + 1}
                    </div>
                  })
                }
                {
                  (totalData / dataLimit) > activePage ? <div
                    onClick={() => setActivePage(activePage + 1)}
                    className='border bg-blue-600 text-white w-[20px] h-[20px] flex items-center justify-center rounded cursor-pointer'>
                    <GrFormNext />
                  </div> : null
                }
              </div>
              {/* pagination end */}
            </div>
          </div>
        </div>
      </main >
    </>
  )
}

export default Ladger;

