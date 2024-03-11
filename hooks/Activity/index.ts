"use client";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { getActivityByAssign, getActivityById, updateActivity } from "@/helpers/api/activity";

const useActivity = () => {

    const [activities, setActivities] = useState([]);
    const [date, setDate] = useState("");
    const [roomId, setRoomId] = useState("");
    const [slotId, setSlotId] = useState("");
    const [instructorId, setInstructorId] = useState("");
    const [assignId, setAssignId] = useState("");

    const [activityDetail, setActivityDetail] = useState<any>({});
    const [idActivityDetail, setIdActivityDetail] = useState("");

    useEffect(() => {
        getActivityDetail(idActivityDetail);
    }, [idActivityDetail]);

    const fetchActivityByAssign = async (id: string) => {
        try {
            const response = await getActivityByAssign(id).then((res) => res) as BaseResponse;
            if (response) {
                setActivities(response.data);
                return response.data;
            }
            else {
                return response?.message;
            }
        } catch (error) {
            console.error("Error fetching activity:", error);
        }
    }
    const getActivityDetail = async (id: string) => {
        try {
            const response = (await getActivityById(id).then(
                (res) => res
            )) as BaseResponse;
            if (response) {
                setActivityDetail(response.data);
                return response.data;
            } else {
                return response?.message;
            }
        } catch (error) {
            console.error("Error fetching activity:", error);
        }
    };

    const handleUpdateActivity = async (e) => {
        e.preventDefault();        
        try {
            const response = (await updateActivity(idActivityDetail, {
                date: date,
                roomId: roomId,
                slotId: slotId,
                assignId: assignId,
                instructorId: instructorId,
            } as ActivityInformation).then((res) => res)) as BaseResponse;

            if (response && response.code === "SUCCESS") {
                toast.success(response.message);
            } else {
                toast.error(response?.message || "Update course failed");
            }
        } catch (error) {
            console.error("Error updating course:", error);
            toast.error("Update course failed");
        }
    };

    return {
        instructorId,
        setInstructorId,
        date,
        setDate,
        activities,
        setActivities,
        slotId,
        setSlotId,
        roomId,
        setRoomId,
        assignId,
        setAssignId,
        fetchActivityByAssign,
        getActivityDetail,
        activityDetail,
        setActivityDetail,
        handleUpdateActivity,
        setIdActivityDetail
    };
};

export default useActivity;
