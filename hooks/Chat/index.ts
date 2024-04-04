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

    const [chat, setChat] = useState(null);
    const [chats, setChats] = useState([]);
    const [textSearch, setTextSearch] = useState("");

    useEffect(() => {
        fetchStudentChats(reqStudentId);
    }, [reqStudentId, textSearch])

    const handleCreateChat = async (reqStudentId: string, studentId: string) => {
        try {
            const response = await createChat(reqStudentId, studentId).then((res) => res) as BaseResponse;

            if (response && response.code === "SUCCESS") {
                setChat(response.data);
            }
        } catch (error) {
            
        }
    }

    const fetchStudentChats = async (reqStudentId: string) => {
        try {
            const response = await getStudentChats(reqStudentId, textSearch).then((res) => res) as BaseResponse;

            if (response && response.code === "SUCCESS") {
                setChats(response.data);
            }
        } catch (error) {
            
        }
    }

    return {
        handleCreateChat,
        setReqStudentId,
        chats,
        textSearch,
        setTextSearch,
    }
}

export default useChat;