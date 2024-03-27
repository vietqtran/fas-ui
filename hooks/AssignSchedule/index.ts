"use client";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { deleteAssignFeedBack } from "@/helpers/api/assignFeedBack";
import {
  createShedule,
  deleteSheduleById,
  getAllSchedule,
  getSheduleById,
  updateShedule,
} from "@/helpers/api/assignSchedule";

const useAssignsChedule = () => {
  const [assignSchedules, setAssignSchedules] = useState([]);
  const [termId, setTermId] = useState("");
  const [courseId, setCourseId] = useState("");
  const [gradeId, setGradeId] = useState("");
  const [roomId, setRoomId] = useState("");
  const [slotId, setSlotId] = useState("");
  const [instructorId, setInstructorId] = useState("");
  const [weekdays, setWeekdays] = useState([]);
  const [assignId, setAssignId] = useState("");
  const [assignSchedule, setAssignSchedule] = useState<any>({});
  const [idAssignSchedule, setIdAssignSchedule] = useState("");

  useEffect(() => {
    fetchAssignSchedule();
  }, []);

  useEffect(() => {
    getAssignSchdule(idAssignSchedule);
  }, [idAssignSchedule]);

  const fetchAssignSchedule = async () => {
    try {
      const response = (await getAllSchedule().then(
        (res) => res
      )) as BaseResponse;
      if (response) {
        setAssignSchedules(response.data);
      } else {
        console.log(response.message);
      }
    } catch (error) {
      console.error("Error fetching grade:", error);
    }
  };

  const getAssignSchdule = async (id: string) => {
    console.log(id);
    try {
      const response = (await getSheduleById(id).then(
        (res) => res
      )) as BaseResponse;
      if (response) {
        console.log(response.data);

        setAssignSchedule(response.data);
        return response.data;
      } else {
        return response?.message;
      }
    } catch (error) {
      console.error("Error fetching grade:", error);
    }
  };

  const addAssignSchedule = async (e) => {
    console.log(
      weekdays,
      gradeId,
      courseId,
      termId,
      roomId,
      slotId,
      assignId,
      instructorId
    );

    e.preventDefault();
    try {
      const response = (await createShedule({
        assignRequestDTO: {
          weekdays: weekdays,
          gradeId: gradeId,
          courseId: courseId,
          termId: termId,
        },
        activityRequestDTO: {
          roomId: roomId,
          slotId: slotId,
          assignId: assignId,
          instructorId: instructorId,
        },
      } as AssignScheduleInformation).then((res) => res)) as BaseResponse;
      console.log(response);
      if (response && response.code === "SUCCESS") {
        toast.success(response.message);
      } else {
        toast.error(response?.message || "Add course failed");
      }
    } catch (error) {
      console.error("Error adding course:", error);
      toast.error("Add course failed");
    }
  };

  const deleteAssignFeedBackById = async (id: string) => {
    console.log(id);

    try {
      const response = (await deleteSheduleById(id).then(
        (res) => res
      )) as BaseResponse;
      if (response) {
        toast.success(response.message);
        fetchAssignSchedule();
      } else {
        return response.message;
      }
    } catch (error) {
      console.error("Error deleting assign feedback:", error);
    }
  };

  const handleUpdateAssignFeedBack = async (e) => {
    e.preventDefault();
    try {
      const response = (await updateShedule(idAssignSchedule, {
        assignRequestDTO: {
          weekdays: weekdays,
          gradeId: gradeId,
          courseId: courseId,
          termId: termId,
        },
        activityRequestDTO: {
          roomId: roomId,
          slotId: slotId,
          assignId: assignId,
          instructorId: instructorId,
        },
      } as AssignScheduleInformation).then((res) => res)) as BaseResponse;

      if (response && response.code === "SUCCESS") {
        toast.success(response.message);
        fetchAssignSchedule();
      } else {
        toast.error(response?.message || "Update course failed");
      }
    } catch (error) {
      console.error("Error updating course:", error);
      toast.error("Update course failed");
    }
  };

  return {
    instructorId,
    setInstructorId,
    gradeId,
    setGradeId,
    termId,
    setTermId,
    courseId,
    setCourseId,
    roomId,
    setRoomId,
    slotId,
    setSlotId,
    assignId,
    setAssignId,
    weekdays,
    setWeekdays,
    assignSchedule,
    assignSchedules,
    setAssignSchedule,
    addAssignSchedule,
    deleteAssignFeedBackById,
    handleUpdateAssignFeedBack,
    fetchAssignSchedule,
    getAssignSchdule,
  };
};

export default useAssignsChedule;
