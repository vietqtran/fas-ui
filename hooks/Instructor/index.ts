import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import {
  deleteInstructorById,
  getAllInstructors,
} from "@/helpers/api/instructor";

export const useInstructor = () => {
  const [instructors, setInstructors] = useState([]);

  useEffect(() => {
    fetchInstructors();
  }, []);

  const fetchInstructors = async () => {
    const response = await getAllInstructors().then((res) => res);

    if (response && response?.code === "SUCCESS") {
      setInstructors(response.data);
    } else {
      toast.error(response?.message);
    }
  };

  const handleDeleteInstructor = async (id: string) => {
    const response = await deleteInstructorById(id).then((res) => res);

    if (response && response?.code === "SUCCESS") {
      toast.success(response?.message);
      fetchInstructors();
    } else {
      toast.error(response?.message);
    }
  };

  return {
    instructors,
    setInstructors,
    handleDeleteInstructor,
  };
};
