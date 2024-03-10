import {
  addSlot,
  deleteSlot,
  getAllSlots,
  getSlotById,
  updateSlot,
} from "@/helpers/api/slot";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export const useSlot = () => {
  const [slots, setSlots] = useState([]);
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [startAt, setStartAt] = useState("");
  const [endAt, setEndAt] = useState("");
  const [slot, setSlot] = useState({});

  useEffect(() => {
    fetchSlots();
  }, []);

  const fetchSlots = async () => {
    try {
      const response = (await getAllSlots().then((res) => res)) as BaseResponse;
      if (response && response?.code === "SUCCESS") {
        setSlots(response.data);
      } else {
        console.log("Fetch students failed");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const createSlot = async (e) => {
    e.preventDefault();
    try {
      const response = (await addSlot({
        name,
        startAt,
        endAt,
      } as SlotInformation).then((res) => res)) as BaseResponse;
      if (response && response?.code === "SUCCESS") {
        toast.success(response?.message);
        await fetchSlots();
      } else {
        toast.error(response?.data || "Add slot failed");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteSlotById = async (id: string) => {
    try {
      const response = (await deleteSlot(id).then(
        (res) => res
      )) as BaseResponse;
      if (response && response?.code === "SUCCESS") {
        toast.success(response?.message);
        await fetchSlots();
      } else {
        toast.error(response?.data || "Delete slot failed");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getSlot = async (id) => {
    try {
      const response = (await getSlotById(id).then(
        (res) => res
      )) as BaseResponse;
      if (response && response?.code === "SUCCESS") {
        return response.data;
      } else {
        toast.error(response?.data || "Get slot failed");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const updateSlotById = async (e) => {
    e.preventDefault();
    try {
      const response = (await updateSlot(id, {
        name,
        startAt,
        endAt,
      } as SlotInformation).then((res) => res)) as BaseResponse;
      if (response && response?.code === "SUCCESS") {
        toast.success(response?.message);
        await fetchSlots();
      } else {
        toast.error(response?.data || "Update slot failed");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return {
    slots,
    setSlots,
    id,
    setId,
    name,
    setName,
    startAt,
    setStartAt,
    endAt,
    setEndAt,
    setSlot,
    createSlot,
    fetchSlots,
    deleteSlotById,
    getSlot,
    updateSlotById,
  };
};
