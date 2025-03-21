import React from 'react'

const DataShimmer = () => {
  return (
    <div className='shimmer__parent'>
      {/* first section */}
      <div className='flex justify-between'>
        <div className='flex gap-4 items-center'>
          <div className='animate w-[40px] h-[25px] rounded'></div>
          <div className='flex gap-2'>
            {Array.from({ length: 3 }).map((i, _) =>
              <div className='animate w-[30px] h-[30px] rounded-full'></div>)}
          </div>
        </div>
        {/* for search */}
        <div className='animate w-[200px] h-[20px] rounded'></div>
      </div>

      {/* second section */}
      <div className='mt-5 mb-10'>
        <div className='flex gap-2'>
          {Array.from({ length: 5 }).map((i, _) =>
            <div className='animate w-[60px] h-[25px] rounded'></div>)}
        </div>
      </div>

      {/* table text */}
      <div>
        <div className='flex flex-col gap-2'>
          {Array.from({ length: 8 }).map((i, _) =>
            <div className='animate w-full h-[20px] rounded'></div>)}
        </div>
      </div>
    </div>
  )
}

export default DataShimmer