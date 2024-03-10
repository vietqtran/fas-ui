import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";

import React, { useState } from "react";
import { scheduleDateToString } from "@/utils/date";
import useGrade from "@/hooks/Grade";
import useTerm from "@/hooks/Term";
import { useInstructor } from "@/hooks/Instructor";
import useCourse from "@/hooks/Course";
import useRoom from "@/hooks/Room";

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
  const { courses } = useCourse();
  const { rooms } = useRoom();

  console.log(rooms, grades);

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
          {terms.map((item) => (
            <MenuItem key={item.id} value={item.id}>
              {item.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl fullWidth className="col-span-1">
        <InputLabel id="course-label">Course</InputLabel>
        <Select
          labelId="course-label"
          id="course-select"
          // value={studentGroup}
          label="Student Group"
          // onChange={(e) => setStudentGroup(e.target.value)}
        >
          {courses.map((item) => (
            <MenuItem key={item.id} value={item.id}>
              {item.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl fullWidth className="col-span-1">
        <InputLabel id="class-label">Class</InputLabel>
        <Select
          labelId="class-label"
          id="class-select"
          // value={studentGroup}
          label="Student Group"
          // onChange={(e) => setStudentGroup(e.target.value)}
        >
          {grades.map((item) => (
            <MenuItem key={item.id} value={item.id}>
              {item.code}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl fullWidth className="col-span-1">
        <InputLabel id="room-label">Room</InputLabel>
        <Select
          labelId="room-label"
          id="room-select"
          // value={studentGroup}
          label="Student Group"
          // onChange={(e) => setStudentGroup(e.target.value)}
        >
          {rooms.map((item) => (
            <MenuItem key={item.id} value={item.id}>
              {item.code}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl fullWidth className="col-span-1">
        <InputLabel id="slot-label">Slot</InputLabel>
        <Select
          labelId="slot-label"
          id="slot-select"
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
        <InputLabel id="instructor-label">Intructor</InputLabel>
        <Select
          labelId="instructor-label"
          id="instructor-select"
          // value={studentGroup}
          label="Student Group"
          // onChange={(e) => setStudentGroup(e.target.value)}
        >
           {instructors.map((item) => (
            <MenuItem key={item.id} value={item.id}>
              {item.username}
            </MenuItem>
          ))}
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
