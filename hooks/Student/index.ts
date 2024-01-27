"use client"
import { Bounce, toast } from 'react-toastify'
import React, { useEffect, useState } from 'react'
import { deleteStudentById, getAllStudents } from '@/helpers/api/student'

type Props = {}

const useStudent = () => {
    const [students, setStudents] = useState([]);

    useEffect(() => {
        
        fetchStudents();
    },[]);

    const fetchStudents = async () => {
        const response = await getAllStudents().then((res) => res)
        if (response) {
            setStudents(response.data)
        } else {
            toast.error('Fetch students failed')
        }
    }

    const deleteStudent = async (id: string) => {
        const response = await deleteStudentById(id).then((res) => res);
        fetchStudents();
        
        if (response) {
            toast.success('Delete student successfully');
        } else {
            toast.error('Fetch students failed')
        }
    }


    return {
        students,
        setStudents,
        deleteStudent
    }
}

export default useStudent