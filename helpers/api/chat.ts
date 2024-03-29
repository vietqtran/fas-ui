import instance from "@/helpers/api/_axios_instance";
import { query } from "firebase/database";

const END_POINT = {
    CREATE_CHAT: "chats",
    GET_ALL_CHAT: "chats",
};

export const createChat = (reqStudentId: string, studentId: string) => {
    return instance.post(`/${END_POINT.CREATE_CHAT}/${reqStudentId}/${studentId}`);
}

export const getStudentChats = (studentId: string, query: string) => {
    return instance.get(`/${END_POINT.GET_ALL_CHAT}/student/${studentId}?query=${query}`);
}