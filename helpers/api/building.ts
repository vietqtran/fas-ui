import instance from "./_axios_instance";

const END_POINT = {
  GET_ALL_BUILDING: "building",
  CREATE_BULDING: "building",
  GET_BUILDING_BY_ID: "building",
  UPDATE_BUILDING: "building/update",
  DELETE_BUILDING: "building/delete",
  GET_BUILDING_BY_CAMPUS: "building/campus",
};

export const getAllBuilding = () => {
  return instance.get(`/${END_POINT.GET_ALL_BUILDING}`);
};

export const getBuildingById = (buildingId: string) => {
  return instance.get(`/${END_POINT.GET_BUILDING_BY_ID}/${buildingId}`);
};

export const createBuilding = (data: BuildingInformation) => {
  return instance.post(`/${END_POINT.CREATE_BULDING}`, data);
};

export const updateBuilding = (id: string, data: BuildingInformation) => {
  return instance.put(`/${END_POINT.UPDATE_BUILDING}/${id}`, data);
};

export const deleteBuildingById = (id: string) => {
  return instance.put(`/${END_POINT.DELETE_BUILDING}/${id}`);
};

export const getBuildingByCampus = (campusId: string) => {
  return instance.get(`/${END_POINT.GET_BUILDING_BY_CAMPUS}/${campusId}`);
};
