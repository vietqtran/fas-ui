import React from 'react'

interface Props {}

const Activity = (props: Props) => {
   return (
      <div className='group text-center'>
         <div>
            <strong className='text-blue-500 group-hover:underline'>
               SWP391
            </strong>
         </div>
         <div>
            <span>at BE-419</span>
         </div>
         <div>
            (<span className='text-green-500'>attended</span>)
            {/* (<span className='text-red-500'>absent</span>) */}
         </div>
      </div>
   )
}

export default Activity
