"use client";
import { Bounce, toast } from "react-toastify";
import React, { useEffect, useState } from "react";
import { addCourse, deleteCourseById, getAllCourse, getCourseByID, getAllCourseByMajor, updateCourse } from "@/helpers/api/course";

type Props = {};

const useCourse = () => {
    const [courses, setCourses] = useState([]);
    const [code, setCode] = useState("");
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [noCredit, setNoCredit] = useState<number>(0);
    const [courseMajorId, setCourseMajorId] = useState("72e18d9c-bf96-11ee-bdb8-106530543950");
    const [majorId, setMajorId] = useState("72e18d9c-bf96-11ee-bdb8-106530543950");
    const [curricilum, setCurriculum] = useState([]);
    const [id, setId] = useState("");

    useEffect(() => {
        fetchCourses();
    }, []);

    useEffect(() => {
        if (courseMajorId) {
            fetchCoursesByMajor(courseMajorId);
        }
    }, [courseMajorId]);

    const fetchCourses = async () => {
        try {
            const response = await getAllCourse().then((res) => res);
            if (response) {
                setCourses(response.data);
            } else {
                toast.error("Fetch course failed");
            }
        } catch (error) {
            console.error("Error fetching courses:", error);
            toast.error("Fetch course failed");
        }
    };

    const deleteCourse = async (id: string) => {
        try {
            const response = await deleteCourseById(id).then(
                (res) => res
            ) as BaseResponse;
            console.log(response);
            if (response && response.code === "SUCCESS") {
                toast.success(response?.message);
                fetchCourses();
            } else {
                toast.error("Delete course failed");
            }
        } catch (error) {
            console.error("Error deleting course:", error);
            toast.error("Delete course failed");
        }
    };

    const getCourse = async (id: string) => {
        try {
            const response = await getCourseByID(id).then(
                (res) => res
            ) as BaseResponse;
            if (response && response.code === "SUCCESS") {
                toast.success(response.message);
                return response.data;
            } else {
                toast.error(response?.message || "Failed to get course");
                return undefined;
            }
        } catch (error) {
            console.error("Error getting course:", error);
            toast.error("Failed to get course");
            return undefined;
        }
    };

    const fetchCoursesByMajor = async (majorId: string) => {
        try {
            const response = await getAllCourseByMajor(majorId).then(
                (res) => res
            ) as BaseResponse;
            if (response && response.code === "SUCCESS") {
                console.log(response.data);

                setCourses(response.data);
            }
        } catch (error) {
            console.error("Error getting courses by major:", error);
        }
    }

    const createCourse = async (e) => {
        e.preventDefault();
        try {
            const response = await addCourse({
                code,
                name,
                description,
                noCredit,
            } as CourseInformation).then(
                (res) => res
            ) as BaseResponse;
            if (response && response.code === "SUCCESS") {
                toast.success(response.message);
                await fetchCourses();
            } else {
                toast.error(response?.message || "Add course failed");
            }
        } catch (error) {
            console.error("Error adding course:", error);
            toast.error("Add course failed");
        }
    };

    const handleUpdateCourse = async (e) => {
        e.preventDefault();
        try {
            const response = await updateCourse(id, {
                code,
                name,
                description,
                noCredit,
            } as CourseInformation).then(
                (res) => res
            ) as BaseResponse;

            if (response && response.code === "SUCCESS") {
                toast.success(response.message);
                await fetchCourses();
            } else {
                toast.error(response?.message || "Update course failed");
            }
        } catch (error) {
            console.error("Error updating course:", error);
            toast.error("Update course failed");
        }
    };


    return {
        courses,
        setCourses,
        courseMajorId,
        setCourseMajorId,
        fetchCourses,
        deleteCourse,
        code,
        setCode,
        name,
        setName,
        description,
        setDescription,
        noCredit,
        setNoCredit,
        createCourse,
        id,
        setId,
        handleUpdateCourse,
        fetchCoursesByMajor
    };
};

export default useCourse;
