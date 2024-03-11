import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  InputLabel,
  MenuItem,
  Modal,
  Select,
} from "@mui/material";

import React, { useState } from "react";
import { scheduleDateToString } from "@/utils/date";
import useGrade from "@/hooks/Grade";
import useTerm from "@/hooks/Term";
import { useInstructor } from "@/hooks/Instructor";
import useCourse from "@/hooks/Course";
import useRoom from "@/hooks/Room";
import { useSlot } from "@/hooks/Slot";
import useAssignsChedule from "@/hooks/AssignSchedule";
import CloseIcon from "@mui/icons-material/Close";
const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "60%",
  maxHeight: "70%",
  overflowY: "auto", // or "scroll"
  bgcolor: "#fff",
  border: "1px solid #ccc",
  p: 4,
  outline: "none",
  color: "#000",
};
interface Props {
  children?: React.ReactNode;
  open: boolean;
  handleClose: () => void;
  id: string;
  action: string;
}

const AssignClassSchedule = (props: Props) => {
  const { open, handleClose, id, action } = props;
  const handleDaySelect = (day) => {
    if (weekdays.includes(day)) {
      setWeekdays(weekdays.filter((selectedDay) => selectedDay !== day));
    } else if (weekdays.length < 2) {
      setWeekdays([...weekdays, day]);
    }
  };

  const daysOfWeek = [
    "MONDAY",
    "TUESDAY",
    "WEDNESDAY",
    "THURSDAY",
    "FRIDAY",
    "SATURDAY",
    "SUNDAY",
  ];

  const { grades } = useGrade();
  const { terms } = useTerm();
  const { instructors } = useInstructor();
  const { courses } = useCourse();
  const { rooms } = useRoom();
  const { slots } = useSlot();

  const {
    gradeId,
    setGradeId,
    courseId,
    setCourseId,
    termId,
    setTermId,
    roomId,
    setRoomId,
    slotId,
    setSlotId,
    instructorId,
    setInstructorId,
    weekdays,
    setWeekdays,
    addAssignSchedule,
  } = useAssignsChedule();

  return (
    <Modal
      open={open}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
      <div className="flex justify-end">
        <button
          className="text-gray-400 hover:text-gray-600 transition duration-200 ease-in-out"
          onClick={handleClose}
        >
          <CloseIcon />
        </button>
      </div>
        <form
          onSubmit={addAssignSchedule}
          className="grid grid-cols-2 gap-10 p-5"
        >               
          <FormControl fullWidth className="col-span-1">
            <InputLabel id="studentGroup-label">Term</InputLabel>
            <Select
              labelId="studentGroup-label"
              id="studentGroup-select"
              value={termId}
              label="Student Group"
              onChange={(e) => setTermId(e.target.value)}
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
              value={courseId}
              label="Course"
              onChange={(e) => setCourseId(e.target.value)}
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
              value={gradeId}
              label="Student Group"
              onChange={(e) => setGradeId(e.target.value)}
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
              value={roomId}
              label="Student Group"
              onChange={(e) => setRoomId(e.target.value)}
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
              value={slotId}
              label="Student Group"
              onChange={(e) => setSlotId(e.target.value)}
            >
              {slots.map((item) => (
                <MenuItem key={item.id} value={item.id}>
                  {item.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth className="col-span-1">
            <InputLabel id="instructor-label">Intructor</InputLabel>
            <Select
              labelId="instructor-label"
              id="instructor-select"
              value={instructorId}
              label="Student Group"
              onChange={(e) => setInstructorId(e.target.value)}
            >
              {instructors.map((item) => (
                <MenuItem key={item.id} value={item.id}>
                  {item.username}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormGroup className="w-full col-span-2">
            {daysOfWeek.map((day) => (
              <FormControlLabel
                key={day}
                control={
                  <Checkbox
                    checked={weekdays.includes(day)}
                    onChange={() => handleDaySelect(day)}
                    disabled={weekdays.length === 2 && !weekdays.includes(day)}
                  />
                }
                label={day}
              />
            ))}
          </FormGroup>
          <div className="col-span-2 grid place-items-end">
            <Button className="w-fit" variant="outlined" type="submit">
              Submit
            </Button>
          </div>
        </form>
      </Box>
    </Modal>
  );
};

export default AssignClassSchedule;
