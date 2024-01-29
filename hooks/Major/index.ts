"use client"
import { Bounce, toast } from 'react-toastify'
import React, { useEffect, useState } from 'react'
import { getAllMajors } from '@/helpers/api/major'

type Props = {}

const useMajor = () => {
    const [majors, setMajors] = useState([]);

    useEffect(() => {
        fetchMajor();
    },[]);

    const fetchMajor = async () => {
        const response = await getAllMajors().then((res) => res)
        if (response) {
            setMajors(response.data)
        } else {
            toast.error('Fetch students failed')
        }
    }

    return {
        majors
    }
}

export default useMajor