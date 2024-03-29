"use client";
import { Bounce, toast } from "react-toastify";
import React, { useEffect, useState } from "react";
import {
  createBuilding,
  deleteBuildingById,
  getAllBuilding,
  getBuildingByCampus,
  getBuildingById,
  updateBuilding,
} from "@/helpers/api/building";

type Props = {};

const useBuilding = () => {
  const [buildings, setBuildings] = useState([]);
  const [name, setName] = useState("");
  const [building, setBuilding] = useState({});
  const [campusId, setCampusId] = useState("");
  const [id, setId] = useState("");
  const [buildingsByCampus, setBuildingsByCampus] = useState([]);

  useEffect(() => {
    fetchBuildings();
  }, []);

  const fetchBuildings = async () => {
    try {
      const response = await getAllBuilding().then((res) => res);
      if (response) {
        setBuildings(response.data);
      } else {
        toast.error("Fetch building failed");
      }
    } catch (error) {
      console.error("Error fetching building:", error);
      toast.error("Fetch building failed");
    }
  };

  const deleteBuilding = async (id: string) => {
    try {
      const response = (await deleteBuildingById(id).then(
        (res) => res
      )) as BaseResponse;
      if (response && response.code === "SUCCESS") {
        toast.success(response?.message);
        fetchBuildings();
      } else {
        toast.error("Delete building failed");
      }
    } catch (error) {
      console.error("Error deleting building:", error);
      toast.error("Delete building failed");
    }
  };

  const getBuilding = async (id: string) => {
    try {
      const response = (await getBuildingById(id).then(
        (res) => res
      )) as BaseResponse;
      if (response && response.code === "SUCCESS") {
        setBuilding(response.data);
        return response.data;
      } else {
        return undefined;
      }
    } catch (error) {
      console.error("Error getting building:", error);
      return undefined;
    }
  };

  const addBuilding = async (e) => {
    e.preventDefault();
    try {
      const response = (await createBuilding({
        name,
        campusId,
      } as BuildingInformation).then((res) => res)) as BaseResponse;
      if (response && response.code === "SUCCESS") {
        toast.success(response.message);
        await fetchBuildings();
      } else {
        toast.error(response?.message || "Add building failed");
      }
    } catch (error) {
      console.error("Error adding building:", error);
      toast.error("Add building failed");
    }
  };

  const handleUpdateBuilding = async (e) => {
    e.preventDefault();
    try {
      const response = (await updateBuilding(id, {
        name,
        campusId,
      } as BuildingInformation).then((res) => res)) as BaseResponse;

      if (response && response.code === "SUCCESS") {
        toast.success(response.message);
        await fetchBuildings();
      } else {
        toast.error(response?.message || "Update building failed");
      }
    } catch (error) {
      console.error("Error updating building:", error);
      toast.error("Update building failed");
    }
  };

  const handleGetBuildingByCampus = async (id: string) => {
    try {
      const response = (await getBuildingByCampus(id).then(
        (res) => res
      )) as BaseResponse;
      if (response && response.code === "SUCCESS") {
        setBuildingsByCampus(response.data);
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
    buildings,
    name,
    setName,
    campusId,
    setCampusId,
    setId,
    id,
    fetchBuildings,
    deleteBuilding,
    getBuilding,
    addBuilding,
    handleUpdateBuilding,
    handleGetBuildingByCampus,
    buildingsByCampus,
  };
};

export default useBuilding;
