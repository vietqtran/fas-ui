import instance from "@/helpers/api/_axios_instance";

const END_POINT = {
  GET_ALL_COURSE: "course",
  CREATE_COURSE: "course",
  GET_COURSE_BY_ID: "course",
  GET_ALL_COURSE_BY_MAJOR: "course/major",
  UPDATE_COURSE: "course/update",
  DELETE_COURSE: "course/delete",
  GET_COURSE_BY_MAJOR: "course/major"
};

export const getAllCourse = () => {
  return instance.get(`/${END_POINT.GET_ALL_COURSE}`);
};

export const deleteCourseById = (id: string) => {
  return instance.put(`/${END_POINT.DELETE_COURSE}/${id}`);
};

export const getCourseByID = (id: string) => {
  return instance.get(`/${END_POINT.GET_COURSE_BY_ID}/${id}`);
};

export const addCourse = (courseData: CourseInformation) => {
  return instance.post(`/${END_POINT.CREATE_COURSE}`, courseData);
};

export const updateCourse = (id: string, courseData: CourseInformation) => {
  return instance.put(`/${END_POINT.UPDATE_COURSE}/${id}`, courseData);
};

export const getAllCourseByMajor = (majorId: string) => {
  return instance.get(`/${END_POINT.GET_ALL_COURSE_BY_MAJOR}/${majorId}`);
}
export const getCourseByMajor = (id: string) => {
  return instance.get(`/${END_POINT.GET_COURSE_BY_MAJOR}/${id}`);
};

