import { Box, FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import { DataGrid, GridColDef } from '@mui/x-data-grid'

import React from 'react'

interface Props {}

const columns: GridColDef[] = [
   { field: 'id', headerName: 'ID', width: 90 },
   {
      field: 'name',
      headerName: 'Name',
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

const AssignInstructorToClass = (props: Props) => {
   const [studentGroupList, setStudentGroupList] = React.useState([
      'SE1748',
      'SE1749',
      'SE1750'
   ])

   const [courses, setCourses] = React.useState([
      'PRF192',
      'PRO192',
      'PRN211',
      'DBI202'
   ])

   const [studentGroup, setStudentGroup] = React.useState('')
   const [course, setCourse] = React.useState('')

   return (
      <div className='grid min-h-full w-full grid-cols-3 gap-3 p-5'>
         <div className='col-span-2'>
            <Box sx={{ height: '100%', width: '100%' }}>
               <DataGrid
                  rows={rows}
                  columns={columns}
                  initialState={{
                     pagination: {
                        paginationModel: {
                           pageSize: 8
                        }
                     }
                  }}
                  pageSizeOptions={[8]}
                  onRowSelectionModelChange={(row) => console.log(row)}
                  checkboxSelection
                  disableRowSelectionOnClick
               />
            </Box>
         </div>
         <div className='col-span-1 flex min-h-full flex-col justify-between'>
            <FormControl fullWidth>
               <InputLabel id='course-label'>Course</InputLabel>
               <Select
                  labelId='course-label'
                  id='course-select'
                  value={course}
                  label='Course'
               >
                  {courses.map((c) => (
                     <MenuItem key={c} value={c}>
                        {c}
                     </MenuItem>
                  ))}
               </Select>
            </FormControl>

            <FormControl fullWidth>
               <InputLabel id='studentGroup-label'>Student Group</InputLabel>
               <Select
                  labelId='studentGroup-label'
                  id='studentGroup-select'
                  value={studentGroup}
                  label='Student Group'
                  onChange={(e) => setStudentGroup(e.target.value)}
               >
                  {studentGroupList.map((studentGroup) => (
                     <MenuItem key={studentGroup} value={studentGroup}>
                        {studentGroup}
                     </MenuItem>
                  ))}
               </Select>
            </FormControl>
            <div className='flex w-full justify-end gap-2'>
               <button className='rounded-md bg-blue-500 px-3 py-2 text-sm text-white hover:bg-blue-600'>
                  Assign
               </button>
               <button className='rounded-md bg-black/10 px-3 py-2 text-sm hover:bg-black/20'>
                  Cancel
               </button>
            </div>
         </div>
      </div>
   )
}

export default AssignInstructorToClass
