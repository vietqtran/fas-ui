"use client"
import { Bounce, toast } from 'react-toastify'
import React, { useEffect, useState } from 'react'
import { addStudent, deleteStudentById, getAllStudents, getStudentById, updateStudent } from '@/helpers/api/student'
import { getAllCampuses } from '@/helpers/api/campus'

type Props = {}

const useStudent = () => {
    const [students, setStudents] = useState([]);

    const [id, setId] = useState("");
    const [firstName, setFirstName] = useState("");
    const [middleName, setMiddleName] = useState("");
    const [lastName, setLastName] = useState("");
    const [birthDay, setBirthDay] = useState("");
    const [phone, setPhone] = useState("");
    const [majorId, setMajorId] = useState("");
    const [email, setEmail] = useState("");
    const [studentCode, setStudentCode] = useState("");
    const [username, setUsername] = useState("");
    const [address, setAddress] = useState("");
    const [profileImage, setProfileImage] = useState("");
    const [campusId, setCampusId] = useState("");
    const [campuses, setCampuses] = useState([]);
    const [student, setStudent] = useState({});

    useEffect(() => {
        fetchStudents();
    }, []);

    useEffect(() => {
        fetchCampuses();
    }, []);


    const fetchCampuses = async () => {
        const response = await getAllCampuses().then((res) => res)
        if (response) {
            setCampuses(response.data)
        } else {
            toast.error('Fetch campuses failed')
        }
    }

    const fetchStudents = async () => {
        const response = await getAllStudents().then((res) => res)
        if (response && response?.code === "SUCCESS") {
            setStudents(response.data)
        } else {
            toast.error('Fetch students failed')
        }
    }

    const deleteStudent = async (id: string) => {
        const response = await deleteStudentById(id).then((res) => res);
        if (response && response?.code === "SUCCESS") {
            toast.success(response?.message);
            fetchStudents();
        } else {
            toast.error('Fetch students failed')
        }
    }

    const createStudent = async (e) => {
        e.preventDefault();
        const response = await addStudent({
            firstName,
            middleName,
            lastName,
            birthDay,
            phone,
            majorId,
            campusId,
            email,
            studentCode,
            username,
            address,
            profileImage
        } as StudentInformation).then((res) => res);
        console.log(response);
        
        if (response && response?.code === "SUCCESS") {
            toast.success(response?.message);
            await fetchStudents();
        } else {
            toast.error('Add students failed')
        }
    }

    const getStudent = async (id: string) => {
        const response = await getStudentById(id).then((res) => res);
        if (response && response?.code === "SUCCESS") {
            toast.success(response?.message);
            return response.data;
        } else {
            toast.error('Fetch students failed')
        }
    }

    const handleUpdateStudent = async (e) => {
        e.preventDefault();
        const response = await updateStudent(id, {
            firstName,
            middleName,
            lastName,
            birthDay,
            phone,
            majorId,
            campusId,
            email,
            studentCode,
            username,
            address,
            profileImage
        } as StudentInformation).then((res) => res);

        if (response && response?.code === "SUCCESS") {
            toast.success(response?.message);
            fetchStudents();
        } else {
            toast.error('update students failed')
        }
    }


    return {
        students,
        setStudents,
        deleteStudent,
        firstName,
        setFirstName,
        middleName,
        setMiddleName,
        lastName,
        setLastName,
        birthDay,
        setBirthDay,
        phone,
        setPhone,
        majorId,
        setMajorId,
        email,
        setEmail,
        studentCode,
        setStudentCode,
        username,
        setUsername,
        address,
        setAddress,
        profileImage,
        setProfileImage,
        createStudent,
        fetchStudents,
        getStudent,
        student,
        setId,
        campusId, 
        setCampusId,
        handleUpdateStudent, 
        id,
        campuses
    }
}

export default useStudent