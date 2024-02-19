import React from 'react'

interface Props {}

const PreviewCourse = (props: Props) => {
   return (
      <div className='relative grid h-[150px] w-full grid-cols-2 rounded-lg border p-2'>
         <div className='col-span-1 flex flex-col'>
            <div className='relative m-auto aspect-square h-[80px] w-[80px] overflow-hidden rounded-full'>
               <img
                  src='/images/faces/10.png'
                  className='h-full w-full object-cover'
                  alt=''
               />
            </div>
            <div className='flex items-center justify-center gap-2'>
               <div className='flex items-center gap-1'>
                  <div className='bg-v-green h-2 w-2'></div>
                  <div className='text-v-green font-semibold'>90%</div>
               </div>
               <div className='flex items-center gap-1'>
                  <div className='bg-v-red h-2 w-2'></div>
                  <div className='text-v-red font-semibold'>10%</div>
               </div>
            </div>
         </div>
         <div className='col-span-1 flex items-center justify-center'>
            <div className='m-auto flex flex-col items-center gap-1 font-semibold'>
               <div>
                  <span> SWP391 </span>
               </div>
               <div>
                  <span>
                     Attended: <span className='text-v-green'>1</span> / 30
                  </span>
               </div>
               <div>
                  <span>
                     Absent: <span className='text-v-red'>0</span> / 30
                  </span>
               </div>
            </div>
         </div>
      </div>
   )
}

export default PreviewCourse
