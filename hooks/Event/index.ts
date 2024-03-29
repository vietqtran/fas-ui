"use client";
import { Bounce, toast } from "react-toastify";
import React, { useEffect, useState } from "react";
import {
  addEvent,
  deleteEventById,
  getAllEvent,
  getEventByID,
  updateEvent,
} from "@/helpers/api/event";

type Props = {};

const useEvent = () => {
  const [events, setEvents] = useState([]);
  const [image, setImageEvent] = useState("");
  const [url, setUrlEvent] = useState("");
  const [id, setId] = useState("");

  useEffect(() => {
    fetchEvent();
  }, []);

  const fetchEvent = async () => {
    const response = await getAllEvent().then((res) => res);
    if (response) {
      setEvents(response.data);
    } else {
      toast.error("Fetch event failed");
    }
  };

  const deleteEvent = async (id: string) => {
    const response = (await deleteEventById(id).then(
      (res) => res
    )) as BaseResponse;
    if (response && response?.code === "SUCCESS") {
      toast.success(response?.message);
      fetchEvent();
    } else {
      toast.error("Fetch event failed");
    }
  };

  const getEvent = async (id: string) => {
    const response = (await getEventByID(id).then(
      (res) => res
    )) as BaseResponse;
    if (response && response?.code === "SUCCESS") {
      toast.success(response?.message);
      return response.data;
    } else {
      toast.error(response?.message);
    }
  };

  const createEvent = async (e) => {
    e.preventDefault();
    const response = (await addEvent({
      image,
      url,
    } as EventInformation).then((res) => res)) as BaseResponse;

    if (response && response?.code === "SUCCESS") {
      toast.success(response?.message);
      await fetchEvent();
    } else {
      toast.error("Add event failed");
    }
  };

  const handleUpdateEvent = async (e) => {
    e.preventDefault();
    const response = (await updateEvent(id, {
      image,
      url,
    } as EventInformation).then((res) => res)) as BaseResponse;

    if (response && response?.code === "SUCCESS") {
      toast.success(response?.message);
      fetchEvent();
    } else {
      toast.error("update event failed");
    }
  };

  return {
    events,
    fetchEvent,
    deleteEvent,
    image,
    setImageEvent,
    url,
    setUrlEvent,
    createEvent,
    id,
    setId,
    handleUpdateEvent,
  };
};

export default useEvent;
