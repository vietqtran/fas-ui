import React from 'react'

interface Props {}

const Header = (props: Props) => {
   return (
      <>
         <div className='my-[10px] w-full'>
            <h1 className='text-3xl'>FPT Attendance System</h1>
         </div>
         <div className='flex w-full items-center justify-end gap-3 bg-gray-50 p-3'>
            <div className='cursor-pointer rounded-md bg-green-500 p-1 text-sm text-white hover:underline'>
               viettqhe170367
            </div>
            <div className='cursor-pointer rounded-md bg-green-500 p-1 text-sm text-white hover:underline'>
               logout
            </div>
            <div className='cursor-pointer rounded-md bg-green-500 p-1 text-sm text-white hover:underline'>
               Campus: Hòa Lạc
            </div>
         </div>
      </>
   )
}

export default Header
