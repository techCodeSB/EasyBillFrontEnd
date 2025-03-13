import React, { useEffect, useMemo, useRef, useState } from 'react';
import Nav from '../../components/Nav';
import SideNav from '../../components/SideNav';
// import MyBreadCrumb from '../../components/BreadCrumb';
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
import useMyToaster from '../../hooks/useMyToaster';
import Cookies from 'js-cookie';
import downloadPdf from '../../helper/downloadPdf';
import { GrFormNext, GrFormPrevious } from 'react-icons/gr';



// Proforma page
document.title = "Purchase Return";
const PurchaseReturn = () => {
  const toast = useMyToaster();
  const { copyTable, downloadExcel, printTable, exportPdf } = useExportTable();
  const [activePage, setActivePage] = useState(1);
  const [dataLimit, setDataLimit] = useState(10);
  const [totalData, setTotalData] = useState();
  const [selected, setSelected] = useState([]);
  const navigate = useNavigate();
  const [billData, setBillData] = useState([]);
  const tableRef = useRef(null);
  const [tableStatusData, setTableStatusData] = useState('active');
  const exportData = useMemo(() => {
    return billData && billData.map(({ returnData, purchaseReturnNumber, party }) => ({
      "Return Date": returnData,
      "Purchase Invoice Number": purchaseReturnNumber,
      "Party": party.name,
    }));
  }, [billData]);


  // Get data;
  useEffect(() => {
    const getParty = async () => {
      try {
        const data = {
          token: Cookies.get("token"),
          trash: tableStatusData === "trash" ? true : false,
          all: tableStatusData === "all" ? true : false
        }
        const url = process.env.REACT_APP_API_URL + `/purchasereturn/get?page=${activePage}&limit=${dataLimit}`;
        const req = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": 'application/json'
          },
          body: JSON.stringify(data)
        });
        const res = await req.json();
        console.log(res.data)
        setTotalData(res.totalData)
        setBillData([...res.data])

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
      setSelected(billData.map(data => data._id));
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
      copyTable("listQuotation"); // Pass tableid
    }
    else if (whichType === "excel") {
      downloadExcel(exportData, 'party-list.xlsx') // Pass data and filename
    }
    else if (whichType === "print") {
      printTable(tableRef, "Party List"); // Pass table ref and title
    }
    else if (whichType === "pdf") {
      let document = exportPdf('Purchase Return List', exportData);
      downloadPdf(document)
    }
  }



  const removeData = async (trash) => {
    if (selected.length === 0 || tableStatusData !== 'active') {
      return;
    }
    const url = process.env.REACT_APP_API_URL + "/purchasereturn/delete";
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
        setBillData((prevData) => {
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

    const url = process.env.REACT_APP_API_URL + "/purchasereturn/restore";
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
        setBillData((prevData) => {
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
      <Nav title={"Purchase Return"} />
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
                  <div className='list__icon' title='Download PDF' onClick={() => exportTable('pdf')}>
                    <FaRegFilePdf className="text-white text-[16px]" />
                  </div>
                  <div className='list__icon' title='Download Excel'>
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
              <button className='bg-teal-500 hover:bg-teal-400' onClick={() => navigate('/admin/purchase-return/add')}>
                <MdAdd className='text-lg' />
                Add New
              </button>
              <button className='bg-orange-400 hover:bg-orange-300' onClick={() => removeData(true)}>
                <MdOutlineCancel className='text-lg' />
                Trash
              </button>
              <button onClick={restoreData} className='bg-green-500 hover:bg-green-400'>
                <MdOutlineRestorePage className='text-lg' />
                Restore
              </button>
              <button onClick={() => removeData(false)} className='bg-red-600 hover:bg-red-500'>
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
              <table className='min-w-full bg-white' id='listQuotation' ref={tableRef}>
                <thead className='bg-gray-100'>
                  <tr>
                    <th className='py-2 px-4 border-b'>
                      <input type='checkbox' onChange={selectAll} checked={billData.length > 0 && selected.length === billData.length} />
                    </th>
                    <th className='py-2 px-4 border-b'>Date</th>
                    <th className='py-2 px-4 border-b'>Purchase Return Number</th>
                    <th className='py-2 px-4 border-b'>Party Name</th>
                    <th className='py-2 px-4 border-b'>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    billData.map((data, i) => {
                      return <tr key={i}>
                        <td className='py-2 px-4 border-b max-w-[10px]'>
                          <input type='checkbox' checked={selected.includes(data._id)} onChange={() => handleCheckboxChange(data._id)} />
                        </td>
                        <td className='px-4 border-b' align='center'>{data.returnData}</td>
                        <td className='px-4 border-b' align='center'>{data.purchaseReturnNumber}</td>
                        <td className='px-4 border-b' align='center'>{data.party.name}</td>
                        <td className='px-4 border-b max-w-[70px]' align='center'>
                          <div className='flex flex-col md:flex-row gap-2 mr-2 justify-center'>
                            <button
                              title='Edit'
                              onClick={() => navigate(`/admin/purchase-return/edit/${data._id}`)}
                              className='bg-blue-400 text-white px-2 flex justify-center py-1 rounded w-[40px] text-[16px]'>
                              <MdEditSquare />
                            </button>
                            <button
                              title='Details'
                              onClick={() => navigate(`/admin/bill/details/purchasereturn/${data._id}`)}
                              className='bg-red-500 text-white px-2 py-1 rounded text-lg flex justify-center w-[40px]'>
                              <IoInformationCircle />
                            </button>
                          </div>
                        </td>
                      </tr>
                    })
                  }
                </tbody>
              </table>
              <p className='py-4'>Showing {billData.length} of {totalData} entries</p>
              {/* ----- Paginatin ----- */}
              <div className='flex justify-end gap-2 pb-3'>
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
      </main>

    </>
  )
}

export default PurchaseReturn;

