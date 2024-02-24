import instance from "@/helpers/api/_axios_instance";

const END_POINT = {
  GET_ALL_FEEDBACK: "feedback",
  CREATE_FEEDBACK: "feedback",
  GET_FEEDBACK_BY_ID: "feedback",
  UPDATE_FEEDBACK: "feedback/update",
};

export const getAllFeedBack = () => {
  return instance.get(`/${END_POINT.GET_ALL_FEEDBACK}`);
};

export const getFeedBackByID = (id: string) => {
  return instance.get(`/${END_POINT.GET_FEEDBACK_BY_ID}/${id}`);
};

export const addFeedBack = (feedBackReq: FeedBackInformation) => {
  return instance.post(`/${END_POINT.CREATE_FEEDBACK}`, feedBackReq);
};

export const updateFeedBack = (id: string, feedBackReq: FeedBackInformation) => {
  return instance.put(`/${END_POINT.UPDATE_FEEDBACK}/${id}`, feedBackReq);
};
