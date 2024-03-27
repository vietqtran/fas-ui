import instance from "@/helpers/api/_axios_instance";

const END_POINT = {
  GET_ALL_MAJOR: "major",
  CREATE_MAJOR: "major",
  GET_MAJOR_BY_ID: "major",
  UPDATE_MAJOR: "major/update",
  DELETE_MAJOR: "major/delete",
};

export const getAllMajors = () => {
  return instance.get(`/${END_POINT.GET_ALL_MAJOR}`);
};

export const deleteMajorById = (id: string) => {
  return instance.put(`/${END_POINT.DELETE_MAJOR}/${id}`);
};

export const getMajorByID = (id: string) => {
  return instance.get(`/${END_POINT.GET_MAJOR_BY_ID}/${id}`);
};

export const addMajor = (majorData: MajorInformation) => {
  return instance.post(`/${END_POINT.CREATE_MAJOR}`, majorData);
};

export const updateMajor = (id: string, majorData: MajorInformation) => {
  return instance.put(`/${END_POINT.UPDATE_MAJOR}/${id}`, majorData);
};
