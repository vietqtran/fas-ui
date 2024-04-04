import instance from "@/helpers/api/_axios_instance";

const END_POINT = {
  GET_ALL_ASSIGN_FEEDBACK: "assignFeedBack",
  CREATE_ASSIGN_FEEDBACK: "assignFeedBack",
  GET_FEEDBACK_BY_ID: "assignFeedBack",
  UPDATE_FEEDBACK: "assignFeedBack/update",
  DELET_FEEDBACK: "assignFeedBack/delete",
  GET_FEEDBACK_BY_GRADE: "assignFeedBack/grade"
};

export const getAllAssignFeedBack = () => {
  return instance.get(`/${END_POINT.GET_ALL_ASSIGN_FEEDBACK}`);
};

export const getAssignFeedBackByID = (id: string) => {
  return instance.get(`/${END_POINT.GET_FEEDBACK_BY_ID}/${id}`);
};

export const addAssignFeedBack = (
  assignfeedBackReq: AssignFeedBackInformation
) => {
  return instance.post(
    `/${END_POINT.CREATE_ASSIGN_FEEDBACK}`,
    assignfeedBackReq
  );
};

export const updateAssignFeedBack = (
  id: string,
  assignfeedBackReq: AssignFeedBackInformation
) => {
  return instance.put(`/${END_POINT.UPDATE_FEEDBACK}/${id}`, assignfeedBackReq);
};

export const deleteAssignFeedBack = (id: string) => {
  return instance.put(`/${END_POINT.DELET_FEEDBACK}/${id}`);
};

export const getAssignFeedBackByGreade = (id: string) => {
  return instance.get(`/${END_POINT.GET_FEEDBACK_BY_GRADE}/${id}`);
};