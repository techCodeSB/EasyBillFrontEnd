import React, { useEffect, useState } from 'react';
import Logo from '../assets/images/logo.png'
import { TbMenuDeep } from "react-icons/tb";
import { FaUser } from "react-icons/fa";
import { CiSettings } from "react-icons/ci";
import { FiUser } from "react-icons/fi";
import { IoIosLogOut } from "react-icons/io";
import { Avatar, Popover, Whisper } from 'rsuite';
import { Link, useNavigate } from 'react-router-dom';
import CompanyList from './CompanyList';
import { useDispatch } from 'react-redux';
import { toggleModal } from '../store/copanyListSlice';
import useGetUserData from "../hooks/useGetUserData";
import { HiOutlineSwitchHorizontal } from "react-icons/hi";
import { CiCalculator1 } from "react-icons/ci";
import Calculator from './Calculator';
import { calcToggle } from '../store/calculatorSlice';
import Cookies from 'js-cookie';


const Nav = ({ title }) => {
  const [sideBar, setSideBar] = useState(true);
  const dispatch = useDispatch();
  const getUserData = useGetUserData(); // Get user info api call
  const [companyName, setCompanyName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    getUserData();
  }, [])


  const toggleSideBar = () => {
    // setSideBar((prev) => {
    //   document.querySelector("#sideBar").style.marginLeft = prev ? "-250px" : "0px";
    //   return !prev;
    // });
    convertToSmall();
  }

  const convertToSmall = () => {
    setSideBar((prev) => {
      const sideBar = document.querySelector("#sideBar");
      prev ? localStorage.setItem("sideBarOpenStatus", false) : localStorage.setItem("sideBarOpenStatus", true);

      sideBar.style.minWidth = prev ? "50px" : "175px";
      sideBar.querySelectorAll("li").forEach(e => e.style.borderRadius = prev ? "0px" : "20px");
      sideBar.querySelectorAll("li span:nth-child(2), li span:nth-child(3), h3").forEach(e => e.style.display = prev ? "none" : "");
      sideBar.querySelectorAll("li .sub-menu").forEach(e => e.style.display = prev ? "none" : "");
      sideBar.querySelectorAll("ul a, ul li").forEach(item => {
        item.setAttribute("data-tooltip-content", prev ? item.querySelector("span:nth-child(2)").innerText : "");
      });
      sideBar.querySelectorAll("li svg").forEach(e => e.style.fontSize = prev ? "18px" : "14px")

      return !prev;
    })
  }

  const logout = () => {
    Cookies.remove("token");
    document.location.href = "/admin";
  }


  return (
    <>
      <nav className='w-full text-white h-[50px] bg-white shadow-lg flex justify-between'>
        <div className="logo__area w-[175px] h-[100%] bg-[#252A34] px-3 py-2 flex justify-between items-center">
          <div className='nav__logo p-2 bg-[#DDDDDD] w-[60px] rounded-md'>
            <img src={Logo} alt="" width={80} className='shadow-lg' />
          </div>
          <TbMenuDeep className='text-white text-xl cursor-pointer' onClick={toggleSideBar} />
        </div>
        <div className='flex items-center justify-between w-[calc(100%-175px)]'>
          <h6 className='text-black ml-5'>{title}</h6>
          <div className="admin__area px-4 py-2 flex items-center cursor-pointer gap-3">
            <div
              className='flex items-center justify-between bg-gray-100 text-black p-1 rounded'
              onClick={() => {
                dispatch(toggleModal(true))
              }}>
              <span className='text-[12px]'>{companyName}</span>
              <HiOutlineSwitchHorizontal className='text-[16px] ml-2 text-blue-700' />
            </div>
            <Whisper className='' trigger={'click'} placement='bottomEnd' speaker={<Popover full>
              <Link className='menu-link' to={"/admin/site"}>
                <CiSettings size={"20px"} />
                <span>Site/Company Creation</span>
              </Link>
              <Link className='menu-link ' to="/admin/profile">
                <FiUser size={"16px"} />
                <span>Profile</span>
              </Link>
              <Link className='menu-link' onClick={() => dispatch(calcToggle(1))}>
                <CiCalculator1 size={"16px"} />
                <span>Calculator</span>
              </Link>
              <Link className='menu-link' onClick={logout}>
                <IoIosLogOut size={"16px"} />
                <span>Logout</span>
              </Link>
            </Popover>}>
              <Avatar circle children={<FaUser />} size='sm' />
              <span className='ml-2 text-gray-800 text-[13px]'>
                Bishai
              </span>
            </Whisper>
          </div>
        </div>
      </nav>
      {/* Company list modal */}
      <CompanyList getCompanyName={(n) => setCompanyName(n)} />
      <Calculator />
    </>
  )
}

export default Nav;

