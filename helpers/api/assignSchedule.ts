import instance from "./_axios_instance";

const END_POINT = {
  CREATE_ASSIGN: "assign",
  GET_ALL_ASSIGN: "assign",
  GET_ASSIGN_BY_ID: "assign",
  UPDATE_ASSIGN: "assign/update",
  DELETE_ASSIGN: "assign/delete",
};

export const getAllBuilding = () => {
  return instance.get(`/${END_POINT.CREATE_ASSIGN}`);
};

export const getBuildingById = (buildingId: string) => {
  return instance.get(`/${END_POINT.GET_ASSIGN_BY_ID}/${buildingId}`);
};

export const createBuilding = (data: BuildingInformation) => {
  return instance.post(`/${END_POINT.GET_ALL_ASSIGN}`, data);
};

export const updateBuilding = (id: string, data: BuildingInformation) => {
  return instance.put(`/${END_POINT.UPDATE_ASSIGN}/${id}`, data);
};

export const deleteBuildingById = (id: string) => {
  return instance.put(`/${END_POINT.DELETE_ASSIGN}/${id}`);
};
