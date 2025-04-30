import React, { useEffect, useState } from 'react'
import Nav from '../../components/Nav'
import SideNav from '../../components/SideNav'
import { Icons } from '../../helper/icons'
import { useParams } from 'react-router-dom'
import useApi from '../../hooks/useApi'

const Details = () => {
  const { id } = useParams();
  const [data, setData] = useState();
  const { getApiData } = useApi();


  useEffect(() => {
    const get = async () => {
      const res = await getApiData("item", id);
      setData(res.data);
      console.log(res.data)
    }
    get()
  }, [])


  return (
    <>
      <Nav title={"Item Details"} />
      <main id='main'>
        <SideNav />

        <div className="content__body">
          <div className='content__body__main'>
            <p className='font-bold flex items-center gap-1'>
              <Icons.INVOICE />
              General Details
            </p>
            <hr />

            <div className='flex gap-2'>
              <div className='flex flex-col text-xs w-full gap-5'>
                <div>
                  <p className='text-gray-400'>Item Name</p>
                  <p>{data?.title}</p>
                </div>

                <div>
                  <p className='text-gray-400'>Category</p>
                  <p>{data?.category?.name || "--"}</p>
                </div>

                <div>
                  <p className='text-gray-400'>Price</p>
                  <p>{data?.salePrice || "--"}</p>
                </div>
              </div>
              <div className='flex flex-col text-xs w-full'>

              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}

export default Details