import { FormControl, InputLabel, MenuItem, Select } from '@mui/material'

import React from 'react'
import { scheduleDateToString } from '@/utils/date'

interface Props {}

const scheduleSlots = [
   {
      day1: 1,
      day2: 3
   },
   {
      day1: 1,
      day2: 4
   },
   {
      day1: 1,
      day2: 5
   },
   {
      day1: 2,
      day2: 4
   },
   {
      day1: 2,
      day2: 5
   },
   {
      day1: 3,
      day2: 5
   }
]

const slots = [1, 2, 3, 4, 5, 6, 7]

const AssignClassSchedule = (props: Props) => {
   const [studentGroupList, setStudentGroupList] = React.useState([
      'SE1748',
      'SE1749',
      'SE1750'
   ])

   const courses = ['PRF192', 'PRO192', 'PRN211', 'DBI202']

   const [studentGroup, setStudentGroup] = React.useState('')

   return (
      <div className='grid grid-cols-2 gap-10 p-5'>
         <FormControl fullWidth className='col-span-2'>
            <InputLabel id='studentGroup-label'>Student Group</InputLabel>
            <Select
               labelId='studentGroup-label'
               id='studentGroup-select'
               value={studentGroup}
               label='Student Group'
               onChange={(e) => setStudentGroup(e.target.value)}
            >
               {studentGroupList.map((s) => (
                  <MenuItem key={s} value={s}>
                     {s}
                  </MenuItem>
               ))}
            </Select>
         </FormControl>
         {courses.map((c) => {
            return (
               <div key={c} className='col-span-1 grid grid-cols-3 gap-3'>
                  <div className='col-span-1'>{c}</div>
                  <div className='col-span-1'>
                     <FormControl fullWidth>
                        <InputLabel id='scheduleSlot-label'>
                           Schedule
                        </InputLabel>
                        <Select
                           labelId={`scheduleSlot-${c}-label`}
                           id={`scheduleSlot-${c}-select`}
                           value={scheduleSlots}
                           label='Schedule'
                        >
                           {scheduleSlots.map((s, i) => (
                              <MenuItem key={i} value={scheduleDateToString(s)}>
                                 {scheduleDateToString(s)}
                              </MenuItem>
                           ))}
                        </Select>
                     </FormControl>
                  </div>
                  <div className='col-span-1'>
                     <FormControl fullWidth>
                        <InputLabel id='slot-label'>Slot</InputLabel>
                        <Select
                           labelId={`slot-${c}-label`}
                           id={`slot-${c}-select`}
                           value={slots}
                           label='Slot'
                        >
                           {slots.map((s, i) => (
                              <MenuItem key={i} value={s}>
                                 {s}
                              </MenuItem>
                           ))}
                        </Select>
                     </FormControl>
                  </div>
               </div>
            )
         })}
      </div>
   )
}

export default AssignClassSchedule
