"use client"
import { Bounce, toast } from 'react-toastify'
import React, { useEffect, useState } from 'react'
import { addMajor, deleteMajorById, getAllMajors, getMajorByID, updateMajor } from '@/helpers/api/major'

type Props = {}

const useMajor = () => {
    const [majors, setMajors] = useState([]);
    const [code, setCodeMajor] = useState("");
    const [name, setNameMajor] = useState("");
    const [id, setId] = useState("");

    useEffect(() => {
        fetchMajor();
    }, []);

    const fetchMajor = async () => {
        const response = await getAllMajors().then((res) => res)
        if (response) {
            setMajors(response.data)
        } else {
            toast.error('Fetch students failed')
        }
    }

    const deleteMajor = async (id: string) => {
        const response = (await deleteMajorById(id).then(
            (res) => res
        )) as BaseResponse
        
        if (response && response?.code === 'SUCCESS') {
            toast.success(response?.message)
            fetchMajor()
        } else {
            toast.error('Fetch students failed')
        }
    }

    const getMajor = async (id: string) => {
        const response = (await getMajorByID(id).then(
            (res) => res
        )) as BaseResponse
        if (response && response?.code === 'SUCCESS') {
            return response.data
        } else {
            toast.error(response?.message)
        }
    }

    const createMajor = async (e) => {
        e.preventDefault();
        const response = await addMajor({
            code,
            name
        } as MajorInformation).then((res) => res) as BaseResponse;

        if (response && response?.code === "SUCCESS") {
            toast.success(response?.message);
            await fetchMajor();
        } else {
            toast.error('Add students failed')
        }
    }

    const handleUpdateStudent = async (e) => {
        e.preventDefault();
        const response = await updateMajor(id , {
            code,
            name
        } as MajorInformation).then((res) => res) as BaseResponse;

        if (response && response?.code === "SUCCESS") {
            toast.success(response?.message);
            fetchMajor();
        } else {
            toast.error('update students failed')
        }
    }

    return {
        majors,
        fetchMajor,
        deleteMajor,
        code,
        setCodeMajor,
        name,
        setNameMajor,
        createMajor,
        id,
        setId,
        handleUpdateStudent,
        getMajor
    }

    
}

export default useMajor