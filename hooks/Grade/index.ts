"use client";
import { Bounce, toast } from "react-toastify";
import React, { useEffect, useState } from "react";
import { getAllGrade, getAllGradeByCourse } from "@/helpers/api/grade";

const useGrade = () => {
    const [code, setCode] = useState("");
    const [grades, setGrades] = useState([]);
    const [courseId, setCourseId] = useState("663fe3e3-d087-11ee-a242-106530543950");

    useEffect(() => {
        if (!courseId) {
            fectchGrade();
        }
        fetchGradeByCourse(courseId);
    }, [courseId])

    const fectchGrade = async () => {
        try {
            const response = await getAllGrade().then((res) => res) as BaseResponse;;
            if (response) {
                setGrades(response.data);
            } else {
                toast.error(response.message);
            }
        } catch (error) {
            console.error("Error fetching grade:", error);
            toast.error("Error from server");
        }
    };

    const fetchGradeByCourse = async (courseId: string) => {
        try {
            const response = await getAllGradeByCourse(courseId).then((res) => res) as BaseResponse;
            if (response) {
                setGrades(response.data);
            } else {
                toast.error(response.message);
            }
        } catch (error) {
            console.error("Error fetching grade:", error);
            toast.error("Error from server");
        }
    }

    return {
        grades, setGrades, courseId, setCourseId
    }

}

export default useGrade;