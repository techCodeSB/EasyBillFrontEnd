import React, { useState } from 'react'
import { HiOutlineHome } from "react-icons/hi2";
// import { FaEarthAmericas } from "react-icons/fa6";
import { CiImageOn } from "react-icons/ci";
import { IoSettingsOutline } from "react-icons/io5";
import { TbUsersGroup } from "react-icons/tb";


import { Link } from 'react-router-dom';
import { IoIosArrowDown } from "react-icons/io";
import { Tooltip } from 'react-tooltip';
import { Popover, Whisper } from 'rsuite';


const SideNav = () => {
  const isSideBarOpen = localStorage.getItem("sideBarOpenStatus");
  console.log(isSideBarOpen)
  const links = {
    "main": [
      {
        name: 'Dashboard',
        icon: <HiOutlineHome />,
        link: '/admin/dashboard',
        submenu: null
      },
      // {
      //   name: 'Visit Main Site',
      //   icon: <FaEarthAmericas />,
      //   link: '/admin/dashboard',
      //   submenu: null
      // }
    ],
    "sales": [
      {
        name: 'Quotation / Estimate',
        icon: <CiImageOn />,
        link: '/admin/quotation-estimate/',
        submenu: null
      },
      {
        name: 'Proforma Invoice',
        icon: <CiImageOn />,
        link: '/admin/dashboard',
        submenu: null
      },
      {
        name: 'Sales Invoice',
        icon: <CiImageOn />,
        link: '/admin/dashboard',
        submenu: null
      },
      {
        name: 'Sales Return',
        icon: <CiImageOn />,
        link: '/admin/dashboard',
        submenu: null
      },
      {
        name: 'Payment In',
        icon: <CiImageOn />,
        link: '/admin/dashboard',
        submenu: null
      },
      {
        name: 'Credit Note',
        icon: <CiImageOn />,
        link: '/admin/dashboard',
        submenu: null
      },
      {
        name: 'Delivery Challan',
        icon: <CiImageOn />,
        link: '/admin/dashboard',
        submenu: null
      },
    ],
    "Purshase": [
      {
        name: 'Purshase Order',
        icon: <CiImageOn />,
        link: '/admin/dashboard',
        submenu: null
      },
      {
        name: 'Purshase Invoice',
        icon: <CiImageOn />,
        link: '/admin/dashboard',
        submenu: null
      },
      {
        name: 'Purshase Return',
        icon: <CiImageOn />,
        link: '/admin/dashboard',
        submenu: null
      },
      {
        name: 'Payment Out',
        icon: <CiImageOn />,
        link: '/admin/dashboard',
        submenu: null
      },
      {
        name: 'Debit Note',
        icon: <CiImageOn />,
        link: '/admin/dashboard',
        submenu: null
      },
    ],
    "Accounting": [
      {
        name: 'Accounts',
        icon: <CiImageOn />,
        link: '/admin/account',
        submenu: null
      },
      {
        name: 'Other Transactions',
        icon: <CiImageOn />,
        link: '/admin/other-transaction',
        submenu: null
      },
    ],
    "Setup": [
      {
        name: 'Site/Business Settings',
        icon: <IoSettingsOutline />,
        link: '/admin/dashboard',
        submenu: null
      },
      {
        name: 'User Management',
        icon: <TbUsersGroup />,
        link: '/admin/dashboard',
        submenu: null
      },
      {
        name: 'Unit',
        icon: <CiImageOn />,
        link: '/admin/dashboard',
        submenu: null
      },
      {
        name: 'Tax',
        icon: <CiImageOn />,
        link: '/admin/dashboard',
        submenu: null
      },
      {
        name: 'Items',
        icon: <CiImageOn />,
        link: '/admin/dashboard',
        submenu: [
          {
            name: 'Category',
            icon: <CiImageOn />,
            link: '/admin/dashboard',
            submenu: null
          },
          {
            name: 'Items',
            icon: <CiImageOn />,
            link: '/admin/dashboard',
            submenu: null
          },
        ]
      },
      {
        name: 'Party',
        icon: <CiImageOn />,
        link: '/admin/dashboard',
        submenu: null
      },
    ]
  }

  const [openSubmenus, setOpenSubmenus] = useState({});
  const toggleSubmenu = (name) => {
    setOpenSubmenus((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  };

  return (
    <aside className='side__nav min-w-[175px] h-[calc(100vh-50px)] bg-[#0D1726] text-white' id='sideBar'>
      <div className="side__nav__logo flex justify-center items-center">
      </div>
      <div className="side__nav__links">
        <div className="side__nav__link__group">
          <ul>
            {links.main.map((link, index) => (
              <Link key={index} to={link.link} data-tooltip-id="sideBarItemToolTip">
                <li className='flex items-center'>
                  <span className='mr-3'>{link.icon}</span>
                  <span>{link.name}</span>
                </li>
              </Link>
            ))}
          </ul>
        </div>
        <div className="side__nav__link__group">
          <h3 className='text-[16px] my-5'>Sales</h3>
          <ul className=''>
            {links.sales.map((link, index) => (
              <Link key={index} to={link.link} data-tooltip-id="sideBarItemToolTip">
                <li className='flex items-center'>
                  <span className='mr-3'>{link.icon}</span>
                  <span>{link.name}</span>
                </li>
              </Link>
            ))}
          </ul>
        </div>
        <div className="side__nav__link__group">
          <h3 className='text-[16px] my-5'>Purshase</h3>
          <ul className=''>
            {links.Purshase.map((link, index) => (
              <Link key={index} to={link.link} data-tooltip-id="sideBarItemToolTip">
                <li className='flex items-center'>
                  <span className='mr-3'>{link.icon}</span>
                  <span >{link.name}</span>
                </li>
              </Link>
            ))}
          </ul>
        </div>
        <div className="side__nav__link__group">
          <h3 className='text-[16px] my-5'>Accounting Solution</h3>
          <ul className=''>
            {links.Accounting.map((link, index) => (
              <Link key={index} to={link.link} data-tooltip-id="sideBarItemToolTip">
                <li className='flex items-center'>
                  <span className='mr-3'>{link.icon}</span>
                  <span >{link.name}</span>
                </li>
              </Link>
            ))}
          </ul>
        </div>

        <div className="side__nav__link__group">
          <h3 className='text-[16px] my-5'>Setup</h3>
          <ul className=''>
            {links.Setup.map((link, index) => (
              <Whisper key={index} enterable trigger={'hover'} speaker={
                index === 4 ? <Popover className='p-0'>
                  <ul>
                    {links.Setup[4].submenu.map((sublink, subIndex) => (
                      <Link to={sublink.link} className='focus-within:no-underline hover:no-underline text-blue-900'>
                        <li  className='flex items-center'>
                          <span className='mr-2 text-[15px]'>{sublink.icon}</span>
                          <Link className='focus-within:no-underline hover:no-underline text-blue-900 text-[13px]'>
                            {sublink.name}
                          </Link>
                        </li>
                      </Link>
                    ))}
                  </ul>
                </Popover> : <div className='this-div-is-bekar'></div>
              }>
                <li key={index} className='flex flex-col' data-tooltip-id="sideBarItemToolTip">
                  <div className='flex items-center justify-between' onClick={() => toggleSubmenu(link.name)}>
                    <Link to={link.link} className='flex items-center'>
                      <span className='mr-3'>{link.icon}</span>
                      <span>{link.name}</span>
                    </Link>
                    {link.submenu && <span className={`ml-2 transform transition-transform ${openSubmenus[link.name] ? 'rotate-180' : ''}`}>
                      <IoIosArrowDown size={"12px"} />
                    </span>}
                  </div>
                  {link.submenu && openSubmenus[link.name] && (
                    <ul className='ml-2 mt-2'>
                      {link.submenu.map((sublink, subIndex) => (
                        <Link key={subIndex} to={sublink.link}>
                          <li className='flex items-center'>
                            <span className='mr-3'>{sublink.icon}</span>
                            <Link >{sublink.name}</Link>
                          </li>
                        </Link>
                      ))}
                    </ul>
                  )}
                </li>
              </Whisper>
            ))}
          </ul>

        </div>
      </div>
      <Tooltip id='sideBarItemToolTip' />
    </aside>
  );
}

export default SideNav