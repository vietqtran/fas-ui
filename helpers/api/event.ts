import instance from "@/helpers/api/_axios_instance";

const END_POINT = {
  GET_ALL_Event: "event",
  CREATE_Event: "event",
  GET_Event_BY_ID: "event",
  UPDATE_Event: "event/update",
  DELETE_Event: "event/delete",
};

export const getAllEvent = () => {
  return instance.get(`/${END_POINT.GET_ALL_Event}`);
};

export const deleteEventById = (id: string) => {
  return instance.put(`/${END_POINT.DELETE_Event}/${id}`);
};

export const getEventByID = (id: string) => {
  return instance.get(`/${END_POINT.GET_Event_BY_ID}/${id}`);
};

export const addEvent = (eventData: EventInformation) => {
  return instance.post(`/${END_POINT.CREATE_Event}`, eventData);
};

export const updateEvent = (id: string, eventData: EventInformation) => {
  return instance.put(`/${END_POINT.UPDATE_Event}/${id}`, eventData);
};
