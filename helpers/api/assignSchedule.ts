import instance from "./_axios_instance";

const END_POINT = {
  CREATE_ASSIGN: "assign",
  GET_ALL_ASSIGN: "assign",
  GET_ASSIGN_BY_ID: "assign",
  UPDATE_ASSIGN: "assign/update",
  DELETE_ASSIGN: "assign/delete",
};

export const getAllSchedule = () => {
  return instance.get(`/${END_POINT.CREATE_ASSIGN}`);
};

export const getSheduleById = (assignId: string) => {  
  return instance.get(`/${END_POINT.GET_ASSIGN_BY_ID}/${assignId}`);
};

export const createShedule = (data: AssignScheduleInformation) => {
  return instance.post(`/${END_POINT.GET_ALL_ASSIGN}`, data);
};

export const updateShedule = (id: string, data: AssignScheduleInformation) => {
  return instance.put(`/${END_POINT.UPDATE_ASSIGN}/${id}`, data);
};

export const changeStatusSchedule = (id: string) => {
  return instance.put(`/${END_POINT.DELETE_ASSIGN}/${id}`);
};

export const deleteSchedule = (id: string) => {
  return instance.delete(`/${END_POINT.DELETE_ASSIGN}/${id}`);
};