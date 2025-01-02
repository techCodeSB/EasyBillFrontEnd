import React from 'react'
import { Link } from 'react-router-dom'
import { Breadcrumb } from 'rsuite'
import { IoIosArrowForward } from "react-icons/io";


const MyBreadCrumb = ({ title, links }) => {
  return (
    <div className='flex justify-between w-[100%] p-4 h-[50px]'>
      <h4 className='pt-2'>{title}</h4>
      <div className='text-gray-400'>
        <Breadcrumb separator={<IoIosArrowForward />}>
          {
            links.map((i, index) => (
              <Breadcrumb.Item as={Link} href={i.link} key={index}>
                {i.name}
              </Breadcrumb.Item>
            ))
          }
        </Breadcrumb>
      </div>
    </div>
  )
}

export default MyBreadCrumb