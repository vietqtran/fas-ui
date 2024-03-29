"use client";
import { Bounce, toast } from "react-toastify";
import React, { useEffect, useState } from "react";
import { addStudentToGrade, createGrade, deleteGradeById, deleteStudentToGrade, getAllGrade, getAllGradeByCourse, getAllGradeByCourseAndTerm, getGradeByID, getGradeByMajor, getGradeByStudent, updateGrade } from "@/helpers/api/grade";

const useGrade = () => {
    const [code, setCode] = useState("");
    const [grades, setGrades] = useState([]);
    const [courseId, setCourseId] = useState("");
    const [id, setId] = useState("");
    const [studentId, setStudentId] = useState("");
    const [gradeId, setGradeId] = useState("");
    const [gradeTermId, setGradeTermId] = useState("");
    const [majorId, setMajorId] = useState("");
    const [campusId, setCampusId] = useState("");
    const [gradeByMajor, setGradeByMajor] = useState([]);
    const [grade, setGrade] = useState({
        code: "",
        createdAt: "",
        status: Boolean,
        updatedAt: "",
        students: [],
    });

    useEffect(() => {
        if (!courseId) {
            fectchGrade();
        }
        if (courseId && !gradeTermId) {
            fetchGradeByCourse(courseId);
        }

        fetchGradeByCourseAndTerm(courseId, gradeTermId);
    }, [courseId, gradeTermId]);

    const fectchGrade = async () => {
        try {
            const response = await getAllGrade().then((res) => res) as BaseResponse;;
            if (response) {
                setGrades(response.data);
            } else {
              
            }
        } catch (error) {
            console.error("Error fetching grade:", error);
        }
    };


    const fetchGradeByCourse = async (courseId: string) => {
        try {
            const response = await getAllGradeByCourse(courseId).then((res) => res) as BaseResponse;
            if (response) {
                setGrades(response.data);
            } else {
            
            }
        } catch (error) {
            console.error("Error fetching grade:", error);
        }
    }

    const fetchGradeByCourseAndTerm = async (courseId: string, termId: string) => {
        try {
            const response = await getAllGradeByCourseAndTerm(courseId, termId).then((res) => res) as BaseResponse;
            if (response) {
                setGrades(response.data);
            } else {
            
            }
        } catch (error) {
            console.error("Error fetching grade:", error);
        }
    }

    const fetchGradeByMajor = async (majorId: string) => {
        try {
            const response = await getGradeByMajor(majorId).then((res) => res) as BaseResponse;
            if (response) {
                setGradeByMajor(response.data);
                return response.data;
            } else {
            
            }
        } catch (error) {
            console.error("Error fetching grade:", error);
        }
    }

    const getGrade = async (id: string) => {
        try {
            const response = await getGradeByID(id).then((res) => res) as BaseResponse;
            if (response) {
                setGrade(response.data);
                return response.data;
            }
            else {
                return response?.message;
            }
        } catch (error) {
            console.error("Error fetching grade:", error);
        }
    }

    const addGrade = async (e) => {
        e.preventDefault();
        try {
            const response = await createGrade({
                code,
                majorId,
                campusId
            } as GradeInformation).then(
                (res) => res
            ) as BaseResponse;
            if (response && response.code === "SUCCESS") {
                toast.success(response.message);
            } else {
                toast.error(response?.message || "Add course failed");
            }
        } catch (error) {
            console.error("Error adding course:", error);
            toast.error("Add course failed");
        }
    }

    const deleteGrade = async (id: string) => {
        try {
            const response = await deleteGradeById(id).then((res) => res) as BaseResponse;
            if (response) {
                toast.success(response.message);
                fectchGrade();
            }
            else {
                return (response.message);
            }
        }
        catch (error) {
            console.error("Error deleting grade:", error);
        }
    }

    const handleUpdateGrade = async (e) => {
        e.preventDefault();
        try {
            const response = await updateGrade(id, {
                code,
                majorId,
                campusId
            } as GradeInformation).then((res) => res) as BaseResponse;
            if (response && response.code === "SUCCESS") {
                toast.success(response.message);
                fectchGrade();
            } else {
                return (response?.message || "Update grade failed");
            }
        }
        catch (error) {
            console.error("Error updating grade:", error);
        }
    }

    const handleAddStudentToGrade = async (studentId: string, gradeId: string) => {
        try {
            const response = await addStudentToGrade(studentId, gradeId).then((res) => res) as BaseResponse;
            if (response && response.code === "SUCCESS") {
                toast.success(response.message);
                fectchGrade();
            } else {
                return (response?.message || "Add grade failed");
            }
        }
        catch (error) {
            console.error("Error add grade:", error);
        }
    }

    const handleDeleteStudentToGrade = async (studentId: string, gradeId: string) => {
        try {
            const response = await deleteStudentToGrade(studentId, gradeId).then((res) => res) as BaseResponse;
            if (response && response.code === "SUCCESS") {
                toast.success(response.message);
                fectchGrade();
            }
            else {
                return (response?.message || "Delete grade failed");
            }
        }
        catch (error) {
            console.error("Error delete grade:", error);
        }
    }

    const getGradeStudent = async (id: string) => {
        try {
            const response = await getGradeByStudent(id).then((res) => res) as BaseResponse;
            if (response) {
                setGrade(response.data);
                return response.data;
            }
            else {
                return response?.message;
            }
        } catch (error) {
            console.error("Error fetching grade:", error);
        }
    }

    return {
        grades,
        setGrades,
        courseId,
        setCourseId,
        code,
        setCode,
        id,
        setId,
        fectchGrade,
        fetchGradeByCourse,
        getGrade,
        addGrade,
        deleteGrade,
        handleUpdateGrade,
        handleAddStudentToGrade,
        handleDeleteStudentToGrade,
        studentId,
        setStudentId,
        grade,
        setGrade,
        campusId,
        setCampusId,
        majorId,
        setMajorId,
        fetchGradeByMajor,
        gradeByMajor,
        setGradeByMajor,
        gradeTermId,
        setGradeTermId,
        getGradeStudent
    }
}

export default useGrade;