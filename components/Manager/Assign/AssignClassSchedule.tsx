import { Checkbox, FormControl, FormControlLabel, FormGroup, InputLabel, MenuItem, Select } from "@mui/material";

import React, { useState } from "react";
import { scheduleDateToString } from "@/utils/date";
import useGrade from "@/hooks/Grade";
import useTerm from "@/hooks/Term";
import { useInstructor } from "@/hooks/Instructor";
import useCourse from "@/hooks/Course";

interface Props {}

const AssignClassSchedule = (props: Props) => {
  const [selectedDays, setSelectedDays] = useState([]);

  const handleDaySelect = (day) => {
    if (selectedDays.includes(day)) {
      // Nếu đã chọn, hủy chọn ngày đó
      setSelectedDays(
        selectedDays.filter((selectedDay) => selectedDay !== day)
      );
    } else if (selectedDays.length < 2) {
      // Nếu chưa chọn đủ 2 ngày, thêm ngày vào danh sách
      setSelectedDays([...selectedDays, day]);
    }
  };

  const daysOfWeek = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  const { grades } = useGrade();
  const { terms } = useTerm();
  const { instructors } = useInstructor();
  const {courses} = useCourse();


   return (
    <div className="grid grid-cols-2 gap-10 p-5">
      <FormControl fullWidth className="col-span-1">
        <InputLabel id="studentGroup-label">Term</InputLabel>
        <Select
          labelId="studentGroup-label"
          id="studentGroup-select"
          // value={studentGroup}
          label="Student Group"
          // onChange={(e) => setStudentGroup(e.target.value)}
        >
          {/* {studentGroupList.map((s) => (
                  <MenuItem key={s} value={s}>
                     {s}
                  </MenuItem>
               ))} */}
        </Select>
      </FormControl>
      <FormControl fullWidth className="col-span-1">
        <InputLabel id="studentGroup-label">Course</InputLabel>
        <Select
          labelId="studentGroup-label"
          id="studentGroup-select"
          // value={studentGroup}
          label="Student Group"
          // onChange={(e) => setStudentGroup(e.target.value)}
        >
          {/* {studentGroupList.map((s) => (
                  <MenuItem key={s} value={s}>
                     {s}
                  </MenuItem>
               ))} */}
        </Select>
      </FormControl>
      <FormControl fullWidth className="col-span-1">
        <InputLabel id="studentGroup-label">Class</InputLabel>
        <Select
          labelId="studentGroup-label"
          id="studentGroup-select"
          // value={studentGroup}
          label="Student Group"
          // onChange={(e) => setStudentGroup(e.target.value)}
        >
          {/* {studentGroupList.map((s) => (
                  <MenuItem key={s} value={s}>
                     {s}
                  </MenuItem>
               ))} */}
        </Select>
      </FormControl>
      <FormControl fullWidth className="col-span-1">
        <InputLabel id="studentGroup-label">Room</InputLabel>
        <Select
          labelId="studentGroup-label"
          id="studentGroup-select"
          // value={studentGroup}
          label="Student Group"
          // onChange={(e) => setStudentGroup(e.target.value)}
        >
          {/* {studentGroupList.map((s) => (
                  <MenuItem key={s} value={s}>
                     {s}
                  </MenuItem>
               ))} */}
        </Select>
      </FormControl>
      <FormControl fullWidth className="col-span-1">
        <InputLabel id="studentGroup-label">Slot</InputLabel>
        <Select
          labelId="studentGroup-label"
          id="studentGroup-select"
          // value={studentGroup}
          label="Student Group"
          // onChange={(e) => setStudentGroup(e.target.value)}
        >
          {/* {studentGroupList.map((s) => (
                  <MenuItem key={s} value={s}>
                     {s}
                  </MenuItem>
               ))} */}
        </Select>
      </FormControl>
      <FormControl fullWidth className="col-span-1">
        <InputLabel id="studentGroup-label">Intructor</InputLabel>
        <Select
          labelId="studentGroup-label"
          id="studentGroup-select"
          // value={studentGroup}
          label="Student Group"
          // onChange={(e) => setStudentGroup(e.target.value)}
        >
          {/* {studentGroupList.map((s) => (
                  <MenuItem key={s} value={s}>
                     {s}
                  </MenuItem>
               ))} */}
        </Select>
      </FormControl>
      <FormGroup>
        {daysOfWeek.map((day) => (
          <FormControlLabel
            key={day}
            control={
              <Checkbox
                checked={selectedDays.includes(day)}
                onChange={() => handleDaySelect(day)}
                disabled={
                  selectedDays.length === 2 && !selectedDays.includes(day)
                }
              />
            }
            label={day}
          />
        ))}
      </FormGroup>
    </div>
  );
};

export default AssignClassSchedule;
