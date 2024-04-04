"use client";
import { Bounce, toast } from "react-toastify";
import React, { useEffect, useState } from "react";
import {
  createRoom,
  deleteRoomById,
  getAllRoom,
  getRoomByBuilding,
  getRoomById,
  updateRoom,
} from "@/helpers/api/room";

type Props = {};

const useRoom = () => {
  const [rooms, setRooms] = useState([]);
  const [code, setCode] = useState("");
  const [room, setRoom] = useState({});
  const [buildingId, setBuildingId] = useState("");
  const [id, setId] = useState("");
  const [roomsByBuilding, setRoomsByBuilding] = useState([]);

  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = async () => {
    try {
      const response = await getAllRoom().then((res) => res);
      if (response) {
        setRooms(response.data);
      } else {
        toast.error("Fetch room failed");
      }
    } catch (error) {
      console.error("Error fetching room:", error);
      toast.error("Fetch room failed");
    }
  };

  const deleteRoom = async (id: string) => {
    try {
      const response = (await deleteRoomById(id).then(
        (res) => res
      )) as BaseResponse;
      if (response && response.code === "SUCCESS") {
        toast.success(response?.message);
        fetchRooms();
      } else {
        toast.error("Delete room failed");
      }
    } catch (error) {
      console.error("Error deleting room:", error);
      toast.error("Delete room failed");
    }
  };

  const getRoom = async (id: string) => {
    try {
      const response = (await getRoomById(id).then(
        (res) => res
      )) as BaseResponse;
      if (response && response.code === "SUCCESS") {
        setRoom(response.data);
        return response.data;
      } else {
        return undefined;
      }
    } catch (error) {
      console.error("Error getting room:", error);
      return undefined;
    }
  };

  const addRoom = async (e) => {
    e.preventDefault();
    try {
      const response = (await createRoom({
        code,
        buildingId,
      } as RoomInformation).then((res) => res)) as BaseResponse;
      if (response && response.code === "SUCCESS") {
        toast.success(response.message);
        await fetchRooms();
        await handleGetRoomByBuilding(buildingId);
      } else {
        toast.error(response?.message || "Add room failed");
      }
    } catch (error) {
      console.error("Error adding room:", error);
      toast.error("Add room failed");
    }
  };

  const handleUpdateRoom = async (e) => {
    e.preventDefault();
    try {
      const response = (await updateRoom(id, {
        code,
        buildingId,
      } as RoomInformation).then((res) => res)) as BaseResponse;

      if (response && response.code === "SUCCESS") {
        toast.success(response.message);
        await fetchRooms();
      } else {
        toast.error(response?.message || "Update room failed");
      }
    } catch (error) {
      console.error("Error updating room:", error);
      toast.error("Update room failed");
    }
  };

  const handleGetRoomByBuilding = async (id: string) => {
    try {
      const response = (await getRoomByBuilding(id).then(
        (res) => res
      )) as BaseResponse;
      if (response && response.code === "SUCCESS") {
        setRoomsByBuilding(response.data);
        return response.data;
      } else {
        return undefined;
      }
    } catch (error) {
      console.error("Error getting building:", error);
      return undefined;
    }
  };

  return {
    rooms,
    code,
    setCode,
    buildingId,
    setBuildingId,
    setId,
    id,
    fetchRooms,
    deleteRoom,
    getRoom,
    addRoom,
    handleUpdateRoom,
    handleGetRoomByBuilding,
    roomsByBuilding,
  };
};

export default useRoom;
