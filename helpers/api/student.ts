import instance from "@/helpers/api/_axios_instance";

const END_POINT = {
  GET_ALL_STUDENTS: "student",
  CREATE_STUDENT: "student",
  GET_STUDENT: "student",
  UPDATE_STUDENT: "student/update",
  DELETE_STUDENT: "student/delete",
  GET_STUDENT_EMAIL: "student/email",
  GET_ALL_STUDENTS_BY_GRADE: "student/grade",
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
  return instance.post(`/${END_POINT.CREATE_STUDENT}`, studentData);
};

export const updateStudent = (id: string, studentData: StudentInformation) => {
  return instance.put(`/${END_POINT.UPDATE_STUDENT}/${id}`, studentData);
};

export const getStudentByEmail = (email: string) => {
  return instance.get(`/${END_POINT.GET_STUDENT_EMAIL}/${email}`);
};

export const getAllStudentsByGrade = (gradeId: string) => {
  return instance.get(`/${END_POINT.GET_ALL_STUDENTS_BY_GRADE}/${gradeId}`);
}
