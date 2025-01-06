import React, {useState} from 'react'
import Nav from '../components/Nav';
import SideNav from '../components/SideNav';
import { FaRegEyeSlash } from "react-icons/fa";
import { FaRegCheckCircle } from "react-icons/fa";
import { LuRefreshCcw } from "react-icons/lu";
import { IoMdArrowRoundBack } from "react-icons/io";
import { MdOutlineRemoveRedEye } from "react-icons/md";

const Profile = () => {
  const [showPassword, setShowPassword] = useState(false);
  
  const [Profile, setProfile] = useState({
    name:'', email:'',  image:'', passWord:''
  })
   


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
                  <input type="Text" className='mt-2 mb-2' />
                </div>
                <div>
                  <p className='ml-1'>Email</p>
                  <input type="email"  className='mt-2 mb-2' />
                </div>
              </div>
              <div className='w-full'>
                <div>
                  <p className='ml-1'>Image</p>
                  <input type="file" className='mt-2 mb-2' />
                </div>
                <p className='ml-1 mb-2'>PassWord</p>
                <div className='relative  '>
                  <input type={showPassword ? "text": "password"} /> 
                   <div className='absolute top-2 right-3   ' onClick={()=>setShowPassword(!showPassword)} >
                  
                   {showPassword ?  <FaRegEyeSlash />: <MdOutlineRemoveRedEye />}
                   </div>
                 
                </div>
              </div>
            </div>
          <div className='flex justify-center pt-9'>
            <div className='flex rounded-sm bg-green-500 text-white'>
              <FaRegCheckCircle className='mt-3 ml-2'/>
              <button className='p-2'>Update</button>
            </div>
            <div className='flex rounded-sm ml-4 bg-blue-500 text-white'>
              <LuRefreshCcw className='mt-3 ml-2' />
              <button className='p-2'>Reset</button>
            </div>
            <div className="flex rounded-sm ml-4 bg-gray-500 text-white">
              <IoMdArrowRoundBack className='mt-3 ml-2'/>
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