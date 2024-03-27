import instance from "@/helpers/api/_axios_instance";

const END_POINT = {
  GET_ALL_Instructor: "instructor",
  GET_INSTRUCTOR: "instructor",
  CREATE_INSTRUCTOR: "instructor",
  DELETE_INSTRUCTOR: "instructor/delete",
  UPDATE_INSTRUCTOR: "instructor/update",
};

export const getAllInstructors = () => {
  return instance.get(`/${END_POINT.GET_ALL_Instructor}`);
};

export const getInstructorById = (id: string) => {
  return instance.get(`/${END_POINT.GET_INSTRUCTOR}/${id}`);
};

export const deleteInstructorById = (id: string) => {
  return instance.put(`/${END_POINT.DELETE_INSTRUCTOR}/${id}`);
};

export const createNewInstructor = (instructorData: InstructorCredentials) => {
  return instance.post(`/${END_POINT.CREATE_INSTRUCTOR}`, instructorData);
};

export const updateInstructor = (
  id: string,
  instructorData: InstructorCredentials
) => {
  return instance.put(`/${END_POINT.UPDATE_INSTRUCTOR}/${id}`, instructorData);
};
