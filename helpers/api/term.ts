import instance from "@/helpers/api/_axios_instance";

const END_POINT = {
  GET_ALL_TERM: "term",
  CREATE_TERM: "term",
  GET_TERM_BY_ID: "term",
  UPDATE_TERM: "term/update",
  DELETE_TERM: "term/delete",
};

export const getAllTerms = () => {
  return instance.get(`/${END_POINT.GET_ALL_TERM}`);
};

export const deleteTermById = (id: string) => {
  return instance.put(`/${END_POINT.DELETE_TERM}/${id}`);
};

export const getTermByID = (id: string) => {
  return instance.get(`/${END_POINT.GET_TERM_BY_ID}/${id}`);
};

export const addTerm = (termData: TermInformation) => {
  return instance.post(`/${END_POINT.CREATE_TERM}`, termData);
};

export const updateTerm = (id: string, termData: TermInformation) => {
  return instance.put(`/${END_POINT.UPDATE_TERM}/${id}`, termData);
};
