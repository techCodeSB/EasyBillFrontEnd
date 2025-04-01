import React from 'react'

const DataShimmer = () => {
  return (
    <div className='shimmer__parent'>
      {/* first section */}
      <div className='flex justify-end'>
        <div className='animate w-[25px] h-[25px] rounded-full mb-5'></div>
      </div>

      {/* table text */}
      <div>
        <div className='flex flex-col gap-2'>
          {Array.from({ length: 8 }).map((i, _) =>
            <div key={i} className='animate w-full h-[20px] rounded'></div>)}
        </div>
      </div>
    </div>
  )
}

export default DataShimmer;
