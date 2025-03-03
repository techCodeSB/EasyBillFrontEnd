import React, { useState } from 'react'
import Nav from '../components/Nav'
import SideNav from '../components/SideNav';
// import MyBreadCrumb from '../components/BreadCrumb';
import { MdOutlineArrowDownward, MdArrowUpward } from "react-icons/md";

import { FaArrowTrendUp } from "react-icons/fa6";
import { FaArrowUp } from "react-icons/fa";
import { PiPrinterFill } from "react-icons/pi";
import { FaCopy } from "react-icons/fa";
import { FaFilePdf } from "react-icons/fa";
import { FaFileExcel } from "react-icons/fa";
import { LuArrowUpDown } from "react-icons/lu";
import { Pagination } from 'rsuite';
import { MdEditSquare } from "react-icons/md";
import { IoInformationCircle } from "react-icons/io5";


document.title = 'Dashboard';

const Dashboard = () => {
  const [accountpaginationPage, setAccountpaginationPage] = useState(1);
  const [recentsalepagination, setRecentsalepagination] = useState(1);
  const [recentpurchasepagination, setRecentpurchasepagination] = useState(1);
  const [stockalertpagination, setStockalertpagination] = useState(1);

  return (
    <>
      <Nav title={"Dashboard"} />
      <main id='main'>
        <SideNav />
        <div className='content__body'>
          {/* <MyBreadCrumb title={"Dashboard"} links={[
            { name: "Dashboard", link: "/admin/dashboard" },
            { name: "Analytics", link: null }
          ]} /> */}

          <div className='flex justify-between gap-6 w-[100%]  flex-col lg:flex-row' id='dashboard'>
            <div className='w-[100%] lg:w-[30%] flex flex-col justify-between'>
              <div>
                <div className="p-2 pb-5 pt-3 flex justify-between bg-white h-auto rounded-tl-lg rounded-tr-lg">
                  <p className='text-2xl  text-[#003628]  font-semibold '>3594.6</p>
                  <div className=' pt-5 text-2xl '>
                    {/* <MdOutlineArrowDownward /> */}
                  </div>
                </div>
                <div className=' bg-[#006853] w-full h-auto flex  justify-between rounded-bl-lg rounded-br-lg'>
                  <p className='p-2 text-white'>To Collect</p>
                  <div className=' pt-3 mr-3 text-white text-lg'>
                    {/* <FaArrowTrendUp /> */}
                  </div>
                </div>
              </div>
              <div className='w-full' >
                <div className=' pb-8 p-2 mt-7 flex justify-between bg-white w-full h-auto rounded-tl-lg rounded-tr-lg'>
                  <p className='text-orange-400 text-2xl  font-semibold'>424.8</p>
                  <div className=' text-2xl '>
                    {/* <MdArrowUpward /> */}
                  </div>
                </div>
                <div className='flex justify-between bg-[#E9762B] w-full h-auto rounded-bl-lg rounded-br-lg'>
                  <p className=' text-white p-2'>To Pay </p>
                  <div className=' pt-3 mr-3 text-white text-lg'>
                    {/* <FaArrowTrendUp /> */}
                  </div>
                </div>
              </div>
            </div>
            {/* Account wise table start here --------------------------- */}
            <div className='bg-white shadow-sm w-[100%] p-4 pl-5 lg:w-[70%]'>
              <div>
                <p className='text-lg font-bold'>Account Wise Balance</p>
              </div>
              <div className='flex  justify-between flex-col lg:flex-row'>
                <div className='flex gap-2  pt-4 '>
                  <PiPrinterFill className='bg-[#008AA8] w-[30px] h-[30px] rounded-full p-[8px] text-white ' />
                  <FaCopy className='bg-[#008AA8] w-[30px] h-[30px] rounded-full p-[8px] text-white' />
                  <FaFilePdf className='bg-[#008AA8] w-[30px] h-[30px] rounded-full p-[8px] text-white' />
                  <FaFileExcel className='bg-[#008AA8] w-[30px] h-[30px] rounded-full p-[8px] text-white' />
                </div>
                <div className='pt-2'  >
                  <p>Search: </p>
                  <input type="Text" search='' className='border w-full' />
                </div>
              </div>
              <div>
                <table className='w-full border mt-2'>
                  <thead className='bg-gray-100 p-5'>
                    <tr>
                      <th className='p-2'>Title</th>
                      <th>
                        <div className='flex justify-between mr-4'>
                          <span>Type</span>
                          {/* <LuArrowUpDown /> */}
                        </div>
                      </th>
                      <th>
                        <div className='flex justify-between pr-2'>
                          <span>Balance</span>
                          {/* <LuArrowUpDown /> */}
                        </div>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className='p-2'>Cash </td>
                      <td>Cash</td>
                      <td>0</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div>
                <p className='mt-3'>Showing 1 to 1 of 1 entries</p>
              </div>
              <div className='flex justify-end'>
                <Pagination total={100} maxButtons={4} activePage={accountpaginationPage} onChangePage={setAccountpaginationPage} />
              </div>
            </div>
          </div>
          <div className='flex justify-between gap-5 mt-4  flex-col lg:flex-row'>
            <div className='w-full bg-white p-4 pl-5'>
              <div className='pt-2'>
                <p className='font-bold text-lg pl-2 pt-2'>Recent Due Dates(Sales)</p>
              </div>
              <div className='flex  justify-between w-full ml-2 '>
                <div className='flex gap-2  pt-4 '>
                  <PiPrinterFill className='bg-[#008AA8] w-[30px] h-[30px] rounded-full p-[8px] text-white ' />
                  <FaCopy className='bg-[#008AA8] w-[30px] h-[30px] rounded-full p-[8px] text-white' />
                  <FaFilePdf className='bg-[#008AA8] w-[30px] h-[30px] rounded-full p-[8px] text-white' />
                  <FaFileExcel className='bg-[#008AA8] w-[30px] h-[30px] rounded-full p-[8px] text-white' />
                </div>
                <div className='pb-3 pr-3'>
                  <p>Search: </p>
                  <input type="Text" search='' className='border w-full ' />
                </div>
              </div>
              <div className='overflow-x-auto '>
                <table className='w-full border'>
                  <thead className='bg-gray-100'>
                    <tr>
                      <th className='p-2'>Invoice Date</th>
                      <th>
                        <div className='flex justify-between mr-3'>
                          <span>INV.no.</span>
                          {/* <LuArrowUpDown /> */}
                        </div>
                      </th>
                      <th>
                        <div className='flex justify-between pl-2'>
                          <span>Party Name</span>
                          {/* <LuArrowUpDown /> */}
                        </div>
                      </th>
                      <th>
                        <div className='flex justify-between pl-2'>
                          <span>Due Date</span>
                          {/* <LuArrowUpDown /> */}
                        </div>
                      </th>
                      <th>
                        <div className='flex justify-between pl-3'>
                          <span>Action</span>
                          {/* <LuArrowUpDown /> */}
                        </div>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className='pl-2'>
                      <td className='py-2 px-2'>19 Dec 2024</td>
                      <td>INV3</td>
                      <td>Das Computer</td>
                      <td>28 Dec 2024</td>
                      <td>
                        <div className='flex gap-2 justify-end pr-2'>
                          <button className='bg-[rgb(0,138,168)] text-white px-2 py-1 rounded w-[40px] flex justify-center text-[16px]'>
                            <MdEditSquare />
                          </button>
                          <button className='bg-[#ce0018] text-white px-2 py-1 rounded w-[40px] flex justify-center  text-lg'>
                            <IoInformationCircle />
                          </button>
                        </div>
                      </td>
                    </tr >
                  </tbody>
                </table>
              </div>
              <div>
                <p className='mt-3 pl-3'>Showing 1 to 1 of 1 entries</p>
              </div>
              <div className='flex justify-end pb-3'>
                <Pagination total={100} maxButtons={4} activePage={recentsalepagination} onChangePage={setRecentsalepagination} />
              </div>
            </div>
            <div className='w-full bg-white p-4 pl-5'>
              <div className='pt-2'>
                <p className='font-bold text-lg pl-2'>Recent Due Dates(Purchase)</p>
              </div>
              <div className='flex  justify-between w-full'>
                <div className='flex gap-2 pt-4 '>
                  <PiPrinterFill className='bg-[#008AA8] w-[30px] h-[30px] rounded-full p-[8px] text-white ' />
                  <FaCopy className='bg-[#008AA8] w-[30px] h-[30px] rounded-full p-[8px] text-white' />
                  <FaFilePdf className='bg-[#008AA8] w-[30px] h-[30px] rounded-full p-[8px] text-white' />
                  <FaFileExcel className='bg-[#008AA8] w-[30px] h-[30px] rounded-full p-[8px] text-white' />
                </div>
                <div className=' pr-3 '>
                  <p>Search: </p>
                  <input type="Text" search='' className='border w-full' />
                </div>
              </div>
              <div className='overflow-x-auto pt-3'>
                <table className='w-full border'>
                  <thead className='bg-gray-100 '>
                    <tr>
                      <th className='p-2'>Invoice Date</th>
                      <th>
                        <div className='flex justify-between items-center mr-3'>
                          <span>INV.no.</span>
                          {/* <LuArrowUpDown /> */}
                        </div>
                      </th>
                      <th>
                        <div className='flex justify-between items-center  pl-2'>
                          <span>Party Name</span>
                          {/* <LuArrowUpDown /> */}
                        </div>
                      </th>
                      <th>
                        <div className='flex justify-between items-center  pl-2'>
                          <span>Due Date</span>
                          {/* <LuArrowUpDown /> */}
                        </div>
                      </th>
                      <th>
                        <div className='flex justify-between items-center  pl-3'>
                          <span>Action</span>
                          {/* <LuArrowUpDown /> */}
                        </div>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className='py-2 px-2'>28 Dec 2024</td>
                      <td>001</td>
                      <td>Bishai Computer Shop</td>
                      <td>28 Dec 2024</td>
                      <td>
                        <div className='flex gap-2 justify-end pr-2'>
                          <button className='bg-[rgb(0,138,168)] text-white px-2 py-1 rounded w-[40px] flex justify-center text-[16px]'>
                            <MdEditSquare />
                          </button>
                          <button className='bg-[#ce0018] text-white px-2 py-1 rounded w-[40px] flex justify-center  text-lg'>
                            <IoInformationCircle />
                          </button>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div>
                <p className='mt-3 pl-3 '>Showing 1 to 1 of 1 entries</p>
              </div>
              <div className='flex justify-end pb-3'>
                <Pagination total={100} maxButtons={4} activePage={recentpurchasepagination} onChangePage={setRecentpurchasepagination} />
              </div>
            </div>
          </div>
          <div className='bg-white mt-4 p-4 pl-5'>
            <p className='font-bold text-lg'>Stock Aletr</p>
            <div className='flex  justify-between w-full'>
              <div className='flex gap-2  pt-4 '>
                <PiPrinterFill className='bg-[#008AA8] w-[30px] h-[30px] rounded-full p-[8px] text-white ' />
                <FaCopy className='bg-[#008AA8] w-[30px] h-[30px] rounded-full p-[8px] text-white' />
                <FaFilePdf className='bg-[#008AA8] w-[30px] h-[30px] rounded-full p-[8px] text-white' />
                <FaFileExcel className='bg-[#008AA8] w-[30px] h-[30px] rounded-full p-[8px] text-white' />
              </div>
              <div className='pt-2 pr-3'>
                <p>Search: </p>
                <input type="Text" search='' className='border w-full' />
              </div>
            </div>
            <div className='mt-3 '>
              <table className='border w-full'>
                <thead className='bg-gray-100'>
                  <tr>
                    <td className='p-2'>Title</td>
                    <td>
                      <div className='flex justify-between items-center '>
                        <span >Stock</span>
                        <LuArrowUpDown className='mr-4' />
                      </div>
                    </td>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className='p-2'> Dell Al-mouse</td>
                    <td>
                      <span className='bg-green-600 '></span>
                    </td>
                  </tr>
                  <tr>
                    <td className='p-2'>Birla Cement</td>
                    <td>
                      <span className='bg-green-600'></span>
                    </td>
                  </tr>
                </tbody>
              </table>
              <div>
                <p className='mt-3 pl-2 '>Showing 1 to 2 of 2 entries</p>
              </div>
              <div className='flex justify-end pb-3'>
                <Pagination total={100} maxButtons={4} activePage={stockalertpagination} onChangePage={setStockalertpagination} />
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}

export default Dashboard