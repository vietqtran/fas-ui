"use client";

import { Bounce, toast } from "react-toastify";
import React, { useEffect, useState } from "react";
import {
  addStudent,
  deleteStudentById,
  getAllStudents,
  getAllStudentsByGrade,
  getAllStudentsByMajorAndCampus,
  getStudentByEmail,
  getStudentById,
  updateStudent,
} from "@/helpers/api/student";

import { getAllCampuses } from "@/helpers/api/campus";

const useStudent = () => {
  const [students, setStudents] = useState([]);
  const [id, setId] = useState("");
  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState("");
  const [birthDay, setBirthDay] = useState("");
  const [phone, setPhone] = useState("");
  const [majorId, setMajorId] = useState("");
  const [email, setEmail] = useState("");
  const [studentCode, setStudentCode] = useState("");
  const [username, setUsername] = useState("");
  const [address, setAddress] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [campusId, setCampusId] = useState("");
  const [idCard, setIdCard] = useState("");
  const [gender, setGender] = useState(Boolean);
  const [campuses, setCampuses] = useState([]);
  const [student, setStudent] = useState({});
  const [gradeId, setGradeId] = useState(
    "2eed7f8c-d090-11ee-a242-106530543950"
  );
  const [order, setOrder] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [gradeStudents, setGradeStudents] = useState([]);
  const [currentPage, setCurrentPage] = useState("1");
  const [pageSize, setPageSize] = useState("5");
  const [totalPages, setTotalPages] = useState(0);
  const [courseStudentId, setCourseStudentId] = useState(
    "663fe3e3-d087-11ee-a242-106530543950"
  );
  const [studentTermId, setStudentTermId] = useState(
    "7228a3fc-d3ba-11ee-a242-106530543950"
  );

  useEffect(() => {
    fetchStudents();
    fetchCampuses();
  }, []);

  useEffect(() => {
    if (gradeId && courseStudentId && studentTermId) {
      fetchStudentsByGrade(
        gradeId,
        courseStudentId,
        studentTermId,
        majorId,
        searchValue,
        order,
        currentPage,
        pageSize
      );
    }
  }, [
    gradeId,
    courseStudentId,
    studentTermId,
    majorId,
    searchValue,
    order,
    currentPage,
    pageSize,
  ]);

  const fetchCampuses = async () => {
    const response = await getAllCampuses().then((res) => res);
    if (response) {
      setCampuses(response.data);
    } else {
      toast.error("Fetch campuses failed");
    }
  };

  const fetchStudents = async () => {
    const response = (await getAllStudents().then(
      (res) => res
    )) as BaseResponse;
    if (response && response?.code === "SUCCESS") {
      setStudents(response.data);
    } else {
      toast.error("Fetch students failed");
    }
  };

  const fetchStudentsByGrade = async (
    gradeId: string,
    courseId: string,
    termId: string,
    majorId: string,
    searchValue: string,
    order: string,
    currentPage: string,
    pageSize: string
  ) => {
    const response = (await getAllStudentsByGrade(
      gradeId,
      courseId,
      termId,
      majorId,
      searchValue,
      order,
      currentPage,
      pageSize
    ).then((res) => res)) as BaseResponse;
    if (response && response?.code === "SUCCESS") {
      setGradeStudents(response.data?.content);
      setCurrentPage(response.data?.currentPage);
      setTotalPages(response.data?.totalPages);
    } else {
      console.log("Fetch students failed");
      setGradeStudents([]);
    }
  };

  const deleteStudent = async (id: string) => {
    const response = (await deleteStudentById(id).then(
      (res) => res
    )) as BaseResponse;
    if (response && response?.code === "SUCCESS") {
      toast.success(response?.message);
      fetchStudents();
    } else {
      toast.error("Fetch students failed");
    }
  };

  const createStudent = async (e) => {
    e.preventDefault();
    const response = (await addStudent({
      firstName,
      middleName,
      lastName,
      birthDay,
      phone,
      majorId,
      campusId,
      email,
      studentCode,
      username,
      address,
      profileImage,
      gender,
      idCard,
    } as StudentInformation).then((res) => res)) as BaseResponse;
    console.log(response);

    if (response && response?.code === "SUCCESS") {
      toast.success(response?.message);
      await fetchStudents();
    } else {
      toast.error("Add students failed");
    }
  };

  const handleUpdateStudent = async (e) => {
    e.preventDefault();
    const response = (await updateStudent(id, {
      firstName,
      middleName,
      lastName,
      birthDay,
      phone,
      majorId,
      campusId,
      email,
      studentCode,
      username,
      address,
      profileImage,
      gender,
      idCard,
    } as StudentInformation).then((res) => res)) as BaseResponse;

    if (response && response?.code === "SUCCESS") {
      toast.success(response?.message);
      fetchStudents();
    } else {
      toast.error("update students failed");
    }
  };

  const getStudent = async (id: string) => {
    const response = (await getStudentById(id).then(
      (res) => res
    )) as BaseResponse;
    if (response && response?.code === "SUCCESS") {
      return response.data;
    } else {
      toast.error(response?.message);
    }
  };

  const fetchStudentByEmail = async (email: string) => {
    const response = (await getStudentByEmail(email).then(
      (res) => res
    )) as BaseResponse;
    if (response && response?.code === "SUCCESS") {
      return response.data;
    } else {
      // toast.error(response?.message)
    }
  };

  const fetchStudentByMajorAndCampus = async (
    majorId: string,
    campusId: string
  ) => {
    const response = (await getAllStudentsByMajorAndCampus(
      majorId,
      campusId
    ).then((res) => res)) as BaseResponse;
    if (response && response?.code === "SUCCESS") {
      return response.data;
    } else {
      toast.error(response?.message);
    }
  };

  return {
    students,
    setStudents,
    deleteStudent,
    firstName,
    setFirstName,
    middleName,
    setMiddleName,
    lastName,
    setLastName,
    birthDay,
    setBirthDay,
    phone,
    setPhone,
    majorId,
    setMajorId,
    email,
    setEmail,
    studentCode,
    setStudentCode,
    username,
    setUsername,
    address,
    setAddress,
    profileImage,
    setProfileImage,
    createStudent,
    fetchStudents,
    getStudent,
    student,
    setId,
    campusId,
    setCampusId,
    handleUpdateStudent,
    id,
    gender,
    setGender,
    idCard,
    setIdCard,
    campuses,
    fetchStudentByEmail,
    gradeStudents,
    gradeId,
    setGradeId,
    currentPage,
    setCurrentPage,
    totalPages,
    pageSize,
    setPageSize,
    courseStudentId,
    setCourseStudentId,
    fetchStudentByMajorAndCampus,
    order,
    setOrder,
    searchValue,
    setSearchValue,
    studentTermId,
    setStudentTermId,
  };
};
export default useStudent;
