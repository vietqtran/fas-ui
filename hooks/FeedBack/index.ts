"use client";
import { Bounce, toast } from "react-toastify";
import React, { useEffect, useState } from "react";
import {
  addFeedBack,
  checkFeedBackExist,
  deleteFeedBackById,
  getAllFeedBack,
  getFeedBackByID,
  updateFeedBack,
} from "@/helpers/api/feedback";

type Props = {};

const useFeedBack = () => {
  const [feedbacks, setFeedBacks] = useState([]);

  const [studentId, setStudentId] = useState<string>("");
  const [punctuality, setPunctuality] = useState<string>("");
  const [teachingSkill, setTeachingSkill] = useState<string>("");
  const [adequatelySyllabus, setAdequatelySyllabus] = useState<string>("");
  const [support, setSupport] = useState<string>("");
  const [responseQuestion, setResponseQuestion] = useState<string>("");
  const [teachingMethods, setTeachingMethods] = useState<string>("");
  const [dispositionStudents, setDispositionStudents] = useState<string>("");
  const [overall, setOverall] = useState<string>("");
  const [comment, setComment] = useState<string>("");
  const [assignFeedBackId, setAssignFeedBackId] = useState<string>("");
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
        return undefined;
      }
    } catch (error) {
      console.error("Error getting feedback:", error);
      return undefined;
    }
  };

  const createFeedBack = async (e) => {
    e.preventDefault();
    try {
      const response = (await addFeedBack({
        studentId,
        punctuality,
        teachingSkill,
        adequatelySyllabus,
        support,
        responseQuestion,
        teachingMethods,
        dispositionStudents,
        overall,
        comment,
        assignFeedBackId,
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
    console.log("ass", assignFeedBackId);
    console.log("studentId:", studentId);
    console.log("punctuality:", punctuality);
    console.log("teachingSkill:", teachingSkill);
    console.log("adequatelySyllabus:", adequatelySyllabus);
    console.log("support:", support);
    console.log("responseQuestion:", responseQuestion);
    console.log("teachingMethods:", teachingMethods);
    console.log("dispositionStudents:", dispositionStudents);
    console.log("overall:", overall);
    console.log("comment:", comment);
    try {
      const response = (await updateFeedBack(id, {
        studentId,
        punctuality,
        teachingSkill,
        adequatelySyllabus,
        support,
        responseQuestion,
        teachingMethods,
        dispositionStudents,
        overall,
        comment,
        assignFeedBackId,
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

  const checkFeedBack = async (assignId: string, studentId: string) => {
    try {
      const response = (await checkFeedBackExist(assignId, studentId).then(
        (res) => res
      )) as BaseResponse;
      if (response && response.code === "SUCCESS") {
        return response.data;
      } else {
        return undefined;
      }
    } catch (error) {
      console.error("Error getting feedback:", error);
      return undefined;
    }
  };

  const deleteFeedBack = async (id: string) => {
    try {
      const response = (await deleteFeedBackById(id).then(
        (res) => res
      )) as BaseResponse;
      if (response) {
        toast.success(response.message);
      } else {
        return response.message;
      }
    } catch (error) {
      console.error("Error deleting grade:", error);
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
    overall,
    setOverall,
    comment,
    setComment,
    id,
    setId,
    assignFeedBackId,
    setAssignFeedBackId,
    checkFeedBack,
    deleteFeedBack,
  };
};

export default useFeedBack;
