import instance from "./_axios_instance";

const END_POINT = {
  GET_ALL_ROOM: "room",
  CREATE_ROOM: "room",
  GET_ROOM_BY_ID: "room",
  UPDATE_ROOM: "room/update",
  DELETE_ROOM: "room/delete",
  GET_ROOM_BY_BUILDING: "room/building",
};

export const getAllRoom = () => {
  return instance.get(`/${END_POINT.GET_ALL_ROOM}`);
};

export const getRoomById = (roomBuilding: string) => {
  console.log(roomBuilding);

  return instance.get(`/${END_POINT.GET_ROOM_BY_ID}/${roomBuilding}`);
};

export const createRoom = (data: RoomInformation) => {
  return instance.post(`/${END_POINT.CREATE_ROOM}`, data);
};

export const updateRoom = (id: string, data: RoomInformation) => {
  return instance.put(`/${END_POINT.UPDATE_ROOM}/${id}`, data);
};

export const deleteRoomById = (id: string) => {
  return instance.put(`/${END_POINT.DELETE_ROOM}/${id}`);
};

export const getRoomByBuilding = (buildingId: string) => {
  return instance.get(`/${END_POINT.GET_ROOM_BY_BUILDING}/${buildingId}`);
};
