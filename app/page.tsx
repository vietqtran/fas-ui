'use client'

export default function Home() {
   return (
      <div className='container mx-auto flex min-h-screen flex-col items-center justify-start bg-white text-black'>
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
         <div className='grid w-full grid-cols-4 gap-5 py-[30px]'>
            <div className='cursor-pointer rounded-md bg-green-500 p-5 text-white hover:underline'>
               <h2>View Schedule</h2>
            </div>
            <div className='cursor-pointer rounded-md bg-green-500 p-5 text-white hover:underline'>
               <h2>View Absent</h2>
            </div>
            <div className='cursor-pointer rounded-md bg-green-500 p-5 text-white hover:underline'>
               <h2>Attendance Report</h2>
            </div>
         </div>
      </div>
   )
}
