'use client'

import { DataGrid, GridColDef } from '@mui/x-data-grid'

import AssignClassSchedule from '@/components/Manager/Assign/AssignClassSchedule'
import AssignInstructorToClass from '@/components/Manager/Assign/AssignInstructorToClass'
import AssignStudentsToClass from '@/components/Manager/Assign/AssignStudentsToClass'
import Box from '@mui/material/Box'
import { useState } from 'react'
import ManagerLayout from '@/components/Common/Layouts/ManagerLayout'

const columns: GridColDef[] = [
   { field: 'id', headerName: 'ID', width: 90 },
   {
      field: 'name',
      headerName: 'Name',
      width: 150,
      editable: false
   },
   {
      field: 'class',
      headerName: 'Student Group',
      type: 'number',
      width: 150,
      editable: false
   },
   {
      field: 'avatar',
      headerName: 'Avatar',
      type: 'string',
      width: 250,
      editable: false
   }
]

const rows = [
   {
      id: '11',
      name: 'Snow',
      class: 'Jon',
      avatar: 'https://i.pravatar.cc/300'
   },
   {
      id: '22',
      name: 'Lannister',
      class: 'Cersei',
      avatar: 'https://i.pravatar.cc/300'
   },
   {
      id: '33',
      name: 'Lannister',
      class: 'Jaime',
      avatar: 'https://i.pravatar.cc/300'
   },
   {
      id: '44',
      name: 'Stark',
      class: 'Arya',
      avatar: 'https://i.pravatar.cc/300'
   },
   {
      id: '55',
      name: 'Targaryen',
      class: 'Daenerys',
      avatar: 'https://i.pravatar.cc/300'
   },
   {
      id: '66',
      name: 'Melisandre',
      class: null,
      avatar: 'https://i.pravatar.cc/300'
   },
   {
      id: '77',
      name: 'Clifford',
      class: 'Ferrara',
      avatar: 'https://i.pravatar.cc/300'
   },
   {
      id: '88',
      name: 'Frances',
      class: 'Rossini',
      avatar: 'https://i.pravatar.cc/300'
   },
   {
      id: '99',
      name: 'Roxie',
      class: 'Harvey',
      avatar: 'https://i.pravatar.cc/300'
   }
]

const page = () => {
   const [modal, setModal] = useState('')

   console.log(modal)

   return (
      <ManagerLayout>
      <div className="container">
      {modal !== '' && (
            <div
               onClick={() => setModal('')}
               className='absolute left-0 top-0 z-50 grid h-[100vh] w-[100vw] place-items-center bg-black/50'
            >
               <div
                  onClick={(e) => e.stopPropagation()}
                  className='h-auto min-h-[600px] w-[1000px] rounded-md bg-white text-black'
               >
                  {modal === 'studentToClass' && <AssignStudentsToClass />}
                  {modal === 'instructorToClass' && <AssignInstructorToClass />}
                  {modal === 'classSchedule' && <AssignClassSchedule />}
               </div>
            </div>
         )}
         <div className='p-5'>
            <div className='flex items-center gap-3 pb-3'>
               <button
                  onClick={() => setModal('studentToClass')}
                  className='rounded-md bg-blue-500 px-4 py-2 text-sm text-white'
               >
                  Assign students to class
               </button>
               <button
                  onClick={() => setModal('instructorToClass')}
                  className='rounded-md bg-blue-500 px-4 py-2 text-sm text-white'
               >
                  Assign instructor to class
               </button>
               <button
                  onClick={() => setModal('classSchedule')}
                  className='rounded-md bg-blue-500 px-4 py-2 text-sm text-white'
               >
                  Assign class schedule
               </button>
            </div>
            <Box sx={{ height: 'auto', width: '100%' }}>
               <DataGrid
                  rows={rows}
                  columns={columns}
                  initialState={{
                     pagination: {
                        paginationModel: {
                           pageSize: 15
                        }
                     }
                  }}
                  pageSizeOptions={[15]}
                  onRowSelectionModelChange={(row) => console.log(row)}
                  checkboxSelection
                  disableRowSelectionOnClick
               />
            </Box>
         </div>
      </div>
    </ManagerLayout>
   )
}

export default page
