"use client";
import { Bounce, toast } from "react-toastify";
import React, { useEffect, useState } from "react";
import {
  addFeedBack,
  getAllFeedBack,
  getFeedBackByID,
  updateFeedBack,
} from "@/helpers/api/feedback";

type Props = {};

const useFeedBack = () => {
  const [feedbacks, setFeedBacks] = useState([]);

  const [studentId, setStudentId] = useState<string>("");
  const [instructorId, setInstructorId] = useState<string>("");
  const [courseId, setCourseId] = useState<string>("");
  const [punctuality, setPunctuality] = useState<string>("");
  const [teachingSkill, setTeachingSkill] = useState<string>("");

  const [adequatelySyllabus, setAdequatelySyllabus] = useState<string>("");
  const [support, setSupport] = useState<string>("");
  const [responseQuestion, setResponseQuestion] = useState<string>("");
  const [teachingMethods, setTeachingMethods] = useState<string>("");
  const [dispositionStudents, setDispositionStudents] = useState<string>("");
  const [professionalPractices, setProfessionalPractices] =
    useState<string>("");
  const [appearanceAndPersonal, setAppearanceAndPersonal] =
    useState<string>("");
  const [overall, setOverall] = useState<string>("");
  const [comment, setComment] = useState<string>("");

  const [id, setId] = useState("");

  useEffect(() => {
    fetchFeedBacks();
  }, []);

  const fetchFeedBacks = async () => {
    try {
      const response = await getAllFeedBack().then((res) => res);
      if (response) {
        setFeedBacks(response.data);
      } else {
        toast.error("Fetch feedback failed");
      }
    } catch (error) {
      console.error("Error fetching feedback:", error);
      toast.error("Fetch feedback failed");
    }
  };

  const getFeedBack = async (id: string) => {
    try {
      const response = (await getFeedBackByID(id).then(
        (res) => res
      )) as BaseResponse;
      if (response && response.code === "SUCCESS") {
        toast.success(response.message);
        return response.data;
      } else {
        toast.error(response?.message || "Failed to get feedback");
        return undefined;
      }
    } catch (error) {
      console.error("Error getting feedback:", error);
      toast.error("Failed to get feedback");
      return undefined;
    }
  };

  const createFeedBack = async (e) => {
    e.preventDefault();
    try {
      const response = (await addFeedBack({
        studentId,
        instructorId,
        courseId,
        punctuality,
        teachingSkill,
        adequatelySyllabus,
        support,
        responseQuestion,
        teachingMethods,
        dispositionStudents,
        professionalPractices,
        appearanceAndPersonal,
        overall,
        comment,
      } as FeedBackInformation).then((res) => res)) as BaseResponse;
      if (response && response.code === "SUCCESS") {
        toast.success(response.message);
        await fetchFeedBacks();
      } else {
        toast.error(response?.message || "Add course failed");
      }
    } catch (error) {
      console.error("Error adding course:", error);
      toast.error("Add course failed");
    }
  };

  const handleUpdateFeedBack = async (e) => {
    e.preventDefault();
    try {
      const response = (await updateFeedBack(id, {
        studentId,
        instructorId,
        courseId,
        punctuality,
        teachingSkill,
        adequatelySyllabus,
        support,
        responseQuestion,
        teachingMethods,
        dispositionStudents,
        professionalPractices,
        appearanceAndPersonal,
        overall,
        comment,
      } as FeedBackInformation).then((res) => res)) as BaseResponse;

      if (response && response.code === "SUCCESS") {
        toast.success(response.message);
        await fetchFeedBacks();
      } else {
        toast.error(response?.message || "Update course failed");
      }
    } catch (error) {
      console.error("Error updating course:", error);
      toast.error("Update course failed");
    }
  };

  return {
    feedbacks,
    fetchFeedBacks,
    createFeedBack,
    getFeedBack,
    handleUpdateFeedBack,
    studentId,
    setStudentId,
    instructorId,
    setInstructorId,
    courseId,
    setCourseId,
    punctuality,
    setPunctuality,
    teachingSkill,
    setTeachingSkill,
    adequatelySyllabus,
    setAdequatelySyllabus,
    support,
    setSupport,
    responseQuestion,
    setResponseQuestion,
    teachingMethods,
    setTeachingMethods,
    dispositionStudents,
    setDispositionStudents,
    professionalPractices,
    setProfessionalPractices,
    appearanceAndPersonal,
    setAppearanceAndPersonal,
    overall,
    setOverall,
    comment,
    setComment,
    id,
    setId,
  };
};

export default useFeedBack;
