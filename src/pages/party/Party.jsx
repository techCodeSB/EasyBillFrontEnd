import React, { useEffect, useRef, useState } from 'react'
import Nav from '../../components/Nav';
import SideNav from '../../components/SideNav';
import { Pagination } from 'rsuite';
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
import { PDFDownloadLink, PDFViewer } from '@react-pdf/renderer';
import useMyToaster from '../../hooks/useMyToaster';


document.title = "Party"
const Party = () => {
  const toast = useMyToaster();
  const { copyTable, downloadExcel, printTable, exportPdf } = useExportTable();
  const [activePage, setActivePage] = useState(1);
  const [selected, setSelected] = useState([]);
  const navigate = useNavigate();
  const [partyData, setPartyData] = useState([]);
  const tableRef = useRef(null);
  const exportData = partyData.map(({ name, type, openingBalance }) => ({
    Name: name, Type: type, OpeningBalance: openingBalance
  }));

  console.log('run party----')

  // Get partys;
  useEffect(() => {
    const getParty = async () => {
      try {
        const url = process.env.REACT_APP_API_URL + "/party/get";
        const req = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": 'application/json'
          },
          body: JSON.stringify({ token: Cookies.get("token") })
        });
        const res = await req.json();

        setPartyData([...res])

      } catch (error) {
        console.log(error)
      }
    }

    getParty();
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



  const exportTable = (whichType) => {
    if (whichType === "copy") {
      copyTable("listOfPartys"); // Pass tableid
    }
    else if (whichType === "excel") {
      downloadExcel(exportData, 'party-list.xlsx') // pass data and filename
    }
    else if (whichType === "print") {
      printTable(tableRef, "Party List"); // pass table ref and title
    }
  }

  const removeData = async (trash) => {
    if (selected.length === 0) {
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
                  <select>
                    <option>10</option>
                    <option>25</option>
                    <option>50</option>
                    <option>100</option>
                  </select>
                </div>
                <div className='list__icons'>
                  <div className='list__icon' title='Print'>
                    <BiPrinter className='text-white text-[16px]' onClick={() => exportTable('print')} />
                  </div>
                  <div className='list__icon' title='Copy'>
                    <FaRegCopy className='text-white text-[16px]' onClick={() => exportTable('copy')} />
                  </div>
                  <PDFDownloadLink
                    document={exportPdf('Party List', exportData)}
                    fileName="party">
                    <div className='list__icon' title='PDF'>
                      <FaRegFilePdf className="text-white text-[16px]" />
                    </div>
                  </PDFDownloadLink>
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

            {/* Second Row */}
            <div className='list_buttons'>
              <button className='bg-teal-500 hover:bg-teal-400' onClick={() => navigate('/admin/party/add')}>
                <MdAdd className='text-lg' />
                Add New
              </button>
              <button className='bg-orange-400 hover:bg-orange-300' onClick={() => removeData(true)}>
                <MdOutlineCancel className='text-lg' />
                Trash
              </button>
              <button className='bg-green-500 hover:bg-green-400'>
                <MdOutlineRestorePage className='text-lg' />
                Restore
              </button>
              <button className='bg-red-600 hover:bg-red-500'>
                <MdDeleteOutline className='text-lg' />
                Delete
              </button>
              <select name="" id="" className='bg-blue-500 text-white'>
                <option value="">All</option>
                <option value="">Active</option>
                <option value="">Trash</option>
              </select>
            </div>

            {/* Table start */}
            <div className='overflow-x-auto mt-5 list__table'>
              <table className='min-w-full bg-white' id='listOfPartys' ref={tableRef}>
                <thead className='bg-gray-100'>
                  <tr>
                    <th className='py-2 px-4 border-b w-[50px]'>
                      <input type='checkbox' onChange={selectAll} checked={selected.length === partyData.length} />
                    </th>
                    <th className='py-2 px-4 border-b'>Name</th>
                    <th className='py-2 px-4 border-b'>Type</th>
                    <th className='py-2 px-4 border-b'>Balance</th>
                    <th className='py-2 px-4 border-b w-[100px]'>Action</th>
                  </tr>
                </thead>
                <tbody>
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
                            <button className='bg-blue-400 text-white px-2 py-1 rounded w-full text-[16px]'>
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
                </tbody>
              </table>
              <p className='py-4'>Showing 1 to 2 of 2 entries</p>
              <div className='flex justify-end'>
                <div className='bg-gray-200 p-1 rounded'>
                  <Pagination total={100} limit={5}
                    maxButtons={3}
                    activePage={activePage}
                    onChangePage={setActivePage}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main >
    </>
  )
}

export default Party;

