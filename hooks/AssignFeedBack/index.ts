"use client";
import { Bounce, toast } from "react-toastify";
import React, { useEffect, useState } from "react";
import {
  addAssignFeedBack,
  deleteAssignFeedBack,
  getAllAssignFeedBack,
  getAssignFeedBackByGreade,
  getAssignFeedBackByID,
  updateAssignFeedBack,
} from "@/helpers/api/assignFeedBack";

const useAssignFeedBack = () => {
  const [instructorId, setInstructorId] = useState("");
  const [gradeId, setGradeId] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [assignFeedBacks, setAssignFeedBacks] = useState([]);
  const [idAssignFeedBack, setIdAssignFeedBack] = useState("");
  const [assignFeedBack, setAssignFeedBack] = useState("");
  useEffect(() => {
    fectchAssignFeedBack();
  }, []);

  useEffect(() => {
    getAssignFeedBack(idAssignFeedBack);
  }, [idAssignFeedBack]);

  const fectchAssignFeedBack = async () => {
    try {
      const response = (await getAllAssignFeedBack().then(
        (res) => res
      )) as BaseResponse;
      if (response) {
        setAssignFeedBacks(response.data);
      } else {
      }
    } catch (error) {}
  };

  const getAssignFeedBack = async (id: string) => {
    try {
      const response = (await getAssignFeedBackByID(id).then(
        (res) => res
      )) as BaseResponse;
      if (response) {
        setAssignFeedBack(response.data);
        return response.data;
      } else {
        return response?.message;
      }
    } catch (error) {
      console.error("Error fetching grade:", error);
    }
  };

  const addAssign = async (e) => {
    e.preventDefault();
    try {
      const response = (await addAssignFeedBack({
        instructorId,
        gradeId,
        startDate,
        endDate,
      } as AssignFeedBackInformation).then((res) => res)) as BaseResponse;
      if (response && response.code === "SUCCESS") {
        toast.success(response.message);
      } else {
        toast.error(response?.message || "Add course failed");
      }
    } catch (error) {
      toast.error("Add course failed");
    }
  };

  const deleteAssignFeedBackById = async (id: string) => {
    try {
      const response = (await deleteAssignFeedBack(id).then(
        (res) => res
      )) as BaseResponse;
      if (response) {
        toast.success(response.message);
        fectchAssignFeedBack();
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
      const response = (await updateAssignFeedBack(idAssignFeedBack, {
        instructorId,
        gradeId,
        startDate,
        endDate,
      } as AssignFeedBackInformation).then((res) => res)) as BaseResponse;

      if (response && response.code === "SUCCESS") {
        toast.success(response.message);
        fectchAssignFeedBack();
      } else {
        toast.error(response?.message || "Update course failed");
      }
    } catch (error) {
      console.error("Error updating course:", error);
      toast.error("Update course failed");
    }
  };

  const getAssignFeedBackGrade = async (id: string) => {
    try {
      const response = (await getAssignFeedBackByGreade(id).then(
        (res) => res
      )) as BaseResponse;
      if (response) {
        setAssignFeedBack(response.data);
        return response.data;
      } else {
        return response?.message;
      }
    } catch (error) {
      console.error("Error fetching grade:", error);
    }
  };

  return {
    instructorId,
    setInstructorId,
    gradeId,
    setGradeId,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    assignFeedBacks,
    setAssignFeedBacks,
    assignFeedBack,
    setAssignFeedBack,
    idAssignFeedBack,
    setIdAssignFeedBack,
    addAssign,
    deleteAssignFeedBackById,
    handleUpdateAssignFeedBack,
    getAssignFeedBack,
    fectchAssignFeedBack,
    getAssignFeedBackGrade,
  };
};

export default useAssignFeedBack;
