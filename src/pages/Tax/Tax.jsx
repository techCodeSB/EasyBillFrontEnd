import React, { useEffect, useMemo, useRef, useState } from 'react'
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
import downloadPdf from '../../helper/downloadPdf';
import Cookies from 'js-cookie';
import useMyToaster from '../../hooks/useMyToaster';

const Tax = ({ mode }) => {
  const toast = useMyToaster();
  const { copyTable, downloadExcel, printTable, exportPdf } = useExportTable();
  const [activePage, setActivePage] = useState(1);
  const [selected, setSelected] = useState([]);
  const navigate = useNavigate();
  const [taxData, settaxData] = useState([]);
  const tableRef = useRef(null);
  const [tableStatusData, setTableStatusData] = useState('active');
  const exportData = useMemo(() => {
    return taxData && taxData.map(({ title }) => ({
      Title: title
    }));
  }, [taxData]);


  // Get data;
  useEffect(() => {
    const getParty = async () => {
      try {
        const data = {
          token: Cookies.get("token"),
          trash: tableStatusData === "trash" ? true : false,
          all: tableStatusData === "all" ? true : false
        }
        const url = process.env.REACT_APP_API_URL + "/tax/get";
        const req = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": 'application/json'
          },
          body: JSON.stringify(data)
        });
        const res = await req.json();
        settaxData([...res])

      } catch (error) {
        console.log(error)
      }
    }
    getParty();
  }, [tableStatusData])

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
      setSelected(taxData.map((d, _) => d._id));
    } else {
      setSelected([]);
    }
  };

  const handleCheckboxChange = (id) => {
    setSelected((prevSelected) => {
      if (prevSelected.includes(id)) {
        return prevSelected.filter((i, _) => i !== id);
      } else {
        return [...prevSelected, id];
      }
    });
  };


  const exportTable = async (whichType) => {
    if (whichType === "copy") {
      copyTable("listOfTax"); // Pass tableid
    }
    else if (whichType === "excel") {
      downloadExcel(exportData, 'party-list.xlsx') // Pass data and filename
    }
    else if (whichType === "print") {
      printTable(tableRef, "Party List"); // Pass table ref and title
    }
    else if (whichType === "pdf") {
      let document = exportPdf('Tax List', exportData);
      downloadPdf(document)
    }
  }


  const removeData = async (trash) => {
    if (selected.length === 0 || tableStatusData !== 'active') {
      return;
    }
    const url = process.env.REACT_APP_API_URL + "/tax/delete";
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
        settaxData((prevData) => {
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

    const url = process.env.REACT_APP_API_URL + "/tax/restore";
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
        settaxData((prevData) => {
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
      <Nav title={"Tax"} />
      <main id='main'>
        <SideNav />
        <div className='content__body'>
          {/* <MyBreadCrumb title={"Quotation"} links={[
            { name: "Quotation ", link: "/admin/quatation" },
            { name: "Estimate", link: "/admin/quatation" },
            { name: "All list", link: null }
          ]} /> */}
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
                  <div className='list__icon' title='Print' onClick={() => exportTable('print')}>
                    <BiPrinter className='text-white text-[16px]' />
                  </div>
                  <div className='list__icon' title='Copy' onClick={() => exportTable('copy')}>
                    <FaRegCopy className='text-white text-[16px]' />
                  </div>
                  <div className='list__icon' title='PDF' onClick={() => exportTable('pdf')}>
                    <FaRegFilePdf className='text-white text-[16px]' />
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

            {/* Second Row */}
            <div className='list_buttons'>
              <button className='bg-teal-500 hover:bg-teal-400' onClick={() => navigate('/admin/tax/add')}>
                <MdAdd className='text-lg' />
                Add New
              </button>
              <button className='bg-orange-400 hover:bg-orange-300' onClick={() => removeData(true)}>
                <MdOutlineCancel className='text-lg' />
                Trash
              </button>
              <button className='bg-green-500 hover:bg-green-400' onClick={restoreData}>
                <MdOutlineRestorePage className='text-lg' />
                Restore
              </button>
              <button className='bg-red-600 hover:bg-red-500' onClick={() => removeData(false)}>
                <MdDeleteOutline className='text-lg' />
                Delete
              </button>
              <select value={tableStatusData}
                onChange={(e) => setTableStatusData(e.target.value)}
                className='bg-blue-500 text-white'>
                <option value="all">All</option>
                <option value="active">Active</option>
                <option value="trash">Trash</option>
              </select>
            </div>

            {/* Table start */}
            <div className='overflow-x-auto mt-5 list__table'>
              <table className='min-w-full bg-white' id='listOfTax' ref={tableRef}>
                <thead className='bg-gray-100'>
                  <tr>
                    <th className='py-2 px-4 border-b w-[50px]'>
                      <input type='checkbox' onChange={selectAll} checked={selected.length === taxData.length} />
                    </th>
                    <th className='py-2 px-4 border-b '>Title</th>
                    <th className='py-2 px-4 border-b '>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    taxData.map((data, i) => {
                      return <tr key={i}>
                        <td className='py-2 px-4 border-b max-w-[10px]'>
                          <input type='checkbox' checked={selected.includes(data._id)} onChange={() => handleCheckboxChange(data._id)} />
                        </td>
                        <td className='px-4 border-b'>{data.title}</td>

                        <td className='px-4 border-b min-w-[70px]'>
                          <div className='flex flex-col md:flex-row gap-2 mr-2'>
                            <button className='bg-blue-400 text-white px-2 py-1 rounded w-[50px] text-[16px] '
                              onClick={() => navigate('/admin/tax/edit')} >
                              <MdEditSquare className=' flex justify-between items-center ml-2' />
                            </button>
                            <button className='bg-red-500 text-white px-2 py-1 rounded w-[50px] text-lg'>
                              <IoInformationCircle className='flex justify-between items-center ml-2' />
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
      </main>
    </>
  )
}

export default Tax