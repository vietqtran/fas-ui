"use client";
import { Bounce, toast } from "react-toastify";
import React, { useEffect, useState } from "react";
import { createChat, getStudentChats } from "@/helpers/api/chat";
import { useSelector } from "react-redux";
import { RootState } from "@/helpers/redux/reducers";

type Props = {};

const useChat = () => {
    const { user } = useSelector((state: RootState) => state.user);

    const [reqStudentId, setReqStudentId] = useState(user?.student?.id);
    console.log("reqStudentId: ", reqStudentId);

    const [chat, setChat] = useState(null);
    const [chats, setChats] = useState([]);

    useEffect(() => {
        fetchStudentChats(reqStudentId);
    }, [reqStudentId])

    const handleCreateChat = async (reqStudentId: string, studentId: string) => {
        try {
            const response = await createChat(reqStudentId, studentId).then((res) => res) as BaseResponse;

            if (response && response.code === "SUCCESS") {
                setChat(response.data);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const fetchStudentChats = async (reqStudentId: string) => {
        try {
            const response = await getStudentChats(reqStudentId).then((res) => res) as BaseResponse;

            if (response && response.code === "SUCCESS") {
                setChats(response.data);
            }
        } catch (error) {
            console.log(error);
        }
    }

    return {
        handleCreateChat,
        setReqStudentId,
        chats
    }
}

export default useChat;