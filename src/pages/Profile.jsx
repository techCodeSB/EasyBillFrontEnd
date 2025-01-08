import React, { useState } from 'react'
import Nav from '../components/Nav';
import SideNav from '../components/SideNav';
import { FaRegEyeSlash } from "react-icons/fa";
import { FaRegCheckCircle } from "react-icons/fa";
import { LuRefreshCcw } from "react-icons/lu";
import { IoMdArrowRoundBack } from "react-icons/io";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import checkfile from '../helper/checkfile';

const Profile = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [data, setData] = useState({
    name: '', email: '', image: '', passWord: ''
  });


  const setFile = async (e) => {
    let validfile = await checkfile(e.target.files[0]);

    if (typeof (validfile) !== 'boolean') {
      document.querySelector("#fileInput").value = ""
      return alert(validfile);
    };
    setData({ ...data, image: e.target.files[0] });

  }


  const updateProfile = () => {
    console.log(data);
  }

  const update = (e) => {
    if (data.name === "") {
      alert("User name is empty");
    }
    if (data.email === "") {
      alert("Email is empty");
    }
    if (data.image === "") {
      alert("Image is empty");
    }
    if (data.passWord === "") {
      alert("Password is empty");
    }

  }


  return (
    <>
      <Nav title={"Profile"} />
      <main id="main">
        <SideNav />
        <div className='content__body '>
          <div className='content__body__main bg-white' >
            <div className='flex justify-between gap-5  flex-col lg:flex-row'>
              <div className='w-full'>
                <div>
                  <p className='ml-1'>Name</p>
                  <input type="Text" className='mt-2 mb-2' onChange={(e) => setData({ ...data, name: e.target.value })} value={data.name} />
                </div>
                <div>
                  <p className='ml-1'>Email</p>
                  <input type="email" className='mt-2 mb-2' onChange={(e) => setData({ ...data, email: e.target.value })} value={data.email} />
                </div>
              </div>
              <div className='w-full'>
                <div>
                  <p className='ml-1'>Image</p>
                  <input type="file" className='mt-2 mb-2' onChange={setFile} id='fileInput' />
                </div>
                <p className='ml-1 mb-2'>PassWord</p>
                <div className='relative  '>
                  <input type={showPassword ? "text" : "password"} onChange={(e) => setData({ ...data, passWord: e.target.value })} value={data.passWord} />
                  <div className='absolute top-2 right-3   ' onClick={() => setShowPassword(!showPassword)} >
                    {showPassword ? <MdOutlineRemoveRedEye /> : <FaRegEyeSlash />}
                  </div>

                </div>
              </div>
            </div>
            <div className='flex justify-center pt-9'>
              <div className='flex rounded-sm bg-green-500 text-white'>
                <FaRegCheckCircle className='mt-3 ml-2' />
                <button className='p-2' onClick={update}>Update</button>
              </div>
              <div className='flex rounded-sm ml-4 bg-blue-500 text-white'>
                <LuRefreshCcw className='mt-3 ml-2' />
                <button className='p-2'>Reset</button>
              </div>
              <div className="flex rounded-sm ml-4 bg-gray-500 text-white">
                <IoMdArrowRoundBack className='mt-3 ml-2' />
                <button className='p-2'>Back</button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}

export default Profile