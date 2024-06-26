import instance from "@/helpers/api/_axios_instance";
import { toast } from "react-toastify";

const END_POINT = {
  GET_ALL_STUDENTS: "student",
  CREATE_STUDENT: "student",
  GET_STUDENT: "student",
  UPDATE_STUDENT: "student/update",
  DELETE_STUDENT: "student/delete",
  GET_STUDENT_EMAIL: "student/email",
};

export const getAllStudents = () => {
  return instance.get(`/${END_POINT.GET_ALL_STUDENTS}`);
};

export const deleteStudentById = (id: string) => {
  return instance.put(`/${END_POINT.DELETE_STUDENT}/${id}`);
};

export const getStudentById = (id: string) => {
  return instance.get(`/${END_POINT.GET_STUDENT}/${id}`);
};

export const addStudent = (studentData: StudentInformation) => {
  console.log(studentData);
  
  try {
    return instance.post(`/${END_POINT.CREATE_STUDENT}`, studentData);
  } catch (error) {
    console.log(error);
  }
};

export const updateStudent = (id: string, studentData: StudentInformation) => {
  return instance.put(`/${END_POINT.UPDATE_STUDENT}/${id}`, studentData);
};

export const getStudentByEmail = (email: string) => {
  return instance.get(`/${END_POINT.GET_STUDENT_EMAIL}/${email}`);
};

export const getAllStudentsByGrade = (gradeId: string, courseId: string, termId: string, majorId: string, searchValue: string, order: string, page: string, size: string) => {
  return instance.get(`/${END_POINT.GET_ALL_STUDENTS}/grade/${gradeId}/course/${courseId}/term/${termId}?majorId=${majorId}&search=${searchValue}&order=${order}&page=${page}&size=${size}`);
}

export const getAllStudentsByMajorAndCampus = (majorId: string, campusId: string) => {
  return instance.get(`/${END_POINT.GET_ALL_STUDENTS}/major/${majorId}/campus/${campusId}`);
}
